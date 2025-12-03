
import React, { useEffect, useRef } from 'react';

interface SchoolMapProps {
    lat: number;
    lng: number;
    popupText: string;
}

export const SchoolMap: React.FC<SchoolMapProps> = ({ lat, lng, popupText }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;
        
        // Check if L is available (Leaflet from CDN)
        const L = (window as any).L;
        if (!L) {
            console.error("Leaflet not loaded");
            return;
        }

        // Initialize map if not already initialized
        if (!mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: [lat, lng],
                zoom: 13,
                zoomControl: true,
                attributionControl: false // clean look for small map
            });

            // Use CartoDB Voyager tiles for a clean, modern look that fits the UI
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);

            L.marker([lat, lng]).addTo(map).bindPopup(popupText);

            mapInstanceRef.current = map;
        } else {
            // Update view if props change
            mapInstanceRef.current.setView([lat, lng], 13);
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lng, popupText]);

    return <div ref={mapContainerRef} className="w-full h-48 rounded-lg z-0 border border-gray-200 shadow-inner" />;
};
