
import React, { useState, useMemo, useEffect } from 'react';
import { Globe, DollarSign, Calendar, Tag, ArrowUpRight, Search, MapPin, Filter, GraduationCap, CheckCircle, X, ChevronRight, ShieldCheck, Calculator, Info, ExternalLink, Landmark, Radio, Bell, FileText, AlertCircle, CheckSquare, Clock, Download, Send, Check, ArrowRight, Sparkles, Brain, Lock, Loader } from 'lucide-react';
import { MOCK_SCHOLARSHIPS } from '../../constants';
import { Scholarship } from '../../types';
import { ScholarshipService } from '../../services/ScholarshipService'; // Import Service

export const ScholarshipFinder: React.FC = () => {
    const [activeLocation, setActiveLocation] = useState<'All' | 'Maroc' | 'Étranger'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

    // Wizard State
    const [wizardStep, setWizardStep] = useState(1);
    const [profile, setProfile] = useState({
        grade: 14,
        branch: 'SM',
        parentJob: 'Autre',
        rsu: '',
        city: 'Casablanca'
    });
    const [showWizard, setShowWizard] = useState(true);

    // Data State
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLiveToast, setShowLiveToast] = useState(false);

    // Fetch Data
    useEffect(() => {
        const loadScholarships = async () => {
            setLoading(true);
            const data = await ScholarshipService.getAll();
            setScholarships(data);
            setLoading(false);
        };
        loadScholarships();
    }, []);
    const [latestScholarship, setLatestScholarship] = useState<Scholarship | null>(null);

    // Simulate Real-time Updates
    useEffect(() => {
        const timer = setTimeout(() => {
            const newScholarship: Scholarship = {
                id: 'live-1',
                title: 'Bourse de Coopération Roumanie 2024',
                provider: 'Mabourse.enssup.gov.ma',
                location: 'Étranger',
                country: 'Roumanie',
                type: 'Coopération',
                deadline: '30 Mai',
                value: 'Bourse complète + Logement',
                description: 'Nouvelle offre de bourses par le gouvernement roumain pour les cycles Master et Doctorat. Priorité aux filières techniques.',
                eligibility: ['Nationalité Marocaine', 'Bon dossier académique'],
                targetLevels: ['Master', 'Doctorat'],
                imageUrl: 'https://images.unsplash.com/photo-1545424436-722293297f71?auto=format&fit=crop&w=1000&q=80',
                tags: ['Nouveau', 'Europe', 'Enssup']
            };

            // Check if already added to avoid duplicates
            setScholarships(prev => {
                if (prev.find(s => s.id === newScholarship.id)) return prev;
                return [newScholarship, ...prev];
            });
            setLatestScholarship(newScholarship);
            setShowLiveToast(true);

            setTimeout(() => setShowLiveToast(false), 8000);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    // Helper to parse French date strings like "31 Juillet" to get days remaining
    const getUrgency = (deadlineStr: string) => {
        const months: Record<string, number> = {
            'Janvier': 0, 'Février': 1, 'Mars': 2, 'Avril': 3, 'Mai': 4, 'Juin': 5,
            'Juillet': 6, 'Août': 7, 'Septembre': 8, 'Octobre': 9, 'Novembre': 10, 'Décembre': 11
        };

        try {
            const parts = deadlineStr.split(' ');
            if (parts.length < 2) return { label: 'Non défini', color: 'bg-gray-100 text-gray-600', urgent: false };

            const day = parseInt(parts[0]);
            const month = months[parts[1]];

            const now = new Date();
            const currentYear = now.getFullYear();

            let deadline = new Date(currentYear, month, day);

            // Logic to handle dates that might be for next year if passed
            if (deadline < now && (now.getTime() - deadline.getTime() > 30 * 24 * 60 * 60 * 1000)) {
                deadline.setFullYear(currentYear + 1);
            }

            const diffTime = deadline.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 0) return { label: 'Terminé', color: 'bg-red-100 text-red-600', urgent: false };
            if (diffDays <= 7) return { label: `J-${diffDays} Urgent`, color: 'bg-red-500 text-white animate-pulse', urgent: true };
            if (diffDays <= 30) return { label: `J-${diffDays}`, color: 'bg-orange-100 text-orange-700', urgent: true };

            return { label: 'Ouvert', color: 'bg-green-100 text-green-700', urgent: false };
        } catch (e) {
            return { label: 'Ouvert', color: 'bg-gray-100 text-gray-600', urgent: false };
        }
    };

    // Match Logic
    const calculateMatch = (s: Scholarship) => {
        let score = 0;
        const criteria = s.criteria;

        if (!criteria) return 50; // Default score for basic scholarships

        // Academic
        if (criteria.minGrade && profile.grade >= criteria.minGrade) score += 40;
        else if (criteria.minGrade && profile.grade >= criteria.minGrade - 1) score += 20; // Close enough

        // Social / Sector
        if (criteria.targetSector === 'All') score += 10;
        if (criteria.targetSector === profile.parentJob) score += 40; // Huge boost for sector match (FM6, OCP)
        if (criteria.socialCriteria && profile.rsu && parseFloat(profile.rsu) < 9.32) score += 20;

        // Location
        if (criteria.targetCities && criteria.targetCities.includes(profile.city)) score += 20;

        return Math.min(100, score);
    };

    // Filter Logic
    const filteredScholarships = useMemo(() => {
        let filtered = scholarships.filter(s => {
            const matchesLocation = activeLocation === 'All' || s.location === activeLocation;
            const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.country.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === 'All' || s.type === selectedType;

            return matchesLocation && matchesSearch && matchesType;
        });

        // Sort by match score if wizard is active
        if (showWizard) {
            filtered = filtered.sort((a, b) => calculateMatch(b) - calculateMatch(a));
        }

        return filtered;
    }, [scholarships, activeLocation, searchTerm, selectedType, showWizard, profile]); // Add profile to deps

    // Minhaty Guide Component (Internal Tool for Modal)
    const MinhatyGuide = () => {
        const [cycle, setCycle] = useState('Licence');
        const [residence, setResidence] = useState('Loin'); // Loin = Zone A, Proche = Zone B

        const calculateMinhaty = () => {
            if (cycle === 'Doctorat') {
                return { quarterly: 3000, yearly: 12000, label: 'Bourse de Recherche' };
            }
            if (residence === 'Loin') {
                return { quarterly: 1900.20, yearly: 6334, label: 'Bourse Complète (Zone A)' };
            } else {
                return { quarterly: 950.10, yearly: 3167, label: 'Demi-Bourse (Zone B)' };
            }
        };

        const result = calculateMinhaty();

        return (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in">
                <div className="bg-[#006233] text-white p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                    <div className="relative z-10 flex justify-between items-center">
                        <h3 className="font-bold flex items-center">
                            <Calculator className="w-5 h-5 mr-2" /> Simulateur Minhaty
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold">Officiel</span>
                    </div>
                </div>

                <div className="p-5 space-y-5">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Cycle d'Études</label>
                        <div className="flex p-1 bg-gray-100 rounded-lg">
                            {['Licence', 'Master', 'Doctorat'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => setCycle(c)}
                                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${cycle === c ? 'bg-white text-[#006233] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {cycle !== 'Doctorat' && (
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Lieu de Résidence</label>
                            <div className="flex p-1 bg-gray-100 rounded-lg">
                                <button
                                    onClick={() => setResidence('Loin')}
                                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${residence === 'Loin' ? 'bg-white text-[#006233] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Zone A (Autre ville)
                                </button>
                                <button
                                    onClick={() => setResidence('Proche')}
                                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${residence === 'Proche' ? 'bg-white text-[#006233] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Zone B (Même ville)
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="bg-[#f0fdf4] border border-green-200 rounded-xl p-4 text-center relative">
                        <div className="absolute top-2 right-2">
                            <CheckCircle className="w-4 h-4 text-green-600 opacity-50" />
                        </div>
                        <p className="text-[10px] font-bold text-green-800 uppercase tracking-wide mb-1">{result.label}</p>
                        <div className="flex items-end justify-center gap-1">
                            <span className="text-3xl font-extrabold text-[#006233]">{result.quarterly.toLocaleString('fr-MA')}</span>
                            <span className="text-xs font-bold text-green-700 mb-1.5">DH / trimestre</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Modal for Details with Tabs
    const ScholarshipDetailModal = ({ scholarship, onClose }: { scholarship: Scholarship, onClose: () => void }) => {
        const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'docs' | 'apply'>('overview');
        const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

        const documentsList = [
            "Copie de la CIN ou Passeport",
            "Relevés de notes du Bac",
            "Attestation d'inscription",
            "Photo d'identité récente",
            scholarship.type === 'Sociale' ? "Attestation de revenu des parents" : "Lettre de motivation",
            scholarship.location === 'Étranger' ? "Certificat de langue (TCF/TOEFL)" : "Certificat de résidence"
        ];

        const toggleDoc = (doc: string) => {
            setCheckedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
        };

        const progress = (Object.values(checkedDocs).filter(Boolean).length / documentsList.length) * 100;

        const handleAICoach = () => {
            const prompt = `Je postule pour la bourse ${scholarship.title}. Mon profil : ${profile.grade}/20, Parent ${profile.parentJob}. Aide-moi à structurer ma lettre en mettant en avant mes atouts pour ce programme spécifique.`;
            const event = new CustomEvent('open-ai-chat', { detail: { message: prompt } });
            window.dispatchEvent(event);
            onClose();
        };

        if (!scholarship) return null;

        return (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
                <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl relative z-10 overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">

                    {/* Header with Image */}
                    <div className="h-48 relative shrink-0">
                        <img src={scholarship.imageUrl} alt={scholarship.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-all z-20">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm ${scholarship.location === 'Maroc' ? 'bg-green-600' : 'bg-blue-600'}`}>
                                    {scholarship.country}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/30">
                                    {scholarship.type}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight shadow-black drop-shadow-md">{scholarship.title}</h2>
                            <p className="text-white/80 font-medium mt-1 flex items-center text-sm">
                                <Landmark className="w-4 h-4 mr-2" /> {scholarship.provider}
                            </p>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex border-b border-gray-100 px-6 md:px-8 pt-2 shrink-0 overflow-x-auto scrollbar-hide bg-white">
                        {[
                            { id: 'overview', label: 'Aperçu', icon: <Info className="w-4 h-4" /> },
                            { id: 'eligibility', label: 'Conditions', icon: <CheckCircle className="w-4 h-4" /> },
                            { id: 'docs', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
                            { id: 'apply', label: scholarship.id === 'minhaty' ? 'Simulateur' : 'Postuler', icon: scholarship.id === 'minhaty' ? <Calculator className="w-4 h-4" /> : <Send className="w-4 h-4" /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center pb-3 pt-3 mr-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-primary-600 text-primary-700'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 md:p-8 overflow-y-auto bg-gray-50/50 flex-1">
                        {activeTab === 'overview' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Valeur</p>
                                        <p className="text-sm font-bold text-gray-900 leading-tight">{scholarship.value}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Date Limite</p>
                                        <p className="text-sm font-bold text-orange-600">{scholarship.deadline}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Niveau</p>
                                        <p className="text-sm font-bold text-gray-900">{scholarship.targetLevels.join(', ')}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Type</p>
                                        <p className="text-sm font-bold text-gray-900">{scholarship.type}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">À propos du programme</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {scholarship.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'eligibility' && (
                            <div className="animate-fade-in">
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Critères d'éligibilité</h3>
                                    <ul className="space-y-3">
                                        {scholarship.eligibility.map((criteria, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-700 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                                                <span className="mt-0.5">{criteria}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3">
                                        <Info className="w-5 h-5 text-blue-600 shrink-0" />
                                        <p className="text-xs text-blue-800">
                                            Assurez-vous de remplir toutes les conditions avant de postuler. Les dossiers incomplets sont systématiquement rejetés.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'docs' && (
                            <div className="animate-fade-in h-full flex flex-col">
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">Checklist des pièces</h3>
                                        <span className="text-xs font-bold bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                                            {Math.round(progress)}% Prêt
                                        </span>
                                    </div>

                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                                        <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>

                                    <div className="space-y-3">
                                        {documentsList.map((doc, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => toggleDoc(doc)}
                                                className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${checkedDocs[doc]
                                                    ? 'bg-green-50 border-green-200'
                                                    : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-sm'
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-4 transition-colors ${checkedDocs[doc] ? 'bg-green-500 border-green-500' : 'border-gray-400 bg-white'
                                                    }`}>
                                                    {checkedDocs[doc] && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <span className={`text-sm font-medium ${checkedDocs[doc] ? 'text-green-800 line-through opacity-70' : 'text-gray-700'}`}>
                                                    {doc}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {scholarship.type === 'Excellence' && (
                                        <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                                    <Brain className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-sm mb-1">Coach IA pour Lettre de Motivation</h4>
                                                    <p className="text-xs text-gray-600 mb-3">L'IA peut analyser votre profil et les critères de {scholarship.provider} pour générer un plan détaillé.</p>
                                                    <button
                                                        onClick={handleAICoach}
                                                        className="text-xs font-bold text-purple-700 bg-white border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-600 hover:text-white transition-all flex items-center"
                                                    >
                                                        <Sparkles className="w-3 h-3 mr-1.5" /> Générer mon plan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'apply' && (
                            <div className="animate-fade-in space-y-6">
                                {scholarship.id === 'minhaty' ? (
                                    <MinhatyGuide />
                                ) : (
                                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
                                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                                            <Send className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Prêt à postuler ?</h3>
                                        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                                            Vous allez être redirigé vers le site officiel du fournisseur de la bourse. Assurez-vous d'avoir vos documents prêts.
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <a href="#" className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg flex items-center justify-center">
                                                Site Officiel <ExternalLink className="w-4 h-4 ml-2" />
                                            </a>
                                            <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center">
                                                <Download className="w-4 h-4 mr-2" /> Télécharger le guide PDF
                                            </button>
                                            <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                                                <Bell className="w-4 h-4 mr-2" /> M'alerter par SMS (Premium)
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {scholarship.id === 'minhaty' && (
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        <h3 className="font-bold text-gray-900 mb-4">Liens Utiles</h3>
                                        <div className="space-y-3">
                                            <a href="https://www.minhaty.ma" target="_blank" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <span className="text-sm font-medium text-blue-600">Portail Minhaty.ma</span>
                                                <ExternalLink className="w-4 h-4 text-gray-400" />
                                            </a>
                                            <a href="https://mabourse.enssup.gov.ma" target="_blank" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <span className="text-sm font-medium text-blue-600">Suivi Mabourse</span>
                                                <ExternalLink className="w-4 h-4 text-gray-400" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center shrink-0">
                        <div className="text-xs text-gray-400 hidden sm:block">
                            Dernière mise à jour: Mai 2024
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={onClose} className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all">
                                Fermer
                            </button>
                            {activeTab !== 'apply' && (
                                <button
                                    onClick={() => setActiveTab('apply')}
                                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg transition-all flex items-center justify-center"
                                >
                                    {scholarship.id === 'minhaty' ? 'Simuler' : 'Postuler'} <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {selectedScholarship && <ScholarshipDetailModal scholarship={selectedScholarship} onClose={() => setSelectedScholarship(null)} />}

            {/* Live Toast Notification */}
            {showLiveToast && latestScholarship && (
                <div className="fixed bottom-6 right-6 z-[80] max-w-sm bg-gray-900 text-white p-4 rounded-2xl shadow-2xl border border-gray-800 animate-bounce-in flex items-start gap-4 cursor-pointer hover:bg-gray-800 transition-colors" onClick={() => setSelectedScholarship(latestScholarship)}>
                    <div className="relative">
                        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse absolute top-0 right-0 -mt-1 -mr-1"></div>
                        <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center">
                            <Bell className="h-5 w-5 text-white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-green-400 mb-1">Nouvelle offre détectée !</p>
                        <p className="font-bold text-white text-sm leading-tight mb-1">{latestScholarship.title}</p>
                        <p className="text-xs text-gray-400">Source : mabourse.enssup.gov.ma</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setShowLiveToast(false); }} className="text-gray-500 hover:text-white">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Hero Header */}
            <div className="bg-primary-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-accent-300 text-sm font-bold mb-6">
                        🎓 Financement Études
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                        Trouvez une bourse <br /> <span className="text-accent-400">au Maroc ou à l'Étranger</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                        Accédez à la base de données la plus complète : Bourses Minhaty, Excellence, Erasmus, Chevening et plus encore.
                    </p>

                    {/* Wizard Mode Toggle */}
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setShowWizard(!showWizard)}
                            className={`px-4 py-1 rounded-full text-xs font-bold border transition-all ${showWizard ? 'bg-accent-500 text-gray-900 border-accent-500' : 'bg-transparent text-gray-300 border-gray-500'}`}
                        >
                            {showWizard ? '✨ Mode Assistant Activé' : 'Mode Recherche Classique'}
                        </button>
                    </div>

                    {showWizard ? (
                        /* Eligibility Wizard */
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto animate-fade-in-up">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Assistant Bourse-Match</span>
                                <div className="flex gap-2">
                                    {[1, 2, 3].map(step => (
                                        <div key={step} className={`w-2 h-2 rounded-full ${wizardStep >= step ? 'bg-accent-500' : 'bg-gray-300'}`}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                {wizardStep === 1 && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="text-xl font-bold text-gray-900">1. Profil Académique</h3>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Moyenne Générale (Bac/Dernier diplôme)</label>
                                            <input
                                                type="range"
                                                min="10"
                                                max="20"
                                                step="0.1"
                                                value={profile.grade}
                                                onChange={(e) => setProfile({ ...profile, grade: parseFloat(e.target.value) })}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
                                            />
                                            <div className="text-center font-mono text-3xl font-bold text-primary-600 mt-2">{profile.grade.toFixed(2)}/20</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Filière</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['SM', 'PC', 'SVT', 'Eco', 'Tech', 'Lettres'].map(b => (
                                                    <button
                                                        key={b}
                                                        onClick={() => setProfile({ ...profile, branch: b })}
                                                        className={`py-2 rounded-lg text-sm font-bold border ${profile.branch === b ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                                    >
                                                        {b}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={() => setWizardStep(2)} className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all">Suivant</button>
                                    </div>
                                )}

                                {wizardStep === 2 && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="text-xl font-bold text-gray-900">2. Situation Sociale</h3>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Profession des parents</label>
                                            <select
                                                value={profile.parentJob}
                                                onChange={(e) => setProfile({ ...profile, parentJob: e.target.value })}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-accent-400"
                                            >
                                                <option value="Autre">Autre / Secteur Privé</option>
                                                <option value="Education">Enseignement / Education (FM6)</option>
                                                <option value="OCP">Groupe OCP</option>
                                                <option value="Public">Fonction Publique</option>
                                                <option value="Sante">Santé</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Score RSU (Optionnel)</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: 9.14"
                                                value={profile.rsu}
                                                onChange={(e) => setProfile({ ...profile, rsu: e.target.value })}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-accent-400"
                                            />
                                            <p className="text-xs text-gray-400 mt-1">Utilisé pour calculer l'éligibilité aux bourses sociales (Minhaty).</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={() => setWizardStep(1)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">Retour</button>
                                            <button onClick={() => setWizardStep(3)} className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all">Suivant</button>
                                        </div>
                                    </div>
                                )}

                                {wizardStep === 3 && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="text-xl font-bold text-gray-900">3. Localisation</h3>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Ville de résidence</label>
                                            <select
                                                value={profile.city}
                                                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-accent-400"
                                            >
                                                <option value="Casablanca">Casablanca</option>
                                                <option value="Rabat">Rabat</option>
                                                <option value="Fes">Fès</option>
                                                <option value="Marrakech">Marrakech</option>
                                                <option value="Tanger">Tanger</option>
                                                <option value="Agadir">Agadir</option>
                                                <option value="Oujda">Oujda</option>
                                                <option value="Laayoune">Laâyoune</option>
                                                <option value="Benguerir">Benguerir</option>
                                            </select>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-green-800 text-sm">Profil complet !</h4>
                                                <p className="text-green-700 text-xs">Nous allons scanner toutes les bourses disponibles pour trouver votre match parfait.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button onClick={() => setWizardStep(2)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">Retour</button>
                                            <button onClick={() => setShowWizard(false)} className="flex-1 py-3 bg-accent-500 text-gray-900 rounded-xl font-bold hover:bg-accent-400 shadow-lg transition-all transform hover:scale-105">
                                                Voir mes résultats
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Standard Search Bar */
                        <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto animate-fade-in">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher (ex: Minhaty, France...)"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-50 transition-colors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="bg-gray-100 w-px h-8 my-auto hidden sm:block"></div>
                            <select
                                value={activeLocation}
                                onChange={(e) => setActiveLocation(e.target.value as any)}
                                className="bg-transparent px-4 py-3 text-gray-700 font-bold outline-none cursor-pointer hover:text-primary-600 transition-colors"
                            >
                                <option value="All">Toutes destinations</option>
                                <option value="Maroc">🇲🇦 Maroc Uniquement</option>
                                <option value="Étranger">🌍 International</option>
                            </select>
                            <button className="bg-accent-500 hover:bg-accent-400 text-gray-900 px-6 py-3 rounded-xl font-bold transition-all shadow-lg sm:w-auto w-full">
                                Chercher
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Filters & Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">

                {/* Flash News Ticker */}
                <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col md:flex-row items-start md:items-center gap-4 animate-fade-in-up">
                    <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-lg border border-red-100 shrink-0">
                        <Radio className="w-4 h-4 text-red-600 animate-pulse" />
                        <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Flash Info Ministère</span>
                    </div>
                    <div className="flex-1 overflow-hidden relative h-6 md:h-auto">
                        <div className="md:animate-none animate-marquee whitespace-nowrap">
                            <p className="text-sm font-medium text-gray-700 flex items-center">
                                {latestScholarship ? (
                                    <span className="font-bold text-green-600 mr-4 flex items-center animate-pulse">
                                        <Bell className="w-3 h-3 mr-1" /> NOUVEAU : {latestScholarship.title}
                                    </span>
                                ) : null}
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                                <span className="font-bold mr-2">[Minhaty]</span> Ouverture des dépôts des réclamations pour les boursiers non retenus.
                                <span className="mx-4 text-gray-300">|</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                                <span className="font-bold mr-2">[Coopération]</span> 15 nouvelles bourses d'études pour la Roumanie disponibles.
                            </p>
                        </div>
                    </div>
                    <a href="https://mabourse.enssup.gov.ma/bourse" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center shrink-0 whitespace-nowrap">
                        Source Officielle <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                </div>

                {/* Quick Filters */}
                <div className="flex overflow-x-auto pb-4 gap-2 mb-8 hide-scrollbar justify-center">
                    {['All', 'Sociale', 'Excellence', 'Coopération', 'Recherche'].map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm border ${selectedType === type
                                ? 'bg-white text-primary-700 border-primary-200 ring-2 ring-primary-100'
                                : 'bg-white/90 text-gray-600 border-white hover:bg-white'
                                }`}
                        >
                            {type === 'All' ? 'Tous les types' : type}
                        </button>
                    ))}
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <Loader className="w-10 h-10 text-primary-600 animate-spin mb-4" />
                            <p className="text-gray-500 font-medium">Chargement des bourses...</p>
                        </div>
                    ) : (
                        filteredScholarships.map((scholarship) => {
                            const urgency = getUrgency(scholarship.deadline);
                            const isNew = scholarship.id === 'live-1';
                            const matchScore = calculateMatch(scholarship); // Calculate on the fly for display

                            return (
                                <div
                                    key={scholarship.id}
                                    className={`bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden cursor-pointer relative ${isNew ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-100'}`}
                                    onClick={() => setSelectedScholarship(scholarship)}
                                >
                                    <div className="h-40 relative overflow-hidden">
                                        <img
                                            src={scholarship.imageUrl}
                                            alt={scholarship.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                                        {/* Match Badge */}
                                        {matchScore > 50 && (
                                            <div className="absolute top-3 right-auto left-3 z-10">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex items-center ${matchScore > 80 ? 'bg-accent-500 text-gray-900' : 'bg-yellow-400 text-yellow-900'}`}>
                                                    <Sparkles className="w-3 h-3 mr-1" /> {matchScore}% Match
                                                </span>
                                            </div>
                                        )}

                                        {/* Location Badge */}
                                        <div className="absolute top-10 left-3 flex gap-2">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ${scholarship.location === 'Maroc' ? 'bg-green-600' : 'bg-blue-600'}`}>
                                                {scholarship.location}
                                            </span>
                                        </div>

                                        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide shadow-sm ${urgency.color}`}>
                                                {urgency.label}
                                            </span>
                                            {isNew && (
                                                <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide shadow-sm bg-green-500 text-white animate-pulse">
                                                    Nouveau
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute bottom-3 left-3 right-3 text-white">
                                            <p className="text-xs opacity-90 font-medium mb-1">{scholarship.provider}</p>
                                            <h3 className="text-lg font-bold leading-tight line-clamp-2">{scholarship.title}</h3>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="space-y-3 mb-4">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> Pays</span>
                                                <span className="font-bold text-gray-900">{scholarship.country}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-1.5" /> Deadline</span>
                                                <span className={`font-bold ${urgency.urgent ? 'text-red-600' : 'text-gray-900'}`}>{scholarship.deadline}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm bg-green-50 p-2 rounded-lg border border-green-100">
                                                <span className="text-green-700 flex items-center font-medium"><DollarSign className="w-4 h-4 mr-1.5" /> Valeur</span>
                                                <span className="font-bold text-green-800 text-xs truncate max-w-[120px]">{scholarship.value}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                                            {scholarship.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-md border border-gray-200">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <button className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-primary-600 hover:border-primary-200 transition-all flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600">
                                            Voir détails <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {filteredScholarships.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Aucune bourse trouvée</h3>
                        <p className="text-gray-500 mt-2">Essayez de modifier vos filtres de recherche.</p>
                        <button
                            onClick={() => { setActiveLocation('All'); setSearchTerm(''); setSelectedType('All'); }}
                            className="mt-6 text-primary-600 font-bold hover:underline"
                        >
                            Réinitialiser tout
                        </button>
                    </div>
                )}

                {/* SEO / Guide Section */}
                <div className="mt-12 mb-12">
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
                        <div className="flex items-center mb-8">
                            <div className="bg-accent-100 p-3 rounded-2xl mr-4">
                                <ShieldCheck className="w-8 h-8 text-accent-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Guide : Comment obtenir une bourse ?</h2>
                                <p className="text-gray-500">Nos conseils pour maximiser vos chances.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <span className="text-4xl font-bold text-gray-100">01</span>
                                <h3 className="font-bold text-lg text-gray-900">Anticipez les délais</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    La plupart des bourses d'excellence (Eiffel, CSC) ferment leurs candidatures en Janvier/Février pour la rentrée suivante. Commencez votre dossier dès Septembre.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <span className="text-4xl font-bold text-gray-100">02</span>
                                <h3 className="font-bold text-lg text-gray-900">Soignez votre dossier</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Une lettre de motivation générique est éliminatoire. Personnalisez chaque demande en expliquant votre projet professionnel et pourquoi vous méritez ce financement.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <span className="text-4xl font-bold text-gray-100">03</span>
                                <h3 className="font-bold text-lg text-gray-900">Viser large</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Ne vous limitez pas à une seule bourse. Cumulez les demandes : Bourses sociales (Minhaty), Bourses de mérite (Région), et Bourses des fondations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
