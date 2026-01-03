import React from 'react';

export const metadata = {
  title: "Dr Mahi Bahi - Yacine Mahi Bahi Amar",
  description: "Page officielle du Dr Yacine Mahi Bahi Amar, expert en conseil et formation.",
  keywords: ['Dr Mahi Bahi', 'Yacine Mahi Bahi Amar', 'Conseil', 'Formation'],
};

export default function DrMahiBahiPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#003366' }}>Dr Yacine Mahi Bahi Amar</h1>
      <p><strong>Expert en conseil et formation</strong></p>
      <section>
        <h2>À propos</h2>
        <p>Le Dr Yacine Mahi Bahi Amar est un expert reconnu dans le domaine du conseil et de la formation. Avec plusieurs années d'expérience, il accompagne les professionnels et les entreprises dans leur développement.</p>
      </section>
      <section>
        <h2>Compétences</h2>
        <ul>
          <li>Conseil stratégique</li>
          <li>Formation professionnelle</li>
          <li>Accompagnement personnalisé</li>
          <li>Développement des compétences</li>
        </ul>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Pour toute demande de conseil ou formation, veuillez contacter le Dr Mahi Bahi via le formulaire de contact du site.</p>
      </section>
    </main>
  );
}
