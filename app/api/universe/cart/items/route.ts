import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

// POST: Ajouter ou retirer item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cart_id, experience_id, action } = body; // action: 'add' | 'remove'

    if (!cart_id || !experience_id || !action) {
      return NextResponse.json(
        { error: 'Manquent: cart_id, experience_id, action' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    if (action === 'add') {
      // Vérifier que l'item n'existe pas déjà
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id')
        .eq('cart_id', cart_id)
        .eq('experience_id', experience_id)
        .single();

      if (existing) {
        return NextResponse.json({ error: 'Item déjà dans le panier' }, { status: 409 });
      }

      // Compter les items pour définir l'ordre
      const { count } = await supabase
        .from('cart_items')
        .select('*', { count: 'exact', head: true })
        .eq('cart_id', cart_id);

      const { data, error } = await supabase
        .from('cart_items')
        .insert([{ cart_id, experience_id, order_index: count || 0 }])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(data, { status: 201 });
    } else if (action === 'remove') {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart_id)
        .eq('experience_id', experience_id);

      if (error) throw error;
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Action invalide' }, { status: 400 });
    }
  } catch (err) {
    console.error('Cart items POST error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
