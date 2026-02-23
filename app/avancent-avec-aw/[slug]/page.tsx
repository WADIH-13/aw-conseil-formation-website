import Image from 'next/image';
import Link from 'next/link';

import { supabaseServer } from '@/lib/supabaseServer';

export const revalidate = 0; // Pas de cache

interface FormatorData {
  id: string;
  name: string;
  title: string;
  signature: string;
  bio: string;
  builds: string;
  protects: string;
  develops: string;
  values: string[];
  closing: string;
  slug: string;
  photo_url?: string;
}

type Intentions = {
  builds?: string | null;
  protects?: string | null;
  develops?: string | null;
} | null;

async function getFormatorBySlug(slug: string): Promise<FormatorData | null> {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from('formators')
      .select('id, name, title, signature, bio, intentions, values, closing, slug, photo_url')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.error('❌ Database error fetching formator:', error);
      return getDefaultFormatorBySlug(slug);
    }

    if (!data) {
      return getDefaultFormatorBySlug(slug);
    }

    const intentions = (data as any).intentions as Intentions;
    const builds = intentions && typeof intentions === 'object' ? String(intentions.builds ?? '') : '';
    const protects = intentions && typeof intentions === 'object' ? String(intentions.protects ?? '') : '';
    const develops = intentions && typeof intentions === 'object' ? String(intentions.develops ?? '') : '';

    const valuesRaw = (data as any).values;
    const values = Array.isArray(valuesRaw) ? valuesRaw.filter((v) => typeof v === 'string') : [];

    return {
      id: String((data as any).id ?? ''),
      name: String((data as any).name ?? ''),
      title: String((data as any).title ?? ''),
      signature: String((data as any).signature ?? ''),
      bio: String((data as any).bio ?? ''),
      builds,
      protects,
      develops,
      values,
      closing: String((data as any).closing ?? ''),
      slug: String((data as any).slug ?? slug),
      photo_url: (data as any).photo_url ?? undefined,
    };
  } catch (error) {
    console.error('💥 Exception fetching formator:', error);
    return getDefaultFormatorBySlug(slug);
  }
}

function getDefaultFormatorBySlug(slug: string): FormatorData | null {
  const defaultFormators: Record<string, FormatorData> = {
    'david-apruzzese': {
      id: '1',
      name: 'David Apruzzese',
      title: 'Régulation & stabilité en environnement exigeant',
      signature: 'Stabiliser les dynamiques sous pression pour restaurer la clarté collective.',
      bio: `David apporte 18 ans d'expérience en management de projets complexes et en régulation des dynamiques d'équipe. Son approche consiste à identifier les sources de tension organisationnelle et mettre en place des mécanismes simples mais robustes de stabilisation.

Il intervient particulièrement auprès des organisations en transformation rapide où le chaos règne et où les équipes perdent leur cap. Son intervention demande de la rigueur sans devenir autoritaire, de la clarté sans réduire la liberté d'action.`,
      builds: 'Rétablir la confiance et la clarté dans les environnements fragmentés',
      protects: 'La santé psychologique des collaborateurs face aux exigences de performance',
      develops: 'Les capacités de régulation autonome des équipes',
      values: ['Clarté', 'Stabilité', 'Responsabilité'],
      closing: "David contribue au mouvement AW en prouvant que l'exigence et le bien-être ne sont pas antinomiques.",
      slug: 'david-apruzzese',
    },
    'ahmed-wadih': {
      id: '2',
      name: 'Ahmed Wadih',
      title: 'Vision & Direction',
      signature: "Créer des environnements où l'exigence élève plutôt qu'elle ne contraint.",
      bio: `Fondateur d'AW Conseil et Formation, Ahmed construit depuis 15 ans des espaces de travail où l'excellence devient désirable plutôt qu'imposée. Son approche démarre par une question simple : qu'avons-nous oublié d'humaniser dans nos modèles de travail ?

Il accompagne les directions sur les enjeux stratégiques de prévention des RPS et intervient comme facilitateur dans les grandes transformations organisationnelles.`,
      builds: "Des visions claires d'amélioration collective",
      protects: "L'humain comme centre de gravité des décisions stratégiques",
      develops: "Les capacités d'anticipation et de vision stratégique",
      values: ['Humanité', 'Vision', 'Cohérence'],
      closing: "Ahmed porte le mouvement AW en incarnant qu'une entreprise sans âme perd sa force.",
      slug: 'ahmed-wadih',
    },
    'sophie-bernard': {
      id: '3',
      name: 'Sophie Bernard',
      title: 'Transformation et changement',
      signature: "Accompagner les organisations vers la clarté sans perdre en humanité.",
      bio: `Sophie est spécialiste du pilotage du changement et de la mobilisation collective. Elle a piloté plus de 30 transformations majeures dans des contextes variés et construit une expertise rare : faire en sorte que le changement renforce plutôt qu'il ne fragilise.

Son art est de créer les conditions pour que les équipes se réapproprient leur environnement de travail.`,
      builds: 'La capacité des organisations à se réinventer sans sacrifier la stabilité',
      protects: 'Les équipes face à la fatigue du changement permanent',
      develops: "La résilience collective et l'adaptabilité",
      values: ['Changement', 'Résilience', 'Inclusion'],
      closing: "Sophie montre au mouvement AW que la transformation durable passe par l'écoute sincère.",
      slug: 'sophie-bernard',
    },
  };

  return defaultFormators[slug] || null;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function FormatorPage({ params }: PageProps) {
  const formator = await getFormatorBySlug(params.slug);

  if (!formator) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light text-gray-900">Profil non trouvé</h1>
          <p className="text-gray-600">Cette page n'existe pas ou n'a pas été publiée.</p>
          <Link href="/avancent-avec-aw" className="inline-block text-aw-red hover:underline">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const bioParagraphs = formator.bio
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero avec photo à gauche et texte à droite */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-10 md:pt-28 md:pb-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start">
          {formator.photo_url && (
            <div className="relative w-44 h-44 md:w-64 md:h-64 bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-aw-red/20 flex-shrink-0">
              <Image src={formator.photo_url} alt={formator.name} fill className="object-cover object-top" priority />
            </div>
          )}
          <div className="flex-1 flex flex-col gap-7 md:gap-10">
            <h1 className="text-5xl md:text-6xl font-extralight text-gray-900 leading-tight tracking-tight">
              {formator.name}
            </h1>
            <p className="text-2xl md:text-3xl text-aw-red font-semibold mt-1">{formator.title}</p>
            <div className="border-l-4 border-aw-red pl-8 py-4 bg-white/80 rounded-xl shadow-sm">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic" style={{ lineHeight: '2.1' }}>
                {formator.signature}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="max-w-5xl mx-auto px-6 pb-16 flex flex-col gap-10">
        <div className="prose prose-lg max-w-none">
          {bioParagraphs.length > 0
            ? bioParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed mb-8" style={{ lineHeight: '2.1' }}>
                  {paragraph}
                </p>
              ))
            : null}
        </div>
      </section>

      {/* Intentions */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-100 flex flex-col gap-12">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 md:mb-12 tracking-tight">Intentions</h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          <div className="flex-1 bg-white rounded-2xl border-2 border-aw-red/20 shadow-lg p-8 flex flex-col gap-4 items-start hover:shadow-2xl transition-all duration-200">
            <p className="text-xs md:text-sm font-semibold text-aw-red uppercase tracking-wider mb-1">Ce qu'il / elle construit</p>
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl" style={{ lineHeight: '2' }}>
              {formator.builds}
            </p>
          </div>
          <div className="flex-1 bg-white rounded-2xl border-2 border-aw-red/20 shadow-lg p-8 flex flex-col gap-4 items-start hover:shadow-2xl transition-all duration-200">
            <p className="text-xs md:text-sm font-semibold text-aw-red uppercase tracking-wider mb-1">Ce qu'il / elle protège</p>
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl" style={{ lineHeight: '2' }}>
              {formator.protects}
            </p>
          </div>
          <div className="flex-1 bg-white rounded-2xl border-2 border-aw-red/20 shadow-lg p-8 flex flex-col gap-4 items-start hover:shadow-2xl transition-all duration-200">
            <p className="text-xs md:text-sm font-semibold text-aw-red uppercase tracking-wider mb-1">Ce qu'il / elle développe</p>
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl" style={{ lineHeight: '2' }}>
              {formator.develops}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-100 flex flex-col gap-10">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 md:mb-12 tracking-tight">Ce qui guide son action</h2>
        <div className="flex flex-wrap gap-5 md:gap-8">
          {formator.values.map((value) => (
            <button
              key={value}
              className="px-8 py-4 border-2 border-aw-red text-aw-red font-semibold rounded-full bg-white shadow-md hover:bg-aw-red hover:text-white hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aw-red/40 text-lg md:text-xl tracking-wide"
              type="button"
              tabIndex={0}
            >
              {value}
            </button>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-100 flex flex-col gap-10">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-lg">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic" style={{ lineHeight: '2' }}>
            {formator.closing}
          </p>
        </div>
        <div className="pt-4 md:pt-8">
          <Link href="/avancent-avec-aw" className="inline-flex items-center gap-3 text-aw-red font-semibold hover:gap-5 transition-all text-lg md:text-xl">
            <span>Découvrir d'autres trajectoires</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
