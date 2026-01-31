export type TrainingId =
  | 'decouvrir-charge-mentale'
  | 'mieux-gerer-charge-mentale'
  | 'devenir-referent-charge-mentale'

export type SessionFormat = 'presentiel' | 'distanciel'

export type SessionStatus = 'places_disponibles' | 'sur_demande'

export interface Training {
  id: TrainingId
  title: string
  durationHours: number
  durationLabel: string
  slug: string
}

export interface Trainer {
  id: string
  fullName: string
  label: 'Formateur agréé'
  organization?: string
}

export interface SessionLocation {
  format: SessionFormat
  region?: string
  department?: string
  city?: string
}

export interface Session {
  id: string
  trainingId: TrainingId
  dates: string[]
  durationHours: number
  location: SessionLocation
  organizedByLabel: 'Formateur agréé' | 'Réseau national'
  trainerId?: string
  status: SessionStatus
}

export interface SessionFilters {
  trainingId?: TrainingId
  regionOrDepartment?: string
  format?: SessionFormat
  startDateFrom?: string
  startDateTo?: string
}
