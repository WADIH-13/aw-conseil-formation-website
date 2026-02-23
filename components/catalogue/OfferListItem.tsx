import Link from 'next/link';

interface Offer {
  id: string;
  title: string;
  slug: string;
  summary: string;
  formats: string[];
  families?: { name: string };
  audience?: string;
  objectives?: string[];
}

const formatLabels: Record<string, string> = {
  formation: 'Formation',
  atelier: 'Atelier',
  conseil: 'Conseil',
};

const formatColors: Record<string, string> = {
  formation: 'bg-blue-50 text-blue-700 border-blue-200',
  atelier: 'bg-orange-50 text-orange-700 border-orange-200',
  conseil: 'bg-purple-50 text-purple-700 border-purple-200',
};

export function OfferListItem({ offer }: { offer: Offer }) {
  return (
    <Link href={`/formations/${offer.slug}`}>
      <article className="group border border-gray-200 rounded-xl p-8 hover:border-aw-red hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Family */}
            {offer.families?.name && (
              <p className="text-xs uppercase tracking-widest font-semibold text-aw-red mb-2">
                {offer.families.name}
              </p>
            )}

            {/* Title */}
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-aw-red transition-colors mb-3 line-clamp-2">
              {offer.title}
            </h3>

            {/* Summary */}
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4 line-clamp-2">
              {offer.summary}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
              {offer.audience && (
                <div className="flex items-center gap-1.5">
                  <span>👥</span>
                  <span>{offer.audience}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Formats & CTA */}
          <div className="flex flex-col gap-4 lg:items-end">
            {/* Formats */}
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {offer.formats && offer.formats.length > 0 ? (
                offer.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border ${
                      formatColors[fmt] || 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    <span>{formatLabels[fmt] || fmt}</span>
                  </span>
                ))
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                  Format non défini
                </span>
              )}
            </div>

            {/* CTA Arrow */}
            <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-aw-red group-hover:text-white transition-all">
              <span className="text-lg">→</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
