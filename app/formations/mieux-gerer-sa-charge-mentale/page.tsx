import FormationTemplate from '@/components/FormationTemplate'
import { getIndicators } from '@/lib/getIndicators'

export const metadata = {
  title: 'Mieux gérer sa charge mentale - 7h - AW Conseil et Formation',
  description:
    'Formation pour passer de la prise de conscience à l’action : prioriser, limiter les sollicitations et ancrer des pratiques soutenables.',
}

export default async function MieuxGererChargeMentale() {
  const indicators = await getIndicators('mieux-gerer-sa-charge-mentale')

  return (
    <FormationTemplate
      title="Mieux gérer sa charge mentale et agir concrètement"
      ctaOfferSlug="/formations/mieux-gerer-sa-charge-mentale"
      ctaOfferLabel="Mieux gérer sa charge mentale"
      subtitle="Transformer la prise de conscience en actions réalistes et soutenables."
      duration="7 heures"
      format="Présentiel ou distanciel"
      level="Intermédiaire"
      audienceShort="Managers, RH, professionnels"
      context={
        "Cette formation s’adresse aux personnes ayant identifié une surcharge mentale et souhaitant agir concrètement. Elle permet de transformer la prise de conscience en actions réalistes, adaptées aux contraintes du terrain professionnel."
      }
      audience={[
        'Professionnels déjà sensibilisés souhaitant réguler leur charge',
        'Managers et responsables d’équipe',
        'Fonctions support (RH, QVT) en appui des collectifs',
      ]}
      objectives={[
        'Réguler sa charge mentale au quotidien',
        'Identifier ses principaux facteurs de surcharge',
        'Mettre en place des leviers d’action adaptés (priorisation, limites, sollicitations)',
        'Clarifier ses priorités et ses marges de manœuvre',
        'Ancrer des pratiques plus soutenables dans la durée',
      ]}
      programme={[
        {
          title: 'Module 1 — Comprendre ses mécanismes',
          bullets: ['Sources individuelles de surcharge', 'Fonctionnement attentionnel et fatigue mentale'],
        },
        {
          title: 'Module 2 — Leviers d’action concrets',
          bullets: ['Organisation et priorisation', 'Gestion des sollicitations', 'Communication et ajustement des attentes'],
        },
        {
          title: 'Module 3 — Ancrer des pratiques durables',
          bullets: ['Ajustements réalistes', 'Prévention des rechutes', 'Plan d’action personnel'],
        },
      ]}
      methods={[
        'Exercices pratiques et auto-analyse',
        'Mises en situation et analyses de cas',
        'Échanges d’expérience et plan d’action individuel',
      ]}
      evaluation={
        'Évaluation des acquis, mises en situation et questionnaire de satisfaction. Attestation de fin de formation.'
      }
      plus={[
        'Approche opérationnelle orientée terrain',
        'Outils directement réutilisables',
        'Adaptation au contexte de l’entreprise',
      ]}
      financing={['Devis sur demande', 'Prise en charge possible par OPCO selon conditions']}
      indicators={indicators ?? undefined}
    />
  )
}