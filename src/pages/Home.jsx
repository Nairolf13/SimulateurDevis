import { Link } from 'react-router-dom';

export default function Home({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 py-10">
      <header className="w-full max-w-3xl mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 tracking-tight">Votre toiture, votre sérénité</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-2">Protégez, valorisez et isolez votre maison avec une toiture saine et durable.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <div className="flex-1 bg-white rounded-xl shadow p-5 border border-blue-50 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-1">+20% de valeur</span>
            <span className="text-gray-500 text-sm">pour votre bien immobilier</span>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow p-5 border border-blue-50 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-1">Jusqu'à 30% d'économies</span>
            <span className="text-gray-500 text-sm">sur vos factures d'énergie</span>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow p-5 border border-blue-50 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-1">Aides & subventions</span>
            <span className="text-gray-500 text-sm">accompagnement personnalisé</span>
          </div>
        </div>
      </header>
      <main className="w-full max-w-3xl flex flex-col md:flex-row gap-8 items-start">
        <section className="flex-1 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Pourquoi rénover sa toiture ?</h2>
          <ul className="space-y-3 text-gray-700 text-base">
            <li><b>Prévention :</b> Évitez les fuites, infiltrations et dégâts structurels.</li>
            <li><b>Confort :</b> Améliorez l’isolation thermique et acoustique de votre logement.</li>
            <li><b>Valorisation :</b> Augmentez la valeur de votre bien sur le marché.</li>
            <li><b>Sérénité :</b> Protégez votre famille et votre patrimoine durablement.</li>
          </ul>
          <div className="mt-6 text-sm text-gray-500 border-t pt-4">
            <b>Conseil :</b> Un diagnostic régulier par un professionnel est recommandé tous les 10 à 15 ans.
          </div>
        </section>
        <aside className="flex-1 flex flex-col gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Aides & subventions</h3>
            <p className="text-gray-700 text-sm mb-2">Profitez de dispositifs comme MaPrimeRénov’, TVA réduite, éco-prêt à taux zéro…</p>
            <p className="text-gray-500 text-xs mb-2">Nous vous accompagnons dans vos démarches administratives.</p>
            <Link
              to="/aides"
              className="inline-block mt-2 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-sm"
            >
              Vérifier mon éligibilité aux aides
            </Link>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Nos engagements</h3>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>✔️ Conseils personnalisés</li>
              <li>✔️ Artisans certifiés RGE</li>
              <li>✔️ Devis gratuit & sans engagement</li>
              <li>✔️ Suivi de projet de A à Z</li>
            </ul>
          </div>
        </aside>
      </main>
      <div className="w-full max-w-3xl flex flex-col items-center mt-10">
        <button
          onClick={onStart}
          className="px-10 py-4 rounded-full bg-blue-700 text-white text-xl font-bold shadow-lg hover:bg-blue-800 transition-all duration-200"
        >
          Estimer ma toiture gratuitement
        </button>
        <div className="mt-6 text-xs text-gray-400">Estimation rapide, confidentielle et sans engagement</div>
        <div className="flex flex-col md:flex-row gap-4 mt-8 items-center">
          <Link
            to="/faq"
            className="text-blue-700 underline text-base hover:text-blue-900"
          >
            Consulter la FAQ / Guide toiture
          </Link>
          <Link
            to="/glossaire"
            className="text-blue-700 underline text-base hover:text-blue-900"
          >
            Glossaire toiture
          </Link>
        </div>
      </div>
      <footer className="w-full max-w-3xl mt-12 text-center text-gray-400 text-xs opacity-70">
        &copy; {new Date().getFullYear()} ToitureDevis — Votre partenaire confiance pour la rénovation de toiture.
      </footer>
    </div>
  );
}
