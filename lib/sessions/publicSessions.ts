import type { SessionFilters, SessionWithRelations } from './types'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'

function mapSessionRow(row: any): SessionWithRelations {
  const offer = row.offers ?? null
  const family = offer?.families ?? null

  return {
    id: row.id,
    offer_id: row.offer_id,
    start_date: row.start_date ?? null,
    end_date: row.end_date ?? null,
    format: row.format,
    region_code: row.region_code ?? null,
    department_code: row.department_code ?? null,
    city: row.city ?? null,
    publication_status: row.publication_status,
    availability_status: row.availability_status ?? null,
    organized_by_label: row.organized_by_label ?? null,
    duration_hours: typeof row.duration_hours === 'number' ? row.duration_hours : null,
    trainer_id: row.trainer_id ?? null,
    offer: offer
      ? {
          id: offer.id,
          title: offer.title,
          slug: offer.slug,
          family_id: offer.family_id ?? null,
          summary: offer.summary ?? null,
          objectives: offer.objectives ?? null,
          audience: offer.audience ?? null,
          modalities: offer.modalities ?? null,
          is_active: !!offer.is_active,
          family: family
            ? {
                id: family.id,
                name: family.name,
              }
            : null,
        }
      : {
          id: row.offer_id,
          title: 'Formation',
          slug: '#',
          family_id: null,
          summary: null,
          objectives: null,
          audience: null,
          modalities: null,
          is_active: true,
          family: null,
        },
    family: family
      ? {
          id: family.id,
          name: family.name,
        }
      : null,
    trainer: row.profiles
      ? {
          id: row.profiles.id,
          full_name: row.profiles.full_name ?? null,
          role: row.profiles.role ?? 'trainer',
        }
      : null,
    region: row.regions
      ? {
          code: row.regions.code,
          name: row.regions.name,
        }
      : null,
    department: row.departments
      ? {
          code: row.departments.code,
          name: row.departments.name,
          region_code: row.departments.region_code,
        }
      : null,
  }
}

export async function getPublicSessions(filters: SessionFilters = {}): Promise<SessionWithRelations[]> {
  if (!isSupabaseConfigured()) return []

  const supabase = createSupabaseServerClient()

  let query = supabase
    .from('sessions')
    .select(
      [
        'id',
        'offer_id',
        'start_date',
        'end_date',
        'format',
        'region_code',
        'department_code',
        'city',
        'publication_status',
        'availability_status',
        'organized_by_label',
        'duration_hours',
        'trainer_id',
        'offers!inner (id, title, slug, family_id, summary, objectives, audience, modalities, is_active, families (id, name))',
        'profiles (id, full_name, role)',
        'regions (code, name)',
        'departments (code, name, region_code)',
      ].join(',')
    )
    .eq('publication_status', 'published')
    .eq('offers.is_active', true)

  if (filters.offer_id) query = query.eq('offer_id', filters.offer_id)
  if (filters.offer_format) query = query.contains('offers.formats', [filters.offer_format])
  if (filters.format) query = query.eq('format', filters.format)
  if (filters.region_code) query = query.eq('region_code', filters.region_code)
  if (filters.department_code) query = query.eq('department_code', filters.department_code)
  if (filters.city) query = query.ilike('city', `%${filters.city}%`)
  if (filters.start_date_from) query = query.gte('start_date', filters.start_date_from)
  if (filters.start_date_to) query = query.lte('start_date', filters.start_date_to)

  const { data, error } = await query.order('start_date', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map(mapSessionRow)
}

export async function getPublicSessionById(id: string): Promise<SessionWithRelations | null> {
  if (!isSupabaseConfigured()) return null

  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from('sessions')
    .select(
      [
        'id',
        'offer_id',
        'start_date',
        'end_date',
        'format',
        'region_code',
        'department_code',
        'city',
        'publication_status',
        'availability_status',
        'organized_by_label',
        'duration_hours',
        'trainer_id',
        'offers!inner (id, title, slug, family_id, summary, objectives, audience, modalities, is_active, families (id, name))',
        'profiles (id, full_name, role)',
        'regions (code, name)',
        'departments (code, name, region_code)',
      ].join(',')
    )
    .eq('publication_status', 'published')
    .eq('offers.is_active', true)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return null
  return mapSessionRow(data)
}

export async function getRegions(): Promise<Array<{ code: string; name: string }>> {
  if (!isSupabaseConfigured()) return []

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('regions')
    .select('code, name')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map((row: any) => ({
    code: row.code,
    name: row.name,
  }))
}

export async function getDepartments(): Promise<Array<{ code: string; name: string; region_code: string }>> {
  if (!isSupabaseConfigured()) return []

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('departments')
    .select('code, name, region_code')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map((row: any) => ({
    code: row.code,
    name: row.name,
    region_code: row.region_code,
  }))
}

export async function getCities(): Promise<Array<{ code: string; name: string; department_code: string }>> {
  if (!isSupabaseConfigured()) return []

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('cities')
    .select('insee_code, name, department_code')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map((row: any) => ({
    code: row.insee_code ?? row.name,
    name: row.name,
    department_code: row.department_code,
  }))
}
