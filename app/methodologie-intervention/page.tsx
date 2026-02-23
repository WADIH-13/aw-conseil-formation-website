import Link from 'next/link'

export const metadata = {
  title: 'Méthodologie d\'intervention - AW Conseil et Formation',
  description: 'Une méthode structurée, progressive et finançable pour renforcer la performance humaine et la qualité organisationnelle.',
}

export default function MethodologieInterventionPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Méthode</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Méthodologie d&apos;intervention
            </h1>
            <div className="h-[2px] w-16 bg-aw-red-deep/80 mx-auto mb-8" aria-hidden="true" />
            <p className="text-lg text-gray-600 leading-relaxed">
              Une démarche structurée, progressive et finançable pour renforcer la performance humaine et sécuriser le fonctionnement organisationnel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-6">
              Notre méthode repose sur une progression en quatre étapes, conçue pour s&apos;adapter aux réalités opérationnelles de chaque organisation. Chaque phase est calibrée en fonction des contraintes terrain, des objectifs stratégiques et des critères de prise en charge par les financeurs (OPCO, dispositifs sectoriels, subventions publiques).
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cette structuration garantit la traçabilité des actions, la lisibilité pour les décideurs et la compatibilité avec les cadres qualité et réglementaires en vigueur.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="aw-card-surface p-8 md:p-12 rounded-2xl border border-black/5">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-light text-aw-red-deep">01</span>
                <h2 className="text-3xl font-light text-black">Cadrage stratégique</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous démarrons par une analyse du fonctionnement existant : contraintes opérationnelles, objectifs visés, lignes de responsabilité, dispositifs de financement mobilisables. Cette phase permet d&apos;identifier les leviers prioritaires et de calibrer la démarche en cohérence avec les moyens disponibles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Objectifs</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Cartographier le contexte et les enjeux réels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Identifier les acteurs internes et les responsabilités</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Définir les priorités stratégiques</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Bénéfices</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Vision partagée des objectifs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Feuille de route claire et appropriable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Sécurisation de la compatibilité financeur</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="aw-card-surface p-8 md:p-12 rounded-2xl border border-black/5">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-light text-aw-red-deep">02</span>
                <h2 className="text-3xl font-light text-black">Observation collective et objectivation</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous déployons des outils d&apos;observation non intrusifs permettant de mesurer les tendances de fonctionnement, les zones de tension potentielles et les marges de manœuvre disponibles. Cette phase repose sur des dispositifs collectifs respectueux de la confidentialité individuelle.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Objectifs</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Identifier les leviers d&apos;action prioritaires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Objectiver les perceptions et les dynamiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Prioriser les actions à engager</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Bénéfices</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Données exploitables et traçables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Participation active des équipes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Conformité RGPD et respect des personnes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="aw-card-surface p-8 md:p-12 rounded-2xl border border-black/5">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-light text-aw-red-deep">03</span>
                <h2 className="text-3xl font-light text-black">Mise en action et consolidation</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Cette phase mobilise des formations, ateliers, accompagnements opérationnels ou dispositifs de structuration interne. L&apos;objectif est de renforcer les compétences des acteurs clés et d&apos;ancrer les nouvelles pratiques dans le fonctionnement réel de l&apos;organisation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Objectifs</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Développer les compétences internes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Structurer les nouveaux processus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Installer des pratiques pérennes</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Bénéfices</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Autonomie progressive de l&apos;organisation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Actions directement opérationnelles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Moyens mobilisables via OPCO</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="aw-card-surface p-8 md:p-12 rounded-2xl border border-black/5">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-light text-aw-red-deep">04</span>
                <h2 className="text-3xl font-light text-black">Pilotage et évaluation dans la durée</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous assurons un suivi calibré dans le temps, avec des indicateurs adaptés et des points d&apos;ajustement réguliers. Cette phase garantit la traçabilité des actions, mesure l&apos;impact réel et permet les corrections de trajectoire si nécessaire.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Objectifs</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Mesurer l&apos;impact des actions engagées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Ajuster et adapter si nécessaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Documenter la démarche pour les auditeurs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Bénéfices</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Visibilité stratégique sur les résultats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Traçabilité complète des étapes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-6 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <span>Conformité avec les exigences qualité</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Ce qui différencie notre méthode</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Progressivité</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nous privilégions des démarches par étapes, ajustables en fonction des contraintes terrain et des moyens disponibles. Pas d&apos;intervention figée ou surdimensionnée.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Adaptabilité</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chaque organisation est unique. Notre méthodologie s&apos;adapte aux spécificités sectorielles, aux cultures internes et aux réalités opérationnelles concrètes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Cohérence globale</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chaque action s&apos;inscrit dans une logique d&apos;ensemble, articulée aux objectifs stratégiques de l&apos;organisation et aux exigences des partenaires financeurs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Lisibilité stratégique</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nos restitutions et supports de pilotage sont conçus pour être directement exploitables par les directions, les financeurs et les instances de gouvernance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Cette méthodologie garantit des démarches sécurisées, pilotables et compatibles avec les dispositifs de financement. Elle permet aux organisations de structurer des actions durables, appropriables et conformes aux cadres qualité en vigueur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-aw-red-deep rounded-[10px] hover:bg-aw-red-deep/90 transition-colors"
              >
                Échanger sur votre projet
              </Link>
              <Link
                href="/posture-engagement"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-ink border border-black/10 rounded-[10px] hover:border-black/20 transition-colors"
              >
                Découvrir notre posture
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
