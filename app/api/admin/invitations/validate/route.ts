import { NextRequest, NextResponse } from 'next/server';

import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    let supabase;
    try {
      supabase = supabaseServer();
    } catch (e) {
      console.error('Supabase is not configured (missing env vars).', e);
      return NextResponse.json(
        { error: 'Service non configuré.', valid: false },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Code invalide', valid: false },
        { status: 400 }
      );
    }

    // Query the invitation code
    const { data, error } = await supabase
      .from('invitation_codes')
      .select('*')
      .eq('code', code.trim())
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: 'Code invalide ou expiré', valid: false },
        { status: 404 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Code invalide ou expiré', valid: false },
        { status: 404 }
      );
    }

    // Check if code has been used
    if ((data as any).used_at) {
      return NextResponse.json(
        { error: 'Ce code a déjà été utilisé', valid: false },
        { status: 400 }
      );
    }

    // Check if code has expired
    const expiresAtRaw = (data as any).expires_at;
    if (!expiresAtRaw) {
      return NextResponse.json(
        { error: 'Code invalide ou expiré', valid: false },
        { status: 404 }
      );
    }

    const expiresAt = new Date(expiresAtRaw);
    const now = new Date();
    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'Ce code a expiré', valid: false },
        { status: 400 }
      );
    }

    // Code is valid
    return NextResponse.json(
      { valid: true, email: data.email },
      { status: 200 }
    );
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du code', valid: false },
      { status: 500 }
    );
  }
}
