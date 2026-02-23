import { supabaseServer } from '@/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    console.log('\n=== APPROVE REQUEST ===');
    console.log('ID received:', id);

    if (!id) {
      console.log('❌ No ID provided');
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // First, try to read the record
    console.log('\n📖 Reading formator before update...');
    const { data: existingData, error: readError } = await supabase
      .from('formators')
      .select('id, is_published, name')
      .eq('id', id)
      .single();

    console.log('Read result:', { existingData, readError });

    if (readError || !existingData) {
      console.error('❌ Formator not found:', readError);
      return NextResponse.json(
        { error: 'Formateur non trouvé' },
        { status: 404 }
      );
    }

    // Now update
    console.log('\n✏️ Updating formator...');
    const { data, error, count, status } = await supabase
      .from('formators')
      .update({ is_published: true })
      .eq('id', id)
      .select();

    console.log('Update result:', { data, error, count, status });

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: `Erreur Supabase: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      console.warn('❌ No rows updated for ID:', id);
      return NextResponse.json(
        { error: 'Formateur non trouvé' },
        { status: 404 }
      );
    }

    console.log('✅ Successfully published formator:', data[0]);
    return NextResponse.json(
      { message: 'Profil publié avec succès', data: data[0] },
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
