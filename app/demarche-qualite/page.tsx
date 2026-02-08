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
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              AW Conseil &amp; Formation intervient par démarches progressives, durables et
              finançables dans la durée, pour renforcer la qualité de fonctionnement des organisations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">
              Pourquoi une logique de démarche
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Les enjeux humains et organisationnels nécessitent de la structuration, de la continuité
              et de l&apos;adaptation au contexte. Nous privilégions des démarches cohérentes, articulées
              dans le temps, plutôt que des actions isolées.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Structuration et progressivité des étapes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Continuité et ajustements dans la durée.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Adaptation aux réalités opérationnelles.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Évaluation dans le temps et lisibilité des actions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Principes transversaux</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ces principes constituent le cadre de nos démarches, indépendamment des secteurs et des
              contextes d&apos;intervention.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Progressivité et adaptabilité des parcours.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Co-construction avec les acteurs internes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Ancrage terrain et réalisme opérationnel.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Évaluation dans le temps et amélioration continue.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Compatibilité avec les cadres financeurs.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Leviers mobilisables</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nos démarches peuvent combiner plusieurs leviers, selon les objectifs et la maturité
              de l&apos;organisation.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Conseil et cadrage.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Observation collective.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Formation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Ateliers de mise en pratique.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Accompagnement dans la durée.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Cadre institutionnel et qualité</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nos démarches répondent aux exigences de qualité, de traçabilité et de professionnalisme,
              et s&apos;inscrivent dans le respect des cadres OPCO et des partenaires publics.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Qualité, traçabilité, lisibilité des actions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Confidentialité et professionnalisme.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Compatibilité avec les cadres financeurs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Cohérence avec les responsabilités internes.</span>
              </li>
            </ul>
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
