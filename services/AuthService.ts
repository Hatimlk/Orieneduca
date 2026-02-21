import { User } from '../types';

const API_URL = 'http://localhost:8000/api/auth';

export const AuthService = {
    login: async (email: string, password: string): Promise<User> => {
        const response = await fetch(`${API_URL}/login.php`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Échec de la connexion');
        }

        const apiUser = data.user;

        // Map API response to User type
        const user: User = {
            id: apiUser.id,
            name: apiUser.fullName,
            email: apiUser.email,
            role: apiUser.role as 'student' | 'admin',
            plan: apiUser.plan as 'Premium' | 'Gratuit' | 'Plus',
            isPremium: apiUser.plan === 'Premium' || apiUser.plan === 'Plus',
            points: 0, // Default until backend supports gamification
            level: 1,
            badges: [],
            subscriptionDate: new Date().toISOString()
        };

        // Save user to localStorage
        localStorage.setItem('oe_user', JSON.stringify(user));
        // Trigger generic event for UI updates
        window.dispatchEvent(new Event('auth-change'));

        return user;
    },

    register: async (fullName: string, email: string, password: string): Promise<void> => {
        const response = await fetch(`${API_URL}/register.php`, {
            method: 'POST',
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Échec de l\'inscription');
        }
    },

    logout: () => {
        localStorage.removeItem('oe_user');
        window.dispatchEvent(new Event('auth-change'));
    },

    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('oe_user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('oe_user');
    }
};
