import React from "react";
import { Link } from "react-router-dom";

export default function Aides() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fafc] via-[#e0f2fe] to-[#bbf7d0] py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 animate-fade-in-slow">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Simulateur d’aides & subventions</h1>
        <p className="text-gray-600 mb-8 text-center">
          Découvrez à quelles aides financières vous pouvez prétendre pour vos travaux de toiture&nbsp;: MaPrimeRénov’, CEE, TVA réduite, éco-prêt à taux zéro, etc.
        </p>
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4">
            <div className="font-semibold text-blue-700 mb-1">MaPrimeRénov’</div>
            <div className="text-gray-700 mb-2">Aide de l’État pour la rénovation énergétique, accessible à tous les propriétaires.</div>
            <a
              href="https://www.maprimerenov.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm hover:text-blue-900"
            >
              Simuler mon éligibilité MaPrimeRénov’
            </a>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 rounded-xl p-4">
            <div className="font-semibold text-green-700 mb-1">Certificats d’Économies d’Énergie (CEE)</div>
            <div className="text-gray-700 mb-2">Prime versée par les fournisseurs d’énergie pour vos travaux d’isolation ou de rénovation.</div>
            <a
              href="https://www.faire.gouv.fr/aides-de-financement/cee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline text-sm hover:text-green-900"
            >
              En savoir plus sur les CEE
            </a>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4">
            <div className="font-semibold text-yellow-700 mb-1">TVA réduite & éco-prêt à taux zéro</div>
            <div className="text-gray-700 mb-2">Profitez d’une TVA à 5,5% et d’un prêt à taux zéro pour financer vos travaux.</div>
            <a
              href="https://www.service-public.fr/particuliers/vosdroits/F19905"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-700 underline text-sm hover:text-yellow-900"
            >
              Conditions et simulateur officiel
            </a>
          </div>
        </div>
        <div className="mt-10 flex justify-between">
          <Link
            to="/"
            className="px-6 py-2 rounded-full bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
