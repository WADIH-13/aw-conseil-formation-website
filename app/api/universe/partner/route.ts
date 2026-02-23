import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, expertise, area, website, message } = body;

    if (!name || !expertise) {
      return NextResponse.json({ error: 'Manquent: name, expertise' }, { status: 400 });
    }

    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from('partner_applications')
      .insert([
        {
          name,
          expertise,
          area: area || null,
          website: website || null,
          message: message || null,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erreur insertion partner:', error);
      return NextResponse.json({ error: 'Erreur insertion' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Partner API error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
