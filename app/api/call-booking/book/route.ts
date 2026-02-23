import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const TIME_ZONE = 'Europe/Paris'
const SLOT_MINUTES = 20

const bookingSchema = z.object({
  departmentCode: z.string().min(1),
  slotStart: z.string().datetime(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ message: 'Supabase non configuré.' }, { status: 501 })
  }

  const payload = await request.json().catch(() => null)
  const parsed = bookingSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ message: 'Merci de compléter tous les champs obligatoires.' }, { status: 400 })
  }

  try {
    const supabase = createSupabaseServerClient()

    const { data: assignment, error: assignmentError } = await supabase
      .from('call_department_assignments')
      .select('department_code, responsible:responsible_id (id, is_active)')
      .eq('department_code', parsed.data.departmentCode)
      .maybeSingle()

    const responsible = Array.isArray(assignment?.responsible)
      ? assignment?.responsible[0]
      : assignment?.responsible

    if (assignmentError || !assignment || !responsible || !responsible.is_active) {
      return NextResponse.json({ message: 'Aucun responsable disponible pour ce département.' }, { status: 404 })
    }

    const slotStart = new Date(parsed.data.slotStart)
    if (Number.isNaN(slotStart.getTime()) || slotStart <= new Date()) {
      return NextResponse.json({ message: 'Ce créneau n’est plus disponible.' }, { status: 409 })
    }

    const slotEnd = new Date(slotStart.getTime() + SLOT_MINUTES * 60000)

    const { data: existing } = await supabase
      .from('call_bookings')
      .select('id')
      .eq('responsible_id', responsible.id)
      .eq('status', 'confirmed')
      .eq('start_at', slotStart.toISOString())
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ message: 'Ce créneau vient d’être réservé.' }, { status: 409 })
    }

    const { error: insertError } = await supabase.from('call_bookings').insert({
      responsible_id: responsible.id,
      department_code: assignment.department_code,
      customer_name: parsed.data.name,
      customer_email: parsed.data.email,
      customer_phone: parsed.data.phone ?? null,
      customer_message: parsed.data.message ?? null,
      start_at: slotStart.toISOString(),
      end_at: slotEnd.toISOString(),
      duration_minutes: SLOT_MINUTES,
      time_zone: TIME_ZONE,
      status: 'confirmed',
    })

    if (insertError) {
      return NextResponse.json({ message: 'Impossible de confirmer ce créneau.' }, { status: 500 })
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Impossible de confirmer ce créneau.' }, { status: 500 })
  }
}
