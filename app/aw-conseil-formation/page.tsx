import Link from 'next/link'

export const metadata = {
  title: 'AW Conseil et Formation',
  description: 'Cadre, formations et accompagnement pour alléger la charge mentale.',
}

export default function AWPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">AW Conseil et Formation</h1>
            <p className="text-gray-700 max-w-3xl mx-auto">Cadre et ressources pour comprendre la charge mentale, agir et prévenir. Nous concevons des parcours sur-mesure centrés sur l’autonomie progressive.</p>
          </div>
        </div>
      </section>

      <section className="py-12 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-medium">Formations</h2>
            <p className="text-gray-700">Modules courts et formations longues, conçues pour être applicables dès le premier jour.</p>

            <h2 className="text-2xl font-medium">Accompagnement</h2>
            <p className="text-gray-700">Accompagnement individuel et collectif pour mettre en place des changements concrets et durables.</p>

            <h2 className="text-2xl font-medium">Démarche</h2>
            <p className="text-gray-700">Compréhension → Action → Prévention. Pas de promesses médicales, juste des outils pratiques et un suivi humain.</p>

            <div className="pt-4">
              <Link href="/formations" className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-aw-red-deep rounded-md">Programme d’accompagnement</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
