import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light text-black mb-8 leading-tight">
              Un espace pour respirer
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Quand la vie professionnelle pèse trop lourd.<br />
              Quand tout s'accumule.<br />
              Il existe un chemin vers plus de sérénité.
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

      {/* Signature Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-2xl md:text-3xl font-light text-black space-y-4 leading-relaxed">
              <p>Accompagner avec humanité.</p>
              <p>Révéler ce qui compte.</p>
              <p className="text-aw-red">Connecter durablement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
                  Une approche simple
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Nous croyons que chaque personne porte en elle les ressources nécessaires pour aller mieux.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Notre rôle ? Créer un espace bienveillant où ces ressources peuvent émerger naturellement.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sans jugement. Sans pression. Juste de l'écoute et du temps.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-black mb-4">
                  En 30 secondes
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    <span>Un lieu pour poser ce qui pèse</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    <span>Des outils concrets et simples</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    <span>Un accompagnement sur mesure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-aw-red mr-3">•</span>
                    <span>Votre rythme respecté</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-16">
              Nos formations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium text-black mb-4">
                  Découvrir la charge mentale
                </h3>
                <p className="text-gray-600 mb-4">
                  7 heures pour comprendre et reconnaître les signes.
                </p>
                <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                  Une formation douce pour prendre conscience des mécanismes invisibles qui nous épuisent au quotidien.
                </p>
                <Link
                  href="/formations/decouvrir-charge-mentale"
                  className="text-aw-red hover:text-red-700 font-medium transition-colors"
                >
                  En savoir plus →
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium text-black mb-4">
                  Devenir référent charge mentale
                </h3>
                <p className="text-gray-600 mb-4">
                  28 heures pour accompagner les autres.
                </p>
                <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                  Acquérir les outils et la posture pour soutenir vos collègues avec bienveillance et professionnalisme.
                </p>
                <Link
                  href="/formations/devenir-referent"
                  className="text-aw-red hover:text-red-700 font-medium transition-colors"
                >
                  En savoir plus →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              Prêt à faire un pas ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Un simple échange, sans engagement.<br />
              Pour voir ensemble ce qui pourrait vous aider.
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
