'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/lib/universe/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [hasFormationSingle, setHasFormationSingle] = useState(false)
  const { items } = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const update = () => setIsCompact(window.scrollY > 12)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const check = () => setHasFormationSingle(!!document.querySelector('.formation-single'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [pathname])

  const isFormationDetail = pathname?.startsWith('/formations') || hasFormationSingle

  const isActiveHref = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const navigation: Array<{
    name: string
    href: string
    children?: Array<{ name: string; href: string }>
  }> = [
    { name: 'Accueil', href: '/' },
    {
      name: 'Formations',
      href: '/catalogue',
      children: [
        { name: 'Catalogue des formations', href: '/catalogue' },
        { name: 'Formations professionnelles', href: '/formations' },
        { name: 'Trouver une session', href: '/trouver-une-session' },
      ],
    },
    {
      name: 'Démarches',
      href: '/posture-engagement',
      children: [
        { name: 'Posture & engagement', href: '/posture-engagement' },
        { name: 'Méthodologie d\'intervention', href: '/methodologie-intervention' },
        { name: 'Observation collective stratégique', href: '/observation-collective' },
      ],
    },
    {
      name: 'Ressources',
      href: '/veille-actualites-scientifiques',
      children: [
        { name: 'Veille scientifique', href: '/veille-actualites-scientifiques' },
        { name: 'Observatoire charge mentale', href: '/observatoire-charge-mentale' },
        { name: 'Blog', href: '/blog' },
        { name: 'Regards scientifiques', href: '/regard-scientifique' },
      ],
    },
    {
      name: 'Écosystème',
      href: '/ecosysteme',
      children: [
        { name: 'Écosystème', href: '/ecosysteme' },
        { name: 'Celles et ceux qui avancent', href: '/avancent-avec-aw' },
        { name: 'Réseau de partenaires', href: '/partenaires' },
        { name: 'Le Guide d’Essor', href: '/guide-essor' },
      ],
    },
  ]

  const desktopItemClass =
    'group relative text-xs xl:text-sm 2xl:text-base font-light tracking-[0.08em] text-black/75 transition-all duration-300 hover:text-aw-red-deep'

  const desktopPillClass =
    'inline-flex items-center whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-300 group-hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]'

  const desktopPillActiveClass =
    'bg-white text-aw-red-deep shadow-[0_12px_30px_rgba(0,0,0,0.08)]'

  return (
    <header className="sticky top-0 z-50 aw-diagonal-surface border-b border-black/5">
      <nav className="container-custom" aria-label="Navigation principale">
        <div
          className={`flex items-center justify-between gap-8 transition-all duration-300 ${
            isCompact ? 'py-5 md:py-6' : 'py-10 md:py-12'
          }`}
        >
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
                className={`w-auto transition-all duration-300 ${isCompact ? 'h-11 md:h-14' : 'h-14 md:h-20'}`}
                priority
              />
              <div className="hidden lg:flex flex-col leading-tight">
                <span
                  className={`font-medium uppercase text-black/55 transition-all duration-300 ${
                    isCompact ? 'text-[13px] tracking-[0.22em]' : 'text-[15px] tracking-[0.24em]'
                  }`}
                >
                  Conseil <span className="text-[17px] font-semibold tracking-[0.14em] text-aw-red-deep opacity-80">&</span> Formation
                </span>
                <span
                  className={`h-[2px] w-12 bg-aw-red-deep/80 transition-all duration-300 ${
                    isCompact ? 'mt-1 opacity-70' : 'mt-2 opacity-100'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 xl:hidden">
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

          <div className="hidden xl:flex items-center justify-center flex-1 gap-1 2xl:gap-6">
            {navigation.map((item) => {
              const isActive =
                (item.name === 'Formations' && isFormationDetail) ||
                isActiveHref(item.href) ||
                (item.children?.some((child) => isActiveHref(child.href)) ?? false)

              if (item.children && item.children.length > 0) {
                return (
                  <div key={item.name} className={`${desktopItemClass} group`}
                  >
                    <Link
                      href={item.href}
                      className={`${desktopPillClass} ${isActive ? desktopPillActiveClass : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
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
                  <span className={`${desktopPillClass} ${isActive ? desktopPillActiveClass : ''}`}>{item.name}</span>
                </Link>
              )
            })}
          </div>
          <div className="hidden xl:flex items-center justify-end gap-4">
            {/* Trajectoire */}
            <Link
              href="/univers-performance-liberation/panier"
              className="relative text-black/70 hover:text-aw-red transition-colors"
              aria-label="Votre trajectoire de performance"
            >
              <svg 
                className="h-10 w-10" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 17l6-6 4 4 8-8"/>
                <path d="M14 7h7v7"/>
              </svg>
              {mounted && items.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-aw-red text-xs font-bold text-white">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="xl:hidden">
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
              
              {/* Trajectoire dans le menu mobile */}
              <Link
                href="/univers-performance-liberation/panier"
                className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-aw-red hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Ma Trajectoire</span>
                {mounted && items.length > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aw-red text-xs font-bold text-white">
                    {items.length}
                  </span>
                )}
              </Link>
              {/* Qualiopi logo removed from mobile menu as well */}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
