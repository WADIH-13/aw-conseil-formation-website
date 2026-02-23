'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

interface FormatorCard {
  id: string;
  name: string;
  title: string;
  signature: string;
  slug: string;
}

interface HorizontalScrollProps {
  formators: FormatorCard[];
}

export function HorizontalScroll({ formators }: HorizontalScrollProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainer.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainer.current.scrollLeft;
      const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      scrollContainer.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="mx-auto px-6">
        <div className="space-y-16">
          {/* Scroll container */}
          <div
            ref={scrollContainer}
            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {formators.map((formator) => (
              <Link key={formator.id} href={`/avancent-avec-aw/${formator.slug}`}>
                <div className="flex-shrink-0 w-96 snap-start">
                  <article className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-10 hover:border-aw-red hover:shadow-xl transition-all duration-300 cursor-pointer">
                    {/* Name & Title */}
                    <div className="mb-8 space-y-3">
                      <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-aw-red transition-colors">
                        {formator.name}
                      </h3>
                      <p className="text-aw-red font-medium text-base">
                        {formator.title}
                      </p>
                    </div>

                    {/* Signature */}
                    <p className="text-gray-700 leading-relaxed flex-grow mb-6 text-base">
                      {formator.signature}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-aw-red font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Découvrir son approche</span>
                      <span className="text-lg">→</span>
                    </div>
                  </article>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:border-aw-red hover:text-aw-red disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {formators.map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full bg-gray-300 transition-all"
                />
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:border-aw-red hover:text-aw-red disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
