import Link from 'next/link'

export const metadata = {
  title: 'Écosystème & Approche globale - AW Conseil et Formation',
  description: 'Un écosystème cohérent pour alléger la charge mentale. Formations, pratiques et outils réunis par une même intention.',
}

export default function EcosystemePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-12 leading-tight">
              Un écosystème pour alléger la charge mentale
            </h1>
            <div className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              <p className="mb-4">
                AW Conseil et Formation ne propose pas des solutions isolées, 
                mais un ensemble cohérent de formations, pratiques et outils.
              </p>
              <p className="mb-4">
                Tous réunis par une même intention : accompagner avec humanité, 
                révéler ce qui compte, connecter durablement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Une approche globale */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-12">
              Une approche globale
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                La charge mentale ne se réduit pas par une seule action, 
                mais par une combinaison de compréhension, d'apprentissage et d'expériences concrètes.
              </p>
              <p>
                C'est pourquoi nous développons un écosystème où chaque élément 
                nourrit et renforce les autres.
              </p>
              <p>
                Une démarche progressive, respectueuse de ton rythme, 
                qui s'adapte à tes besoins du moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quatre piliers */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-16">
              Quatre piliers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-aw-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="text-xl font-medium text-black mb-4">Comprendre</h3>
                <p className="text-gray-700">
                  Saisir les mécanismes invisibles qui créent cette fatigue particulière.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-aw-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-xl font-medium text-black mb-4">Apprendre</h3>
                <p className="text-gray-700">
                  Acquérir des outils simples et concrets pour alléger le quotidien.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-aw-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-medium text-black mb-4">Expérimenter</h3>
                <p className="text-gray-700">
                  Tester dans un cadre bienveillant ce qui fonctionne pour toi.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-aw-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-medium text-black mb-4">Soutenir dans la durée</h3>
                <p className="text-gray-700">
                  Maintenir ce qui a été découvert grâce à un accompagnement continu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Le cadre AW */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-12">
              Le cadre AW
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto space-y-6">
              <p>
                Toutes les formations et pratiques proposées 
                s'inscrivent dans un cadre commun.
              </p>
              <p>
                Simplicité, respect du rythme, utilité concrète : 
                ces principes guident chaque développement.
              </p>
              <p>
                Un regard scientifique accompagne cette démarche, 
                pour s'assurer que ce qui est proposé fait sens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Un projet vivant */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-12">
              Un projet vivant
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                Cet écosystème est en développement constant, 
                nourri par les retours et les besoins de ceux qui l'expérimentent.
              </p>
              <p>
                Certaines pratiques sont déjà proposées, 
                d'autres arriveront avec le temps, au rythme qui leur convient.
              </p>
              <p>
                Nous croyons au temps long et à la cohérence, 
                plutôt qu'à l'accumulation de solutions rapides.
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
              Envie d'en savoir plus sur cette approche ? 
              Échangeons ensemble sur ce qui pourrait te convenir.
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
