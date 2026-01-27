Tests manuels — PDF & partage

But : vérification fonctionnelle du bouton "Télécharger mon rapport (PDF)" et du bouton "Partager mes résultats"; validation de la nouvelle UI de la jauge.

Prérequis
- Démarrer le projet en local :

```bash
cd /workspaces/aw-conseil-formation-website
npm install
npm run dev
```

- Ouvrir : http://localhost:3000 et naviguer jusqu'à la page « Vos résultats » (parcours du quiz).

Scénarios de test

1) Téléchargement PDF (desktop)
- Cliquer sur `Télécharger mon rapport (PDF)`.
- Résultat attendu : le fichier `AW_Score_Rapport_Charge_Mentale_YYYY-MM-DD.pdf` est téléchargé.
- Vérifier : logo présent, titre, date, score global et niveau, bloc conseils, mention "Outil d'auto-évaluation — non diagnostic".

2) Partage (mobile recommandé)
- Sur un appareil mobile (ou navigateur qui supporte Web Share), cliquer `Partager mes résultats`.
- Si `navigator.share` supporte les fichiers, la fenêtre native doit proposer Mail/WhatsApp/Messages et joindre le PDF.
- Fallback : si non supporté, le PDF est téléchargé et un `mailto:` pré-rempli s'ouvre.

3) Varying scores
- Générer des cas low/mid/high (ex : 10, 45, 85) et vérifier :
  - Le texte de niveau (Charge légère / modérée / élevée / Surcharge critique) correspond.
  - Le PDF reprend la valeur et le label corrects.

4) Jauge UI
- Vérifier la présence de `AW Score` au-dessus de la jauge.
- Vérifier que la valeur numérique est décalée sur le côté du pivot (ne chevauche pas l'aiguille).
- Vérifier la mention sous la jauge : "Outil d'auto-évaluation — ne constitue pas un diagnostic médical."
- Accessibilité : inspecter le `aria-label` du score dans la jauge.

5) Radar / profil détaillé dans le PDF
- Sur la page résultats, vérifier que le graphique radar a la classe `report-radar` (utilisé pour exporter l'image).
- Vérifier que le rendu du radar apparaît dans le PDF (si présent dans la page).

Checks supplémentaires
- Mobile : test sur Android et iOS (Safari/Chrome) pour valider `navigator.share`.
- Desktop : vérifier comportement fallback (téléchargement + mailto).

Bugs fréquents et solutions rapides
- Logo absent : vérifier que `/public/logo-aw.png` existe. Le PDF ignore l'erreur et continue.
- Radar non inclus : s'assurer que le radar DOM a la classe `report-radar` et est visible au moment du clic.
- Partage natif refusé : certains navigateurs desktop n'autorisent pas le partage de fichiers.

Prochaines étapes recommandées
- Intégrer police Inter dans le PDF (embedding) pour cohérence typographique.
  - Pour que le PDF embarque réellement `Inter`, placez le fichier TTF suivant dans `public/fonts/` :
    - `Inter-Regular.ttf`
  - Exemple : `public/fonts/Inter-Regular.ttf`.
  - Si le fichier n'est pas présent, le générateur utilisera `Helvetica` en fallback.
- Option serveur pour générer un lien partageable (upload + URL temporaire).
- Tests sur appareils réels et vérification des permissions mail.

Fichiers modifiés
- `components/barometre/Barometer.tsx`
- `components/barometre/Results.tsx`
- `components/barometre/generateReport.ts`

Si vous voulez, je peux maintenant :
- intégrer la police `Inter` dans le PDF, ou
- ajouter une route `/api/report` pour renvoyer une URL partageable.
