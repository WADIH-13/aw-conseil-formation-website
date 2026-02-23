import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import nodemailer from 'nodemailer';

const BUCKET = 'partner-uploads';
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const getEnv = (key: string) => process.env[key];

async function sendAdminNotification(partnerData: {
  name: string;
  short: string;
  email: string;
  website?: string;
  phone?: string;
}) {
  try {
    const host = getEnv('SMTP_HOST');
    const port = Number(getEnv('SMTP_PORT') || '587');
    const user = getEnv('SMTP_USER');
    const pass = getEnv('SMTP_PASS');
    const from = getEnv('SMTP_FROM') || user;
    const to = getEnv('ADMIN_EMAIL') || getEnv('CONTACT_TO') || 'ahmed.wadih@gmail.com';

    if (!host || !user || !pass || !from) {
      console.error('Email service not configured');
      return false;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `[Nouveau Partenaire] ${partnerData.name}`;
    const timestamp = new Date().toLocaleString('fr-FR');

    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
        <h2>Nouvelle inscription de partenaire</h2>
        <p><strong>Nom :</strong> ${partnerData.name}</p>
        <p><strong>Description :</strong> ${partnerData.short}</p>
        <p><strong>Email :</strong> ${partnerData.email}</p>
        ${partnerData.website ? `<p><strong>Site web :</strong> <a href="${partnerData.website}">${partnerData.website}</a></p>` : ''}
        ${partnerData.phone ? `<p><strong>Téléphone :</strong> ${partnerData.phone}</p>` : ''}
        <p><strong>Inscription le :</strong> ${timestamp}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #666; font-size: 12px;">Le partenaire a été publié automatiquement sur le site.</p>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);
}

function getExtension(filename: string, fallback: string) {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] || fallback;
}

async function uploadFile(file: File, path: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const supabase = supabaseServer();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error('Erreur upload');
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = String(formData.get('name') || '').trim();
    const short = String(formData.get('short') || '').trim();
    const website = String(formData.get('website') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const area = String(formData.get('area') || '').trim();

    const logo = formData.get('logo') as File | null;
    const photo = formData.get('photo') as File | null;

    if (!name || !short || !logo || !photo) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    if (!logo.type.startsWith('image/') || !photo.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Format de fichier non autorisé' }, { status: 400 });
    }

    if (logo.size > MAX_FILE_SIZE_BYTES || photo.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'Fichier trop lourd' }, { status: 400 });
    }

    const baseSlug = slugify(name);
    if (!baseSlug) {
      return NextResponse.json({ error: 'Nom invalide' }, { status: 400 });
    }

    const supabase = supabaseServer();
    const { data: existing } = await supabase
      .from('partner_profiles')
      .select('slug')
      .eq('slug', baseSlug)
      .maybeSingle();

    const slug = existing ? `${baseSlug}-${Date.now().toString().slice(-5)}` : baseSlug;

    const logoExt = getExtension(logo.name, 'png');
    const photoExt = getExtension(photo.name, 'jpg');
    const logoPath = `partners/${slug}/logo.${logoExt}`;
    const photoPath = `partners/${slug}/photo.${photoExt}`;

    const logoUrl = await uploadFile(logo, logoPath);
    const photoUrl = await uploadFile(photo, photoPath);

    const { data, error } = await supabase
      .from('partner_profiles')
      .insert([
        {
          slug,
          name,
          short,
          website: website || null,
          email: email || null,
          phone: phone || null,
          area: area || null,
          logo_url: logoUrl,
          photo_url: photoUrl,
          status: 'published',
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Erreur insertion' }, { status: 500 });
    }

    // Send admin notification (don't await, fire and forget)
    sendAdminNotification({
      name: data.name,
      short: data.short,
      email: data.email || '',
      website: data.website || undefined,
      phone: data.phone || undefined,
    });

    return NextResponse.json({ slug: data.slug }, { status: 201 });
  } catch (err) {
    console.error('Partner submit error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
