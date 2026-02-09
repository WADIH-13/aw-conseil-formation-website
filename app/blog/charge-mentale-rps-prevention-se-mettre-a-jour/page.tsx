import Link from 'next/link'

export const metadata = {
  title: 'Charge mentale et RPS : pourquoi la prévention doit se mettre à jour - AW Conseil et Formation',
  description:
    "Charge mentale, RPS et prévention organisationnelle : repères pour comprendre l’évolution des pratiques, éviter les approches obsolètes et structurer une mise à jour utile.",
}

export default function ArticleChargeMentaleRpsPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Blog · Analyses & décryptages</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-light text-black leading-tight">
              Charge mentale et RPS : pourquoi la prévention doit se mettre à jour
            </h1>
            <p className="mt-7 text-lg md:text-xl text-gray-600 leading-relaxed">
              Les organisations changent vite. Les risques psychosociaux aussi — pas parce que les personnes « changent »,
              mais parce que les contraintes, les arbitrages et les formes de coopération évoluent.
            </p>
            <p className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed">
              Cet article propose des repères sobres pour relire la charge mentale et les RPS à l’échelle du travail réel,
              et pour comprendre pourquoi « rester à jour » est devenu un geste de prévention à part entière.
            </p>
          </div>
        </div>
      </section>

      <main className="container-custom py-14 md:py-18">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">1) Les RPS relèvent de l’organisation du travail</h2>
            <p className="text-gray-700 leading-relaxed">
              Parler de charge mentale, c’est souvent parler de surcharge « dans la tête ». Pourtant, dans une logique de
              prévention, la question centrale n’est pas individuelle : elle est organisationnelle.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La charge mentale augmente lorsque le système de travail multiplie les situations qui obligent à tenir «
              trop de choses à la fois » : arbitrer en permanence, rattraper des priorités mouvantes, gérer des
              interruptions, compenser des interfaces mal calées, absorber des urgences récurrentes.
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Repères concrets</p>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Dans les faits, la charge mentale s’enracine fréquemment dans des choix de fonctionnement.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Objectifs nombreux, simultanés, parfois contradictoires.</li>
                <li>Rôles et responsabilités flous, circuits de décision incertains.</li>
                <li>Outils et flux d’information qui fragmentent l’attention (multi-canaux, notifications, urgences).</li>
                <li>Interfaces mal stabilisées : qui fait quoi, à quel moment, avec quelles données.</li>
                <li>Manque de marges de manœuvre : peu de temps pour préparer, prioriser, consolider.</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Une lecture collective et structurelle permet d’éviter deux pièges : réduire la prévention à des conseils
              d’« hygiène personnelle » et ignorer les facteurs de risque situés dans l’organisation du travail.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">
              2) Information et formation : des leviers majeurs de prévention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Dans une démarche de prévention des RPS, l’information et la formation ne sont pas des « à-côtés ».
              Ce sont des leviers structurants : ils installent un langage commun, une compréhension partagée et une
              capacité collective à agir.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Elles contribuent à rendre visibles des mécanismes souvent banalisés : surcharge chronique, injonctions
              paradoxales, interruptions, conflits de priorités, perte de sens des arbitrages. Sans repères partagés,
              chacun improvise — et la prévention devient inégale.
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7 space-y-4">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Une place logique dans la prévention</p>
              <p className="text-gray-700 leading-relaxed">
                Les principes généraux de prévention invitent à agir de manière structurée : éviter le risque lorsque
                c’est possible, combattre à la source, adapter le travail, planifier la prévention.
              </p>
              <p className="text-gray-700 leading-relaxed">
                L’information et la formation soutiennent ces principes, car elles permettent notamment :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>d’aligner les acteurs (direction, RH, managers, équipes, représentants du personnel) sur des repères communs ;</li>
                <li>de relier les situations de travail à des facteurs de risque identifiables, plutôt qu’à des interprétations isolées ;</li>
                <li>de choisir des actions proportionnées, cohérentes et suivies dans le temps.</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Dit autrement : une organisation qui s’informe et se forme sérieusement se donne les moyens de mieux
              prioriser, de mieux discuter le travail, et de mieux stabiliser des solutions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">3) Le risque de pratiques obsolètes</h2>
            <p className="text-gray-700 leading-relaxed">
              Les contextes de travail évoluent rapidement : intensification des sollicitations, transformations des
              métiers, hybridation des collectifs, dépendance accrue aux outils numériques, exigences de traçabilité,
              interfaces multi-acteurs plus complexes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Dans ce mouvement, des approches non actualisées perdent en efficacité. Le risque n’est pas de « mal faire
              volontairement » ; le risque est de rester figé dans des réponses qui ne correspondent plus au réel.
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Signaux fréquents</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Actions centrées sur l’individu alors que les causes sont majoritairement organisationnelles.</li>
                <li>Prévention réduite à des messages généraux, sans analyse du travail réel.</li>
                <li>Plans d’action sans priorisation, sans responsables, sans calendrier, sans suivi.</li>
                <li>Formation « ponctuelle » sans appropriation durable par les managers et les équipes.</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Lorsque les pratiques ne sont pas réinterrogées, on mobilise de l’énergie — mais on obtient peu d’effets.
              Et ce décalage finit par fragiliser la confiance dans la prévention elle-même.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">4) Ce que montre l’expérience de terrain</h2>
            <p className="text-gray-700 leading-relaxed">
              En posture de cabinet de conseil et de formation, nous observons un phénomène récurrent : les obligations
              sont connues « sur le papier », mais la traduction opérationnelle reste difficile.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le décalage se manifeste par exemple lorsque les équipes disposent d’outils (documents, procédures,
              instances, chartes) mais peinent à les relier aux situations de travail qui font réellement monter la
              charge mentale.
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Constats typiques</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Des priorités qui changent plus vite que la capacité à se réorganiser.</li>
                <li>Des managers pris entre exigences de production et régulation du collectif.</li>
                <li>Des interfaces (métiers, fonctions support, prestataires) qui créent des points de friction durables.</li>
                <li>Une difficulté à objectiver le travail réel : ce qui se fait, ce qui se rattrape, ce qui se compense.</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Dans ce contexte, le besoin n’est pas seulement « d’ajouter une action ». Il est souvent de remettre à plat
              des repères, de clarifier les mécanismes et de redonner des marges de manœuvre. Cela suppose une
              actualisation : des sources, des méthodes, et des manières d’en parler.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Conclusion – Le bon moment pour se mettre à jour</h2>
            <p className="text-gray-700 leading-relaxed">
              Se mettre à jour n’est pas une remise en cause. C’est une opportunité : clarifier ce qui a changé,
              distinguer l’essentiel de l’accessoire, et choisir des actions plus cohérentes avec le travail réel.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le bon moment compte : lorsque les organisations évoluent vite, une veille structurée et des analyses
              éclairées deviennent des outils de pilotage. Elles permettent de sécuriser les messages, d’éviter les
              réponses automatiques, et de renforcer la prévention organisationnelle.
            </p>

            <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-6 md:p-7">
              <p className="text-gray-700 leading-relaxed">
                Pour prolonger ces repères, vous pouvez consulter{' '}
                <Link href="/veille-actualites-scientifiques" className="underline underline-offset-4 text-black/80 hover:text-black">
                  notre espace de veille scientifique
                </Link>
                , qui rassemble des notes et actualités issues de sources institutionnelles et scientifiques.
              </p>
            </div>
          </section>

          <section className="text-sm text-black/60 leading-relaxed">
            <p>
              <strong className="text-black/70 font-medium">Sources d’inspiration</strong> — Cet article s’inscrit dans la continuité de
              travaux et publications de référence sur la prévention des risques psychosociaux, notamment ceux diffusés
              par l’INRS. Les organismes cités sont mentionnés comme repères et sources d’inspiration ; aucune validation
              institutionnelle ni partenariat n’est revendiqué.
            </p>
          </section>

          <div className="pt-4">
            <Link href="/blog" className="text-sm font-medium text-aw-red hover:text-red-700">
              ← Retour au blog
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
