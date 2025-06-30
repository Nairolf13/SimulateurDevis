import React from "react";
import { Link } from "react-router-dom";
import faitage from "../assets/faitage.png";
import lito from "../assets/lito.jpg";
import soustoiture from "../assets/soustoiture.jpg";
import chevron from "../assets/chevron.avif";
import noue from "../assets/noue.jpg";
import rive from "../assets/rive.jpg";

const termes = [
  {
    terme: "Faîtage",
    definition:
      "Le faîtage est la partie supérieure de la toiture, là où se rejoignent les deux pans du toit. Il assure l’étanchéité entre les versants.",
    image: faitage,
  },
  {
    terme: "Liteau",
    definition:
      "Le liteau est une pièce de bois fixée horizontalement sur la charpente, servant de support aux tuiles ou ardoises.",
    image: lito,
  },
  {
    terme: "Écran sous-toiture",
    definition:
      "L’écran sous-toiture est une membrane posée sous la couverture pour renforcer l’étanchéité à l’eau, à l’air et à la poussière.",
    image: soustoiture,
  },
  {
    terme: "Chevron",
    definition:
      "Le chevron est une pièce de bois inclinée qui soutient les liteaux et la couverture.",
    image: chevron,
  },
  {
    terme: "Noues",
    definition:
      "La noue est la ligne de rencontre de deux pans de toiture formant un angle rentrant. Elle permet l’évacuation des eaux de pluie.",
    image: noue,
  },
  {
    terme: "Rives",
    definition:
      "Les rives sont les bords latéraux du toit, souvent protégés par des tuiles ou des planches spécifiques.",
    image: rive,
  },
];

export default function Glossaire() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fafc] via-[#e0f2fe] to-[#bbf7d0] py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 animate-fade-in-slow">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Glossaire toiture
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Retrouvez ici les principaux termes techniques de la toiture, illustrés et
          expliqués simplement.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {termes.map((t) => (
            <div
              key={t.terme}
              className="bg-blue-50 rounded-xl p-4 shadow group hover:shadow-lg transition flex flex-col h-full"
            >
              <img
                src={t.image}
                alt={t.terme}
                className="w-full h-40 object-cover rounded-lg mb-3 border border-blue-100"
                loading="lazy"
              />
              <div className="text-xl font-semibold text-blue-700 mb-1">
                {t.terme}
              </div>
              <div className="text-gray-700 text-base mb-2 flex-1">
                {t.definition}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-10">
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
