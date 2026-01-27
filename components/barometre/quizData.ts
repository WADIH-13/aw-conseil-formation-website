export interface Answer {
  text: string;
  value: number;
}

export interface Question {
  id: number;
  dimension: "cognitive" | "emotional" | "organizational" | "temporal" | "resources";
  dimensionLabel: string;
  title: string;
  subtitle: string;
  answers: Answer[];
}

export const questions: Question[] = [
  // Dimension 1: Charge cognitive
  {
    id: 1,
    dimension: "cognitive",
    dimensionLabel: "Charge cognitive",
    title: "La liste invisible",
    subtitle: "En ce moment, combien de choses devez-vous garder en tête (rendez-vous, tâches, informations à ne pas oublier) ?",
    answers: [
      { text: "Quelques éléments, je gère facilement", value: 1 },
      { text: "Une dizaine de choses, ça reste gérable", value: 2 },
      { text: "Beaucoup trop, j'ai peur d'oublier quelque chose", value: 3 },
      { text: "Ma tête est saturée, je ne sais plus par où commencer", value: 4 },
    ],
  },
  {
    id: 2,
    dimension: "cognitive",
    dimensionLabel: "Charge cognitive",
    title: "Le cerveau qui tourne",
    subtitle: "À quelle fréquence vous surprenez-vous à penser au travail ou aux responsabilités même pendant vos moments de repos ?",
    answers: [
      { text: "Rarement, j'arrive à déconnecter", value: 1 },
      { text: "Parfois, mais je peux me recentrer", value: 2 },
      { text: "Souvent, ça m'empêche de profiter", value: 3 },
      { text: "Constamment, même la nuit", value: 4 },
    ],
  },
  // Dimension 2: Charge émotionnelle
  {
    id: 3,
    dimension: "emotional",
    dimensionLabel: "Charge émotionnelle",
    title: "Le baromètre intérieur",
    subtitle: "Comment décririez-vous votre état émotionnel général ces dernières semaines ?",
    answers: [
      { text: "Serein(e) et stable", value: 1 },
      { text: "Quelques hauts et bas normaux", value: 2 },
      { text: "Souvent irritable ou anxieux(se)", value: 3 },
      { text: "Épuisé(e) émotionnellement, à fleur de peau", value: 4 },
    ],
  },
  {
    id: 4,
    dimension: "emotional",
    dimensionLabel: "Charge émotionnelle",
    title: "Porter les autres",
    subtitle: "Avez-vous l'impression de devoir gérer les émotions ou les problèmes des autres (collègues, famille, équipe) ?",
    answers: [
      { text: "Non, chacun gère ses affaires", value: 1 },
      { text: "Un peu, mais c'est équilibré", value: 2 },
      { text: "Oui, je suis souvent le pilier", value: 3 },
      { text: "Oui, et ça m'épuise", value: 4 },
    ],
  },
  // Dimension 3: Charge organisationnelle
  {
    id: 5,
    dimension: "organizational",
    dimensionLabel: "Charge organisationnelle",
    title: "Le chef d'orchestre",
    subtitle: "Qui s'occupe de l'organisation et de la planification dans votre vie (pro et/ou perso) ?",
    answers: [
      { text: "C'est bien réparti ou délégué", value: 1 },
      { text: "Principalement moi, mais avec de l'aide", value: 2 },
      { text: "Presque tout repose sur moi", value: 3 },
      { text: "Tout repose sur moi, sans exception", value: 4 },
    ],
  },
  {
    id: 6,
    dimension: "organizational",
    dimensionLabel: "Charge organisationnelle",
    title: "Les décisions en cascade",
    subtitle: "Combien de décisions (petites ou grandes) devez-vous prendre chaque jour ?",
    answers: [
      { text: "Un nombre raisonnable", value: 1 },
      { text: "Pas mal, mais je m'en sors", value: 2 },
      { text: "Trop, j'ai parfois la \"fatigue décisionnelle\"", value: 3 },
      { text: "Je suis submergé(e), même les petites décisions m'épuisent", value: 4 },
    ],
  },
  // Dimension 4: Pression temporelle
  {
    id: 7,
    dimension: "temporal",
    dimensionLabel: "Pression temporelle",
    title: "La course contre la montre",
    subtitle: "Comment percevez-vous votre rapport au temps actuellement ?",
    answers: [
      { text: "J'ai le temps de faire ce que je dois faire", value: 1 },
      { text: "C'est serré mais gérable", value: 2 },
      { text: "Je cours toujours après le temps", value: 3 },
      { text: "Je suis en permanence en retard ou débordé(e)", value: 4 },
    ],
  },
  {
    id: 8,
    dimension: "temporal",
    dimensionLabel: "Pression temporelle",
    title: "Les interruptions",
    subtitle: "À quelle fréquence êtes-vous interrompu(e) dans vos tâches ou votre concentration ?",
    answers: [
      { text: "Rarement, je peux me concentrer", value: 1 },
      { text: "Parfois, mais c'est acceptable", value: 2 },
      { text: "Souvent, ça fragmente mes journées", value: 3 },
      { text: "Constamment, je ne finis jamais rien", value: 4 },
    ],
  },
  // Dimension 5: Ressources & récupération
  {
    id: 9,
    dimension: "resources",
    dimensionLabel: "Ressources & récupération",
    title: "Le soutien",
    subtitle: "Pouvez-vous compter sur quelqu'un pour vous aider ou vous écouter quand c'est difficile ?",
    answers: [
      { text: "Oui, j'ai un bon réseau de soutien", value: 1 },
      { text: "Oui, quelques personnes", value: 2 },
      { text: "Pas vraiment, je me débrouille seul(e)", value: 3 },
      { text: "Non, je suis isolé(e)", value: 4 },
    ],
  },
  {
    id: 10,
    dimension: "resources",
    dimensionLabel: "Ressources & récupération",
    title: "La recharge",
    subtitle: "Arrivez-vous à prendre du temps pour vous ressourcer (repos, loisirs, activités qui vous font du bien) ?",
    answers: [
      { text: "Oui, régulièrement", value: 1 },
      { text: "De temps en temps", value: 2 },
      { text: "Rarement, je n'ai pas le temps", value: 3 },
      { text: "Jamais, je suis en mode survie", value: 4 },
    ],
  },
];

export const dimensionLabels: Record<Question["dimension"], string> = {
  cognitive: "Charge cognitive",
  emotional: "Charge émotionnelle",
  organizational: "Charge organisationnelle",
  temporal: "Pression temporelle",
  resources: "Ressources & récupération",
};

export const dimensionColors: Record<Question["dimension"], string> = {
  cognitive: "#8b5cf6", // violet
  emotional: "#ec4899", // rose
  organizational: "#3b82f6", // bleu
  temporal: "#f97316", // orange
  resources: "#22c55e", // vert
};

export interface DimensionScore {
  dimension: Question["dimension"];
  label: string;
  score: number; // 2-8 (somme des 2 questions)
  normalized: number; // 1-4 (moyenne)
  color: string;
}

export const calculateScores = (answers: Record<number, number>) => {
  const dimensions: Question["dimension"][] = ["cognitive", "emotional", "organizational", "temporal", "resources"];
  
  const dimensionScores: DimensionScore[] = dimensions.map((dim) => {
    const dimQuestions = questions.filter((q) => q.dimension === dim);
    const score = dimQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    return {
      dimension: dim,
      label: dimensionLabels[dim],
      score,
      normalized: score / 2,
      color: dimensionColors[dim],
    };
  });

  // Score brut total (10-40)
  const rawScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  
  // Conversion en score AW (0-100, inversé car score bas = charge élevée)
  // Score brut 10 → AW 100, Score brut 40 → AW 0
  const awScore = Math.round(100 - ((rawScore - 10) * (100 / 30)));

  return {
    dimensionScores,
    rawScore,
    awScore: Math.max(0, Math.min(100, awScore)),
  };
};
