'use client'

import { useEffect, useMemo, useState } from 'react'

type MeteoLevel = 'fluide' | 'chargee' | 'lourde'

type OptionalDimensionKey = 'interruptions' | 'priorites'

type OptionalDimensionChoice = 'na' | 'low' | 'mid' | 'high'

type MeteoLocalStateV1 = {
  v: 1
  level: MeteoLevel | null
  dimensions: Record<OptionalDimensionKey, OptionalDimensionChoice>
  updatedAt: string
}

const STORAGE_KEY = 'aw:meteoCollective:v1'

const LEVELS: Array<{ value: MeteoLevel; label: string; hint: string; score: number }> = [
  {
    value: 'fluide',
    label: 'Journée fluide',
    hint: 'Collectif plutôt fluide, avec une charge soutenable.',
    score: 25,
  },
  {
    value: 'chargee',
    label: 'Journée chargée',
    hint: 'Sollicitations élevées, besoin de prioriser et de protéger des plages de travail.',
    score: 60,
  },
  {
    value: 'lourde',
    label: 'Journée lourde',
    hint: 'Pression forte : interruptions, urgences ou flou de priorités à réguler rapidement.',
    score: 85,
  },
]

const DIMENSIONS: Array<{
  key: OptionalDimensionKey
  label: string
  helper: string
  choices: Array<{ value: OptionalDimensionChoice; label: string; score: number }>
}> = [
  {
    key: 'interruptions',
    label: 'Interruptions',
    helper: 'À quel point les sollicitations interrompent le travail ? (optionnel)',
    choices: [
      { value: 'na', label: 'Non renseigné', score: 0 },
      { value: 'low', label: 'Faibles', score: 20 },
      { value: 'mid', label: 'Modérées', score: 60 },
      { value: 'high', label: 'Élevées', score: 90 },
    ],
  },
  {
    key: 'priorites',
    label: 'Clarté des priorités',
    helper: 'Les priorités sont-elles claires et stables ? (optionnel)',
    choices: [
      { value: 'na', label: 'Non renseigné', score: 0 },
      { value: 'low', label: 'Claires', score: 20 },
      { value: 'mid', label: 'Moyennes', score: 60 },
      { value: 'high', label: 'Floues', score: 90 },
    ],
  },
]

function safeParseState(raw: string | null): MeteoLocalStateV1 | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw) as any
    if (!value || typeof value !== 'object') return null
    if (value.v !== 1) return null

    const level = value.level
    const dimensions = value.dimensions

    const isLevelOk = level === null || level === 'fluide' || level === 'chargee' || level === 'lourde'
    if (!isLevelOk) return null

    if (!dimensions || typeof dimensions !== 'object') return null

    const out: MeteoLocalStateV1 = {
      v: 1,
      level,
      dimensions: {
        interruptions: dimensions.interruptions ?? 'na',
        priorites: dimensions.priorites ?? 'na',
      },
      updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : new Date().toISOString(),
    }

    return out
  } catch {
    return null
  }
}

function buildDefaultState(): MeteoLocalStateV1 {
  return {
    v: 1,
    level: null,
    dimensions: {
      interruptions: 'na',
      priorites: 'na',
    },
    updatedAt: new Date().toISOString(),
  }
}

function levelToPayload(level: MeteoLevel) {
  const def = LEVELS.find((l) => l.value === level)
  return {
    awScore: def?.score ?? 50,
    levelLabel: def?.label ?? 'Météo collective',
    hint: def?.hint ?? '',
  }
}

function dimensionToScore(key: OptionalDimensionKey, choice: OptionalDimensionChoice): number {
  const def = DIMENSIONS.find((d) => d.key === key)
  const c = def?.choices.find((x) => x.value === choice)
  return c?.score ?? 0
}

export default function MeteoCollectiveLocal() {
  const [state, setState] = useState<MeteoLocalStateV1>(() => buildDefaultState())
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  useEffect(() => {
    const persisted = safeParseState(window.localStorage.getItem(STORAGE_KEY))
    if (persisted) setState(persisted)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, updatedAt: new Date().toISOString() }))
    } catch {
      // Ignore storage errors (private mode, quota, etc.)
    }
  }, [state])

  const result = useMemo(() => {
    if (!state.level) return null

    const base = levelToPayload(state.level)

    const dimensionScores = DIMENSIONS.map((d) => {
      const choice = state.dimensions[d.key]
      const score = dimensionToScore(d.key, choice)
      return {
        key: d.key,
        label: d.label,
        choice,
        value: score,
      }
    }).filter((d) => d.choice !== 'na')

    return {
      ...base,
      dimensionScores,
    }
  }, [state.level, state.dimensions])

  const exportPdf = async () => {
    if (!result) return

    setIsExporting(true)
    setExportError(null)

    const payload = {
      reportType: 'meteo-collective',
      date: new Date().toISOString().slice(0, 10),
      awScore: result.awScore,
      levelLabel: result.levelLabel,
      dimensionScores: result.dimensionScores.map((d) => ({ label: d.label, value: d.value })),
      showNonIndividualNotice: true,
      includeNoDataStoredNotice: true,
    }

    try {
      const res = await fetch('/api/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const message = data?.error || (Array.isArray(data?.errors) ? data.errors.join(' / ') : null)
        throw new Error(message || 'Erreur lors de la génération du PDF')
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Meteo_collective_${payload.date}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Erreur lors de la génération du PDF')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 md:p-7 aw-card-surface text-left">
      <div className="text-xs uppercase tracking-[0.22em] text-black/50">Choix rapide</div>
      <h2 className="mt-2 text-xl md:text-2xl font-light text-black">Comment qualifier la journée type récente ?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        {LEVELS.map((level) => {
          const isActive = state.level === level.value
          return (
            <button
              key={level.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setState((prev) => ({ ...prev, level: level.value }))}
              className={[
                'w-full rounded-2xl border px-5 py-5 text-left transition-all duration-200',
                'bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]',
                isActive ? 'border-aw-red-deep ring-2 ring-aw-red-deep/20' : 'border-black/10',
              ].join(' ')}
            >
              <div className="text-sm tracking-[0.24em] uppercase text-black/50">Niveau</div>
              <div className="mt-2 text-lg font-semibold text-black">{level.label}</div>
              <div className="mt-2 text-sm text-black/65 leading-relaxed">{level.hint}</div>
            </button>
          )
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-black/[0.02] p-5">
        <div className="text-xs uppercase tracking-[0.22em] text-black/50">Dimensions (optionnel)</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIMENSIONS.map((dim) => (
            <div key={dim.key}>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2" htmlFor={`dim-${dim.key}`}>
                {dim.label}
              </label>
              <select
                id={`dim-${dim.key}`}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-black/80"
                value={state.dimensions[dim.key]}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    dimensions: {
                      ...prev.dimensions,
                      [dim.key]: e.target.value as OptionalDimensionChoice,
                    },
                  }))
                }
              >
                {dim.choices.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-black/50">{dim.helper}</p>
            </div>
          ))}
        </div>
      </div>

      {result ? (
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-black/50">Résultat instantané</div>
              <div className="mt-2 text-lg font-semibold text-black">{result.levelLabel}</div>
              <p className="mt-2 text-sm text-black/70 leading-relaxed">{result.hint}</p>
            </div>

            <div className="text-right">
              <div className="text-xs uppercase tracking-[0.22em] text-black/50">Synthèse</div>
              <div className="mt-1 text-3xl font-semibold text-black">{result.awScore}</div>
              <div className="text-xs text-black/50">repère interne (0–100)</div>
            </div>
          </div>

          <div className="mt-5 text-sm text-black/60 space-y-1">
            <p>Cet outil sert à objectiver une tendance collective.</p>
            <p>Ce n’est pas un outil d’évaluation individuelle.</p>
            <p>Aucune donnée personnelle n’est collectée ni stockée.</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={exportPdf} disabled={isExporting}>
              {isExporting ? 'Génération du PDF…' : 'Télécharger le PDF'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setState(buildDefaultState())}
              disabled={isExporting}
            >
              Réinitialiser
            </button>
          </div>

          {exportError ? <p className="mt-4 text-sm text-aw-red">{exportError}</p> : null}
        </div>
      ) : (
        <div className="mt-8 text-sm text-black/60">
          Sélectionnez un niveau pour afficher un résultat instantané.
        </div>
      )}
    </div>
  )
}
