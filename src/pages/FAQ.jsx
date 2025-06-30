import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqData = [
	{
		question: 'Pourquoi rénover ma toiture ?',
		answer:
			'Rénover votre toiture permet d’éviter les fuites, d’améliorer l’isolation thermique et acoustique, de valoriser votre bien immobilier et de protéger durablement votre maison.',
	},
	{
		question: 'Quels sont les signes d’une toiture à rénover ?',
		answer:
			'Tuiles cassées ou manquantes, traces d’humidité ou de moisissures, déformation de la charpente, infiltrations d’eau, mousse ou lichen en excès.',
	},
	{
		question: 'Quelles aides financières existent pour la rénovation ?',
		answer:
			'Vous pouvez bénéficier de MaPrimeRénov’, de la TVA réduite à 10%, de l’éco-prêt à taux zéro, et d’aides locales. Nous vous accompagnons dans ces démarches.',
	},
	{
		question: 'Combien coûte une rénovation de toiture ?',
		answer:
			'Le prix dépend de la surface, du type de toiture, de l’accès et des matériaux. Utilisez notre simulateur pour obtenir une estimation personnalisée.',
	},
	{
		question: 'Dois-je faire appel à un professionnel certifié ?',
		answer:
			'Oui, il est fortement recommandé de choisir un artisan certifié RGE pour garantir la qualité des travaux et bénéficier des aides financières.',
	},
	{
		question: 'Combien de temps durent les travaux ?',
		answer:
			'La durée dépend de la surface et de la complexité du chantier, mais une rénovation classique prend généralement entre 3 et 10 jours.',
	},
	{
		question: 'Dois-je quitter mon logement pendant les travaux ?',
		answer:
			'Dans la plupart des cas, il n’est pas nécessaire de quitter votre logement. Nos artisans veillent à limiter les nuisances.',
	},
	{
		question: 'Comment entretenir ma toiture après rénovation ?',
		answer:
			'Un contrôle visuel annuel, un nettoyage doux et l’élimination des mousses permettent de prolonger la durée de vie de votre toiture.',
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 py-10">
			<div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
				<h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
					FAQ – Questions fréquentes sur la toiture
				</h1>
				<div className="divide-y divide-gray-200">
					{faqData.map((item, idx) => (
						<div key={idx}>
							<button
								className="w-full text-left py-4 focus:outline-none flex justify-between items-center group"
								onClick={() =>
									setOpenIndex(openIndex === idx ? null : idx)
								}
								aria-expanded={openIndex === idx}
							>
								<span className="text-lg font-semibold text-blue-800 group-hover:text-blue-600 transition">
									{item.question}
								</span>
								<span className="ml-4 text-blue-400 text-2xl">
									{openIndex === idx ? '–' : '+'}
								</span>
							</button>
							{openIndex === idx && (
								<div className="py-2 px-2 text-gray-700 bg-blue-50 rounded-xl mb-2 animate-fade-in">
									{item.answer}
								</div>
							)}
						</div>
					))}
				</div>
				<div className="mt-8 text-center text-xs text-gray-400">
					Pour toute question spécifique, contactez-nous via le simulateur ou
					par téléphone.
				</div>
				<div className="mt-8 flex flex-col items-center">
					<Link
						to="/"
						className="px-8 py-3 rounded-full bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition text-lg mb-2"
					>
						Retour à l’accueil
					</Link>
					<span className="text-gray-400 text-xs">ou</span>
					<Link
						to="/estimation"
						className="mt-2 px-8 py-3 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition text-lg"
					>
						Commencer la simulation
					</Link>
				</div>
			</div>
		</div>
	);
}
