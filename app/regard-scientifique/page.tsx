import Link from 'next/link'

export const metadata = {
  title: 'Regard scientifique - AW Conseil et Formation',
  description: 'Un regard scientifique au service de l\'humain. Comprendre et donner du recul sans imposer ni médicaliser.',
}

export default function RegardScientifiquePage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-12 leading-tight">
              Un regard scientifique au service de l'humain
            </h1>
            <div className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                La science nous aide à comprendre les mécanismes invisibles 
                qui influencent notre bien-être au travail.
              </p>
              <p>
                Elle nous donne du recul, des clés de lecture, des repères. 
                Elle ne prescrit rien, n'impose aucune solution.
              </p>
              <p>
                Son rôle ? Éclairer nos pratiques d'accompagnement 
                pour les rendre plus justes et plus respectueuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-12">
              Une approche complémentaire, non prescriptive
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto space-y-6">
              <p>
                Les connaissances scientifiques enrichissent notre compréhension 
                des situations de travail, sans jamais se substituer à l'expérience humaine.
              </p>
              <p>
                Elles nous aident à reconnaître des patterns, 
                à identifier des facteurs de risque ou de protection, 
                à mieux saisir la complexité des vécus.
              </p>
              <p>
                Mais elles ne dictent pas la conduite à tenir. 
                Chaque personne reste unique, chaque situation particulière.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-12">
              Un cadre clair et éthique
            </h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-black mb-4">Prévention et amélioration</h3>
                <p className="text-gray-700 leading-relaxed">
                  Notre regard scientifique s'inscrit dans une démarche de prévention 
                  et d'amélioration des conditions de travail.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-black mb-4">Protection des données</h3>
                <p className="text-gray-700 leading-relaxed">
                  Toutes les observations sont strictement anonymisées et agrégées. 
                  Aucune donnée individuelle n'est conservée ou transmise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Des questions sur notre approche scientifique ? 
              Échangeons ensemble sur cette dimension de notre travail.
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
