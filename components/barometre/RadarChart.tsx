"use client";

import React, { useEffect, useState } from "react";
import { DimensionScore } from "./quizData";

interface RadarChartProps {
  scores: DimensionScore[];
  size?: number;
  animated?: boolean;
}

export default function RadarChart({
  scores,
  size = 300,
  animated = true,
}: RadarChartProps) {
  const [animationProgress, setAnimationProgress] = useState(animated ? 0 : 1);

  useEffect(() => {
    if (!animated) return;

    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [animated]);

  const center = size / 2;
  const maxRadius = (size / 2) * 0.75;
  const levels = 4; // 4 niveaux (1, 2, 3, 4)
  const numPoints = scores.length;

  // Calcul des angles pour chaque dimension
  const angleStep = (2 * Math.PI) / numPoints;
  const startAngle = -Math.PI / 2; // Commencer en haut

  // Fonction pour convertir coordonnées polaires en cartésiennes
  const polarToCartesian = (angle: number, radius: number) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  });

  // Générer les points du polygone des scores
  const dataPoints = scores.map((score, i) => {
    const angle = startAngle + i * angleStep;
    const normalizedValue = (score.normalized / 4) * animationProgress;
    const radius = normalizedValue * maxRadius;
    return polarToCartesian(angle, radius);
  });

  // Créer le path du polygone
  const polygonPath =
    dataPoints.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z";

  // Générer les grilles de fond
  const gridLevels = Array.from({ length: levels }, (_, i) => {
    const levelRadius = ((i + 1) / levels) * maxRadius;
    const points = Array.from({ length: numPoints }, (_, j) => {
      const angle = startAngle + j * angleStep;
      return polarToCartesian(angle, levelRadius);
    });
    return (
      points.map((p, j) => (j === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z"
    );
  });

  // Générer les axes
  const axes = scores.map((_, i) => {
    const angle = startAngle + i * angleStep;
    const end = polarToCartesian(angle, maxRadius);
    return { start: { x: center, y: center }, end };
  });

  // Position des labels
  const labelPositions = scores.map((score, i) => {
    const angle = startAngle + i * angleStep;
    const labelRadius = maxRadius + 40;
    const pos = polarToCartesian(angle, labelRadius);
    
    // Ajustement pour le positionnement du texte
    let textAnchor: "start" | "middle" | "end" = "middle";
    let dy = 0;
    
    if (Math.abs(pos.x - center) > 10) {
      textAnchor = pos.x > center ? "start" : "end";
    }
    if (Math.abs(pos.y - center) < 10) {
      dy = 5;
    }

    return { ...pos, label: score.label, color: score.color, textAnchor, dy };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Grilles de fond */}
        {gridLevels.map((path, i) => (
          <path
            key={`grid-${i}`}
            d={path}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {axes.map((axis, i) => (
          <line
            key={`axis-${i}`}
            x1={axis.start.x}
            y1={axis.start.y}
            x2={axis.end.x}
            y2={axis.end.y}
            stroke="#d1d5db"
            strokeWidth="1"
          />
        ))}

        {/* Polygone des données */}
        <path
          d={polygonPath}
          fill="url(#radarGradient)"
          fillOpacity="0.3"
          stroke="url(#radarGradient)"
          strokeWidth="3"
          className="transition-all duration-500"
        />

        {/* Points sur le polygone */}
        {dataPoints.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="6"
            fill={scores[i].color}
            stroke="white"
            strokeWidth="2"
            className="transition-all duration-500"
          />
        ))}

        {/* Labels des dimensions */}
        {labelPositions.map((pos, i) => (
          <text
            key={`label-${i}`}
            x={pos.x}
            y={pos.y}
            dy={pos.dy}
            textAnchor={pos.textAnchor}
            fontSize="11"
            fontWeight="500"
            fill="#4b5563"
            className="select-none"
          >
            {pos.label}
          </text>
        ))}

        {/* Indicateurs de niveau au centre */}
        {[1, 2, 3, 4].map((level) => {
          const radius = (level / 4) * maxRadius;
          const pos = polarToCartesian(startAngle + angleStep * 0.5, radius);
          return (
            <text
              key={`level-${level}`}
              x={center + 8}
              y={center - radius + 4}
              fontSize="9"
              fill="#9ca3af"
              className="select-none"
            >
              {level}
            </text>
          );
        })}
      </svg>

      {/* Légende */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {scores.map((score) => (
          <div key={score.dimension} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: score.color }}
            />
            <span className="text-xs text-gray-600">
              {score.label}: <strong>{score.normalized.toFixed(1)}</strong>/4
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
