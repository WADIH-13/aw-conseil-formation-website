'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/universe/cartStore';
import { universeCopy } from '@/lib/universe/copy';
import Link from 'next/link';
import { CartWithItems } from '@/lib/universe/types';
import { ProposalForm } from '@/components/universe/ProposalForm';
import { PrintableCart } from '@/components/universe/PrintableCart';

export default function CartPage() {
  const { guestToken, items } = useCartStore();
  const [cartData, setCartData] = useState<CartWithItems | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!guestToken) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`/api/universe/cart?guest_token=${guestToken}`);
        if (res.ok) {
          const data = await res.json();
          setCartData(data);
        }
      } catch (err) {
        console.error('Erreur fetch cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [guestToken]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!guestToken || !cartData) return;
    window.location.href = `/api/universe/pdf?guest_token=${guestToken}&cart_id=${cartData.id}`;
  };

  const calculateDuration = (minutes: number | null | undefined) => {
    if (!minutes) return '—';
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-aw-red" />
          <p className="mt-4 text-gray-600">Chargement de votre trajectoire...</p>
        </div>
      </div>
    );
  }

  if (!cartData || items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{universeCopy.panier.empty}</h1>
          <p className="text-gray-600 mb-8">{universeCopy.cart.empty}</p>
          <Link href="/univers-performance-liberation" className="text-aw-red hover:underline font-medium">
            ← Retour aux expériences
          </Link>
        </div>
      </div>
    );
  }

  const totalDuration = cartData.cart_items.reduce(
    (acc, item) => acc + (item.experience?.duration_minutes || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden printable version */}
      <div className="hidden print:block">
        <PrintableCart cart={cartData} />
      </div>

      {/* Screen version */}
      <div className="print:hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/univers-performance-liberation" className="text-aw-red hover:underline text-sm font-medium mb-4 inline-block">
              ← Retour à l'univers
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{universeCopy.panier.title}</h1>
            <p className="text-gray-600 mt-2 text-sm">{universeCopy.panier.subtitle}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Cart summary */}
            <div className="md:col-span-2">
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{cartData.cart_items.length}</p>
                  <p className="text-xs text-gray-600 mt-1">{universeCopy.panier.itemsCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{calculateDuration(totalDuration)}</p>
                  <p className="text-xs text-gray-600 mt-1">{universeCopy.panier.totalDuration}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-gray-600 mt-1">{universeCopy.panier.categories}</p>
                </div>
              </div>

              {/* Items list */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">{universeCopy.cart.title}</h2>

                <div className="space-y-4">
                  {cartData.cart_items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.experience?.title}</h3>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {item.experience?.kind}
                          </span>
                          <span className="text-xs text-gray-600">
                            {calculateDuration(item.experience?.duration_minutes)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3 mt-8">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-4 py-3 bg-aw-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  {universeCopy.panier.download}
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {universeCopy.panier.print}
                </button>
                <Link
                  href="/univers-performance-liberation/panier/visuel"
                  className="block w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center"
                >
                  {universeCopy.buttons.viewPathway}
                </Link>
              </div>
            </div>

            {/* Right: Proposal form */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{universeCopy.proposal.title}</h3>
                <p className="text-xs text-gray-600 mb-6">{universeCopy.rgpd.description}</p>
                <ProposalForm cartId={cartData.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
