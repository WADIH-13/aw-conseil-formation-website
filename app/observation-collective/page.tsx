import Link from 'next/link'

export const metadata = {
  title: 'Observation collective stratégique - AW Conseil et Formation',
  description: 'Objectiver les tendances de fonctionnement pour structurer les décisions et piloter les actions dans la durée.',
}

export default function ObservationCollectivePage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Diagnostic structurant</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Observation collective stratégique
            </h1>
            <div className="h-[2px] w-16 bg-aw-red-deep/80 mx-auto mb-8" aria-hidden="true" />
            <p className="text-lg text-gray-600 leading-relaxed">
              Objectiver les tendances de fonctionnement pour structurer les décisions et piloter les actions dans la durée.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Pourquoi observer avant d&apos;agir</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Toute démarche sérieuse de performance humaine commence par un état des lieux structuré. Observer avant d&apos;agir permet de sortir du subjectif, d&apos;identifier les leviers prioritaires et de sécuriser les décisions stratégiques.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              L&apos;observation collective fournit une base factuelle pour prioriser les actions, calibrer les moyens et garantir la cohérence des démarches engagées. Elle sécurise également la traçabilité nécessaire aux financeurs (OPCO, partenaires publics) et aux instances de gouvernance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cette phase n&apos;est ni un audit de conformité, ni une évaluation de performance individuelle. Elle vise à objectiver les conditions de fonctionnement collectif pour structurer un dialogue interne solide et orienter les investissements de manière pertinente.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Ce que nous objectivons</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Notre démarche d&apos;observation porte sur les dimensions collectives du fonctionnement organisationnel. Nous identifions les tendances, les facteurs structurants et les leviers mobilisables.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Tendances collectives de fonctionnement</h3>
                <p className="text-gray-700 leading-relaxed">
                  Charge perçue, qualité des régulations, marges de manœuvre, équilibre entre les exigences et les ressources disponibles.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Conditions organisationnelles</h3>
                <p className="text-gray-700 leading-relaxed">
                  Modes de coordination, circuits de décision, clarté des rôles, qualité des interfaces entre les services.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Facteurs de charge opérationnelle</h3>
                <p className="text-gray-700 leading-relaxed">
                  Densité des sollicitations, interruptions, complexité des tâches, temporalités imposées, disponibilité des outils.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Points d&apos;appui et marges d&apos;amélioration</h3>
                <p className="text-gray-700 leading-relaxed">
                  Pratiques efficaces déjà en place, zones de souplesse possibles, leviers d&apos;ajustement accessibles à court et moyen terme.
                </p>
              </div>

              <div className="aw-card-surface p-6 rounded-2xl border border-black/5 md:col-span-2">
                <h3 className="text-lg font-medium text-black mb-3">Indicateurs utiles au pilotage</h3>
                <p className="text-gray-700 leading-relaxed">
                  Données exploitables pour le suivi dans la durée, la mesure des impacts et l&apos;ajustement des actions engagées.
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
              <h2 className="text-3xl font-light text-black">Ce que nous ne faisons pas</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Pour clarifier notre périmètre et garantir la transparence vis-à-vis des équipes, il est essentiel de préciser ce que notre démarche d&apos;observation n&apos;est pas.
            </p>
            <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-8 rounded-full bg-black/20" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Aucune évaluation individuelle</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nous ne mesurons, ne notons, ni n&apos;apprécions les performances personnelles. Notre regard porte exclusivement sur les dynamiques collectives et les conditions organisationnelles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-8 rounded-full bg-black/20" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Aucun diagnostic médical</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nous n&apos;intervenons ni sur le plan clinique ni sur le plan de santé individuelle. Les questions de santé relèvent de professionnels habilités (médecine du travail, services de santé).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-8 rounded-full bg-black/20" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Aucune analyse psychologique</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nous ne réalisons pas de profils, de tests psychométriques ou d&apos;évaluations comportementales. Notre démarche est centrée sur le fonctionnement organisationnel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-8 rounded-full bg-black/20" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Aucun jugement ou notation</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Notre posture est celle d&apos;un tiers de confiance objectif. Nous identifions des tendances, des zones de tension ou des marges de manœuvre, sans porter de jugement de valeur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-8 rounded-full bg-black/20" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Aucun outil intrusif</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nous respectons strictement la confidentialité et les normes RGPD. Les dispositifs déployés sont anonymisés, volontaires et conçus pour protéger les personnes.
                    </p>
                  </div>
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
              <h2 className="text-3xl font-light text-black">Outils mobilisés</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Nous mobilisons des dispositifs éprouvés, respectueux des personnes et compatibles avec les exigences des financeurs institutionnels.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Questionnaires collectifs anonymisés</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Outils validés permettant d&apos;identifier les tendances de fonctionnement à l&apos;échelle du collectif, dans le respect de la confidentialité individuelle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Ateliers d&apos;observation partagée</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Espaces d&apos;échange structurés où les acteurs de terrain partagent leurs constats et contribuent à l&apos;identification des leviers d&apos;action.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Entretiens de fonctionnement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Échanges confidentiels avec les responsables et acteurs clés pour analyser les conditions de travail réelles et les contraintes opérationnelles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Indicateurs de suivi</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Tableaux de bord simples, exploitables par les directions et les instances représentatives, permettant le pilotage dans la durée.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Synthèses objectivées exploitables en pilotage</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Documents structurés destinés aux décideurs, compatibles avec les exigences de traçabilité des financeurs et les audits qualité.
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
              <h2 className="text-3xl font-light text-black">Finalités opérationnelles</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              L&apos;observation collective sert des finalités stratégiques concrètes, directement utiles aux décideurs et aux financeurs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 py-2 text-gray-700">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Clarifier les priorités d&apos;action en fonction des réalités terrain</p>
              </div>
              <div className="flex items-start gap-3 py-2 text-gray-700">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Structurer les décisions avec des données factuelles</p>
              </div>
              <div className="flex items-start gap-3 py-2 text-gray-700">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Soutenir la cohérence des actions dans la durée</p>
              </div>
              <div className="flex items-start gap-3 py-2 text-gray-700">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Faciliter la traçabilité pour les financeurs et auditeurs</p>
              </div>
              <div className="flex items-start gap-3 py-2 text-gray-700">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Installer une culture d&apos;amélioration continue</p>
              </div>
              <div className="flex items-start gap-3 py-2 text-gray-700">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Renforcer le dialogue social par l&apos;objectivation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-light text-black">Articulation avec la méthode globale</h2>
              <span className="h-[2px] w-10 bg-aw-red-deep/60" aria-hidden="true" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              L&apos;observation collective s&apos;inscrit dans une séquence cohérente garantissant progressivité et efficacité.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="aw-card-surface p-6 rounded-2xl border border-black/5 mb-3">
                  <span className="text-3xl font-light text-aw-red-deep">01</span>
                  <h3 className="text-base font-medium text-black mt-2">Cadrage</h3>
                </div>
                <p className="text-sm text-gray-600">Analyse du contexte et des objectifs</p>
              </div>

              <div className="text-center">
                <div className="aw-card-surface p-6 rounded-2xl border-2 border-aw-red-deep/30 mb-3 bg-aw-red-deep/5">
                  <span className="text-3xl font-light text-aw-red-deep">02</span>
                  <h3 className="text-base font-medium text-black mt-2">Observation</h3>
                </div>
                <p className="text-sm text-gray-600 font-medium">Objectivation des tendances collectives</p>
              </div>

              <div className="text-center">
                <div className="aw-card-surface p-6 rounded-2xl border border-black/5 mb-3">
                  <span className="text-3xl font-light text-aw-red-deep">03</span>
                  <h3 className="text-base font-medium text-black mt-2">Mise en action</h3>
                </div>
                <p className="text-sm text-gray-600">Formation et consolidation</p>
              </div>

              <div className="text-center">
                <div className="aw-card-surface p-6 rounded-2xl border border-black/5 mb-3">
                  <span className="text-3xl font-light text-aw-red-deep">04</span>
                  <h3 className="text-base font-medium text-black mt-2">Pilotage</h3>
                </div>
                <p className="text-sm text-gray-600">Suivi et évaluation</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mt-8 text-center">
              Cette articulation garantit que l&apos;observation produit des résultats directement exploitables et qu&apos;elle s&apos;inscrit dans une dynamique d&apos;amélioration structurée.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              L&apos;observation collective stratégique est un levier d&apos;objectivation permettant de structurer le dialogue interne, de sécuriser les décisions et de garantir la pertinence des investissements réalisés.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-aw-red-deep rounded-[10px] hover:bg-aw-red-deep/90 transition-colors"
              >
                Engager une démarche d&apos;observation
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
