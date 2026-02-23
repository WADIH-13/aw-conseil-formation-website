import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">

      {/* HERO – Proposition de valeur globale */}
      <section className="aw-hero-surface py-28 md:py-40">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl lg:text-[3.2rem] xl:text-[3.4rem] 2xl:text-[3.6rem] font-light text-aw-ink leading-[1.1] tracking-[-0.01em]">
                Performance humaine et qualité de fonctionnement des organisations.
              </h1>

              <p className="text-lg md:text-xl font-light text-black/80 leading-[1.6] mt-6 max-w-3xl mx-auto">
                Nous accompagnons les organisations, les financeurs et les acteurs de terrain
                dans la structuration de démarches durables de prévention et d&apos;amélioration
                de la qualité de vie au travail. Des démarches progressives, évolutives et
                finançables dans la durée.
              </p>

              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-aw-red-deep/15 bg-gradient-to-r from-white via-aw-mist to-white text-xs md:text-sm tracking-[0.24em] uppercase text-black/70 shadow-[0_10px_28px_rgba(0,0,0,0.08)] mt-8">
                <span>Conseil</span>
                <span className="h-1.5 w-1.5 rounded-full bg-aw-red-deep/50" aria-hidden="true" />
                <span>Formation</span>
                <span className="h-1.5 w-1.5 rounded-full bg-aw-red-deep/50" aria-hidden="true" />
                <span>Écosystème</span>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bloc positionnement */}
                <div className="relative overflow-hidden rounded-3xl border border-aw-red-deep/15 bg-gradient-to-br from-white via-aw-mist to-white p-8 md:p-9 shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-aw-red-deep/70 via-aw-red/40 to-transparent" aria-hidden="true" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-black/55 mb-4">Structurer · Prévenir · Accompagner</div>
                    <p className="text-lg md:text-xl font-light text-aw-ink mb-4">
                      Un partenaire de démarche, ancré dans le terrain.
                    </p>
                    <div className="text-sm text-black/75 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                        <p>Approche rigoureuse et co-construction avec les acteurs existants.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                        <p>Outils d&apos;observation collective pour éclairer l&apos;action.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                        <p>Indicateurs non intrusifs, lisibles et actionnables.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-xs text-black/55">Rigueur · Terrain · Confiance</div>
                </div>

                {/* Bloc écosystème */}
                <div className="relative overflow-hidden rounded-3xl border border-aw-red-deep/15 bg-gradient-to-br from-white via-[#F7F3F0] to-white p-8 md:p-9 shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-aw-red-deep/70 via-aw-red/40 to-transparent" aria-hidden="true" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-black/55 mb-4">Écosystème de compétences</div>
                    <p className="text-lg md:text-xl font-light text-aw-ink mb-4">
                      La formation est un levier parmi d&apos;autres.
                    </p>
                    <div className="text-sm text-black/75 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                        <p>Conseil et cadrage pour aligner les parties prenantes.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                        <p>Ateliers et outils terrain pour expérimenter.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                        <p>Réseau de partenaires spécialisés pour compléter l’action.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[2px] w-16 bg-aw-red-deep/80 mt-10 mx-auto" aria-hidden="true" />

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </div>
        </div>
      </section>

      {/* BLOC ORIENTATION DÉCIDEUR */}
      <section id="orientation-decideur" className="py-16 md:py-20 bg-[#F6F4F1] border-y border-black/5">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.3em] uppercase text-black/50">Orientation décideurs</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-light text-black">
                Vous êtes DG, DRH ou Financeur ?
              </h2>
              <p className="mt-3 text-base md:text-lg text-gray-700 leading-relaxed">
                Une démarche structurée, pilotable et finançable.
              </p>
            </div>

            <div className="mt-10 relative">
              <div className="absolute left-0 right-0 top-10 h-px bg-[#C8A45D]/40 hidden md:block" aria-hidden="true" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  {
                    num: '01',
                    title: 'Cadrer la situation',
                    body: 'Clarifier enjeux et responsabilités.',
                  },
                  {
                    num: '02',
                    title: 'Observer et objectiver',
                    body: 'S\'appuyer sur des repères collectifs non intrusifs.',
                  },
                  {
                    num: '03',
                    title: 'Structurer un plan',
                    body: 'Définir une trajectoire cohérente et finançable.',
                  },
                  {
                    num: '04',
                    title: 'Déployer avec méthode',
                    body: 'Mobiliser les leviers dans un cadre professionnel.',
                  },
                  {
                    num: '05',
                    title: 'Évaluer et ajuster',
                    body: 'Mesurer dans le temps et sécuriser les résultats.',
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className="group relative aw-card-surface rounded-2xl border border-black/5 bg-white p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                  >
                    <div className="absolute right-4 top-4 text-5xl font-light text-[#C8A45D]/10" aria-hidden="true">
                      {step.num}
                    </div>
                    <div className="text-sm font-semibold text-[#C8A45D] tracking-[0.2em]">{step.num}</div>
                    <h3 className="mt-3 text-base font-semibold text-black">{step.title}</h3>
                    <div className="mt-3 h-px w-8 bg-[#C8A45D]/50 group-hover:bg-[#C8A45D]/80 transition-colors" aria-hidden="true" />
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-medium text-white bg-aw-red-deep rounded-[8px] hover:bg-aw-red-deep/90 transition-colors"
                >
                  Planifier un échange stratégique
                </Link>
                <Link
                  href="/methodologie-intervention"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-medium text-aw-ink border border-black/15 rounded-[8px] transition-colors"
                >
                  Découvrir notre méthode
                </Link>
                <Link
                  href="/posture-engagement"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-medium text-aw-ink border border-black/15 rounded-[8px] transition-colors"
                >
                  Vérifier la compatibilité financeur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANDEAU PANORAMIQUE */}
      <section className="aw-diagonal-surface py-10">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-black/5 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="relative h-[280px]">
              <Image
                src="/hero-banner.jpg"
                alt="Bandeau panoramique"
                fill
                sizes="100vw"
                className="object-cover grayscale object-[50%_20%]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE – Démarche en 3 temps */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <p className="text-xs tracking-[0.3em] uppercase text-black/50">Une démarche lisible</p>
              <span className="h-[2px] w-16 bg-aw-red-deep/70" aria-hidden="true" />
            </div>
            <div className="mt-8 relative">
              <div className="absolute left-0 right-0 top-6 h-px bg-black/10 hidden md:block" aria-hidden="true" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: '01',
                    title: 'Cadrer la démarche',
                    body: 'Diagnostic partagé, objectifs clairs et gouvernance adaptée au terrain.',
                  },
                  {
                    step: '02',
                    title: 'Outiller les acteurs',
                    body: 'Formations, ateliers et ressources pour rendre l’action autonome.',
                  },
                  {
                    step: '03',
                    title: 'Ancrer dans la durée',
                    body: 'Indicateurs non intrusifs et ajustements progressifs pour pérenniser.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7 bg-white transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-aw-red-deep text-sm font-semibold tracking-[0.2em]">
                        {item.step}
                      </span>
                      <span className="h-[2px] w-6 bg-aw-red-deep/70" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-medium text-black mb-2">{item.title}</h3>
                    <p className="text-sm text-black/70">{item.body}</p>
                  </div>
                ))}
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
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.02]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-aw-red-deep/80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="7" />
                      <path d="M12 9v3l2 2" />
                      <path d="M12 2v3" />
                    </svg>
                  </span>
                  <div className="text-sm text-black/60 font-medium">Conseil</div>
                </div>
                <h3 className="text-xl font-medium text-black mb-3">Structurer en amont</h3>
                <p className="text-gray-700">
                  Analyse, recommandations et plan d&apos;action pour inscrire la prévention
                  dans le fonctionnement quotidien de l&apos;organisation.
                </p>
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.02]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-aw-red-deep/80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 7l9-4 9 4-9 4-9-4z" />
                      <path d="M6 10v5c0 1.7 3 3 6 3s6-1.3 6-3v-5" />
                      <path d="M21 10v4" />
                    </svg>
                  </span>
                  <div className="text-sm text-black/60 font-medium">Formation</div>
                </div>
                <h3 className="text-xl font-medium text-black mb-3">Monter en compétences</h3>
                <p className="text-gray-700">
                  Parcours certifiés Qualiopi, conçus pour développer l&apos;autonomie des équipes
                  et répondre aux exigences des financeurs.
                </p>
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.02]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-aw-red-deep/80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 7h16" />
                      <path d="M4 12h16" />
                      <path d="M4 17h16" />
                      <path d="M8 7v10" />
                      <path d="M16 12v5" />
                    </svg>
                  </span>
                  <div className="text-sm text-black/60 font-medium">Ateliers terrain</div>
                </div>
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
              <div className="flex flex-col gap-6">
                <div className="relative overflow-hidden rounded-2xl border border-black/5 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/team-meeting.jpg"
                      alt="Réunion de travail, équipe en discussion"
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover grayscale"
                    />
                  </div>
                </div>
                <div className="aw-card-surface p-8 rounded-2xl border border-black/5 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-medium text-black mb-5">Ce que nous apportons</h3>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <p>Une approche structurée et des méthodes éprouvées sur le terrain.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <p>Des parcours conformes aux exigences Qualiopi et des financeurs.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <p>Un réseau de compétences complémentaires mobilisable selon les besoins.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                      <p>Un accompagnement confidentiel, professionnel et orienté résultats.</p>
                    </div>
                  </div>
                </div>
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
              <div className="bg-white border border-black/5 p-8 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="text-sm text-black/60 font-medium mb-3">Pour les organisations</div>
                <h3 className="text-xl font-medium text-black mb-4">Améliorer le fonctionnement au quotidien</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Réduction des facteurs de surcharge et prévention des risques psychosociaux.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Montée en compétences des équipes et autonomie dans les pratiques.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Cadre structurant pour une amélioration continue et durable.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="text-sm text-black/60 font-medium mb-3">Pour les financeurs et institutions</div>
                <h3 className="text-xl font-medium text-black mb-4">Investir dans des actions à impact réel</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Actions ancrées dans le terrain, traçables et évaluables.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Indicateurs non intrusifs pour un pilotage clair, sans surcharge des équipes.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Conformité aux référentiels qualité et aux attentes des OPCO.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Contribution à la performance économique et au développement territorial.</p>
                  </div>
                </div>
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
