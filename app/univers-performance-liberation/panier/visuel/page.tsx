'use client';

import { useEffect, useState } from 'react';
import { CartWithItems } from '@/lib/universe/types';
import { universeCopy } from '@/lib/universe/copy';
import { useCartStore } from '@/lib/universe/cartStore';
import Link from 'next/link';

export default function VisualPathwayPage() {
  const { cartId, guestToken } = useCartStore();
  const [cart, setCart] = useState<CartWithItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (!guestToken && !cartId) {
        setError('Trajectoire vide');
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/universe/cart?guest_token=${guestToken || ''}`);
        if (res.ok) {
          const data = await res.json();
          setCart(data);
        } else {
          setError('Erreur lors du chargement de la trajectoire');
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement de la trajectoire');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [guestToken, cartId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-aw-red" />
          <p className="mt-4 text-gray-600">Chargement de votre trajectoire...</p>
        </div>
      </div>
    );
  }

  if (error || !cart || cart.cart_items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700">{error || 'Votre trajectoire de performance est vide'}</p>
          <Link href="/univers-performance-liberation" className="inline-block px-6 py-2 bg-aw-red text-white rounded-lg hover:bg-red-700 transition-colors">
            Retourner à l'univers
          </Link>
        </div>
      </div>
    );
  }

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

  const categoryColors: Record<string, string> = {
    structurer: 'border-b-4 border-blue-500',
    liberer: 'border-b-4 border-green-500',
    renforcer: 'border-b-4 border-purple-500',
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/univers-performance-liberation/panier" className="text-aw-red hover:underline text-sm font-medium mb-4 inline-block">
            ← Retour à ma trajectoire
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{universeCopy.panier.visualTitle}</h1>
          <p className="text-gray-600 mt-2">{universeCopy.panier.visualSubtitle}</p>
          <div className="flex items-center gap-8 mt-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-2xl font-bold text-gray-900">{cart.cart_items.length}</p>
              <p className="text-xs text-gray-600 mt-1">Expériences</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{calculateDuration(totalDuration)}</p>
              <p className="text-xs text-gray-600 mt-1">Durée totale</p>
            </div>
            <button onClick={() => window.print()} className="ml-auto px-4 py-2 bg-aw-red text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
              Imprimer
            </button>
          </div>
        </div>
      </div>

      {/* Visual Columns */}
      <div className="py-12 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Structurer Column */}
            <div className={`${categoryColors.structurer} ${byCategory.structurer.length > 0 ? 'opacity-100' : 'opacity-40'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{categoryNames.structurer}</h2>
                <p className="text-xs text-gray-600 mb-6">
                  {byCategory.structurer.length} {byCategory.structurer.length > 1 ? 'expériences' : 'expérience'}
                </p>
                <div className="space-y-4">
                  {byCategory.structurer.length > 0 ? (
                    byCategory.structurer.map((item, idx) => (
                      <div key={item.id} className="border-l-2 border-gray-200 pl-3 py-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {idx + 1}. {item.experience?.title}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {item.experience?.kind}
                          </span>
                          <span className="text-xs text-gray-600">
                            {calculateDuration(item.experience?.duration_minutes)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">Aucune expérience</p>
                  )}
                </div>
              </div>
            </div>

            {/* Liberer Column */}
            <div className={`${categoryColors.liberer} ${byCategory.liberer.length > 0 ? 'opacity-100' : 'opacity-40'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{categoryNames.liberer}</h2>
                <p className="text-xs text-gray-600 mb-6">
                  {byCategory.liberer.length} {byCategory.liberer.length > 1 ? 'expériences' : 'expérience'}
                </p>
                <div className="space-y-4">
                  {byCategory.liberer.length > 0 ? (
                    byCategory.liberer.map((item, idx) => (
                      <div key={item.id} className="border-l-2 border-gray-200 pl-3 py-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {idx + 1}. {item.experience?.title}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                            {item.experience?.kind}
                          </span>
                          <span className="text-xs text-gray-600">
                            {calculateDuration(item.experience?.duration_minutes)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">Aucune expérience</p>
                  )}
                </div>
              </div>
            </div>

            {/* Renforcer Column */}
            <div className={`${categoryColors.renforcer} ${byCategory.renforcer.length > 0 ? 'opacity-100' : 'opacity-40'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{categoryNames.renforcer}</h2>
                <p className="text-xs text-gray-600 mb-6">
                  {byCategory.renforcer.length} {byCategory.renforcer.length > 1 ? 'expériences' : 'expérience'}
                </p>
                <div className="space-y-4">
                  {byCategory.renforcer.length > 0 ? (
                    byCategory.renforcer.map((item, idx) => (
                      <div key={item.id} className="border-l-2 border-gray-200 pl-3 py-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {idx + 1}. {item.experience?.title}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                            {item.experience?.kind}
                          </span>
                          <span className="text-xs text-gray-600">
                            {calculateDuration(item.experience?.duration_minutes)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">Aucune expérience</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-12">
            <button onClick={() => window.print()} className="px-6 py-2 bg-aw-red text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              Imprimer ce parcours
            </button>
            <a href="/api/universe/pdf" className="px-6 py-2 border-2 border-aw-red text-aw-red rounded-lg hover:bg-red-50 transition-colors font-medium">
              Télécharger en PDF
            </a>
            <Link href="/univers-performance-liberation/panier" className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Retour
            </Link>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
