

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, ChevronRight, Tag, ArrowLeft, Search, BookOpen, TrendingUp, Share2, Facebook, Twitter, Linkedin, Mail, ArrowUpRight, ArrowRight, ThumbsUp, Bookmark, MessageCircle, Hash, Target, GraduationCap, Plane } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../constants';
import { BlogPost, NavPage } from '../types';

interface BlogProps {
    onNavigate?: (page: NavPage) => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Local state for interactions (mock)
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [isLiked, setIsLiked] = useState(false);

  // Scroll progress listener for detail view
  useEffect(() => {
    const handleScroll = () => {
      if (!selectedPost) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPost]);

  const toggleLike = (postId: string) => {
      setIsLiked(!isLiked);
      setLikes(prev => ({
          ...prev,
          [postId]: (prev[postId] || 0) + (isLiked ? -1 : 1)
      }));
  };

  const toggleSave = (postId: string) => {
      setSaved(prev => ({
          ...prev,
          [postId]: !prev[postId]
      }));
  };

  const categories = ['All', ...Array.from(new Set(MOCK_BLOG_POSTS.map(post => post.category)))];

  const filteredPosts = MOCK_BLOG_POSTS.filter(post => {
    const matchesCategory = filterCategory === 'All' || post.category === filterCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Layout logic: Featured (1st), Trending (2nd & 3rd), Grid (Rest)
  const featuredPost = (filterCategory === 'All' && !searchQuery) ? filteredPosts[0] : null;
  const trendingPosts = (filterCategory === 'All' && !searchQuery) ? filteredPosts.slice(1, 3) : [];
  const gridPosts = (filterCategory === 'All' && !searchQuery) ? filteredPosts.slice(3) : filteredPosts;

  // Helper to get CTA Content based on category
  const getCTAContent = (category: string) => {
      switch(category) {
          case 'Orientation':
          case 'Carrière':
              return {
                  title: "Vous doutez encore de votre choix ?",
                  text: "Faites notre test d'orientation gratuit pour découvrir les métiers qui vous correspondent vraiment.",
                  buttonText: "Faire le test RIASEC",
                  icon: <Target className="w-6 h-6" />,
                  target: NavPage.ORIENTATION_TESTS
              };
          case 'Concours':
              return {
                  title: "Prêt pour le jour J ?",
                  text: "Testez vos connaissances avec nos quiz d'entraînement et consultez les dates officielles.",
                  buttonText: "Voir les Concours",
                  icon: <GraduationCap className="w-6 h-6" />,
                  target: NavPage.CONCOURS
              };
          case 'Études en France':
          case 'Bourses':
              return {
                  title: "Besoin de financement ?",
                  text: "Ne laissez pas le budget bloquer vos rêves. Explorez notre moteur de recherche de bourses.",
                  buttonText: "Trouver une bourse",
                  icon: <Plane className="w-6 h-6" />,
                  target: NavPage.SCHOLARSHIPS
              };
          default:
              return {
                  title: "Passez à l'action",
                  text: "Calculez vos chances d'admission avec notre simulateur de notes.",
                  buttonText: "Simuler ma note",
                  icon: <ArrowUpRight className="w-6 h-6" />,
                  target: NavPage.SIMULATOR
              };
      }
  };

  // --- DETAIL VIEW ---
  if (selectedPost) {
    // Find related posts (same category, not current)
    const relatedPosts = MOCK_BLOG_POSTS
        .filter(p => p.category === selectedPost.category && p.id !== selectedPost.id)
        .slice(0, 2);
    
    const cta = getCTAContent(selectedPost.category);

    return (
      <div className="min-h-screen bg-white animate-fade-in relative">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 h-1.5 bg-gray-100 w-full z-[60]">
            <div className="h-full bg-primary-600 transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }}></div>
        </div>

        {/* Navigation Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 px-4 py-3 transition-all">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <button 
                    onClick={() => { setSelectedPost(null); window.scrollTo(0,0); setIsLiked(false); }}
                    className="flex items-center text-gray-600 hover:text-primary-600 font-bold transition-colors group py-2"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Retour au magazine
                </button>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                    <span className="hidden sm:inline">{selectedPost.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline"></span>
                    <span>{selectedPost.readTime} de lecture</span>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Floating Actions (Desktop) */}
                <div className="hidden lg:block lg:col-span-1 relative">
                    <div className="sticky top-32 flex flex-col gap-6 items-center">
                        <button 
                            onClick={() => toggleLike(selectedPost.id)}
                            className={`p-3 rounded-full transition-all transform hover:scale-110 ${isLiked ? 'bg-red-50 text-red-500 shadow-inner' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                            <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-xs font-bold text-gray-400 -mt-4">{124 + (likes[selectedPost.id] || 0)}</span>
                        
                        <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-blue-500 transition-all">
                            <MessageCircle className="w-5 h-5" />
                        </button>
                        
                        <button 
                            onClick={() => toggleSave(selectedPost.id)}
                            className={`p-3 rounded-full transition-all ${saved[selectedPost.id] ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                            <Bookmark className={`w-5 h-5 ${saved[selectedPost.id] ? 'fill-current' : ''}`} />
                        </button>

                        <div className="w-8 h-px bg-gray-200 my-2"></div>

                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Share2 className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-8">
                    {/* Article Header */}
                    <div className="mb-10">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
                                {selectedPost.category}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium flex items-center">
                                <Calendar className="w-3 h-3 mr-1.5" /> {selectedPost.date}
                            </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
                            {selectedPost.title}
                        </h1>

                        <div className="flex items-center justify-between border-y border-gray-100 py-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-0.5 mr-4">
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                                        {selectedPost.author.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{selectedPost.author}</p>
                                    <p className="text-sm text-gray-500">Rédacteur Senior</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="rounded-3xl overflow-hidden shadow-xl mb-12 aspect-video relative group">
                        <img 
                            src={selectedPost.imageUrl} 
                            alt={selectedPost.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Content Body */}
                    <div className="prose prose-lg prose-blue max-w-none">
                        <p className="lead text-xl text-gray-600 font-medium italic mb-8 border-l-4 border-primary-500 pl-6">
                            {selectedPost.excerpt}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                    </div>

                    {/* Contextual Call To Action */}
                    <div className="my-12 bg-gradient-to-r from-primary-50 to-white border border-primary-100 rounded-2xl p-8 text-center shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-primary-600">
                                {cta.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{cta.title}</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">{cta.text}</p>
                            <button 
                                onClick={() => onNavigate?.(cta.target)}
                                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 flex items-center justify-center mx-auto"
                            >
                                {cta.buttonText} <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>

                    {/* Tags Footer */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                            <Hash className="w-4 h-4 mr-2 text-primary-600" /> Sujets associés
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedPost.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer border border-gray-200 hover:border-primary-200">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="sticky top-32 space-y-8">
                        {/* Newsletter Widget */}
                        <div className="bg-primary-900 rounded-2xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>
                            <h3 className="font-bold text-lg mb-2 relative z-10">Newsletter Hebdo</h3>
                            <p className="text-sm text-primary-200 mb-4 relative z-10">Recevez les meilleurs conseils d'orientation.</p>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm mb-3 focus:outline-none focus:border-accent-400 relative z-10"
                            />
                            <button className="w-full bg-accent-500 text-gray-900 font-bold text-sm py-2 rounded-lg hover:bg-accent-400 transition-colors relative z-10">
                                S'abonner
                            </button>
                        </div>

                        {/* Related Posts */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <BookOpen className="w-4 h-4 mr-2 text-primary-600" /> À lire aussi
                            </h3>
                            <div className="space-y-4">
                                {relatedPosts.map(post => (
                                    <div 
                                        key={post.id}
                                        onClick={() => { setSelectedPost(post); window.scrollTo(0,0); }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                                            <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title}/>
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-primary-600 transition-colors">
                                            {post.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Mobile Bottom Action Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-50 flex justify-around items-center safe-area-bottom">
             <button onClick={() => toggleLike(selectedPost.id)} className="flex flex-col items-center text-gray-500">
                 <ThumbsUp className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                 <span className="text-[10px] mt-1">{124 + (likes[selectedPost.id] || 0)}</span>
             </button>
             <button className="flex flex-col items-center text-gray-500">
                 <MessageCircle className="w-6 h-6" />
                 <span className="text-[10px] mt-1">12</span>
             </button>
             <button onClick={() => toggleSave(selectedPost.id)} className="flex flex-col items-center text-gray-500">
                 <Bookmark className={`w-6 h-6 ${saved[selectedPost.id] ? 'text-yellow-500 fill-current' : ''}`} />
                 <span className="text-[10px] mt-1">Sauver</span>
             </button>
             <button className="flex flex-col items-center text-gray-500">
                 <Share2 className="w-6 h-6" />
                 <span className="text-[10px] mt-1">Partager</span>
             </button>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white pt-12 pb-8 border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-serif">
                        Orieneduca <span className="text-primary-600 font-sans italic">Mag</span>
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 font-medium uppercase tracking-widest">L'actualité de l'orientation décryptée</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative mt-4 md:mt-0 w-full md:w-72 group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm shadow-sm"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide justify-center md:justify-start">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                            filterCategory === cat 
                            ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        {cat === 'All' ? 'Tout' : cat}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Hero Section (Bento Grid) */}
        {featuredPost && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                {/* Main Featured */}
                <div 
                    onClick={() => setSelectedPost(featuredPost)}
                    className="lg:col-span-2 group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer h-[400px] lg:h-[500px]"
                >
                    <img 
                        src={featuredPost.imageUrl} 
                        alt={featuredPost.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                        <span className="bg-accent-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wide mb-4 inline-block">
                            À la une
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight group-hover:text-primary-200 transition-colors">
                            {featuredPost.title}
                        </h2>
                        <div className="flex items-center text-white/80 text-sm font-medium space-x-4">
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {featuredPost.date}</span>
                            <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {featuredPost.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Trending Side */}
                <div className="flex flex-col gap-8">
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                        <TrendingUp className="w-5 h-5 text-primary-600" />
                        <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm">Tendance</h3>
                    </div>
                    
                    {trendingPosts.map((post) => (
                        <div 
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="flex-1 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group flex flex-col"
                        >
                            <div className="h-32 overflow-hidden relative">
                                <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title}/>
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
                                <div className="mt-3 flex items-center text-xs text-gray-400">
                                    <span className="font-medium text-gray-600">{post.author}</span>
                                    <span className="mx-2">•</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Grid Section */}
        <div>
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                    {filterCategory === 'All' ? 'Derniers Articles' : filterCategory}
                </h3>
                <div className="h-px flex-1 bg-gray-200 ml-6"></div>
            </div>

            {gridPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {gridPosts.map((post, index) => (
                        <div 
                            key={post.id} 
                            onClick={() => setSelectedPost(post)}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-sm mb-5 relative h-64">
                                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img 
                                    src={post.imageUrl} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wide">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center text-xs text-gray-500 font-medium mb-3 space-x-3">
                                    <span className="text-primary-600">{post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span>{post.readTime} de lecture</span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary-600 transition-colors">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                
                                <div className="mt-auto flex items-center pt-4 border-t border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 mr-3">
                                        {post.author.charAt(0)}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{post.author}</span>
                                    <div className="ml-auto">
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-900 font-medium text-lg">Aucun article trouvé</h3>
                    <p className="text-gray-500 mt-2">Essayez d'autres mots-clés.</p>
                    <button 
                        onClick={() => { setSearchQuery(''); setFilterCategory('All'); }}
                        className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Voir tout
                    </button>
                </div>
            )}
        </div>

        {/* Newsletter Full Width */}
        <div className="mt-12 relative rounded-[3rem] overflow-hidden bg-gray-900 text-center py-20 px-6">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/10 shadow-xl">
                    <Mail className="w-8 h-8 text-accent-400" />
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Restez inspiré.
                </h2>
                <p className="text-lg text-gray-300 mb-10 font-light">
                    Rejoignez <span className="text-white font-bold">10,000+ étudiants</span> et recevez nos meilleurs conseils d'orientation chaque semaine.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Votre adresse email" 
                        className="flex-1 px-6 py-4 rounded-xl border-0 bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:bg-white/20 transition-all outline-none backdrop-blur-sm"
                    />
                    <button className="bg-accent-500 hover:bg-accent-400 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-accent-500/50 transform hover:-translate-y-1">
                        S'inscrire
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-6">0% Spam, 100% Orientation. Désabonnement facile.</p>
            </div>
        </div>

      </div>
    </div>
  );
};