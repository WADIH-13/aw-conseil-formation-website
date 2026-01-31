import type { Metadata } from 'next'
import Link from 'next/link'
import SessionFinder from '@/components/sessions/SessionFinder'
import { SESSIONS, TRAINERS, TRAININGS } from '@/lib/sessions/sampleData'

export const metadata: Metadata = {
  title: 'Trouver une session - AW Conseil et Formation',
  description:
    'Trouvez une session de formation partout en France : formations nationales standardisées, sessions locales animées par des formateurs agréés.',
}

export default function TrouverUneSessionPage() {
  return (
    <div className="bg-white">
      {/* HERO / INTRO */}
      <section className="aw-hero-surface py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">
              Hub national
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4 leading-tight">
              Trouver une session de formation
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Des formations déployées progressivement sur l’ensemble du territoire,
              animées par des formateurs agréés.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#sessions" className="btn-primary">
                Trouver une session
              </a>
              <Link href="/contact" className="btn-secondary">
                Demander un devis (intra / sur mesure)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FILTRES + RÉSULTATS */}
      <section id="sessions" className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <SessionFinder trainings={TRAININGS} sessions={SESSIONS} trainers={TRAINERS} mode="api" />
          </div>
        </div>
      </section>

      {/* BLOC DE CRÉDIBILITÉ */}
      <section className="py-12 md:py-16 aw-diagonal-surface border-t border-black/5">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto bg-white border border-black/5 rounded-2xl p-8 md:p-10 aw-card-surface">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50">Qualité & cohérence</p>
            <h2 className="text-2xl md:text-3xl font-light text-black mt-3">
              Un déploiement national, une exigence commune
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Les formations sont animées par des formateurs agréés,
              formés à une méthodologie nationale commune.
              Le contenu pédagogique est identique sur l’ensemble du territoire,
              garantissant un haut niveau de qualité et de cohérence.
            </p>
            <div className="mt-6">
              <Link href="/aw-conseil-formation" className="inline-flex items-center text-aw-red hover:text-red-700 font-medium transition-colors">
                En savoir plus sur le réseau de formateurs →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
