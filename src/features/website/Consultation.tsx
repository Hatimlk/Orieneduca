
import React, { useState } from 'react';
import { CheckSquare, Check, Globe, GraduationCap, ShieldCheck, User, Send, MapPin, AlertCircle } from 'lucide-react';

export const Consultation: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    office: '',
    service: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande Envoyée !</h2>
                <p className="text-gray-600 mb-6">
                    Merci {formData.fullName}. Un conseiller Orieneduca de l'agence de {formData.office} vous contactera très prochainement sur le {formData.phone}.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                >
                    Retour
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Column: Profile & Info */}
        <div className="lg:w-2/5 bg-white p-8 lg:p-12 border-r border-gray-100 flex flex-col">
            {/* Profile Header */}
            <div className="mb-10">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6 shadow-lg ring-4 ring-gray-50 bg-primary-50">
                    <img 
                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=Hatim&clothing=blazerAndShirt&top=shortFlat&accessories=glasses" 
                        alt="Hatim Lakrouni Illustration" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Hatim Lakrouni</h2>
                <p className="text-primary-600 font-bold">Fondateur Orieneduca et Consultant</p>
            </div>

            {/* Benefits List */}
            <div className="space-y-5 mb-12 flex-1">
                <div className="flex items-start">
                    <div className="bg-primary-50 p-1.5 rounded-md mr-3 shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">Une méthode d'orientation éprouvée</span>
                </div>
                <div className="flex items-start">
                    <div className="bg-primary-50 p-1.5 rounded-md mr-3 shrink-0 mt-0.5">
                        <GraduationCap className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">Accès à +400 Universités partenaires</span>
                </div>
                <div className="flex items-start">
                    <div className="bg-primary-50 p-1.5 rounded-md mr-3 shrink-0 mt-0.5">
                        <Globe className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">Accès à +25 Opportunités de bourses</span>
                </div>
            </div>

            {/* Testimonial */}
            <div className="relative bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-auto">
                <div className="absolute -top-3 left-6 bg-white px-2">
                    <span className="text-4xl text-accent-400 font-serif">"</span>
                </div>
                <p className="text-gray-600 italic text-sm leading-relaxed mb-4 pt-2">
                    L'équipe d'Orieneduca a su m'écouter activement. Ils m'ont aidé à libérer tout mon potentiel et m'ont guidé tout au long de ma candidature universitaire.
                </p>
                <div>
                    <p className="font-bold text-gray-900 text-sm">Farah Badri</p>
                    <p className="text-xs text-gray-500">Étudiante boursière, Polytechnique</p>
                </div>
            </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:w-3/5 p-8 lg:p-12 bg-white">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                    Demandez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">consultation gratuite</span> !
                </h1>
                <p className="text-gray-500">Remplissez le formulaire ci-dessous pour être rappelé.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Nom complet <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Votre Nom & Prénom" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Téléphone <span className="text-red-500">*</span></label>
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ex: 06 12 34 56 78" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Votre ville <span className="text-red-500">*</span></label>
                        <select 
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                        >
                            <option value="">Sélectionner...</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Marrakech">Marrakech</option>
                            <option value="Tanger">Tanger</option>
                            <option value="Fès">Fès</option>
                            <option value="Agadir">Agadir</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Bureau le plus proche <span className="text-red-500">*</span></label>
                        <select 
                            name="office"
                            value={formData.office}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                        >
                            <option value="">Sélectionner...</option>
                            <option value="Casablanca - Maarif">Casablanca - Maarif</option>
                            <option value="Rabat - Agdal">Rabat - Agdal</option>
                            <option value="Marrakech - Guéliz">Marrakech - Guéliz</option>
                            <option value="Tanger - Centre">Tanger - Centre</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Service souhaité <span className="text-red-500">*</span></label>
                    <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                    >
                        <option value="">Sélectionner...</option>
                        <option value="Études en France">Études en France</option>
                        <option value="Études en Chine">Études en Chine</option>
                        <option value="Études en Turquie">Études en Turquie</option>
                        <option value="Orientation Post-Bac Maroc">Orientation Post-Bac Maroc</option>
                        <option value="Préparation Concours">Préparation Concours</option>
                    </select>
                </div>

                <div className="flex items-start pt-2">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            name="agreeTerms"
                            type="checkbox"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            required
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-700">
                            J'ai lu et j'accepte les conditions d'utilisation
                        </label>
                    </div>
                </div>

                {/* Mock Recaptcha */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 w-fit flex items-center space-x-4">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-sm bg-white"></div>
                    <span className="text-sm text-gray-600">I'm not a robot</span>
                    <div className="flex flex-col items-center ml-4">
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="w-8 h-8 opacity-50" />
                        <span className="text-[8px] text-gray-400">reCAPTCHA</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary-600/20 transition-all transform hover:-translate-y-0.5 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed ring-offset-2 focus:ring-2 focus:ring-primary-500"
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Postuler Maintenant'}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};
