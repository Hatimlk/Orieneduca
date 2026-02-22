import { Scholarship } from '../types';

export const ScholarshipService = {
    getAll: async (): Promise<Scholarship[]> => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_URL}/scholarships/read.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    },

    search: async (term: string, type: string = 'All', location: string = 'All'): Promise<Scholarship[]> => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const params = new URLSearchParams();
        if (term) params.append('search', term);
        if (type !== 'All') params.append('type', type);
        if (location !== 'All') params.append('location', location);

        const response = await fetch(`${API_URL}/scholarships/read.php?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
};
