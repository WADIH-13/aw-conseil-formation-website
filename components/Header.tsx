'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [hasFormationSingle, setHasFormationSingle] = useState(false)

  useEffect(() => {
    const check = () => setHasFormationSingle(!!document.querySelector('.formation-single'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [pathname])

  const isFormationDetail = pathname?.startsWith('/formations') || hasFormationSingle

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Formations', href: '/formations' },
    { name: 'Catalogue', href: '/catalogue' },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Veille', href: '/veille-charge-mentale' },
    { name: 'Blog', href: '/blog' },
    { name: 'Écosystème', href: '/ecosysteme' },
    { name: 'Regard scientifique', href: '/regard-scientifique' },
    { name: 'Démarches', href: '/demarche-qualite' },
  ]

  return (
    <header className="aw-diagonal-surface border-b border-black/5">
      <nav className="container-custom" aria-label="Navigation principale">
        <div className="flex items-center justify-between gap-8 py-10 md:py-12">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-6 px-2 py-2 rounded-2xl transition-all duration-300 hover:opacity-90"
            >
              <Image
                src="/logo-aw.png"
                alt="AW Conseil et Formation"
                width={260}
                height={80}
                className="h-12 md:h-16 w-auto"
                priority
              />
              <div className="hidden lg:flex flex-col leading-tight">
                <span className="text-xs tracking-[0.32em] uppercase text-black/55">
                  Conseil et Formation
                </span>
              </div>
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

          <div className="hidden md:flex items-center justify-center flex-1 space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative text-sm lg:text-base font-light tracking-[0.08em] text-black/70 transition-all duration-300 hover:text-aw-red-deep"
              >
                <span className="inline-flex items-center transition-transform duration-300 group-hover:-translate-y-[1px]">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center justify-end">
            {/* Qualiopi logo removed from header per design decision */}
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
              {/* Qualiopi logo removed from mobile menu as well */}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
