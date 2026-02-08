export type SessionFormat = 'presentiel' | 'distanciel'

export type PublicationStatus = 'draft' | 'pending_review' | 'published' | 'rejected' | 'archived'

export type AvailabilityStatus = 'places_disponibles' | 'sur_demande'

export interface Family {
  id: string
  name: string
}

export interface Offer {
  id: string
  title: string
  slug: string
  family_id: string | null
  summary: string | null
  objectives: string | null
  audience: string | null
  modalities: string | null
  is_active: boolean
  family?: Family | null
}

export interface Trainer {
  id: string
  full_name: string | null
  role: string
}

export interface Region {
  code: string
  name: string
}

export interface Department {
  code: string
  name: string
  region_code: string
}

export interface City {
  code: string
  name: string
  department_code: string
}

export interface Session {
  id: string
  offer_id: string
  start_date: string | null
  end_date: string | null
  format: SessionFormat
  region_code: string | null
  department_code: string | null
  city: string | null
  publication_status: PublicationStatus
  availability_status: AvailabilityStatus | null
  organized_by_label: string | null
  duration_hours: number | null
  trainer_id: string | null
}

export interface SessionWithRelations extends Session {
  offer: Offer
  family?: Family | null
  trainer?: Trainer | null
  region?: Region | null
  department?: Department | null
}

export interface SessionFilters {
  offer_id?: string
  offer_format?: string
  format?: SessionFormat
  region_code?: string
  department_code?: string
  city?: string
  start_date_from?: string
  start_date_to?: string
}
