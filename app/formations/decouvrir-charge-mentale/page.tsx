import Link from 'next/link'

export const metadata = {
  title: 'Découvrir la charge mentale - 7h - AW Conseil et Formation',
  description: 'Formation pour comprendre et reconnaître la charge mentale au travail. 7 heures pour prendre conscience des mécanismes invisibles.',
}

export default function DecouvrirChargeMentalePage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm text-aw-red font-medium mb-4">Formation - 7 heures</div>
              <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
                Découvrir la charge mentale
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Comprendre ces mécanismes invisibles qui nous épuisent.<br />
                Apprendre à les reconnaître avant qu'il ne soit trop tard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-8 text-center">
              Ce que vous allez découvrir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Reconnaître les signes</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Cette fatigue qui ne part pas avec le repos. 
                  Ces pensées qui tournent en boucle. 
                  Ces petites tensions qui s'accumulent.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Comprendre les causes</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  D'où vient cette charge invisible ? 
                  Pourquoi certaines situations nous pèsent plus que d'autres ? 
                  Comment nos habitudes alimentent le cycle.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Identifier vos mécanismes</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Chacun a ses propres déclencheurs. 
                  Ses propres façons de porter la charge. 
                  Apprendre à les repérer, c'est déjà les alléger.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Poser des limites saines</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Comment dire non sans culpabiliser ? 
                  Comment protéger votre énergie ? 
                  Des outils simples pour préserver votre équilibre.
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
                    Vous ressentez une fatigue inexpliquée qui ne part pas avec le repos ?
                  </p>
                  <p>
                    Vous avez l'impression de courir sans cesse, même quand vous ne bougez pas ?
                  </p>
                  <p>
                    Vous aimeriez comprendre pourquoi certaines situations vous pèsent autant ?
                  </p>
                  <p className="font-medium text-black">
                    Cette formation est faite pour vous.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-black mb-6">Informations pratiques</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-black">Durée :</span>
                    <span className="text-gray-700 ml-2">7 heures (1 journée)</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Format :</span>
                    <span className="text-gray-700 ml-2">Présentiel ou distanciel</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Groupe :</span>
                    <span className="text-gray-700 ml-2">Maximum 12 personnes</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Approche :</span>
                    <span className="text-gray-700 ml-2">Expérientielle et bienveillante</span>
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
              Prêt à mieux comprendre ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Échangeons ensemble pour voir si cette formation 
              correspond à ce que vous recherchez.
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
