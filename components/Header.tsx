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

  const navigation: Array<{
    name: string
    href: string
    children?: Array<{ name: string; href: string }>
  }> = [
    { name: 'Accueil', href: '/' },
    {
      name: 'Catalogue',
      href: '/catalogue',
      children: [
        { name: 'Voir le catalogue', href: '/catalogue' },
        { name: 'Formations professionnelles', href: '/formations' },
      ],
    },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Veille', href: '/veille-charge-mentale' },
    { name: 'Blog', href: '/blog' },
    { name: 'Écosystème', href: '/ecosysteme' },
    { name: 'Regards scientifiques', href: '/regard-scientifique' },
    { name: 'Démarches', href: '/demarche-qualite' },
  ]

  const desktopItemClass =
    'group relative text-sm lg:text-base font-light tracking-[0.08em] text-black/75 transition-all duration-300 hover:text-aw-red-deep'

  const desktopPillClass =
    'inline-flex items-center rounded-xl px-3 py-2 transition-all duration-300 group-hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]'

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
                width={325}
                height={100}
                className="h-14 md:h-20 w-auto"
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
            {navigation.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <div key={item.name} className={`${desktopItemClass} group`}
                  >
                    <Link href={item.href} className={desktopPillClass}>
                      {item.name}
                      <svg
                        className="ml-2 h-4 w-4 text-black/45"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>

                    <div className="absolute left-0 top-full z-50 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                      <div className="min-w-[260px] rounded-2xl border border-black/10 bg-white aw-card-surface p-2 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-4 py-3 text-sm text-black/75 hover:text-aw-red-deep hover:bg-black/[0.02] transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link key={item.name} href={item.href} className={desktopItemClass}>
                  <span className={desktopPillClass}>{item.name}</span>
                </Link>
              )
            })}
          </div>
          <div className="hidden md:flex items-center justify-end">
            {/* Qualiopi logo removed from header per design decision */}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
              {navigation.map((item) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <div key={item.name} className="rounded-xl border border-black/5 bg-white">
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-base font-medium text-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <div className="px-2 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:text-aw-red hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-aw-red hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
              {/* Qualiopi logo removed from mobile menu as well */}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
