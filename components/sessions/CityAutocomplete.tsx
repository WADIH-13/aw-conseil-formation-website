'use client'

import { useEffect, useMemo, useState } from 'react'

type CityItem = {
  insee_code: string
  name: string
  department_code: string
  region_code: string
}

type Props = {
  valueInseeCode: string | null
  valueLabel: string
  onPick: (city: { inseeCode: string; name: string }) => void
  departmentCode?: string
  regionCode?: string
  placeholder?: string
}

export function CityAutocomplete({
  valueInseeCode,
  valueLabel,
  onPick,
  departmentCode,
  regionCode,
  placeholder = 'Ville (tape 2 lettres)...',
}: Props) {
  const [q, setQ] = useState(valueLabel || '')
  const [items, setItems] = useState<CityItem[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setQ(valueLabel || '')
  }, [valueLabel])

  const queryUrl = useMemo(() => {
    const sp = new URLSearchParams()
    sp.set('q', q.trim())
    sp.set('limit', '10')
    if (departmentCode) sp.set('department_code', departmentCode)
    if (regionCode) sp.set('region_code', regionCode)
    return `/api/cities?${sp.toString()}`
  }, [q, departmentCode, regionCode])

  useEffect(() => {
    const term = q.trim()
    if (term.length < 2) {
      setItems([])
      return
    }

    let cancelled = false

    async function run() {
      setLoading(true)
      try {
        const res = await fetch(queryUrl, { cache: 'no-store' })
        const json = await res.json()
        if (!cancelled) setItems(json.items ?? [])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const t = setTimeout(run, 180)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [queryUrl])

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 120)
        }}
        placeholder={placeholder}
        aria-label="Ville"
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
      />

      {open && (loading || items.length > 0) && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] max-h-72 overflow-auto rounded-xl border border-black/10 bg-white shadow-lg z-50">
          {loading && (
            <div className="px-3 py-2 text-sm text-black/60">Recherche...</div>
          )}

          {!loading &&
            items.map((c) => (
              <button
                key={c.insee_code}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onPick({ inseeCode: c.insee_code, name: c.name })}
                className="block w-full text-left px-3 py-2 hover:bg-black/[0.03]"
              >
                <div className="font-semibold text-black/90">{c.name}</div>
                <div className="text-xs text-black/50">
                  {c.department_code} · {c.region_code} · {c.insee_code}
                </div>
              </button>
            ))}

          {!loading && items.length === 0 && (
            <div className="px-3 py-2 text-sm text-black/60">Aucune ville trouvee.</div>
          )}
        </div>
      )}

      {valueInseeCode && (
        <div className="mt-2 text-xs text-black/50">Code INSEE: {valueInseeCode}</div>
      )}
    </div>
  )
}
