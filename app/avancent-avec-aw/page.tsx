import { HeroAvancer } from '@/components/avancer-avec-aw/HeroAvancer';
import { HorizontalScroll } from '@/components/avancer-avec-aw/HorizontalScroll';
import { AnchorText } from '@/components/avancer-avec-aw/AnchorText';
import { ValidationSection } from '@/components/avancer-avec-aw/ValidationSection';
import { supabaseServer } from '@/lib/supabaseServer';

export const revalidate = 0; // Pas de cache

interface Formator {
  id: string;
  name: string;
  title: string;
  signature: string;
  slug: string;
}

async function getPublishedFormators(): Promise<Formator[]> {
  try {
    console.log('🎯 Carousel page: Fetching published formators');
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from('formators')
      .select('id, name, title, signature, slug')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Database error:', error);
      return getDefaultFormators();
    }
    
    if (!data || data.length === 0) {
      console.log('⚠️ No published formators in DB, using defaults');
      return getDefaultFormators();
    }

    console.log('✅ Found', data.length, 'published formators:', data.map((f: any) => ({ name: f.name, slug: f.slug })));
    return data;
  } catch (error) {
    console.error('💥 Exception fetching formators:', error);
    return getDefaultFormators();
  }
}

function getDefaultFormators(): Formator[] {
  return [
    {
      id: '1',
      name: 'David Apruzzese',
      title: 'Régulation & stabilité en environnement exigeant',
      signature: 'Stabiliser les dynamiques sous pression pour restaurer la clarté collective.',
      slug: 'david-apruzzese',
    },
    {
      id: '2',
      name: 'Ahmed Wadih',
      title: 'Vision & Direction',
      signature: 'Créer des environnements où l\'exigence élève plutôt qu\'elle ne contraint.',
      slug: 'ahmed-wadih',
    },
    {
      id: '3',
      name: 'Sophie Bernard',
      title: 'Transformation et changement',
      signature: 'Accompagner les organisations vers la clarté sans perdre en humanité.',
      slug: 'sophie-bernard',
    },
    {
      id: '4',
      name: 'Marc Delacroix',
      title: 'Performance durable',
      signature: 'Construire des modèles où la performance et l\'humain se renforcent mutuellement.',
      slug: 'marc-delacroix',
    },
    {
      id: '5',
      name: 'Nathalie Rousseau',
      title: 'Bien-être organisationnel',
      signature: 'Placer le bien-être au cœur de la stratégie sans le réduire à un gadget RH.',
      slug: 'nathalie-rousseau',
    },
  ];
}

export default async function AvancerAvecAwPage() {
  const formators = await getPublishedFormators();

  return (
    <div className="min-h-screen bg-white">
      <HeroAvancer />
      <HorizontalScroll formators={formators} />
      <AnchorText />
      <ValidationSection />
    </div>
  );
}
