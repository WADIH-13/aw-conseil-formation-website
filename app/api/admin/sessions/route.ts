import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'

const CreateSessionSchema = z.object({
  trainingId: z.string().min(1),
  format: z.enum(['presentiel', 'distanciel']),
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).default([]),
  region: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
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
    .select('id, training_id, dates, format, region, department, city, publication_status, availability_status, created_at')
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
    training_id: payload.trainingId,
    format: payload.format,
    dates: payload.dates,
    start_date: startDate,
    end_date: endDate,
    region: payload.format === 'presentiel' ? payload.region ?? null : null,
    department: payload.format === 'presentiel' ? payload.department ?? null : null,
    city: payload.format === 'presentiel' ? payload.city ?? null : null,
    publication_status: 'draft',
    availability_status: 'sur_demande',
    organized_by_label: 'Réseau national',
    duration_hours: payload.trainingId === 'devenir-referent-charge-mentale' ? 28 : 7,
    created_by: userData.user.id,
  }).select('id').single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ id: data.id })
}
