import React from "react";
import Head from "next/head";

export const metadata = {
  title: "Dr Yacine Mahi Bahi Amar - Référent Scientifique | AW Conseil Formation",
  description: "Psychiatre et Addictologue, spécialiste TDAH tous âges, expert médico-légale. Cabinet libéral à Cannes. Certifications internationales APA, WFADHD.",
  keywords: "Dr Yacine Mahi Bahi Amar, Psychiatre, Addictologue, TDAH, Expertise médico-légale, Cabinet Cannes, APA, WFADHD, Formation Européenne, Formation Nord-Américaine",
  authors: [{ name: "Dr Yacine Mahi Bahi Amar" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function DrMahiBahiPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="viewport" content={metadata.viewport} />
        <meta name="robots" content={metadata.robots} />
      </Head>
      <main className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-16 pb-12 text-center border-b border-gray-300">
          <h1 className="text-4xl font-extrabold mb-2">Dr Yacine Mahi Bahi Amar</h1>
          <p className="text-xl font-semibold text-red-600">Référent Scientifique</p>
        </section>

        {/* Présentation de son rôle */}
        <section className="max-w-4xl mx-auto py-12">
          <h2 className="text-2xl font-bold mb-4">Son rôle</h2>
          <p className="text-base leading-relaxed">
            En tant que Référent Scientifique, le Dr Yacine Mahi Bahi Amar apporte son expertise pointue en psychiatrie et addictologie pour garantir la qualité scientifique des formations et interventions proposées par AW Conseil Formation.
          </p>
        </section>

        {/* Parcours et formation */}
        <section className="max-w-4xl mx-auto py-12 border-t border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Parcours et formation</h2>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>Psychiatre et Addictologue</li>
            <li>Diplômé de la Faculté de Médecine de Paris</li>
            <li>Certifications internationales APA, WFADHD</li>
            <li>Formations européennes et nord-américaines</li>
            <li>Expérience hospitalière au Centre Hospitalier Jacques Monod et Centre Hospitalier de Thiers</li>
            <li>Cabinet libéral à Cannes</li>
          </ul>
        </section>

        {/* Expertise et spécialisations */}
        <section className="max-w-4xl mx-auto py-12 border-t border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Expertise et spécialisations</h2>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>Spécialiste du TDAH tous âges</li>
            <li>Expertise médico-légale</li>
          </ul>
        </section>

        {/* Disclaimer important */}
        <section className="max-w-4xl mx-auto py-12 border-t border-gray-300 bg-gray-50 p-6 rounded">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Important</h2>
          <p className="text-sm leading-relaxed">
            Cette page ne propose pas de soins, de diagnostics ou de suivi individuel. Pour toute prise en charge médicale, veuillez consulter un professionnel de santé.
          </p>
        </section>

        {/* Interventions et vidéos (à venir) */}
        <section className="max-w-4xl mx-auto py-12 border-t border-gray-300 text-center">
          <h2 className="text-2xl font-bold mb-4">Interventions et vidéos (à venir)</h2>
          <p className="text-base leading-relaxed text-gray-600">Contenu en cours de préparation.</p>
        </section>

        {/* CTA Prendre un temps d'échange */}
        <section className="max-w-4xl mx-auto py-12 border-t border-gray-300 text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
            Prendre un temps d'échange
          </button>
        </section>
      </main>
    </>
  );
}
