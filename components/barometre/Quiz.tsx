"use client";

import React, { useState } from "react";
import { questions, Question, calculateScores, DimensionScore } from "./quizData";

interface QuizProps {
  onComplete: (results: {
    dimensionScores: DimensionScore[];
    rawScore: number;
    awScore: number;
    answers: Record<number, number>;
  }) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswerSelect = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const results = calculateScores(newAnswers);
      onComplete({ ...results, answers: newAnswers });
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setSelectedAnswer(answers[questions[currentIndex - 1].id] || null);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* En-tête avec progression */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentIndex + 1} sur {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          {currentQuestion.dimensionLabel}
        </div>
      </div>

      {/* Question */}
      <div
        className={`transition-all duration-300 ${
          isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {currentQuestion.title}
          </h2>
          <p className="text-gray-600 mb-8">{currentQuestion.subtitle}</p>

          {/* Options de réponse */}
          <div className="space-y-3">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === answer.value
                    ? "border-indigo-600 bg-indigo-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                      selectedAnswer === answer.value
                        ? "border-indigo-600 bg-indigo-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswer === answer.value && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      selectedAnswer === answer.value
                        ? "text-indigo-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {answer.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentIndex === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            ← Précédent
          </button>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedAnswer === null
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {isLastQuestion ? "Voir mes résultats" : "Suivant →"}
          </button>
        </div>
      </div>

      {/* Indicateur de temps estimé */}
      <div className="mt-8 text-center text-sm text-gray-400">
        Temps estimé : ~3 minutes
      </div>
    </div>
  );
}
