'use client';

import React, { useState } from 'react';

export interface PreliminariesData {
  civility: 'M.' | 'Mme' | 'Autre';
  age_range: '18-25' | '26-35' | '36-45' | '46-55' | '56-65' | '65+';
  professional_status: 'salarié' | 'indépendant' | 'non-salarié' | 'autre';
}

interface PreliminaryQuestionsProps {
  onComplete: (data: PreliminariesData) => void;
}

export default function PreliminaryQuestions({ onComplete }: PreliminaryQuestionsProps) {
  const [data, setData] = useState<PreliminariesData>({
    civility: 'M.',
    age_range: '26-35',
    professional_status: 'salarié',
  });

  const handleChange = <K extends keyof PreliminariesData>(
    field: K,
    value: PreliminariesData[K]
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(data);
  };

  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Avant de commencer
        </h1>
        <p className="text-lg text-gray-600">
          Quelques informations anonymes pour mieux comprendre les résultats
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-black/10 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm"
      >
        {/* Civilité */}
        <div className="mb-8 text-left">
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Civilité
          </label>
          <div className="flex gap-4">
            {(['M.', 'Mme', 'Autre'] as const).map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="civility"
                  value={option}
                  checked={data.civility === option}
                  onChange={(e) => handleChange('civility', e.target.value as any)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Âge */}
        <div className="mb-8 text-left">
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Tranche d'âge
          </label>
          <select
            value={data.age_range}
            onChange={(e) => handleChange('age_range', e.target.value as any)}
            className="w-full px-4 py-3 border border-black/10 rounded-lg text-gray-900 bg-white"
          >
            <option value="18-25">18-25 ans</option>
            <option value="26-35">26-35 ans</option>
            <option value="36-45">36-45 ans</option>
            <option value="46-55">46-55 ans</option>
            <option value="56-65">56-65 ans</option>
            <option value="65+">65 ans et plus</option>
          </select>
        </div>

        {/* Situation professionnelle */}
        <div className="mb-8 text-left">
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Situation professionnelle
          </label>
          <div className="space-y-3">
            {(['salarié', 'indépendant', 'non-salarié', 'autre'] as const).map(
              (option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="professional_status"
                    value={option}
                    checked={data.professional_status === option}
                    onChange={(e) =>
                      handleChange('professional_status', e.target.value as any)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 capitalize">
                    {option === 'non-salarié' ? 'Non-salarié' : option}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-10"
        >
          Continuer vers le baromètre
        </button>
      </form>
    </div>
  );
}
