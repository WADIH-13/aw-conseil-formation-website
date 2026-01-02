import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DrMahiBahi() {
  return (
    <>
      <Head>
        <title>Dr Mahi Bahi - Référent Scientifique | AW Conseil et Formation</title>
        <meta name="description" content="Découvrez le Dr Mahi Bahi, référent scientifique d'AW Conseil et Formation. Un regard expert et humain sur nos formations professionnelles." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-8 leading-tight">
              Dr Mahi Bahi
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Référent Scientifique
            </p>
          </div>
        </section>

        {/* Présentation */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <div className="space-y-8 text-lg leading-relaxed text-gray-700">
            <p>
              Le Dr Mahi Bahi apporte son expertise et son regard scientifique à nos formations, 
              enrichissant nos contenus d'une perspective rigoureuse et bienveillante.
            </p>
            
            <p>
              Fort de son expérience et de sa connaissance approfondie des enjeux humains, 
              il contribue à l'élaboration de nos programmes de formation en veillant à leur 
              pertinence et à leur qualité pédagogique.
            </p>
          </div>
        </section>

        {/* Rôle de Référent */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-12 text-center">
              Un Regard Expert au Service de la Formation
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-black mb-4">
                  Validation Scientifique
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Le Dr Mahi Bahi examine et valide la pertinence scientifique de nos contenus 
                  pédagogiques, garantissant leur fiabilité et leur actualité.
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-black mb-4">
                  Approche Humaine
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Son approche privilégie l'humain et le bien-être, apportant une dimension 
                  éthique et bienveillante à nos formations professionnelles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Important */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <div className="bg-gray-100 p-8 rounded-lg">
            <h3 className="text-xl font-medium text-black mb-4">
              Cadre d'Intervention
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Dans le cadre de son rôle de référent scientifique chez AW Conseil et Formation, 
                le Dr Mahi Bahi intervient exclusivement sur les aspects pédagogiques et 
                scientifiques de nos formations.
              </p>
              <p className="font-medium">
                Aucun soin, diagnostic ou suivi individuel n'est proposé dans ce contexte.
              </p>
              <p>
                Nos formations s'adressent aux professionnels souhaitant enrichir leurs 
                compétences et leur approche dans l'accompagnement d'autrui.
              </p>
            </div>
          </div>
        </section>

        {/* Interventions et Vidéos */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light text-black mb-8">
              Interventions et Vidéos
            </h2>
            <div className="bg-gray-50 p-12 rounded-lg">
              <p className="text-xl text-gray-600 font-light mb-6">
                À venir
              </p>
              <p className="text-gray-500">
                Retrouvez bientôt ici les interventions et contenus vidéo du Dr Mahi Bahi, 
                pour approfondir votre compréhension des enjeux scientifiques de nos formations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-8">
              Échanger avec Notre Équipe
            </h2>
            <p className="text-xl text-gray-300 mb-12 font-light">
              Vous souhaitez en savoir plus sur nos formations et notre approche ? 
              Prenons le temps d'échanger.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-lg font-medium transition-colors duration-200"
            >
              Prendre un temps d'échange
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .font-light {
          font-weight: 300;
        }
      `}</style>
    </>
  );
}
