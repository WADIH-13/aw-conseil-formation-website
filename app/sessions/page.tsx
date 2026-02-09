import type { Metadata } from 'next'
import PublicSessionsView from '@/components/sessions/PublicSessionsView'
import { getCities, getDepartments, getPublicSessions, getRegions } from '@/lib/sessions/publicSessions'
import { parseSessionFilters } from '@/lib/sessions/filter'
import { PrimaryCTA } from '@/components/cta/CtaGroup'

export const metadata: Metadata = {
  title: 'Sessions de formation - AW Conseil et Formation',
  description: 'Consultez les sessions de formation disponibles et trouvez la session qui vous convient.',
}

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const filters = parseSessionFilters(searchParams)
  const [sessions, regions, departments, cities] = await Promise.all([
    getPublicSessions(filters),
    getRegions(),
    getDepartments(),
    getCities(),
  ])

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Sessions</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4 leading-tight">
              Sessions de formation ouvertes
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Consultez les sessions disponibles, filtrez par région ou format, et contactez-nous pour organiser
              une session adaptée à votre équipe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <PrimaryCTA context="sessions" variant="primary" showMicroText />
              <a href="#sessions" className="btn-secondary">Voir les sessions</a>
            </div>
          </div>
        </div>
      </section>

      <section id="sessions" className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <PublicSessionsView
              sessions={sessions}
              filters={filters}
              basePath="/sessions"
              regions={regions}
              departments={departments}
              cities={cities}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
