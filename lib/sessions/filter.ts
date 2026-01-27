import type { Session, SessionFilters, TrainingId } from './types'

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getSessionStartDate(session: Session): string | undefined {
  if (!session.dates.length) return undefined
  return session.dates.slice().sort()[0]
}

export function filterSessions(sessions: Session[], filters: SessionFilters): Session[] {
  const regionOrDepartment = filters.regionOrDepartment
    ? normalize(filters.regionOrDepartment)
    : undefined

  return sessions.filter((session) => {
    if (filters.trainingId) {
      const trainingId: TrainingId = filters.trainingId
      if (session.trainingId !== trainingId) return false
    }

    if (filters.format) {
      if (session.location.format !== filters.format) return false
    }

    if (regionOrDepartment) {
      const region = session.location.region ? normalize(session.location.region) : ''
      const department = session.location.department ? normalize(session.location.department) : ''
      const city = session.location.city ? normalize(session.location.city) : ''

      const matches =
        region.includes(regionOrDepartment) ||
        department.includes(regionOrDepartment) ||
        city.includes(regionOrDepartment)

      if (!matches) return false
    }

    const start = getSessionStartDate(session)
    if (filters.startDateFrom && start && start < filters.startDateFrom) return false
    if (filters.startDateTo && start && start > filters.startDateTo) return false

    return true
  })
}

export function collectRegions(sessions: Session[]): string[] {
  const regions = new Set<string>()
  for (const session of sessions) {
    if (session.location.region) regions.add(session.location.region)
  }
  return Array.from(regions).sort((a, b) => a.localeCompare(b, 'fr'))
}
