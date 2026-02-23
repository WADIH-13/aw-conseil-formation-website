import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      cart_id,
      company_name,
      contact_name,
      email,
      role,
      headcount,
      activity,
      priority,
      message,
      consent_marketing,
    } = body;

    if (!cart_id || !email) {
      return NextResponse.json({ error: 'Manquent: cart_id, email' }, { status: 400 });
    }

    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from('cart_requests')
      .insert([
        {
          cart_id,
          company_name: company_name || null,
          contact_name: contact_name || null,
          email,
          role: role || null,
          headcount: headcount || null,
          activity: activity || null,
          priority: priority || null,
          message: message || null,
          consent_marketing: consent_marketing || false,
          status: 'new',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erreur insertion request:', error);
      throw error;
    }

    // TODO: Envoyer email via Resend/SMTP

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Request API error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
