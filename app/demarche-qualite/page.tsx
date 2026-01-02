export const metadata = {
  title: 'Démarche qualité - AW Conseil et Formation',
  description: 'Notre engagement qualité pour un accompagnement professionnel et bienveillant.',
}

export default function DemarcheQualitePage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Démarche qualité
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Notre engagement pour un accompagnement professionnel,<br />
              éthique et bienveillant.
            </p>
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
                    <h3 className="text-lg font-medium text-black mb-3">Pas de jugement</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nous accueillons chaque situation avec neutralité et bienveillance, 
                      sans jamais porter de jugement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-black mb-6">
                  Ce que nous ne faisons pas
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Nous ne posons pas de diagnostic</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Nous ne proposons pas de traitement</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Nous ne promettons pas de miracle</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3 mt-1">•</span>
                    <span>Nous ne forçons aucune démarche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-12 text-center">
              Notre approche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-aw-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-medium text-black mb-3">Écoute active</h3>
                <p className="text-gray-700 text-sm">
                  Nous écoutons vraiment, sans chercher à donner des solutions rapides.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-aw-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-lg font-medium text-black mb-3">Révélation des ressources</h3>
                <p className="text-gray-700 text-sm">
                  Nous aidons chacun à découvrir ses propres forces et capacités.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-aw-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="text-lg font-medium text-black mb-3">Respect du rythme</h3>
                <p className="text-gray-700 text-sm">
                  Chacun avance à son rythme, sans pression ni contrainte.
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
            <div className="bg-gray-50 p-8 rounded-lg">
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
