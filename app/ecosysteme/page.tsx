import Link from 'next/link'

export const metadata = {
  title: 'Écosystème & Approche globale - AW Conseil et Formation',
  description: 'Un écosystème cohérent pour alléger la charge mentale. Formations, pratiques et outils réunis par une même intention.',
}

export default function EcosystemePage() {
  return (
    <div className="bg-white">
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
              <p>
                Tous réunis par une même intention : accompagner avec humanité, 
                révéler ce qui compte, connecter durablement.
              </p>
            </div>
          </div>
        </div>
      </section>

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
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
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
