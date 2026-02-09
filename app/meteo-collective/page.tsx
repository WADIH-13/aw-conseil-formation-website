import type { Metadata } from 'next'
import MeteoCollectiveLocal from '@/components/meteo-collective/MeteoCollectiveLocal'

export const metadata: Metadata = {
  title: 'Météo collective',
  description: 'Observation collective, non intrusive, sans collecte de données.',
}

export default function MeteoCollectivePage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface min-h-[70vh] flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Observation collective</p>
            <h1 className="text-3xl md:text-4xl font-light text-black mb-5 leading-tight">Météo collective</h1>
            <p className="text-black/70 leading-relaxed">
              Cet outil sert à objectiver une tendance collective, de façon simple et non intrusive.
            </p>
            <div className="mt-4 text-sm text-black/60 space-y-1">
              <p>Ce n’est pas un outil d’évaluation individuelle.</p>
              <p>Aucune donnée n’est enregistrée : vos réponses restent uniquement sur votre appareil.</p>
            </div>

            <div className="mt-10">
              <MeteoCollectiveLocal />
            </div>

            <noscript>
              <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 text-left">
                <p className="text-sm text-black/70 leading-relaxed">
                  La météo collective interactive nécessite JavaScript pour afficher le résultat instantané et générer le PDF.
                </p>
                <div className="mt-4 text-sm text-black/60 space-y-1">
                  <p>Repères proposés : Journée fluide / Journée chargée / Journée lourde.</p>
                  <p>Dimensions optionnelles : interruptions, clarté des priorités.</p>
                  <p>Aucune donnée personnelle n’est collectée ni stockée.</p>
                </div>
              </div>
            </noscript>
          </div>
        </div>
      </section>
    </div>
  )
}
