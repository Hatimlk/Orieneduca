
import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, ArrowRight, Search, AlertCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { MOCK_CONCOURS } from '../constants';

export const ConcoursList: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredConcours = MOCK_CONCOURS.filter(c => filter === 'All' || c.accessLevel === filter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-red-100 text-red-800 border-red-200';
      case 'Coming Soon': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
          Candidatures 2024/2025
        </span>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Concours d'accès aux Grandes Écoles</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Retrouvez toutes les dates limites, les seuils et les liens d'inscription pour les concours d'état.
        </p>
        <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                <ShieldCheck className="w-3 h-3 mr-1" /> Données vérifiées via Ministères (Mai 2024)
            </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-10 overflow-x-auto pb-2 hide-scrollbar">
        <div className="bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm flex space-x-2">
          {['All', 'Post-Bac', 'Bac+2', 'Bac+3'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                filter === lvl
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {lvl === 'All' ? 'Tous les niveaux' : lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredConcours.map((concours) => (
          <div key={concours.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img 
                src={concours.imageUrl} 
                alt={concours.schoolName} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(concours.status)}`}>
                  {concours.status === 'Open' ? 'Inscriptions Ouvertes' : concours.status === 'Coming Soon' ? 'Bientôt' : 'Fermé'}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <p className="text-sm font-medium opacity-90">{concours.schoolName}</p>
                <h3 className="text-xl font-bold leading-tight">{concours.title}</h3>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                    Date limite
                  </span>
                  <span className="font-semibold text-gray-900">{concours.deadline}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                    Date du concours
                  </span>
                  <span className="font-semibold text-gray-900">{concours.examDate}</span>
                </div>
              </div>

              <div className="mt-auto flex gap-3">
                 <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center">
                   <ExternalLink className="w-4 h-4 mr-1.5 text-gray-400" /> Source
                 </button>
                 <button className="flex-1 bg-primary-600 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-primary-700 transition-colors text-sm flex items-center justify-center shadow-lg shadow-primary-600/20">
                   Postuler <ArrowRight className="w-4 h-4 ml-2" />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredConcours.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Aucun concours trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de changer les filtres de niveau.</p>
        </div>
      )}
    </div>
  );
};
