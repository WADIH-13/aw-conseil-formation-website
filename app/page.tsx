import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section (recentred, respirant) */}
      <section className="aw-hero-surface py-28 md:py-40">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
              <div className="text-left">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 text-xs md:text-sm tracking-[0.2em] uppercase text-black/60 mb-12">
                  Cabinet de conseil & formation
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-aw-ink mb-8 leading-[1.06]">
                  Alléger la charge mentale, durablement.
                </h1>

                <p className="text-lg md:text-xl font-light text-black/80 leading-[1.6] mb-10 max-w-3xl">
                  Conseil stratégique, formation et écosystème au service des équipes et des organisations.
                </p>

                <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-medium text-aw-red-deep border border-aw-red-deep rounded-[10px] transition-colors"
                  >
                    Prendre un temps d’échange
                  </Link>
                  <Link
                    href="/formations"
                    className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-medium text-aw-ink border border-black/10 rounded-[10px] transition-colors"
                  >
                    Découvrir les formations
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {/* Blocs harmonisés premium */}
                <div className="flex flex-col gap-6">
                  {/* Bloc Maison de pensée */}
                  <div className="aw-card-surface rounded-3xl border border-black/5 p-8 md:p-10 flex flex-col min-h-[220px] justify-between shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-black/50 mb-4">Accompagner · Révéler · Connecter</div>
                      <p className="text-lg md:text-xl font-light text-aw-ink mb-3">Une maison de pensée, de méthodes et d’écosystème.</p>
                      <p className="text-sm text-black/70">Approche structurée, accompagnement sur-mesure, réseau de pratiques.</p>
                    </div>
                    <div className="mt-6 text-xs text-black/50">Calme · profondeur · sérénité</div>
                  </div>
                  {/* Bloc Baromètre harmonisé */}
                  <div className="aw-card-surface rounded-3xl border border-black/5 p-8 md:p-10 flex flex-col justify-between min-h-[210px] bg-[#F4F2F0] shadow-[0_12px_30px_rgba(139,29,29,0.04)]">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-black/55 mb-3">Baromètre</div>
                      <p className="text-lg font-light text-aw-ink mb-3">Prendre un temps pour faire le point.</p>
                      <p className="text-sm text-black/70 mb-6">Une lecture confidentielle, simple et sans jugement.</p>
                    </div>
                    <Link
                      href="/barometre"
                      className="aw-barometre-cta inline-flex items-center justify-center px-7 py-3 rounded-[10px] text-base font-semibold text-white transition-all duration-300 animate-premium-cta"
                    >
                      Faire le point maintenant
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que nous faisons */}
      <section className="py-20 md:py-24 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-12">
              Conseil, formation et solutions pour libérer la charge mentale
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-sm text-aw-red font-medium mb-3">Conseil</div>
                <h3 className="text-xl font-medium text-black mb-3">Agir en amont</h3>
                <p className="text-gray-700">Des stratégies pour prévenir la surcharge et structurer l’action.</p>
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-sm text-aw-red font-medium mb-3">Formation</div>
                <h3 className="text-xl font-medium text-black mb-3">Comprendre pour agir</h3>
                <p className="text-gray-700">Formations orientées sens et application : clarté et autonomie.</p>
              </div>
              <div className="bg-white border border-black/5 p-8 rounded-2xl text-left shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-sm text-aw-red font-medium mb-3">Ateliers</div>
                <h3 className="text-xl font-medium text-black mb-3">Pratiques expérientielles</h3>
                <p className="text-gray-700">Espaces pour tester et ancrer des pratiques utiles au quotidien.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-24">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
                  Notre mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Être aux côtés de celles et ceux qui se préoccupent, ou qui cherchent des repères,
                  afin de mieux prévenir les RPS, informer, former, accompagner et proposer des solutions concrètes.
                </p>
                <p className="text-gray-700">
                  Nous travaillons en collaboration avec les structures existantes,
                  dans une logique d’amélioration continue et d’impact mesurable.
                </p>
              </div>
              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-4">Ce que vous obtenez</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    Une approche claire et structurée de la charge mentale.
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    Des ateliers pratiques et des outils immédiatement applicables.
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    Un accompagnement respectueux, confidentiel et professionnel.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-20 md:py-24 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">
              Ils nous font confiance
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-10">
              Partenaires premium & institutionnels
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

      {/* Phrase clé supprimée pour respecter la tonalité souhaitée */}
      {/* Floating capsule barometre */}
      <Link
        href="/barometre"
        aria-label="Faire le point — baromètre (test)"
        className="floating-barometre flex items-center justify-center"
      >
        <span className="sr-only">Faire le point — baromètre</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="11" width="3" height="8" rx="0.5" fill="#fff"/>
          <rect x="9" y="7" width="3" height="12" rx="0.5" fill="#fff"/>
          <rect x="15" y="4" width="3" height="15" rx="0.5" fill="#fff"/>
        </svg>
      </Link>
    </div>
  )
}
