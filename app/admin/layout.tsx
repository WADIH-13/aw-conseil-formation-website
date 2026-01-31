import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <header className="border-b border-black/5 aw-diagonal-surface">
        <div className="container-custom py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-xs tracking-[0.3em] uppercase text-black/50">Back-office</p>
            <div className="aw-fine-divider w-10" />
            <nav className="flex items-center gap-6 text-sm text-black/70">
              <Link href="/admin/sessions" className="hover:text-aw-red">Sessions</Link>
              <Link href="/trouver-une-session" className="hover:text-aw-red">Vue publique</Link>
            </nav>
          </div>
          <form action="/api/admin/auth/logout" method="post">
            <button type="submit" className="btn-secondary">Déconnexion</button>
          </form>
        </div>
      </header>
      <main className="py-10 md:py-12">
        <div className="container-custom">{children}</div>
      </main>
    </div>
  )
}
