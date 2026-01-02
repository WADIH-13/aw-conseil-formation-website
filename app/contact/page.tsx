export const metadata = {
  title: 'Contact - AW Conseil et Formation',
  description: 'Prenez un temps d\'échange avec nous. Contact pour accompagnement et formations.',
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Prendre un temps d'échange
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Un simple appel pour voir ensemble<br />
              ce qui pourrait vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-light text-black mb-6">
                Pourquoi nous contacter ?
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Pour vous</h3>
                  <p className="text-gray-700">
                    Vous ressentez une fatigue qui ne part pas ? 
                    Vous avez besoin d'un espace pour poser ce qui pèse ?
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Pour votre équipe</h3>
                  <p className="text-gray-700">
                    Vous voulez sensibiliser vos collaborateurs ? 
                    Former des référents dans votre organisation ?
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Pour comprendre</h3>
                  <p className="text-gray-700">
                    Vous souhaitez simplement en savoir plus sur notre approche 
                    et nos formations ?
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-light text-black mb-6">
                Comment ça se passe ?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-aw-red mr-3 font-bold">1.</span>
                  <div>
                    <h3 className="font-medium text-black">Vous nous appelez</h3>
                    <p className="text-gray-700 text-sm">
                      Un premier échange téléphonique de 20 minutes, 
                      sans engagement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-aw-red mr-3 font-bold">2.</span>
                  <div>
                    <h3 className="font-medium text-black">Nous écoutons</h3>
                    <p className="text-gray-700 text-sm">
                      Vous nous expliquez votre situation, 
                      vos besoins, vos questionnements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-aw-red mr-3 font-bold">3.</span>
                  <div>
                    <h3 className="font-medium text-black">Nous orientons</h3>
                    <p className="text-gray-700 text-sm">
                      Ensemble, nous voyons si et comment 
                      nous pouvons vous accompagner.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-black">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-aw-red hover:text-red-700 transition-colors">
                      01 23 45 67 89
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-black">Email</h3>
                    <a href="mailto:contact@aw-conseil-formation.fr" className="text-aw-red hover:text-red-700 transition-colors">
                      contact@aw-conseil-formation.fr
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-black">Disponibilités</h3>
                    <p className="text-gray-700 text-sm">
                      Lundi au vendredi, 9h-18h
                    </p>
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
              Aucune urgence ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Prenez le temps qu'il vous faut.<br />
              Nous serons là quand vous serez prêt.
            </p>
            <p className="text-gray-600">
              En attendant, n'hésitez pas à explorer nos formations 
              ou notre approche qualité pour mieux nous connaître.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
