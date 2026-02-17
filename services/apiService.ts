export interface RegistrationData {
    fullName: string;
    formEmail: string;
    gender: string;
    phone: string;
    parentPhone: string;
    schoolType: string;
    stream: string;
    regionalGrade: string;
    type: string;
    date: string;
}

export const submitRegistration = async (data: RegistrationData): Promise<{ success: boolean; message?: string }> => {
    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }

        return { success: true, message: result.message };
    } catch (error: any) {
        console.error('Error submitting registration:', error);
        return { success: false, message: error.message || 'Une erreur est survenue lors de l\'envoi des données.' };
    }
};
