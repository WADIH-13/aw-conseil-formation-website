'use client';

import { CartWithItems } from '@/lib/universe/types';
import { universeCopy } from '@/lib/universe/copy';

interface PrintableCartProps {
  cart: CartWithItems;
}

export function PrintableCart({ cart }: PrintableCartProps) {
  // Group by category
  const byCategory = {
    structurer: cart.cart_items.filter((item) => item.experience?.category === 'STRUCTURER'),
    liberer: cart.cart_items.filter((item) => item.experience?.category === 'LIBERER'),
    renforcer: cart.cart_items.filter((item) => item.experience?.category === 'RENFORCER'),
  };

  const categoryNames: Record<string, string> = {
    structurer: universeCopy.categories.structurer,
    liberer: universeCopy.categories.liberer,
    renforcer: universeCopy.categories.renforcer,
  };

  const calculateDuration = (minutes: number | null | undefined) => {
    if (!minutes) return '—';
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const totalDuration = cart.cart_items.reduce((acc, item) => acc + (item.experience?.duration_minutes || 0), 0);

  return (
    <div className="print-container space-y-8 p-6 bg-white text-gray-800">
      {/* Header */}
      <div className="border-b border-gray-300 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">{universeCopy.page.title}</h1>
        <p className="text-gray-600 mt-2">{universeCopy.panier.printSubtitle}</p>
        <p className="text-xs text-gray-500 mt-1">
          Généré le {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-gray-200">
        <div>
          <p className="text-2xl font-bold text-gray-900">{cart.cart_items.length}</p>
          <p className="text-xs text-gray-600">{universeCopy.panier.itemsCount}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{calculateDuration(totalDuration)}</p>
          <p className="text-xs text-gray-600">{universeCopy.panier.totalDuration}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{Object.keys(byCategory).filter((k) => byCategory[k as keyof typeof byCategory].length > 0).length}</p>
          <p className="text-xs text-gray-600">{universeCopy.panier.categories}</p>
        </div>
      </div>

      {/* By Category */}
      {Object.entries(byCategory).map(([catKey, items]) => {
        if (items.length === 0) return null;
        const catDuration = items.reduce((acc, item) => acc + (item.experience?.duration_minutes || 0), 0);

        return (
          <div key={catKey} className="page-break-inside-avoid">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-1">{categoryNames[catKey]}</h2>
              <p className="text-xs text-gray-500">
                {items.length} expérience{items.length > 1 ? 's' : ''} • {calculateDuration(catDuration)}
              </p>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="border-l-2 border-gray-300 pl-3 py-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {idx + 1}. {item.experience?.title}
                      </p>
                      <div className="flex gap-2 mt-1 text-xs text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {item.experience?.kind}
                        </span>
                        <span>{calculateDuration(item.experience?.duration_minutes)}</span>
                      </div>
                      {item.experience?.short_description && (
                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                          {item.experience.short_description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div className="border-t border-gray-300 pt-6 text-center text-xs text-gray-600">
        <p>Ce document a été généré depuis la plateforme Univers Performance & Libération</p>
        <p className="mt-1">www.aw-conseil-formation.fr</p>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print-container {
            margin: 0;
            padding: 1.5rem;
            background: white;
            page-break-after: avoid;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          h1, h2 {
            page-break-after: avoid;
          }
          h1 {
            font-size: 1.5rem;
          }
          h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
