import Link from 'next/link'

export const metadata = {
  title: 'Devenir référent charge mentale - 28h - AW Conseil et Formation',
  description: 'Formation pour devenir référent charge mentale. 28 heures pour acquérir les outils et la posture pour accompagner avec bienveillance.',
}

export default function DevenirReferentPage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm text-aw-red font-medium mb-4">Formation - 28 heures</div>
              <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
                Devenir référent charge mentale
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Acquérir les outils et la posture pour soutenir vos collègues<br />
                avec bienveillance et professionnalisme.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-8 text-center">
              Ce que vous allez apprendre
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Développer une écoute bienveillante</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Créer un espace sécurisant où la personne peut s'exprimer librement, 
                  sans jugement ni pression.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Accompagner sans conseiller</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Apprendre à soutenir sans donner de solutions toutes faites. 
                  Aider la personne à trouver ses propres ressources.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Orienter vers les bonnes ressources</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Savoir quand et comment orienter vers un professionnel. 
                  Connaître le réseau de soutien disponible.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Préserver votre propre équilibre</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Comment aider sans s'épuiser ? 
                  Reconnaître vos limites et protéger votre énergie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-light text-black mb-6">
                  Pour qui ?
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <span className="font-medium text-black">Managers</span> qui souhaitent mieux soutenir leurs équipes.
                  </p>
                  <p>
                    <span className="font-medium text-black">RH</span> amenés à accompagner les collaborateurs en difficulté.
                  </p>
                  <p>
                    <span className="font-medium text-black">Représentants du personnel</span> dans leur rôle de soutien.
                  </p>
                  <p>
                    <span className="font-medium text-black">Toute personne</span> amenée à soutenir ses collègues dans leur bien-être au travail.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-black mb-6">Informations pratiques</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-black">Durée :</span>
                    <span className="text-gray-700 ml-2">28 heures (4 journées)</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Format :</span>
                    <span className="text-gray-700 ml-2">Présentiel recommandé</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Groupe :</span>
                    <span className="text-gray-700 ml-2">Maximum 10 personnes</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Suivi :</span>
                    <span className="text-gray-700 ml-2">3 mois d'accompagnement inclus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light text-black mb-6">
              Prêt à accompagner ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Échangeons ensemble pour voir comment cette formation 
              peut répondre à vos besoins d'accompagnement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-aw-red hover:bg-red-700 rounded-md transition-colors shadow-lg"
            >
              Prendre un temps d'échange
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
