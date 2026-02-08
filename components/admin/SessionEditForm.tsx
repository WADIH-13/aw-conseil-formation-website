'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CityAutocomplete } from '@/components/admin/CityAutocomplete'

type Props = {
  id: string
  initial: {
    offerId: string
    format: 'presentiel' | 'distanciel'
    startDate: string | null
    endDate: string | null
    regionCode: string | null
    departmentCode: string | null
    city: string | null
    cityInseeCode: string | null
  }
}

export function SessionEditForm({ id, initial }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [offerId, setOfferId] = useState(initial.offerId)
  const [format, setFormat] = useState<'presentiel' | 'distanciel'>(initial.format)
  const [date1, setDate1] = useState(initial.startDate ?? '')
  const [date2, setDate2] = useState(initial.endDate ?? '')
  const [regionCode, setRegionCode] = useState(initial.regionCode ?? '')
  const [departmentCode, setDepartmentCode] = useState(initial.departmentCode ?? '')
  const [city, setCity] = useState(initial.city ?? '')
  const [cityInseeCode, setCityInseeCode] = useState<string | null>(initial.cityInseeCode ?? null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      const dates = [date1, date2].filter(Boolean)
      const res = await fetch(`/api/admin/sessions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId,
          format,
          dates,
          region_code: format === 'presentiel' ? regionCode || null : null,
          department_code: format === 'presentiel' ? departmentCode || null : null,
          city: format === 'presentiel' ? city || null : null,
          city_insee_code: format === 'presentiel' ? cityInseeCode || null : null,
        }),
      })

      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.error || 'Mise a jour impossible')

      router.push('/admin/sessions')
      router.refresh()
    } catch (err: any) {
      setError(err?.message ?? 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-black/5 rounded-2xl p-6 aw-card-surface space-y-5">
      <div>
        <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Formation</label>
        <select className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={offerId} onChange={(e) => setOfferId(e.target.value)}>
          <option value="decouvrir-charge-mentale">Decouvrir la charge mentale (7h)</option>
          <option value="mieux-gerer-charge-mentale">Mieux gerer sa charge mentale (7h)</option>
          <option value="devenir-referent-charge-mentale">Devenir referent charge mentale (28h)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Format</label>
        <select className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={format} onChange={(e) => setFormat(e.target.value as any)}>
          <option value="presentiel">Presentiel</option>
          <option value="distanciel">Distanciel</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Date 1</label>
          <input type="date" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={date1} onChange={(e) => setDate1(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Date 2 (optionnel)</label>
          <input type="date" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={date2} onChange={(e) => setDate2(e.target.value)} />
        </div>
      </div>

      {format === 'presentiel' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Region</label>
            <input className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={regionCode} onChange={(e) => setRegionCode(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Departement</label>
            <input className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={departmentCode} onChange={(e) => setDepartmentCode(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Ville</label>
            <CityAutocomplete
              valueLabel={city}
              valueInseeCode={cityInseeCode}
              departmentCode={departmentCode || undefined}
              regionCode={regionCode || undefined}
              onPick={({ inseeCode, name }) => {
                setCity(name)
                setCityInseeCode(inseeCode)
              }}
            />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-aw-red">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <Link href="/admin/sessions" className="btn-secondary">Annuler</Link>
      </div>
    </form>
  )
}
