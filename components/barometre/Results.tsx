"use client";

import React from "react";
import Barometer from "./Barometer";
import RadarChart from "./RadarChart";
import { DimensionScore } from "./quizData";
import { generatePdfReport } from "./generateReport";

interface ResultsProps {
  awScore: number;
  rawScore: number;
  dimensionScores: DimensionScore[];
  onRestart: () => void;
}

const getResultContent = (awScore: number) => {
  if (awScore >= 80) {
    return {
      title: "Charge légère",
      emoji: "✨",
      message:
        "Félicitations ! Votre charge mentale semble bien maîtrisée. Vous avez développé de bonnes stratégies d'organisation et de récupération. Continuez à cultiver cet équilibre précieux.",
      advice:
        "Maintenez vos bonnes habitudes et restez vigilant(e) aux premiers signes de surcharge. Votre équilibre actuel est un atout à préserver.",
      ctaTitle: "Aidez les autres à atteindre cet équilibre",
      ctaMessage:
        "Vous avez trouvé votre équilibre ? Partagez cette expertise en devenant Référent Charge Mentale. Accompagnez vos collègues, votre équipe ou vos clients vers un meilleur bien-être.",
      ctaButton: "Découvrir la formation Référent Charge Mentale",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
    };
  }
  if (awScore >= 55) {
    return {
      title: "Charge modérée",
      emoji: "💡",
      message:
        "Votre charge mentale est présente mais gérable. Quelques ajustements pourraient vous aider à gagner en sérénité. C'est le bon moment pour développer de nouvelles compétences organisationnelles.",
      advice:
        "Identifiez les dimensions où votre score est le plus élevé (voir le graphique ci-dessous) et concentrez vos efforts d'amélioration sur ces points.",
      ctaTitle: "Prenez les devants",
      ctaMessage:
        "Apprenez les techniques professionnelles de gestion de la charge mentale. Notre formation vous donne les outils concrets pour optimiser votre organisation et celle de votre entourage.",
      ctaButton: "Découvrir nos formations",
      bgGradient: "from-yellow-50 to-amber-50",
      borderColor: "border-yellow-200",
    };
  }
  if (awScore >= 30) {
    return {
      title: "Charge élevée",
      emoji: "⚠️",
      message:
        "Attention, votre charge mentale atteint un niveau préoccupant. Vous portez beaucoup sur vos épaules et les signaux d'alerte sont là. Il est temps d'agir pour éviter l'épuisement.",
      advice:
        "Priorisez impérativement : identifiez ce qui peut être délégué, reporté ou supprimé. Accordez-vous des pauses, même courtes. Parlez de votre situation à quelqu'un de confiance.",
      ctaTitle: "Vous n'êtes pas seul(e)",
      ctaMessage:
        "Nos formations vous donnent les outils concrets pour reprendre le contrôle. Et si vous transformiez cette expérience en expertise pour aider les autres ?",
      ctaButton: "Découvrir comment agir",
      bgGradient: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200",
    };
  }
  return {
    title: "Surcharge critique",
    emoji: "🚨",
    message:
      "Alerte ! Votre charge mentale est à un niveau critique. Votre bien-être et votre santé sont en jeu. Une action immédiate est nécessaire.",
    advice:
      "Nous vous recommandons vivement de consulter un professionnel de santé (médecin, psychologue). En attendant, essayez d'identifier une seule chose que vous pouvez lâcher dès aujourd'hui.",
    ctaTitle: "Agissez maintenant",
    ctaMessage:
      "Il existe des solutions concrètes. Nos formations sont conçues pour vous donner des outils pratiques et adaptés, y compris pour les profils neuroatypiques (TDAH).",
    ctaButton: "Découvrir les solutions",
    bgGradient: "from-red-50 to-rose-50",
    borderColor: "border-red-200",
  };
};

export default function Results({
  awScore,
  rawScore,
  dimensionScores,
  onRestart,
}: ResultsProps) {
  const content = getResultContent(awScore);

  // Trouver la dimension la plus problématique
  const worstDimension = [...dimensionScores].sort(
    (a, b) => b.normalized - a.normalized
  )[0];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* En-tête des résultats */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vos résultats
        </h1>
        <p className="text-gray-600">
          Voici votre profil de charge mentale basé sur vos réponses
        </p>
      </div>

      {/* Score principal avec baromètre */}
      <div
        className={`bg-gradient-to-br ${content.bgGradient} rounded-3xl p-8 mb-8 border ${content.borderColor}`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <Barometer value={awScore} animated={true} />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <div className="text-4xl mb-2">{content.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {content.title}
            </h2>
            <p className="text-gray-700 mb-4">{content.message}</p>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="text-sm text-gray-600">
                <strong>Notre conseil :</strong> {content.advice}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profil détaillé */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
          Votre profil détaillé
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Visualisez où se situent vos principales sources de charge mentale
        </p>

        <div className="flex justify-center">
          <RadarChart scores={dimensionScores} size={320} animated={true} />
        </div>

        {/* Point d'attention */}
        {worstDimension.normalized >= 3 && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>Point d’attention :</strong> Votre dimension «{" "}
              {worstDimension.label} » présente le score le plus élevé (
              {worstDimension.normalized.toFixed(1)}/4). C’est probablement votre
              principale source de tension actuellement.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white mb-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">{content.ctaTitle}</h3>
          <p className="text-indigo-100 mb-6">{content.ctaMessage}</p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl">
            {content.ctaButton}
          </button>
        </div>
      </div>

      {/* Informations complémentaires */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <h4 className="font-semibold text-gray-900 mb-3">
          À propos de ce baromètre
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Ce baromètre s’appuie sur les dimensions validées scientifiquement pour
          l’évaluation de la charge mentale (NASA-TLX, modèle ICA). Le score AW
          est notre échelle propriétaire qui synthétise ces dimensions en un
          indicateur unique et actionnable.
        </p>
        <p className="text-sm text-gray-600">
          <strong>Méthodologie adaptée aux profils neuroatypiques (TDAH)</strong>{" "}
          — Validée par un psychiatre.
        </p>
      </div>

      {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
        >
          Refaire le test
        </button>
        <button
          onClick={async () => {
            const level = getResultContent(awScore).title;
            const reportDimensions = (dimensionScores ?? []).map((d) => ({
              key: d.dimension,
              label: d.label,
              value: Math.round((Math.max(0, Math.min(4, d.normalized)) / 4) * 100),
            }))
            const res = await generatePdfReport({
              awScore,
              date: new Date().toISOString().slice(0, 10),
              levelLabel: level,
              dimensionScores: reportDimensions,
            })
            // déclencher téléchargement direct (comportement actuel)
            const url = URL.createObjectURL(res.blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = res.fileName;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all"
        >
          Télécharger mon rapport (PDF)
        </button>

        <button
          onClick={async () => {
            try {
              const level = getResultContent(awScore).title;
              const reportDimensions = (dimensionScores ?? []).map((d) => ({
                key: d.dimension,
                label: d.label,
                value: Math.round((Math.max(0, Math.min(4, d.normalized)) / 4) * 100),
              }))
              const res = await generatePdfReport({
                awScore,
                date: new Date().toISOString().slice(0, 10),
                levelLabel: level,
                dimensionScores: reportDimensions,
              })
              const file = new File([res.blob], res.fileName, { type: 'application/pdf' });

              const navAny = navigator as any
              if (
                typeof navAny?.canShare === 'function' &&
                typeof navAny?.share === 'function' &&
                navAny.canShare({ files: [file] })
              ) {
                await navAny.share({ files: [file], title: 'Mon rapport AW Score', text: 'Voici mon rapport de charge mentale.' });
                return;
              }

              // Fallback : télécharger puis ouvrir mailto pré-rempli
              const url = URL.createObjectURL(res.blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = res.fileName;
              a.click();
              URL.revokeObjectURL(url);

              const subject = encodeURIComponent('Mon rapport AW Score');
              const body = encodeURIComponent('Bonjour,\n\nJe vous envoie mon rapport AW Score (téléchargé depuis AW Conseil et Formation).\n\nCordialement');
              window.location.href = `mailto:?subject=${subject}&body=${body}`;
            } catch (e) {
              console.error(e);
              alert('Impossible de partager le fichier sur cet appareil. Le rapport a été téléchargé.');
            }
          }}
          className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition-all"
        >
          Partager mes résultats
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center mt-8">
        Ce test est un outil d’auto-évaluation et ne constitue pas un diagnostic
        médical. En cas de détresse importante, consultez un professionnel de
        santé.
      </p>
    </div>
  );
}
