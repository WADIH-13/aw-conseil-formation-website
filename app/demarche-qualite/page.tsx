import Image from 'next/image'

export const metadata = {
  title: 'Démarche qualité - AW Conseil et Formation',
  description: 'Notre engagement qualité pour un accompagnement professionnel et bienveillant.',
}

export default function DemarcheQualitePage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Démarche qualité
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Notre engagement pour un accompagnement professionnel,<br />
              éthique et bienveillant.
            </p>
            {/* Logo Qualiopi supprimé */}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-light text-black mb-8">
                  Nos engagements
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-black mb-3">Bienveillance avant tout</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Chaque accompagnement se fait dans le respect total de la personne, 
                      de son rythme et de ses choix.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-3">Confidentialité absolue</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Tout ce qui se dit reste entre nous. 
                      Votre intimité et vos confidences sont protégées.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-3">Accueil impartial</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Chaque situation est accueillie avec neutralité, bienveillance et respect.
                    </p>
                  </div>
                </div>
              </div>

              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-6">
                  Cadre d’intervention
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Nous apportons un éclairage pédagogique et professionnel</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Nous orientons vers les ressources adaptées si besoin</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Nous privilégions des objectifs clairs et réalistes</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Chaque démarche avance au rythme choisi</span>
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
            <h2 className="text-3xl font-light text-black mb-12 text-center">
              Notre approche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="aw-card-surface rounded-2xl border border-black/5 p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-aw-red-deep/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-medium text-black mb-3">Écoute active</h3>
                <p className="text-gray-700 text-sm">
                  Nous écoutons pleinement et apportons des repères utiles.
                </p>
              </div>
              <div className="aw-card-surface rounded-2xl border border-black/5 p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-aw-red-deep/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-lg font-medium text-black mb-3">Révélation des ressources</h3>
                <p className="text-gray-700 text-sm">
                  Nous aidons chacun à découvrir ses propres forces et capacités.
                </p>
              </div>
              <div className="aw-card-surface rounded-2xl border border-black/5 p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-aw-red-deep/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="text-lg font-medium text-black mb-3">Respect du rythme</h3>
                <p className="text-gray-700 text-sm">
                  Chacun avance à son rythme, dans un cadre apaisé et progressif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-8 text-center">
              Formation continue
            </h2>
            <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous nous engageons dans une démarche de formation continue 
                pour maintenir la qualité de nos accompagnements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-black mb-2">Supervision régulière</h4>
                  <p className="text-gray-600 text-sm">
                    Échanges réguliers avec des pairs pour maintenir 
                    une pratique éthique et bienveillante.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-black mb-2">Actualisation des connaissances</h4>
                  <p className="text-gray-600 text-sm">
                    Veille permanente sur les nouvelles approches 
                    et les évolutions du secteur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
