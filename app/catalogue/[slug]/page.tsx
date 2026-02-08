import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function OfferDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = supabaseServer();

  const { data: offer, error } = await supabase
    .from("offers")
    .select(
      "id, title, slug, summary, objectives, audience, modalities, formats, families(name)"
    )
    .eq("slug", params.slug)
    .eq("is_active", true)
    .single();

  if (error || !offer) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Offre introuvable</h1>
        <p className="mt-3 text-neutral-600">
          Cette offre n’est pas disponible ou a été désactivée.
        </p>
        <div className="mt-6">
          <Link className="text-neutral-900 underline" href="/catalogue">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const format = (offer.formats?.[0] ?? "offre").toString();
  const familyName = offer.families?.[0]?.name ?? "—";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-xs uppercase tracking-wide text-neutral-500">
        {format} • {familyName}
      </div>
     const familyName = offer.families?.[0]?.name ?? "—";
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">
        {offer.title}
      </h1>

      {offer.summary && (
        <p className="mt-4 text-neutral-700 leading-relaxed">{offer.summary}</p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/contact?motif=programme&offre=${encodeURIComponent(
            offer.title
          )}`}
          className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-white text-sm font-medium hover:opacity-90"
        >
          Recevoir le programme
        </Link>

        <Link
          href={`/contact?motif=echange&offre=${encodeURIComponent(offer.title)}`}
          className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
        >
          Demander un échange
        </Link>

        <Link
          href="/catalogue"
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          Retour au catalogue
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6">
        {offer.objectives && (
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">
              Ce que permet cette intervention
            </h2>
            <pre className="mt-3 whitespace-pre-wrap text-neutral-700 leading-relaxed font-sans">
              {offer.objectives}
            </pre>
          </section>
        )}

        {offer.audience && (
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">
              À qui s’adresse cette intervention
            </h2>
            <pre className="mt-3 whitespace-pre-wrap text-neutral-700 leading-relaxed font-sans">
              {offer.audience}
            </pre>
          </section>
        )}

        {offer.modalities && (
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">
              Modalités et cadre d’intervention
            </h2>
            <pre className="mt-3 whitespace-pre-wrap text-neutral-700 leading-relaxed font-sans">
              {offer.modalities}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}
