import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const UpdateSessionSchema = z.object({
  offerId: z.string().min(1),
  format: z.enum(['presentiel', 'distanciel']),
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).default([]),
  region_code: z.string().nullable().optional(),
  department_code: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  city_insee_code: z.string().nullable().optional(),
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 501 })
  }

  const supabase = createSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const parsed = UpdateSessionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload invalide', details: parsed.error.flatten() }, { status: 400 })
  }

  const payload = parsed.data
  const sortedDates = payload.dates.slice().sort()
  const startDate = sortedDates[0] ?? null
  const endDate = sortedDates.length ? sortedDates[sortedDates.length - 1] : null

  const { error } = await supabase
    .from('sessions')
    .update({
      offer_id: payload.offerId,
      format: payload.format,
      start_date: startDate,
      end_date: endDate,
      region_code: payload.format === 'presentiel' ? payload.region_code ?? null : null,
      department_code: payload.format === 'presentiel' ? payload.department_code ?? null : null,
      city: payload.format === 'presentiel' ? payload.city ?? null : null,
      city_insee_code: payload.format === 'presentiel' ? payload.city_insee_code ?? null : null,
    })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
