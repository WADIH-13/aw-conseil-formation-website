'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CityAutocomplete } from '@/components/admin/CityAutocomplete'

export default function AdminNewSessionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [offerId, setOfferId] = useState('decouvrir-charge-mentale')
  const [format, setFormat] = useState<'presentiel' | 'distanciel'>('presentiel')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [regionCode, setRegionCode] = useState('')
  const [departmentCode, setDepartmentCode] = useState('')
  const [city, setCity] = useState('')
  const [cityInseeCode, setCityInseeCode] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      const dates = [date1, date2].filter(Boolean)
      const res = await fetch('/api/admin/sessions', {
        method: 'POST',
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
      if (!res.ok) throw new Error(json?.error || 'Création impossible')

      router.push('/admin/sessions')
      router.refresh()
    } catch (err: any) {
      setError(err?.message ?? 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm tracking-[0.22em] uppercase text-black/50">Back-office</p>
        <h1 className="text-3xl font-light text-black mt-2">Créer une session</h1>
        <p className="mt-2 text-gray-600">Création en brouillon (validation nationale uniquement à la création).</p>
      </div>

      <form onSubmit={onSubmit} className="bg-white border border-black/5 rounded-2xl p-6 aw-card-surface space-y-5">
        <div>
          <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Formation</label>
          <select className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={offerId} onChange={(e) => setOfferId(e.target.value)}>
            <option value="decouvrir-charge-mentale">Découvrir la charge mentale (7h)</option>
            <option value="mieux-gerer-charge-mentale">Mieux gérer sa charge mentale (7h)</option>
            <option value="devenir-referent-charge-mentale">Devenir référent charge mentale (28h)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Format</label>
          <select className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={format} onChange={(e) => setFormat(e.target.value as any)}>
            <option value="presentiel">Présentiel</option>
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
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Région</label>
              <input className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" value={regionCode} onChange={(e) => setRegionCode(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Département</label>
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
            {loading ? 'Création…' : 'Créer (brouillon)'}
          </button>
          <Link href="/admin/sessions" className="btn-secondary">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
