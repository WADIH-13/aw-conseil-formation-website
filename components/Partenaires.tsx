import Image from "next/image";

// Ajoutez vos logos dans le dossier /public/partenaires/ puis complétez ce tableau :
const logos: Array<{ src: string; alt: string }> = [
  // Exemple : { src: "/partenaires/logo1.svg", alt: "Nom du partenaire 1" },
  // { src: "/partenaires/logo2.png", alt: "Nom du partenaire 2" },
];

export default function Partenaires() {
  return (
    <section className="my-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-light text-black mb-8 tracking-tight">
          Ils nous font confiance
        </h2>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 py-8 bg-white rounded-3xl shadow-sm border border-gray-100">
          {logos.length === 0 ? (
            <div className="text-gray-400 italic text-center w-full py-8">
              Ajoutez vos logos dans <span className="font-mono">/public/partenaires/</span> et complétez le composant.
            </div>
          ) : (
            logos.map((logo, i) => (
              <div key={i} className="flex items-center h-12 md:h-14" style={{ minWidth: 90, maxWidth: 200 }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  height={48}
                  width={160}
                  style={{ objectFit: "contain", width: "auto", height: "100%" }}
                  className="mx-auto"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
