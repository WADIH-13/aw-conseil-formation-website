import { CellesEtceuxHero } from '@/components/celles-et-ceux/HeroSection';
import { InstructorCard } from '@/components/celles-et-ceux/InstructorCard';

const instructors = [
  {
    id: 1,
    name: 'Fouad Bennani',
    title: 'Fondateur & Consultant Principal',
    specialty: 'Prévention des RPS et charge mentale',
    bio: 'Avec plus de 15 ans d\'expérience en développement organisationnel et prévention des risques psychosociaux, Fouad accompagne les entreprises dans la transformation de leur culture de travail et la réduction de la charge mentale.',
    photo: undefined,
    email: 'fouad@aw-conseil.fr',
  },
  {
    id: 2,
    name: 'Sarah Leclerc',
    title: 'Formatrice & Experte QVCT',
    specialty: 'Qualité de vie au travail',
    bio: 'Spécialiste de la qualité de vie au travail, Sarah conçoit et anime des formations sur mesure pour développer les compétences managériales et créer des environnements professionnels sains.',
    photo: undefined,
    email: 'sarah@aw-conseil.fr',
  },
  {
    id: 3,
    name: 'Marc Delmont',
    title: 'Formateur & Consultant',
    specialty: 'Management et leadership',
    bio: 'Expert en management et leadership, Marc aide les équipes de direction à développer une posture de leader responsable et à créer des environnements de travail performants et bienveillants.',
    photo: undefined,
    email: 'marc@aw-conseil.fr',
  },
  {
    id: 4,
    name: 'Nathalie Rousseau',
    title: 'Formatrice & Psychologue du travail',
    specialty: 'Bien-être et prévention',
    bio: 'Psychologue du travail de formation, Nathalie combine expertise clinique et prévention organisationnelle pour accompagner les entreprises dans la création de cadres de travail humains et performants.',
    photo: undefined,
    email: 'nathalie@aw-conseil.fr',
  },
  {
    id: 5,
    name: 'Philippe Mercier',
    title: 'Consultant & Auditeur',
    specialty: 'Diagnostic et stratégie',
    bio: 'Avec une double expertise en ressources humaines et diagnostic organisationnel, Philippe aide les entreprises à identifier leurs enjeux et construire des stratégies de prévention durables.',
    photo: undefined,
    email: 'philippe@aw-conseil.fr',
  },
  {
    id: 6,
    name: 'Isabelle Moreau',
    title: 'Formatrice Sénior',
    specialty: 'Accompagnement du changement',
    bio: 'Spécialiste de l\'accompagnement du changement, Isabelle guide les organisations dans la mise en place de nouvelles pratiques de travail et la mobilisation des équipes autour de projets structurants.',
    photo: undefined,
    email: 'isabelle@aw-conseil.fr',
  },
];

export default function CellesEtceuxPage() {
  return (
    <div className="min-h-screen bg-white">
      <CellesEtceuxHero />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 pb-24 border-b border-gray-200">
          <div>
            <p className="text-5xl font-light text-aw-red mb-2">{instructors.length}+</p>
            <p className="text-gray-700 text-lg">Intervenants engagés</p>
          </div>
          <div>
            <p className="text-5xl font-light text-aw-red mb-2">200+</p>
            <p className="text-gray-700 text-lg">Formations dispensées</p>
          </div>
          <div>
            <p className="text-5xl font-light text-aw-red mb-2">5000+</p>
            <p className="text-gray-700 text-lg">Personnes formées</p>
          </div>
        </div>

        {/* Instructors grid */}
        <section>
          <h2 className="text-4xl font-light text-gray-900 mb-16">L'équipe AW Conseil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} {...instructor} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 pt-24 border-t border-gray-200">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Envie de travailler ensemble ?</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Contactez-nous pour discuter de vos besoins en formation ou en conseil. Notre équipe est à votre écoute pour construire des solutions adaptées à votre contexte.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-aw-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
