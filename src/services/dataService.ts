
import { User, StudentTask, StudentDocument, Registration } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class DataService {
    // Current user context
    private getUserToken(): string | null {
        const userStr = localStorage.getItem('oe_user');
        if (!userStr) return null;
        try {
            const user = JSON.parse(userStr);
            return user.id; // For now using ID as a pseudo-token until full JWT is implemented in frontend context
        } catch {
            return null;
        }
    }

    // --- Student Methods ---
    async getStudents(): Promise<User[]> {
        // Example: Only admin should call this, or it gets the current student
        const response = await fetch(`${API_URL}/students`);
        if (!response.ok) return [];
        return response.json();
    }

    async getStudentById(id: string): Promise<User | undefined> {
        const response = await fetch(`${API_URL}/students/${id}`);
        if (!response.ok) return undefined;
        return response.json();
    }

    async updateStudent(updatedStudent: User): Promise<void> {
        await fetch(`${API_URL}/students/${updatedStudent.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStudent)
        });
    }

    // --- Task Methods ---
    async getTasks(studentId: string): Promise<StudentTask[]> {
        const response = await fetch(`${API_URL}/tasks?studentId=${studentId}`);
        if (!response.ok) return [];
        return response.json();
    }

    async addTask(studentId: string, text: string): Promise<void> {
        await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, text, done: false })
        });
    }

    async toggleTask(studentId: string, taskId: number): Promise<void> {
        await fetch(`${API_URL}/tasks/${taskId}/toggle`, { method: 'PUT' });
    }

    async deleteTask(studentId: string, taskId: number): Promise<void> {
        await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
    }

    // --- Document Methods ---
    async getDocuments(studentId: string): Promise<StudentDocument[]> {
        const response = await fetch(`${API_URL}/documents?studentId=${studentId}`);
        if (!response.ok) return [];
        return response.json();
    }

    async addDocument(studentId: string, name: string): Promise<void> {
        await fetch(`${API_URL}/documents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, name, status: 'Manquant' })
        });
    }

    async uploadDocument(studentId: string, docId: number, file: File): Promise<void> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('studentId', studentId);

        await fetch(`${API_URL}/documents/${docId}/upload`, {
            method: 'POST',
            body: formData // Content-Type is set automatically for FormData
        });
    }

    async updateDocumentStatus(studentId: string, docId: number, status: StudentDocument['status']): Promise<void> {
        await fetch(`${API_URL}/documents/${docId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
    }

    async deleteDocument(studentId: string, docId: number): Promise<void> {
        await fetch(`${API_URL}/documents/${docId}`, { method: 'DELETE' });
    }

    // --- Registration Methods ---
    async getRegistrations(studentId: string): Promise<Registration[]> {
        const response = await fetch(`${API_URL}/registrations?studentId=${studentId}`);
        if (!response.ok) return [];
        return response.json();
    }

    async addRegistration(studentId: string, schoolName: string, formation: string, status: Registration['status']): Promise<void> {
        await fetch(`${API_URL}/registrations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, schoolName, formation, status, date: new Date().toISOString() })
        });
    }

    async deleteRegistration(studentId: string, regId: number): Promise<void> {
        await fetch(`${API_URL}/registrations/${regId}`, { method: 'DELETE' });
    }
}

export const dataService = new DataService();
