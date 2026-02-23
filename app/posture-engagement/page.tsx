import Link from 'next/link'

export const metadata = {
  title: 'Notre posture & engagement - AW Conseil et Formation',
  description: 'Tiers de confiance structurant, garant de cohérence et de traçabilité pour des démarches durables et finançables.',
}

export default function PostureEngagementPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Posture professionnelle</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Notre posture & engagement
            </h1>
            <div className="h-[2px] w-16 bg-aw-red-deep/80 mx-auto mb-8" aria-hidden="true" />
            <p className="text-lg text-gray-600 leading-relaxed">
              Tiers de confiance structurant, garant de cohérence, de traçabilité et de compatibilité avec les cadres financeurs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                AW Conseil &amp; Formation intervient comme tiers de confiance auprès des organisations engagées dans des démarches de performance humaine et de qualité de fonctionnement. Notre rôle n&apos;est pas de nous substituer aux responsabilités internes, mais de structurer, clarifier et sécuriser des processus durables, en cohérence avec les exigences opérationnelles et les cadres institutionnels.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous accompagnons les directions, encadrements et acteurs de terrain dans la formalisation de démarches lisibles, traçables et compatibles avec les dispositifs de financement mobilisables (OPCO, partenaires publics, programmes sectoriels). Notre posture garantit l&apos;indépendance de l&apos;évaluation, la rigueur méthodologique et l&apos;ancrage dans les réalités de fonctionnement.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Chaque démarche est construite sur mesure, en respect des responsabilités hiérarchiques, dans une logique de co-construction et de progression adaptée au contexte. Nous valorisons la clarté stratégique, la confidentialité et la qualité professionnelle à toutes les étapes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Notre posture d&apos;intervention</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-4">Indépendance et neutralité</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nous intervenons sans conflit d&apos;intérêt, avec une distance professionnelle garantissant l&apos;objectivité des évaluations et la fiabilité des recommandations formulées.
                </p>
              </div>

              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-4">Co-construction avec les acteurs internes</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nos démarches reposent sur la participation active des équipes, l&apos;écoute des réalités terrain et l&apos;intégration des savoirs opérationnels dans la structuration des actions.
                </p>
              </div>

              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-4">Ancrage terrain et réalisme opérationnel</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nos interventions sont calibrées en fonction des contraintes réelles, des ressources disponibles et des capacités d&apos;appropriation par l&apos;organisation. Aucune démarche hors-sol.
                </p>
              </div>

              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-4">Respect des responsabilités hiérarchiques</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nous travaillons en appui des décideurs et des lignes managériales, sans court-circuiter les chaînes de responsabilité ni fragiliser les équilibres internes.
                </p>
              </div>

              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-4">Confidentialité et rigueur professionnelle</h3>
                <p className="text-gray-700 leading-relaxed">
                  Les données recueillies, les échanges et les conclusions produites sont traités dans le strict respect de la confidentialité et de l&apos;éthique professionnelle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Engagement qualité</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Nos démarches sont conçues pour répondre aux exigences des financeurs institutionnels, tout en conservant souplesse et adaptabilité. Nous structurons chaque intervention selon une logique lisible, traçable et évaluable dans le temps.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Structuration des étapes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chaque démarche est découpée en phases identifiées, avec des objectifs clairs, des livrables définis et des jalons permettant d&apos;ajuster le rythme en fonction des besoins.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Lisibilité pour les décideurs</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nos synthèses, rapports et supports de restitution sont conçus pour être directement exploitables par les directions, les instances représentatives et les équipes opérationnelles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Compatibilité avec les dispositifs de financement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nous calibrons nos démarches en cohérence avec les critères de prise en charge (OPCO, appels à projets, subventions sectorielles), en garantissant conformité et traçabilité documentaire.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Traçabilité des actions</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Tout ce qui est engagé est documenté : feuilles de route, comptes-rendus, plans d&apos;action, évaluations intermédiaires. Cette rigueur sécurise l&apos;organisation et facilite les audits ultérieurs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Évaluation dans la durée</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nous prévoyons systématiquement des dispositifs de suivi et d&apos;évaluation permettant de mesurer l&apos;impact réel des actions dans le temps et d&apos;ajuster si nécessaire.
                  </p>
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
              <h2 className="text-3xl font-light text-black">Notre positionnement</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Pour clarifier notre périmètre d&apos;intervention, il est important de préciser ce que nous ne sommes pas :
            </p>
            <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-8 rounded-full bg-black/20" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Pas une approche thérapeutique</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nous n&apos;intervenons pas sur le plan clinique ou psychologique individuel. Nos démarches portent sur les organisations, les collectifs et les conditions de fonctionnement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-8 rounded-full bg-black/20" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Pas une évaluation individuelle</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nous ne réalisons aucune notation, appréciation ou jugement sur les personnes. Notre regard porte sur les processus, les systèmes et les pratiques collectives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-8 rounded-full bg-black/20" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Pas une intervention ponctuelle déconnectée du fonctionnement réel</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nous évitons les évaluations hâtives ou les solutions prêtes à l&apos;emploi. Chaque démarche est construite sur mesure, ancrée dans le contexte et inscrite dans la durée.
                    </p>
                  </div>
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
              <h2 className="text-3xl font-light text-black">Finalité</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Notre objectif est de sécuriser les organisations dans leurs démarches de performance humaine, de renforcer la qualité du fonctionnement collectif et de structurer des actions durables, appropriables par les équipes et compatibles avec les exigences institutionnelles.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Nous contribuons à faire émerger des solutions adaptées, pilotables, transparentes et pérennes, dans le respect des responsabilités internes et en cohérence avec les dispositifs de financement mobilisables.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-aw-red-deep rounded-[10px] hover:bg-aw-red-deep/90 transition-colors"
              >
                Échanger avec nous sur votre démarche
              </Link>
              <Link
                href="/notre-approche"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-ink border border-black/10 rounded-[10px] hover:border-black/20 transition-colors"
              >
                Découvrir notre approche
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
