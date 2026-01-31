"use client";

import React, { useEffect, useState } from "react";

interface BarometerProps {
  value: number; // Score AW de 0 à 100
  label?: string;
  showScore?: boolean;
  animated?: boolean;
}

// Couleurs premium AW (adoucies)
const getLevel = (score: number) => {
  if (score >= 80) return { level: "Charge légère", color: "#6DC7A4", bgColor: "bg-[#E6F4EF]" };
  if (score >= 55) return { level: "Charge modérée", color: "#F6C97B", bgColor: "bg-[#FFF7E6]" };
  if (score >= 30) return { level: "Charge élevée", color: "#F6A97B", bgColor: "bg-[#FFF0EC]" };
  return { level: "Surcharge critique", color: "#E88A8A", bgColor: "bg-[#FDECEC]" };
};

export default function Barometer({
  value,
  label = "Score AW",
  showScore = true,
  animated = true,
}: BarometerProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);
  const { level, color } = getLevel(value);

  // Animation du score
  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, Math.round(increment * step));
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, animated]);

  // Calcul de l'angle pour la jauge (180° = demi-cercle)
  // Score 0 = -90° (gauche), Score 100 = 90° (droite)
  const angle = -90 + (displayValue / 100) * 180;

  // Paramètres SVG premium
  const size = 260;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Arc path pour le fond
  const createArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // Position de l'aiguille
  const needleLength = radius - 10;
  const needleEnd = polarToCartesian(center, center, needleLength, angle + 90);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 48 }}>
        <svg
          width={size}
          height={size / 2 + 48}
          viewBox={`0 0 ${size} ${size / 2 + 32}`}
          className="overflow-visible"
        >
          {/* Dégradé premium pour l'arc */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E88A8A" />
              <stop offset="25%" stopColor="#F6A97B" />
              <stop offset="50%" stopColor="#F6C97B" />
              <stop offset="100%" stopColor="#6DC7A4" />
            </linearGradient>
            {/* Ombre pour l'aiguille */}
            <filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Arc de fond (gris très clair) */}
          <path
            d={createArc(0, 180)}
            fill="none"
            stroke="#F3F3F3"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Arc coloré (dégradé premium) */}
          <path
            d={createArc(0, 180)}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Marqueurs de niveau */}
          {[0, 30, 55, 80, 100].map((mark, i) => {
            const markAngle = (mark / 100) * 180;
            const innerPoint = polarToCartesian(center, center, radius - strokeWidth / 2 - 6, markAngle);
            const outerPoint = polarToCartesian(center, center, radius + strokeWidth / 2 + 6, markAngle);
            return (
              <line
                key={i}
                x1={innerPoint.x}
                y1={innerPoint.y}
                x2={outerPoint.x}
                y2={outerPoint.y}
                stroke="#C7C7C7"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Aiguille premium */}
          <g filter="url(#needleShadow)">
            {/* Corps de l'aiguille */}
            <line
              x1={center}
              y1={center}
              x2={needleEnd.x}
              y2={needleEnd.y}
              stroke="#222"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
            {/* Cercle central */}
            <circle cx={center} cy={center} r="9" fill="#222" />
            <circle cx={center} cy={center} r="4.5" fill="#fff" />
          </g>

          {/* Labels des niveaux */}
          <text x="30" y={center + 24} fontSize="11" fill="#888" textAnchor="start" style={{fontFamily:'Inter, sans-serif', fontWeight:500}}>
            Critique
          </text>
          <text x={size - 30} y={center + 24} fontSize="11" fill="#888" textAnchor="end" style={{fontFamily:'Inter, sans-serif', fontWeight:500}}>
            Légère
          </text>
        </svg>

        {/* Label en haut de la jauge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="text-xs text-gray-500 uppercase tracking-wider" style={{fontFamily:'Inter, sans-serif', letterSpacing:'.08em'}}>{label}</div>
        </div>

        {/* Score décalé à droite du pivot */}
        {showScore && (
          <div
            className="absolute"
            style={{
              left: center + needleLength * 0.45,
              top: center - 12,
              transform: "translateY(-50%)",
            }}
            aria-label={`AW Score ${displayValue} sur 100`}
          >
            <div className="text-3xl font-semibold text-gray-900 tracking-tight" style={{fontFamily:'Inter, sans-serif'}}>{displayValue}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider" style={{fontFamily:'Inter, sans-serif'}}>sur 100</div>
          </div>
        )}
      </div>

      {/* Mention sous la jauge */}
      <div className="mt-2 text-xs text-gray-400 text-center" style={{maxWidth: size}}>
        Outil d’auto-évaluation — ne constitue pas un diagnostic médical.
      </div>

      {/* Badge du niveau premium */}
      <div
        className="mt-4 px-5 py-1.5 rounded-full text-gray-900 font-medium text-base shadow-sm border border-gray-200 bg-white/80"
        style={{ letterSpacing: '.01em' }}
      >
        {level}
      </div>
    </div>
  );
}
