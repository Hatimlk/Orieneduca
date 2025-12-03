
import React, { useState } from 'react';
import { BrainCircuit, Check, ArrowRight, RefreshCw, Award, BookOpen, Briefcase, ChevronRight, PlayCircle, Activity, Lightbulb, Layers, UserCheck, ArrowDown } from 'lucide-react';
import { NavPage } from '../types';

// --- DATA & TYPES ---

type ProfileType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

interface Question {
  id: number;
  text: string;
  category: ProfileType;
}

const QUESTIONS: Question[] = [
  { id: 1, text: "J'aime réparer des objets, bricoler ou utiliser des outils.", category: 'R' },
  { id: 2, text: "J'aime résoudre des problèmes logiques, mathématiques ou scientifiques.", category: 'I' },
  { id: 3, text: "J'aime dessiner, écrire, jouer de la musique ou créer.", category: 'A' },
  { id: 4, text: "J'aime écouter, conseiller et aider les autres à résoudre leurs problèmes.", category: 'S' },
  { id: 5, text: "J'aime convaincre, vendre une idée ou diriger un groupe.", category: 'E' },
  { id: 6, text: "J'aime que les choses soient bien organisées, planifiées et structurées.", category: 'C' },
  { id: 7, text: "Je préfère travailler en plein air ou avec des machines plutôt que dans un bureau.", category: 'R' },
  { id: 8, text: "Je suis curieux de comprendre le 'pourquoi' et le 'comment' des choses.", category: 'I' },
  { id: 9, text: "J'ai beaucoup d'imagination et je n'aime pas trop suivre des règles strictes.", category: 'A' },
  { id: 10, text: "J'aime enseigner, former ou soigner des gens.", category: 'S' },
  { id: 11, text: "J'aime lancer des projets, prendre des risques et relever des défis.", category: 'E' },
  { id: 12, text: "J'aime travailler avec des chiffres, des données précises et de l'ordre.", category: 'C' },
];

const PROFILES = {
  R: {
    name: "Réaliste",
    tagline: "Le Faiseur",
    color: "text-red-600",
    bg: "bg-red-100",
    barColor: "bg-red-500",
    description: "Vous aimez le concret, l'action, le travail manuel et le plein air. Vous préférez les activités pratiques aux longues théories.",
    careers: ["Ingénieur Génie Civil", "Architecte", "Médecin Dentiste", "Pilote", "Technicien spécialisé", "Agronome"],
    schools: ["ENSA", "ENSAM", "FST", "FMP", "IAV", "EHTP"]
  },
  I: {
    name: "Investigateur",
    tagline: "Le Penseur",
    color: "text-blue-600",
    bg: "bg-blue-100",
    barColor: "bg-blue-500",
    description: "Vous êtes curieux, logique et aimez résoudre des problèmes complexes. Vous excellez dans l'analyse, la science et la recherche.",
    careers: ["Data Scientist", "Médecin", "Chercheur", "Développeur", "Analyste Financier", "Biologiste"],
    schools: ["FMP", "ENSA", "INPT", "UM6P", "FST", "ENSIAS"]
  },
  A: {
    name: "Artistique",
    tagline: "Le Créateur",
    color: "text-purple-600",
    bg: "bg-purple-100",
    barColor: "bg-purple-500",
    description: "Vous êtes créatif, intuitif et original. Vous avez besoin d'exprimer vos émotions et vos idées à travers l'art, le design ou l'innovation.",
    careers: ["Architecte", "Designer UX/UI", "Graphiste", "Journaliste", "Marketeur", "Réalisateur"],
    schools: ["ENA", "INBA", "ENCG (Marketing)", "Écoles de Design", "ISIC"]
  },
  S: {
    name: "Social",
    tagline: "L'Aidant",
    color: "text-green-600",
    bg: "bg-green-100",
    barColor: "bg-green-500",
    description: "Vous êtes empathique et aimez le contact humain. Vous vous épanouissez en aidant, enseignant, conseillant ou soignant les autres.",
    careers: ["Médecin", "Enseignant", "Psychologue", "Manager RH", "Avocat", "Infirmier"],
    schools: ["FMP", "ENS", "ISIC", "ENCG (RH)", "Faculté de Droit"]
  },
  E: {
    name: "Entreprenant",
    tagline: "Le Leader",
    color: "text-orange-600",
    bg: "bg-orange-100",
    barColor: "bg-orange-500",
    description: "Vous êtes un leader né. Vous aimez convaincre, décider et gérer des projets. L'ambition, la vente et le challenge vous motivent.",
    careers: ["Chef d'entreprise", "Manager", "Commercial", "Avocat d'affaires", "Expert-Comptable", "Chef de Projet"],
    schools: ["ENCG", "ISCAE", "Grandes Écoles de Commerce", "Droit", "HEM"]
  },
  C: {
    name: "Conventionnel",
    tagline: "L'Organisateur",
    color: "text-gray-700",
    bg: "bg-gray-200",
    barColor: "bg-gray-600",
    description: "Vous êtes organisé, méthodique et rigoureux. Vous aimez l'ordre, les chiffres, la gestion de données et le respect des procédures.",
    careers: ["Expert-Comptable", "Auditeur", "Banquier", "Notaire", "Logisticien", "Statisticien"],
    schools: ["ENCG", "ISCAE", "EST (Finance)", "Droit", "INSEA"]
  }
};

// --- COMPONENT ---

export const OrientationTests: React.FC = () => {
  const [step, setStep] = useState<'MENU' | 'QUIZ' | 'RESULT'>('MENU');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<ProfileType, number>>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });

  const startQuiz = () => {
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setCurrentQuestionIndex(0);
    setStep('QUIZ');
    window.scrollTo(0, 0);
  };

  const handleAnswer = (isYes: boolean) => {
    const currentQ = QUESTIONS[currentQuestionIndex];
    if (isYes) {
      setScores(prev => ({
        ...prev,
        [currentQ.category]: prev[currentQ.category] + 1
      }));
    }

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('RESULT');
      window.scrollTo(0, 0);
    }
  };

  const getTopProfile = (): ProfileType => {
    return (Object.keys(scores) as ProfileType[]).reduce((a, b) => scores[a] >= scores[b] ? a : b);
  };

  const MenuView = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="text-center mb-16 animate-fade-in">
        <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-bold mb-4 border border-primary-100">
            Orientation Intelligente
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Découvrez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Vraie Vocation</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Ne choisissez pas vos études au hasard. Nos tests psychométriques vous aident à identifier les carrières alignées avec votre personnalité.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Holland Test Card */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 relative group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white rounded-[1.8rem] p-8 h-full flex flex-col shadow-xl border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary-100 text-primary-600 rounded-2xl">
                        <Activity className="w-8 h-8" />
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        Le plus populaire
                    </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Test RIASEC (Holland)</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                    Le test de référence mondiale. Il analyse vos intérêts selon 6 dimensions pour révéler votre profil dominant et les métiers correspondants.
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-50">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <ClockIcon className="w-4 h-4 mr-2 text-primary-500" /> 
                        <span>Durée estimée : <b>3 min</b></span>
                    </div>
                    <button 
                        onClick={startQuiz}
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center group-hover:translate-y-[-2px]"
                    >
                        Commencer <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </div>

        {/* Future Tests (Placeholders) */}
        <div className="bg-white rounded-[1.8rem] p-8 border border-gray-200 flex flex-col opacity-80 hover:opacity-100 transition-opacity shadow-sm hover:shadow-md">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl">
                    <UserCheck className="w-8 h-8" />
                </div>
                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">
                    Bientôt
                </span>
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Test de Personnalité (MBTI)</h3>
             <p className="text-gray-500 text-sm mb-auto">Comprenez comment vous interagissez avec le monde et prenez des décisions.</p>
             <button disabled className="mt-6 w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed text-sm">
                 Disponible prochainement
             </button>
        </div>

        <div className="bg-white rounded-[1.8rem] p-8 border border-gray-200 flex flex-col opacity-80 hover:opacity-100 transition-opacity shadow-sm hover:shadow-md">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">
                    <Lightbulb className="w-8 h-8" />
                </div>
                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">
                    Bientôt
                </span>
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Test de Motivation</h3>
             <p className="text-gray-500 text-sm mb-auto">Identifiez vos moteurs internes pour choisir un environnement de travail stimulant.</p>
             <button disabled className="mt-6 w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed text-sm">
                 Disponible prochainement
             </button>
        </div>
      </div>
    </div>
  );

  const QuizView = () => {
    const currentQ = QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
         <div className="w-full max-w-2xl mb-8 flex items-center justify-between px-2">
             <button onClick={() => setStep('MENU')} className="text-gray-400 hover:text-gray-600 font-medium text-sm flex items-center">
                 <ArrowLeftIcon className="w-4 h-4 mr-1" /> Quitter
             </button>
             <span className="text-gray-400 text-sm font-mono">
                 {currentQuestionIndex + 1} / {QUESTIONS.length}
             </span>
         </div>

         <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in relative overflow-hidden">
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                <div className="bg-primary-600 h-full transition-all duration-500 ease-out" style={{width: `${progress}%`}}></div>
            </div>

            <div className="text-center mt-4">
                <span className="inline-block p-3 bg-primary-50 text-primary-600 rounded-full mb-6">
                    <BrainCircuit className="w-8 h-8" />
                </span>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 leading-snug min-h-[100px] flex items-center justify-center">
                    "{currentQ.text}"
                </h2>

                {/* Interaction Buttons */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <button 
                        onClick={() => handleAnswer(false)}
                        className="group relative py-6 rounded-2xl border-2 border-gray-100 hover:border-red-100 bg-white hover:bg-red-50 transition-all duration-200 flex flex-col items-center justify-center active:scale-95"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 group-hover:bg-red-200 group-hover:text-red-600 flex items-center justify-center mb-3 transition-colors">
                            <XIcon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-500 group-hover:text-red-700 font-bold text-lg">Non</span>
                    </button>
                    
                    <button 
                        onClick={() => handleAnswer(true)}
                        className="group relative py-6 rounded-2xl border-2 border-gray-100 hover:border-green-100 bg-white hover:bg-green-50 transition-all duration-200 flex flex-col items-center justify-center active:scale-95"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 group-hover:bg-green-200 group-hover:text-green-600 flex items-center justify-center mb-3 transition-colors">
                            <Check className="w-5 h-5" />
                        </div>
                        <span className="text-gray-500 group-hover:text-green-700 font-bold text-lg">Oui</span>
                    </button>
                </div>
            </div>
         </div>
         <p className="mt-8 text-gray-400 text-sm">Répondez spontanément pour un meilleur résultat.</p>
      </div>
    );
  };

  const ResultView = () => {
    const topProfileCode = getTopProfile();
    const profile = PROFILES[topProfileCode];

    // Sort profiles by score to show ranking
    const sortedProfiles = (Object.keys(scores) as ProfileType[]).sort((a, b) => scores[b] - scores[a]);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
         
         <div className="mb-8">
             <button onClick={() => setStep('MENU')} className="flex items-center text-gray-500 hover:text-primary-600 transition-colors">
                 <ArrowLeftIcon className="w-4 h-4 mr-2" /> Retour aux tests
             </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             
             {/* Main Result Card */}
             <div className="lg:col-span-8">
                 <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 h-full">
                     <div className={`p-10 md:p-14 ${profile.bg} relative overflow-hidden`}>
                         {/* Decorative Circles */}
                         <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                         <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
                         
                         <div className="relative z-10">
                             <span className="inline-flex items-center bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-6 shadow-sm">
                                 <Award className="w-3 h-3 mr-2 text-yellow-500" /> Résultat Analyse
                             </span>
                             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
                                 Profil <span className={profile.color}>{profile.name}</span>
                             </h2>
                             <p className={`text-xl font-medium opacity-70 mb-6 ${profile.color}`}>"{profile.tagline}"</p>
                             <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                                 {profile.description}
                             </p>
                         </div>
                     </div>

                     <div className="p-10 md:p-14">
                         <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                             <Layers className="w-6 h-6 mr-3 text-gray-400" /> Décomposition de votre profil
                         </h3>
                         
                         <div className="space-y-6">
                             {sortedProfiles.map(key => {
                                 const p = PROFILES[key];
                                 const score = scores[key];
                                 const maxScore = QUESTIONS.filter(q => q.category === key).length;
                                 const percent = Math.round((score / maxScore) * 100);
                                 
                                 return (
                                     <div key={key} className="relative">
                                         <div className="flex justify-between items-end mb-2">
                                             <div className="flex items-center">
                                                 <span className={`font-bold text-sm w-24 ${key === topProfileCode ? 'text-gray-900' : 'text-gray-500'}`}>
                                                     {p.name}
                                                 </span>
                                             </div>
                                             <span className="text-xs font-bold text-gray-400">{percent}%</span>
                                         </div>
                                         <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                             <div 
                                                className={`h-full rounded-full transition-all duration-1000 ease-out ${p.barColor}`} 
                                                style={{width: `${percent}%`}}
                                            ></div>
                                         </div>
                                     </div>
                                 );
                             })}
                         </div>
                     </div>
                 </div>
             </div>

             {/* Sidebar Actions */}
             <div className="lg:col-span-4 space-y-6">
                 
                 {/* Careers Card */}
                 <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                     <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                         <Briefcase className="w-5 h-5 mr-2 text-blue-600" /> Métiers Suggérés
                     </h3>
                     <div className="flex flex-wrap gap-2">
                         {profile.careers.map(career => (
                             <span key={career} className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                                 {career}
                             </span>
                         ))}
                     </div>
                 </div>

                 {/* Schools Card */}
                 <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                     <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                         <BookOpen className="w-5 h-5 mr-2 text-green-600" /> Écoles à cibler
                     </h3>
                     <ul className="space-y-3 mb-6">
                         {profile.schools.map(school => (
                             <li key={school} className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                 <Check className="w-4 h-4 mr-2 text-green-500" /> {school}
                             </li>
                         ))}
                     </ul>
                     <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center">
                         Voir ces écoles <ArrowRight className="w-4 h-4 ml-2" />
                     </button>
                 </div>

                 <button 
                    onClick={() => { setStep('MENU'); window.scrollTo(0,0); }}
                    className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-bold hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 transition-all flex items-center justify-center"
                 >
                    <RefreshCw className="w-4 h-4 mr-2" /> Refaire le test
                 </button>
             </div>
         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {step === 'MENU' && <MenuView />}
       {step === 'QUIZ' && <QuizView />}
       {step === 'RESULT' && <ResultView />}
    </div>
  );
};

// Helper Icons
const ClockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);