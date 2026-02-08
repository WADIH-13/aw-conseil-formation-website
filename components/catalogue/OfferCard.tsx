import Link from "next/link";

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
  const href = `/contact?offre=${encodeURIComponent(offer.title)}`;
  const sessionsHref = `/sessions?offer_id=${encodeURIComponent(offer.id)}`;

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

      <div className="mt-6 flex items-center gap-3">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-white text-sm font-medium hover:opacity-90"
        >
          Recevoir le programme
        </Link>

        <Link
          href={sessionsHref}
          className="inline-flex items-center justify-center rounded-xl border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
        >
          Voir les sessions
        </Link>

        <Link
          href={`/contact?motif=echange&offre=${encodeURIComponent(offer.title)}`}
          className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
        >
          Demander un echange
        </Link>
      </div>
    </div>
  );
}
