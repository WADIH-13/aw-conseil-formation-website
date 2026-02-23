import { Metadata } from 'next';
import { getExperienceBySlug } from '@/lib/universe/queries';
import { notFound } from 'next/navigation';
import { ExperienceDetailClient } from '@/components/universe/ExperienceDetailClient';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const experience = await getExperienceBySlug(params.slug);

  if (!experience) {
    return { title: 'Expérience non trouvée' };
  }

  return {
    title: `${experience.title} | AW Conseil Formation`,
    description: experience.short_description,
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const experience = await getExperienceBySlug(params.slug);

  if (!experience) {
    notFound();
  }

  return <ExperienceDetailClient experience={experience} />;
}
