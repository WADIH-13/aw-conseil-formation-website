import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import crypto from 'crypto';

// Générer un code unique alphanumérique
function generateUniqueCode(): string {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    const supabase = supabaseServer();

    // Générer un code unique
    let code = generateUniqueCode();
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing } = await supabase
        .from('invitation_codes')
        .select('code')
        .eq('code', code)
        .maybeSingle();

      if (!existing) break;
      code = generateUniqueCode();
      attempts++;
    }

    if (attempts >= 5) {
      return NextResponse.json({ error: 'Impossible de générer un code unique.' }, { status: 500 });
    }

    // Insérer le code
    const { data, error } = await supabase
      .from('invitation_codes')
      .insert([
        {
          code,
          email,
          is_used: false,
          created_by: 'admin',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: 'Erreur insertion.' }, { status: 500 });
    }

    return NextResponse.json({
      code: {
        code: data.code,
        email: data.email,
        expiresAt: data.expires_at,
      },
    }, { status: 201 });
  } catch (err) {
    console.error('Generate code error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
