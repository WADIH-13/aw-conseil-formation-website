import Link from 'next/link'

export const metadata = {
  title: 'Observer pour agir - AW Conseil et Formation',
  description: 'Observation collective et indicateurs non intrusifs pour orienter des démarches progressives et durables.',
}

export default function ObserverPourAgirPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Observer pour agir
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Des outils d&apos;observation collective non intrusifs pour objectiver les réalités
              de terrain et orienter l&apos;action, sans évaluation individuelle.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Pourquoi observer</h2>
            <p className="text-gray-700 leading-relaxed">
              L&apos;observation collective permet de partager un diagnostic de fonctionnement, de rendre
              visibles les points d&apos;appui et les zones d&apos;amélioration, et de prioriser les actions
              avec les acteurs concernés. Elle constitue un point d&apos;entrée rigoureux dans des démarches
              progressives, évolutives et finançables dans la durée.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Ce que l&apos;on observe / ce que l&apos;on n&apos;observe pas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Ce que l&apos;on observe</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Des tendances de fonctionnement collectif.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Des facteurs organisationnels et des conditions d&apos;activité.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Des indicateurs utiles au pilotage des actions.</span>
                  </li>
                </ul>
              </div>
              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Ce que l&apos;on n&apos;observe pas</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Aucune évaluation individuelle ou notation de personnes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Aucun élément médical ou thérapeutique.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Aucun jugement ou interprétation subjective.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Typologie des outils</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Les outils mobilisés s&apos;adaptent au contexte et au niveau de maturité de la structure. Ils
              privilégient des formats collectifs, simples à déployer et compatibles avec les exigences
              de qualité et de traçabilité.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Questionnaires collectifs anonymisés.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Entretiens de fonctionnement et retours d&apos;expérience.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Ateliers d&apos;observation et de mise en commun.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Indicateurs partagés pour le pilotage des actions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Finalités opérationnelles</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              L&apos;observation collective vise à rendre l&apos;action plus lisible et plus efficiente, en
              soutenant des décisions basées sur des faits partagés.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Objectiver les priorités d&apos;action.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Structurer le dialogue interne et externe.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Assurer la cohérence et le suivi des actions dans le temps.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Renforcer la traçabilité pour les financeurs.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Articulation avec les démarches</h2>
            <p className="text-gray-700 leading-relaxed">
              L&apos;observation est un levier d&apos;entrée qui s&apos;insère dans une démarche plus large :
              cadrage, mobilisation, mise en pratique, puis évaluation dans la durée. Cette progression
              permet d&apos;inscrire les actions dans un cadre clair, compatible avec les exigences OPCO
              et les partenaires publics.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">Aller plus loin</h2>
            <p className="text-gray-700 mb-8">
              Identifier les leviers d&apos;action les plus pertinents pour votre contexte.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-red-deep border border-aw-red-deep rounded-[10px] transition-colors"
              >
                Structurer une démarche avec nous
              </Link>
              <Link
                href="/formations"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-ink border border-black/10 rounded-[10px] transition-colors"
              >
                Découvrir les leviers mobilisables
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
