import { NextResponse } from 'next/server'
import type { SessionFilters } from '@/lib/sessions/types'
import { parseSessionFilters } from '@/lib/sessions/filter'
import { getPublicSessions } from '@/lib/sessions/publicSessions'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'

function clampInt(value: string | null, fallback: number, min: number, max: number): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.trunc(n)))
}

function sessionPrimaryDate(session: { start_date: string | null }): string {
  return session.start_date ?? '9999-12-31'
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const filters: SessionFilters = parseSessionFilters(Object.fromEntries(searchParams.entries()))
  const debug = searchParams.get('debug') === '1'

  const limit = clampInt(searchParams.get('limit'), 50, 1, 200)
  const offset = clampInt(searchParams.get('offset'), 0, 0, 100000)

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 501 })
  }

  const all = await getPublicSessions(filters)
  const sorted = all.slice().sort((a, b) => sessionPrimaryDate(a).localeCompare(sessionPrimaryDate(b)))
  const page = sorted.slice(offset, offset + limit)

  if (debug) {
    const supabase = createSupabaseServerClient()

    const publishedSessions = await supabase
      .from('sessions')
      .select('id', { count: 'exact', head: true })
      .eq('publication_status', 'published')

    const activeOffers = await supabase
      .from('offers')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)

    const publishedWithActiveOffers = await supabase
      .from('sessions')
      .select('id, offers!inner (id, is_active)', { count: 'exact', head: true })
      .eq('publication_status', 'published')
      .eq('offers.is_active', true)

    const sessionsWithRegion = await supabase
      .from('sessions')
      .select('id', { count: 'exact', head: true })
      .eq('publication_status', 'published')
      .not('region_code', 'is', null)

    const sessionsWithDepartment = await supabase
      .from('sessions')
      .select('id', { count: 'exact', head: true })
      .eq('publication_status', 'published')
      .not('department_code', 'is', null)

    const regionsCount = await supabase
      .from('regions')
      .select('code', { count: 'exact', head: true })

    const departmentsCount = await supabase
      .from('departments')
      .select('code', { count: 'exact', head: true })

    return NextResponse.json({
      sessions: page,
      total: sorted.length,
      limit,
      offset,
      nextOffset: offset + limit < sorted.length ? offset + limit : null,
      meta: {
        filters,
        counts: {
          publishedSessions: publishedSessions.count ?? 0,
          activeOffers: activeOffers.count ?? 0,
          publishedWithActiveOffers: publishedWithActiveOffers.count ?? 0,
          sessionsWithRegion: sessionsWithRegion.count ?? 0,
          sessionsWithDepartment: sessionsWithDepartment.count ?? 0,
          regions: regionsCount.count ?? 0,
          departments: departmentsCount.count ?? 0,
        },
        errors: {
          publishedSessions: publishedSessions.error?.message ?? null,
          activeOffers: activeOffers.error?.message ?? null,
          publishedWithActiveOffers: publishedWithActiveOffers.error?.message ?? null,
          sessionsWithRegion: sessionsWithRegion.error?.message ?? null,
          sessionsWithDepartment: sessionsWithDepartment.error?.message ?? null,
          regions: regionsCount.error?.message ?? null,
          departments: departmentsCount.error?.message ?? null,
        },
      },
    })
  }

  return NextResponse.json({
    sessions: page,
    total: sorted.length,
    limit,
    offset,
    nextOffset: offset + limit < sorted.length ? offset + limit : null,
  })
}
