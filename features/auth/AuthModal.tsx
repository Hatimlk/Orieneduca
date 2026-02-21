import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { AuthService } from '../../services/AuthService';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'login') {
                await AuthService.login(email, password);
                onClose(); // Close modal on success
            } else {
                await AuthService.register(fullName, email, password);
                // Auto login or switch to login mode? Let's switch to login with success message
                setMode('login');
                setError('Compte créé ! Veuillez vous connecter.');
                setLoading(false); // Stop loading to show message
                return;
            }
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="bg-primary-900 p-6 text-white text-center relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold mb-1">
                        {mode === 'login' ? 'Bienvenue !' : 'Rejoignez-nous'}
                    </h2>
                    <p className="text-primary-200 text-sm">
                        {mode === 'login'
                            ? 'Connectez-vous pour accéder à votre espace.'
                            : 'Créez un compte pour suivre vos candidatures.'}
                    </p>
                </div>

                {/* Body */}
                <div className="p-8">
                    {error && (
                        <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${error.includes('créé') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'register' && (
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Nom complet"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {mode === 'login' ? 'Pas encore de compte ?' : 'Déjà inscrit ?'} {' '}
                            <button
                                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                                className="font-bold text-primary-600 hover:text-primary-800 transition-colors"
                            >
                                {mode === 'login' ? "S'inscrire" : 'Se connecter'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
