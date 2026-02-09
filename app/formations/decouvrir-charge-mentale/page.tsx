import FormationTemplate from '@/components/FormationTemplate'
import { getIndicators } from '@/lib/getIndicators'

export const metadata = {
  title: 'Découvrir la charge mentale - 7h - AW Conseil et Formation',
  description: 'Formation pour comprendre et reconnaître la charge mentale au travail. 7 heures pour prendre conscience des mécanismes invisibles.',
}

export default async function DecouvrirChargeMentalePage() {
  const indicators = await getIndicators('decouvrir-charge-mentale')

  return (
    <FormationTemplate
      title="Découvrir la charge mentale"
      ctaOfferSlug="/formations/decouvrir-charge-mentale"
      ctaOfferLabel="Découvrir la charge mentale"
      subtitle="Comprendre ces mécanismes invisibles et apprendre à les reconnaître."
      duration="7 heures"
      format="Présentiel ou distanciel"
      level="Tous niveaux"
      audienceShort="Tout public"
      context={`Cette formation existe pour permettre aux participant·es de repérer la charge mentale dans leur quotidien professionnel. Elle répond au besoin concret de réduire l’épuisement, améliorer la prévention et favoriser des pratiques plus soutenables au travail.`}
      audience={[
        'Collaborateurs·trices constatant une fatigue durable',
        'Managers souhaitant détecter les signes précoces',
        'Professionnels·les RH souhaitant des repères pratiques',
      ]}
      objectives={[
        'Savoir définir et repérer la charge mentale',
        'Identifier les situations professionnelles à risque',
        'Mettre en place des premières actions protectrices',
      ]}
      programme={[
        { title: 'Module 1 — Comprendre la charge mentale', bullets: ['Définitions et repères', 'Impacts sur la santé et la performance'] },
        { title: 'Module 2 — Identifier les signes', bullets: ['Signes individuels', 'Signes organisationnels'] },
        { title: 'Module 3 — Actions simples', bullets: ['Techniques immédiates', 'Petits changements durables'] },
      ]}
      methods={[
        'Apports théoriques courts et concrets',
        'Exercices individuels et en binôme',
        'Mises en situation et retours d’expérience',
      ]}
      evaluation={'Échanges en groupe, mise en situation et questionnaire de satisfaction. Un certificat de formation peut être délivré.'}
      plus={['Approche pratique et terrain', 'Formateurs expérimentés', 'Programme adaptable au contexte de l’entreprise']}
      financing={['Possibilité de prise en charge par OPCO', 'Devis sur demande']}
      indicators={indicators ?? undefined}
    />
  )
}
