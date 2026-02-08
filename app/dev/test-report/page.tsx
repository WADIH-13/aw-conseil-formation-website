"use client";

import React from 'react';
import Results from '@/components/barometre/Results';
import { DimensionScore } from '@/components/barometre/quizData';

const sampleDimensions: DimensionScore[] = [
  { dimension: 'cognitive', label: 'Cognitive', score: 4, normalized: 2.1, color: '#8b5cf6' },
  { dimension: 'emotional', label: 'Emotionnelle', score: 4, normalized: 1.8, color: '#ec4899' },
  { dimension: 'organizational', label: 'Organisationnelle', score: 3, normalized: 1.2, color: '#3b82f6' },
];

export default function TestReportPage() {
  const onRestart = () => {
    // no-op
  };

  const userAnswers: Record<number, number> = {
    1: 3,
    2: 2,
    3: 4,
  };

  return (
    <div className="p-8">
      <Results
        awScore={42}
        rawScore={123}
        dimensionScores={sampleDimensions}
        userAnswers={userAnswers}
        onRestart={onRestart}
      />
      {/* ensure radar has class for PDF export */}
      <div style={{ display: 'none' }} className="report-radar" aria-hidden />
    </div>
  );
}
