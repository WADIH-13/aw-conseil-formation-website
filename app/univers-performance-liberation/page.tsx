import { Metadata } from 'next';
import { getUniverseData } from '@/lib/universe/queries';
import { universeCopy } from '@/lib/universe/copy';
import { HeroSection } from '@/components/universe/HeroSection';
import { UniverseGrid } from '@/components/universe/UniverseGrid';
import { PartnerSection } from '@/components/universe/PartnerSection';

export const metadata: Metadata = {
  title: `${universeCopy.page.title} | AW Conseil Formation`,
  description: universeCopy.page.intro,
};

export default async function UniversePage() {
  const universeData = await getUniverseData();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection />

      {/* Grid des univers */}
      <UniverseGrid data={universeData} />

      {/* Section Partenaires */}
      <PartnerSection />
    </div>
  );
}
