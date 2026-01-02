import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container-custom">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/logo-aw.png" 
                  alt="AW Conseil et Formation" 
                  className="h-6"
                />
                <span className="text-base font-medium text-black">
                  AW Conseil et Formation
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Accompagner avec humanité.<br />
                Révéler ce qui compte.<br />
                Connecter durablement.
              </p>
            </div>

            <div className="col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div>
                  <Link href="/" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Accueil
                  </Link>
                </div>
                <div>
                  <Link href="/formations" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Formations
                  </Link>
                </div>
                <div>
                  <Link href="/demarche-qualite" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Démarche qualité
                  </Link>
                </div>
                <div>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Contact
                  </Link>
                </div>
                <div>
                  <Link href="/mentions-legales" className="text-sm text-gray-600 hover:text-aw-red transition-colors">
                    Mentions légales
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                © 2026 AW Conseil et Formation. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
