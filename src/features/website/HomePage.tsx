import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Zap, Target, Compass, Shield, Users, ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight, Quote, GraduationCap, BarChart } from 'lucide-react';
import { BlogPost, NavPage } from '../../types';
import { MOCK_BLOG_POSTS } from '../../constants';

// Simulated API Fetch functionality
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    // const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/blog`);
    // return response.json();
    return new Promise(resolve => setTimeout(() => resolve(MOCK_BLOG_POSTS), 300));
};

export const HomePage: React.FC<{ onNavigate: (page: NavPage) => void; onOpenChat: () => void }> = ({ onNavigate, onOpenChat }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const loadBlogPosts = async () => {
            const data = await fetchBlogPosts();
            setBlogPosts(data);
        };
        loadBlogPosts();
    }, []);

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

                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white tracking-tight mb-8 leading-[1.1] animate-fade-in-up delay-100 drop-shadow-2xl">
                        L'Orientation <br className="md:hidden" />
                        <span className="relative inline-block px-2">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-100 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Intelligente</span>
                            <div className="absolute -bottom-1 left-0 w-full h-4 bg-primary-600/40 -rotate-1 blur-md rounded-full"></div>
                        </span>
                        <br />
                        <span className="text-white drop-shadow-md">Pour Votre Avenir</span>
                    </h1>

                    <p className="mt-8 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-14 animate-fade-in-up delay-200 font-light leading-relaxed">
                        Trouvez votre vocation, choisissez la bonne école et préparez vos concours avec la première plateforme d'orientation <span className="text-white font-semibold border-b-2 border-accent-500/50">100% digitale</span> au Maroc.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
                        <button
                            onClick={() => onNavigate(NavPage.CONSULTATION)}
                            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-lg transition-all shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)] hover:scale-105 border border-white/20 flex items-center justify-center group"
                        >
                            <Sparkles className="w-6 h-6 mr-3 text-accent-300 group-hover:text-accent-400 group-hover:animate-spin-slow transition-colors" />
                            Demander une consultation
                        </button>

                        <button
                            onClick={() => onNavigate(NavPage.ORIENEDUCA_PLUS)}
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-slate-900 rounded-2xl font-bold text-lg transition-all shadow-[0_0_30px_-5px_rgba(163,230,53,0.4)] hover:shadow-[0_0_50px_-5px_rgba(163,230,53,0.6)] hover:scale-105 flex items-center justify-center border border-[#bef264]/50 group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                            <Zap className="w-6 h-6 mr-3 fill-current group-hover:scale-110 transition-transform" />
                            Orieneduca+
                        </button>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-5 animate-fade-in-up delay-500 opacity-95">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} className="w-12 h-12 rounded-full border-[3px] border-[#0f172a] shadow-lg hover:-translate-y-1 transition-transform relative z-10" style={{ zIndex: 10 - i }} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                            ))}
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <div className="flex items-center gap-1 text-[#a3e635]">
                                {[1, 2, 3, 4, 5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                            </div>
                            <p className="text-sm text-slate-300 font-medium">Rejoint par <span className="text-white font-bold tracking-wide">+10 000 étudiants</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative z-20 -mt-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mb-20 animate-fade-in-up delay-700">
                <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40 p-8 md:p-10 ring-1 ring-black/5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/50">
                        <div className="text-center px-4 pt-4 md:pt-0 group">
                            <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <p className="text-4xl font-extrabold text-slate-800 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">10k+</p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Étudiants</p>
                        </div>
                        <div className="text-center px-4 pt-8 md:pt-0 group">
                            <div className="mx-auto w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-indigo-100 group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <p className="text-4xl font-extrabold text-slate-800 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">500+</p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Écoles</p>
                        </div>
                        <div className="text-center px-4 pt-8 md:pt-0 group">
                            <div className="mx-auto w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-green-100 group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6" />
                            </div>
                            <p className="text-4xl font-extrabold text-slate-800 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">98%</p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Satisfaction</p>
                        </div>
                        <div className="text-center px-4 pt-8 md:pt-0 group">
                            <div className="mx-auto w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <p className="text-4xl font-extrabold text-slate-800 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">24/7</p>
                            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Support IA</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Paths */}
            <div className="py-24 bg-slate-50 relative overflow-hidden">
                {/* Decorative background vectors */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-2 block">Navigation Rapide</span>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Que souhaitez-vous faire ?</h2>
                        <p className="text-slate-500 text-lg">Choisissez votre point de départ et laissez-nous vous guider vers votre réussite scolaire et professionnelle.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
                        {/* Card 1 */}
                        <button onClick={() => onNavigate(NavPage.SCHOOLS)} className="relative bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 hover:border-blue-200 transition-all duration-300 text-left group overflow-hidden hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="bg-blue-100/80 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-blue-200/50">
                                    <GraduationCap className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="font-extrabold text-xl text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">Trouver une école</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">Explorez l'annuaire complet des établissements supérieurs au Maroc, filtrez par spécialité ou ville.</p>
                                <div className="flex items-center text-blue-600 font-bold text-sm bg-blue-50 w-fit px-3 py-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    Explorer <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>

                        {/* Card 2 */}
                        <button onClick={() => onNavigate(NavPage.ORIENTATION_TESTS)} className="relative bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 hover:border-purple-200 transition-all duration-300 text-left group overflow-hidden hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="bg-purple-100/80 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-purple-200/50">
                                    <Compass className="w-7 h-7 text-purple-600" />
                                </div>
                                <h3 className="font-extrabold text-xl text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">Je suis perdu(e)</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">Passez nos tests d'orientation excusifs pour découvrir les métiers faits pour votre profil.</p>
                                <div className="flex items-center text-purple-600 font-bold text-sm bg-purple-50 w-fit px-3 py-1.5 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    Faire le test <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>

                        {/* Card 3 */}
                        <button onClick={() => onNavigate(NavPage.SIMULATOR)} className="relative bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 hover:border-emerald-200 transition-all duration-300 text-left group overflow-hidden hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="bg-emerald-100/80 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-emerald-200/50">
                                    <BarChart className="w-7 h-7 text-emerald-600" />
                                </div>
                                <h3 className="font-extrabold text-xl text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">Calculer ma note</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">Utilisez notre simulateur intelligent pour estimer votre moyenne du Bac ou tester plusieurs scénarios.</p>
                                <div className="flex items-center text-emerald-600 font-bold text-sm bg-emerald-50 w-fit px-3 py-1.5 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    Simuler <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="py-24 bg-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image side */}
                        <div className="relative group">
                            <div className="absolute -left-6 -top-6 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="absolute -right-6 -bottom-6 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 group-hover:scale-110 transition-transform duration-700 delay-100"></div>
                            <div className="relative bg-white rounded-3xl shadow-2xl p-2 md:p-3 rotate-2 hover:rotate-0 transition-all duration-500 ring-1 ring-slate-900/5">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 mix-blend-overlay"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                                    alt="Étudiants motivés"
                                    className="rounded-2xl w-full object-cover h-[450px] shadow-inner"
                                />
                                {/* Floating badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow border border-slate-100 hover:scale-105 transition-transform">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Shield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium tracking-wide">Recommandé par</p>
                                        <p className="font-bold text-slate-900">100% des parents</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text side */}
                        <div>
                            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold uppercase tracking-wider text-xs mb-5 shadow-sm">Notre Mission</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                                L'orientation n'a jamais été aussi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">évidente.</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Chez Orieneduca, nous croyons que chaque étudiant mérite une orientation claire, ambitieuse et sans stress. Notre mission est de démocratiser l'accès à l'information premium sur les études supérieures au Maroc et à l'international.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex items-start group">
                                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mt-1 shadow-sm border border-green-200/50 group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <Target className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-slate-900 font-bold text-lg mb-1 group-hover:text-green-600 transition-colors">Information Centralisée</h4>
                                        <span className="text-slate-600 text-[15px] leading-relaxed block">Fini les heures de recherche. Retrouvez toutes les dates, seuils et modalités d'inscription au même endroit.</span>
                                    </div>
                                </li>
                                <li className="flex items-start group">
                                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mt-1 shadow-sm border border-blue-200/50 group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <Compass className="h-6 w-6 text-blue-700" />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-slate-900 font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">Guidage Intelligent</h4>
                                        <span className="text-slate-600 text-[15px] leading-relaxed block">Profitez de notre IA (Orieneduca GPT) et de nos simulateurs sophistiqués pour des recommandations personnalisées.</span>
                                    </div>
                                </li>
                                <li className="flex items-start group">
                                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center mt-1 shadow-sm border border-purple-200/50 group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <Users className="h-6 w-6 text-purple-700" />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-slate-900 font-bold text-lg mb-1 group-hover:text-purple-600 transition-colors">Accompagnement Humain</h4>
                                        <span className="text-slate-600 text-[15px] leading-relaxed block">Nos conseillers d'orientation dédiés vous assistent tout au long de votre parcours, de la découverte à l'inscription.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-3 block">Valeurs</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Nos Principes Fondamentaux</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">L'excellence, la transparence et l'innovation au service de votre réussite académique.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[1px] mb-6 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                                    <Shield className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">Fiabilité</h3>
                            <p className="text-slate-600 text-[15px] leading-relaxed">Des informations rigoureusement vérifiées auprès des ministères et établissements. Fini l'intox, place aux faits et aux sources officielles.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-[1px] mb-6 shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
                                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                                    <Zap className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">Innovation</h3>
                            <p className="text-slate-600 text-[15px] leading-relaxed">Nos algorithmes avancés et notre intelligence artificielle analysent votre profil pour vous suggérer les filières où vous excellerez.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 p-[1px] mb-6 shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all">
                                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                                    <Users className="w-8 h-8 text-rose-500 group-hover:text-white transition-colors duration-300" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-rose-500 transition-colors">Communauté</h3>
                            <p className="text-slate-600 text-[15px] leading-relaxed">Intégrez une communauté dynamique d'étudiants, d'alumni et d'experts pour échanger, vous rassurer et construire votre réseau.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Preview Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-3 block">Actualités & Inspiration</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Derniers articles du Blog</h2>
                            <p className="mt-4 text-slate-500 text-lg leading-relaxed">Conseils inspirants, stratégies éprouvées et actualités éducatives pour booster votre parcours en un clic.</p>
                        </div>
                        <button
                            onClick={() => onNavigate(NavPage.BLOG)}
                            className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group bg-white shadow-sm hover:shadow-md"
                        >
                            Explorer le blog <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.slice(0, 3).map((post) => (
                            <div
                                key={post.id}
                                onClick={() => onNavigate(NavPage.BLOG)}
                                className="bg-white rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group flex flex-col h-full border border-slate-100 relative shadow-sm"
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col bg-slate-50/30">
                                    <div className="flex items-center text-xs font-medium text-slate-500 mb-4 space-x-3">
                                        <span className="flex items-center text-primary-600 bg-primary-50 px-2 py-1 rounded-md"><Calendar className="w-3.5 h-3.5 mr-1.5" /> {post.date}</span>
                                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> {post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-4 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-slate-200/60 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold mr-3 shadow-md shadow-primary-500/20">
                                                {post.author.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-bold text-slate-900 tracking-tight">{post.author}</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Conseiller</span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300 shadow-sm">
                                            <ArrowRight className="w-4 h-4 text-primary-600 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-24 bg-slate-50 overflow-hidden relative">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-3 block">Témoignages</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Ils ont trouvé leur voie</h2>
                        <p className="text-lg text-slate-500 leading-relaxed">Découvrez les parcours inspirants de nos étudiants qui ont pris en main leur avenir avec confiance.</p>
                    </div>

                    <div className="relative group p-4 sm:px-16" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: '-webkit-linear-gradient(left, transparent, black 10%, black 90%, transparent)' }}>
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-slate-600 hover:text-primary-600 hover:scale-110 transition-all hidden sm:flex border border-slate-100 ring-1 ring-black/5"
                            aria-label="Précédent"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-4 scrollbar-hide scroll-smooth"
                        >
                            {testimonials.map((testimonial, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[85vw] sm:min-w-[420px] snap-center"
                                >
                                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 relative h-full transition-all duration-300 group/card">
                                        <div className="absolute top-8 right-8 text-primary-50 transition-colors duration-300 group-hover/card:text-primary-100">
                                            <Quote className="w-16 h-16 rotate-180" />
                                        </div>
                                        <div className="flex items-center mb-8 relative z-10">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-indigo-400 rounded-full blur-[6px] opacity-40 group-hover/card:opacity-70 transition-opacity duration-300"></div>
                                                <img src={testimonial.image} alt={testimonial.name} className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-sm" />
                                            </div>
                                            <div className="ml-5">
                                                <h4 className="font-extrabold text-lg text-slate-900 tracking-tight">{testimonial.name}</h4>
                                                <p className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg inline-block mt-1 border border-indigo-100/50 shadow-sm">{testimonial.school}</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 italic relative z-10 leading-relaxed text-[17px]">"{testimonial.text}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-slate-600 hover:text-primary-600 hover:scale-110 transition-all hidden sm:flex border border-slate-100 ring-1 ring-black/5"
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
