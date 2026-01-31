import Link from 'next/link'

export const metadata = {
  title: 'Le Guide d’Essor — Fréjus',
  description: 'Lieu ressource et expérientiel : nature, pratiques et ateliers pour se ressourcer.',
}

export default function GuideEssorPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Le Guide d’Essor — Fréjus</h1>
            <p className="text-gray-700 max-w-3xl mx-auto">Un lieu d’expérimentation et de ressourcement sur 5 hectares, au service des pratiques corporelles, des ateliers et des séminaires.</p>
          </div>
        </div>
      </section>

      <section className="py-12 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-medium">Philosophie</h2>
            <p className="text-gray-700">Un lieu pour tester des pratiques au contact de la nature, retrouver du calme et développer des ressources personnelles et collectives.</p>

            <h2 className="text-2xl font-medium">Pratiques proposées</h2>
            <p className="text-gray-700">Qi Gong, ateliers de jardinage et cuisine, médiation animale, pratiques expressives — sans planning figé, au rythme des participants.</p>

            <h2 className="text-2xl font-medium">Collaboration</h2>
            <p className="text-gray-700">Le Guide d’Essor collabore étroitement avec AW Conseil et Formation pour accueillir des parcours expérientiels et des temps de formation-action.</p>

            <div className="pt-4">
              <Link href="/contact" className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-aw-red-deep rounded-md">En savoir plus sur le lieu</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
