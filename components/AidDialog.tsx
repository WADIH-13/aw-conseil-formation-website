'use client';

import { useState } from 'react';

interface AidDialogProps {
  isOpen: boolean;
  onClose: () => void;
  section: 'bio' | 'intentions' | 'closing';
  assistantUrl?: string;
  assistantLabel?: string;
}

const aidContent = {
  bio: {
    title: 'Rédiger votre biographie',
    tips: [
      'Présentez votre parcours professionnel en 3-4 phrases',
      'Mettez l\'accent sur vos expériences clés et apprentissages',
      'Montrez comment votre expertise s\'aligne avec AW Conseil',
      'Restez authentique et personnel',
      'Exemple : "Après 15 ans en management opérationnel..."'
    ]
  },
  intentions: {
    title: 'Clarifier vos intentions',
    tips: [
      'Ce que vous construisez : vos projets, votre vision long terme',
      'Ce que vous protégez : les valeurs non-négociables pour vous',
      'Ce que vous développez : les compétences, capacités que vous cultivez',
      'Soyez concis : 1 phrase par intention',
      'Exemple : Je construis → Des environnements sains | Je protège → La dignité humaine | Je développe → La clarté organisationnelle'
    ]
  },
  closing: {
    title: 'La phrase de clôture',
    tips: [
      'Résumez votre lien personnel avec AW Conseil',
      'Comment votre trajectoire contribue au mouvement ?',
      'C\'est votre "pourquoi" : pourquoi vous avancez avec AW ?',
      'Maximum 300 caractères, direct et impactant',
      'Exemple : "Parce que stabilité et humanité ne sont pas incompatibles."'
    ]
  }
};

export function AidDialog({
  isOpen,
  onClose,
  section,
  assistantUrl,
  assistantLabel = 'Ouvrir l’assistant de rédaction',
}: AidDialogProps) {
  if (!isOpen) return null;

  const content = aidContent[section];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-light text-gray-900">{content.title}</h2>
              <p className="text-sm text-gray-600 mt-2">Conseils pour bien rédiger cette section</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0 pt-1"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tips */}
          <div className="space-y-4">
            {content.tips.map((tip, index) => (
              <div key={index} className="flex gap-4">
                <div className="text-aw-red font-semibold text-lg flex-shrink-0 w-6 h-6 flex items-center justify-center bg-aw-red/10 rounded-full">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">{tip}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6">
            {assistantUrl ? (
              <a
                href={assistantUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full mb-3 inline-flex items-center justify-center px-6 py-3 border-2 border-aw-red text-aw-red font-light hover:bg-aw-red hover:text-white transition-colors"
              >
                {assistantLabel}
              </a>
            ) : null}
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-aw-red text-white font-light hover:bg-red-700 transition-colors"
            >
              Fermer et continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
