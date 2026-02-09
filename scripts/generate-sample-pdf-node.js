const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

function degToRad(deg){ return deg * Math.PI / 180; }

function loadImageDataUrl(filePath){
  try{
    const buf = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.png' ? 'png' : 'jpeg';
    return `data:image/${mime};base64,` + buf.toString('base64');
  }catch(e){
    return null;
  }
}

function generateSync(data, options = {}){
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const AW_PRIMARY = [34,40,49];
  const AW_ACC = [88,101,115];

  // Header
  doc.setFontSize(12);
  doc.text(data.date, pageWidth - margin, 54, { align: 'right' });
  // optional logo (look for common locations)
  const logoPaths = [
    path.join(process.cwd(),'public','logo.png'),
    path.join(process.cwd(),'public','logo.jpg'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
    path.join(process.cwd(),'public','logo aw score.png'),
    path.join(process.cwd(),'public','logo-aw.png'),
  ];
  let logoData = null; let logoType = null;
  for(const p of logoPaths){ const d = loadImageDataUrl(p); if(d){ logoData = d; logoType = path.extname(p).toLowerCase(); break; } }
  if(logoData){
    try{
      const logoW = options.logoWidth || 84;
      const logoH = options.logoHeight || 28;
      // left
      doc.addImage(logoData, logoType === '.png' ? 'PNG' : 'JPEG', margin, 18, logoW, logoH);
      // right
      const rx = pageWidth - margin - logoW;
      doc.addImage(logoData, logoType === '.png' ? 'PNG' : 'JPEG', rx, 18, logoW, logoH);
    }catch(e){ }
  }
  const reportType = (data && data.reportType) ? String(data.reportType) : 'aw-score';
  const title = reportType === 'meteo-collective'
    ? 'Météo collective — observation collective'
    : 'Votre lecture de charge mentale — AW Score';

  doc.setFontSize(18); doc.setFont(undefined, 'bold');
  doc.text(title, pageWidth/2, 74, { align: 'center' });
  doc.setFontSize(10); doc.setFont(undefined,'normal');
  doc.setTextColor(AW_ACC[0],AW_ACC[1],AW_ACC[2]);
  doc.text(reportType === 'meteo-collective'
    ? "Un repère simple pour objectiver une tendance collective"
    : "Une photographie de votre charge mentale à l'instant T",
    pageWidth/2,
    92,
    { align: 'center' }
  );
  doc.setTextColor(0,0,0);

  const gaugeCenterX = pageWidth/2; const gaugeCenterY = 220; const gaugeRadius=110;
  const startDeg = 200; const endDeg = 340; const steps = 120;
  doc.setLineWidth(4);
  // background arc
  doc.setDrawColor(200,204,209);
  for(let i=0;i<=steps;i++){
    const t1 = startDeg + ((endDeg-startDeg)*i)/steps;
    const t2 = startDeg + ((endDeg-startDeg)*(i+1))/steps;
    const x1 = gaugeCenterX + Math.cos(degToRad(t1))*gaugeRadius;
    const y1 = gaugeCenterY + Math.sin(degToRad(t1))*gaugeRadius;
    const x2 = gaugeCenterX + Math.cos(degToRad(t2))*gaugeRadius;
    const y2 = gaugeCenterY + Math.sin(degToRad(t2))*gaugeRadius;
    doc.line(x1,y1,x2,y2);
  }
  // active arc
  const normalized = Math.max(0,Math.min(100,data.awScore));
  const stepsActive = Math.round((steps*normalized)/100);
  doc.setDrawColor(AW_PRIMARY[0],AW_PRIMARY[1],AW_PRIMARY[2]);
  for(let i=0;i<=stepsActive;i++){
    const t1 = startDeg + ((endDeg-startDeg)*i)/steps;
    const t2 = startDeg + ((endDeg-startDeg)*(i+1))/steps;
    const x1 = gaugeCenterX + Math.cos(degToRad(t1))*gaugeRadius;
    const y1 = gaugeCenterY + Math.sin(degToRad(t1))*gaugeRadius;
    const x2 = gaugeCenterX + Math.cos(degToRad(t2))*gaugeRadius;
    const y2 = gaugeCenterY + Math.sin(degToRad(t2))*gaugeRadius;
    doc.setLineWidth(6);
    doc.line(x1,y1,x2,y2);
  }
  // needle
  const scoreAngle = startDeg + ((endDeg-startDeg)*normalized)/100;
  const needleAngleRad = degToRad(scoreAngle);
  const needleLength = gaugeRadius - 18;
  const nx = gaugeCenterX + Math.cos(needleAngleRad)*needleLength;
  const ny = gaugeCenterY + Math.sin(needleAngleRad)*needleLength;
  doc.setLineWidth(1.2); doc.setDrawColor(AW_PRIMARY[0],AW_PRIMARY[1],AW_PRIMARY[2]);
  doc.line(gaugeCenterX,gaugeCenterY,nx,ny);
  doc.setFillColor(AW_PRIMARY[0],AW_PRIMARY[1],AW_PRIMARY[2]);
  doc.circle(gaugeCenterX,gaugeCenterY,3,'F');

  // numeric score - centered in the gauge (larger)
  const scoreStr = String(Math.round(normalized));
  doc.setTextColor(AW_PRIMARY[0],AW_PRIMARY[1],AW_PRIMARY[2]);
  doc.setFontSize(40); doc.setFont(undefined,'bold');
  doc.text(scoreStr, gaugeCenterX, gaugeCenterY + 12, { align: 'center' });
  doc.setFontSize(12); doc.setFont(undefined,'normal');
  doc.text('/ 100', gaugeCenterX + 48, gaugeCenterY + 8);
  doc.setTextColor(0,0,0);

  // Notices (neutral vocabulary)
  const showDisclaimer = (typeof options.showDisclaimer === 'boolean')
    ? options.showDisclaimer
    : (typeof options.showMedicalNotice === 'boolean' ? options.showMedicalNotice : true);

  const showNonIndividualNotice = !!options.showNonIndividualNotice;
  const includeNoDataStoredNotice = !!options.includeNoDataStoredNotice;

  if(showDisclaimer || showNonIndividualNotice || includeNoDataStoredNotice){
    const boxX = margin;
    const boxY = 100;
    const boxW = pageWidth - margin*2;
    const lines = [];
    if(showNonIndividualNotice){
      lines.push("Observation collective — ce document n'est pas une évaluation individuelle.");
    }
    if(includeNoDataStoredNotice){
      lines.push("Aucune donnée personnelle n'est collectée ni stockée.");
    }
    if(showDisclaimer && !showNonIndividualNotice){
      lines.push("Document d'information : il sert de repère, pas de verdict.");
    }

    doc.setFillColor(248, 248, 248);
    doc.setDrawColor(210,210,210);
    doc.setLineWidth(1);
    const text = doc.splitTextToSize(lines.join(' '), boxW - 24);
    const boxH = Math.max(44, 18 + (text.length * 12) + 10);
    doc.roundedRect(boxX, boxY, boxW, boxH, 6, 6, 'FD');
    doc.setFontSize(9); doc.setFont(undefined,'normal');
    doc.setTextColor(34,40,49);
    doc.text(text, boxX + 12, boxY + 18);
    doc.setTextColor(0,0,0);
  }
  doc.setFontSize(12); doc.setFont(undefined,'bold');
  doc.text('Votre niveau actuel : ' + (data.levelLabel||'Lecture'), margin, gaugeCenterY + gaugeRadius + 28);
  doc.setFontSize(10); doc.setFont(undefined,'normal');
  const note = reportType === 'meteo-collective'
    ? "Ce repère aide à ouvrir une discussion collective sur l'organisation et les sollicitations."
    : "Ce score ne vous définit pas. Il reflète un état de charge mentale à un moment donné, influencé par votre contexte, votre organisation et vos sollicitations actuelles.";
  doc.text(doc.splitTextToSize(note, pageWidth - margin*2), margin, gaugeCenterY + gaugeRadius + 46);
  doc.setFontSize(10);
  doc.text(
    reportType === 'meteo-collective'
      ? "Rappel : ce document n'est pas une évaluation individuelle."
      : "Rappel : ce document est un outil de repérage et de réflexion. Il ne remplace pas un échange professionnel.",
    margin,
    gaugeCenterY + gaugeRadius + 120,
    { maxWidth: pageWidth - margin*2 }
  );

  // page 2
  const footerY = pageHeight - 88;
  doc.setFontSize(9); doc.setTextColor(AW_ACC[0],AW_ACC[1],AW_ACC[2]);
  doc.text(
    reportType === 'meteo-collective'
      ? "Aucune donnée personnelle n'est collectée ni stockée."
      : "Outil d'auto-évaluation : il sert de repère et de réflexion.",
    margin,
    footerY,
    { maxWidth: pageWidth - margin*2 }
  );
  doc.setTextColor(0,0,0);
  doc.setFontSize(10);
  doc.text('AW Conseil et Formation', margin, footerY + 30);
  doc.text('Email : contact@aw-conseil-formation.fr', margin, footerY + 46);
  doc.text('Site : https://aw-conseil-formation.fr', margin, footerY + 62);

  const arrayBuf = doc.output('arraybuffer');
  return Buffer.from(arrayBuf);
}

module.exports = { generateSync };

// If executed directly, generate a sample PDF
if(require.main === module){
  const sample = {
    awScore: 37,
    date: new Date().toISOString().slice(0,10),
    levelLabel: 'Modéré',
    reportType: 'aw-score',
    dimensionScores: [
      {label:'Charge cognitive', value:37},
      {label:'Charge émotionnelle', value:42},
      {label:'Charge organisationnelle', value:28},
      {label:'Pression temporelle', value:51},
      {label:'Ressources & récupération', value:33}
    ]
  };
  const buffer = generateSync(sample, { showDisclaimer: true });
  const outPath = path.join(process.cwd(), 'AW_Score_Sample_Node.pdf');
  fs.writeFileSync(outPath, buffer);
  console.log('PDF généré (node):', outPath);
}
