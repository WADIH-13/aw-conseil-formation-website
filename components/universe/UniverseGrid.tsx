'use client';

import { useState, useEffect } from 'react';
import { UniverseData, CartItem } from '@/lib/universe/types';
import { universeCopy } from '@/lib/universe/copy';
import { ExperienceCard } from './ExperienceCard';
import { CartPanel } from './CartPanel';
import { useCartStore } from '@/lib/universe/cartStore';

interface UniverseGridProps {
  data: UniverseData;
}

export function UniverseGrid({ data }: UniverseGridProps) {
  const [activeTab, setActiveTab] = useState<'STRUCTURER' | 'LIBERER' | 'RENFORCER'>('STRUCTURER');
  const [selectedKind, setSelectedKind] = useState<string | null>(null);
  const { items, addItem, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isItemInCart = (experienceId: string) => items.some((i: any) => i.experience_id === experienceId);

  const handleAddToCart = (experienceId: string) => {
    if (isItemInCart(experienceId)) {
      removeItem(experienceId);
    } else {
      addItem(experienceId);
    }
  };

  const activeExperiences = data[activeTab].filter(
    (exp) => !selectedKind || exp.kind === selectedKind
  );

  const tabs = [
    { id: 'STRUCTURER', label: universeCopy.universes.STRUCTURER.title },
    { id: 'LIBERER', label: universeCopy.universes.LIBERER.title },
    { id: 'RENFORCER', label: universeCopy.universes.RENFORCER.title },
  ] as const;

  const kinds = Array.from(new Set(data[activeTab].map((exp) => exp.kind)));

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <div className="flex justify-center mb-12 gap-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-aw-red'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-aw-red" />
              )}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="text-center mb-10">
          <p className="text-lg text-gray-700">
            {universeCopy.universes[activeTab].description}
          </p>
        </div>

        {/* Filter par kind */}
        {kinds.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedKind(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedKind === null
                  ? 'bg-aw-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            {kinds.map((kind) => (
              <button
                key={kind}
                onClick={() => setSelectedKind(kind)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedKind === kind
                    ? 'bg-aw-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {universeCopy.kinds[kind as keyof typeof universeCopy.kinds]}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {activeExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeExperiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isInCart={isItemInCart(exp.id)}
                onAdd={() => handleAddToCart(exp.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">{universeCopy.buttons.empty}</p>
          </div>
        )}
      </div>

      {/* Cart Panel (Desktop) + Drawer (Mobile) */}
      <CartPanel />
    </div>
  );
}
