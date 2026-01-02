import Link from 'next/link'

export const metadata = {
  title: 'Devenir référent charge mentale - 28h - AW Conseil et Formation',
  description: 'Formation pour devenir référent charge mentale. 28 heures pour acquérir les outils et la posture pour accompagner avec bienveillance.',
}

export default function DevenirReferentPage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm text-aw-red font-medium mb-4">Formation - 28 heures</div>
              <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
                Devenir référent charge mentale
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Acquérir les outils et la posture pour soutenir vos collègues.<br />
                Avec bienveillance et professionnalisme.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light text-black mb-6">
              Prêt à devenir référent ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Discutons ensemble de votre projet et des modalités 
              qui conviendraient le mieux à votre contexte.
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
