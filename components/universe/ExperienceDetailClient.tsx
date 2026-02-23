'use client';

import { Experience } from '@/lib/universe/types';
import { universeCopy } from '@/lib/universe/copy';
import { useCartStore } from '@/lib/universe/cartStore';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ExperienceDetailClientProps {
  experience: Experience;
}

export function ExperienceDetailClient({ experience }: ExperienceDetailClientProps) {
  const { items, addItem, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isInCart = items.some((i: any) => i.experience_id === experience.id);
  const kindLabel = universeCopy.kinds[experience.kind as keyof typeof universeCopy.kinds];
  const durationHours = Math.floor(experience.duration_minutes / 60);
  const durationMins = experience.duration_minutes % 60;

  const handleToggleCart = () => {
    if (isInCart) {
      removeItem(experience.id);
    } else {
      addItem(experience.id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      {experience.hero_image_url && (
        <div className="relative h-80 md:h-96 bg-gradient-to-b from-gray-100 to-gray-50">
          <img
            src={experience.hero_image_url}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Back link */}
        <Link href="/univers-performance-liberation" className="text-aw-red hover:underline mb-6 inline-block">
          ← Retour aux expériences
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
              {kindLabel}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
              {durationHours > 0 ? `${durationHours}h${durationMins > 0 ? durationMins + 'min' : ''}` : `${durationMins}min`}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {experience.title}
          </h1>

          <p className="text-xl text-gray-700">{experience.short_description}</p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Content */}
          <div className="md:col-span-2 space-y-8">
            {experience.long_description && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{experience.long_description}</p>
              </section>
            )}

            {experience.outline && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Programme</h2>
                <p className="text-gray-700 whitespace-pre-line">{experience.outline}</p>
              </section>
            )}

            {experience.benefits && experience.benefits.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Apports</h2>
                <ul className="space-y-2">
                  {experience.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-aw-red font-bold">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {experience.audience && experience.audience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Public</h2>
                <ul className="space-y-1">
                  {experience.audience.map((aud, idx) => (
                    <li key={idx} className="text-gray-700">
                      • {aud}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {experience.deliverables && experience.deliverables.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Livrables</h2>
                <ul className="space-y-1">
                  {experience.deliverables.map((del, idx) => (
                    <li key={idx} className="text-gray-700">
                      • {del}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {experience.format_details && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Modalités</h2>
                <p className="text-gray-700 whitespace-pre-line">{experience.format_details}</p>
              </section>
            )}
          </div>

          {/* Right: Sidebar CTA */}
          <div className="md:col-span-1">
            <div className="sticky top-6 bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Durée
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {durationHours > 0 ? `${durationHours}h${durationMins > 0 ? durationMins + 'min' : ''}` : `${durationMins}min`}
                </p>
              </div>

              <button
                onClick={handleToggleCart}
                className={`w-full px-6 py-3 font-medium rounded-lg transition-all ${
                  isInCart
                    ? 'bg-aw-red/10 text-aw-red border-2 border-aw-red hover:bg-aw-red/20'
                    : 'bg-aw-red text-white hover:bg-red-700'
                }`}
              >
                {isInCart ? universeCopy.buttons.removeCourse : universeCopy.buttons.addToCourse}
              </button>

              <Link
                href="/univers-performance-liberation/panier"
                className="block w-full px-6 py-3 text-center bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                {universeCopy.buttons.finalize}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
