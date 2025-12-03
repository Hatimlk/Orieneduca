
import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, CheckCircle, Filter, Building2, Crown, BookOpen, Target, Percent, ChevronRight, Map, Layers, ArrowLeft, ArrowRight, School as SchoolIcon, FileText, Loader2, ArrowDownCircle, ShieldCheck, ExternalLink, AlertTriangle, GraduationCap, Globe, Clock, Briefcase, Zap, Calculator, Activity, TrendingUp, Cpu } from 'lucide-react';
import { MOCK_SCHOOLS } from '../constants';
import { SchoolCategory, School } from '../types';

const ITEMS_PER_PAGE = 9;

// Mapping of Regions to Cities for filtering
const REGIONS: Record<string, string[]> = {
  "Casablanca-Settat": ["Casablanca", "Settat", "El Jadida", "Mohammedia", "Berrechid"],
  "Rabat-Salé-Kénitra": ["Rabat", "Salé", "Kénitra"],
  "Tanger-Tétouan-Al Hoceïma": ["Tanger", "Tétouan", "Al Hoceima", "Al Hoceima"],
  "Fès-Meknès": ["Fès", "Meknès", "Ifrane"],
  "Marrakech-Safi": ["Marrakech", "Safi", "Ben Guerir"],
  "Souss-Massa": ["Agadir"],
  "L'Oriental": ["Oujda"],
  "Béni Mellal-Khénifra": ["Khouribga"],
  "Dakhla-Oued Ed-Dahab": ["Dakhla"],
};

// Helper to get styling for network cards based on the screenshot style
const getNetworkStyle = (networkName: string) => {
    if (networkName.includes('ENSA') || networkName.includes('ENSAM') || networkName.includes('FST')) {
        return { 
            bg: 'bg-[#dcfce7]', // Light Green
            header: 'bg-gradient-to-br from-green-400 to-green-600', // Green Gradient
            text: 'text-green-900', 
            acronym: 'ET', // Enseignement Technique / Engineering
            categoryColor: 'bg-green-100 text-green-800 border-green-200'
        };
    }
    if (networkName.includes('ENCG') || networkName.includes('ISCAE')) {
        return { 
            bg: 'bg-[#ffedd5]', // Light Orange
            header: 'bg-gradient-to-br from-orange-400 to-orange-600', // Orange Gradient
            text: 'text-orange-900', 
            acronym: 'EA', // Enseignement Administratif / Business
            categoryColor: 'bg-orange-100 text-orange-800 border-orange-200'
        };
    }
    if (networkName.includes('ENA') || networkName.includes('Architecture')) {
        return { 
            bg: 'bg-[#e0e7ff]', // Light Indigo
            header: 'bg-gradient-to-br from-indigo-400 to-indigo-600', // Indigo Gradient
            text: 'text-indigo-900', 
            acronym: 'ER', // Architecture (AR/ER visually)
            categoryColor: 'bg-indigo-100 text-indigo-800 border-indigo-200'
        };
    }
    if (networkName.includes('Médecine') || networkName.includes('FMP') || networkName.includes('FMD')) {
        return { 
            bg: 'bg-[#dbeafe]', // Light Blue
            header: 'bg-gradient-to-br from-blue-400 to-blue-600', // Blue Gradient
            text: 'text-blue-900', 
            acronym: 'MD', // Médecine
            categoryColor: 'bg-blue-100 text-blue-800 border-blue-200'
        };
    }
    // Default
    return { 
        bg: 'bg-gray-100', 
        header: 'bg-gradient-to-br from-gray-400 to-gray-600', 
        text: 'text-gray-900', 
        acronym: networkName.substring(0, 2).toUpperCase(),
        categoryColor: 'bg-gray-100 text-gray-800 border-gray-200'
    };
};

// Helper for Bac Icons
const getBacIcon = (bacType: string) => {
    if (bacType.includes('Math')) return <Calculator className="w-3 h-3" />;
    if (bacType.includes('PC') || bacType.includes('Physique')) return <Zap className="w-3 h-3" />;
    if (bacType.includes('SVT')) return <Activity className="w-3 h-3" />;
    if (bacType.includes('Eco') || bacType.includes('Gestion')) return <TrendingUp className="w-3 h-3" />;
    if (bacType.includes('STM') || bacType.includes('Technique')) return <Cpu className="w-3 h-3" />;
    return <BookOpen className="w-3 h-3" />;
};

const getBacColor = (bacType: string) => {
    if (bacType.includes('Math')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (bacType.includes('PC')) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (bacType.includes('SVT')) return 'bg-green-100 text-green-700 border-green-200';
    if (bacType.includes('Eco')) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
};

// Extension of School type for UI rendering purposes
interface DisplayItem extends School {
  isNetworkHeader?: boolean;
  networkCount?: number;
  networkCities?: string[];
}

interface DetailData {
    title: string;
    schools: School[];
}

// Component for the Detail View (Network or Single School)
const SchoolDetailView = ({ data, onBack }: { data: DetailData, onBack: () => void }) => {
    const { title, schools } = data;
    const representative = schools[0]; // Use the first school for description/criteria if generic
    const isNetwork = schools.length > 1;

    return (
        <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <button onClick={onBack} className="mb-8 flex items-center text-gray-500 hover:text-primary-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 w-fit">
                <ArrowLeft className="w-5 h-5 mr-2" /> Retour à la liste
             </button>

             {/* Full Width Header */}
             <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
                 <div className="bg-gray-900 text-white p-8 md:p-12 relative overflow-hidden">
                     {/* Background Pattern */}
                     <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-3xl -mr-20 -mt-40"></div>
                     <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
                     
                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="max-w-3xl">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {isNetwork ? (
                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/10">
                                        <Layers className="w-4 h-4 mr-2" /> Réseau National ({schools.length} Campus)
                                    </span>
                                ) : (
                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full font-bold text-sm backdrop-blur-md border border-white/10 ${representative.isPublic ? 'bg-green-500/80 text-white' : 'bg-purple-500/80 text-white'}`}>
                                        {representative.isPublic ? <Building2 className="w-4 h-4 mr-2"/> : <Crown className="w-4 h-4 mr-2"/>}
                                        {representative.isPublic ? 'Public' : 'Privé'}
                                    </span>
                                )}
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-500/20 text-green-100 text-xs font-bold border border-green-500/30 backdrop-blur-md">
                                    <ShieldCheck className="w-3 h-3 mr-1.5" /> Vérifié
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">{title}</h1>
                            {/* Short Definition */}
                            {representative.shortDefinition && (
                                <p className="text-xl text-primary-100 font-medium mb-4 leading-relaxed">
                                    {representative.shortDefinition}
                                </p>
                            )}
                            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl opacity-80">{representative.description}</p>
                        </div>
                        
                        <div className="flex-shrink-0">
                             <a 
                                href={representative.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-primary-50 transition-all shadow-lg hover:-translate-y-1"
                            >
                                <Globe className="w-5 h-5 mr-2" /> Visiter le site
                            </a>
                        </div>
                     </div>
                 </div>

                 {/* Stats / Criteria Bar */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 bg-white">
                     <div className="p-6 xl:p-8 flex items-start space-x-4 hover:bg-gray-50 transition-colors">
                         <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0">
                             <GraduationCap className="w-6 h-6" />
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Bac Requis</p>
                             <div className="flex flex-wrap gap-2">
                                {representative.admissionCriteria?.bacTypes.map(b => (
                                    <span key={b} className="font-bold text-xs md:text-sm text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{b}</span>
                                )) || "N/A"}
                             </div>
                         </div>
                     </div>
                     <div className="p-6 xl:p-8 flex items-start space-x-4 hover:bg-gray-50 transition-colors">
                         <div className="p-3 bg-green-50 rounded-2xl text-green-600 shrink-0">
                             <Percent className="w-6 h-6" />
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Seuil d'accès</p>
                             <p className="text-lg md:text-xl font-extrabold text-gray-900">{representative.admissionCriteria?.averageGradeRequired || "Non défini"}</p>
                         </div>
                     </div>
                     <div className="p-6 xl:p-8 flex items-start space-x-4 hover:bg-gray-50 transition-colors">
                         <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 shrink-0">
                             <BookOpen className="w-6 h-6" />
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Matières Clés</p>
                             <p className="font-medium text-sm md:text-base text-gray-900">{representative.admissionCriteria?.keySubjects.join(', ') || "Général"}</p>
                         </div>
                     </div>
                     <div className="p-6 xl:p-8 flex items-start space-x-4 hover:bg-gray-50 transition-colors">
                         <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 shrink-0">
                             <Clock className="w-6 h-6" />
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Durée d'études</p>
                             <p className="font-bold text-sm md:text-base text-gray-900">{representative.duration || "Non spécifié"}</p>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Content Grid */}
             <div className="space-y-12">
                 
                 {/* Formations & Careers */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* Filières/Formations */}
                     <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all">
                         <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                             <Layers className="w-6 h-6 mr-3 text-primary-600" /> Filières & Formations
                         </h3>
                         {representative.formations && representative.formations.length > 0 ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                 {representative.formations.map((formation, idx) => (
                                     <div key={idx} className="flex items-center p-3 bg-primary-50 rounded-xl text-primary-800 font-medium text-sm">
                                         <Zap className="w-4 h-4 mr-2 text-primary-600 shrink-0" />
                                         {formation}
                                     </div>
                                 ))}
                             </div>
                         ) : (
                             <p className="text-gray-500 italic">Information non disponible pour le moment.</p>
                         )}
                     </div>

                     {/* Débouchés/Opportunities */}
                     <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all">
                         <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                             <Briefcase className="w-6 h-6 mr-3 text-green-600" /> Après l'école ?
                         </h3>
                         {representative.opportunities && representative.opportunities.length > 0 ? (
                             <div className="space-y-4">
                                 <p className="text-gray-600 mb-4">Les lauréats de {title} occupent généralement des postes tels que :</p>
                                 <div className="flex flex-wrap gap-2">
                                     {representative.opportunities.map((opp, idx) => (
                                         <span key={idx} className="px-4 py-2 bg-green-50 text-green-800 rounded-full font-bold text-sm border border-green-100">
                                             {opp}
                                         </span>
                                     ))}
                                 </div>
                             </div>
                         ) : (
                             <p className="text-gray-500 italic">Information non disponible pour le moment.</p>
                         )}
                     </div>
                 </div>

                 {/* Campus List */}
                 <div>
                     <div className="flex items-center mb-8">
                        <div className="h-10 w-2 bg-primary-600 rounded-full mr-4"></div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            {isNetwork ? `Les Campus ${title}` : 'Localisation'}
                        </h2>
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                         {schools.map(school => (
                             <div key={school.id} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 relative overflow-hidden">
                                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                     <MapPin className="w-24 h-24 text-primary-600" />
                                 </div>
                                 <div className="relative z-10">
                                     <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors shadow-sm">
                                         {school.city.substring(0,2).toUpperCase()}
                                     </div>
                                     <h3 className="text-xl font-bold text-gray-900 mb-2">{school.name}</h3>
                                     <p className="text-gray-500 flex items-center mb-6">
                                         <MapPin className="w-4 h-4 mr-2 text-gray-400" /> {school.city}
                                     </p>
                                     <a 
                                        href={school.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center font-bold text-primary-600 hover:text-primary-800 group-hover:translate-x-2 transition-transform"
                                     >
                                         Voir la fiche <ArrowRight className="w-4 h-4 ml-2" />
                                     </a>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* Report Button */}
                 <div className="flex justify-center pt-8 pb-12 border-t border-gray-100">
                    <button className="text-sm font-medium text-gray-400 hover:text-red-600 flex items-center transition-colors px-6 py-3 rounded-full hover:bg-red-50">
                        <AlertTriangle className="w-4 h-4 mr-2" /> Signaler une erreur ou une information obsolète
                    </button>
                 </div>
             </div>
        </div>
    );
};

export const SchoolFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedBac, setSelectedBac] = useState<string>('All');
  const [isPublicFilter, setIsPublicFilter] = useState<boolean | null>(null);
  
  // State for handling detail view (network or single school)
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Reset pagination and simulate loading when filters change
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
        setVisibleCount(ITEMS_PER_PAGE);
        setIsFiltering(false);
    }, 500); // Simulate network request
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedRegion, selectedBac, isPublicFilter, detailData]);

  // Base filtering logic
  const filteredSchools = useMemo(() => {
    return MOCK_SCHOOLS.filter(school => {
      const term = searchTerm.toLowerCase();
      
      const matchesSearch = 
        school.name.toLowerCase().includes(term) || 
        school.city.toLowerCase().includes(term) ||
        school.category.toLowerCase().includes(term) ||
        school.description.toLowerCase().includes(term) ||
        (school.admissionCriteria && (
            school.admissionCriteria.bacTypes.some(t => t.toLowerCase().includes(term)) ||
            school.admissionCriteria.keySubjects.some(s => s.toLowerCase().includes(term)) ||
            school.admissionCriteria.averageGradeRequired.toLowerCase().includes(term)
        ));
      
      const matchesCategory = selectedCategory === 'All' || school.category === selectedCategory;
      const matchesRegion = selectedRegion === 'All' || (REGIONS[selectedRegion] && REGIONS[selectedRegion].includes(school.city));
      const matchesPublic = isPublicFilter === null || school.isPublic === isPublicFilter;
      
      const matchesBac = selectedBac === 'All' || (school.admissionCriteria && (
        school.admissionCriteria.bacTypes.includes('Tous Bac') ||
        school.admissionCriteria.bacTypes.some(t => {
            if (selectedBac === 'Sc. Math') return t.includes('Math');
            if (selectedBac === 'PC') return t === 'PC' || t.includes('Physique');
            if (selectedBac === 'SVT') return t === 'SVT';
            if (selectedBac === 'Eco') return t.includes('Eco') || t.includes('Gestion');
            if (selectedBac === 'STM') return t.includes('STM') || t.includes('STE') || t.includes('Technique');
            if (selectedBac === 'Bac+2') return t.includes('Bac+2') || t.includes('CPGE') || t.includes('Prépa');
            return false;
        })
      ));
      
      return matchesSearch && matchesCategory && matchesRegion && matchesPublic && matchesBac;
    });
  }, [searchTerm, selectedCategory, selectedRegion, selectedBac, isPublicFilter]);

  // Grouping Logic
  const schoolsToDisplay = useMemo(() => {
    // If user is searching specifically, do NOT group, show individual results
    if (searchTerm) {
      return filteredSchools;
    }

    // If user is browsing, Group by Network
    const groups: Record<string, School[]> = {};
    const standalone: School[] = [];

    filteredSchools.forEach(school => {
      if (school.network) {
        if (!groups[school.network]) {
          groups[school.network] = [];
        }
        groups[school.network].push(school);
      } else {
        standalone.push(school);
      }
    });

    const displayItems: DisplayItem[] = [];

    // Create Network Cards
    Object.keys(groups).forEach(network => {
      const schools = groups[network];
      const firstSchool = schools[0];
      
      displayItems.push({
        ...firstSchool,
        id: `network-${network}`,
        name: `${network} MAROC`,
        city: 'Réseau National',
        description: `Découvrez les conditions d'accès, les villes et les concours pour intégrer les écoles ${network} au Maroc.`,
        isNetworkHeader: true,
        networkCount: schools.length,
        networkCities: schools.map(s => s.city),
        admissionCriteria: firstSchool.admissionCriteria // Ensure criteria is on the card
      });
    });

    // Add standalone schools
    return [...displayItems, ...standalone].sort((a, b) => {
      // Put networks first, then sort by name
      const aHeader = (a as DisplayItem).isNetworkHeader;
      const bHeader = (b as DisplayItem).isNetworkHeader;

      if (aHeader && !bHeader) return -1;
      if (!aHeader && bHeader) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [filteredSchools, searchTerm]);

  // Dynamic Pagination Logic
  const currentSchools = schoolsToDisplay.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate network delay for better UX
    setTimeout(() => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
        setIsLoadingMore(false);
    }, 800);
  };

  // Unified handler for clicking "Voir la fiche complète" or the card
  const handleViewDetails = (item: DisplayItem) => {
    let schoolsToShow: School[] = [];
    let title = item.name;

    if (item.isNetworkHeader && item.network) {
        // If it's a network card, get all schools in that network
        schoolsToShow = MOCK_SCHOOLS.filter(s => s.network === item.network);
        title = `${item.network} MAROC`;
    } else {
        // If it's a single school card (search result or standalone)
        schoolsToShow = [item];
    }

    setDetailData({ title, schools: schoolsToShow });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Detail View if data is present
  if (detailData && !isFiltering) {
      return <SchoolDetailView data={detailData} onBack={() => setDetailData(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Explorez les Écoles Supérieures</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Trouvez l'établissement qui correspond à vos ambitions parmi plus de 50 écoles répertoriées et vérifiées.
        </p>
      </div>

      {/* Modern Filters Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-12 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200"
              placeholder="Rechercher (nom, ville, bac...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="relative min-w-[200px] flex-1 lg:flex-none">
                <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none font-medium text-gray-700"
                >
                <option value="All">Toutes les catégories</option>
                {Object.values(SchoolCategory).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
                <Filter className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative min-w-[200px] flex-1 lg:flex-none">
                <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="block w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none font-medium text-gray-700"
                >
                <option value="All">Toutes les régions</option>
                {Object.keys(REGIONS).map((region) => (
                    <option key={region} value={region}>{region}</option>
                ))}
                </select>
                <Map className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

             <div className="relative min-w-[200px] flex-1 lg:flex-none">
                <select
                value={selectedBac}
                onChange={(e) => setSelectedBac(e.target.value)}
                className="block w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none font-medium text-gray-700"
                >
                <option value="All">Tous les Bacs</option>
                <option value="Sc. Math">Sc. Math</option>
                <option value="PC">Sc. Physique (PC)</option>
                <option value="SVT">SVT</option>
                <option value="Eco">Économie & Gestion</option>
                <option value="STM">Technique (STM/STE)</option>
                <option value="Bac+2">Bac+2 / CPGE</option>
                </select>
                <GraduationCap className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                    onClick={() => setIsPublicFilter(isPublicFilter === true ? null : true)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center ${isPublicFilter === true ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Building2 className="w-4 h-4 mr-2" /> Public
                </button>
                <button
                    onClick={() => setIsPublicFilter(isPublicFilter === false ? null : false)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center ${isPublicFilter === false ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Crown className="w-4 h-4 mr-2" /> Privé
                </button>
            </div>
          </div>
      </div>

      {/* Results Grid */}
      {isFiltering ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Recherche des établissements...</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {currentSchools.length > 0 ? (
              currentSchools.map((school: DisplayItem) => {
                const style = school.isNetworkHeader && school.network 
                    ? getNetworkStyle(school.name) 
                    : { bg: 'bg-white', header: 'bg-gradient-to-br from-primary-600 to-primary-800', text: 'text-gray-900', acronym: '', categoryColor: 'bg-primary-50 text-primary-700 border-primary-100' };

                return (
                    <div 
                        key={school.id} 
                        className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                    >
                        {/* Header Image / Acronym */}
                        <div className={`h-32 relative overflow-hidden ${school.isNetworkHeader ? style.header : 'bg-gray-200'}`}>
                            {school.isNetworkHeader ? (
                                <>
                                    {/* Big Acronym Background */}
                                    <h1 className="absolute -bottom-8 -right-4 text-[10rem] font-black opacity-10 leading-none select-none pointer-events-none text-white mix-blend-overlay">
                                        {style.acronym}
                                    </h1>
                                    <div className="absolute top-4 right-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${school.isPublic ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'}`}>
                                            {school.isPublic ? <Building2 className="w-3 h-3 mr-1.5"/> : <Crown className="w-3 h-3 mr-1.5"/>}
                                            {school.isPublic ? 'Public' : 'Privé'}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* For individual schools, use a nice gradient or image but focused on the profile card look below */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
                                    {/* Pattern */}
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                    
                                    <div className="absolute top-4 right-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${school.isPublic ? 'bg-green-500/90 text-white' : 'bg-purple-500/90 text-white'}`}>
                                            {school.isPublic ? 'Public' : 'Privé'}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Content Body */}
                        <div className="px-6 pb-6 flex-1 flex flex-col relative">
                            {/* Overlapping Logo - Profile Card Style */}
                            <div className="-mt-12 mb-4 relative z-10 flex justify-between items-end">
                                <div className="bg-white p-1 rounded-2xl shadow-lg w-24 h-24 flex items-center justify-center shrink-0">
                                    <img 
                                        src={school.logoUrl} 
                                        alt={school.name} 
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                                <div className="mb-1">
                                    <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${style.categoryColor}`}>
                                        {school.category}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-1">
                                    {school.name}
                                </h3>
                                <p className="text-sm text-gray-400 font-medium flex items-center">
                                    <MapPin className="w-3.5 h-3.5 mr-1" /> {school.city}
                                </p>
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
                                {school.description}
                            </p>

                            {/* Admission Criteria Box */}
                            {school.admissionCriteria && (
                                <div className="mt-auto mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-500 mb-3 flex items-center uppercase tracking-wide">
                                        <Target className="w-3.5 h-3.5 mr-1.5" /> Critères d'admission
                                    </h4>
                                    
                                    {/* Visual Bac Requirements */}
                                    <div className="mb-3">
                                        <p className="text-[10px] font-bold text-gray-400 mb-1.5">BAC REQUIS</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {school.admissionCriteria.bacTypes.map(b => (
                                                <span key={b} className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold border ${getBacColor(b)}`}>
                                                    <span className="mr-1.5 opacity-70">{getBacIcon(b)}</span>
                                                    {b}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/50">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 mb-0.5">SEUIL D'ACCÈS</p>
                                            <p className="text-sm font-extrabold text-slate-800">{school.admissionCriteria.averageGradeRequired}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 mb-0.5">MATIÈRES CLÉS</p>
                                            <p className="text-xs font-bold text-slate-600 truncate" title={school.admissionCriteria.keySubjects.join(', ')}>
                                                {school.admissionCriteria.keySubjects.slice(0, 2).join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={() => handleViewDetails(school)}
                                className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 hover:text-primary-600 hover:border-primary-200 transition-all flex items-center justify-center mt-auto"
                            >
                                Voir la fiche complète <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="mx-auto h-16 w-16 text-gray-300 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Aucun établissement trouvé</h3>
                <p className="text-gray-500 mt-2 text-gray-500">Essayez de modifier vos filtres ou termes de recherche.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedRegion('All'); setSelectedBac('All'); setIsPublicFilter(null); setDetailData(null); }}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
      )}

      {/* Load More Controls */}
      {!isFiltering && schoolsToDisplay.length > 0 && (
        <div className="mt-16 flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-gray-500">
                Affichage de <span className="font-bold text-gray-900">{currentSchools.length}</span> sur <span className="font-bold text-gray-900">{schoolsToDisplay.length}</span> établissements
            </p>
            
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-1.5 mb-4">
                <div 
                    className="bg-primary-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${(currentSchools.length / schoolsToDisplay.length) * 100}%` }}
                ></div>
            </div>

            {currentSchools.length < schoolsToDisplay.length && (
                <button 
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="flex items-center px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-full shadow-sm hover:bg-gray-50 hover:border-primary-200 transition-all font-bold mx-auto"
                >
                    {isLoadingMore ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin text-primary-600" />
                            Chargement...
                        </>
                    ) : (
                        <>
                            <ArrowDownCircle className="w-5 h-5 mr-2 text-primary-600" />
                            Afficher plus d'écoles ({schoolsToDisplay.length - visibleCount} restantes)
                        </>
                    )}
                </button>
            )}
        </div>
      )}
    </div>
  );
};
