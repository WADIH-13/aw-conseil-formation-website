'use client'

import { useEffect, useMemo, useState } from 'react'

type StatsResponse = {
  total: number
  fluide: number
  charge: number
  lourd: number
  periodDays: number
  perimeters: string[]
}

const PERIOD_OPTIONS = [7, 30, 90, 180, 365]

export default function AdminMeteoCollectivePage() {
  const [period, setPeriod] = useState(30)
  const [perimeter, setPerimeter] = useState('')
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const normalizedPerimeter = perimeter.trim()

  const loadStats = async () => {
    setIsLoading(true)
    setError(null)

    const params = new URLSearchParams({ period: String(period) })
    if (normalizedPerimeter) {
      params.set('perimeter', normalizedPerimeter)
    }

    try {
      const res = await fetch(`/api/meteo-collective/stats?${params.toString()}`)
      if (!res.ok) {
        throw new Error('Acces non autorise ou erreur serveur.')
      }
      const data = (await res.json()) as StatsResponse
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement')
      setStats(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadStats()
  }, [period])

  const totals = useMemo(() => {
    const total = stats?.total ?? 0
    return {
      total,
      fluide: total ? Math.round(((stats?.fluide ?? 0) / total) * 100) : 0,
      charge: total ? Math.round(((stats?.charge ?? 0) / total) * 100) : 0,
      lourd: total ? Math.round(((stats?.lourd ?? 0) / total) * 100) : 0,
    }
  }, [stats])

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm tracking-[0.22em] uppercase text-black/50">Back-office</p>
          <h1 className="text-3xl md:text-4xl font-light text-black mt-2">Meteo collective</h1>
          <p className="mt-2 text-gray-600">
            Vue agregee des tendances de fonctionnement collectif.
          </p>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl aw-card-surface p-6 space-y-4 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-black/70">Periode</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PERIOD_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPeriod(option)}
                  className={[
                    'px-3 py-2 rounded-lg border text-sm transition-colors',
                    period === option
                      ? 'border-aw-red-deep text-aw-red-deep bg-aw-red-deep/5'
                      : 'border-black/10 text-black/70 hover:text-aw-red-deep',
                  ].join(' ')}
                >
                  {option} jours
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-black/70" htmlFor="perimeter">
              Perimetre (optionnel)
            </label>
            <input
              id="perimeter"
              value={perimeter}
              onChange={(event) => setPerimeter(event.target.value)}
              placeholder="Ex: Equipe A"
              className="mt-2 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-secondary" onClick={loadStats}>
              Appliquer
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setPerimeter('')
                void loadStats()
              }}
            >
              Reinitialiser
            </button>
          </div>
        </div>
        {stats?.perimeters?.length ? (
          <p className="text-xs text-black/50">
            Perimetres disponibles : {stats.perimeters.join(', ')}
          </p>
        ) : null}
      </div>

      {error && (
        <div className="bg-white border border-black/10 rounded-2xl p-5">
          <p className="text-aw-red text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white border border-black/5 rounded-2xl aw-card-surface p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-black">Synthese</h2>
            <p className="text-sm text-black/60">Total reponses : {stats?.total ?? 0}</p>
          </div>
          <div className="text-sm text-black/50">Periode : {period} jours</div>
        </div>

        <div className="space-y-5">
          {[
            { label: 'Fluide', value: totals.fluide, count: stats?.fluide ?? 0, color: 'bg-green-500' },
            { label: 'Charge', value: totals.charge, count: stats?.charge ?? 0, color: 'bg-yellow-400' },
            { label: 'Lourd', value: totals.lourd, count: stats?.lourd ?? 0, color: 'bg-red-500' },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-black/70">
                <span>{item.label}</span>
                <span>{item.value}% ({item.count})</span>
              </div>
              <div className="h-3 w-full rounded-full bg-black/5 overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <p className="text-sm text-black/50">Chargement des donnees...</p>
        )}
      </div>
    </div>
  )
}
