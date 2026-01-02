import Link from 'next/link'

export const metadata = {
  title: 'Formations - AW Conseil et Formation',
  description: 'Formations pour comprendre et accompagner la charge mentale au travail.',
}

export default function FormationsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Nos formations
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Apprendre à reconnaître, comprendre et accompagner.<br />
              Avec bienveillance et professionnalisme.
            </p>
          </div>
        </div>
      </section>

      {/* Formations Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formation 1 */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="p-8">
                  <div className="text-sm text-aw-red font-medium mb-2">7 heures</div>
                  <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
                    Découvrir la charge mentale
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Une formation douce pour prendre conscience des mécanismes invisibles 
                    qui nous épuisent au quotidien.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-medium text-black">Ce que vous allez découvrir</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-aw-red mr-3">•</span>
                        <span>Reconnaître les signes avant qu'il ne soit trop tard</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-aw-red mr-3">•</span>
                        <span>Comprendre d'où vient cette fatigue invisible</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-aw-red mr-3">•</span>
                        <span>Identifier vos propres mécanismes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-aw-red mr-3">•</span>
                        <span>Apprendre à poser des limites saines</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-medium text-black">Pour qui ?</h3>
                    <p className="text-gray-700">
                      Toute personne qui ressent une fatigue inexpliquée, 
                      qui a l'impression de courir sans cesse, 
                      ou qui souhaite mieux comprendre ces phénomènes.
                    </p>
                  </div>

                  <Link
                    href="/formations/decouvrir-charge-mentale"
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-aw-red hover:bg-red-700 rounded-md transition-colors"
                  >
                    Découvrir cette formation
                  </Link>
                </div>
              </div>

              {/* Formation 2 */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="p-8">
                  <div className="text-sm text-aw-red font-medium mb-2">28 heures</div>
                  <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
                    Devenir référent charge mentale
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Acquérir les outils et la posture pour soutenir vos collègues 
                    avec bienveillance et professionnalisme.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-medium text-black">Ce que vous allez apprendre</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-aw-red mr-3">•</span>
                        <span>Développer une écoute bienveillante</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-aw-red mr-3">•</span>
                        <span>Accompagner sans juger ni conseiller</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-aw-red mr-3">•</span>
                        <span>Orienter vers les bonnes ressources</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-aw-red mr-3">•</span>
                        <span>Préserver votre propre équilibre</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-medium text-black">Pour qui ?</h3>
                    <p className="text-gray-700">
                      Managers, RH, représentants du personnel, 
                      ou toute personne amenée à soutenir ses collègues 
                      dans leur bien-être au travail.
                    </p>
                  </div>

                  <Link
                    href="/formations/devenir-referent"
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-aw-red hover:bg-red-700 rounded-md transition-colors"
                  >
                    Découvrir cette formation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              Notre approche pédagogique
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Expérientielle</h3>
                <p className="text-gray-700 text-sm">
                  Vous apprenez en vivant et en ressentant, 
                  pas seulement en écoutant.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Bienveillante</h3>
                <p className="text-gray-700 text-sm">
                  Un cadre sécurisant où chacun avance 
                  à son rythme, sans jugement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Pratique</h3>
                <p className="text-gray-700 text-sm">
                  Des outils concrets que vous pourrez 
                  utiliser dès le lendemain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              Une question sur nos formations ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Échangeons ensemble pour voir quelle formation 
              correspond le mieux à vos besoins.
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
