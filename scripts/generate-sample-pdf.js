const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>AW PDF Generator</title>
    <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  </head>
  <body>
    <script>
      const { jsPDF } = window.jspdf;
      function degToRad(deg){return deg*Math.PI/180}
      async function generateSample(data){
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 48;
        const AW_PRIMARY = [34,40,49];
        const AW_ACC = [88,101,115];

        // Header
        doc.setFontSize(12);
        doc.text(data.date, pageWidth - margin, 54, { align: 'right' });
        doc.setFontSize(18); doc.setFont(undefined, 'bold');
        doc.text('Votre lecture de charge mentale — AW Score', pageWidth/2, 74, { align: 'center' });
        doc.setFontSize(10); doc.setFont(undefined,'normal');
        doc.setTextColor(AW_ACC[0],AW_ACC[1],AW_ACC[2]);
        doc.text("Une photographie de votre charge mentale à l'instant T", pageWidth/2, 92, { align: 'center' });
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

        // AW SCORE title
        doc.setFontSize(10); doc.setFont(undefined,'normal');
        doc.text('AW SCORE', gaugeCenterX, gaugeCenterY - gaugeRadius - 14, { align: 'center' });

        // numeric score right of pivot
        const scoreStr = String(Math.round(normalized));
        const scoreX = gaugeCenterX + (needleLength/2)*Math.cos(needleAngleRad) + 18;
        const scoreY = gaugeCenterY + (needleLength/2)*Math.sin(needleAngleRad) - 6;
        // capsule
        doc.setFillColor(255,255,255);
        doc.roundedRect(scoreX-8, scoreY-14, 56, 28, 6, 6, 'F');
        doc.setTextColor(AW_PRIMARY[0],AW_PRIMARY[1],AW_PRIMARY[2]);
        doc.setFontSize(24); doc.setFont(undefined,'bold');
        doc.text(scoreStr, scoreX+10, scoreY+6);
        doc.setFontSize(10); doc.setFont(undefined,'normal');
        doc.text('/ 100', scoreX+36, scoreY+6);
        doc.setTextColor(0,0,0);

        // interpretation
        doc.setFontSize(12); doc.setFont(undefined,'bold');
        doc.text('Votre niveau actuel : ' + (data.levelLabel||'Lecture'), margin, gaugeCenterY + gaugeRadius + 28);
        doc.setFontSize(10); doc.setFont(undefined,'normal');
        const note = "Ce score ne vous définit pas. Il reflète un état de charge mentale à un moment donné, influencé par votre contexte, votre organisation et vos sollicitations actuelles.";
        doc.text(doc.splitTextToSize(note, pageWidth - margin*2), margin, gaugeCenterY + gaugeRadius + 46);

        // discrete mention
        doc.setFontSize(9);
        doc.text("Outil d'auto-évaluation — ne constitue pas une analyse médicale.", margin, gaugeCenterY + gaugeRadius + 120);

        // page 2
        doc.addPage();
        doc.setFontSize(16); doc.setFont(undefined,'bold');
        doc.text('Agir — Reprendre du contrôle', margin, 64);
        doc.setFontSize(12); doc.setFont(undefined,'bold');
        doc.text('Les dimensions qui composent votre charge mentale', margin, 96);
        doc.setFontSize(10); doc.setFont(undefined,'normal');
        const dims = data.dimensionScores || [
          {label:'Charge cognitive', value:23},
          {label:'Charge émotionnelle', value:45},
          {label:'Charge organisationnelle', value:30},
          {label:'Pression temporelle', value:55},
          {label:'Ressources & récupération', value:40}
        ];
        let listY = 120; const barMaxW = 260;
        dims.forEach(d=>{
          doc.setFont(undefined,'bold'); doc.text(d.label, margin, listY);
          const barX = margin; const barY = listY + 6;
          doc.setFillColor(235,236,238); doc.rect(barX,barY,barMaxW,9,'F');
          const w = (Math.max(0,Math.min(100,d.value))/100)*barMaxW;
          doc.setFillColor(AW_PRIMARY[0],AW_PRIMARY[1],AW_PRIMARY[2]); doc.rect(barX,barY,w,9,'F');
          doc.setFont(undefined,'normal'); doc.text(String(Math.round(d.value)), barX + barMaxW + 8, barY + 8);
          listY += 28;
        });

        // actions
        doc.setFontSize(12); doc.setFont(undefined,'bold'); doc.text('Premières pistes simples et accessibles', margin, listY + 6);
        doc.setFontSize(10); doc.setFont(undefined,'normal');
        const actions = ['Identifier une sollicitation à alléger','Clarifier une priorité réelle','Introduire un temps de récupération','Mettre des mots sur une difficulté'];
        let ay = listY + 28; actions.forEach(a=>{doc.text('- ' + a, margin, ay); ay+=18});

        // continuity
        doc.setFontSize(11); doc.setFont(undefined,'bold'); doc.text('Continuité AW', margin, ay + 8);
        doc.setFontSize(10); doc.setFont(undefined,'normal');
        const cont = 'AW Conseil et Formation accompagne les personnes et les organisations dans la compréhension, la prévention et la réduction durable de la charge mentale, à travers le conseil, la formation, les ateliers et des outils structurants.';
        doc.text(doc.splitTextToSize(cont, pageWidth - margin*2), margin, ay + 28);

        // footer
        const footerY = pageHeight - 88;
        doc.setFontSize(9); doc.setTextColor(AW_ACC[0],AW_ACC[1],AW_ACC[2]);
        doc.text('Ce test est un outil d\'auto-évaluation. Il ne remplace pas un avis médical. En cas de détresse importante ou persistante, consultez un professionnel de santé.', margin, footerY, { maxWidth: pageWidth - margin*2 });
        doc.setTextColor(0,0,0);
        doc.setFontSize(10);
        doc.text('AW Conseil et Formation', margin, footerY + 30);
        doc.text('Email : contact@aw-conseil-formation.fr', margin, footerY + 46);
        doc.text('Site : https://aw-conseil-formation.fr', margin, footerY + 62);

        // return as base64
        const dataUri = doc.output('datauristring');
        // datauristring is like data:application/pdf;base64,....
        const base64 = dataUri.split(',')[1];
        return base64;
      }

      window.generateSample = generateSample;
    </script>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const sampleData = {
    awScore: 37,
    date: new Date().toISOString().slice(0,10),
    levelLabel: 'Modéré',
    dimensionScores: [
      {label:'Charge cognitive', value:37},
      {label:'Charge émotionnelle', value:42},
      {label:'Charge organisationnelle', value:28},
      {label:'Pression temporelle', value:51},
      {label:'Ressources & récupération', value:33}
    ]
  };

  const base64 = await page.evaluate(async (d)=>{
    return await window.generateSample(d);
  }, sampleData);

  const buffer = Buffer.from(base64, 'base64');
  const outPath = path.join(process.cwd(), 'AW_Score_Sample.pdf');
  fs.writeFileSync(outPath, buffer);
  console.log('PDF généré:', outPath);

  await browser.close();
})();
