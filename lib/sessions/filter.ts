import type { Session, SessionFilters } from './types'

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getSessionStartDate(session: Session): string | null {
  return session.start_date ?? null
}

export function filterSessions(sessions: Session[], filters: SessionFilters): Session[] {
  const city = filters.city ? normalize(filters.city) : undefined

  return sessions.filter((session) => {
    if (filters.offer_id && session.offer_id !== filters.offer_id) return false

    // offer_format filtering is handled at the query level when using Supabase joins.

    if (filters.format && session.format !== filters.format) return false

    if (filters.region_code && session.region_code !== filters.region_code) return false
    if (filters.department_code && session.department_code !== filters.department_code) return false

    if (city) {
      const sessionCity = session.city ? normalize(session.city) : ''
      if (!sessionCity.includes(city)) return false
    }

    const start = getSessionStartDate(session)
    if (filters.start_date_from && start && start < filters.start_date_from) return false
    if (filters.start_date_to && start && start > filters.start_date_to) return false

    return true
  })
}

function getFirstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0]
  return value
}

export function parseSessionFilters(
  params: Record<string, string | string[] | undefined>
): SessionFilters {
  const offer_id = getFirstValue(params.offer_id)
  const offer_format = getFirstValue(params.offer_format)
  const format = getFirstValue(params.format)
  const region_code = getFirstValue(params.region_code)
  const department_code = getFirstValue(params.department_code)
  const city = getFirstValue(params.city)
  const start_date_from = getFirstValue(params.start_date_from)
  const start_date_to = getFirstValue(params.start_date_to)

  return {
    offer_id: offer_id || undefined,
    offer_format: offer_format || undefined,
    format: format === 'presentiel' || format === 'distanciel' ? format : undefined,
    region_code: region_code || undefined,
    department_code: department_code || undefined,
    city: city || undefined,
    start_date_from: start_date_from || undefined,
    start_date_to: start_date_to || undefined,
  }
}
