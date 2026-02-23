import { supabaseServer } from "@/lib/supabaseServer";
import { CatalogueHero } from "@/components/catalogue/CatalogueHero";
import { CatalogueSidebar } from "@/components/catalogue/CatalogueSidebar";
import { OfferListItem } from "@/components/catalogue/OfferListItem";

type SearchParams = {
  q?: string;
  family?: string;
  format?: string;
};

function normalizeFormats(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
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

  // Fetch families
  const { data: families, error: famErr } = await supabase
    .from("families")
    .select("id, name, is_active, order_index")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  if (famErr || !families) {
    return (
      <div className="min-h-screen bg-white">
        <CatalogueHero />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-red-600 font-medium">Erreur chargement des données.</p>
        </div>
      </div>
    );
  }

  const familyById = new Map<string, string>(
    families.map((f) => [f.id, f.name])
  );

  // Fetch offers
  const { data: offersRaw, error: offErr } = await supabase
    .from("offers")
    .select("id, family_id, title, slug, summary, objectives, audience, modalities, formats, is_active, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (offErr || !offersRaw) {
    return (
      <div className="min-h-screen bg-white">
        <CatalogueHero />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-red-600 font-medium">Erreur chargement des offres.</p>
        </div>
      </div>
    );
  }

  // Enrich offers
  const offersEnriched = offersRaw.map((o: any) => ({
    ...o,
    families: { name: familyById.get(o.family_id) ?? "—" },
    formats: normalizeFormats(o.formats),
  }));

  // Filter offers
  const offers = offersEnriched.filter((o: any) => {
    if (family !== "all" && o.families?.name !== family) return false;
    if (format !== "all" && !o.formats.includes(format)) return false;
    if (q) {
      const hay = `${o.title ?? ""} ${o.summary ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Curated sections
  const essentialsSlugs = new Set([
    "comprendre-charge-mentale-impacts-professionnels",
    "prevenir-reduire-charge-mentale-travail",
    "referent-charge-mentale-entreprise",
  ]);

  const essentials = offers.filter((o: any) => essentialsSlugs.has(o.slug));
  const ateliers = offers.filter((o: any) => o.formats.includes("atelier"));
  const accueil = offers.filter((o: any) => o.families?.name === "Accueil & relation client");

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogueHero />

      {/* Main layout: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row bg-white min-h-[calc(100vh-400px)]">
        {/* Sidebar */}
        <CatalogueSidebar
          families={families.map(({ id, name }) => ({ id, name }))}
          currentFamily={family}
          currentFormat={format}
          currentSearch={q}
          totalResults={offers.length}
        />

        {/* Content */}
        <main className="flex-1 p-6 lg:p-12">
          {/* Essentials Section */}
          {essentials.length > 0 && (
            <section className="mb-16 pb-12 border-b border-gray-200">
              <div className="mb-10">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">Les essentiels</h2>
                <p className="text-gray-600 text-sm leading-relaxed">Les formations fondamentales pour débuter votre parcours</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {essentials.map((o: any) => (
                  <div key={o.id} className="min-h-full">
                    <OfferListItem offer={o} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Ateliers Section */}
          {ateliers.length > 0 && (
            <section className="mb-16 pb-12 border-b border-gray-200">
              <div className="mb-10">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">Ateliers pratiques</h2>
                <p className="text-gray-600 text-sm leading-relaxed">Sessions courtes et opérationnelles pour acquérir rapidement des compétences</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ateliers.map((o: any) => (
                  <div key={o.id} className="min-h-full">
                    <OfferListItem offer={o} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Accueil Section */}
          {accueil.length > 0 && (
            <section className="mb-16 pb-12 border-b border-gray-200">
              <div className="mb-10">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">Accueil et relation client</h2>
                <p className="text-gray-600 text-sm leading-relaxed">Renforcer les compétences relationnelles et l'excellence du service</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {accueil.map((o: any) => (
                  <div key={o.id} className="min-h-full">
                    <OfferListItem offer={o} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All offers */}
          <section>
            <div className="mb-10">
              <h2 className="text-3xl font-semibold text-gray-900 mb-3">Tous les contenus</h2>
              <p className="text-gray-600 text-sm">
                {offers.length} formation{offers.length > 1 ? 's' : ''} disponible{offers.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="space-y-4">
              {offers.map((o: any) => (
                <OfferListItem key={o.id} offer={o} />
              ))}
            </div>
          </section>

          {/* No results */}
          {offers.length === 0 && !essentials.length && !ateliers.length && !accueil.length && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">Aucune formation ne correspond à vos critères.</p>
              <p className="text-gray-500 text-sm mb-6">Essayez de modifier vos filtres ou votre recherche.</p>
              <a
                href="/catalogue"
                className="inline-block px-6 py-2.5 bg-aw-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Voir toutes les formations
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
