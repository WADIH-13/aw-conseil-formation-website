import { NextResponse } from 'next/server'
import { SESSIONS } from '@/lib/sessions/sampleData'
import type { SessionFilters } from '@/lib/sessions/types'
import { filterSessions } from '@/lib/sessions/filter'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'

function clampInt(value: string | null, fallback: number, min: number, max: number): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.trunc(n)))
}

function sessionPrimaryDate(session: { dates: string[] }): string {
  return session.dates.slice().sort()[0] ?? '9999-12-31'
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const filters: SessionFilters = {
    trainingId: (searchParams.get('trainingId') as any) || undefined,
    regionOrDepartment: searchParams.get('q') || undefined,
    format: (searchParams.get('format') as any) || undefined,
    startDateFrom: searchParams.get('from') || undefined,
    startDateTo: searchParams.get('to') || undefined,
  }

  const limit = clampInt(searchParams.get('limit'), 50, 1, 200)
  const offset = clampInt(searchParams.get('offset'), 0, 0, 100000)

  // Mode scalable : si Supabase est branché, lire les sessions publiées depuis la DB.
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient()

      let query = supabase
        .from('sessions')
        .select('id, training_id, dates, start_date, end_date, format, region, department, city, publication_status, availability_status, organized_by_label, duration_hours')
        .eq('publication_status', 'published')

      if (filters.trainingId) query = query.eq('training_id', String(filters.trainingId))
      if (filters.format) query = query.eq('format', String(filters.format))

      const q = filters.regionOrDepartment?.trim()
      if (q) {
        const safe = q.replace(/,/g, ' ').trim()
        query = query.or(
          `region.ilike.%${safe}%,department.ilike.%${safe}%,city.ilike.%${safe}%`
        )
      }

      if (filters.startDateFrom) query = query.gte('start_date', filters.startDateFrom)
      if (filters.startDateTo) query = query.lte('start_date', filters.startDateTo)

      // On récupère un ensemble raisonnable, puis on pagine côté API.
      const { data, error } = await query
        .order('start_date', { ascending: true })
        .limit(5000)

      if (error) throw new Error(error.message)

      const mapped = (data ?? []).map((row: any) => ({
        id: row.id,
        trainingId: row.training_id,
        dates: (row.dates ?? []).map((d: any) => String(d)),
        durationHours:
          typeof row.duration_hours === 'number'
            ? row.duration_hours
            : row.training_id === 'devenir-referent-charge-mentale'
              ? 28
              : 7,
        location: {
          format: row.format,
          region: row.region ?? undefined,
          department: row.department ?? undefined,
          city: row.city ?? undefined,
        },
        organizedByLabel: row.organized_by_label ?? 'Réseau national',
        status: row.availability_status ?? 'sur_demande',
      }))

      // NOTE: le modèle DB est volontairement minimal ici.
      // La durée/organisateur/statut seront enrichis quand on finalise le BO.

      const page = mapped.slice(offset, offset + limit)

      return NextResponse.json({
        sessions: page,
        total: mapped.length,
        limit,
        offset,
        nextOffset: offset + limit < mapped.length ? offset + limit : null,
      })
    } catch {
      // Fallback silencieux sur les données fictives.
    }
  }

  const all = filterSessions(SESSIONS, filters).sort((a, b) =>
    sessionPrimaryDate(a).localeCompare(sessionPrimaryDate(b))
  )

  const page = all.slice(offset, offset + limit)

  return NextResponse.json({
    sessions: page,
    total: all.length,
    limit,
    offset,
    nextOffset: offset + limit < all.length ? offset + limit : null,
  })
}
