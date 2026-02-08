'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { City, Department, Offer, Region, SessionFilters, SessionWithRelations } from '@/lib/sessions/types'
import { CityAutocomplete } from '@/components/sessions/CityAutocomplete'

function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => Number(n))
  const date = new Date(y, (m ?? 1) - 1, d ?? 1)
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date)
}

function formatDateRange(startDate: string | null, endDate: string | null): string {
  if (!startDate && !endDate) return 'Dates a confirmer'
  if (startDate && (!endDate || endDate === startDate)) return formatDateFr(startDate)
  if (!startDate && endDate) return formatDateFr(endDate)
  return `${formatDateFr(startDate!)} -> ${formatDateFr(endDate!)}`
}

function formatLocation(session: SessionWithRelations): string {
  if (session.format === 'distanciel') return 'Distanciel'
  const parts = [
    session.city,
    session.department?.name || session.department_code,
    session.region?.name || session.region_code,
  ].filter(Boolean)
  return parts.join(' · ') || 'Lieu a confirmer'
}

function statusLabel(value: string | null): { text: string; tone: 'good' | 'neutral' } {
  if (value === 'places_disponibles') return { text: 'Places disponibles', tone: 'good' }
  return { text: 'Sur demande', tone: 'neutral' }
}

function collectOffers(sessions: SessionWithRelations[]): Offer[] {
  const map = new Map<string, Offer>()
  for (const session of sessions) {
    if (session.offer && !map.has(session.offer.id)) {
      map.set(session.offer.id, session.offer)
    }
  }
  return Array.from(map.values()).sort((a, b) => a.title.localeCompare(b.title, 'fr'))
}

export default function PublicSessionsView({
  sessions,
  filters,
  basePath,
  regions,
  departments,
  cities,
}: {
  sessions: SessionWithRelations[]
  filters: SessionFilters
  basePath: string
  regions: Region[]
  departments: Department[]
  cities: City[]
}) {
  const router = useRouter()
  const offers = collectOffers(sessions)
  const totalLabel = sessions.length
  const filteredDepartments = filters.region_code
    ? departments.filter((department) => department.region_code === filters.region_code)
    : departments

  function updateParam(key: keyof SessionFilters, value: string) {
    const next = new URLSearchParams()
    const nextFilters: SessionFilters = {
      offer_id: filters.offer_id,
      offer_format: filters.offer_format,
      format: filters.format,
      region_code: filters.region_code,
      department_code: filters.department_code,
      city: filters.city,
      start_date_from: filters.start_date_from,
      start_date_to: filters.start_date_to,
    }

    if (value) {
      nextFilters[key] = value as never
    } else {
      nextFilters[key] = undefined
    }

    if (key === 'region_code') {
      nextFilters.department_code = undefined
      nextFilters.city = undefined
    }

    if (key === 'department_code') {
      nextFilters.city = undefined
    }

    Object.entries(nextFilters).forEach(([paramKey, paramValue]) => {
      if (!paramValue) return
      next.set(paramKey, paramValue)
    })

    const query = next.toString()
    router.push(query ? `${basePath}?${query}` : basePath)
  }

  return (
    <div className="space-y-10">
      <section aria-label="Filtres" className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 aw-card-surface">
        <form action={basePath} method="get" className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Filtres</p>
              <h2 className="text-2xl md:text-3xl font-light text-black mt-2">Affiner la recherche</h2>
            </div>
            <Link href={basePath} className="btn-secondary">
              Reinitialiser
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Formation</label>
              <select
                name="offer_id"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                value={filters.offer_id ?? ''}
                onChange={(event) => updateParam('offer_id', event.target.value)}
              >
                <option value="">Toutes</option>
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    {offer.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Type d'offre</label>
              <select
                name="offer_format"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                value={filters.offer_format ?? ''}
                onChange={(event) => updateParam('offer_format', event.target.value)}
              >
                <option value="">Tous</option>
                <option value="formation">Formation</option>
                <option value="atelier">Atelier</option>
                <option value="conseil">Conseil</option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Region</label>
              <select
                name="region_code"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                value={filters.region_code ?? ''}
                onChange={(event) => updateParam('region_code', event.target.value)}
              >
                <option value="">Toutes</option>
                {regions.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Departement</label>
              <select
                name="department_code"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                value={filters.department_code ?? ''}
                onChange={(event) => updateParam('department_code', event.target.value)}
              >
                <option value="">Tous</option>
                {filteredDepartments.map((department) => (
                  <option key={department.code} value={department.code}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Format</label>
              <select
                name="format"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                value={filters.format ?? ''}
                onChange={(event) => updateParam('format', event.target.value)}
              >
                <option value="">Tous</option>
                <option value="presentiel">Presentiel</option>
                <option value="distanciel">Distanciel</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Periode</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  name="start_date_from"
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                  value={filters.start_date_from ?? ''}
                  onChange={(event) => updateParam('start_date_from', event.target.value)}
                  aria-label="A partir du"
                />
                <input
                  type="date"
                  name="start_date_to"
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                  value={filters.start_date_to ?? ''}
                  onChange={(event) => updateParam('start_date_to', event.target.value)}
                  aria-label="Jusqu'au"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Ville</label>
              {cities.length ? (
                <CityAutocomplete
                  valueInseeCode={null}
                  valueLabel={filters.city ?? ''}
                  departmentCode={filters.department_code}
                  regionCode={filters.region_code}
                  onPick={(city) => updateParam('city', city.name)}
                />
              ) : (
                <input
                  name="city"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                  placeholder="Ex. Lyon"
                  value={filters.city ?? ''}
                  onChange={(event) => updateParam('city', event.target.value)}
                />
              )}
            </div>

            <div className="lg:col-span-2 flex items-end">
              <button type="submit" className="btn-primary w-full">
                Appliquer les filtres
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-black/60">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-aw-red" />
              {totalLabel} session{totalLabel > 1 ? 's' : ''} dans cette zone
            </span>
            {!sessions.length && (
              <span className="text-black/45">(Essayez d'elargir la zone ou la periode)</span>
            )}
          </div>
        </form>
      </section>

      <section aria-label="Resultats" className="space-y-5">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Resultats</p>
            <h2 className="text-2xl md:text-3xl font-light text-black mt-2">Sessions disponibles</h2>
          </div>
          <Link href="/contact" className="btn-secondary">
            Demander un devis (intra / sur mesure)
          </Link>
        </div>

        {sessions.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sessions.map((session) => {
              const status = statusLabel(session.availability_status)

              return (
                <div key={session.id} className="bg-white border border-black/5 rounded-2xl p-6 md:p-7 aw-card-surface">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.24em] uppercase text-black/50">Formation</p>
                      <h3 className="text-xl font-light text-black mt-2">{session.offer?.title ?? 'Formation'}</h3>
                      {session.family?.name && (
                        <p className="mt-2 text-sm text-black/60">Famille : {session.family.name}</p>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        status.tone === 'good'
                          ? 'text-green-700 bg-green-50 border-green-100'
                          : 'text-black/70 bg-black/[0.03] border-black/10'
                      }`}
                    >
                      {status.text}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-black/70">
                    <div>
                      <p className="text-xs tracking-[0.22em] uppercase text-black/45">Date(s)</p>
                      <p className="mt-1 text-black/80">{formatDateRange(session.start_date, session.end_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.22em] uppercase text-black/45">Lieu / Format</p>
                      <p className="mt-1 text-black/80">{formatLocation(session)}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.22em] uppercase text-black/45">Duree</p>
                      <p className="mt-1 text-black/80">{session.duration_hours ? `${session.duration_hours}h` : 'A confirmer'}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.22em] uppercase text-black/45">Organise par</p>
                      <p className="mt-1 text-black/80">
                        {session.organized_by_label || 'Reseau national'}
                        {session.trainer?.full_name ? ` — ${session.trainer.full_name}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={`/sessions/${session.id}`} className="btn-primary">
                      Voir la session
                    </Link>
                    <Link href={`/contact?session=${encodeURIComponent(session.id)}`} className="btn-secondary">
                      Contacter l'organisateur
                    </Link>
                    {session.offer?.slug && session.offer.slug !== '#' && (
                      <Link href={session.offer.slug} className="btn-secondary">
                        Voir la formation
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white border border-black/5 rounded-2xl p-7 md:p-10 aw-card-surface">
            <p className="text-lg md:text-xl font-light text-black">
              Aucune session programmee pour le moment dans votre zone. Les formations peuvent etre
              organisees sur demande, partout en France.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Demander un devis</Link>
              <Link href="/contact?type=info-sessions" className="btn-secondary">Etre informe des prochaines sessions</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
