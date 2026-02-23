import Link from 'next/link'

export const metadata = {
  title: 'Écosystème coordonné - AW Conseil et Formation',
  description: 'Un dispositif structuré pour agir sur les situations organisationnelles complexes avec cohérence méthodologique et pilotage centralisé.',
}

export default function EcosystemePage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Coordination structurée</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Écosystème coordonné
            </h1>
            <div className="h-[2px] w-16 bg-aw-red-deep/80 mx-auto mb-8" aria-hidden="true" />
            <p className="text-lg text-gray-600 leading-relaxed">
              Un dispositif structuré pour agir sur les situations organisationnelles complexes
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Certaines situations organisationnelles nécessitent plusieurs expertises coordonnées dans un cadre unique, structuré et piloté. Lorsque les enjeux humains et opérationnels demandent plus qu&apos;un levier isolé, la qualité de la coordination détermine la cohérence et l&apos;efficacité globale de la démarche.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                AW Conseil &amp; Formation assure cette coordination centrale, garantissant que chaque intervention s&apos;inscrit dans un cadre méthodologique commun, respectueux des responsabilités internes et compatible avec les exigences des financeurs institutionnels.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cet écosystème n&apos;est ni une multiplication d&apos;actions dispersées, ni un programme standardisé. Il repose sur un pilotage centralisé permettant d&apos;articuler des compétences complémentaires en fonction des besoins réels, dans une logique de cohérence stratégique et de sécurisation des décisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Principe de coordination</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              La coordination est assurée par AW Conseil &amp; Formation pour garantir la cohérence méthodologique, la lisibilité stratégique et la sécurisation institutionnelle de l&apos;ensemble des interventions.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Coordination centrale assurée par AW</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chaque intervention est pilotée depuis un point central unique, évitant la dispersion des actions et garantissant la cohérence d&apos;ensemble.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Cadre méthodologique commun</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Toutes les compétences mobilisées s&apos;inscrivent dans une approche partagée, fondée sur l&apos;observation collective, la structuration progressive et l&apos;ancrage terrain.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Exigences qualité partagées</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Respect des normes professionnelles, confidentialité, traçabilité documentaire et conformité avec les dispositifs de financement mobilisables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Cohérence stratégique des interventions</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chaque action est calibrée en fonction des objectifs organisationnels et articulée avec les autres leviers mobilisés dans la démarche globale.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Lisibilité pour les financeurs</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les démarches sont structurées pour être directement exploitables par les OPCO, partenaires publics et instances de gouvernance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Respect strict des responsabilités internes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Aucune substitution aux lignes managériales. L&apos;écosystème intervient en appui, dans le respect des chaînes de décision et des équilibres organisationnels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Typologie des compétences mobilisables</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              L&apos;écosystème s&apos;appuie sur des compétences éprouvées, articulées en fonction des besoins identifiés lors de la phase de cadrage stratégique.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Conseil et cadrage</h3>
                <p className="text-gray-700 leading-relaxed">
                  Analyse du contexte, structuration des objectifs, calibrage des moyens et définition de la feuille de route stratégique.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Observation collective</h3>
                <p className="text-gray-700 leading-relaxed">
                  Dispositifs d&apos;objectivation des tendances de fonctionnement, identification des leviers prioritaires et construction d&apos;indicateurs de pilotage.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Formation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Développement de compétences internes pour renforcer la capacité d&apos;action des équipes et faciliter l&apos;appropriation des démarches.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Ateliers de mise en pratique</h3>
                <p className="text-gray-700 leading-relaxed">
                  Espaces de consolidation permettant d&apos;ancrer les acquis dans le fonctionnement réel et d&apos;ajuster les pratiques collectives.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Accompagnement dans la durée</h3>
                <p className="text-gray-700 leading-relaxed">
                  Suivi calibré, points d&apos;ajustement réguliers et consolidation des actions dans le temps pour garantir la pérennité des résultats.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Leviers complémentaires intégrés</h3>
                <p className="text-gray-700 leading-relaxed">
                  Modalités spécifiques mobilisées de manière encadrée lorsqu&apos;elles servent un objectif organisationnel précis et s&apos;inscrivent dans le cadre global.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Ce qui différencie cet écosystème</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Pilotage centralisé</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Une coordination unique garantit que toutes les interventions s&apos;inscrivent dans une logique d&apos;ensemble, évitant les actions contradictoires ou dispersées.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Cohérence méthodologique</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Tous les acteurs mobilisés partagent une approche commune, fondée sur l&apos;observation, la structuration progressive et l&apos;ancrage opérationnel.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Sécurisation institutionnelle</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Conformité avec les cadres qualité, traçabilité documentaire et compatibilité avec les dispositifs de financement institutionnels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Adaptabilité sans dispersion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chaque démarche est calibrée en fonction des contraintes réelles, sans dérive vers des actions déconnectées des objectifs stratégiques.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:col-span-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-aw-red-deep flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Continuité d&apos;intervention</h3>
                  <p className="text-gray-700 leading-relaxed">
                    L&apos;écosystème permet d&apos;assurer un suivi dans la durée, avec des ajustements possibles en fonction de l&apos;évolution des besoins organisationnels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Finalité stratégique</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                L&apos;écosystème coordonné vise à sécuriser les décisions stratégiques, maintenir la cohérence des actions engagées et prévenir la dispersion des moyens. Il n&apos;est pas un substitut aux responsabilités internes, mais un cadre structurant facilitant l&apos;appropriation durable par les organisations.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                L&apos;objectif est de renforcer l&apos;autonomie progressive des équipes, de consolider les pratiques dans le temps et de garantir que les investissements réalisés produisent des effets pérennes, mesurables et compatibles avec les exigences institutionnelles.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-aw-red-deep rounded-[10px] hover:bg-aw-red-deep/90 transition-colors"
              >
                Structurer une démarche coordonnée
              </Link>
              <Link
                href="/methodologie-intervention"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-ink border border-black/10 rounded-[10px] hover:border-black/20 transition-colors"
              >
                Découvrir notre méthodologie
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
