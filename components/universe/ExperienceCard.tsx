'use client';

import { Experience } from '@/lib/universe/types';
import { universeCopy } from '@/lib/universe/copy';
import Link from 'next/link';

interface ExperienceCardProps {
  experience: Experience;
  onAdd?: () => void;
  isInCart?: boolean;
}

export function ExperienceCard({ experience, onAdd, isInCart = false }: ExperienceCardProps) {
  const kindLabel = universeCopy.kinds[experience.kind as keyof typeof universeCopy.kinds];
  const durationHours = Math.floor(experience.duration_minutes / 60);
  const durationMins = experience.duration_minutes % 60;

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300">
      {/* Top: Titre et tags */}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
          {experience.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {experience.short_description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {kindLabel}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {durationHours > 0 ? `${durationHours}h${durationMins > 0 ? durationMins + 'min' : ''}` : `${durationMins}min`}
          </span>
        </div>
      </div>

      {/* Bottom: CTA */}
      <div className="pt-4 border-t border-gray-100 flex gap-2">
        <Link
          href={`/univers-performance-liberation/${experience.slug}`}
          className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center"
        >
          {universeCopy.buttons.details}
        </Link>

        <button
          onClick={onAdd}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
            isInCart
              ? 'bg-aw-red/10 text-aw-red border border-aw-red/20 hover:bg-aw-red/20'
              : 'bg-aw-red text-white hover:bg-red-700'
          }`}
        >
          {isInCart ? universeCopy.buttons.removeCourse : universeCopy.buttons.addToCourse}
        </button>
      </div>
    </div>
  );
}
