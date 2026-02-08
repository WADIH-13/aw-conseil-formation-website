import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublicSessionById } from '@/lib/sessions/publicSessions'

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

function renderTextBlock(value: string | null) {
  if (!value) return <p className="text-black/60">Information a confirmer.</p>
  return <p className="text-black/70 leading-relaxed whitespace-pre-line">{value}</p>
}

export default async function SessionDetailPage({ params }: { params: { id: string } }) {
  const session = await getPublicSessionById(params.id)
  if (!session) return notFound()

  const locationLabel = session.format === 'distanciel'
    ? 'Distanciel'
    : [session.city, session.department?.name || session.department_code, session.region?.name || session.region_code]
        .filter(Boolean)
        .join(' · ') || 'Lieu a confirmer'

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Session</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4 leading-tight">
              {session.offer?.title ?? 'Session de formation'}
            </h1>
            {session.family?.name && (
              <p className="text-sm text-black/60">Famille : {session.family.name}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/contact?session=${encodeURIComponent(session.id)}`} className="btn-primary">
                Contacter l'organisateur
              </Link>
              <Link href="/sessions" className="btn-secondary">Retour aux sessions</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <aside className="lg:col-span-1 space-y-5">
              <div className="bg-white border border-black/5 rounded-2xl p-6 aw-card-surface">
                <p className="text-xs tracking-[0.24em] uppercase text-black/50">Informations session</p>
                <dl className="mt-4 space-y-3 text-sm text-black/70">
                  <div>
                    <dt className="text-xs tracking-[0.22em] uppercase text-black/45">Date(s)</dt>
                    <dd className="mt-1 text-black/80">{formatDateRange(session.start_date, session.end_date)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.22em] uppercase text-black/45">Lieu / Format</dt>
                    <dd className="mt-1 text-black/80">{locationLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.22em] uppercase text-black/45">Duree</dt>
                    <dd className="mt-1 text-black/80">
                      {session.duration_hours ? `${session.duration_hours}h` : 'A confirmer'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.22em] uppercase text-black/45">Organise par</dt>
                    <dd className="mt-1 text-black/80">
                      {session.organized_by_label || 'Reseau national'}
                      {session.trainer?.full_name ? ` — ${session.trainer.full_name}` : ''}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 aw-card-surface">
                <p className="text-xs tracking-[0.24em] uppercase text-black/50">Presentation</p>
                <h2 className="text-2xl font-light text-black mt-3">Resume</h2>
                <div className="mt-4">{renderTextBlock(session.offer?.summary ?? null)}</div>
              </div>

              <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 aw-card-surface">
                <p className="text-xs tracking-[0.24em] uppercase text-black/50">Objectifs</p>
                <div className="mt-4">{renderTextBlock(session.offer?.objectives ?? null)}</div>
              </div>

              <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 aw-card-surface">
                <p className="text-xs tracking-[0.24em] uppercase text-black/50">Public concerne</p>
                <div className="mt-4">{renderTextBlock(session.offer?.audience ?? null)}</div>
              </div>

              <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 aw-card-surface">
                <p className="text-xs tracking-[0.24em] uppercase text-black/50">Modalites</p>
                <div className="mt-4">{renderTextBlock(session.offer?.modalities ?? null)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
