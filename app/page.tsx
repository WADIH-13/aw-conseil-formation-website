import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">

      {/* HERO – Proposition de valeur globale */}
      <section className="aw-hero-surface py-28 md:py-40">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
              <div className="text-left">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 text-xs md:text-sm tracking-[0.2em] uppercase text-black/60 mb-12">
                  Conseil · Formation · Écosystème de compétences
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-aw-ink mb-8 leading-[1.06]">
                  Performance humaine et qualité de fonctionnement des organisations.
                </h1>

                <p className="text-lg md:text-xl font-light text-black/80 leading-[1.6] mb-10 max-w-3xl">
                  Nous accompagnons les organisations, les financeurs et les acteurs de terrain
                  dans la structuration de démarches durables de prévention et d&apos;amélioration
                  de la qualité de vie au travail. Des démarches progressives, évolutives et
                  finançables dans la durée.
                </p>

                <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-medium text-aw-red-deep border border-aw-red-deep rounded-[10px] transition-colors"
                  >
                    Structurer une démarche avec nous
                  </Link>
                  <Link
                    href="/formations"
                    className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-medium text-aw-ink border border-black/10 rounded-[10px] transition-colors"
                  >
                    Découvrir les leviers mobilisables
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  {/* Bloc positionnement */}
                  <div className="aw-card-surface rounded-3xl border border-black/5 p-8 md:p-10 flex flex-col min-h-[220px] justify-between shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-black/50 mb-4">Structurer · Prévenir · Accompagner</div>
                      <p className="text-lg md:text-xl font-light text-aw-ink mb-3">
                        Un partenaire de démarche, ancré dans le terrain et les pratiques réelles.
                      </p>
                      <p className="text-sm text-black/70">
                        Approche rigoureuse, co-construction avec les acteurs existants, outils d&apos;observation
                        collective et indicateurs non intrusifs pour éclairer l&apos;action.
                      </p>
                    </div>
                    <div className="mt-6 text-xs text-black/50">Rigueur · Terrain · Confiance</div>
                  </div>
                  {/* Bloc écosystème */}
                  <div className="aw-card-surface rounded-3xl border border-black/5 p-8 md:p-10 flex flex-col justify-between min-h-[180px] bg-[#F4F2F0] shadow-[0_12px_30px_rgba(139,29,29,0.04)]">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-black/55 mb-3">Écosystème de compétences</div>
                      <p className="text-lg font-light text-aw-ink mb-3">
                        La formation est un levier parmi d&apos;autres.
                      </p>
                      <p className="text-sm text-black/70">
                        Conseil, ateliers, outils terrain et réseau de partenaires spécialisés
                        pour une action globale et cohérente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVIERS D'ACTION – Conseil / Formation / Ateliers */}
      <section className="py-20 md:py-24 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">
              Nos leviers d&apos;action
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-4">
              Conseil, formation et pratiques de terrain
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Chaque intervention s&apos;inscrit dans une logique de structuration et d&apos;amélioration continue,
              au plus près des réalités opérationnelles, avec des étapes finançables dans la durée.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-sm text-aw-red font-medium mb-3">Conseil</div>
                <h3 className="text-xl font-medium text-black mb-3">Structurer en amont</h3>
                <p className="text-gray-700">
                  Analyse, recommandations et plan d&apos;action pour inscrire la prévention
                  dans le fonctionnement quotidien de l&apos;organisation.
                </p>
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-sm text-aw-red font-medium mb-3">Formation</div>
                <h3 className="text-xl font-medium text-black mb-3">Monter en compétences</h3>
                <p className="text-gray-700">
                  Parcours certifiés Qualiopi, conçus pour développer l&apos;autonomie des équipes
                  et répondre aux exigences des financeurs.
                </p>
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-sm text-aw-red font-medium mb-3">Ateliers terrain</div>
                <h3 className="text-xl font-medium text-black mb-3">Expérimenter et ancrer</h3>
                <p className="text-gray-700">
                  Espaces d&apos;expérimentation pour tester, ajuster et intégrer
                  des pratiques concrètes dans le quotidien professionnel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION ET POSTURE */}
      <section className="py-20 md:py-24">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">
                  Notre posture
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
                  Un tiers de confiance au service des organisations
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Nous intervenons comme interface entre les équipes de terrain,
                  les compétences métier et les décideurs.
                  Notre rôle : contribuer à la performance humaine et économique
                  des structures que nous accompagnons, sans jamais se substituer à elles.
                </p>
                <p className="text-gray-700 mb-6">
                  Chaque projet est co-construit avec les acteurs en place,
                  dans le respect des cadres qualité et des exigences des financeurs.
                  Nous mobilisons des outils d&apos;observation collective et des indicateurs non intrusifs
                  pour orienter les décisions et ajuster les actions.
                </p>
                <p className="text-gray-600 text-sm italic">
                  Si vous êtes ici, c&apos;est que vous êtes déjà engagé dans une démarche responsable.
                  Nous sommes là pour la structurer ou l&apos;enrichir avec vous.
                </p>
              </div>
              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-5">Ce que nous apportons</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Une approche structurée et des méthodes éprouvées sur le terrain.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Des parcours conformes aux exigences Qualiopi et des financeurs.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Un réseau de compétences complémentaires mobilisable selon les besoins.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Un accompagnement confidentiel, professionnel et orienté résultats.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÉNÉFICES – Pour les organisations ET les financeurs */}
      <section className="py-20 md:py-24 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">
                Bénéfices concrets
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-black mb-4">
                Un impact mesurable pour chaque partie prenante
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nos interventions produisent des résultats tangibles,
                tant pour les organisations accompagnées que pour les partenaires qui financent ces démarches.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-black/5 p-8 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-sm text-aw-red font-medium mb-3">Pour les organisations</div>
                <h3 className="text-xl font-medium text-black mb-4">Améliorer le fonctionnement au quotidien</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Réduction des facteurs de surcharge et prévention des risques psychosociaux.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Montée en compétences des équipes et autonomie dans les pratiques.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Cadre structurant pour une amélioration continue et durable.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-sm text-aw-red font-medium mb-3">Pour les financeurs et institutions</div>
                <h3 className="text-xl font-medium text-black mb-4">Investir dans des actions à impact réel</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Actions ancrées dans le terrain, traçables et évaluables.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Indicateurs non intrusifs pour un pilotage clair, sans surcharge des équipes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Conformité aux référentiels qualité et aux attentes des OPCO.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3 mt-0.5">•</span>
                    <span>Contribution à la performance économique et au développement territorial.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CO-CONSTRUCTION – Projection et appel à l'action */}
      <section className="py-20 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">
              Construisons ensemble
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              Vous avez un projet, une démarche à structurer ?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto">
              Que vous souhaitiez initier une démarche de prévention,
              renforcer un dispositif existant ou co-construire un programme sur-mesure,
              nous vous aidons à structurer des étapes progressives et finançables.
            </p>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
              Un premier cadrage, sans engagement, pour comprendre votre contexte
              et identifier les leviers d&apos;action les plus pertinents.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white bg-aw-red-deep hover:bg-[#7C1818] rounded-[10px] transition-colors shadow-[0_12px_30px_rgba(139,29,29,0.18)]"
              >
                Structurer une démarche avec nous
              </Link>
              <Link
                href="/formations"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-aw-ink border border-black/10 rounded-[10px] transition-colors"
              >
                Découvrir les leviers mobilisables
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="py-20 md:py-24 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">
              Réseau et collaborations
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-10">
              Partenaires institutionnels et acteurs de terrain
            </h2>
            <div className="relative overflow-hidden">
              <div className="aw-logo-marquee">
                {[
                  { label: 'Logo partenaire', href: '' },
                  { label: 'Logo institution', href: '' },
                  { label: 'Logo pratique', href: '' },
                  { label: 'Logo écosystème', href: '' },
                  { label: 'Logo partenaire', href: '' },
                  { label: 'Logo institution', href: '' },
                  { label: 'Logo pratique', href: '' },
                  { label: 'Logo écosystème', href: '' },
                ].map((item, index) => (
                  <div key={`${item.label}-${index}`} className="min-w-[180px] md:min-w-[220px]">
                    {item.href ? (
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block bg-white border border-black/5 rounded-2xl py-8 text-sm tracking-[0.2em] uppercase text-black/40 transition-transform duration-300 hover:scale-[1.75]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div className="bg-white border border-black/5 rounded-2xl py-8 text-sm tracking-[0.2em] uppercase text-black/40 transition-transform duration-300 hover:scale-[1.75]">
                        {item.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
