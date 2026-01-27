import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black">AW Conseil et Formation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cabinet de conseil et de formation dédié à la prévention des RPS,
              à la réduction de la charge mentale et à la mise en place de solutions concrètes.
            </p>
            <div className="pt-2">
              <a href="/qualiopi.certicat.pdf" target="_blank" rel="noreferrer">
                <Image
                  src="/qualiopi.png"
                  alt="Qualiopi - Pour action de formation"
                  width={364}
                  height={140}
                  className="h-[114px] w-auto"
                />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Contact</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-medium">Téléphone :</span>{' '}
                <a href="tel:+33651455083" className="text-aw-red hover:text-red-700">06 51 45 50 83</a>
              </p>
              <p>
                <span className="font-medium">Email :</span>{' '}
                <a href="mailto:ahmed.wadih@gmail.com" className="text-aw-red hover:text-red-700">ahmed.wadih@gmail.com</a>
              </p>
              <p className="text-gray-500">Lundi au vendredi, 9h-18h</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Liens</h4>
            <div className="flex flex-col space-y-2 text-sm text-gray-700">
              <Link href="/formations" className="hover:text-aw-red">Formations</Link>
              <Link href="/demarche-qualite" className="hover:text-aw-red">Démarche qualité</Link>
              <Link href="/regard-scientifique" className="hover:text-aw-red">Regard scientifique</Link>
              <Link href="/contact" className="hover:text-aw-red">Contact</Link>
              <Link href="/mentions-legales" className="text-gray-500 hover:text-aw-red">Mentions légales</Link>
              <Link href="/dr-mahi-bahi" className="text-gray-400 hover:text-gray-600">Dr Mahi Bahi</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-xs text-gray-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p>© 2026 AW Conseil et Formation. Tous droits réservés.</p>
          <p>Qualiopi – Pour action de formation.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
