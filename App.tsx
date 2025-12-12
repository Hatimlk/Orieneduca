
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { SchoolFinder } from './components/SchoolFinder';
import { BacCalculator } from './components/BacCalculator';
import { AICounselor } from './components/AICounselor';
import { ConcoursList } from './components/ConcoursList';
import { ScholarshipFinder } from './components/ScholarshipFinder';
import { PremiumGate } from './components/PremiumGate';
import { AuthModal } from './components/AuthModal';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard'; 
import { StudyAbroad } from './components/StudyAbroad';
import { OrieneducaPlus } from './components/OrieneducaPlus';
import { Blog } from './components/Blog';
import { OrientationTests } from './components/OrientationTests';
import { Consultation } from './components/Consultation';
import { PrivacyPolicy, LegalNotice } from './components/LegalPages';
import { NavPage, User } from './types';
import { MOCK_BLOG_POSTS } from './constants';
import { ArrowRight, Calendar, ChevronRight, GraduationCap, Target, Compass, Shield, Zap, Users, Quote, MapPin, Mail, Phone, Globe, MessageCircle, Sparkles, ChevronLeft, Clock, Trophy, BarChart, Bell, Info } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavPage>(NavPage.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderProtectedPage = (component: React.ReactNode, title: string, description: string) => {
    if (!user?.isPremium) {
      return (
        <PremiumGate 
          title={title}
          description={description}
          onUnlock={() => setIsAuthModalOpen(true)}
        />
      );
    }
    return component;
  };

  const handleImpersonate = (studentUser: User) => {
      setUser(studentUser);
      setCurrentPage(NavPage.DASHBOARD);
  };

  const renderPage = () => {
    switch (currentPage) {
      case NavPage.SCHOOLS:
        return <SchoolFinder />;
      case NavPage.ORIENTATION_TESTS:
        return <OrientationTests />;
      case NavPage.STUDY_ABROAD:
        return <StudyAbroad />;
      case NavPage.ORIENEDUCA_PLUS:
        return <OrieneducaPlus />;
      case NavPage.BLOG:
        return <Blog onNavigate={setCurrentPage} />;
      case NavPage.CONSULTATION:
        return <Consultation />;
      case NavPage.PRIVACY:
        return <PrivacyPolicy />;
      case NavPage.LEGAL:
        return <LegalNotice />;
      case NavPage.DASHBOARD:
        if (!user) {
            return (
                <div className="min-h-[50vh] flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès Réservé</h2>
                    <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
                    >
                        Se connecter à mon espace
                    </button>
                </div>
            );
        }
        return <StudentDashboard user={user} onNavigate={setCurrentPage} />;
      case NavPage.ADMIN_DASHBOARD:
        if (user?.role !== 'admin') {
            return (
                <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès Non Autorisé</h2>
                    <p className="text-gray-600 mb-6">Vous n'avez pas les droits nécessaires pour accéder au portail administrateur.</p>
                    <button 
                        onClick={() => setCurrentPage(NavPage.HOME)}
                        className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            );
        }
        return <AdminDashboard onImpersonate={handleImpersonate} />;
      case NavPage.CONCOURS:
        return renderProtectedPage(
          <div className="animate-fade-in">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                 <button onClick={() => setCurrentPage(NavPage.DASHBOARD)} className="text-sm text-gray-500 hover:text-primary-600 flex items-center mb-2">
                     ← Retour au tableau de bord
                 </button>
             </div>
             <ConcoursList />
          </div>, 
          "Espace Concours Privé",
          "L'accès au calendrier détaillé des concours, aux seuils d'admission et aux annales est réservé aux membres Premium."
        );
      case NavPage.SCHOLARSHIPS:
        return (
          <div className="animate-fade-in">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                 <button onClick={() => setCurrentPage(user ? NavPage.DASHBOARD : NavPage.HOME)} className="text-sm text-gray-500 hover:text-primary-600 flex items-center mb-2">
                     ← Retour {user ? 'au tableau de bord' : 'à l\'accueil'}
                 </button>
             </div>
             <ScholarshipFinder />
          </div>
        );
      case NavPage.SIMULATOR:
        return (
            <div className="animate-fade-in">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                     <button onClick={() => setCurrentPage(user ? NavPage.DASHBOARD : NavPage.HOME)} className="text-sm text-gray-500 hover:text-primary-600 flex items-center mb-2">
                         ← Retour {user ? 'au tableau de bord' : 'à l\'accueil'}
                     </button>
                 </div>
                 <BacCalculator />
            </div>
        );
      case NavPage.HOME:
      default:
        return (
          <>
            <AlertBar />
            <HomePage 
              onNavigate={(page) => {
                if (page === NavPage.CONCOURS && !user) {
                     setIsAuthModalOpen(true);
                } else {
                     setCurrentPage(page);
                }
              }} 
              onOpenChat={() => setIsChatOpen(true)}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={() => {
            setUser(null);
            setCurrentPage(NavPage.HOME);
        }}
      />
      
      <main className="flex-grow animate-fade-in">
        {renderPage()}
      </main>

      {currentPage !== NavPage.ADMIN_DASHBOARD && (
          <AICounselor isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      )}
      
      <Footer onNavigate={setCurrentPage} />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(newUser) => {
          setUser(newUser);
          setIsAuthModalOpen(false);
          if (newUser.role === 'admin') {
              setCurrentPage(NavPage.ADMIN_DASHBOARD);
          } else {
              setCurrentPage(NavPage.DASHBOARD);
          }
        }}
      />
    </div>
  );
};

const AlertBar = () => (
  <div className="bg-accent-500 py-2 overflow-hidden whitespace-nowrap relative z-40 border-b border-accent-600">
    <div className="flex animate-marquee items-center gap-12 px-4">
      <div className="flex items-center text-gray-900 font-bold text-xs uppercase tracking-widest">
        <Bell className="w-4 h-4 mr-2 animate-pulse" />
        Concours ENSA 2024 : Inscriptions ouvertes jusqu'au 30 Juin
      </div>
      <div className="flex items-center text-gray-900 font-bold text-xs uppercase tracking-widest">
        <Globe className="w-4 h-4 mr-2" />
        Bourses Eiffel : Publication des résultats imminente
      </div>
      <div className="flex items-center text-gray-900 font-bold text-xs uppercase tracking-widest">
        <Info className="w-4 h-4 mr-2" />
        Nouveau : Guide des filières Tech 2025 disponible
      </div>
      {/* Duplicate for seamless marquee */}
      <div className="flex items-center text-gray-900 font-bold text-xs uppercase tracking-widest">
        <Bell className="w-4 h-4 mr-2 animate-pulse" />
        Concours ENSA 2024 : Inscriptions ouvertes jusqu'au 30 Juin
      </div>
    </div>
  </div>
);

const HomePage: React.FC<{ onNavigate: (page: NavPage) => void; onOpenChat: () => void }> = ({ onNavigate, onOpenChat }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
      {
          name: "Sarah Benjelloun",
          school: "ENCG Casablanca",
          text: "Grâce à Orieneduca, j'ai pu préparer mon concours TAFEM sereinement. Les annales et les conseils m'ont été d'une aide précieuse.",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
      },
      {
          name: "Yassine El Amrani",
          school: "ENSA Tanger",
          text: "Je ne savais pas quelle école d'ingénieur choisir. Le comparateur et le chatbot m'ont aidé à y voir plus clair. Merci !",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      },
      {
          name: "Nour Idrissi",
          school: "Médecine Rabat",
          text: "Le simulateur de note du Bac m'a permis de fixer mes objectifs. J'ai décroché ma place en médecine grâce à un suivi rigoureux.",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
      },
      {
          name: "Hamza Bennani",
          school: "UM6P Ben Guerir",
          text: "Les guides sur les bourses m'ont permis d'accéder à une formation d'excellence que je pensais inaccessible.",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
      },
      {
          name: "Lina Tazi",
          school: "Architecture ENA",
          text: "L'accompagnement pour le concours d'architecture était top. Les astuces pour l'épreuve de dessin ont fait la différence.",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const scrollAmount = 350;
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-[#0f172a] overflow-hidden min-h-[750px] flex items-center justify-center pb-16">
        
        {/* Background Elements */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-600/30 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-[120px] animate-pulse delay-700 mix-blend-screen"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="Students background" 
                className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/80 to-[#0f172a]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center pt-12">
             
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-medium mb-10 backdrop-blur-xl animate-fade-in-up shadow-2xl hover:bg-white/10 transition-colors cursor-default ring-1 ring-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                Le portail N°1 d'orientation Post-Bac au Maroc
             </div>
             
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-8 leading-[1.1] animate-fade-in-up delay-100 drop-shadow-2xl">
                L'Orientation <br className="md:hidden" />
                <span className="relative inline-block px-2">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">Intelligente</span>
                    <div className="absolute -bottom-2 left-0 w-full h-3 bg-primary-500/30 -rotate-1 blur-sm rounded-full"></div>
                </span>
                <br />
                <span className="text-white">Pour Votre Avenir</span>
             </h1>
             
             <p className="mt-6 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-200 font-light leading-relaxed">
                Trouvez votre vocation, choisissez la bonne école et préparez vos concours avec la première plateforme d'orientation <span className="text-white font-semibold border-b-2 border-accent-500/50">100% digitale</span> au Maroc.
             </p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up delay-300">
                <button 
                    onClick={() => onNavigate(NavPage.CONSULTATION)}
                    className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-5px_rgba(37,99,235,0.6)] hover:scale-105 hover:-translate-y-1 flex items-center justify-center group border border-primary-500 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Sparkles className="w-5 h-5 mr-3 text-primary-200 group-hover:text-white transition-colors" />
                    Demander une consultation
                </button>
                
                <button 
                    onClick={() => onNavigate(NavPage.ORIENEDUCA_PLUS)}
                    className="w-full sm:w-auto px-8 py-4 bg-[#a3e635] text-slate-900 rounded-2xl font-bold text-lg transition-all shadow-[0_0_30px_-5px_rgba(163,230,53,0.3)] hover:shadow-[0_0_40px_-5px_rgba(163,230,53,0.5)] hover:scale-105 hover:-translate-y-1 flex items-center justify-center border border-[#bef264]"
                >
                    <Zap className="w-5 h-5 mr-3 fill-current" />
                    Orieneduca+
                </button>
             </div>

             <div className="mt-12 flex items-center justify-center gap-4 animate-fade-in-up delay-500 opacity-90">
                 <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                         <img key={i} className="w-9 h-9 rounded-full border-2 border-[#0f172a]" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                     ))}
                 </div>
                 <p className="text-sm text-slate-400 font-medium">Rejoint par <span className="text-white font-bold">+10,000 étudiants</span></p>
             </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-20 -mt-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mb-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200/50">
                  <div className="text-center px-4">
                      <p className="text-4xl font-extrabold text-gray-900 mb-1">10k+</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Étudiants</p>
                  </div>
                  <div className="text-center px-4">
                      <p className="text-4xl font-extrabold text-gray-900 mb-1">500+</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Écoles</p>
                  </div>
                  <div className="text-center px-4">
                      <p className="text-4xl font-extrabold text-gray-900 mb-1">98%</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Satisfaction</p>
                  </div>
                  <div className="text-center px-4">
                      <p className="text-4xl font-extrabold text-gray-900 mb-1">24/7</p>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Support IA</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Quick Paths */}
      <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Que souhaitez-vous faire ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button onClick={() => onNavigate(NavPage.SCHOOLS)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all text-left group">
                      <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Trouver une école</h3>
                      <p className="text-gray-500 text-sm">Explorez l'annuaire complet des établissements supérieurs au Maroc.</p>
                  </button>
                  <button onClick={() => onNavigate(NavPage.ORIENTATION_TESTS)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all text-left group">
                      <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Compass className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Je suis perdu(e)</h3>
                      <p className="text-gray-500 text-sm">Passez nos tests d'orientation pour découvrir les métiers faits pour vous.</p>
                  </button>
                  <button onClick={() => onNavigate(NavPage.SIMULATOR)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all text-left group">
                      <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <BarChart className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Calculer ma note</h3>
                      <p className="text-gray-500 text-sm">Utilisez notre simulateur pour estimer votre moyenne du Bac.</p>
                  </button>
              </div>
          </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <div className="absolute -left-4 -top-4 w-24 h-24 bg-accent-200 rounded-full opacity-50 blur-2xl"></div>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary-200 rounded-full opacity-50 blur-2xl"></div>
                    <div className="relative bg-white rounded-2xl shadow-xl p-2 rotate-1 hover:rotate-0 transition-transform duration-500">
                        <img 
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                            alt="Étudiants heureux" 
                            className="rounded-xl w-full object-cover h-96" 
                        />
                    </div>
                </div>
                <div>
                    <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Notre Mission</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-2">Pourquoi choisir Orieneduca ?</h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Chez Orieneduca, nous croyons que chaque étudiant mérite une orientation claire et ambitieuse. Notre mission est de démocratiser l'accès à l'information sur les études supérieures au Maroc et à l'étranger.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                                <Target className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="ml-3 text-gray-700 font-medium">Centraliser l'information fiable et à jour.</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                <Compass className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="ml-3 text-gray-700 font-medium">Guider grâce à des outils innovants (IA, Simulateurs).</span>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                                <Shield className="h-4 w-4 text-purple-600" />
                            </div>
                            <span className="ml-3 text-gray-700 font-medium">Accompagner jusqu'à l'inscription finale.</span>
                        </li>
                    </ul>
                </div>
             </div>
          </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900">Nos Principes Fondamentaux</h2>
                <p className="mt-4 text-gray-500 max-w-2xl mx-auto">L'excellence au service de votre réussite.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                        <Shield className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Fiabilité</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Des informations vérifiées directement auprès des ministères et des établissements pour éviter les fausses rumeurs.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-accent-50 rounded-2xl flex items-center justify-center mb-6 text-accent-600">
                        <Zap className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Nous utilisons l'Intelligence Artificielle et des algorithmes avancés pour personnaliser vos recommandations.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
                        <Users className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Communauté</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Rejoignez une communauté active d'étudiants et d'experts pour échanger conseils et expériences.</p>
                </div>
            </div>
         </div>
      </div>

      {/* Blog Preview Section */}
      <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Derniers articles du Blog</h2>
                    <p className="mt-4 text-gray-500">Conseils et stratégies pour réussir votre orientation.</p>
                  </div>
                  <button 
                      onClick={() => onNavigate(NavPage.BLOG)}
                      className="hidden md:flex items-center text-primary-600 font-bold hover:text-primary-700 transition-colors"
                  >
                      Voir tout le blog <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {MOCK_BLOG_POSTS.slice(0, 3).map((post) => (
                      <div 
                        key={post.id} 
                        onClick={() => onNavigate(NavPage.BLOG)}
                        className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full border border-gray-100"
                      >
                          <div className="h-48 overflow-hidden relative">
                              <img 
                                src={post.imageUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                              <div className="absolute top-4 left-4">
                                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">
                                      {post.category}
                                  </span>
                              </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <div className="flex items-center text-xs text-gray-400 mb-3 space-x-2">
                                   <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
                                   <span>•</span>
                                   <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readTime}</span>
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                  {post.title}
                              </h3>
                              <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                                  {post.excerpt}
                              </p>
                              <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
                                   <div className="flex items-center">
                                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold mr-2">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span className="text-xs font-medium text-gray-600">{post.author}</span>
                                    </div>
                                    <span className="text-primary-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                                        Lire <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">Ils ont trouvé leur voie</h2>
                  <p className="mt-4 text-gray-500">Découvrez les parcours inspirants de nos étudiants.</p>
              </div>
              
              <div className="relative group px-4 md:px-12">
                  <button 
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg text-gray-600 hover:text-primary-600 hover:scale-110 transition-all hidden md:flex border border-gray-100"
                    aria-label="Précédent"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide scroll-smooth"
                  >
                      {testimonials.map((testimonial, idx) => (
                          <div 
                            key={idx} 
                            className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center"
                          >
                            <div className="bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100 relative h-full hover:shadow-md transition-shadow">
                                <Quote className="w-10 h-10 text-primary-100 absolute top-6 right-6" />
                                <div className="flex items-center mb-6">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white shadow-md" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full inline-block mt-0.5">{testimonial.school}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic relative z-10 leading-relaxed">"{testimonial.text}"</p>
                            </div>
                          </div>
                      ))}
                  </div>

                  <button 
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg text-gray-600 hover:text-primary-600 hover:scale-110 transition-all hidden md:flex border border-gray-100"
                    aria-label="Suivant"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

const Footer: React.FC<{ onNavigate: (page: NavPage) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
                <div className="relative">
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-2 rounded-xl shadow-lg">
                       <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <span className="ml-3 text-xl font-extrabold tracking-tight">
                  Orien<span className="text-primary-500">educa</span>
                </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              <span className="block text-primary-400 font-semibold mb-2">"Votre meilleur choix pour le bon chemin"</span>
              Votre compagnon digital pour une orientation scolaire réussie. Découvrez, comparez et choisissez votre avenir avec confiance.
            </p>
            <div className="flex space-x-4">
                <a href="https://www.instagram.com/orieneduca/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={() => onNavigate(NavPage.HOME)} className="hover:text-primary-400 transition-colors">Accueil</button></li>
              <li><button onClick={() => onNavigate(NavPage.SCHOOLS)} className="hover:text-primary-400 transition-colors">Trouver une école</button></li>
              <li><button onClick={() => onNavigate(NavPage.SCHOLARSHIPS)} className="hover:text-primary-400 transition-colors">Bourses</button></li>
              <li><button onClick={() => onNavigate(NavPage.BLOG)} className="hover:text-primary-400 transition-colors">Blog</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={() => onNavigate(NavPage.SIMULATOR)} className="hover:text-primary-400 transition-colors">Simulateur Bac</button></li>
              <li><button onClick={() => onNavigate(NavPage.ORIENTATION_TESTS)} className="hover:text-primary-400 transition-colors">Tests d'orientation</button></li>
              <li><button onClick={() => onNavigate(NavPage.STUDY_ABROAD)} className="hover:text-primary-400 transition-colors">Étudier à l'étranger</button></li>
              <li><button onClick={() => onNavigate(NavPage.ORIENEDUCA_PLUS)} className="hover:text-primary-400 transition-colors flex items-center"><Zap className="w-3 h-3 mr-1 text-accent-500" /> Orieneduca+</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary-500 shrink-0" />
                <span>Technopark, Casablanca,<br/>Maroc</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary-500 shrink-0" />
                <span>contact@orieneduca.ma</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary-500 shrink-0" />
                <span>+212 5 22 00 00 00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 Orieneduca. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => onNavigate(NavPage.PRIVACY)} className="hover:text-white transition-colors text-left">Confidentialité</button>
            <button onClick={() => onNavigate(NavPage.LEGAL)} className="hover:text-white transition-colors text-left">Mentions Légales</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;
