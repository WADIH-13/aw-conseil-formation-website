export const metadata = {
  title: 'Veille & actualités scientifiques - AW Conseil et Formation',
  description:
    "Repères et actualités issues de sources institutionnelles et scientifiques, au service de la prévention des risques professionnels, RPS et QVCT.",
}

export default function VeilleActualitesScientifiquesPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Repères</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mt-4 leading-tight">
              Veille & actualités scientifiques
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Cette page rassemble des notes de lecture, repères et actualités issus de publications institutionnelles
              et scientifiques (prévention, RPS, QVCT, organisation du travail). Les contenus sont sélectionnés pour
              leur utilité opérationnelle et leur clarté.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="aw-card-surface rounded-2xl border border-black/5 p-8 md:p-10">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">À venir</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-light text-black">Publication progressive</h2>
              <div className="mt-6 text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  Les premières entrées seront publiées progressivement : synthèses de recommandations, repères
                  méthodologiques, éclairages sur l’évolution des conditions de travail et des pratiques de prévention.
                </p>
                <p>
                  Sources typiques : INRS, Anact, Plans régionaux de santé au travail, et, lorsque le contexte le rend
                  pertinent, des recommandations de la HAS.
                </p>
              </div>
              <div className="mt-8 text-sm text-black/60">
                <p>
                  Note de transparence : les organismes cités sont mentionnés comme sources de référence.
                  Aucune validation institutionnelle n’est revendiquée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
