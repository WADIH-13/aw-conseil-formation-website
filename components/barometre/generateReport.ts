import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

// Couleurs sobres, désaturées — adaptées à la charte AW
const AW_COLOR: {
  primary: [number, number, number]
  accent: [number, number, number]
  soft: [number, number, number]
} = {
  primary: [34, 40, 49], // foncé
  accent: [88, 101, 115], // secondaire désaturée
  soft: [244, 245, 247], // fond clair
};

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export async function generatePdfReport(data: ReportData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;

  const date = data.date || new Date().toISOString().slice(0, 10);

  // Helper to load images (logo) from public
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

  // --- PAGE 1 : COMPRENDRE ---
  // Header: logo left, title center, date right
  const logoData = await loadImageAsDataUrl("/logo-aw.png");
  const headerY = 40;
  if (logoData) {
    doc.addImage(logoData, "PNG", margin, headerY, 140, 42);
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(date, pageWidth - margin, headerY + 14, { align: "right" });

  // Title centered
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Votre lecture de charge mentale — AW Score", pageWidth / 2, headerY + 60, { align: "center" });

  // Sous-titre discret
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...AW_COLOR.accent);
  doc.text("Une photographie de votre charge mentale à l'instant T", pageWidth / 2, headerY + 78, { align: "center" });
  doc.setTextColor(0, 0, 0);

  // Jauge AW Score (centrale)
  const gaugeCenterX = pageWidth / 2;
  const gaugeCenterY = 220;
  const gaugeRadius = 110;

  // Arc de la jauge — demi-cercle légèrement ouvert (from 200deg to -20deg)
  const startDeg = 200;
  const endDeg = -20 + 360; // js degrees

  // Draw background arc (subtle, thin)
  doc.setDrawColor(...AW_COLOR.accent);
  doc.setLineWidth(6);
  (doc as any).circle(gaugeCenterX, gaugeCenterY, gaugeRadius, "S");
  // Instead of full circle, we draw arc by constructing path of many small lines
  const steps = 120;
  doc.setLineWidth(6);
  doc.setDrawColor(200, 204, 209);
  for (let i = 0; i <= steps; i++) {
    const t1 = startDeg + ((endDeg - startDeg) * i) / steps;
    const t2 = startDeg + ((endDeg - startDeg) * (i + 1)) / steps;
    const x1 = gaugeCenterX + Math.cos(degToRad(t1)) * gaugeRadius;
    const y1 = gaugeCenterY + Math.sin(degToRad(t1)) * gaugeRadius;
    const x2 = gaugeCenterX + Math.cos(degToRad(t2)) * gaugeRadius;
    const y2 = gaugeCenterY + Math.sin(degToRad(t2)) * gaugeRadius;
    doc.setLineWidth(4);
    doc.line(x1, y1, x2, y2);
  }

  // Active arc based on score — thin, desaturated color (no loud greens/reds)
  const normalized = Math.max(0, Math.min(100, data.awScore));
  const scoreAngle = startDeg + ((endDeg - startDeg) * normalized) / 100;
  const stepsActive = Math.round((steps * normalized) / 100);
  doc.setDrawColor(...AW_COLOR.primary);
  for (let i = 0; i <= stepsActive; i++) {
    const t1 = startDeg + ((endDeg - startDeg) * i) / steps;
    const t2 = startDeg + ((endDeg - startDeg) * (i + 1)) / steps;
    const x1 = gaugeCenterX + Math.cos(degToRad(t1)) * gaugeRadius;
    const y1 = gaugeCenterY + Math.sin(degToRad(t1)) * gaugeRadius;
    const x2 = gaugeCenterX + Math.cos(degToRad(t2)) * gaugeRadius;
    const y2 = gaugeCenterY + Math.sin(degToRad(t2)) * gaugeRadius;
    doc.setLineWidth(6);
    doc.line(x1, y1, x2, y2);
  }

  // Needle (fine, horlogerie)
  const needleLength = gaugeRadius - 18;
  const needleAngleRad = degToRad(scoreAngle);
  const nx = gaugeCenterX + Math.cos(needleAngleRad) * needleLength;
  const ny = gaugeCenterY + Math.sin(needleAngleRad) * needleLength;
  doc.setDrawColor(...AW_COLOR.primary);
  doc.setLineWidth(1.2);
  doc.line(gaugeCenterX, gaugeCenterY, nx, ny);
  // Needle pivot (small circle)
  doc.setFillColor(...AW_COLOR.primary);
  doc.circle(gaugeCenterX, gaugeCenterY, 3, "F");

  // AW Score text above the gauge (CAPS fine)
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const awTitle = "AW SCORE";
  doc.text(awTitle, gaugeCenterX, gaugeCenterY - gaugeRadius - 14, { align: "center" });

  // Numeric score positioned to the right of pivot (never under needle)
  const scoreStr = String(Math.round(normalized));
  const scoreX = gaugeCenterX + (needleLength / 2) * Math.cos(needleAngleRad) + 18;
  const scoreY = gaugeCenterY + (needleLength / 2) * Math.sin(needleAngleRad) - 6;
  // subtle white pastel capsule behind number
  doc.setFillColor(255, 255, 255, 0.9 as any);
  const capsuleW = 56;
  const capsuleH = 28;
  doc.roundedRect(scoreX - 8, scoreY - 14, capsuleW, capsuleH, 6, 6, "F");
  doc.setTextColor(...AW_COLOR.primary);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(scoreStr, scoreX + 10, scoreY + 6);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("/ 100", scoreX + 36, scoreY + 6);
  doc.setTextColor(0, 0, 0);

  // Interpretation block below gauge
  const interpY = gaugeCenterY + gaugeRadius + 28;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  const interpretation = data.levelLabel || "Lecture";
  doc.text("Votre niveau actuel : " + interpretation, margin, interpY);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const noteText = "Ce score ne vous définit pas. Il reflète un état de charge mentale à un moment donné, influencé par votre contexte, votre organisation et vos sollicitations actuelles.";
  const split = doc.splitTextToSize(noteText, pageWidth - margin * 2);
  doc.text(split, margin, interpY + 18);

  // Discrete mention under gauge
  doc.setFontSize(9);
  doc.text("Outil d'auto-évaluation — ne constitue pas un diagnostic médical.", margin, interpY + 68);

  // --- PAGE 2 : AGIR ---
  doc.addPage();

  // Page 2 header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Agir — Reprendre du contrôle", margin, 64);

  // Section 1: Lecture détaillée (dimensions)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Les dimensions qui composent votre charge mentale", margin, 96);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const dims = data.dimensionScores && data.dimensionScores.length ? data.dimensionScores : [
    { key: 'cognitive', label: 'Charge cognitive', value: 0 },
    { key: 'emotionnelle', label: 'Charge émotionnelle', value: 0 },
    { key: 'organisationnelle', label: 'Charge organisationnelle', value: 0 },
    { key: 'temporelle', label: 'Pression temporelle', value: 0 },
    { key: 'ressources', label: 'Ressources & récupération', value: 0 },
  ];

  // Try to render a radar chart DOM element if present (kept secondary)
  if (typeof window !== "undefined") {
    const el = document.querySelector('.report-radar');
    if (el) {
      try {
        const canvas = await html2canvas(el as HTMLElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = (doc as any).getImageProperties(imgData);
        const imgW = 240;
        const imgH = (imgProps.height * imgW) / imgProps.width;
        doc.addImage(imgData, 'PNG', pageWidth - margin - imgW, 100, imgW, imgH);
      } catch (e) {
        // ignore and fallback to textual list
      }
    }
  }

  // Render list of dimensions with simple bars
  let listY = 120;
  const barMaxW = 260;
  dims.forEach((d) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(d.label, margin, listY);

    // Modern gauge design with reduced size and red-to-green gradient
    const barX = margin;
    const barY = listY + 6;
    const value = typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0; // Ensure valid value
    const clampedValue = Math.max(0, Math.min(100, value)); // Clamp value between 0 and 100

    // Draw modern arc-based gauge
    const centerX = barX + barMaxW / 2;
    const centerY = barY + 10; // Reduced size
    const radius = 7.5; // Half the original radius
    const startAngle = Math.PI; // 180 degrees
    const endAngle = startAngle + (Math.PI * clampedValue) / 100; // Map value to angle

    // Background arc
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(2);
    (doc as any).arc(centerX, centerY, radius, startAngle, Math.PI * 2, false);

    // Value arc
    if (clampedValue > 0) {
      const gradientColor: [number, number, number] = clampedValue < 50 ? [255, 0, 0] : [0, 128, 0]; // Red to green
      doc.setDrawColor(gradientColor[0], gradientColor[1], gradientColor[2]);
      (doc as any).arc(centerX, centerY, radius, startAngle, endAngle, false);
    }

    // Value text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8); // Smaller font size
    doc.setTextColor(0, 128, 0);
    doc.text(`${clampedValue}%`, centerX, centerY + 3, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    listY += 20; // Adjust spacing for reduced size
  });

  // Section 2: Actions concrètes
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Premières pistes simples et accessibles", margin, listY + 6);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const actions = [
    "Identifier une sollicitation à alléger",
    "Clarifier une priorité réelle",
    "Introduire un temps de récupération",
    "Mettre des mots sur une difficulté",
  ];
  let ay = listY + 28;
  actions.slice(0, 5).forEach((a, i) => {
    doc.text(`- ${a}`, margin, ay);
    ay += 18;
  });

  // Section 3: Continuité AW (valeur, non commerciale agressive)
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Continuité AW", margin, ay + 8);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const cont = "AW Conseil et Formation accompagne les personnes et les organisations dans la compréhension, la prévention et la réduction durable de la charge mentale, à travers le conseil, la formation, les ateliers et des outils structurants.";
  const chunks = doc.splitTextToSize(cont, pageWidth - margin * 2);
  doc.text(chunks, margin, ay + 28);

  // Footer: mentions légales + contacts
  const footerY = pageHeight - 88;
  doc.setFontSize(9);
  doc.setTextColor(...AW_COLOR.accent);
  doc.text("Ce test est un outil d'auto-évaluation. Il ne remplace pas un avis médical. En cas de détresse importante ou persistante, consultez un professionnel de santé.", margin, footerY, { maxWidth: pageWidth - margin * 2 });
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(10);
  doc.text("AW Conseil et Formation", margin, footerY + 30);
  doc.text("Tél : ", margin + 220, footerY + 30);
  doc.text("Email : contact@aw-conseil-formation.fr", margin, footerY + 46);
  doc.text("Site : https://aw-conseil-formation.fr", margin, footerY + 62);

  const fileName = `AW_Score_Rapport_Charge_Mentale_${date}.pdf`;
  const blob = doc.output("blob");
  return { blob, fileName };
}
