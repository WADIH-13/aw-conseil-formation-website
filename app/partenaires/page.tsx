import Link from 'next/link'
import partners from '../../data/partners.json'

export const metadata = {
  title: 'Partenaires — AW Conseil et Formation',
  description: 'Réseau de partenaires engagés qui complètent l’écosystème AW.',
}

export default function PartenairesPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Les partenaires de l’écosystème</h1>
            <p className="text-gray-700 max-w-3xl mx-auto">Nous travaillons avec un réseau de spécialistes choisis pour leur complémentarité et leur éthique. Chaque partenaire intervient dans le cadre de l’écosystème AW et du Guide d’Essor.</p>
            <p className="text-sm text-gray-600 mt-4">Nous nous faisons confiance mutuellement.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {partners.map((p: any) => (
                <Link key={p.slug} href={`/partenaires/${p.slug}`} className="aw-card-surface p-4 rounded-2xl border border-black/5 text-center hover:shadow-md">
                  <div className="min-h-[54px] flex items-center justify-center text-sm text-black/50">{p.logo || p.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
