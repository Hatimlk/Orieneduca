import { School } from '../types';
import { MOCK_SCHOOLS } from '../constants';

const API_URL = 'http://localhost:8000/api';

export const SchoolService = {
    getAll: async (): Promise<School[]> => {
        try {
            const response = await fetch(`${API_URL}/schools/read.php`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.warn('API Error, falling back to mock data:', error);
            return MOCK_SCHOOLS;
        }
    },

    filter: async (city: string = 'All', type: string = 'All'): Promise<School[]> => {
        try {
            const params = new URLSearchParams();
            if (city !== 'All') params.append('city', city);
            if (type !== 'All') params.append('type', type);

            const response = await fetch(`${API_URL}/schools/read.php?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.warn('API Search Error, falling back to local filter:', error);
            return MOCK_SCHOOLS.filter(s => {
                const matchesCity = city === 'All' || s.city === city;
                const matchesType = type === 'All' || s.type === type;
                return matchesCity && matchesType;
            });
        }
    }
};
