// app/catalogue/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import { Filters } from "@/components/catalogue/Filters";
import { OfferCard } from "@/components/catalogue/OfferCard";

type SearchParams = {
  q?: string;
  family?: string;
  format?: string; // formation | atelier | conseil | all
};

function normalizeFormats(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    // au cas où ça arrive sous forme "{atelier}" ou "atelier"
    const s = value.replace(/[{}"]/g, "").trim();
    if (!s) return [];
    return s.split(",").map((x) => x.trim()).filter(Boolean);
  }
  return [];
}

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = supabaseServer();

  const q = (searchParams.q ?? "").trim().toLowerCase();
  const family = (searchParams.family ?? "all").trim();
  const format = (searchParams.format ?? "all").trim();

  // 1) Families (safe)
  const { data: families, error: famErr } = await supabase
    .from("families")
    .select("id, name, is_active, order_index")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  if (famErr || !families) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Catalogue</h1>
        <p className="mt-4 text-neutral-600">Erreur chargement familles.</p>
      </div>
    );
  }

  const familyById = new Map<string, string>(
    families.map((f) => [f.id, f.name])
  );

  // 2) Offers (NO JOIN, ultra robuste)
  const { data: offersRaw, error: offErr } = await supabase
    .from("offers")
    .select("id, family_id, title, slug, summary, objectives, audience, modalities, formats, is_active, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

if (offErr || !offersRaw) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Catalogue</h1>
      <p className="mt-4 text-neutral-600">
        Erreur chargement offres: {offErr?.message ?? "offersRaw is null"} / code: {offErr?.code ?? "n/a"}
      </p>
    </div>
  );
}

  // enrichissement (family name + formats normalisés)
  const offersEnriched = offersRaw.map((o: any) => ({
    ...o,
    families: { name: familyById.get(o.family_id) ?? "—" },
    formats: normalizeFormats(o.formats),
  }));

  // DEBUG visuel (temporaire) : tu verras si le fetch retourne bien des offres
  const rawCount = offersEnriched.length;

  // Filtre final
  const offers = offersEnriched.filter((o: any) => {
    // famille
    if (family !== "all" && o.families?.name !== family) return false;

    // format (seulement si choisi)
    if (format !== "all") {
      if (!o.formats.includes(format)) return false;
    }

    // recherche
    if (q) {
      const hay = `${o.title ?? ""} ${o.summary ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    return true;
  });

  // petites sélections premium (optionnel)
  const essentialsSlugs = new Set([
    "comprendre-charge-mentale-impacts-professionnels",
    "prevenir-reduire-charge-mentale-travail",
    "referent-charge-mentale-entreprise",
  ]);

  const essentials = offers.filter((o: any) => essentialsSlugs.has(o.slug));
  const ateliers = offers.filter((o: any) => o.formats.includes("atelier"));
  const accueil = offers.filter(
    (o: any) => o.families?.name === "Accueil & relation client"
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
          Catalogue
        </h1>
        <p className="mt-3 text-neutral-600 leading-relaxed">
          Des formations structurées et des ateliers opérationnels pour réduire la charge mentale,
          sécuriser la performance humaine et renforcer les pratiques terrain.
        </p>

        {/* DEBUG TEMPORAIRE */}
        <div className="mt-3 text-xs text-neutral-500">
          Debug: offres brutes = {rawCount} / offres affichées = {offers.length}
        </div>
      </div>

      <div className="mt-8">
        <Filters families={families.map(({ id, name }) => ({ id, name }))} />
      </div>

      {essentials.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-neutral-900">Les essentiels</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {essentials.map((o: any) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        </section>
      )}

      {ateliers.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-neutral-900">Ateliers</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {ateliers.map((o: any) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        </section>
      )}

      {accueil.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Accueil & relation client
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {accueil.map((o: any) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl font-semibold text-neutral-900">Toutes les offres</h2>
          <div className="text-sm text-neutral-500">{offers.length} offre(s)</div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {offers.map((o: any) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </section>
    </div>
  );
}
