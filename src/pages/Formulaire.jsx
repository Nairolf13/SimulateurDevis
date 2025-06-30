import { useState } from 'react';
import { sendEstimationMail } from '../services/mailJs';
import { Link } from 'react-router-dom';

export default function Formulaire({ onBack }) {
	const [step, setStep] = useState(1);
	const [form, setForm] = useState({
		surface: '',
		access: '',
		type: '',
		name: '',
		address: '',
		phone: '',
		contact: '',
		message: '', 
	});
	const [errors, setErrors] = useState({});
	const [estimation, setEstimation] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalSuccess, setModalSuccess] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const [copied, setCopied] = useState(false);
	const [editStep, setEditStep] = useState(null); 

	const totalSteps = 7; 

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: undefined });
	};

	const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
	const prevStep = () => setStep((s) => Math.max(s - 1, 1));

	const validate = ({ surface, type, contact, phone }) => {
		const errors = {};
		if (!surface || isNaN(surface) || Number(surface) <= 1) {
			errors.surface = 'Surface requise (> 1 m²)';
		}
		if (!type) {
			errors.type = 'Type de projet requis';
		}
		if (!phone || phone.length < 6) {
			errors.phone = 'Téléphone requis';
		}
		if (!contact || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact)) {
			errors.contact = 'Email valide requis';
		}
		return errors;
	};

	const validateStep = () => {
		const stepErrors = {};
		if (step === 1) {
			if (!form.surface || isNaN(form.surface) || Number(form.surface) <= 1) {
				stepErrors.surface = 'Surface requise (> 1 m²)';
			}
		}
		if (step === 2) {
			if (!form.access) {
				stepErrors.access = 'Accès requis';
			}
		}
		if (step === 3) {
			if (!form.type) {
				stepErrors.type = 'Type de projet requis';
			}
		}
		if (step === 4) {
			if (!form.name) {
				stepErrors.name = 'Nom requis';
			}
			if (!form.address) {
				stepErrors.address = 'Adresse requise';
			}
			if (!form.phone || !/^(\+33|0)[1-9](\d{2}){4}$/.test(form.phone)) {
				stepErrors.phone = 'Téléphone français valide requis';
			}
		}
		if (step === 6) {
			if (!form.contact || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contact)) {
				stepErrors.contact = 'Email valide requis';
			}
		}
		setErrors(stepErrors);
		return Object.keys(stepErrors).length === 0;
	};

	const estimatePrice = (surface, type, access) => {
		const basePrice = type === 'Rénovation' ? 160 : 200;
		let accessMultiplier = 1;
		if (access === 'Moyen') accessMultiplier = 1.1;
		else if (access === 'Difficile') accessMultiplier = 1.2;
		// Facile = 1.00 (par défaut)
		return Math.round(Number(surface) * basePrice * accessMultiplier);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const valErrors = validate(form);
		if (Object.keys(valErrors).length) {
			setErrors(valErrors);
			setModalSuccess(false);
			setModalMessage("Merci de corriger les erreurs du formulaire.");
			setShowModal(true);
			return;
		}
		const price = estimatePrice(form.surface, form.type, form.access);
		setEstimation(price);
		setErrors({});
		setLoading(true);
		setTimeout(async () => {
			try {
				await sendEstimationMail(form, price);
				setModalSuccess(true);
				setModalMessage(
					`Nous avons bien reçu vos informations.\n\nUn conseiller vous contactera rapidement pour affiner ce devis et répondre à vos questions.`
				);
				setShowModal(true);
			} catch {
				setModalSuccess(false);
				setModalMessage("Erreur lors de l'envoi de l'estimation. Veuillez réessayer plus tard ou nous contacter par téléphone.");
				setShowModal(true);
			}
			setLoading(false);
		}, 5000);
	};

	const handleNextStep = () => {
		if (validateStep()) {
			nextStep();
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f7fafc] via-[#e0f2fe] to-[#bbf7d0] py-8">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative animate-fade-in-slow">
				<button
					onClick={onBack}
					className="absolute right-6 top-6 text-2xl text-gray-400 hover:text-primary"
				>
					&times;
				</button>
				<div className="mb-6">
					<div className="flex items-center justify-between mb-2">
						<span className="text-gray-500 font-medium">
							{step}/{totalSteps}
						</span>
						<div className="w-8 h-8"></div>
					</div>
					<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
						<div
							className="h-2 bg-blue-500 rounded-full transition-all duration-300"
							style={{ width: `${(step / totalSteps) * 100}%` }}
						></div>
					</div>
				</div>
				{step === 7 && !editStep && (
					<form onSubmit={handleSubmit} className="mb-6 bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow">
						<h3 className="text-xl font-bold text-blue-800 mb-6 text-center">Récapitulatif de votre demande</h3>
						<div className="space-y-4">
							<div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3 group">
								<div>
									<span className="font-semibold text-blue-900">Surface :</span> <span className="text-gray-800">{form.surface} m²</span>
								</div>
								<button type="button" onClick={() => { setEditStep(1); setStep(1); }} className="ml-2 p-2 rounded-full hover:bg-blue-100 transition" title="Modifier la surface">
									<span role="img" aria-label="modifier">✏️</span>
								</button>
							</div>
							<div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3 group">
								<div>
									<span className="font-semibold text-blue-900">Accès :</span> <span className="text-gray-800">{form.access}</span>
								</div>
								<button type="button" onClick={() => { setEditStep(2); setStep(2); }} className="ml-2 p-2 rounded-full hover:bg-blue-100 transition" title="Modifier l'accès">
									<span role="img" aria-label="modifier">✏️</span>
								</button>
							</div>
							<div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3 group">
								<div>
									<span className="font-semibold text-blue-900">Type :</span> <span className="text-gray-800">{form.type}</span>
								</div>
								<button type="button" onClick={() => { setEditStep(3); setStep(3); }} className="ml-2 p-2 rounded-full hover:bg-blue-100 transition" title="Modifier le type de projet">
									<span role="img" aria-label="modifier">✏️</span>
								</button>
							</div>
							<div className="bg-white rounded-xl shadow-sm px-4 py-3 group flex items-start justify-between">
								<div>
									<span className="font-semibold text-blue-900 block mb-1">Coordonnées :</span>
									<div className="text-gray-800 text-sm">{form.name}</div>
									<div className="text-gray-800 text-sm">{form.address}</div>
									<div className="text-gray-800 text-sm">{form.phone}</div>
									<div className="text-gray-800 text-sm">{form.contact}</div>
								</div>
								<button type="button" onClick={() => { setEditStep(4); setStep(4); }} className="ml-2 p-2 rounded-full hover:bg-blue-100 transition mt-1" title="Modifier les coordonnées">
									<span role="img" aria-label="modifier">✏️</span>
								</button>
							</div>
							{form.message && (
								<div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3 group">
									<div>
										<span className="font-semibold text-blue-900">Message complémentaire :</span> <span className="text-gray-800">{form.message}</span>
									</div>
									<button type="button" onClick={() => { setEditStep(5); setStep(5); }} className="ml-2 p-2 rounded-full hover:bg-blue-100 transition" title="Modifier le message">
										<span role="img" aria-label="modifier">✏️</span>
									</button>
								</div>
							)}
						</div>
						<button
							type="submit"
							className="w-full mt-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition"
						>
							Valider et envoyer
						</button>
					</form>
				)}
				{!showModal && (step !== 7 || editStep) && (
					<form className="space-y-6" onSubmit={handleSubmit}>
						{step === 1 && (
							<div>
								<label className="block text-xl font-bold mb-3 text-gray-900">
									Quel est la surface de votre toiture ?
								</label>
								<input
									type="number"
									name="surface"
									min="1"
									value={form.surface}
									onChange={handleChange}
									className="w-full bg-[#f4f7fa] rounded-xl border-none px-4 py-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
									placeholder="Surface en m²"
									required
								/>
							</div>
						)}
						{step === 2 && (
							<div>
								<label className="block text-xl font-bold mb-3 text-gray-900">
									Votre toiture est-elle facile d'accès ?
								</label>
								<div className="space-y-3">
									<label className="flex items-center gap-3 bg-[#f4f7fa] rounded-xl px-4 py-3 cursor-pointer">
										<input
											type="radio"
											name="access"
											value="Facile"
											checked={form.access === 'Facile'}
											onChange={handleChange}
											className="accent-blue-500 w-5 h-5"
											required
										/>
										Facile
									</label>
									<label className="flex items-center gap-3 bg-[#f4f7fa] rounded-xl px-4 py-3 cursor-pointer">
										<input
											type="radio"
											name="access"
											value="Moyen"
											checked={form.access === 'Moyen'}
											onChange={handleChange}
											className="accent-blue-500 w-5 h-5"
											required
										/>
										Moyen
									</label>
									<label className="flex items-center gap-3 bg-[#f4f7fa] rounded-xl px-4 py-3 cursor-pointer">
										<input
											type="radio"
											name="access"
											value="Difficile"
											checked={form.access === 'Difficile'}
											onChange={handleChange}
											className="accent-blue-500 w-5 h-5"
											required
										/>
										Difficile
									</label>
								</div>
							</div>
						)}
						{step === 3 && (
							<div>
								<label className="block text-xl font-bold mb-3 text-gray-900">
									Quel est votre projet ?
								</label>
								<div className="space-y-3">
									<label className="flex items-center gap-3 bg-[#f4f7fa] rounded-xl px-4 py-3 cursor-pointer">
										<input
											type="radio"
											name="type"
											value="Rénovation"
											checked={form.type === 'Rénovation'}
											onChange={handleChange}
											className="accent-blue-500 w-5 h-5"
											required
										/>
										Rénovation
									</label>
									<label className="flex items-center gap-3 bg-[#f4f7fa] rounded-xl px-4 py-3 cursor-pointer">
										<input
											type="radio"
											name="type"
											value="Construction neuve"
											checked={form.type === 'Construction neuve'}
											onChange={handleChange}
											className="accent-blue-500 w-5 h-5"
											required
										/>
										Construction neuve
									</label>
								</div>
							</div>
						)}
						{step === 4 && (
							<div>
								<label className="block text-xl font-bold mb-3 text-gray-900">
									Vos coordonnées
								</label>
								<input
									type="text"
									name="name"
									value={form.name}
									onChange={handleChange}
									className="w-full bg-[#f4f7fa] rounded-xl border-none px-4 py-3 text-lg placeholder-gray-400 mb-3 focus:ring-2 focus:ring-blue-400"
									placeholder="Nom"
									required
								/>
								<input
									type="text"
									name="address"
									value={form.address}
									onChange={handleChange}
									className="w-full bg-[#f4f7fa] rounded-xl border-none px-4 py-3 text-lg placeholder-gray-400 mb-3 focus:ring-2 focus:ring-blue-400"
									placeholder="Adresse"
									required
								/>
								<input
									type="tel"
									name="phone"
									value={form.phone || ''}
									onChange={handleChange}
									className="w-full bg-[#f4f7fa] rounded-xl border-none px-4 py-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
									placeholder="Téléphone"
									required
									pattern="^(\+33|0)[1-9](\d{2}){4}$"
									title="Numéro de téléphone français valide requis"
								/>
							</div>
						)}
						{step === 5 && (
							<div>
								<label className="block text-xl font-bold mb-3 text-gray-900">Message complémentaire <span className="text-gray-400 text-base">(optionnel)</span></label>
								<textarea
									name="message"
									value={form.message}
									onChange={handleChange}
									className="w-full bg-[#f4f7fa] rounded-xl border-none px-4 py-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 min-h-[80px] resize-none"
									placeholder="Message complémentaire"
								></textarea>
							</div>
						)}
						{step === 6 && (
							<div>
								<label className="block text-xl font-bold mb-3 text-gray-900">Email</label>
								<input
									type="email"
									name="contact"
									value={form.contact}
									onChange={handleChange}
									className="w-full bg-[#f4f7fa] rounded-xl border-none px-4 py-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
									placeholder="Votre email"
									required
									pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
									title="Adresse email valide requise"
								/>
							</div>
						)}
						<div className="flex gap-2 mt-4">
							{step > 1 && (
								<button
									type="button"
									onClick={prevStep}
									className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition"
								>
									Précédent
								</button>
							)}
							{step < totalSteps && (
								<button
									type="button"
									onClick={handleNextStep}
									className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
								>
									Suivant
								</button>
							)}
							{step === totalSteps && (
								<button
									type="submit"
									className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
								>
									Valider
								</button>
							)}
						</div>
						{errors.surface && step === 1 && (
							<div className="text-red-500 text-sm mt-1">{errors.surface}</div>
						)}
						{errors.access && step === 2 && (
							<div className="text-red-500 text-sm mt-1">{errors.access}</div>
						)}
						{errors.type && step === 3 && (
							<div className="text-red-500 text-sm mt-1">{errors.type}</div>
						)}
						{(errors.name || errors.address || errors.phone) && step === 4 && (
							<div className="text-red-500 text-sm mt-1">
								{errors.name && <div>{errors.name}</div>}
								{errors.address && <div>{errors.address}</div>}
								{errors.phone && <div>{errors.phone}</div>}
							</div>
						)}
						{errors.contact && step === 6 && (
							<div className="text-red-500 text-sm mt-1">{errors.contact}</div>
						)}
					</form>
				)}
			</div>
			<div className="w-full max-w-2xl mt-10 text-center text-gray-500 text-xs opacity-70">
				&copy; {new Date().getFullYear()} ToitureDevis — Estimation gratuite,
				conseils et accompagnement par des pros.
			</div>
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
					<div className={`bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center border-2 relative ${modalSuccess ? 'border-green-400' : 'border-red-400'}`}>
						{modalSuccess && (
							<button
								onClick={() => {
									setShowModal(false);
									window.location.href = '/';
								}}
								className="absolute right-6 top-6 text-2xl text-gray-400 hover:text-primary focus:outline-none"
								aria-label="Fermer"
							>
								&times;
							</button>
						)}
						{modalSuccess && estimation && (
							<>
								<div className="text-base font-semibold text-gray-500 mb-1 uppercase tracking-widest">Estimation</div>
								<div className="text-5xl font-extrabold text-blue-700 mb-4 animate-pulse">{estimation} €</div>
								<div className="mt-4 flex flex-col gap-3 items-center animate-fade-in">
									{form.type === 'Rénovation' && (
										<div className="bg-green-50 border-l-4 border-green-400 rounded-xl px-4 py-3 flex items-center gap-2 shadow-sm">
											<span className="text-2xl">💡</span>
											<span className="text-green-900 font-medium">Pour une rénovation, pensez à vérifier l’isolation de vos combles !</span>
										</div>
									)}
									{form.access === 'Difficile' && (
										<div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl px-4 py-3 flex items-center gap-2 shadow-sm">
											<span className="text-2xl">🧗</span>
											<span className="text-yellow-900 font-medium">Un accès difficile nécessite parfois un échafaudage spécifique.</span>
										</div>
									)}
									{form.type === 'Construction neuve' && (
										<div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl px-4 py-3 flex items-center gap-2 shadow-sm">
											<span className="text-2xl">🏗️</span>
											<span className="text-blue-900 font-medium">Pour une construction neuve, anticipez l’intégration des fenêtres de toit !</span>
										</div>
									)}
								</div>
							</>
						)}
						<div className={`text-3xl mb-4 ${modalSuccess ? 'text-green-500' : 'text-red-500'}`}>{modalSuccess ? '✔️' : '❌'}</div>
						<div className="text-lg font-semibold mb-2">{modalSuccess ? 'Demande envoyée !' : 'Erreur'}</div>
						<div className="whitespace-pre-line text-gray-700 mb-4">{modalSuccess ? 'Nous avons bien reçu vos informations.\n\nUn conseiller vous contactera rapidement pour affiner ce devis et répondre à vos questions.' : modalMessage}</div>
						{modalSuccess && (
							<div className="flex flex-col items-center gap-3 mt-4">
								<button
									onClick={() => {
										setShowModal(false);
										setStep(1);
										setForm({
											surface: '',
											access: '',
											type: '',
											name: '',
											address: '',
											phone: '',
											contact: '',
											message: '',
										});
										setEstimation(null);
									}}
									className="px-6 py-2 rounded-full bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition"
								>
									Refaire une estimation
								</button>
								<button
									onClick={() => setShowShareModal(true)}
									className="px-6 py-2 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition flex items-center gap-2"
								>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 11-2.83 2H8.83A3 3 0 116 8h2.17A3 3 0 1115 8z" /></svg>
									Partager le simulateur
								</button>
								<Link
									to="/faq"
									className="text-blue-600 underline text-sm mt-2 hover:text-blue-800"
									onClick={() => setShowModal(false)}
								>
									Consulter la FAQ / Guide toiture
								</Link>
								{showShareModal && (
									<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
										<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
											<button
												onClick={() => setShowShareModal(false)}
												className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-primary"
												aria-label="Fermer"
											>
												&times;
											</button>
											<div className="text-xl font-bold mb-4 text-gray-800">Partager le simulateur</div>
											<div className="flex flex-wrap justify-center gap-5 mb-4">
												<a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Facebook" className="hover:scale-110 transition">
													<svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.229 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
												</a>
												<a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin)}&text=Estimez%20gratuitement%20le%20prix%20de%20votre%20toiture%20avec%20ce%20simulateur%20rapide%20et%20pro%20!`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Twitter" className="hover:scale-110 transition">
													<svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.93-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/></svg>
												</a>
												<a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.origin)}&title=Simulateur%20ToitureDevis&summary=Estimez%20gratuitement%20le%20prix%20de%20votre%20toiture%20avec%20ce%20simulateur%20rapide%20et%20pro%20!`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur LinkedIn" className="hover:scale-110 transition">
													<svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.369 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 01-2.06-2.06c0-1.138.923-2.061 2.06-2.061 1.138 0 2.061.923 2.061 2.06 0 1.138-.923 2.061-2.06 2.061zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
												</a>
												<a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Instagram" className="hover:scale-110 transition">
													<svg className="w-10 h-10" viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
														<defs>
															<radialGradient id="ig-gradient2" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
																<stop offset="0%" stop-color="#fdf497"/>
																<stop offset="30%" stop-color="#fdf497"/>
																<stop offset="60%" stop-color="#fd5949"/>
																<stop offset="90%" stop-color="#d6249f"/>
																<stop offset="100%" stop-color="#285AEB"/>
															</radialGradient>
														</defs>
														<circle cx="224" cy="224" r="200" fill="url(#ig-gradient2)"/>
														<path d="M224 144c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80zm0 132c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52zm85-136c0 10.5-8.5 19-19 19s-19-8.5-19-19 8.5-19 19-19 19 8.5 19 19z" fill="#fff"/>
														<path d="M346 224c0-67.6-54.4-122-122-122S102 156.4 102 224s54.4 122 122 122 122-54.4 122-122zm-32 0c0 49.7-40.3 90-90 90s-90-40.3-90-90 40.3-90 90-90 90 40.3 90 90z" fill="#fff" fill-opacity="0.2"/>
													</svg>
												</a>
												<a href={`mailto:?subject=Simulateur%20ToitureDevis&body=Estimez%20gratuitement%20le%20prix%20de%20votre%20toiture%20avec%20ce%20simulateur%20rapide%20et%20pro%20!%20${encodeURIComponent(window.location.origin)}`} target="_blank" rel="noopener noreferrer" aria-label="Partager par email" className="hover:scale-110 transition">
													{/* Email */}
													<svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065L.001 6.5V19.5A2.5 2.5 0 002.5 22h19a2.5 2.5 0 002.5-2.5V6.5l-12 6.565zm11.999-9.565A2.5 2.5 0 0021.5 2h-19A2.5 2.5 0 000 3.5v.637l12 6.565 12-6.565v-.637z"/></svg>
												</a>
											</div>
											<button
												onClick={() => {
													navigator.clipboard.writeText(window.location.origin);
													setCopied(true);
													setTimeout(() => setCopied(false), 1800);
												}}
												className="mt-2 px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition"
											>
												Copier le lien
											</button>
											{copied && <div className="mt-2 text-green-600 font-semibold text-sm">Lien copié !</div>}
										</div>
									</div>
								)}
							</div>
						)}
						{!modalSuccess && (
							<button
								onClick={() => setShowModal(false)}
								className="mt-2 px-6 py-2 rounded-full bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition"
							>
								Fermer
							</button>
						)}
					</div>
				</div>
			)}
            
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 min-h-screen">
					<div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full flex flex-col items-center">
						<svg className="animate-spin h-16 w-16 text-blue-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
						</svg>
						<div className="text-2xl font-bold text-blue-700 mb-2">Calcul de votre estimation...</div>
						<div className="text-gray-500 text-base">Merci de patienter quelques instants</div>
					</div>
				</div>
			)}
		</div>
	);
}
