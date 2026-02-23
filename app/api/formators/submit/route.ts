import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const invitationCode = String(formData.get('invitation_code') || '').trim().toUpperCase();
    const name = String(formData.get('name') || '').trim();
    const title = String(formData.get('title') || '').trim();
    const signature = String(formData.get('signature') || '').trim();
    const bio = String(formData.get('bio') || '').trim();
    const builds = String(formData.get('builds') || '').trim();
    const protects = String(formData.get('protects') || '').trim();
    const develops = String(formData.get('develops') || '').trim();
    const valuesStr = String(formData.get('values') || '').trim();
    const closing = String(formData.get('closing') || '').trim();
    const photo = formData.get('photo') as File | null;

    // Validation champs requis
    if (!invitationCode) {
      return NextResponse.json({ error: 'Code d\'invitation requis.' }, { status: 400 });
    }

    if (!name || !title || !signature || !bio || !builds || !protects || !develops || !valuesStr || !closing) {
      return NextResponse.json({ error: 'Certains champs requis sont manquants.' }, { status: 400 });
    }

    // Validation valeurs
    const values = valuesStr.split('-').map((v) => v.trim()).filter(Boolean);
    if (values.length !== 3) {
      return NextResponse.json({ error: 'Vous devez renseigner exactement 3 valeurs.' }, { status: 400 });
    }

    const slug = slugify(name);
    if (!slug) {
      return NextResponse.json({ error: 'Le nom fourni n\'est pas valide.' }, { status: 400 });
    }

    const intentions = { builds, protects, develops };
    const supabase = supabaseServer();

    // VALIDATION DU CODE D'INVITATION
    const { data: invitation, error: invErr } = await supabase
      .from('invitation_codes')
      .select('*')
      .eq('code', invitationCode)
      .maybeSingle();

    if (invErr) {
      console.error('Invitation query error:', invErr);
      return NextResponse.json({ error: 'Erreur lors de la validation du code.' }, { status: 500 });
    }

    if (!invitation) {
      return NextResponse.json({ error: 'Code d\'invitation invalide ou expiré.' }, { status: 401 });
    }

    if (invitation.is_used) {
      return NextResponse.json({ error: 'Ce code a déjà été utilisé.' }, { status: 401 });
    }

    if (invitation.expires_at && new Date(invitation.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Ce code d\'invitation a expiré.' }, { status: 401 });
    }

    // Vérifier si slug existe
    const { data: existing } = await supabase
      .from('formators')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Un profil avec ce nom existe déjà.' }, { status: 400 });
    }

    let photoUrl = null;

    // Upload photo si présente
    if (photo && photo.size > 0) {
      if (!photo.type.startsWith('image/')) {
        return NextResponse.json({ error: 'La photo doit être une image (JPG, PNG, WEBP).' }, { status: 400 });
      }

      if (photo.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'La photo est trop volumineuse (max 5MB).' }, { status: 400 });
      }

      try {
        const arrayBuffer = await photo.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const ext = photo.name.split('.').pop() || 'jpg';
        const photoPath = `${slug}/photo.${ext}`;

        const { error: uploadErr } = await supabase.storage
          .from('formator-uploads')
          .upload(photoPath, buffer, { contentType: photo.type, upsert: true });

        if (uploadErr) {
          console.error('Storage error:', uploadErr);
          return NextResponse.json({ 
            error: `Erreur lors de l'upload de la photo: ${uploadErr.message || 'Inconnue'}` 
          }, { status: 500 });
        }

        const { data } = supabase.storage.from('formator-uploads').getPublicUrl(photoPath);
        photoUrl = data.publicUrl;
      } catch (fileErr) {
        console.error('File upload exception:', fileErr);
        return NextResponse.json({ error: 'Erreur lors du traitement de la photo.' }, { status: 500 });
      }
    }

    // Insérer en base
    const { data, error } = await supabase
      .from('formators')
      .insert([
        {
          slug,
          name,
          title,
          signature,
          bio,
          intentions,
          values,
          closing,
          photo_url: photoUrl,
          is_published: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return NextResponse.json({ 
        error: `Erreur lors de l'enregistrement: ${error.message || 'Vérifiez que la table "formators" existe.'}` 
      }, { status: 500 });
    }

    // MARQUER LE CODE COMME UTILISÉ
    const { error: updateErr } = await supabase
      .from('invitation_codes')
      .update({
        is_used: true,
        used_at: new Date().toISOString(),
        used_by_slug: slug,
      })
      .eq('id', invitation.id);

    if (updateErr) {
      console.error('Code update error:', updateErr);
      // Non-bloquant : le profil est créé même si on ne peut pas marquer le code
    }

    return NextResponse.json({ 
      slug: data.slug, 
      message: 'Votre profil a été soumis avec succès pour validation.' 
    }, { status: 201 });
  } catch (err) {
    console.error('Formator submit error:', err);
    return NextResponse.json({ 
      error: `Erreur serveur: ${err instanceof Error ? err.message : 'Inconnue'}` 
    }, { status: 500 });
  }
}
