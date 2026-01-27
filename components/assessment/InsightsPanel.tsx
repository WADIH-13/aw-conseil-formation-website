import React from 'react';
import { DimensionScore, DimensionKey } from '@/lib/assessment/types';
import { generateInsights } from '@/lib/assessment/insights';

type InsightsPanelProps = {
  dimensions: DimensionScore[];
  primaryAttentionKey: DimensionKey;
};

const InsightsPanel: React.FC<InsightsPanelProps> = ({ dimensions, primaryAttentionKey }) => {
  const insights = generateInsights(dimensions, primaryAttentionKey);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Point d’attention</h3>
      <p className="text-gray-700">{insights}</p>
    </div>
  );
};

export default InsightsPanel;