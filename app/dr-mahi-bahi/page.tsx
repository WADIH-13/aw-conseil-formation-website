import Link from 'next/link'

export const metadata = {
  title: 'Dr Yacine Mahi Bahi Amar - Référent scientifique',
  description: 'Référent scientifique d’AW Conseil et Formation. Expertise conseil et formation.',
  keywords: ['Dr Mahi Bahi', 'Yacine Mahi Bahi Amar', 'Conseil', 'Formation'],
}

export default function DrMahiBahiPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4">
              Dr Yacine Mahi Bahi Amar
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Référent scientifique – Conseil et formation
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-8 space-y-10 text-gray-700">
              <section>
                <h2 className="text-2xl font-light text-black mb-4">À propos</h2>
                <p className="leading-relaxed">
                  Le Dr Yacine Mahi Bahi Amar accompagne les professionnels et les organisations
                  dans leurs projets de conseil et de formation. Son approche combine rigueur
                  scientifique, éthique et pragmatisme.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-black mb-4">Domaines d’expertise</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Conseil stratégique et prévention des risques</li>
                  <li>Formation professionnelle et montée en compétences</li>
                  <li>Accompagnement des équipes et du management</li>
                  <li>Analyse des pratiques et amélioration continue</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-light text-black mb-4">Contact</h2>
                <p className="leading-relaxed">
                  Pour toute demande de conseil ou de formation, merci d’utiliser le
                  <Link href="/contact" className="text-aw-red-deep hover:text-[#7C1818] transition-colors ml-1">
                    formulaire de contact
                  </Link>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
