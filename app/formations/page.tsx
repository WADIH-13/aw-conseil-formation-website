import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Formations - AW Conseil et Formation',
  description: 'Formations pour comprendre et accompagner la charge mentale au travail.',
}

export default function FormationsPage() {
  return (
    <div className="bg-white">
      {/* HERO + ACCROCHE (compact) */}
      <section className="aw-hero-surface py-10 md:py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4 leading-tight">
              Nos formations professionnelles
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Développez vos compétences pour mieux comprendre et accompagner la charge mentale au travail.
            </p>
            <div className="flex justify-center">
              <ul className="flex flex-wrap gap-4 text-sm text-gray-700">
                <li><a href="#formations" className="hover:underline">Nos formations</a></li>
                <li><a href="#pourquoi" className="hover:underline">Pourquoi se former ?</a></li>
                <li><a href="#modalites" className="hover:underline">Modalités & accès</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LISTE DES FORMATIONS */}
      <section id="formations" className="py-8 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-6 text-center">Nos formations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 - Accent BLEU */}
              <div className="relative bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100 overflow-hidden" style={{ boxShadow: '0 2px 8px 0 rgba(37,99,235,0.06)' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#2563EB] rounded-t-2xl" />
                <div>
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">7 heures</span>
                  <h3 className="text-xl font-light text-black mb-2">Découvrir la charge mentale</h3>
                  <p className="text-gray-700 mb-3 text-sm">Prendre conscience des mécanismes invisibles qui nous épuisent au quotidien et apprendre des gestes simples pour agir.</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/formations/decouvrir-charge-mentale" className="btn-primary">Découvrir cette formation →</Link>
                  <Link href="/contact" className="btn-secondary">Demander un devis</Link>
                </div>
              </div>

              {/* Card 2 - Accent VERT */}
              <div className="relative bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100 overflow-hidden" style={{ boxShadow: '0 2px 8px 0 rgba(22,163,74,0.06)' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#16A34A] rounded-t-2xl" />
                <div>
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold text-green-600 bg-green-50 rounded-full">7 heures</span>
                  <h3 className="text-xl font-light text-black mb-2">Mieux gérer sa charge mentale et agir concrètement</h3>
                  <p className="text-gray-700 mb-3 text-sm">Passer de la compréhension à l’action au quotidien, avec des leviers concrets et un plan d’actions personnel.</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/formations/mieux-gerer-sa-charge-mentale" className="btn-primary">Découvrir cette formation →</Link>
                  <Link href="/contact" className="btn-secondary">Demander un devis</Link>
                </div>
              </div>

              {/* Card 3 - Accent ROUGE, centrée sur desktop */}
              <div className="relative bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-100 overflow-hidden md:col-span-2 md:max-w-xl md:mx-auto" style={{ boxShadow: '0 2px 8px 0 rgba(220,38,38,0.06)' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#DC2626] rounded-t-2xl" />
                <div>
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">28 heures</span>
                  <h3 className="text-xl font-light text-black mb-2">Devenir référent charge mentale</h3>
                  <p className="text-gray-700 mb-3 text-sm">Acquérir une posture d’accompagnement, des outils pratiques et un plan d’action pour agir en organisation.</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/formations/devenir-referent" className="btn-primary">Découvrir cette formation →</Link>
                  <Link href="/contact" className="btn-secondary">Demander un devis</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI SE FORMER */}
      <section id="pourquoi" className="py-12 bg-aw-beige-light border-b border-black/5">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-black mb-4 text-center">Pourquoi se former avec AW Conseil ?</h2>
          <ul className="grid md:grid-cols-3 gap-6 text-center text-gray-700 text-base">
            <li className="bg-white rounded-xl shadow-sm p-6 border border-black/5">Des contenus fondés sur la science et l’expérience terrain</li>
            <li className="bg-white rounded-xl shadow-sm p-6 border border-black/5">Des outils concrets et des mises en situation</li>
            <li className="bg-white rounded-xl shadow-sm p-6 border border-black/5">Un accompagnement humain, bienveillant et certifié Qualiopi</li>
          </ul>
        </div>
      </section>

      {/* MODALITÉS & ACCÈS */}
      <section id="modalites" className="py-16 bg-aw-beige-light border-t border-black/5">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-black mb-6 text-center">Modalités & accès</h2>
          <ul className="text-gray-700 text-base space-y-2">
            <li>Formations accessibles en présentiel (dans vos locaux) ou à distance</li>
            <li>Adaptation possible pour les personnes en situation de handicap (nous contacter)</li>
            <li>Inscription sur devis, prise en charge possible par votre OPCO</li>
            <li>Contactez-nous pour un programme détaillé ou une demande spécifique</li>
          </ul>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="btn-primary">
              Demander un devis ou un programme
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
