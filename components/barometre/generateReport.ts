import jsPDF from "jspdf";

interface DimensionScore {
  key: string;
  label: string;
  value: number;
}

interface ReportData {
  awScore: number; // 0-100
  date?: string;
  levelLabel?: string;
  dimensionScores?: DimensionScore[];
}

// Couleurs sobres — charte AW
const AW_COLOR = {
  primary: [139, 29, 29] as [number, number, number],   // Rouge AW
  dark: [34, 40, 49] as [number, number, number],       // Texte foncé
  accent: [88, 101, 115] as [number, number, number],   // Secondaire
  soft: [244, 245, 247] as [number, number, number],    // Fond clair
};

function getInterpretation(score: number) {
  if (score >= 75) return {
    level: "Charge légère",
    message: "Votre charge mentale semble bien maîtrisée. Vous avez développé de bonnes stratégies d'organisation et de récupération.",
    advice: "Maintenez vos bonnes habitudes et restez vigilant(e) aux premiers signes de surcharge."
  };
  if (score >= 50) return {
    level: "Charge modérée",
    message: "Votre charge mentale est présente mais gérable. Certains signaux méritent votre attention.",
    advice: "Identifiez les sources de tension principales et accordez-vous des temps de récupération."
  };
  if (score >= 25) return {
    level: "Charge élevée",
    message: "Votre charge mentale est significative. Il est important d'agir pour éviter l'épuisement.",
    advice: "Priorisez, déléguez si possible, et n'hésitez pas à demander du soutien."
  };
  return {
    level: "Charge critique",
    message: "Votre charge mentale est très élevée. Prenez soin de vous et agissez rapidement.",
    advice: "Consultez un professionnel si vous ressentez une détresse importante. Votre bien-être est prioritaire."
  };
}

export async function generatePdfReport(data: ReportData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;

  const date = data.date || new Date().toISOString().slice(0, 10);
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const normalized = Math.max(0, Math.min(100, data.awScore));
  const interpretation = getInterpretation(normalized);

  // Helper pour charger une image
  async function loadImageAsDataUrl(path: string) {
    try {
      const resp = await fetch(path);
      if (!resp.ok) return null;
      const blob = await resp.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return null;
    }
  }

  // =====================
  // EN-TÊTE
  // =====================
  doc.setFillColor(...AW_COLOR.primary);
  doc.rect(0, 0, pageWidth, 90, "F");

  // Logo AW Score centré
  const logoData = await loadImageAsDataUrl("/logo aw score.png");
  if (logoData) {
    const logoW = 180;
    const logoH = 60;
    doc.addImage(logoData, "PNG", (pageWidth - logoW) / 2, 15, logoW, logoH);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("aw-formation.fr", pageWidth / 2, 82, { align: "center" });

  doc.setTextColor(0, 0, 0);

  // =====================
  // DISCLAIMER IMPORTANT
  // =====================
  let y = 120;
  doc.setFillColor(255, 248, 240);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 70, 6, 6, "F");
  doc.setDrawColor(255, 180, 100);
  doc.setLineWidth(1);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 70, 6, 6, "S");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 100, 50);
  doc.text("IMPORTANT", margin + 12, y + 18);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...AW_COLOR.dark);
  const disclaimer = "Ce baromètre est un outil d'auto-réflexion et n'a aucune valeur médicale ou diagnostique. Il ne remplace en aucun cas l'avis d'un professionnel de santé. En cas de difficulté importante ou persistante, consultez un médecin ou un psychologue.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - margin * 2 - 24);
  doc.text(disclaimerLines, margin + 12, y + 34);

  // =====================
  // OBJECTIF DU TEST
  // =====================
  y = 200;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...AW_COLOR.primary);
  doc.text("Objectif de ce baromètre", margin, y);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...AW_COLOR.dark);
  const objectif = "Ce test a pour but de vous inviter à vous poser des questions sur votre quotidien, votre organisation et votre ressenti. Il s'agit d'une photographie à un instant T, qui peut évoluer. L'objectif est de vous aider à prendre du recul et à identifier d'éventuels points d'attention.";
  const objectifLines = doc.splitTextToSize(objectif, pageWidth - margin * 2);
  doc.text(objectifLines, margin, y + 18);

  // =====================
  // VOTRE SCORE
  // =====================
  y = 280;
  doc.setFillColor(...AW_COLOR.soft);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 100, 8, 8, "F");

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...AW_COLOR.dark);
  doc.text("Votre AW Score", margin + 20, y + 30);

  // Score number
  doc.setFontSize(48);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...AW_COLOR.primary);
  doc.text(String(Math.round(normalized)), margin + 20, y + 75);
  doc.setFontSize(14);
  doc.setTextColor(...AW_COLOR.accent);
  doc.text("/ 100", margin + 80, y + 75);

  // Level label
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...AW_COLOR.dark);
  doc.text(data.levelLabel || interpretation.level, margin + 160, y + 45);

  // Interpretation
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const msgLines = doc.splitTextToSize(interpretation.message, pageWidth - margin * 2 - 180);
  doc.text(msgLines, margin + 160, y + 62);

  // =====================
  // VOS DIMENSIONS
  // =====================
  y = 400;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...AW_COLOR.primary);
  doc.text("Vos dimensions de charge mentale", margin, y);

  const dims = data.dimensionScores && data.dimensionScores.length ? data.dimensionScores : [];
  
  y += 20;
  const barMaxW = 200;
  dims.forEach((d) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...AW_COLOR.dark);
    doc.text(d.label, margin, y + 10);

    // Background bar
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(margin + 160, y + 2, barMaxW, 12, 3, 3, "F");

    // Value bar with color based on value
    const value = Math.max(0, Math.min(100, d.value));
    const barW = (value / 100) * barMaxW;
    
    // Color: green if low, red if high (inverse logic for mental load)
    const r = Math.round(34 + (value / 100) * (180 - 34));
    const g = Math.round(139 - (value / 100) * 100);
    doc.setFillColor(r, g, 50);
    if (barW > 0) {
      doc.roundedRect(margin + 160, y + 2, barW, 12, 3, 3, "F");
    }

    // Value text
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`${Math.round(value)}%`, margin + 160 + barMaxW + 10, y + 11);

    y += 22;
  });

  // =====================
  // CONSEIL PERSONNALISÉ
  // =====================
  y += 20;
  doc.setFillColor(240, 248, 255);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 50, 6, 6, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...AW_COLOR.primary);
  doc.text("Conseil personnalisé", margin + 12, y + 18);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...AW_COLOR.dark);
  const adviceLines = doc.splitTextToSize(interpretation.advice, pageWidth - margin * 2 - 24);
  doc.text(adviceLines, margin + 12, y + 34);

  // =====================
  // PISTES D'ACTION
  // =====================
  y += 70;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...AW_COLOR.primary);
  doc.text("Premières pistes de réflexion", margin, y);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...AW_COLOR.dark);
  const actions = [
    "Identifier une sollicitation que vous pourriez alléger",
    "Clarifier une priorité qui vous tient vraiment à cœur",
    "Vous accorder un temps de récupération, même court",
    "Mettre des mots sur une difficulté, à l'écrit ou à l'oral",
  ];
  y += 18;
  actions.forEach((a) => {
    doc.text(`• ${a}`, margin + 10, y);
    y += 16;
  });

  // =====================
  // FOOTER
  // =====================
  const footerY = pageHeight - 100;
  
  // Ligne de séparation
  doc.setDrawColor(...AW_COLOR.accent);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  // Rappel disclaimer
  doc.setFontSize(8);
  doc.setTextColor(...AW_COLOR.accent);
  const footerDisclaimer = "Rappel : Ce document est fourni à titre informatif uniquement. Il n'a pas de valeur médicale et ne constitue pas un diagnostic. Pour toute préoccupation de santé, consultez un professionnel qualifié.";
  const footerLines = doc.splitTextToSize(footerDisclaimer, pageWidth - margin * 2);
  doc.text(footerLines, margin, footerY + 16);

  // Coordonnées
  doc.setFontSize(9);
  doc.setTextColor(...AW_COLOR.dark);
  doc.text("AW Conseil et Formation", margin, footerY + 50);
  doc.text("Site : aw-formation.fr", margin, footerY + 64);
  doc.text("Email : contact@aw-formation.fr", margin + 180, footerY + 64);

  // Date discrète
  doc.setFontSize(8);
  doc.setTextColor(...AW_COLOR.accent);
  doc.text(`Généré le ${formattedDate}`, pageWidth - margin, footerY + 64, { align: "right" });

  const fileName = `AW_Score_${formattedDate.replace(/\s/g, '_')}.pdf`;
  const blob = doc.output("blob");
  return { blob, fileName };
}
