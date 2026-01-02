import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container-custom">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <h3 className="text-lg font-semibold text-black mb-4">
                AW Conseil et Formation
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Accompagner avec humanité.<br />
                Révéler ce qui compte.<br />
                Connecter durablement.
              </p>
            </div>

            <div className="col-span-1">
              <h4 className="text-base font-medium text-black mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/formations" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Formations
                  </Link>
                </li>
                <li>
                  <Link href="/demarche-qualite" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Démarche qualité
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-base font-medium text-black mb-4">Formations</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/formations/decouvrir-charge-mentale" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Découvrir la charge mentale
                  </Link>
                </li>
                <li>
                  <Link href="/formations/devenir-referent" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Devenir référent
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500">
                © 2026 AW Conseil et Formation. Tous droits réservés.
              </p>
              <div className="flex space-x-6">
                <Link href="/mentions-legales" className="text-sm text-gray-500 hover:text-aw-red transition-colors">
                  Mentions légales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
