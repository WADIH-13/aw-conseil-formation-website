import { DimensionScore, DimensionKey } from './types';

export function generateInsights(
  dimensions: DimensionScore[],
  primaryAttentionKey: DimensionKey
): string {
  const primaryDimension = dimensions.find((d) => d.key === primaryAttentionKey);
  const sortedDimensions = [...dimensions].sort((a, b) => b.value - a.value);
  const topTwo = sortedDimensions.slice(0, 2);

  if (!primaryDimension) {
    return 'Analyse indisponible. Veuillez vérifier les données.';
  }

  return `Votre ${primaryDimension.label.toLowerCase()} est très élevée, et votre ${topTwo[1].label.toLowerCase()} est également préoccupante. Priorité: ${primaryDimension.label.toLowerCase()} et ${topTwo[1].label.toLowerCase()}.`;
}