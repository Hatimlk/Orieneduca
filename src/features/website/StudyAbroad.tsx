import React, { useState, useMemo, useEffect } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, BookCheck, BookOpen, BrainCircuit, Briefcase, Calculator, Check, CheckCircle, ChevronDown, Compass, Cpu, DollarSign, Euro, ExternalLink, Filter, Globe, GraduationCap, Heart, Languages, Mail, MapPin, Phone, Plane, Search, Send, ShieldCheck, Sparkles, Star, TrendingUp, User } from 'lucide-react';
import { MOCK_UNIVERSITIES } from '../../constants';

type ViewState = 'HUB' | 'FORM' | 'SUCCESS';
type Tab = 'GUIDES' | 'SIMULATOR' | 'MATCHING';

// --- MOCK DATA FOR TOOLS ---

const CITIES_DATA: Record<string, { country: string, rent: number, food: number, transport: number, insurance: number, leisure: number, currency: string, rate: number }> = {
    'Paris': { country: 'France', rent: 850, food: 300, transport: 75, insurance: 50, leisure: 150, currency: '€', rate: 11 },
    'Lyon': { country: 'France', rent: 550, food: 250, transport: 35, insurance: 50, leisure: 100, currency: '€', rate: 11 },
    'Toulouse': { country: 'France', rent: 500, food: 220, transport: 20, insurance: 50, leisure: 90, currency: '€', rate: 11 },
    'Istanbul': { country: 'Turquie', rent: 350, food: 150, transport: 30, insurance: 30, leisure: 80, currency: '€', rate: 11 }, // Normalized to EUR for comparison
    'Ankara': { country: 'Turquie', rent: 250, food: 120, transport: 20, insurance: 30, leisure: 60, currency: '€', rate: 11 },
    'Shanghai': { country: 'Chine', rent: 600, food: 200, transport: 40, insurance: 25, leisure: 100, currency: '€', rate: 11 },
    'Wuhan': { country: 'Chine', rent: 300, food: 150, transport: 20, insurance: 25, leisure: 70, currency: '€', rate: 11 },
};

// Simulated API Fetch functionality
const fetchUniversities = async (): Promise<any[]> => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/universities`);
    // return response.json();
    return new Promise(resolve => setTimeout(() => resolve(MOCK_UNIVERSITIES), 300));
};

export const StudyAbroad: React.FC = () => {
    const [activeTool, setActiveTool] = useState<Tab>('GUIDES');
    const [activeCountryTab, setActiveCountryTab] = useState<'FR' | 'CN' | 'TR'>('FR');
    const [view, setView] = useState<ViewState>('HUB');

    // Simulator State
    const [simCity, setSimCity] = useState('Paris');
    const [simTuition, setSimTuition] = useState(170);

    const [matchGrade, setMatchGrade] = useState(12);
    const [matchBudget, setMatchBudget] = useState(5000);
    const [matchField, setMatchField] = useState('All');
    const [matchLanguage, setMatchLanguage] = useState('All');
    const [matchLevel, setMatchLevel] = useState('All');

    const [universities, setUniversities] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchUniversities();
            setUniversities(data);
        };
        loadData();
    }, []);

    const countries = {
        FR: {
            name: 'France',
            flag: '🇫🇷',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            tagline: "La destination N°1 des étudiants marocains.",
            steps: [
                "Créez un dossier sur la plateforme 'Études en France' (Campus France).",
                "Passez le test de langue TCF ou DELF (Niveau B2 minimum recommandé).",
                "Soumettez vos candidatures (jusqu'à 7 vœux selon le niveau).",
                "Passez l'entretien Campus France.",
                "Recevez les admissions et lancez la procédure Visa long séjour."
            ],
            cost: "Blocage bancaire d'environ 7380€ (615€/mois) ou garant résidant en France.",
            scholarships: "Bourses d'Excellence Eiffel, Bourses du gouvernement français (BGF), Exonération partielle des droits."
        },
        CN: {
            name: 'Chine',
            flag: '🇨🇳',
            image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            tagline: "Une puissance mondiale avec des bourses généreuses.",
            steps: [
                "Choisissez votre programme (enseigné en anglais ou chinois).",
                "Postulez via le portail CSC (China Scholarship Council) pour les bourses.",
                "Ou postulez directement auprès de l'université (CUCAS).",
                "Obtenez la lettre d'admission (JW201/JW202).",
                "Demandez le Visa X1 (études > 6 mois) à l'ambassade."
            ],
            cost: "Coût de la vie très abordable. Frais de scolarité souvent couverts par les bourses CSC (type A ou B).",
            scholarships: "CSC Scholarship (couverture totale : frais + logement + argent de poche), Bourses provinciales, Bourses de la Route de la Soie."
        },
        TR: {
            name: 'Turquie',
            flag: '🇹🇷',
            image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            tagline: "Le pont entre l'Orient et l'Occident.",
            steps: [
                "Préparez le dossier (Bac traduit, relevés de notes).",
                "Passez l'examen YÖS pour les universités publiques (optionnel pour le privé).",
                "Postulez via 'Türkiye Bursları' pour les bourses (Janvier-Février).",
                "Ou postulez directement aux universités privées (admission sur dossier).",
                "Demandez le visa étudiant une fois l'acceptation reçue."
            ],
            cost: "Public : 300-800€/an. Privé : 2000€-8000€/an. Vie : 300-400€/mois.",
            scholarships: "Türkiye Bursları (Bourse complète très sélective), Bourses partielles des universités privées (jusqu'à 50%)."
        }
    };

    const ContactForm = () => {
        const [isSubmitting, setIsSubmitting] = useState(false);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setView('SUCCESS');
                window.scrollTo(0, 0);
            }, 1500);
        };

        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={() => setView('HUB')}
                        className="flex items-center text-gray-500 hover:text-primary-600 font-medium mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Retour
                    </button>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-primary-900 p-8 text-white text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-50">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-accent-500 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20 shadow-lg">
                                    <ShieldCheck className="w-8 h-8 text-accent-400" />
                                </div>
                                <h2 className="text-2xl font-bold">Dossier d'inscription</h2>
                                <p className="text-primary-100 mt-2 text-sm font-medium">Laissez nos experts gérer vos démarches administratives.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nom complet</label>
                                <input type="text" required className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-gray-50 focus:bg-white" placeholder="Votre nom" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Téléphone</label>
                                <input type="tel" required className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-gray-50 focus:bg-white" placeholder="06..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Destination souhaitée</label>
                                <select className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-gray-50 focus:bg-white">
                                    <option>France</option>
                                    <option>Chine</option>
                                    <option>Turquie</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all mt-2">
                                {isSubmitting ? 'Envoi...' : 'Confier mon dossier'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    const SuccessView = () => (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 animate-fade-in-up">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-green-50">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Demande Reçue !</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">Notre équipe vous contactera sous 24h.</p>
                <button onClick={() => setView('HUB')} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors w-full">
                    Retour
                </button>
            </div>
        </div>
    );

    // --- TOOL: COST SIMULATOR ---
    const CostSimulator = () => {
        const cityData = CITIES_DATA[simCity];
        const monthlyTotal = cityData.rent + cityData.food + cityData.transport + cityData.insurance + cityData.leisure;
        const yearlyTotal = (monthlyTotal * 10) + Number(simTuition); // 10 months living + tuition
        const inMAD = yearlyTotal * cityData.rate;

        return (
            <div className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Inputs */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-primary-600" /> Destination
                            </h3>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                            <select
                                value={simCity}
                                onChange={(e) => setSimCity(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none"
                            >
                                {Object.keys(CITIES_DATA).map(c => <option key={c} value={c}>{c} ({CITIES_DATA[c].country})</option>)}
                            </select>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2 text-primary-600" /> Scolarité
                            </h3>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Frais annuels (Estimés en €)</label>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    value={simTuition}
                                    onChange={(e) => setSimTuition(Number(e.target.value))}
                                    className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                                <span className="ml-2 font-bold text-gray-500">€</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Public France ~170€-601€ | Privé {' > '} 5000€</p>
                        </div>
                    </div>

                    {/* Breakdown & Total */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
                                <h3 className="text-xl font-bold">Budget Estimé pour {simCity}</h3>
                                <Calculator className="w-6 h-6 text-accent-400" />
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Dépenses Mensuelles</h4>
                                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                                            <span className="text-gray-700 flex items-center"><Building className="w-4 h-4 mr-2" /> Loyer</span>
                                            <span className="font-bold">{cityData.rent} €</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                                            <span className="text-gray-700 flex items-center"><Utensils className="w-4 h-4 mr-2" /> Nourriture</span>
                                            <span className="font-bold">{cityData.food} €</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                                            <span className="text-gray-700 flex items-center"><Bus className="w-4 h-4 mr-2" /> Transport</span>
                                            <span className="font-bold">{cityData.transport} €</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                                            <span className="text-gray-700 flex items-center"><Drama className="w-4 h-4 mr-2" /> Loisirs</span>
                                            <span className="font-bold">{cityData.leisure} €</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                                        <p className="text-gray-500 font-medium mb-2">Coût Total Annuel (10 mois + Frais)</p>
                                        <p className="text-4xl font-extrabold text-primary-600 mb-2">{yearlyTotal.toLocaleString()} €</p>
                                        <p className="text-lg font-bold text-gray-400">≈ {inMAD.toLocaleString()} MAD</p>
                                        <p className="text-xs text-gray-400 mt-4 italic">*Estimation basée sur un mode de vie étudiant standard.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- TOOL: UNIVERSITY MATCHING ---
    const UniversityMatcher = () => {
        const getLevelScore = (lvl: string) => {
            if (lvl === 'B1') return 1;
            if (lvl === 'B2') return 2;
            if (lvl === 'C1') return 3;
            if (lvl === 'C2') return 4;
            return 0;
        };

        const matches = useMemo(() => {
            return universities.filter(uni => {
                const gradeMatch = uni.minGrade <= matchGrade;
                const budgetMatch = uni.tuition <= matchBudget;
                const fieldMatch = matchField === 'All' || uni.field === matchField;

                // Enhanced Matching Logic
                const languageMatch = matchLanguage === 'All' || uni.language === matchLanguage;
                const levelMatch = matchLevel === 'All' || getLevelScore(uni.level) <= getLevelScore(matchLevel); // Show unis where requirement is lower or equal to my level

                return gradeMatch && budgetMatch && fieldMatch && languageMatch && levelMatch;
            });
        }, [universities, matchGrade, matchBudget, matchField, matchLanguage, matchLevel]);

        return (
            <div className="animate-fade-in">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ma Moyenne</label>
                            <div className="flex items-center">
                                <input
                                    type="range" min="10" max="20" step="0.5"
                                    value={matchGrade}
                                    onChange={(e) => setMatchGrade(Number(e.target.value))}
                                    className="w-full mr-3 accent-primary-600 h-2 bg-gray-200 rounded-lg appearance-none"
                                />
                                <span className="font-bold text-primary-600 w-12 text-sm">{matchGrade}/20</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Budget Annuel (Max)</label>
                            <div className="flex items-center">
                                <input
                                    type="range" min="0" max="20000" step="500"
                                    value={matchBudget}
                                    onChange={(e) => setMatchBudget(Number(e.target.value))}
                                    className="w-full mr-3 accent-green-600 h-2 bg-gray-200 rounded-lg appearance-none"
                                />
                                <span className="font-bold text-green-600 w-16 text-sm">{matchBudget}€</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Domaine</label>
                            <select
                                value={matchField}
                                onChange={(e) => setMatchField(e.target.value)}
                                className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-primary-500 outline-none"
                            >
                                <option value="All">Tous les domaines</option>
                                <option value="Ingénierie">Ingénierie</option>
                                <option value="Commerce">Commerce</option>
                                <option value="Médecine">Médecine</option>
                                <option value="Sciences">Sciences</option>
                                <option value="Architecture">Architecture</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Langue</label>
                                <select
                                    value={matchLanguage}
                                    onChange={(e) => setMatchLanguage(e.target.value)}
                                    className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    <option value="All">Toutes</option>
                                    <option value="Français">Français</option>
                                    <option value="Anglais">Anglais</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Niveau</label>
                                <select
                                    value={matchLevel}
                                    onChange={(e) => setMatchLevel(e.target.value)}
                                    className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    <option value="All">Tous</option>
                                    <option value="B1">B1</option>
                                    <option value="B2">B2</option>
                                    <option value="C1">C1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.length > 0 ? matches.map(uni => (
                        <div key={uni.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all group flex flex-col h-full">
                            <div className="h-40 overflow-hidden relative shrink-0">
                                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    {uni.country}
                                </div>
                                <div className="absolute bottom-3 left-3 flex gap-2">
                                    <span className="bg-black/50 backdrop-blur text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center">
                                        <Languages className="w-3 h-3 mr-1" /> {uni.language} {uni.level}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{uni.name}</h3>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded shrink-0 ml-2">Match</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4 flex items-center"><MapPin className="w-3 h-3 mr-1" /> {uni.city}</p>

                                <div className="mb-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center"><BookCheck className="w-3 h-3 mr-1" /> Matières Clés</p>
                                    <div className="flex flex-wrap gap-1">
                                        {uni.requiredSubjects.map((subj, idx) => (
                                            <span key={idx} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-medium">
                                                {subj}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Frais / an</p>
                                        <p className="font-bold text-gray-900">{uni.tuition} €</p>
                                    </div>
                                    <button onClick={() => setView('FORM')} className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors">
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500 font-medium">Aucune université ne correspond à ces critères.</p>
                            <p className="text-sm text-gray-400 mt-1">Essayez d'augmenter votre budget ou d'ajuster le niveau de langue.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const GuidesView = () => {
        const currentCountry = countries[activeCountryTab];
        return (
            <div className="animate-fade-in">
                {/* Country Tabs */}
                <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
                    {(Object.keys(countries) as Array<keyof typeof countries>).map((code) => (
                        <button
                            key={code}
                            onClick={() => setActiveCountryTab(code)}
                            className={`flex items-center px-5 py-3 rounded-xl transition-all font-bold text-sm whitespace-nowrap ${activeCountryTab === code
                                ? 'bg-white text-primary-700 shadow-md ring-1 ring-primary-100'
                                : 'bg-gray-100 text-gray-500 hover:bg-white hover:shadow-sm'
                                }`}
                        >
                            <span className="mr-2 text-xl">{countries[code].flag}</span>
                            {countries[code].name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="rounded-3xl overflow-hidden shadow-xl h-64 relative group">
                            <img
                                src={currentCountry.image}
                                alt={currentCountry.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                                <div>
                                    <h2 className="text-white text-3xl font-bold mb-2">{currentCountry.name}</h2>
                                    <p className="text-white/90 font-medium">{currentCountry.tagline}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <DollarSign className="w-5 h-5 mr-2 text-green-600" /> Budget & Coût
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {currentCountry.cost}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2 text-accent-600" /> Bourses Disponibles
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {currentCountry.scholarships}
                            </p>
                        </div>
                    </div>

                    {/* Right: Procedure */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-8 bg-gray-50 border-b border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <BookOpen className="w-6 h-6 mr-3 text-primary-600" /> Procédure Universitaire
                                </h3>
                            </div>
                            <div className="p-8">
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
                                    {currentCountry.steps.map((step, index) => (
                                        <div key={index} className="relative flex items-start group">
                                            <div className="absolute left-0 ml-5 -translate-x-1/2 translate-y-0.5 border-4 border-white rounded-full z-10">
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary-600 text-white font-bold text-xs shadow-sm">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div className="ml-12 w-full">
                                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                                                    <p className="text-gray-700 font-medium">{step}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- MAIN RENDER ---

    if (view === 'FORM') return <ContactForm />;
    if (view === 'SUCCESS') return <SuccessView />;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* Hero Header */}
            <div className="bg-primary-900 text-white relative overflow-hidden py-12 mb-8">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
                    <div className="absolute -left-20 bottom-0 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                        Étudier à l'Étranger
                    </h1>
                    <p className="text-xl text-primary-100 max-w-2xl">
                        Explorez les opportunités, calculez votre budget et trouvez l'université de vos rêves.
                    </p>
                </div>
            </div>

            {/* Tools Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-12">
                <div className="bg-white rounded-2xl shadow-xl p-3 flex flex-col md:flex-row gap-2 border border-gray-100">
                    <button
                        onClick={() => setActiveTool('GUIDES')}
                        className={`flex-1 flex items-center justify-center py-4 rounded-xl font-bold transition-all ${activeTool === 'GUIDES' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Globe className="w-5 h-5 mr-2" /> Guides Destinations
                    </button>
                    <button
                        onClick={() => setActiveTool('SIMULATOR')}
                        className={`flex-1 flex items-center justify-center py-4 rounded-xl font-bold transition-all ${activeTool === 'SIMULATOR' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Calculator className="w-5 h-5 mr-2" /> Simulateur Coût
                    </button>
                    <button
                        onClick={() => setActiveTool('MATCHING')}
                        className={`flex-1 flex items-center justify-center py-4 rounded-xl font-bold transition-all ${activeTool === 'MATCHING' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Heart className="w-5 h-5 mr-2" /> Université Match
                    </button>
                </div>
            </div>

            {/* Active View Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {activeTool === 'GUIDES' && <GuidesView />}
                {activeTool === 'SIMULATOR' && <CostSimulator />}
                {activeTool === 'MATCHING' && <UniversityMatcher />}
            </div>

            {/* Global CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="bg-gradient-to-r from-gray-900 to-primary-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Besoin d'un accompagnement personnalisé ?</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Nos consultants experts s'occupent de votre dossier de A à Z : choix, inscription, visa et logement.</p>
                        <button
                            onClick={() => setView('FORM')}
                            className="bg-accent-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-400 transition-all shadow-lg shadow-accent-500/20 transform hover:-translate-y-1 flex items-center justify-center mx-auto"
                        >
                            <ShieldCheck className="w-5 h-5 mr-2" /> Confier mon dossier
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

// Helper Icons needed
const Building = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="22" /><line x1="15" y1="22" x2="15" y2="22" /><line x1="12" y1="22" x2="12" y2="22" /><line x1="12" y1="2" x2="12" y2="22" /><line x1="4" y1="10" x2="20" y2="10" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="14" x2="20" y2="14" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
);
const Utensils = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
);
const Bus = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 6v6" /><path d="M15 6v6" /><path d="M2 12h19.6" /><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" /><circle cx="7" cy="18" r="2" /><path d="M9 18h5" /><circle cx="16" cy="18" r="2" /></svg>
);
const Drama = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 10v.01" /><path d="M14 10v.01" /><path d="M10 14a3.5 3.5 0 0 0 4 0" /><path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10Z" /></svg>
);
