import { School } from '../types';

export const SchoolService = {
    getAll: async (): Promise<School[]> => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_URL}/schools/read.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    },

    filter: async (city: string = 'All', type: string = 'All'): Promise<School[]> => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const params = new URLSearchParams();
        if (city !== 'All') params.append('city', city);
        if (type !== 'All') params.append('type', type);

        const response = await fetch(`${API_URL}/schools/read.php?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
};
