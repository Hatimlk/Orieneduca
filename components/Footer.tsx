import React from 'react';
import { NavPage } from '../types';
import { GraduationCap, Globe, Mail, MapPin, Phone, Zap } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (page: NavPage) => void }> = ({ onNavigate }) => {
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
                                <span>Technopark, Casablanca,<br />Maroc</span>
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
