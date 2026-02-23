import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { codeId } = await req.json();

    if (!codeId) {
      return NextResponse.json({ error: 'ID requis.' }, { status: 400 });
    }

    const supabase = supabaseServer();

    // Supprimer le code
    const { error } = await supabase
      .from('invitation_codes')
      .delete()
      .eq('id', codeId);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json({ error: 'Erreur suppression.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Code révoqué.' }, { status: 200 });
  } catch (err) {
    console.error('Revoke code error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
