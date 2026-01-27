import { thresholds, dimensionLabels } from '@/lib/assessment/config';
import { generateInsights } from '@/lib/assessment/insights';
import { AssessmentResult } from '@/lib/assessment/types';
import ScoreGauge from '@/components/assessment/ScoreGauge';
import StatusCard from '@/components/assessment/StatusCard';
import DimensionsRadar from '@/components/assessment/DimensionsRadar';
import InsightsPanel from '@/components/assessment/InsightsPanel';

const mockResult: AssessmentResult = {
  scoreAw: 75,
  status: 'elevee',
  dimensions: [
    { key: 'cognitive', label: 'Charge cognitive', value: 3, max: 4 },
    { key: 'emotionnelle', label: 'Charge émotionnelle', value: 2, max: 4 },
    { key: 'organisationnelle', label: 'Charge organisationnelle', value: 4, max: 4 },
    { key: 'pressionTemporelle', label: 'Pression temporelle', value: 3, max: 4 },
    { key: 'recuperation', label: 'Ressources & récupération', value: 1, max: 4 },
  ],
  primaryAttentionKey: 'pressionTemporelle',
  shortMessage: 'Votre charge mentale est élevée.',
  adviceBullets: [
    'Réduisez les tâches non essentielles.',
    'Planifiez des pauses régulières.',
    'Déléguez lorsque possible.',
  ],
  disclaimer: "Outil d'auto-évaluation. Ne remplace pas un avis médical.",
};

export default function ResultsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-[#FAF7F2]">
      <div className="md:col-span-5">
        <ScoreGauge
          score={mockResult.scoreAw}
          labelTop="SCORE AW"
          statusLabel="Charge élevée"
        />
        <StatusCard
          statusTitle="Charge élevée"
          shortMessage={mockResult.shortMessage}
          adviceTitle="Notre conseil"
          adviceBullets={mockResult.adviceBullets}
        />
        <p className="text-sm text-gray-600 mt-4">{mockResult.disclaimer}</p>
      </div>
      <div className="md:col-span-7">
        <h2 className="text-xl font-bold mb-4">Votre profil détaillé</h2>
        <DimensionsRadar dimensions={mockResult.dimensions} />
        <InsightsPanel
          dimensions={mockResult.dimensions}
          primaryAttentionKey={mockResult.primaryAttentionKey}
        />
      </div>
    </div>
  );
}