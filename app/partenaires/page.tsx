import FranceMap from '@/components/FranceMap'
import Link from 'next/link'

const partners = [
  { name: 'Maison Mosaïque', focus: 'Collectif associatif', region: 'Hauts-de-France', tone: 'bg-red-50 border-red-100 text-red-700' },
  { name: 'Les Ateliers du Souffle', focus: 'Prévention douce', region: 'Île-de-France', tone: 'bg-gray-50 border-gray-100 text-gray-800' },
  { name: 'Réseau Ouest', focus: 'Qualité de vie au travail', region: 'Pays de la Loire', tone: 'bg-gray-50 border-gray-100 text-gray-800' },
  { name: 'Sud Bienveillance', focus: 'Soutien aux aidants', region: 'PACA', tone: 'bg-red-50 border-red-100 text-red-700' },
]

export default function PartenairesPage() {
  return (
    <div className="bg-white">
      <section className="py-20 border-b border-gray-100">
        <div className="container-custom">
          <p className="text-sm uppercase tracking-wide text-aw-red font-semibold mb-4">Partenaires</p>
          <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Un réseau engagé et humain</h1>
          <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
            Nous avançons avec des structures qui partagent la même exigence de respect et de sobriété.
            Chaque collaboration est pensée pour préserver la confiance des équipes accompagnées.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className={`rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow ${partner.tone}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold">{partner.name}</div>
                  <span className="text-sm text-gray-600">{partner.region}</span>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">{partner.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm uppercase tracking-wide text-aw-red font-semibold">Carte de France</p>
            <h2 className="text-3xl font-light text-black">Voir où nous avançons</h2>
            <p className="text-gray-700 leading-relaxed">
              Cette carte illustre une présence progressive, sans saturation, avec des points d&apos;ancrage
              pour faciliter l&apos;organisation de rencontres ou d&apos;ateliers au plus proche des équipes.
            </p>
          </div>
          <FranceMap />
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-light text-black">Comment nous choisissons nos partenaires</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Ton respect prime", "Des engagements réalistes", "Ecoute avant action", "Trajectoires durables"].map((item) => (
                <div key={item} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <p className="text-lg font-medium text-black">{item}</p>
                  <p className="text-sm text-gray-600 mt-2">Pas de promesses miracles, juste des gestes utiles et réguliers.</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
            <h4 className="text-lg font-semibold text-black">Envie de rejoindre le réseau ?</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Parle-nous de ton approche, de tes publics, et de ce que tu souhaites protéger.
              Nous faisons connaissance avant toute chose.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 bg-aw-red text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Échanger sur un partenariat
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
