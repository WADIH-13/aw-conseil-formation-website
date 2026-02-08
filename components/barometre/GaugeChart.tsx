import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Données pour les sections colorées de la jauge (en cohérence avec le score AW 0-100)
// Vert à GAUCHE (180°), Rouge à DROITE (0°)
// Ordre inversé car Recharts affiche dans le sens inverse
const data = [
  { name: 'Bonne', value: 25, color: '#27AE60' },        // Vert: gauche
  { name: 'Modérée', value: 25, color: '#F1C40F' },      // Jaune: milieu-gauche
  { name: 'Élevée', value: 25, color: '#E67E22' },       // Orange: milieu-droite
  { name: 'Critique', value: 25, color: '#E74C3C' },     // Rouge: droite
];

interface GaugeChartProps {
  score: number;
}

export default function GaugeChart({ score }: GaugeChartProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let currentScore = 0;
    const startTime = Date.now();
    const duration = 300;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      currentScore = score * eased;
      setDisplayScore(Math.round(currentScore));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [score]);

  // L'aiguille pointe selon le score AW (0-100 = 0-180 degrés)
  // Score 0 = 0° (droite/rouge), Score 50 = 90° (milieu), Score 100 = 180° (gauche/vert)
  const needleRotation = (displayScore / 100) * 180;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600">
          <span className="text-red-600 font-bold">AW</span>
          <span className="text-gray-700">Score</span>
        </p>
      </div>
      <div className="relative w-80 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={90}
              cy="100%"
              paddingAngle={1}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Score au centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-900">{displayScore}</div>
          <div className="text-xs text-gray-500">SUR 100</div>
        </div>
      </div>
    </div>
  );
}
