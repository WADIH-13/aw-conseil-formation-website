'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/universe/cartStore';
import { universeCopy } from '@/lib/universe/copy';
import Link from 'next/link';

export function CartPanel() {
  const { items, cartId, guestToken } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* DESKTOP: Sticky Panel */}
      <div className="hidden md:fixed md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:z-40 md:w-80 md:max-w-sm">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 space-y-4">
          <h3 className="font-bold text-lg text-gray-900">{universeCopy.cart.title}</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              Expériences sélectionnées: <span className="font-bold text-gray-900">{items.length}</span>
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <Link
              href="/univers-performance-liberation/panier"
              className="block w-full px-4 py-3 bg-aw-red text-white rounded-lg font-medium text-center hover:bg-red-700 transition-colors"
            >
              {universeCopy.buttons.finalize}
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE: Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <Link
          href="/univers-performance-liberation/panier"
          className="block px-4 py-4 bg-aw-red text-white rounded-none font-medium text-center hover:bg-red-700 transition-colors"
        >
          Mon parcours ({items.length}) → {universeCopy.buttons.finalize}
        </Link>
      </div>
    </>
  );
}
