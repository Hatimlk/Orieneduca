import React from 'react';
import { Bell, Globe, Info } from 'lucide-react';

export const AlertBar = () => (
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
