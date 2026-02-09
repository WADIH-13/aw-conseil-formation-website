import Link from 'next/link'

type CtaIntent = 'exchange' | 'program'

type Variant = 'primary' | 'secondary'

export type CtaGroupProps = {
  context: string
  offerId?: string
  offerSlug?: string
  offerHref?: string
  offerLabel?: string

  primaryLabel?: string
  programLabel?: string
  sessionsLabel?: string
  modalitiesLabel?: string

  showMicroText?: boolean
  microText?: string

  showProgram?: boolean
  showSessionsOrModalities?: boolean
  hasSessions?: boolean

  primaryVariant?: Variant
  secondaryVariant?: Variant

  className?: string
}

function variantClass(variant: Variant | undefined): string {
  return variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
}

function buildContactHref({
  intent,
  context,
  offerId,
  offerSlug,
  offerLabel,
}: {
  intent: CtaIntent
  context: string
  offerId?: string
  offerSlug?: string
  offerLabel?: string
}): string {
  const params = new URLSearchParams()
  params.set('intent', intent)
  params.set('source', context)

  if (offerId) params.set('offer_id', offerId)
  if (offerSlug) params.set('offer_slug', offerSlug)

  const offer = offerLabel || offerSlug || offerId
  if (offer) params.set('offer', offer)

  return `/contact?${params.toString()}`
}

export function PrimaryCTA({
  context,
  offerId,
  offerSlug,
  offerHref,
  offerLabel,
  labelOverride,
  showMicroText,
  microText,
  variant,
  className,
}: {
  context: string
  offerId?: string
  offerSlug?: string
  offerHref?: string
  offerLabel?: string
  labelOverride?: string
  showMicroText?: boolean
  microText?: string
  variant?: Variant
  className?: string
}) {
  const href = buildContactHref({
    intent: 'exchange',
    context,
    offerId,
    offerSlug: offerSlug ?? offerHref,
    offerLabel,
  })

  const label = labelOverride ?? 'Demander un échange'
  const helper = microText ?? 'Échange exploratoire 30 min. Sans engagement.'

  return (
    <div className={className ?? ''}>
      <Link href={href} className={variantClass(variant)}>
        {label}
      </Link>
      {showMicroText ? <p className="mt-2 text-xs text-black/50">{helper}</p> : null}
    </div>
  )
}

export function SecondaryCTA({
  href,
  label,
  variant,
}: {
  href: string
  label: string
  variant?: Variant
}) {
  return (
    <Link href={href} className={variantClass(variant ?? 'secondary')}>
      {label}
    </Link>
  )
}

export default function CtaGroup({
  context,
  offerId,
  offerSlug,
  offerHref,
  offerLabel,
  primaryLabel,
  programLabel,
  sessionsLabel,
  modalitiesLabel,
  showMicroText,
  microText,
  showProgram,
  showSessionsOrModalities,
  hasSessions,
  primaryVariant,
  secondaryVariant,
  className,
}: CtaGroupProps) {
  const programHref = buildContactHref({
    intent: 'program',
    context,
    offerId,
    offerSlug: offerSlug ?? offerHref,
    offerLabel,
  })

  const sessionsHref = offerId ? `/sessions?offer_id=${encodeURIComponent(offerId)}` : '/sessions'

  const modalitiesTarget = offerHref || offerSlug
  const modalitiesHref = modalitiesTarget ? `${modalitiesTarget}#modalites` : '/catalogue'

  const shouldShowSessions = Boolean(hasSessions)
  const secondaryLabel = shouldShowSessions
    ? sessionsLabel ?? 'Voir les sessions'
    : modalitiesLabel ?? 'Voir les modalités'

  const secondaryHref = shouldShowSessions ? sessionsHref : modalitiesHref

  return (
    <div className={className ?? ''}>
      <div className="flex flex-wrap items-start gap-3">
        <PrimaryCTA
          context={context}
          offerId={offerId}
          offerSlug={offerSlug}
          offerHref={offerHref}
          offerLabel={offerLabel}
          labelOverride={primaryLabel}
          showMicroText={showMicroText}
          microText={microText}
          variant={primaryVariant}
        />

        {showProgram ? (
          <SecondaryCTA href={programHref} label={programLabel ?? 'Recevoir le programme'} variant={secondaryVariant} />
        ) : null}

        {showSessionsOrModalities ? (
          <SecondaryCTA href={secondaryHref} label={secondaryLabel} variant={secondaryVariant} />
        ) : null}
      </div>
    </div>
  )
}
