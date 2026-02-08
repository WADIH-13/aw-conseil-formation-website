import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const payloadSchema = z.object({
  value: z.enum(['fluide', 'charge', 'lourd']),
  perimeter: z.string().trim().min(1).max(64).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const payload = payloadSchema.parse(body)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase non configure' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase.from('meteo_collective_entries').insert([
      {
        value: payload.value,
        perimeter: payload.perimeter ?? null,
      },
    ])

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
