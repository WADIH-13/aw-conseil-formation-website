import Link from 'next/link';

export function ValidationSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl p-12 border border-gray-200 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-gray-900">
              Cohérence et exigence éditoriale
            </h2>
            <div className="w-12 h-1 bg-aw-red"></div>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Les profils présentés sur cette page sont publiés après validation afin de garantir l'alignement avec les valeurs, la vision et le cadre d'intervention porté par AW Conseil et Formation.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Cohérence</p>
                <p className="text-sm">prime sur la quantité.</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Engagement</p>
                <p className="text-sm">prime sur l'affichage.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-6">
              Vous souhaitez rejoindre ce mouvement ?
            </p>
            <Link
              href="/contribution-profil"
              className="inline-block px-8 py-4 bg-aw-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Proposer votre profil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
