import Link from 'next/link'
import partners from '../../../data/partners.json'

export async function generateStaticParams() {
  return partners.map((p: any) => ({ slug: p.slug }))
}

export default function PartnerPage({ params }: { params: { slug: string } }) {
  const partner = partners.find((p: any) => p.slug === params.slug)

  if (!partner) {
    return (
      <div className="container-custom py-20">
        <p>Partenaire introuvable.</p>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
              <div className="mb-4">
                <img src={partner.logo || '/'} alt={partner.name} className="mx-auto max-h-20" />
              </div>
              <h1 className="text-2xl font-semibold mb-2">{partner.name}</h1>
              <p className="text-gray-700 mb-4">{partner.short}</p>
              <p className="text-gray-600 mb-4">{partner.contribution}</p>
              <p className="text-sm text-gray-600 mb-4">Ce partenaire intervient dans le cadre de l’écosystème AW Conseil et Formation et du Guide d’Essor.</p>
              <div className="space-y-2 text-sm">
                {partner.website && (
                  <div>
                    Site : <a href={partner.website} className="text-aw-red-deep underline" target="_blank" rel="noreferrer">{partner.website}</a>
                  </div>
                )}
                {partner.email && (
                  <div>Email : <a href={`mailto:${partner.email}`} className="text-aw-red-deep">{partner.email}</a></div>
                )}
                {partner.phone && <div>Téléphone : {partner.phone}</div>}
              </div>
              <div className="mt-6">
                <Link href="/partenaires" className="text-aw-red-deep underline">Retour aux partenaires</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
