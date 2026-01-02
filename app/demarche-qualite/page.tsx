import Link from 'next/link'

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-light text-black mb-6">
                  Nos engagements
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Bienveillance</h3>
                    <p className="text-gray-700">
                      Chaque personne est accueillie sans jugement, 
                      dans le respect de son rythme et de ses choix.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Professionnalisme</h3>
                    <p className="text-gray-700">
                      Formation continue, supervision régulière, 
                      respect des cadres déontologiques.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">Transparence</h3>
                    <p className="text-gray-700">
                      Méthodes claires, objectifs explicites, 
                      limites de l'accompagnement énoncées.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-black mb-6">Certification Qualiopi</h3>
                <p className="text-gray-700 mb-4">
                  Organisme de formation certifié Qualiopi pour la qualité 
                  de nos actions de formation.
                </p>
                <p className="text-sm text-gray-600">
                  Cette certification atteste de notre engagement 
                  dans une démarche d'amélioration continue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light text-black mb-12">
              Notre approche éthique
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Confidentialité</h3>
                <p className="text-gray-700 text-sm">
                  Tout ce qui se dit reste dans l'espace d'accompagnement. 
                  Secret professionnel respecté.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Non-directivité</h3>
                <p className="text-gray-700 text-sm">
                  Nous ne donnons pas de solutions toutes faites. 
                  Nous accompagnons vers vos propres réponses.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Respect des limites</h3>
                <p className="text-gray-700 text-sm">
                  Nous savons quand orienter vers d'autres professionnels. 
                  Nous ne prétendons pas tout soigner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light text-black mb-6">
              Des questions sur notre approche ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              N'hésitez pas à nous contacter pour en savoir plus 
              sur notre façon de travailler.
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
