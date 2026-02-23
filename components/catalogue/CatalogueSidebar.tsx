'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Family {
  id: string;
  name: string;
}

interface CatalogueSidebarProps {
  families: Family[];
  currentFamily?: string;
  currentFormat?: string;
  currentSearch?: string;
  totalResults: number;
}

const formats = [
  { value: 'formation', label: '📖 Formation', color: 'bg-blue-100 text-blue-700' },
  { value: 'atelier', label: '⚡ Atelier', color: 'bg-orange-100 text-orange-700' },
  { value: 'conseil', label: '🎯 Conseil', color: 'bg-purple-100 text-purple-700' },
];

export function CatalogueSidebar({
  families,
  currentFamily = 'all',
  currentFormat = 'all',
  currentSearch = '',
  totalResults,
}: CatalogueSidebarProps) {
  const [expanded, setExpanded] = useState(true);

  const buildUrl = (newFamily: string, newFormat: string) => {
    const params = new URLSearchParams();
    if (currentSearch) params.set('q', currentSearch);
    if (newFamily !== 'all') params.set('family', newFamily);
    if (newFormat !== 'all') params.set('format', newFormat);
    const queryString = params.toString();
    return queryString ? `/catalogue?${queryString}` : '/catalogue';
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (currentSearch) params.set('q', currentSearch);
    const queryString = params.toString();
    window.location.href = queryString ? `/catalogue?${queryString}` : '/catalogue';
  };

  return (
    <aside className="w-full lg:w-72 sticky top-0 lg:h-screen overflow-y-auto bg-gradient-to-b from-gray-50 to-white border-b lg:border-b-0 lg:border-r border-gray-200">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
            <button
              onClick={() => setExpanded(!expanded)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              {expanded ? '✕' : '☰'}
            </button>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-aw-red">{totalResults}</span> résultat{totalResults > 1 ? 's' : ''}
          </p>
        </div>

        {expanded && (
          <>
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Recherche
              </label>
              <form action="/catalogue" method="get" className="relative">
                <input
                  type="text"
                  name="q"
                  defaultValue={currentSearch}
                  placeholder="Chercher une formation..."
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-aw-red focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-aw-red transition-colors"
                >
                  →
                </button>
              </form>
            </div>

            {/* Famille */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Domaine
              </h3>
              <div className="space-y-2.5">
                <Link
                  href={buildUrl('all', currentFormat)}
                  className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                    currentFamily === 'all'
                      ? 'bg-aw-red text-white font-medium shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Toutes les familles
                </Link>
                {families.map((fam) => (
                  <Link
                    key={fam.id}
                    href={buildUrl(fam.name, currentFormat)}
                    className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                      currentFamily === fam.name
                        ? 'bg-aw-red text-white font-medium shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {fam.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Format */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Format
              </h3>
              <div className="space-y-2.5">
                <Link
                  href={buildUrl(currentFamily, 'all')}
                  className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                    currentFormat === 'all'
                      ? 'bg-aw-red text-white font-medium shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Tous les formats
                </Link>
                {formats.map((fmt) => (
                  <Link
                    key={fmt.value}
                    href={buildUrl(currentFamily, fmt.value)}
                    className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                      currentFormat === fmt.value
                        ? 'bg-aw-red text-white font-medium shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {fmt.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(currentFamily !== 'all' || currentFormat !== 'all') && (
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2.5 text-sm font-medium text-aw-red border-2 border-aw-red rounded-lg hover:bg-red-50 transition-colors"
                >
                  ↺ Réinitialiser les filtres
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
