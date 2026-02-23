'use client';

import { universeCopy } from '@/lib/universe/copy';

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {universeCopy.page.title}
        </h1>

        <p className="text-lg text-gray-700 mb-8 whitespace-pre-line">
          {universeCopy.page.intro}
        </p>

        <div className="flex justify-center">
          <div className="inline-block px-1 py-0.5 bg-aw-red/10 rounded-full">
            <span className="inline-block px-4 py-2 text-sm font-medium text-aw-red">
              ✓ Composez votre expérience personnalisée
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
