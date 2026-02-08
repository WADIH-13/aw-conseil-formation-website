import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'

const CreateSessionSchema = z.object({
  offerId: z.string().min(1),
  format: z.enum(['presentiel', 'distanciel']),
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).default([]),
  region_code: z.string().nullable().optional(),
  department_code: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  city_insee_code: z.string().nullable().optional(),
})

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 501 })
  }

  const supabase = createSupabaseServerClient()

  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { data, error } = await supabase
    .from('sessions')
    .select('id, offer_id, start_date, end_date, format, region_code, department_code, city, publication_status, availability_status, created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ sessions: data })
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 501 })
  }

  const supabase = createSupabaseServerClient()

  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const parsed = CreateSessionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload invalide', details: parsed.error.flatten() }, { status: 400 })
  }

  const payload = parsed.data

  const sortedDates = payload.dates.slice().sort()
  const startDate = sortedDates[0] ?? null
  const endDate = sortedDates.length ? sortedDates[sortedDates.length - 1] : null

  const { data, error } = await supabase.from('sessions').insert({
    offer_id: payload.offerId,
    format: payload.format,
    start_date: startDate,
    end_date: endDate,
    region_code: payload.format === 'presentiel' ? payload.region_code ?? null : null,
    department_code: payload.format === 'presentiel' ? payload.department_code ?? null : null,
    city: payload.format === 'presentiel' ? payload.city ?? null : null,
    city_insee_code: payload.format === 'presentiel' ? payload.city_insee_code ?? null : null,
    publication_status: 'draft',
    availability_status: 'sur_demande',
    organized_by_label: 'Réseau national',
    duration_hours: payload.offerId === 'devenir-referent-charge-mentale' ? 28 : 7,
    created_by: userData.user.id,
  }).select('id').single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ id: data.id })
}
