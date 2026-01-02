import Link from 'next/link'

export const metadata = {
  title: 'Regard scientifique - AW Conseil et Formation',
  description: 'Un regard scientifique au service de l\'humain. Comprendre et donner du recul sans imposer ni médicaliser.',
}

export default function RegardScientifiquePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
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

      {/* Une approche complémentaire */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-12">
              Une approche complémentaire, non prescriptive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
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
              <div className="bg-white p-8 rounded-lg border border-gray-100">
                <h3 className="text-xl font-medium text-black mb-6">Ce que la science apporte</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    <span className="text-gray-700">Des grilles de lecture pour mieux comprendre</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    <span className="text-gray-700">Du recul sur les mécanismes en jeu</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    <span className="text-gray-700">Une validation de nos intuitions</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    <span className="text-gray-700">Des repères pour ajuster nos pratiques</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que nous ne faisons pas */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-12">
              Ce que nous ne faisons pas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Nous ne diagnostiquons pas</h3>
                <p className="text-gray-700 text-sm">
                  Nous n'évaluons pas les personnes, 
                  nous ne posons aucun diagnostic.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Nous ne prescrivons pas</h3>
                <p className="text-gray-700 text-sm">
                  Nous n'imposons aucune solution, 
                  aucun protocole à suivre.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Nous ne médicalisons pas</h3>
                <p className="text-gray-700 text-sm">
                  Nous restons dans le champ de l'accompagnement, 
                  pas du soin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Un cadre clair et éthique */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-12">
              Un cadre clair et éthique
            </h2>
            <div className="space-y-12">
              <div className="bg-white p-8 rounded-lg border border-gray-100">
                <h3 className="text-xl font-medium text-black mb-6">Prévention et amélioration</h3>
                <p className="text-gray-700 leading-relaxed">
                  Notre regard scientifique s'inscrit dans une démarche de prévention 
                  et d'amélioration des conditions de travail. 
                  Il vise à identifier les facteurs qui contribuent au bien-être 
                  ou, au contraire, qui génèrent de la fatigue.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100">
                <h3 className="text-xl font-medium text-black mb-6">Protection des données</h3>
                <p className="text-gray-700 leading-relaxed">
                  Toutes les observations sont strictement anonymisées et agrégées. 
                  Aucune donnée individuelle n'est conservée, analysée ou transmise. 
                  Seules des tendances globales peuvent être partagées, 
                  dans le respect total de la confidentialité.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100">
                <h3 className="text-xl font-medium text-black mb-6">Collaboration respectueuse</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nous travaillons en complémentarité avec les acteurs de la prévention 
                  (médecins du travail, préventeurs, services RH) 
                  dans le respect des rôles et des compétences de chacun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section de clôture */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light text-black mb-8">
              La science au service de la bienveillance
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>
                Notre ambition est simple : que les connaissances scientifiques 
                nourrissent une pratique plus humaine et plus juste.
              </p>
              <p>
                Qu'elles nous aident à mieux comprendre sans jamais nous faire oublier 
                que derrière chaque situation, il y a une personne unique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
