import Link from 'next/link'

export const metadata = {
  title: 'Formations - AW Conseil et Formation',
  description: 'Formations pour comprendre et accompagner la charge mentale au travail.',
}

export default function FormationsPage() {
  return (
    <div className="bg-white">
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

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                  
                  <Link
                    href="/formations/decouvrir-charge-mentale"
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-aw-red hover:bg-red-700 rounded-md transition-colors"
                  >
                    Découvrir cette formation
                  </Link>
                </div>
              </div>

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
    </div>
  )
}
