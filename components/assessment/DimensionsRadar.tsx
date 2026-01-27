"use client";

import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { DimensionScore } from '@/lib/assessment/types';

type DimensionsRadarProps = {
  dimensions: DimensionScore[];
};

const DimensionsRadar: React.FC<DimensionsRadarProps> = ({ dimensions }) => {
  const data = dimensions.map((d) => ({
    dimension: d.label,
    value: d.value,
    max: d.max,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="80%">
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" />
          <PolarRadiusAxis domain={[0, 4]} />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DimensionsRadar;