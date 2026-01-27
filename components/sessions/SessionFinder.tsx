'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { Session, SessionFilters, Trainer, Training } from '@/lib/sessions/types'
import { collectRegions, filterSessions } from '@/lib/sessions/filter'

function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => Number(n))
  const date = new Date(y, (m ?? 1) - 1, d ?? 1)
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date)
}

function sessionPrimaryDate(session: Session): string {
  return session.dates.slice().sort()[0] ?? '9999-12-31'
}

function formatDates(session: Session): string {
  const sorted = session.dates.slice().sort()
  if (sorted.length === 0) return 'Dates à confirmer'
  if (sorted.length === 1) return formatDateFr(sorted[0]!)
  const first = formatDateFr(sorted[0]!)
  const last = formatDateFr(sorted[sorted.length - 1]!)
  return `${first} → ${last}`
}

function locationLabel(session: Session): string {
  if (session.location.format === 'distanciel') return 'Distanciel'
  const parts = [session.location.city, session.location.department, session.location.region].filter(Boolean)
  return parts.join(' · ') || 'Lieu à confirmer'
}

function statusLabel(session: Session): { text: string; tone: 'good' | 'neutral' } {
  if (session.status === 'places_disponibles') return { text: 'Places disponibles', tone: 'good' }
  return { text: 'Sur demande', tone: 'neutral' }
}

export default function SessionFinder({
  trainings,
  sessions,
  trainers,
  mode = 'local',
}: {
  trainings: Training[]
  sessions: Session[]
  trainers: Trainer[]
  mode?: 'local' | 'api'
}) {
  const [filters, setFilters] = useState<SessionFilters>({})

  const [remoteSessions, setRemoteSessions] = useState<Session[] | null>(null)
  const [remoteTotal, setRemoteTotal] = useState<number | null>(null)
  const [remoteNextOffset, setRemoteNextOffset] = useState<number | null>(null)
  const [remoteLoading, setRemoteLoading] = useState(false)
  const [remoteError, setRemoteError] = useState<string | null>(null)
  const [offset, setOffset] = useState(0)

  const effectiveSessions = mode === 'api' ? remoteSessions ?? [] : sessions

  const regions = useMemo(() => collectRegions(sessions), [sessions])

  useEffect(() => {
    if (mode !== 'api') return

    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      try {
        setRemoteLoading(true)
        setRemoteError(null)

        const params = new URLSearchParams()
        if (filters.trainingId) params.set('trainingId', String(filters.trainingId))
        if (filters.regionOrDepartment) params.set('q', filters.regionOrDepartment)
        if (filters.format) params.set('format', String(filters.format))
        if (filters.startDateFrom) params.set('from', filters.startDateFrom)
        if (filters.startDateTo) params.set('to', filters.startDateTo)
        params.set('limit', '50')
        params.set('offset', String(offset))

        const res = await fetch(`/api/sessions?${params.toString()}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })

        if (!res.ok) throw new Error(`Erreur API (${res.status})`)

        const json = (await res.json()) as {
          sessions: Session[]
          total: number
          nextOffset: number | null
        }

        setRemoteSessions((prev) => (offset === 0 ? json.sessions : [...(prev ?? []), ...json.sessions]))
        setRemoteTotal(json.total)
        setRemoteNextOffset(json.nextOffset)
      } catch (e: any) {
        if (e?.name === 'AbortError') return
        setRemoteError(e?.message ?? 'Erreur de chargement')
        setRemoteSessions([])
        setRemoteTotal(0)
        setRemoteNextOffset(null)
      } finally {
        setRemoteLoading(false)
      }
    }, 250)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [mode, filters, offset])

  useEffect(() => {
    if (mode !== 'api') return
    setOffset(0)
    setRemoteSessions(null)
  }, [mode, filters.trainingId, filters.regionOrDepartment, filters.format, filters.startDateFrom, filters.startDateTo])

  const filtered = useMemo(() => {
    if (mode === 'api') {
      return (effectiveSessions ?? []).slice().sort((a, b) => sessionPrimaryDate(a).localeCompare(sessionPrimaryDate(b)))
    }
    const result = filterSessions(sessions, filters)
    return result.slice().sort((a, b) => sessionPrimaryDate(a).localeCompare(sessionPrimaryDate(b)))
  }, [mode, effectiveSessions, sessions, filters])

  const trainingsById = useMemo(() => new Map(trainings.map((t) => [t.id, t])), [trainings])
  const trainersById = useMemo(() => new Map(trainers.map((t) => [t.id, t])), [trainers])

  const hasResults = filtered.length > 0
  const totalLabel = mode === 'api' ? remoteTotal ?? filtered.length : filtered.length

  return (
    <div className="space-y-10">
      {/* Filtres */}
      <section aria-label="Filtres" className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 aw-card-surface">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Filtres</p>
            <h2 className="text-2xl md:text-3xl font-light text-black mt-2">Affiner la recherche</h2>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setFilters({})
              setOffset(0)
              setRemoteSessions(null)
            }}
          >
            Réinitialiser
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Formation</label>
            <select
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
              value={filters.trainingId ?? ''}
              onChange={(e) => {
                const value = e.target.value
                setFilters((prev) => ({ ...prev, trainingId: value ? (value as any) : undefined }))
              }}
            >
              <option value="">Toutes</option>
              {trainings.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.durationLabel})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Région / Département</label>
            <input
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
              placeholder="Ex. Île-de-France, 69, Lyon"
              value={filters.regionOrDepartment ?? ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, regionOrDepartment: e.target.value || undefined }))}
              list="aw-regions"
            />
            <datalist id="aw-regions">
              {regions.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Format</label>
            <select
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
              value={filters.format ?? ''}
              onChange={(e) => {
                const value = e.target.value
                setFilters((prev) => ({ ...prev, format: value ? (value as any) : undefined }))
              }}
            >
              <option value="">Tous</option>
              <option value="presentiel">Présentiel</option>
              <option value="distanciel">Distanciel</option>
            </select>
          </div>

          <div>
            <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Période</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                value={filters.startDateFrom ?? ''}
                onChange={(e) => setFilters((prev) => ({ ...prev, startDateFrom: e.target.value || undefined }))}
                aria-label="À partir du"
              />
              <input
                type="date"
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
                value={filters.startDateTo ?? ''}
                onChange={(e) => setFilters((prev) => ({ ...prev, startDateTo: e.target.value || undefined }))}
                aria-label="Jusqu’au"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-black/60">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-aw-red" />
            {totalLabel} session{totalLabel > 1 ? 's' : ''} trouvée{totalLabel > 1 ? 's' : ''}
          </span>
          {mode === 'api' && remoteLoading && (
            <span className="text-black/45">Chargement…</span>
          )}
          {mode === 'api' && remoteError && (
            <span className="text-aw-red">{remoteError}</span>
          )}
          {!hasResults && (
            <span className="text-black/45">(Essayez d’élargir la zone ou la période)</span>
          )}
        </div>
      </section>

      {/* Résultats */}
      <section aria-label="Résultats" className="space-y-5">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Résultats</p>
            <h2 className="text-2xl md:text-3xl font-light text-black mt-2">Sessions disponibles</h2>
          </div>
          <Link href="/contact" className="btn-secondary">
            Demander un devis (intra / sur mesure)
          </Link>
        </div>

        {hasResults ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filtered.map((session) => {
              const training = trainingsById.get(session.trainingId)
              const trainer = session.trainerId ? trainersById.get(session.trainerId) : undefined
              const status = statusLabel(session)

              const actionHref = `/contact?type=${encodeURIComponent('contact-organisateur')}&session=${encodeURIComponent(session.id)}`

              return (
                <div key={session.id} className="bg-white border border-black/5 rounded-2xl p-6 md:p-7 aw-card-surface">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.24em] uppercase text-black/50">Formation</p>
                      <h3 className="text-xl font-light text-black mt-2">
                        {training?.title ?? 'Formation'}
                      </h3>
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
                      <p className="mt-1 text-black/80">{formatDates(session)}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.22em] uppercase text-black/45">Lieu / Format</p>
                      <p className="mt-1 text-black/80">{locationLabel(session)}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.22em] uppercase text-black/45">Durée</p>
                      <p className="mt-1 text-black/80">{session.durationHours}h</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.22em] uppercase text-black/45">Organisé par</p>
                      <p className="mt-1 text-black/80">
                        {session.organizedByLabel}
                        {trainer?.fullName ? ` — ${trainer.fullName}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={actionHref} className="btn-primary">
                      Contacter l’organisateur
                    </Link>
                    {training?.slug && (
                      <Link href={training.slug} className="btn-secondary">
                        Voir la formation
                      </Link>
                    )}
                  </div>
                </div>
              )
              })}
            </div>

            {mode === 'api' && remoteNextOffset !== null && (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setOffset(remoteNextOffset)}
                  disabled={remoteLoading}
                >
                  Charger plus
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-black/5 rounded-2xl p-7 md:p-10 aw-card-surface">
            <p className="text-lg md:text-xl font-light text-black">
              Aucune session programmée pour le moment dans votre zone.
              Les formations peuvent être organisées sur demande, partout en France.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Demander un devis</Link>
              <Link href="/contact?type=info-sessions" className="btn-secondary">Être informé des prochaines sessions</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
