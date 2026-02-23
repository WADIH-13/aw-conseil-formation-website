import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { nanoid } from 'nanoid';

// GET: Récupérer un panier par guest_token
export async function GET(req: NextRequest) {
  try {
    const guestToken = req.nextUrl.searchParams.get('guest_token');

    if (!guestToken) {
      return NextResponse.json({ error: 'guest_token requis' }, { status: 400 });
    }

    const supabase = supabaseServer();

    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('*')
      .eq('guest_token', guestToken)
      .single();

    if (cartError) {
      return NextResponse.json({ error: 'Panier non trouvé' }, { status: 404 });
    }

    const { data: items, error: itemsError } = await supabase
      .from('cart_items')
      .select('*, experience:experiences(*)')
      .eq('cart_id', cart.id)
      .order('order_index', { ascending: true });

    if (itemsError) {
      throw itemsError;
    }

    return NextResponse.json({ ...cart, cart_items: items }, { status: 200 });
  } catch (err) {
    console.error('Cart GET error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST: Créer un panier invité
export async function POST(req: NextRequest) {
  try {
    const supabase = supabaseServer();
    const guestToken = nanoid(32);

    const { data, error } = await supabase
      .from('carts')
      .insert([{ guest_token: guestToken }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Cart POST error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
