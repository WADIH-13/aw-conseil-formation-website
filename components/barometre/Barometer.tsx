"use client";

import React, { useEffect, useState } from "react";

interface BarometerProps {
  value: number; // Score AW de 0 à 100
  label?: string;
  showScore?: boolean;
  animated?: boolean;
}

// Logo AW Component
const AWLogo = () => (
  <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
    {/* A */}
    <path d="M4 18L8 2H11L15 18H12.5L11.8 15H7.2L6.5 18H4ZM7.8 13H11.2L9.5 5.5L7.8 13Z" fill="#DC2626" />
    {/* W */}
    <path d="M18 2H20.5L22.5 12L24.5 2H27L29 12L31 2H33.5L30.5 18H28L26 7.5L24 18H21.5L18 2Z" fill="#DC2626" />
    {/* Cercle décoratif */}
    <circle cx="42" cy="10" r="4" fill="#DC2626" opacity="0.2" />
  </svg>
);

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

  const createArcArea = (startAngle: number, endAngle: number, inset = 0) => {
    const r = radius - inset;
    const start = polarToCartesian(center, center, r, endAngle);
    const end = polarToCartesian(center, center, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${center} ${center} Z`;
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
    <div className="flex flex-col items-center relative">
      <div className="relative" style={{ width: size, height: size / 2 + 48 }}>
        
        {/* Pastille d'information légale à droite */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full px-3 py-2 shadow-lg border-2 border-gray-200 cursor-help group hover:scale-105 transition-transform duration-200"
          style={{ 
            left: size + 20,
            maxWidth: '180px',
            fontSize: '10px',
            lineHeight: '1.4'
          }}
          title="Outil d'auto-évaluation — ne constitue pas un diagnostic médical"
        >
          <div className="flex items-start gap-1.5">
            <span className="text-amber-500 text-sm flex-shrink-0 mt-0.5">⚠️</span>
            <p className="text-gray-700 font-medium" style={{fontFamily:'Inter, sans-serif'}}>
              Outil d'auto-évaluation
            </p>
          </div>
          <p className="text-gray-500 text-[9px] mt-1 pl-5" style={{fontFamily:'Inter, sans-serif'}}>
            Ne constitue pas un diagnostic médical
          </p>
        </div>

        <svg
          width={size}
          height={size / 2 + 48}
          viewBox={`0 0 ${size} ${size / 2 + 32}`}
          className="overflow-visible"
        >
          {/* Dégradés et effets premium */}
          <defs>
            {/* Dégradé principal plus réaliste */}
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="20%" stopColor="#84CC16" />
              <stop offset="45%" stopColor="#FACC15" />
              <stop offset="70%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            {/* Dégradé métallique pour le bezel */}
            <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5F5F5" />
              <stop offset="25%" stopColor="#D1D5DB" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#E5E7EB" />
            </linearGradient>
            {/* Dégradé de brillance pour effet 3D */}
            <linearGradient id="gaugeShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
            </linearGradient>
            {/* Ombre pour l'aiguille */}
            <filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
            </filter>
            {/* Ombre pour le fond de la jauge */}
            <filter id="gaugeShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Bezel métallique */}
          <path
            d={createArc(0, 180)}
            fill="none"
            stroke="url(#metalGradient)"
            strokeWidth={strokeWidth + 10}
            strokeLinecap="round"
            filter="url(#gaugeShadow)"
          />

          {/* Cadran blanc */}
          <path d={createArcArea(0, 180, 6)} fill="#FFFFFF" />
          <path d={createArcArea(0, 180, 10)} fill="#F9FAFB" />

          {/* Arc de fond */}
          <path
            d={createArc(0, 180)}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Arc coloré avec dégradé réaliste */}
          <path
            d={createArc(0, 180)}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              transition: 'all 0.3s ease-out',
            }}
          />
          
          {/* Effet de brillance sur l'arc */}
          <path
            d={createArc(0, 180)}
            fill="none"
            stroke="url(#gaugeShine)"
            strokeWidth={strokeWidth - 4}
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Marqueurs de niveau plus élégants */}
          {Array.from({ length: 11 }, (_, idx) => idx * 10).map((mark, i) => {
            const markAngle = (mark / 100) * 180;
            const isMajor = mark % 20 === 0;
            const innerPoint = polarToCartesian(center, center, radius - strokeWidth / 2 - (isMajor ? 6 : 3), markAngle);
            const outerPoint = polarToCartesian(center, center, radius + strokeWidth / 2 + (isMajor ? 6 : 3), markAngle);
            return (
              <g key={i}>
                <line
                  x1={innerPoint.x}
                  y1={innerPoint.y}
                  x2={outerPoint.x}
                  y2={outerPoint.y}
                  stroke="#9CA3AF"
                  strokeWidth={isMajor ? "2" : "1"}
                  strokeLinecap="round"
                />
                {isMajor && (
                  <circle cx={outerPoint.x} cy={outerPoint.y} r="2" fill="#6B7280" />
                )}
              </g>
            );
          })}

          {/* Labels 0 et 100 */}
          <text x="24" y={center + 28} fontSize="10" fill="#6B7280" textAnchor="start" style={{fontFamily:'Inter, sans-serif', fontWeight:600}}>
            0
          </text>
          <text x={size - 24} y={center + 28} fontSize="10" fill="#6B7280" textAnchor="end" style={{fontFamily:'Inter, sans-serif', fontWeight:600}}>
            100
          </text>

          {/* Aiguille ultra-premium avec effet métallique */}
          <g filter="url(#needleShadow)">
            {/* Base élargie de l'aiguille */}
            <line
              x1={center}
              y1={center}
              x2={needleEnd.x}
              y2={needleEnd.y}
              stroke="#1F2937"
              strokeWidth="5"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              opacity="0.3"
            />
            {/* Corps principal de l'aiguille */}
            <line
              x1={center}
              y1={center}
              x2={needleEnd.x}
              y2={needleEnd.y}
              stroke="#B91C1C"
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            {/* Reflet sur l'aiguille */}
            <line
              x1={center}
              y1={center}
              x2={needleEnd.x}
              y2={needleEnd.y}
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              opacity="0.5"
            />
            {/* Cercle central avec gradient */}
            <circle cx={center} cy={center} r="12" fill="#111827" opacity="0.12" />
            <circle cx={center} cy={center} r="10" fill="#B91C1C" />
            <circle cx={center} cy={center} r="7" fill="#EF4444" />
            <circle cx={center} cy={center} r="4" fill="#fff" opacity="0.95" />
            <circle cx={center} cy={center} r="2" fill="#991B1B" />
          </g>

          {/* Labels des niveaux */}
          <text x="30" y={center + 24} fontSize="11" fill="#888" textAnchor="start" style={{fontFamily:'Inter, sans-serif', fontWeight:500}}>
            Critique
          </text>
          <text x={size - 30} y={center + 24} fontSize="11" fill="#888" textAnchor="end" style={{fontFamily:'Inter, sans-serif', fontWeight:500}}>
            Légère
          </text>
        </svg>

        {/* Logo AW en haut de la jauge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="flex items-center justify-center gap-1">
            <AWLogo />
            <span className="text-xs text-gray-400 uppercase tracking-wider" style={{fontFamily:'Inter, sans-serif', letterSpacing:'.08em'}}>Score</span>
          </div>
        </div>

        {/* Score avec animation et style amélioré */}
        {showScore && (
          <div
            className="absolute animate-fade-in"
            style={{
              left: center + needleLength * 0.45,
              top: center - 12,
              transform: "translateY(-50%)",
            }}
            aria-label={`AW Score ${displayValue} sur 100`}
          >
            <div 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 tracking-tight" 
              style={{
                fontFamily:'Inter, sans-serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {displayValue}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-medium" style={{fontFamily:'Inter, sans-serif', letterSpacing: '.15em'}}>sur 100</div>
          </div>
        )}
      </div>
    </div>
  );
}
