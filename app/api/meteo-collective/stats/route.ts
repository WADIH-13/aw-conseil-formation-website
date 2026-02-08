import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const querySchema = z.object({
  period: z.coerce.number().int().min(1).max(3650).default(30),
  perimeter: z.string().trim().min(1).max(64).optional(),
})

type CountResult = { count: number | null }

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase non configure' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const parsed = querySchema.parse({
      period: searchParams.get('period') || undefined,
      perimeter: searchParams.get('perimeter') || undefined,
    })

    const fromDate = new Date()
    fromDate.setDate(fromDate.getDate() - parsed.period)

    const supabase = createClient(supabaseUrl, supabaseKey)

    const baseQuery = supabase
      .from('meteo_collective_entries')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', fromDate.toISOString())

    const withPerimeter = (query: typeof baseQuery) => {
      if (parsed.perimeter) {
        return query.eq('perimeter', parsed.perimeter)
      }
      return query
    }

    const [fluideRes, chargeRes, lourdRes, perimetersRes] = await Promise.all([
      withPerimeter(baseQuery.eq('value', 'fluide')),
      withPerimeter(baseQuery.eq('value', 'charge')),
      withPerimeter(baseQuery.eq('value', 'lourd')),
      supabase
        .from('meteo_collective_entries')
        .select('perimeter')
        .gte('created_at', fromDate.toISOString())
        .not('perimeter', 'is', null)
        .limit(500),
    ])

    const fluide = (fluideRes as CountResult).count ?? 0
    const charge = (chargeRes as CountResult).count ?? 0
    const lourd = (lourdRes as CountResult).count ?? 0
    const total = fluide + charge + lourd

    const perimeterSet = new Set<string>()
    if (perimetersRes.data) {
      for (const row of perimetersRes.data) {
        if (row.perimeter) perimeterSet.add(row.perimeter)
      }
    }

    return NextResponse.json({
      total,
      fluide,
      charge,
      lourd,
      periodDays: parsed.period,
      perimeters: Array.from(perimeterSet).sort(),
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
