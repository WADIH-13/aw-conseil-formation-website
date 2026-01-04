'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Formations', href: '/formations' },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Veille', href: '/veille-charge-mentale' },
    { name: 'Blog', href: '/blog' },
    { name: 'Écosystème', href: '/ecosysteme' },
    { name: 'Regard scientifique', href: '/regard-scientifique' },
    { name: 'Démarche qualité', href: '/demarche-qualite' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="container-custom" aria-label="Navigation principale">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image 
                src="/logo-aw.png" 
                alt="AW Conseil et Formation" 
                width={144}
                height={36}
                className="h-7 md:h-9 w-auto"
                priority
              />
              <span className="text-lg md:text-xl font-medium text-black">
                AW Conseil et Formation
              </span>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-aw-red"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-aw-red transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              href="/contact"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-aw-red hover:bg-red-700 transition-colors"
            >
              Prendre un temps d'échange
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-aw-red hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block w-full mt-4 px-3 py-2 rounded-md text-base font-medium text-white bg-aw-red hover:bg-red-700 text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Prendre un temps d'échange
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
