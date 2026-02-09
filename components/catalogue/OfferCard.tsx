import { PrimaryCTA } from "@/components/cta/CtaGroup";

type Offer = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  families?: { name: string } | null;
  formats: string[] | null;
  is_active: boolean;
};

function formatLabel(formats?: string[] | null) {
  const f = (formats || [])[0];
  if (f === "formation") return "Formation";
  if (f === "atelier") return "Atelier";
  if (f === "conseil") return "Conseil";
  return "Offre";
}

export function OfferCard({ offer }: { offer: Offer }) {
  const label = formatLabel(offer.formats);
  const familyName = offer.families?.name ?? "—";

  // Destination: detail page if it exists, otherwise contact with a query param.
  const offerHref = `/catalogue/${offer.slug}`;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="text-xs uppercase tracking-wide text-neutral-500">
          {label} • {familyName}
        </div>
      </div>

      <h3 className="mt-3 text-xl font-semibold text-neutral-900">
        {offer.title}
      </h3>

      <p className="mt-2 text-neutral-600 leading-relaxed">
        {offer.summary || "—"}
      </p>

      {/* Cartes catalogue: 1 seul CTA (principal) */}
      <div className="mt-6">
        <PrimaryCTA
          context="catalogue"
          offerId={offer.id}
          offerSlug={offer.slug}
          offerHref={offerHref}
          offerLabel={offer.title}
          variant="primary"
        />
      </div>
    </div>
  );
}
