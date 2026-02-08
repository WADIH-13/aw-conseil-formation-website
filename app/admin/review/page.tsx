import Link from 'next/link'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'

type SessionRow = {
  id: string
  offer_id: string
  start_date: string | null
  end_date: string | null
  format: 'presentiel' | 'distanciel'
  city: string | null
  department_code: string | null
  region_code: string | null
  publication_status: 'draft' | 'pending_review' | 'published' | 'rejected' | 'archived'
  created_at: string
  offers?: { title: string | null } | null
}

function firstDate(startDate: string | null, endDate: string | null): string {
  if (startDate) return startDate
  if (endDate) return endDate
  return '—'
}

export default async function AdminReviewPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-3xl font-light text-black">Validation nationale</h1>
        <p className="mt-3 text-gray-700">Supabase n’est pas configuré.</p>
      </div>
    )
  }

  const supabase = createSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-3xl font-light text-black">Validation nationale</h1>
        <p className="mt-3 text-gray-700">Non authentifié.</p>
      </div>
    )
  }

  const { data: sessions, error } = await supabase
    .from('sessions')
    .select('id, offer_id, start_date, end_date, format, city, department_code, region_code, publication_status, created_at, offers (title)')
    .eq('publication_status', 'pending_review')
    .order('created_at', { ascending: true })
    .limit(200)

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm tracking-[0.22em] uppercase text-black/50">Back-office</p>
          <h1 className="text-3xl md:text-4xl font-light text-black mt-2">Validation nationale</h1>
          <p className="mt-2 text-gray-600">Valider la création des sessions avant publication.</p>
        </div>
        <Link href="/admin/sessions" className="btn-secondary">Retour aux sessions</Link>
      </div>

      {error && (
        <div className="bg-white border border-black/10 rounded-2xl p-5">
          <p className="text-aw-red text-sm">{error.message}</p>
        </div>
      )}

      <div className="bg-white border border-black/5 rounded-2xl aw-card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black/[0.02] text-black/70">
              <tr>
                <th className="text-left font-medium px-6 py-4">Formation</th>
                <th className="text-left font-medium px-6 py-4">Date</th>
                <th className="text-left font-medium px-6 py-4">Lieu/Format</th>
                <th className="text-left font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {(sessions ?? []).map((s: SessionRow) => (
                <tr key={s.id} className="hover:bg-black/[0.015]">
                  <td className="px-6 py-4 text-black/80">{s.offers?.title || s.offer_id}</td>
                  <td className="px-6 py-4 text-black/70">{firstDate(s.start_date, s.end_date)}</td>
                  <td className="px-6 py-4 text-black/70">
                    {s.format === 'distanciel'
                      ? 'Distanciel'
                      : [s.city, s.department_code, s.region_code].filter(Boolean).join(' · ') || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <form action={`/api/admin/sessions/${s.id}/approve`} method="post">
                        <button type="submit" className="btn-primary">Valider & publier</button>
                      </form>
                      <form action={`/api/admin/sessions/${s.id}/reject`} method="post">
                        <button type="submit" className="btn-secondary">Refuser</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {!sessions?.length && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-black/60">
                    Aucune session en attente.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
