
import React from 'react';
import { Lock, Star, CheckCircle, ShieldCheck } from 'lucide-react';

interface PremiumGateProps {
  title: string;
  description: string;
  onUnlock: () => void;
}

export const PremiumGate: React.FC<PremiumGateProps> = ({ title, description, onUnlock }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-gray-900 to-gray-800"></div>
        <div className="absolute top-6 right-6 text-white/10">
          <Lock className="w-32 h-32" />
        </div>

        <div className="relative pt-12 px-8 pb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-xl mb-6 transform -rotate-6 border-4 border-accent-500">
            <Lock className="w-10 h-10 text-gray-900" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">{description}</p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Avantages du Pack Premium Étudiant
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                <span className="text-gray-700 text-sm">Accès complet aux dates de concours</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                <span className="text-gray-700 text-sm">Liste exclusive des bourses internationales</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                <span className="text-gray-700 text-sm">Annales et exemples d'épreuves</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                <span className="text-gray-700 text-sm">Support prioritaire sur le Conseiller IA</span>
              </div>
            </div>
          </div>

          <button
            onClick={onUnlock}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-accent-500/30 transform transition-all hover:-translate-y-1 flex items-center justify-center mx-auto"
          >
            <Star className="w-5 h-5 mr-2 text-yellow-200 fill-current" />
            Débloquer l'Accès Premium
          </button>
          
          <p className="mt-4 text-xs text-gray-400 flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 mr-1" /> Paiement sécurisé • Satisfait ou remboursé
          </p>
        </div>
      </div>
    </div>
  );
};
