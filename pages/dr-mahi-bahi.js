import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DrMahiBahi() {
  return (
    <>
      <Head>
        <title>Dr Mahi Bahi - AW Conseil Formation</title>
        <meta name="description" content="Découvrez le Dr Mahi Bahi, référent chez AW Conseil Formation. Pas de soins, diagnostics ou suivi individuel. Prenez un temps d'échange." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <main style={{ fontFamily: 'Arial, sans-serif', color: '#000', backgroundColor: '#fff', minHeight: '100vh' }}>
        <section
          aria-label="Présentation du Dr Mahi Bahi"
          style={{ padding: '4rem 1rem', textAlign: 'center', borderBottom: '2px solid #e00' }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dr Mahi Bahi</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
            Référent chez AW Conseil Formation, engagé à vous accompagner avec bienveillance et expertise.
          </p>
        </section>

        <section
          aria-label="Rôle de référent"
          style={{ padding: '2rem 1rem', maxWidth: '700px', margin: '2rem auto', color: '#222' }}
        >
          <h2 style={{ color: '#e00', fontSize: '1.75rem', marginBottom: '1rem' }}>Son rôle de référent</h2>
          <p>
            Le Dr Mahi Bahi est votre interlocuteur privilégié pour toute question liée à nos formations. Il vous guide avec écoute et respect, sans jugement ni médicalisation.
          </p>
        </section>

        <section
          aria-label="Disclaimer"
          style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', maxWidth: '700px', margin: '2rem auto', border: '1px solid #ccc', borderRadius: '4px', color: '#555' }}
        >
          <h3 style={{ color: '#e00', marginBottom: '0.5rem' }}>Important</h3>
          <p>
            Cette page ne propose aucun soin, diagnostic ou suivi individuel. Pour toute question médicale, veuillez consulter un professionnel de santé.
          </p>
        </section>

        <section
          aria-label="Interventions à venir"
          style={{ padding: '2rem 1rem', maxWidth: '700px', margin: '2rem auto' }}
        >
          <h2 style={{ color: '#e00', fontSize: '1.75rem', marginBottom: '1rem' }}>Interventions à venir</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#000' }}>
            <li>Atelier sur la communication bienveillante - 15 juillet 2024</li>
            <li>Session de formation sur la gestion du stress - 10 août 2024</li>
            <li>Webinaire sur l'accompagnement des équipes - 5 septembre 2024</li>
          </ul>
        </section>

        <section
          aria-label="Appel à l'action"
          style={{ textAlign: 'center', margin: '3rem 1rem' }}
        >
          <button
            style={{
              backgroundColor: '#e00',
              color: '#fff',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.25rem',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => alert('Merci de prendre contact pour un temps d\'échange.')}
          >
            Prendre un temps d'échange
          </button>
        </section>
      </main>
      <Footer />
      <style jsx>{`
        @media (max-width: 600px) {
          main {
            padding: 0 1rem;
          }
          h1 {
            font-size: 2rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
          button {
            width: 100%;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
