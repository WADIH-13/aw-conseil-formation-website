import Link from 'next/link'

export const metadata = {
  title: 'Regard scientifique - AW Conseil et Formation',
  description: 'Un regard scientifique au service de l’humain. Comprendre et donner du recul avec une approche pédagogique.',
}

export default function RegardScientifiquePage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-12 leading-tight">
              Un regard scientifique au service de l’humain
            </h1>
            <div className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                La science nous aide à comprendre les mécanismes invisibles 
                qui influencent notre bien-être au travail.
              </p>
              <p>
                Elle nous donne du recul, des clés de lecture, des repères. 
                Elle apporte des repères et éclaire les pratiques.
              </p>
              <p>
                Son rôle ? Éclairer nos pratiques d’accompagnement 
                pour les rendre plus justes et plus respectueuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-12">
              Une approche complémentaire et pédagogique
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto space-y-6">
              <p>
                Les connaissances scientifiques enrichissent notre compréhension 
                des situations de travail, en dialogue avec l’expérience humaine.
              </p>
              <p>
                Elles nous aident à reconnaître des patterns, 
                à identifier des facteurs de risque ou de protection, 
                à mieux saisir la complexité des vécus.
              </p>
              <p>
                Elles guident la compréhension et valorisent la singularité de chaque situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Des questions sur notre approche scientifique ?
            </p>
            <p className="text-gray-600 mb-8">
              En savoir plus sur notre{' '}
              <Link 
                href="/dr-mahi-bahi" 
                className="text-aw-red-deep hover:text-[#7C1818] transition-colors"
              >
                référent scientifique
              </Link>
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-aw-red-deep hover:bg-[#7C1818] rounded-[10px] transition-colors shadow-[0_12px_30px_rgba(139,29,29,0.18)]"
            >
              Prendre un temps d’échange
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
