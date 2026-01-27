import Link from 'next/link'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'

type SessionRow = {
  id: string
  training_id: string
  dates: string[] | null
  format: 'presentiel' | 'distanciel'
  city: string | null
  department: string | null
  region: string | null
  publication_status: 'draft' | 'pending_review' | 'published' | 'rejected' | 'archived'
  created_at: string
}

function firstDate(dates: string[] | null): string {
  if (!dates?.length) return '—'
  return dates.slice().sort()[0] ?? '—'
}

export default async function AdminSessionsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-3xl font-light text-black">Sessions</h1>
        <p className="mt-3 text-gray-700">
          Supabase n’est pas configuré. Ajoutez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
        </p>
      </div>
    )
  }

  const supabase = createSupabaseServerClient()

  const { data: sessions, error } = await supabase
    .from('sessions')
    .select('id, training_id, dates, format, city, department, region, publication_status, created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm tracking-[0.22em] uppercase text-black/50">Back-office</p>
          <h1 className="text-3xl md:text-4xl font-light text-black mt-2">Sessions</h1>
          <p className="mt-2 text-gray-600">
            Création (brouillon) → soumission → validation nationale → publication.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/review" className="btn-secondary">Validation nationale</Link>
          <Link href="/admin/sessions/new" className="btn-primary">Créer une session</Link>
        </div>
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
                <th className="text-left font-medium px-6 py-4">Statut</th>
                <th className="text-left font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {(sessions ?? []).map((s: SessionRow) => (
                <tr key={s.id} className="hover:bg-black/[0.015]">
                  <td className="px-6 py-4 text-black/80">{s.training_id}</td>
                  <td className="px-6 py-4 text-black/70">{firstDate(s.dates)}</td>
                  <td className="px-6 py-4 text-black/70">
                    {s.format === 'distanciel'
                      ? 'Distanciel'
                      : [s.city, s.department, s.region].filter(Boolean).join(' · ') || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border text-black/70 bg-black/[0.03] border-black/10">
                      {s.publication_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {s.publication_status === 'draft' ? (
                      <form action={`/api/admin/sessions/${s.id}/submit`} method="post">
                        <button type="submit" className="btn-secondary">Soumettre</button>
                      </form>
                    ) : (
                      <span className="text-black/45">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {!sessions?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-black/60">
                    Aucune session pour le moment.
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
