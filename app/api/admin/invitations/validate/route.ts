import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
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
      .single();

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
    if (data.used_at) {
      return NextResponse.json(
        { error: 'Ce code a déjà été utilisé', valid: false },
        { status: 400 }
      );
    }

    // Check if code has expired
    const expiresAt = new Date(data.expires_at);
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
