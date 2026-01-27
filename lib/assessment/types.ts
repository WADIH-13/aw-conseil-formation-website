export type DimensionKey =
  | 'cognitive'
  | 'emotionnelle'
  | 'organisationnelle'
  | 'pressionTemporelle'
  | 'recuperation';

export interface DimensionScore {
  key: DimensionKey;
  label: string;
  value: number;
  max: number;
}

export interface AssessmentResult {
  scoreAw: number; // 0..100
  status: 'faible' | 'moderee' | 'elevee' | 'critique';
  dimensions: DimensionScore[];
  primaryAttentionKey: DimensionKey;
  shortMessage: string; // 1-2 phrases
  adviceBullets: string[]; // 3 bullets
  disclaimer: string; // “Outil d’auto-évaluation…”
}