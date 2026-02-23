import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Démarches - AW Conseil et Formation',
  description: 'Des démarches structurées, progressives et finançables au service de la performance humaine.',
}

export default function DemarcheQualitePage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Des démarches structurées au service de la performance humaine
            </h1>
            <div className="h-[2px] w-16 bg-aw-red-deep/80 mx-auto mb-8" aria-hidden="true" />
            <p className="text-xl text-gray-600 leading-relaxed">
              AW Conseil &amp; Formation intervient par démarches progressives, durables et
              finançables dans la durée, pour renforcer la qualité de fonctionnement des organisations.
            </p>
          </div>
        </div>
      </section>

      {/* BANDEAU PANORAMIQUE */}
      <section className="aw-diagonal-surface py-10">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-black/5 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="relative h-[280px]">
              <Image
                src="/demarche-banner.jpg"
                alt="Bandeau démarche structurée"
                fill
                sizes="100vw"
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-light text-black">Pourquoi une logique de démarche</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Les enjeux humains et organisationnels nécessitent de la structuration, de la continuité
              et de l&apos;adaptation au contexte. Nous privilégions des démarches cohérentes, articulées
              dans le temps, plutôt que des actions isolées.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Structuration et progressivité des étapes.',
                'Continuité et ajustements dans la durée.',
                'Adaptation aux réalités opérationnelles.',
                'Évaluation dans le temps et lisibilité des actions.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-2 text-gray-700">
                  <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-light text-black">Principes transversaux</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Ces principes constituent le cadre de nos démarches, indépendamment des secteurs et des
              contextes d&apos;intervention.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Progressivité et adaptabilité des parcours.',
                'Co-construction avec les acteurs internes.',
                'Ancrage terrain et réalisme opérationnel.',
                'Évaluation dans le temps et amélioration continue.',
                'Compatibilité avec les cadres financeurs.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-2 text-gray-700">
                  <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-light text-black">Leviers mobilisables</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Nos démarches peuvent combiner plusieurs leviers, selon les objectifs et la maturité
              de l&apos;organisation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Conseil et cadrage.',
                'Observation collective.',
                'Formation.',
                'Ateliers de mise en pratique.',
                'Accompagnement dans la durée.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-2 text-gray-700">
                  <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-light text-black">Cadre institutionnel et qualité</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Nos démarches répondent aux exigences de qualité, de traçabilité et de professionnalisme,
              et s&apos;inscrivent dans le respect des cadres OPCO et des partenaires publics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Qualité, traçabilité, lisibilité des actions.',
                'Confidentialité et professionnalisme.',
                'Compatibilité avec les cadres financeurs.',
                'Cohérence avec les responsabilités internes.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-2 text-gray-700">
                  <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
              Aller plus loin
            </h2>
            <p className="text-gray-700 mb-8">
              Accéder aux pages de méthode et aux premiers leviers d&apos;action.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/notre-approche"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-ink border border-black/10 rounded-[10px] transition-colors"
              >
                Notre approche
              </Link>
              <Link
                href="/observer-pour-agir"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-ink border border-black/10 rounded-[10px] transition-colors"
              >
                Observer pour agir
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
