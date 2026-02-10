
import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Target, TrendingUp, GraduationCap, AlertCircle, CheckCircle, ArrowRight, Sparkles, School, BookOpen, HelpCircle, ChevronRight, Trophy, Lock } from 'lucide-react';

type Mode = 'AVERAGE' | 'GOAL';

export const BacCalculator: React.FC = () => {
  const [mode, setMode] = useState<Mode>('AVERAGE');
  
  // Inputs
  const [regional, setRegional] = useState<string>('');
  const [controle, setControle] = useState<string>('');
  const [national, setNational] = useState<string>('');
  const [target, setTarget] = useState<string>('');

  // Results
  const [average, setAverage] = useState<number | null>(null);
  const [required, setRequired] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Clear results when mode changes
  useEffect(() => {
    setAverage(null);
    setRequired(null);
    setShowResults(false);
  }, [mode]);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const r = parseFloat(regional);
    const c = parseFloat(controle);

    if (isNaN(r) || isNaN(c) || r < 0 || r > 20 || c < 0 || c > 20) {
        alert("Veuillez entrer des notes valides entre 0 et 20.");
        return;
    }

    if (mode === 'AVERAGE') {
        const n = parseFloat(national);
        if (isNaN(n) || n < 0 || n > 20) {
             alert("Veuillez entrer une note du National valide.");
             return;
        }
        // Formule: 25% Reg + 25% Cont + 50% Nat
        const res = (r * 0.25) + (c * 0.25) + (n * 0.50);
        setAverage(parseFloat(res.toFixed(2)));
        setRequired(null);
    } else {
        const t = parseFloat(target);
        if (isNaN(t) || t < 10 || t > 20) {
            alert("Veuillez entrer un objectif valide (10-20).");
            return;
        }
        // Target = 0.25R + 0.25C + 0.5N
        // 0.5N = Target - 0.25(R+C)
        // N = (Target - 0.25(R+C)) / 0.5
        const currentPoints = (r * 0.25) + (c * 0.25);
        const needed = (t - currentPoints) / 0.5;
        
        setRequired(parseFloat(needed.toFixed(2)));
        setAverage(null);
    }
    setShowResults(true);
  };

  const reset = () => {
    setRegional('');
    setControle('');
    setNational('');
    setTarget('');
    setAverage(null);
    setRequired(null);
    setShowResults(false);
  };

  const getMention = (grade: number) => {
    if (grade >= 16) return { label: 'Très Bien', color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'Excellent ! Vous avez accès aux meilleures filières (CPGE, Médecine, Architecture...).' };
    if (grade >= 14) return { label: 'Bien', color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200', text: 'Très bon dossier. Vous passez la majorité des seuils de présélection.' };
    if (grade >= 12) return { label: 'Assez Bien', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'Bon dossier. Vous avez accès aux FST, EST et certains concours.' };
    if (grade >= 10) return { label: 'Passable', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200', text: 'Bac validé. Privilégiez les concours ouverts, OFPPT ou le privé.' };
    return { label: 'Insuffisant', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', text: 'Attention, le bac n\'est pas encore acquis. Courage !' };
  };

  const getOpportunities = (grade: number) => {
      if (grade < 10) return [];
      const apps = [
          { name: 'EST / BTS', min: 10.5, type: 'Court', icon: <BookOpen className="w-4 h-4" />, category: 'Technique' },
          { name: 'Facultés (Droit, Eco...)', min: 10, type: 'LMD', icon: <School className="w-4 h-4" />, category: 'Université' },
          { name: 'FST (MIP/BCG)', min: 12, type: 'Ingénierie', icon: <Calculator className="w-4 h-4" />, category: 'Sciences' },
          { name: 'ENSA / ENSAM', min: 12.5, type: 'Ingénieur d\'État', icon: <Target className="w-4 h-4" />, category: 'Ingénierie' },
          { name: 'Médecine & Pharma', min: 12, type: 'Santé', icon: <AlertCircle className="w-4 h-4" />, category: 'Santé' },
          { name: 'ENCG (Commerce)', min: 12, type: 'Management', icon: <TrendingUp className="w-4 h-4" />, category: 'Commerce' },
          { name: 'Architecture (ENA)', min: 13.5, type: 'Architecture', icon: <School className="w-4 h-4" />, category: 'Architecture' },
          { name: 'CPGE (Prépas)', min: 14, type: 'Excellence', icon: <Sparkles className="w-4 h-4" />, category: 'Excellence' },
      ];
      return apps;
  };

  // Circular Progress Component
  const CircularGauge = ({ value, max = 20, label, subLabel, colorClass }: { value: number, max?: number, label: string, subLabel?: string, colorClass: string }) => {
      const radius = 50;
      const circumference = 2 * Math.PI * radius;
      const displayValue = Math.min(Math.max(value, 0), 20); 
      const progress = (displayValue / max) * circumference;
      const dashoffset = circumference - progress;

      return (
          <div className="relative flex flex-col items-center justify-center">
              <div className="relative w-48 h-48">
                  {/* Background Circle */}
                  <svg className="w-full h-full transform -rotate-90">
                      <circle
                          cx="96"
                          cy="96"
                          r={radius}
                          stroke="#f3f4f6"
                          strokeWidth="12"
                          fill="transparent"
                      />
                      {/* Progress Circle */}
                      <circle
                          cx="96"
                          cy="96"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={dashoffset}
                          strokeLinecap="round"
                          className={`transition-all duration-1000 ease-out ${colorClass}`}
                      />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-900">
                      <span className="text-5xl font-extrabold tracking-tighter">{value > 20 ? '>20' : value.toFixed(2)}</span>
                      <span className="text-sm text-gray-400 uppercase font-bold tracking-widest mt-1">/ 20</span>
                  </div>
              </div>
              <div className="text-center mt-6">
                  <p className="text-xl font-bold text-gray-800">{label}</p>
                  {subLabel && <p className="text-sm text-gray-500 font-medium mt-1">{subLabel}</p>}
              </div>
          </div>
      );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4 shadow-sm ring-4 ring-white">
          <Calculator className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Simulateur Bac Maroc</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Anticipez votre réussite. Calculez votre moyenne générale ou simulez la note nécessaire au National pour décrocher votre école de rêve.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calculator Form */}
          <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  {/* Tabs */}
                  <div className="flex border-b border-gray-100 p-2 bg-gray-50/50">
                      <button 
                        onClick={() => setMode('AVERAGE')}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold text-center transition-all duration-300 flex items-center justify-center ${mode === 'AVERAGE' ? 'bg-white text-primary-700 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                          <Calculator className="w-4 h-4 mr-2" /> Calculer Moyenne
                      </button>
                      <button 
                        onClick={() => setMode('GOAL')}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold text-center transition-all duration-300 flex items-center justify-center ${mode === 'GOAL' ? 'bg-white text-accent-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                          <Target className="w-4 h-4 mr-2" /> Simuler Objectif
                      </button>
                  </div>

                  <div className="p-6 sm:p-8">
                      <form onSubmit={calculate} className="space-y-6">
                          <div className="space-y-5">
                             <div className="group">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between items-center">
                                    <span className="flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-gray-400" /> Note Régional</span>
                                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">25%</span>
                                </label>
                                <input
                                    type="number" step="0.01" min="0" max="20"
                                    value={regional} onChange={(e) => setRegional(e.target.value)}
                                    className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none font-medium text-lg placeholder-gray-400"
                                    placeholder="Ex: 14.50" required
                                />
                             </div>

                             <div className="group">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between items-center">
                                    <span className="flex items-center"><BookOpen className="w-4 h-4 mr-2 text-gray-400" /> Contrôle Continu</span>
                                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">25%</span>
                                </label>
                                <input
                                    type="number" step="0.01" min="0" max="20"
                                    value={controle} onChange={(e) => setControle(e.target.value)}
                                    className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none font-medium text-lg placeholder-gray-400"
                                    placeholder="Ex: 16.00" required
                                />
                             </div>

                             <div className="relative py-4 flex items-center">
                                 <div className="flex-grow border-t border-gray-200"></div>
                                 <span className="flex-shrink-0 mx-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                     {mode === 'AVERAGE' ? 'L\'épreuve Finale' : 'Votre Cible'}
                                 </span>
                                 <div className="flex-grow border-t border-gray-200"></div>
                             </div>

                             {mode === 'AVERAGE' ? (
                                 <div className="animate-fade-in-up group">
                                    <label className="block text-sm font-bold text-primary-900 mb-2 flex justify-between items-center">
                                        <span className="flex items-center"><GraduationCap className="w-4 h-4 mr-2 text-primary-600" /> Note National</span>
                                        <span className="text-[10px] font-bold text-white bg-primary-600 px-2 py-1 rounded shadow-sm">50%</span>
                                    </label>
                                    <input
                                        type="number" step="0.01" min="0" max="20"
                                        value={national} onChange={(e) => setNational(e.target.value)}
                                        className="block w-full px-4 py-3.5 rounded-xl border-2 border-primary-100 bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none font-bold text-xl text-primary-900 placeholder-gray-300"
                                        placeholder="Ex: 15.00" required
                                    />
                                 </div>
                             ) : (
                                 <div className="animate-fade-in-up group">
                                    <label className="block text-sm font-bold text-accent-800 mb-2 flex justify-between items-center">
                                        <span className="flex items-center"><Target className="w-4 h-4 mr-2 text-accent-600" /> Moyenne Visée</span>
                                        <span className="text-[10px] font-bold text-gray-900 bg-accent-400 px-2 py-1 rounded shadow-sm">Objectif</span>
                                    </label>
                                    <input
                                        type="number" step="0.01" min="10" max="20"
                                        value={target} onChange={(e) => setTarget(e.target.value)}
                                        className="block w-full px-4 py-3.5 rounded-xl border-2 border-accent-200 bg-white focus:ring-4 focus:ring-accent-100 focus:border-accent-500 transition-all outline-none font-bold text-xl text-accent-900 placeholder-gray-300"
                                        placeholder="Ex: 14.00 (Seuil ENSA)" required
                                    />
                                    <p className="text-xs text-gray-500 mt-2 ml-1">Entrez la moyenne générale que vous souhaitez obtenir.</p>
                                 </div>
                             )}
                          </div>

                          <div className="flex gap-3 pt-2">
                              <button
                                type="button"
                                onClick={reset}
                                className="px-4 py-3.5 rounded-xl border border-gray-200 text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none hover:border-gray-300"
                                title="Réinitialiser"
                              >
                                <RefreshCw className="h-5 w-5" />
                              </button>
                              <button
                                type="submit"
                                className={`flex-1 text-white px-6 py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center ${
                                    mode === 'AVERAGE' 
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 shadow-primary-600/30' 
                                    : 'bg-gradient-to-r from-accent-500 to-accent-600 text-gray-900 shadow-accent-500/30'
                                }`}
                              >
                                {mode === 'AVERAGE' ? 'Calculer' : 'Simuler'} <ArrowRight className="ml-2 w-5 h-5" />
                              </button>
                          </div>
                      </form>
                  </div>
              </div>

              {/* Helper Card */}
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start">
                 <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0" />
                 <div>
                     <h4 className="text-sm font-bold text-blue-900 mb-1">Comment ça marche ?</h4>
                     <p className="text-xs text-blue-700 leading-relaxed">
                        Le Bac Marocain est calculé selon la formule : <br/>
                        <span className="font-mono bg-white/50 px-1 rounded">Note = (Régional × 0.25) + (Contrôle × 0.25) + (National × 0.5)</span>
                     </p>
                 </div>
              </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
              {!showResults ? (
                  <div className="h-full min-h-[400px] bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm ring-1 ring-gray-100">
                          <Target className="w-10 h-10 text-gray-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-400 mb-2">En attente de simulation</h3>
                      <p className="text-gray-400 max-w-sm mx-auto">Remplissez les champs à gauche pour découvrir votre moyenne et les écoles accessibles.</p>
                  </div>
              ) : (
                  <div className="space-y-6 animate-fade-in-up">
                      
                      {/* Main Result Card */}
                      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10 relative overflow-hidden">
                          
                          {/* Dynamic Background Glow based on result */}
                          <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full -mr-40 -mt-40 blur-[100px] opacity-30 ${
                              (average || 0) >= 16 ? 'bg-emerald-400' : (average || 0) >= 12 ? 'bg-blue-400' : 'bg-orange-400'
                          }`}></div>

                          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                              {mode === 'AVERAGE' && average !== null && (
                                  <>
                                    <div className="shrink-0">
                                        <CircularGauge 
                                            value={average} 
                                            label="Moyenne Générale" 
                                            colorClass={getMention(average).color.replace('text-', 'text-')} 
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold mb-4 border ${getMention(average).bg} ${getMention(average).color} ${getMention(average).border}`}>
                                            <Trophy className="w-4 h-4 mr-2" /> Mention {getMention(average).label}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Analyse du dossier</h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {getMention(average).text}
                                        </p>
                                    </div>
                                  </>
                              )}

                              {mode === 'GOAL' && required !== null && (
                                  <>
                                    <div className="relative flex flex-col items-center justify-center shrink-0">
                                        <div className={`relative w-48 h-48 rounded-full border-[12px] flex items-center justify-center shadow-sm ${required > 20 ? 'border-red-100 bg-red-50' : 'border-accent-100 bg-accent-50'}`}>
                                            <div className="text-center">
                                                <span className={`text-5xl font-extrabold tracking-tighter ${required > 20 ? 'text-red-600' : 'text-accent-700'}`}>
                                                    {required.toFixed(2)}
                                                </span>
                                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Sur 20</span>
                                            </div>
                                        </div>
                                        <p className="mt-4 font-bold text-gray-900 text-lg">Note requise au National</p>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className={`text-2xl font-bold mb-3 ${required > 20 ? 'text-red-600' : 'text-gray-900'}`}>
                                            {required > 20 ? "Mission Impossible ?" : "Objectif Réalisable !"}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                            {required > 20 
                                                ? `Il vous faudrait plus de 20/20 au National pour atteindre ${target}. Essayez d'ajuster votre objectif ou de viser d'autres concours.` 
                                                : `Pour décrocher votre moyenne de ${target}, vous devez obtenir au moins ${required.toFixed(2)}/20 à l'examen National. C'est le moment de tout donner !`
                                            }
                                        </p>
                                        {required <= 20 && (
                                            <div className="p-4 bg-accent-50 rounded-xl border border-accent-100 inline-block">
                                                <p className="text-accent-800 font-medium text-sm">💪 Conseil : Concentrez-vous sur les matières à fort coefficient.</p>
                                            </div>
                                        )}
                                    </div>
                                  </>
                              )}
                          </div>
                      </div>

                      {/* Opportunities Grid */}
                      {(average || target) && (
                        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 flex items-center">
                                        <GraduationCap className="w-6 h-6 mr-2 text-primary-600" /> 
                                        {mode === 'AVERAGE' ? 'Portes Ouvertes (Estimation)' : `Si vous obtenez ${target}/20 :`}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">Basé sur les seuils des années précédentes.</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                {getOpportunities(mode === 'AVERAGE' ? average! : parseFloat(target)).map((opp, idx) => {
                                    const score = mode === 'AVERAGE' ? average! : parseFloat(target);
                                    const isSafe = score >= opp.min + 1; // Safe margin
                                    
                                    return (
                                        <div key={idx} className="flex items-center p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-md transition-all group cursor-default relative overflow-hidden">
                                            {isSafe && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>}
                                            
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 transition-transform group-hover:scale-110 ${isSafe ? 'bg-green-50 text-green-600' : 'bg-primary-50 text-primary-600'}`}>
                                                {opp.icon}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-900 truncate pr-2">{opp.name}</h4>
                                                    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{opp.category}</span>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    {isSafe ? (
                                                        <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-2 py-0.5 rounded-full">
                                                            <CheckCircle className="w-3 h-3 mr-1" /> Admission Probable
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-medium text-orange-500 flex items-center bg-orange-50 px-2 py-0.5 rounded-full">
                                                            <AlertCircle className="w-3 h-3 mr-1" /> Chance Modérée
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-400 ml-auto">Seuil ~{opp.min}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {getOpportunities(mode === 'AVERAGE' ? average! : parseFloat(target)).length === 0 && (
                                <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p className="text-gray-500 font-medium">Les seuils d'accès aux grandes écoles publiques sont généralement au-dessus de 10/12.</p>
                                    <p className="text-sm text-gray-400 mt-2">Ne lâchez rien ! Visez les concours privés ou la formation professionnelle.</p>
                                </div>
                            )}
                        </div>
                      )}
                  </div>
              )}
          </div>

      </div>
    </div>
  );
};
