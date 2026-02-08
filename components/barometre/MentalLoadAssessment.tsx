"use client";

import React, { useState } from "react";
import Quiz from "./Quiz";
import Results from "./Results";
import PreliminaryQuestions, { PreliminariesData } from "./PreliminaryQuestions";
import { DimensionScore } from "./quizData";

type Step = "preliminaries" | "intro" | "quiz" | "results";

interface AssessmentResults {
  dimensionScores: DimensionScore[];
  rawScore: number;
  awScore: number;
  answers: Record<number, number>;
}

interface FullAssessmentData extends AssessmentResults {
  preliminaries: PreliminariesData;
}

export default function MentalLoadAssessment() {
  const [step, setStep] = useState<Step>("preliminaries");
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [preliminaries, setPreliminary] = useState<PreliminariesData | null>(null);

  const handlePreliminaresComplete = (data: PreliminariesData) => {
    setPreliminary(data);
    setStep("intro");
  };

  const handleStartQuiz = () => {
    setStep("quiz");
  };

  const handleQuizComplete = async (quizResults: AssessmentResults) => {
    setResults(quizResults);
    setStep("results"); // ⭐ Afficher les résultats IMMÉDIATEMENT

    // Sauvegarder dans Supabase en arrière-plan
    if (preliminaries) {
      try {
        const payload = {
          civility: preliminaries.civility,
          age_range: preliminaries.age_range,
          professional_status: preliminaries.professional_status,
          raw_score: quizResults.rawScore,
          aw_score: quizResults.awScore,
          dimension_scores: quizResults.dimensionScores,
          answers: quizResults.answers,
        };

        const response = await fetch('/api/survey/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error('Erreur lors de la sauvegarde:', await response.text());
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handleRestart = () => {
    setResults(null);
    setPreliminary(null);
    setStep("preliminaries");
  };

  return (
    <div className="min-h-screen aw-hero-surface">
      <div className="container-custom py-12">
        {/* Logo AW Score en haut */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg px-8 py-6 border border-gray-100">
            <img
              src="/logo aw score.png"
              alt="AW Score - Baromètre de charge mentale"
              className="h-16 w-auto"
            />
          </div>
        </div>

        {/* Préliminaires */}
        {step === "preliminaries" && (
          <PreliminaryQuestions onComplete={handlePreliminaresComplete} />
        )}

        {/* Intro */}
        {step === "intro" && (
          <div className="max-w-3xl mx-auto text-center">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 border border-black/10 text-black/60 px-4 py-2 rounded-full text-xs md:text-sm tracking-[0.2em] uppercase mb-6">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Test gratuit • 3 minutes • 10 questions
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-aw-ink mb-6">
                Évaluez votre charge mentale
              </h1>
              <p className="text-xl text-black/70 max-w-2xl mx-auto">
                Découvrez votre profil de charge mentale et identifiez les leviers
                d’action pour retrouver sérénité et efficacité.
              </p>
              <div className="mt-6 p-4 border-l-4 border-aw-red-deep bg-white/50 rounded-md max-w-2xl mx-auto text-sm text-gray-700">
                <strong>Important :</strong> Les démarches proposées ne se substituent en aucun cas à un suivi médical, thérapeutique ou psychologique. En cas de difficulté importante ou persistante, un professionnel de santé qualifié doit être consulté.
              </div>
            </div>

            {/* Illustration / Preview */}
            <div className="aw-card-surface rounded-3xl border border-black/5 p-8 mb-12">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-aw-red-deep/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-aw-red-deep"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Charge cognitive
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ce que vous devez retenir et anticiper
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-aw-red-deep/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-aw-red-deep"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Charge émotionnelle
                  </h3>
                  <p className="text-sm text-gray-600">
                    La gestion de vos émotions et celles des autres
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-aw-red-deep/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-aw-red-deep"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Charge organisationnelle
                  </h3>
                  <p className="text-sm text-gray-600">
                    Planification, coordination, décisions
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartQuiz}
                className="bg-aw-red-deep text-white px-10 py-4 rounded-[10px] font-medium text-lg transition-all duration-500 shadow-[0_14px_34px_rgba(139,29,29,0.18)] hover:bg-[#7C1818]"
              >
                Commencer le test gratuit
              </button>
            </div>

            {/* Crédibilité */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-aw-red-deep/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-aw-red-deep"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Scientifiquement fondé
                  </h4>
                  <p className="text-sm text-gray-600">
                    Basé sur les dimensions validées du NASA-TLX et du modèle ICA
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-aw-red-deep/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-aw-red-deep"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Adapté aux profils TDAH
                  </h4>
                  <p className="text-sm text-gray-600">
                    Méthodologie validée par un psychiatre
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-aw-red-deep/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-aw-red-deep"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Résultats actionnables
                  </h4>
                  <p className="text-sm text-gray-600">
                    Score AW + profil détaillé + recommandations
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz */}
        {step === "quiz" && (
          <div className="py-8">
            <Quiz onComplete={handleQuizComplete} />
          </div>
        )}

        {/* Results */}
        {step === "results" && results && (
          <div className="py-8">
            <Results
              awScore={results.awScore}
              rawScore={results.rawScore}
              dimensionScores={results.dimensionScores}
              userAnswers={results.answers}
              onRestart={handleRestart}
            />
          </div>
        )}
      </div>
    </div>
  );
}
