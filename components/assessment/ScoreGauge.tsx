import React from 'react';
import clsx from 'clsx';

type ScoreGaugeProps = {
  score: number;
  labelTop: string;
  statusLabel: string;
};

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, labelTop, statusLabel }) => {
  const angle = 180 - (score / 100) * 180;

  return (
    <div className="relative w-full aspect-[2/1]">
      <svg
        viewBox="0 0 200 100"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Jauge Score AW: ${score} sur 100, niveau ${statusLabel}`}
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#F44336" />
          </linearGradient>
        </defs>
        <path
          d="M10,90 A80,80 0 0,1 190,90"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="15"
        />
        <line
          x1="100"
          y1="90"
          x2={100 + 80 * Math.cos((angle * Math.PI) / 180)}
          y2={90 - 80 * Math.sin((angle * Math.PI) / 180)}
          stroke="#000"
          strokeWidth="2"
        />
        <circle cx="100" cy="90" r="4" fill="#000" />
      </svg>
      <div className="absolute top-0 left-0 w-full text-center">
        <span className="block text-sm uppercase tracking-wide">{labelTop}</span>
        <span className="block text-4xl font-bold">{score}</span>
        <span className="block text-sm">/ 100</span>
      </div>
      <div className="absolute bottom-0 left-0 w-full text-center text-xs">
        <span className="float-left">Faible</span>
        <span className="float-right">Critique</span>
      </div>
    </div>
  );
};

export default ScoreGauge;