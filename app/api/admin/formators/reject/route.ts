import { supabaseServer } from '@/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    console.log('\n=== REJECT REQUEST ===');
    console.log('ID received:', id);

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Delete formator
    console.log('\n🗑️ Deleting formator...');
    const { error } = await supabase
      .from('formators')
      .delete()
      .eq('id', id);

    console.log('Delete result:', { error });

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: `Erreur lors de la suppression: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('✅ Successfully rejected formator');
    return NextResponse.json(
      { message: 'Profil refusé et supprimé' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { error: `Erreur serveur: ${error instanceof Error ? error.message : 'Inconnue'}` },
      { status: 500 }
    );
  }
}
