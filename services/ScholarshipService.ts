import { Scholarship } from '../types';
import { MOCK_SCHOLARSHIPS } from '../constants';

const API_URL = 'http://localhost:8000/api';

export const ScholarshipService = {
    getAll: async (): Promise<Scholarship[]> => {
        try {
            const response = await fetch(`${API_URL}/scholarships/read.php`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn('API Error, falling back to mock data:', error);
            return MOCK_SCHOLARSHIPS;
        }
    },

    search: async (term: string, type: string = 'All', location: string = 'All'): Promise<Scholarship[]> => {
        try {
            const params = new URLSearchParams();
            if (term) params.append('search', term);
            if (type !== 'All') params.append('type', type);
            if (location !== 'All') params.append('location', location);

            const response = await fetch(`${API_URL}/scholarships/read.php?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.warn('API Search Error, falling back to local filter:', error);
            return MOCK_SCHOLARSHIPS.filter(s => {
                const matchesSearch = s.title.toLowerCase().includes(term.toLowerCase()) ||
                    s.provider.toLowerCase().includes(term.toLowerCase());
                const matchesType = type === 'All' || s.type === type;
                const matchesLocation = location === 'All' || s.location === location;
                return matchesSearch && matchesType && matchesLocation;
            });
        }
    }
};
