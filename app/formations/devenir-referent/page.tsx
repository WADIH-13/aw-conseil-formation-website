import FormationTemplate from '@/components/FormationTemplate'
import { getIndicators } from '@/lib/getIndicators'

export const metadata = {
  title: 'Devenir référent charge mentale - 28h - AW Conseil et Formation',
  description: 'Formation pour devenir référent charge mentale. 28 heures pour acquérir les outils et la posture d\'accompagnement professionnel.',
}

export default async function DevenirReferentPage() {
  const indicators = await getIndicators('devenir-referent')

  return (
    <FormationTemplate
      title="Devenir référent charge mentale"
      ctaOfferSlug="/formations/devenir-referent"
      ctaOfferLabel="Devenir référent charge mentale"
      subtitle="Acquérir les outils et la posture pour soutenir vos collègues."
      duration="28 heures"
      format="Présentiel ou distanciel"
      level="Intermédiaire"
      audienceShort="Managers, RH, référents"
      context={`Cette formation vise à former des référent·es capables d’écouter, d’orienter et de proposer des actions concrètes au sein de leur organisation. Elle répond au besoin d’un accompagnement professionnel, cadré et conforme aux bonnes pratiques de prévention.`}
      audience={[
        'Managers de proximité',
        'Référents QVT ou qualité de vie au travail',
        'Professionnels·les RH souhaitant intervenir en soutien',
      ]}
      objectives={[
        'Développer une posture d’écoute et d’accompagnement',
        'Savoir orienter vers les ressources adaptées',
        'Concevoir des actions de prévention et de soutien',
      ]}
      programme={[
        { title: 'Module 1 — Posture et cadre', bullets: ['Rôles et limites du référent', 'Confidentialité et déontologie'] },
        { title: 'Module 2 — Techniques d’écoute', bullets: ['Entretien structuré', 'Questions aidantes'] },
        { title: 'Module 3 — Actions organisationnelles', bullets: ['Repères pour identifier et qualifier les situations', 'Propositions d’amélioration'] },
      ]}
      methods={[
        'Alternance d’apports méthodologiques et d’exercices pratiques',
        'Jeux de rôle et retours en groupe',
        'Support de formation et ressources opérationnelles fournies',
      ]}
      evaluation={'Mise en situation, évaluation par le formateur et questionnaire de satisfaction. Attestation de formation délivrée.'}
      plus={[
        'Programme construit sur l’expérience terrain',
        'Ressources opérationnelles transférables immédiatement',
      ]}
      financing={['Prise en charge possible par OPCO', 'Devis et programme sur demande']}
      indicators={indicators ?? undefined}
    />
  )
}
