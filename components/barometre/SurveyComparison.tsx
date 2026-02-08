'use client';

import React, { useEffect, useState } from 'react';

interface SurveyStats {
  totalResponses: number;
  stats: Record<string, Record<number, number>>;
}

interface ComparisonStats {
  totalResponses: number;
  matchingPercentage: number;
}

interface SurveyComparisonProps {
  userAnswers: Record<number, number>;
}

export default function SurveyComparison({ userAnswers }: SurveyComparisonProps) {
  const [stats, setStats] = useState<SurveyStats | null>(null);
  const [comparison, setComparison] = useState<ComparisonStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/survey/stats');
        const data = await response.json();
        setStats(data);

        // Calculer le pourcentage de répondants qui ont répondu comme l'utilisateur
        if (data.stats && data.totalResponses > 0) {
          let matchingCount = 0;

          Object.entries(userAnswers).forEach(([questionId, userAnswer]) => {
            const questionStats = data.stats[questionId];
            if (questionStats && questionStats[userAnswer]) {
              // On compte les répondants avec la même réponse pour cette question
              matchingCount += questionStats[userAnswer];
            }
          });

          // Moyenne du matching sur toutes les questions
          const matchingPercentage = Math.round(
            (matchingCount / Object.keys(userAnswers).length) / data.totalResponses * 100
          );

          setComparison({
            totalResponses: data.totalResponses,
            matchingPercentage,
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userAnswers]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Chargement des statistiques...</p>
      </div>
    );
  }

  if (!comparison || comparison.totalResponses === 0) {
    return (
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Soyez le premier !
          </h3>
          <p className="text-gray-700">
            Vous êtes parmi les premiers à passer ce test. Les statistiques s'afficheront dès qu'il y aura plus de répondants.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Vous n'êtes pas seul(e) !
        </h3>
        <p className="text-3xl font-bold text-blue-600 mb-2">
          {comparison.matchingPercentage}%
        </p>
        <p className="text-gray-700 mb-1">
          des {comparison.totalResponses} répondants ont répondu comme vous
        </p>
        <p className="text-sm text-gray-600">
          ({Math.round((comparison.matchingPercentage / 100) * comparison.totalResponses)} personnes)
        </p>
      </div>
    </div>
  );
}
