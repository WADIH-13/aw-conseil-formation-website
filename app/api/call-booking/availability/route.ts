import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const TIME_ZONE = 'Europe/Paris'
const SLOT_MINUTES = 20
const MAX_DAYS = 30

const querySchema = z.object({
  department_code: z.string().min(1),
  days: z.string().optional(),
})

type AvailabilityRule = {
  weekday: number
  start_time: string
  end_time: string
}

function parseTimeToMinutes(value: string): number {
  const [hour, minute] = value.split(':').map((n) => Number(n))
  return hour * 60 + (minute || 0)
}

function formatMinutes(value: number): string {
  const hour = Math.floor(value / 60)
  const minute = value % 60
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

function getDateInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function addDaysToDate(dateValue: string, days: number): string {
  const [year, month, day] = dateValue.split('-').map((n) => Number(n))
  const date = new Date(Date.UTC(year, month - 1, day + days))
  return date.toISOString().slice(0, 10)
}

function getWeekday(dateValue: string): number {
  const [year, month, day] = dateValue.split('-').map((n) => Number(n))
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  )

  return (asUtc - date.getTime()) / 60000
}

function zonedTimeToUtc(dateValue: string, timeValue: string, timeZone: string): Date {
  const [year, month, day] = dateValue.split('-').map((n) => Number(n))
  const [hour, minute] = timeValue.split(':').map((n) => Number(n))
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute))
  const offset = getTimeZoneOffsetMinutes(utcDate, timeZone)
  return new Date(utcDate.getTime() - offset * 60000)
}

function buildSlotsForDay(dateValue: string, rules: AvailabilityRule[], now: Date, occupied: Set<number>) {
  const weekday = getWeekday(dateValue)
  const dayRules = rules.filter((rule) => rule.weekday === weekday)
  const slots = [] as { start: string; end: string; label: string }[]

  for (const rule of dayRules) {
    const startMinutes = parseTimeToMinutes(rule.start_time)
    const endMinutes = parseTimeToMinutes(rule.end_time)

    for (let minutes = startMinutes; minutes + SLOT_MINUTES <= endMinutes; minutes += SLOT_MINUTES) {
      const timeLabel = formatMinutes(minutes)
      const slotStart = zonedTimeToUtc(dateValue, timeLabel, TIME_ZONE)
      const slotEnd = new Date(slotStart.getTime() + SLOT_MINUTES * 60000)

      if (slotStart <= now) continue
      if (occupied.has(slotStart.getTime())) continue

      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        label: timeLabel,
      })
    }
  }

  return slots
}

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ message: 'Supabase non configuré.' }, { status: 501 })
  }

  const { searchParams } = new URL(request.url)
  const parsed = querySchema.safeParse({
    department_code: searchParams.get('department_code') ?? '',
    days: searchParams.get('days') ?? undefined,
  })

  if (!parsed.success) {
    return NextResponse.json({ message: 'Paramètres invalides.' }, { status: 400 })
  }

  const days = Math.min(
    MAX_DAYS,
    Math.max(7, Number(parsed.data.days ?? 14) || 14)
  )

  try {
    const supabase = createSupabaseServerClient()

    const { data: assignment, error: assignmentError } = await supabase
      .from('call_department_assignments')
      .select('department_code, responsible:responsible_id (id, full_name, title, is_active)')
      .eq('department_code', parsed.data.department_code)
      .maybeSingle()

    const responsible = Array.isArray(assignment?.responsible)
      ? assignment?.responsible[0]
      : assignment?.responsible

    if (assignmentError || !responsible || !responsible.is_active) {
      return NextResponse.json({ message: 'Aucun responsable disponible pour ce département.' }, { status: 404 })
    }

    const { data: rules, error: rulesError } = await supabase
      .from('call_availability_rules')
      .select('weekday, start_time, end_time')
      .eq('responsible_id', responsible.id)
      .eq('is_active', true)

    if (rulesError) {
      return NextResponse.json({ message: 'Impossible de charger les créneaux.' }, { status: 500 })
    }

    const now = new Date()
    const startDate = getDateInTimeZone(now, TIME_ZONE)
    const endDate = addDaysToDate(startDate, days)
    const rangeStart = zonedTimeToUtc(startDate, '00:00', TIME_ZONE)
    const rangeEnd = zonedTimeToUtc(endDate, '00:00', TIME_ZONE)

    const { data: bookings, error: bookingsError } = await supabase
      .from('call_bookings')
      .select('start_at')
      .eq('responsible_id', responsible.id)
      .eq('status', 'confirmed')
      .gte('start_at', rangeStart.toISOString())
      .lt('start_at', rangeEnd.toISOString())

    if (bookingsError) {
      return NextResponse.json({ message: 'Impossible de charger les créneaux.' }, { status: 500 })
    }

    const occupied = new Set((bookings ?? []).map((booking) => new Date(booking.start_at).getTime()))
    const daysList = Array.from({ length: days }, (_, index) => addDaysToDate(startDate, index))

    const availabilityDays = daysList.map((dateValue) => ({
      date: dateValue,
      slots: buildSlotsForDay(dateValue, rules ?? [], now, occupied),
    }))

    return NextResponse.json({
      responsible: {
        id: responsible.id,
        full_name: responsible.full_name,
        title: responsible.title,
      },
      days: availabilityDays,
    })
  } catch (error) {
    return NextResponse.json({ message: 'Impossible de charger les créneaux.' }, { status: 500 })
  }
}
