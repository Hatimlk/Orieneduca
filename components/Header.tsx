
import React, { useState } from 'react';
import { Menu, X, GraduationCap, School, User as UserIcon, LogIn, LogOut, Star, LayoutDashboard, Globe, Zap, BookOpen, BrainCircuit } from 'lucide-react';
import { NavPage, User } from '../types';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, user, onLoginClick, onLogoutClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: NavPage.HOME, label: 'Accueil', icon: <School className="w-4 h-4" /> },
    { id: NavPage.SCHOOLS, label: 'Écoles', icon: <GraduationCap className="w-4 h-4" /> },
    { id: NavPage.ORIENTATION_TESTS, label: 'Tests', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: NavPage.STUDY_ABROAD, label: 'Étranger', icon: <Globe className="w-4 h-4" /> },
    { id: NavPage.BLOG, label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
    { id: NavPage.ORIENEDUCA_PLUS, label: 'Orieneduca+', icon: <Zap className="w-4 h-4" />, special: true },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Icon + Text */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNavigate(NavPage.HOME)}
          >
            <div className="relative">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-2 rounded-xl shadow-lg shadow-primary-600/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                   <GraduationCap className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="ml-3 text-xl font-extrabold text-gray-900 tracking-tight">
              Orien<span className="text-primary-600">educa</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  item.special 
                   ? currentPage === item.id
                        ? 'bg-gradient-to-r from-accent-500 to-primary-600 text-white shadow-md'
                        : 'text-gray-800 bg-gradient-to-r from-accent-100 to-primary-50 hover:from-accent-200 hover:to-primary-100 border border-accent-200'
                   : currentPage === item.id
                    ? 'text-primary-700 bg-primary-50 border border-primary-100 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-gray-200 ml-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Dashboard Button */}
                <button 
                    onClick={() => onNavigate(NavPage.DASHBOARD)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === NavPage.DASHBOARD 
                        ? 'bg-primary-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Mon Espace</span>
                </button>

                <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center border border-primary-200 relative group cursor-pointer text-primary-700 font-bold">
                   {user.name.charAt(0)}
                   <div className="absolute right-0 top-10 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 hidden group-hover:block transform origin-top-right transition-all">
                      <div className="px-4 py-3 border-b border-gray-50 mb-2">
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                            {user.isPremium ? (
                                <span className="text-accent-600 flex items-center font-semibold">
                                    <Star className="w-3 h-3 mr-1 fill-current" /> Premium
                                </span>
                            ) : 'Membre Gratuit'}
                        </p>
                      </div>
                      <button onClick={() => onNavigate(NavPage.DASHBOARD)} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Tableau de bord
                      </button>
                      <button onClick={onLogoutClick} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg mt-1">
                        <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                      </button>
                   </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors shadow-md shadow-gray-900/10"
              >
                <LogIn className="w-4 h-4" />
                <span>Espace Étudiant</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Helper icon when logged in on mobile header */}
            {user && (
               <div 
                 onClick={() => onNavigate(NavPage.DASHBOARD)}
                 className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border border-primary-200"
               >
                   {user.name.charAt(0)}
               </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary-600 focus:outline-none p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl animate-fade-in-down z-50 flex flex-col max-h-[calc(100vh-4rem)] overflow-y-auto">
            
            {/* 1. User Actions Section (Priority) */}
            <div className="p-5 bg-gray-50/80 border-b border-gray-100">
                {user ? (
                    <div className="flex flex-col space-y-4">
                        {/* Profile Info */}
                        <div className="flex items-center space-x-4 px-1">
                            <div className="h-14 w-14 rounded-full bg-white border-2 border-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl shadow-sm">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-gray-900 font-extrabold text-lg leading-tight">{user.name}</p>
                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center mt-1 ${user.isPremium ? 'bg-accent-100 text-accent-700 border border-accent-200' : 'bg-gray-200 text-gray-600'}`}>
                                    {user.isPremium && <Star className="w-3 h-3 mr-1 fill-current" />}
                                    {user.isPremium ? 'Membre Premium' : 'Membre Gratuit'}
                                </span>
                            </div>
                        </div>

                        {/* Primary Actions Grid */}
                        <div className="grid grid-cols-1 gap-3 pt-2">
                            <button 
                                onClick={() => { onNavigate(NavPage.DASHBOARD); setIsMobileMenuOpen(false); }}
                                className="flex items-center justify-center w-full py-3.5 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-600/20 active:scale-95 transition-all"
                            >
                                <LayoutDashboard className="w-5 h-5 mr-2" />
                                Accéder à mon Espace
                            </button>
                            <button 
                                onClick={() => { onLogoutClick(); setIsMobileMenuOpen(false); }}
                                className="flex items-center justify-center w-full py-3.5 bg-white border border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 active:scale-95 transition-all"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Déconnexion
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-3 font-medium">Connectez-vous pour accéder à vos outils</p>
                        <button
                            onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}
                            className="w-full flex items-center justify-center py-4 bg-gray-900 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-all"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Se connecter / S'inscrire
                        </button>
                    </div>
                )}
            </div>

            {/* 2. Navigation Links */}
            <div className="p-4 space-y-1 bg-white">
                <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Navigation</p>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }}
                        className={`w-full flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                            currentPage === item.id
                            ? 'bg-primary-50 text-primary-700 border border-primary-100' // Active state
                            : 'text-gray-600 hover:bg-gray-50' // Default state
                        }`}
                    >
                        <div className={`p-2 rounded-lg mr-3 shadow-sm ${currentPage === item.id ? 'bg-white text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                            {item.icon}
                        </div>
                        <span className="text-base">{item.label}</span>
                        {item.special && <Zap className="w-4 h-4 ml-auto text-accent-500 fill-current" />}
                        {!item.special && currentPage === item.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-600 ml-auto"></div>}
                    </button>
                ))}
            </div>
        </div>
      )}
    </header>
  );
};
