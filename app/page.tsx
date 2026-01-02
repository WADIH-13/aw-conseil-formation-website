import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-black mb-16 leading-tight">
              AW Conseil et Formation
            </h1>
            
            {/* Signature */}
            <div className="text-2xl md:text-3xl font-light text-black mb-16 space-y-2 leading-relaxed">
              <p>Accompagner avec humanité.</p>
              <p>Révéler ce qui compte.</p>
              <p className="text-aw-red">Connecter durablement.</p>
            </div>

            {/* Message d'accueil */}
            <div className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              <p className="mb-4">Quand tout devient trop lourd, il existe un espace pour respirer.</p>
              <p>Un lieu où poser ce qui pèse, à votre rythme.</p>
            </div>

            {/* CTA Principal */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-4 text-xl font-medium text-white bg-aw-red hover:bg-red-700 rounded-lg transition-colors shadow-lg"
            >
              Prendre un temps d'échange
            </Link>
          </div>
        </div>
      </section>

      {/* Ce que tu trouveras ici */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-12">
              Ce que tu trouveras ici
            </h2>
            <div className="space-y-8">
              <div className="flex items-start justify-center">
                <span className="text-aw-red text-2xl mr-4">•</span>
                <p className="text-xl text-gray-700 text-left">Un espace bienveillant où tu peux être toi-même</p>
              </div>
              <div className="flex items-start justify-center">
                <span className="text-aw-red text-2xl mr-4">•</span>
                <p className="text-xl text-gray-700 text-left">Des outils simples pour retrouver ton équilibre</p>
              </div>
              <div className="flex items-start justify-center">
                <span className="text-aw-red text-2xl mr-4">•</span>
                <p className="text-xl text-gray-700 text-left">Un accompagnement qui respecte ton rythme</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-16">
              Formations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Formation 7h */}
              <div className="bg-white border border-gray-100 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-sm text-aw-red font-medium mb-3">7 heures</div>
                <h3 className="text-2xl font-light text-black mb-4">
                  Découvrir la charge mentale
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Comprendre ces mécanismes invisibles qui nous épuisent. 
                  Apprendre à les reconnaître pour mieux les apprivoiser.
                </p>
                <Link
                  href="/formations/decouvrir-charge-mentale"
                  className="inline-flex items-center text-aw-red hover:text-red-700 font-medium transition-colors"
                >
                  Découvrir cette formation →
                </Link>
              </div>
              
              {/* Formation 28h */}
              <div className="bg-white border border-gray-100 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-sm text-aw-red font-medium mb-3">28 heures</div>
                <h3 className="text-2xl font-light text-black mb-4">
                  Devenir référent charge mentale
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Acquérir les outils pour accompagner tes collègues 
                  avec bienveillance et professionnalisme.
                </p>
                <Link
                  href="/formations/devenir-referent"
                  className="inline-flex items-center text-aw-red hover:text-red-700 font-medium transition-colors"
                >
                  Découvrir cette formation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
