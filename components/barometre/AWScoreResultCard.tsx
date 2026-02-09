"use client";

import React from "react";
import GaugeChart from "./GaugeChart";

interface AWScoreResultCardProps {
  score: number;
  title: string;
  message: string;
  advice: string;
}

export default function AWScoreResultCard({
  score,
  title,
  message,
  advice,
}: AWScoreResultCardProps) {
  return (
    <section className="bg-[#FCFCFC] border border-black/5 rounded-2xl shadow-sm p-8">
      {/* Logo AW Score en haut */}
      <div className="flex justify-center mb-6">
        <img
          src="/logo aw score.png"
          alt="AW Score"
          className="h-12 w-auto opacity-90"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-center">
        <div className="flex justify-center lg:justify-start">
          <GaugeChart score={score} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-sm text-gray-700 mb-3">
            Bonne nouvelle : identifier le problème est déjà un premier pas.
          </p>

          <div className="inline-block text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-6">
            Outil d’auto-évaluation — ne constitue pas une analyse médicale.
          </div>

          <p className="text-base text-gray-700 leading-relaxed mb-4">{message}</p>

          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">Notre conseil :</span>{" "}
            {advice}
          </p>
        </div>
      </div>
    </section>
  );
}
