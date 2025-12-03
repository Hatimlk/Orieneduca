
import React, { useState } from 'react';
import { X, Mail, Lock, Star, ArrowRight, ShieldAlert } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('premium@orieneduca.ma');
  const [password, setPassword] = useState('123456');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isAdminMode) {
          onLogin({
            id: 'admin_user',
            name: 'Administrateur',
            email: email,
            isPremium: true,
            points: 9999,
            level: 99,
            badges: [],
            role: 'admin'
          });
      } else {
          onLogin({
            id: 'user_premium',
            name: 'Étudiant Premium',
            email: email,
            isPremium: true, // Always Premium as requested for demo
            points: 0,
            level: 1,
            badges: [],
            role: 'student'
          });
      }
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const toggleAdminMode = () => {
      setIsAdminMode(!isAdminMode);
      if (!isAdminMode) {
          setEmail('admin@orieneduca.ma');
      } else {
          setEmail('premium@orieneduca.ma');
      }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-colors ${isAdminMode ? 'bg-gray-800 text-white' : 'bg-accent-100 text-accent-600'}`}>
              {isAdminMode ? <ShieldAlert className="w-6 h-6" /> : <Star className="w-6 h-6 fill-current" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
                {isAdminMode ? 'Accès Administrateur' : 'Espace Membre'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
                {isAdminMode ? 'Gérez vos étudiants et supervisez les dossiers.' : 'Connectez-vous pour accéder à votre espace.'}
            </p>
          </div>

          {/* Credentials Box */}
          <div className={`p-4 rounded-lg mb-6 border transition-colors ${isAdminMode ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-100'}`}>
             <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-bold uppercase ${isAdminMode ? 'text-gray-700' : 'text-blue-800'}`}>Identifiants de test</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isAdminMode ? 'bg-gray-200 text-gray-800' : 'bg-blue-200 text-blue-800'}`}>DÉMO</span>
             </div>
             <div className="space-y-1">
                 <div className={`flex justify-between text-sm ${isAdminMode ? 'text-gray-800' : 'text-blue-900'}`}>
                    <span className="opacity-70">Email:</span>
                    <span className="font-mono font-medium">{isAdminMode ? 'admin@orieneduca.ma' : 'premium@orieneduca.ma'}</span>
                 </div>
                 <div className={`flex justify-between text-sm ${isAdminMode ? 'text-gray-800' : 'text-blue-900'}`}>
                    <span className="opacity-70">Mot de passe:</span>
                    <span className="font-mono font-medium">123456</span>
                 </div>
             </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="email@exemple.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center px-4 py-3 rounded-xl text-white font-bold shadow-lg transition-all transform hover:-translate-y-0.5 mt-2 ${
                  isAdminMode 
                  ? 'bg-gray-900 hover:bg-black shadow-gray-900/20' 
                  : 'bg-primary-600 hover:bg-primary-700 shadow-primary-600/20'
              }`}
            >
              {isLoading ? 'Connexion...' : (
                <>
                  {isAdminMode ? 'Accéder au Dashboard' : 'Accéder à mon espace'} <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100 flex justify-center gap-4">
          <button onClick={toggleAdminMode} className="hover:text-gray-900 font-medium underline decoration-dotted">
              {isAdminMode ? 'Retour accès étudiant' : 'Accès Conseiller / Admin'}
          </button>
        </div>
      </div>
    </div>
  );
};