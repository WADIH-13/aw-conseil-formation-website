import Link from 'next/link'
import React from 'react'

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M4.98 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM4 9h2v10H4V9Zm5.8 0h1.9v1.4h.1c.3-.6 1.1-1.4 2.5-1.4 2.6 0 3.1 1.7 3.1 3.9V19h-2v-5c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V19h-2V9Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M21.8 8.001a2.6 2.6 0 0 0-1.8-1.84C18.3 5.8 12 5.8 12 5.8s-6.3 0-8 .36A2.6 2.6 0 0 0 2.2 8.001 27 27 0 0 0 1.8 12a27 27 0 0 0 .4 3.999 2.6 2.6 0 0 0 1.8 1.84c1.7.36 8 .36 8 .36s6.3 0 8-.36a2.6 2.6 0 0 0 1.8-1.84A27 27 0 0 0 22.2 12a27 27 0 0 0-.4-3.999ZM10 14.5v-5l4.5 2.5L10 14.5Z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.75 7.25a4.8 4.8 0 0 1-3.1-1.1v7.1a4.8 4.8 0 1 1-4.8-4.8c.3 0 .5 0 .8.1v2.1a2.7 2.7 0 1 0 1.9 2.6V3h2.1c0 .6.2 1.2.5 1.7.4.6 1 1 1.7 1.1l.9.1v2.2c-.4 0-.7 0-1 0Z" />
      </svg>
    ),
  },
]

const showMahiBahi = process.env.NEXT_PUBLIC_SHOW_MAHI_BAHI === 'true'

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="container-custom py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-black">AW Conseil et Formation</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Des parcours sobres, pensés pour aider chacun à respirer et à poser ce qui pèse sans jugement.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black uppercase tracking-wide">Navigation</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <Link href="/formations" className="hover:text-aw-red">Formations</Link>
            <Link href="/partenaires" className="hover:text-aw-red">Partenaires</Link>
            <Link href="/veille-charge-mentale" className="hover:text-aw-red">Veille</Link>
            <Link href="/blog" className="hover:text-aw-red">Blog</Link>
            <Link href="/demarche-qualite" className="hover:text-aw-red">Démarche qualité</Link>
            <Link href="/mentions-legales" className="hover:text-aw-red">Mentions légales</Link>
            {showMahiBahi ? (
              <Link href="/dr-mahi-bahi" className="hover:text-aw-red">Dr Mahi Bahi</Link>
            ) : null}
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black uppercase tracking-wide">Suivre les nouvelles</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Des formats courts, sans promesse miracle. Juste des idées à tester et à adapter à ton rythme.
          </p>
          <div className="flex space-x-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 hover:text-aw-red hover:border-aw-red transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                {social.icon}
                <span className="text-sm font-medium">{social.name}</span>
              </a>
            ))}
          </div>
          {showMahiBahi ? (
            <div className="text-xs text-gray-500">Dr Mahi Bahi, référent scientifique.</div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export default Footer
