import Link from 'next/link'

const posts = [
  {
    title: 'Le poids mental des transitions',
    excerpt: 'Comment accompagner une équipe quand les priorités changent sans cesse ? Quelques repères simples.',
    category: 'Gestion du changement',
    readingTime: '4 min',
  },
  {
    title: 'Mettre des mots avant la fatigue',
    excerpt: 'Un vocabulaire doux pour dire “stop” sans culpabilité et inviter le collectif à se réorganiser.',
    category: 'Prévention',
    readingTime: '3 min',
  },
  {
    title: 'Les micro-pauses qui rassurent',
    excerpt: 'Des moments courts qui redonnent de la marge de manœuvre sans casser le rythme de l’équipe.',
    category: 'Rituels',
    readingTime: '5 min',
  },
]

export default function BlogPage() {
  return (
    <div className="bg-white">
      <section className="py-20 border-b border-gray-100">
        <div className="container-custom space-y-6">
          <p className="text-sm uppercase tracking-wide text-aw-red font-semibold">Blog</p>
          <h1 className="text-4xl md:text-5xl font-light text-black">Des articles courts qui respirent</h1>
          <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
            Des notes régulières pour partager ce qui fonctionne, ce qui questionne et ce qui mérite d&apos;être testé avec douceur.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.title} className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-sm text-aw-red font-semibold">{post.category}</p>
                <h2 className="text-2xl font-light text-black">{post.title}</h2>
                <p className="text-gray-700 leading-relaxed text-base">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-gray-600">{post.readingTime}</span>
                <Link href="/contact" className="text-sm font-medium text-aw-red hover:text-red-700">
                  Organiser une conversation →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
