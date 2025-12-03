
import React, { useEffect, useState } from 'react';
import { Check, Zap, Star, BookOpen, Shield, MousePointerClick, ArrowLeft, Send, CheckCircle, User, Phone, GraduationCap, School, CreditCard, AlertCircle, Calendar, FileCheck, HelpCircle, ChevronDown, ChevronUp, Mail, LayoutList } from 'lucide-react';
import { NavPage } from '../types';

// Types
type ViewState = 'PRICING' | 'FORM' | 'SUCCESS';

interface Pack {
  id: string;
  title: string;
  tagline: string;
  subjects: string;
  features: string[];
  theme: 'emerald' | 'lime' | 'blue';
  icon: React.ReactNode;
  popular: boolean;
}

const PACKS: Pack[] = [
  {
    id: 'info',
    title: 'Pack Information',
    tagline: 'L’essentiel pour rester informé',
    subjects: 'PC, SM, SVT, ECO, STE, STM, L, SH',
    features: [
      'Actualités des écoles en temps réel',
      'Notifications des dates de concours',
      'Guide PDF des seuils d\'admission',
      'Newsletter hebdomadaire'
    ],
    theme: 'emerald',
    icon: <BookOpen className="w-6 h-6" />,
    popular: false
  },
  {
    id: 'science',
    title: 'Pack Science Pro',
    tagline: 'L’excellence scientifique',
    subjects: 'Filières Scientifiques (PC, SM, SVT)',
    features: [
      'Tout du Pack Information',
      'Inscription automatique aux concours',
      'Dossier FMP & ENCG inclus',
      'Suivi des résultats de présélection'
    ],
    theme: 'lime',
    icon: <Zap className="w-6 h-6" />,
    popular: true
  },
  {
    id: 'eco',
    title: 'Pack Eco Pro',
    tagline: 'Pour les futurs managers',
    subjects: 'Filières Économiques (ECO, SGC)',
    features: [
      'Tout du Pack Information',
      'Inscription aux concours (ENCG, ISCAE...)',
      'Préparation dossier CPGE Eco',
      'Conseils choix de filière'
    ],
    theme: 'blue',
    icon: <Shield className="w-6 h-6" />,
    popular: false
  }
];

const FAQS = [
    {
        question: "Quand dois-je effectuer le paiement ?",
        answer: "Le paiement s'effectue uniquement après la validation de votre dossier par notre équipe. Une fois le formulaire envoyé, un conseiller vous contactera sous 24h pour confirmer vos choix et vous transmettre les modalités de règlement."
    },
    {
        question: "Le pack garantit-il mon admission ?",
        answer: "Non, l'admission dépend exclusivement de vos résultats scolaires et des seuils fixés par les écoles. Cependant, notre service maximise vos chances en garantissant qu'aucune date n'est manquée, que votre dossier est complet et conforme, et en vous orientant vers les filières adaptées à votre profil."
    },
    {
        question: "Puis-je changer de pack après l'inscription ?",
        answer: "Oui, tout à fait. Lors de l'appel de validation avec votre conseiller, vous pourrez ajuster votre choix de pack si nécessaire avant de procéder au paiement."
    },
    {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons les virements bancaires et les versements Wafacash/CashPlus. Toutes les informations vous seront transmises par votre conseiller dédié."
    }
];

export const OrieneducaPlus: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<ViewState>('PRICING');
  const [selectedPackId, setSelectedPackId] = useState<string>('science');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, [view]);

  const handleSelectPack = (packId: string) => {
    setSelectedPackId(packId);
    setView('FORM');
  };

  const handleFormSubmit = () => {
    setView('SUCCESS');
  };

  // Helper for theme styles
  const getThemeStyles = (theme: 'emerald' | 'lime' | 'blue') => {
    switch (theme) {
      case 'emerald':
        return {
          headerBg: 'bg-emerald-50',
          iconBg: 'bg-emerald-100',
          accent: 'text-emerald-600',
          border: 'border-emerald-100',
          text: 'text-emerald-900',
          button: 'bg-emerald-600 hover:bg-emerald-700 text-white ring-emerald-200',
          activeRing: 'ring-emerald-500'
        };
      case 'lime':
        return {
          headerBg: 'bg-accent-50',
          iconBg: 'bg-accent-100',
          accent: 'text-accent-600',
          border: 'border-accent-100',
          text: 'text-accent-900',
          button: 'bg-accent-600 hover:bg-accent-700 text-white ring-accent-200',
          activeRing: 'ring-accent-500'
        };
      case 'blue':
        return {
          headerBg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          accent: 'text-blue-600',
          border: 'border-blue-100',
          text: 'text-blue-900',
          button: 'bg-blue-600 hover:bg-blue-700 text-white ring-blue-200',
          activeRing: 'ring-blue-500'
        };
    }
  };

  // --- SUB-COMPONENTS ---

  const PricingView = () => (
    <>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className={`absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-600/30 rounded-full blur-3xl transition-all duration-[2000ms] ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}></div>
            <div className={`absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-accent-600/20 rounded-full blur-3xl transition-all duration-[2500ms] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           <div className={`inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/20 shadow-2xl transform transition-all duration-700 ${isLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
               <Zap className="w-10 h-10 text-accent-400 fill-accent-400" />
           </div>
           <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 tracking-tight transition-all duration-700 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
               Orieneduca<span className="text-accent-400">+</span>
           </h1>
           <p className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
               Confiez-nous vos inscriptions administratives post-bac et concentrez-vous sur l'essentiel : <span className="text-white font-bold border-b-2 border-accent-400">votre réussite.</span>
           </p>
        </div>
      </div>

      {/* Process Steps Section */}
      <div className="bg-white py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold text-gray-900">Comment ça marche ?</h2>
                  <p className="text-gray-500">Une procédure simple en 3 étapes.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 z-0"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center group">
                      <div className="w-24 h-24 bg-white rounded-full border-4 border-primary-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <MousePointerClick className="w-10 h-10 text-primary-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">1. Choisissez votre Pack</h3>
                      <p className="text-sm text-gray-500 max-w-xs">Sélectionnez l'offre adaptée à votre filière et vos besoins d'accompagnement.</p>
                  </div>
                  <div className="relative z-10 flex flex-col items-center text-center group">
                      <div className="w-24 h-24 bg-white rounded-full border-4 border-accent-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 delay-100">
                          <FileCheck className="w-10 h-10 text-accent-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">2. Remplissez le formulaire</h3>
                      <p className="text-sm text-gray-500 max-w-xs">Saisissez vos informations personnelles et scolaires en quelques minutes.</p>
                  </div>
                  <div className="relative z-10 flex flex-col items-center text-center group">
                      <div className="w-24 h-24 bg-white rounded-full border-4 border-green-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 delay-200">
                          <Phone className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">3. Validation & Paiement</h3>
                      <p className="text-sm text-gray-500 max-w-xs">Un conseiller vous contacte sous 24h pour valider votre dossier.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50">
        
        <div className="text-center mb-16">
            <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md text-sm font-bold text-gray-600 uppercase tracking-wide border border-gray-100">
                Nos Offres
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Des solutions adaptées à chaque profil</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-24">
            {PACKS.map((pack, idx) => {
                const styles = getThemeStyles(pack.theme);
                const delay = 300 + (idx * 100);
                
                return (
                    <div 
                        key={idx} 
                        className={`w-full max-w-sm bg-white rounded-[2rem] border ${styles.border} overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: `${isLoaded ? 0 : delay}ms` }}
                    >
                        {/* Card Header */}
                        <div className={`p-8 ${styles.headerBg} relative overflow-hidden`}>
                            {pack.popular && (
                                <div className="absolute top-4 right-4 bg-accent-400 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm flex items-center">
                                    <Star className="w-3 h-3 mr-1 fill-current" /> Populaire
                                </div>
                            )}
                            <div className={`w-12 h-12 ${styles.iconBg} rounded-xl flex items-center justify-center mb-4 ${styles.accent} group-hover:scale-110 transition-transform duration-300`}>
                                {pack.icon}
                            </div>
                            <div className="flex justify-between items-start">
                                <h3 className={`text-2xl font-bold ${styles.text} mb-1`}>
                                    {pack.title}
                                </h3>
                            </div>
                            <p className={`${styles.accent} text-sm font-medium opacity-90 mt-2`}>
                                {pack.tagline}
                            </p>
                        </div>

                        {/* Card Body */}
                        <div className="p-8 flex-1 flex flex-col bg-white">
                            <div className="mb-6">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cible</p>
                                <p className="text-gray-700 text-sm font-semibold bg-gray-50 p-2 rounded-lg border border-gray-100 inline-block">
                                    {pack.subjects}
                                </p>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {pack.features.map((feat, i) => (
                                    <div key={i} className="flex items-start">
                                        <div className={`rounded-full p-0.5 mr-3 mt-0.5 ${styles.iconBg} shrink-0`}>
                                            <Check className={`w-3 h-3 ${styles.accent}`} />
                                        </div>
                                        <span className="text-gray-600 text-sm">{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <button 
                                className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center ${styles.button}`}
                                onClick={() => handleSelectPack(pack.id)}
                            >
                                S'inscrire maintenant <MousePointerClick className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Free Consultation CTA */}
        <div className={`transition-all duration-1000 delay-500 mb-24 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-5xl mx-auto bg-primary-900 rounded-[2.5rem] px-8 py-16 md:p-20 text-center relative overflow-hidden shadow-2xl group">
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/30 via-transparent to-transparent"></div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                      Réservez votre séance de<br />consultation gratuite
                  </h2>
                  <p className="text-primary-100/80 text-lg mb-10 font-medium max-w-2xl mx-auto">
                      Parlez maintenant à un représentant de Orieneduca pour obtenir de l'aide gratuitement.
                  </p>
                  <button 
                      className="bg-accent-500 hover:bg-accent-400 text-gray-900 font-bold text-lg px-10 py-4 rounded-xl inline-flex items-center transition-all transform hover:-translate-y-1 shadow-lg shadow-accent-500/30 border border-accent-400"
                      onClick={() => window.open('https://wa.me/212600000000', '_blank')}
                  >
                      <Calendar className="w-5 h-5 mr-2" />
                      Réservez maintenant
                  </button>
              </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 mr-2 text-primary-600" /> Questions Fréquentes
            </h2>
            <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <button 
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                            {faq.question}
                            {openFaqIndex === idx ? <ChevronUp className="w-5 h-5 text-primary-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                        </button>
                        {openFaqIndex === idx && (
                            <div className="p-5 pt-0 bg-gray-50/50 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

      </div>
    </>
  );

  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      gender: '',
      phone: '',
      parentPhone: '',
      schoolType: '',
      filiere: '',
      regionalGrade: '',
      familyStatus: '',
      paymentAgreement: '',
      pack: selectedPackId
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'fullName':
                return value.length < 3 ? "Le nom doit contenir au moins 3 caractères." : "";
            case 'email':
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
                    ? "Veuillez saisir une adresse email valide." 
                    : "";
            case 'gender':
                return !value ? "Veuillez sélectionner votre genre." : "";
            case 'phone':
            case 'parentPhone':
                return !/^0[5-7][0-9]{8}$/.test(value.replace(/\s/g, '')) 
                    ? "Numéro invalide (format attendu: 06xxxxxxxx)." 
                    : "";
            case 'schoolType':
                return !value ? "Veuillez choisir votre type d'établissement." : "";
            case 'filiere':
                return !value ? "Veuillez sélectionner votre filière." : "";
            case 'regionalGrade':
                return !value ? "Veuillez indiquer votre tranche de note." : "";
            case 'familyStatus':
                return !value ? "Ce champ est requis." : "";
            case 'paymentAgreement':
                return value !== 'Oui' ? "Vous devez accepter les conditions de paiement pour continuer." : "";
            default:
                return "";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      
      if (touched[name]) {
          setErrors(prev => ({
              ...prev,
              [name]: validateField(name, value)
          }));
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors: Record<string, string> = {};
      Object.keys(formData).forEach(key => {
          if (key === 'pack') return;
          newErrors[key] = validateField(key, (formData as any)[key]);
      });

      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({...acc, [key]: true}), {}));

      const hasErrors = Object.values(newErrors).some(error => error !== "");
      
      if (!hasErrors) {
        setTimeout(() => {
            handleFormSubmit();
        }, 1000);
      } else {
          const firstErrorElement = document.querySelector('.error-field');
          firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    const ErrorMsg = ({ field }: { field: string }) => (
        errors[field] && touched[field] ? (
            <p className="text-red-500 text-xs mt-1 flex items-center animate-fade-in error-field">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors[field]}
            </p>
        ) : null
    );

    const getInputClass = (field: string) => `
        w-full rounded-xl px-4 py-3 border outline-none transition-all duration-200
        ${errors[field] && touched[field] 
            ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500' 
            : 'border-gray-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white hover:border-gray-300'}
    `;

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setView('PRICING')}
            className="flex items-center text-gray-500 hover:text-gray-900 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Retour aux packs
          </button>

          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-primary-900 p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold">Finaliser votre inscription</h2>
                <p className="text-primary-200 mt-2 text-lg">Remplissez ce formulaire pour rejoindre la communauté Orieneduca+.</p>
              </div>
              
              {/* Steps Indicator */}
              <div className="flex items-center mt-8 space-x-2 md:space-x-4 text-sm font-medium">
                   <div className="flex items-center text-accent-400">
                       <span className="w-6 h-6 rounded-full bg-accent-400 text-gray-900 flex items-center justify-center mr-2 text-xs font-bold">1</span>
                       Identité
                   </div>
                   <div className="h-px w-8 bg-white/20"></div>
                   <div className="flex items-center text-white/60">
                       <span className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-2 text-xs">2</span>
                       Scolarité
                   </div>
                   <div className="h-px w-8 bg-white/20"></div>
                   <div className="flex items-center text-white/60">
                       <span className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-2 text-xs">3</span>
                       Validation
                   </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
              
              {/* Section: Identité */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center pb-2 border-b border-gray-100">
                  <User className="w-6 h-6 mr-2 text-primary-600" /> Informations Personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nom & Prénom <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('fullName')}
                      placeholder="Votre nom complet"
                    />
                    <ErrorMsg field="fullName" />
                  </div>

                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('email')}
                        placeholder="votre@email.com"
                      />
                      <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                    <ErrorMsg field="email" />
                  </div>
                  
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Genre <span className="text-red-500">*</span></label>
                    <div className="flex space-x-4">
                      {['Masculin', 'Féminin'].map(g => (
                          <label key={g} className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                              formData.gender === g 
                              ? 'bg-primary-50 border-primary-500 text-primary-700 ring-1 ring-primary-500' 
                              : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                          }`}>
                              <input 
                                type="radio" 
                                name="gender" 
                                value={g} 
                                checked={formData.gender === g}
                                onChange={handleChange}
                                className="hidden"
                              />
                              <span className="font-medium">{g}</span>
                          </label>
                      ))}
                    </div>
                    <ErrorMsg field="gender" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Téléphone (WhatsApp) <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('phone')}
                      placeholder="06..."
                    />
                    <ErrorMsg field="phone" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Téléphone Parent <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      name="parentPhone"
                      value={formData.parentPhone} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('parentPhone')}
                      placeholder="06..."
                    />
                    <ErrorMsg field="parentPhone" />
                  </div>
                </div>
              </div>

              {/* Section: Scolarité */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center pb-2 border-b border-gray-100">
                  <GraduationCap className="w-6 h-6 mr-2 text-primary-600" /> Parcours Scolaire
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="col-span-full md:col-span-1">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Type d'établissement <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select 
                            name="schoolType" 
                            value={formData.schoolType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${getInputClass('schoolType')} appearance-none`}
                        >
                            <option value="">Sélectionner</option>
                            <option value="Public">Lycée Public</option>
                            <option value="Privé">Lycée Privé</option>
                            <option value="Mission">Mission / AEFE</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                      <ErrorMsg field="schoolType" />
                   </div>

                   <div className="col-span-full md:col-span-1">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Niveau financier famille <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select 
                            name="familyStatus" 
                            value={formData.familyStatus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${getInputClass('familyStatus')} appearance-none`}
                        >
                            <option value="">Sélectionner</option>
                            <option value="Faible">Modeste</option>
                            <option value="Moyen">Moyen</option>
                            <option value="Aisé">Aisé</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                      <ErrorMsg field="familyStatus" />
                   </div>
                   
                   <div className="col-span-full md:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Filière <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <select 
                                name="filiere" 
                                value={formData.filiere}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${getInputClass('filiere')} appearance-none`}
                            >
                                <option value="">Sélectionner</option>
                                <option value="PC">Sciences Physiques (PC)</option>
                                <option value="SVT">Sciences de la Vie et de la Terre (SVT)</option>
                                <option value="SM">Sciences Maths (A/B)</option>
                                <option value="ECO">Sciences Économiques</option>
                                <option value="SGC">Sciences de Gestion Comptable</option>
                                <option value="STE">Sciences et Technologies Électriques</option>
                                <option value="STM">Sciences et Technologies Mécaniques</option>
                                <option value="L">Lettres</option>
                                <option value="SH">Sciences Humaines</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                        <ErrorMsg field="filiere" />
                   </div>

                   <div className="col-span-full md:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Note Régional (Estimée/Réelle) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <select 
                                name="regionalGrade" 
                                value={formData.regionalGrade}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${getInputClass('regionalGrade')} appearance-none`}
                            >
                                <option value="">Sélectionner une tranche</option>
                                <option value="<10">Moins de 10</option>
                                <option value="10-12">Entre 10 et 12</option>
                                <option value="12-14">Entre 12 et 14</option>
                                <option value="14-16">Entre 14 et 16</option>
                                <option value="16-18">Entre 16 et 18</option>
                                <option value=">18">Plus de 18</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                        <ErrorMsg field="regionalGrade" />
                   </div>
                </div>
              </div>

              {/* Section: Confirmation & Paiement */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                     <CreditCard className="w-6 h-6 mr-2 text-primary-600" /> Confirmation & Paiement
                  </h3>
                  
                  <div className="mb-8">
                      <label className="block text-sm font-bold text-gray-900 mb-4">Votre Pack Sélectionné :</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {PACKS.map(pack => {
                              const styles = getThemeStyles(pack.theme);
                              const isSelected = formData.pack === pack.id;
                              return (
                                  <div 
                                    key={pack.id} 
                                    onClick={() => setFormData({...formData, pack: pack.id})}
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center group ${
                                        isSelected 
                                        ? `bg-white ${styles.activeRing} border-transparent shadow-md` 
                                        : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                      {isSelected && (
                                          <div className={`absolute top-2 right-2 w-5 h-5 rounded-full ${styles.text.replace('text-', 'bg-')} flex items-center justify-center`}>
                                              <Check className="w-3 h-3 text-white" />
                                          </div>
                                      )}
                                      <div className={`w-10 h-10 rounded-full ${styles.iconBg} ${styles.accent} flex items-center justify-center mb-3`}>
                                          {pack.icon}
                                      </div>
                                      <h4 className="font-bold text-gray-900 text-sm mb-1">{pack.title}</h4>
                                      <p className="text-xs text-gray-500">{pack.tagline}</p>
                                  </div>
                              );
                          })}
                      </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-200">
                     <p className="text-sm text-gray-700 mb-4 font-medium leading-relaxed">
                         Ce service est payant. En cochant "Oui", vous confirmez être prêt à régler les frais d'inscription une fois votre dossier validé par notre équipe.
                     </p>
                     <div className="flex space-x-6">
                        <label className="flex items-center cursor-pointer group">
                            <input 
                            type="radio" 
                            name="paymentAgreement" 
                            value="Oui" 
                            checked={formData.paymentAgreement === 'Oui'}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500 cursor-pointer"
                            />
                            <span className="ml-2 text-gray-900 font-bold group-hover:text-primary-700">Oui, je suis prêt</span>
                        </label>
                        <label className="flex items-center cursor-pointer group">
                            <input 
                            type="radio" 
                            name="paymentAgreement" 
                            value="Non" 
                            checked={formData.paymentAgreement === 'Non'}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500 cursor-pointer"
                            />
                            <span className="ml-2 text-gray-600 group-hover:text-gray-800">Non</span>
                        </label>
                     </div>
                     <ErrorMsg field="paymentAgreement" />
                  </div>
              </div>

              <div className="pt-4">
                 <button 
                    type="submit"
                    className="w-full bg-primary-900 text-white font-bold text-lg py-4 rounded-xl shadow-xl hover:bg-primary-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed group"
                 >
                    Envoyer ma demande <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                 </button>
                 <p className="text-center text-gray-400 text-xs mt-4">
                    En cliquant sur Envoyer, vous acceptez nos conditions générales de vente et de confidentialité.
                 </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  };

  const SuccessView = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-lg text-center animate-fade-in-up border border-gray-100">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Demande Reçue !</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Merci de votre confiance. Votre demande d'inscription au pack <span className="font-bold text-primary-600">{PACKS.find(p => p.id === selectedPackId)?.title}</span> a bien été enregistrée.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 text-left">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center"><LayoutList className="w-4 h-4 mr-2"/> Prochaine étape :</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                    Un conseiller Orieneduca vous contactera sous 24h sur votre numéro de téléphone pour valider votre dossier et procéder au paiement.
                </p>
            </div>
            <button 
                onClick={() => window.location.reload()} // Simple reset for demo
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors w-full shadow-lg shadow-primary-600/20"
            >
                Retour à l'accueil
            </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'PRICING' && <PricingView />}
      {view === 'FORM' && <RegistrationForm />}
      {view === 'SUCCESS' && <SuccessView />}
    </div>
  );
};
    