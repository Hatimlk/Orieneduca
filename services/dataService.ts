
import { User, StudentTask, StudentDocument } from '../types';

// Initial Mock Data
const INITIAL_STUDENTS: User[] = [
    { 
        id: '1', name: 'Amine El Fassi', email: 'amine.elf@gmail.com', role: 'student', isPremium: true, points: 850, level: 3, badges: ['b1'], 
        plan: 'Plus', target: 'France', progress: 85, status: 'On Track', lastActive: '2h',
        phone: '06 12 34 56 78', filiere: 'Sc. Math B', city: 'Casablanca', schoolType: 'Privé', subscriptionDate: '10/09/2023'
    },
    { 
        id: '2', name: 'Sarah Benali', email: 's.benali@hotmail.com', role: 'student', isPremium: true, points: 450, level: 2, badges: [], 
        plan: 'Premium', target: 'Maroc - Médecine', progress: 45, status: 'Late', lastActive: '1j', alertMessage: 'Dossier FMP incomplet',
        phone: '06 98 76 54 32', filiere: 'Sc. Physique', city: 'Rabat', schoolType: 'Public', subscriptionDate: '15/01/2024'
    },
    { 
        id: '3', name: 'Karim Tazi', email: 'k.tazi@gmail.com', role: 'student', isPremium: false, points: 100, level: 1, badges: [], 
        plan: 'Gratuit', target: 'Indécis', progress: 10, status: 'Blocked', lastActive: '5j', alertMessage: 'Aucune activité récente',
        phone: '07 00 11 22 33', filiere: 'SVT', city: 'Marrakech', schoolType: 'Public', subscriptionDate: '01/03/2024'
    },
    { 
        id: 'user_premium', name: 'Étudiant Premium', email: 'premium@orieneduca.ma', role: 'student', isPremium: true, points: 1200, level: 4, badges: ['b1', 'b2'], 
        plan: 'Premium', target: 'France', progress: 60, status: 'On Track', lastActive: 'Now',
        phone: '06 61 00 00 00', filiere: 'Sc. Math A', city: 'Tanger', schoolType: 'Mission', subscriptionDate: '01/09/2023'
    },
];

const INITIAL_TASKS: Record<string, StudentTask[]> = {
    '1': [{ id: 1, text: "Valider choix Campus France", done: true }, { id: 2, text: "Payer frais dossier", done: false }],
    '2': [{ id: 1, text: "Uploader Relevé Bac", done: false }],
    'user_premium': [{ id: 1, text: "Préparer les relevés de notes", done: true }, { id: 2, text: "S'inscrire au concours ENSA", done: false }]
};

const INITIAL_DOCS: Record<string, StudentDocument[]> = {
    '1': [{ id: 1, name: 'Passeport', status: 'Validé', fileName: 'pass_amine.pdf', uploadDate: '12/05/2024' }],
    '2': [{ id: 1, name: 'CIN', status: 'Rejeté', fileName: 'cin_scan.jpg', uploadDate: '10/05/2024' }],
    'user_premium': [{ id: 1, name: 'Relevé de notes', status: 'Validé', fileName: 'notes_bac.pdf', uploadDate: '01/05/2024' }, { id: 2, name: 'CIN / Passeport', status: 'Manquant' }]
};

class DataService {
    private students: User[] = [];
    private tasks: Record<string, StudentTask[]> = {};
    private documents: Record<string, StudentDocument[]> = {};

    constructor() {
        this.loadData();
    }

    private loadData() {
        const savedStudents = localStorage.getItem('oe_students');
        const savedTasks = localStorage.getItem('oe_tasks');
        const savedDocs = localStorage.getItem('oe_docs');

        this.students = savedStudents ? JSON.parse(savedStudents) : INITIAL_STUDENTS;
        this.tasks = savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
        this.documents = savedDocs ? JSON.parse(savedDocs) : INITIAL_DOCS;
    }

    private saveData() {
        localStorage.setItem('oe_students', JSON.stringify(this.students));
        localStorage.setItem('oe_tasks', JSON.stringify(this.tasks));
        localStorage.setItem('oe_docs', JSON.stringify(this.documents));
    }

    // --- Student Methods ---
    getStudents(): User[] {
        return this.students;
    }

    getStudentById(id: string): User | undefined {
        return this.students.find(s => s.id === id);
    }

    updateStudent(updatedStudent: User) {
        this.students = this.students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
        this.saveData();
    }

    // --- Task Methods ---
    getTasks(studentId: string): StudentTask[] {
        return this.tasks[studentId] || [];
    }

    addTask(studentId: string, text: string) {
        if (!this.tasks[studentId]) this.tasks[studentId] = [];
        this.tasks[studentId].push({ id: Date.now(), text, done: false });
        this.saveData();
    }

    toggleTask(studentId: string, taskId: number) {
        if (!this.tasks[studentId]) return;
        this.tasks[studentId] = this.tasks[studentId].map(t => t.id === taskId ? { ...t, done: !t.done } : t);
        this.saveData();
    }

    deleteTask(studentId: string, taskId: number) {
        if (!this.tasks[studentId]) return;
        this.tasks[studentId] = this.tasks[studentId].filter(t => t.id !== taskId);
        this.saveData();
    }

    // --- Document Methods ---
    getDocuments(studentId: string): StudentDocument[] {
        return this.documents[studentId] || [];
    }

    addDocument(studentId: string, name: string) {
        if (!this.documents[studentId]) this.documents[studentId] = [];
        this.documents[studentId].push({ id: Date.now(), name, status: 'Manquant' });
        this.saveData();
    }

    // Simulates uploading a file
    uploadDocument(studentId: string, docId: number, file: File) {
        if (!this.documents[studentId]) return;
        // In a real app, we would upload to server here.
        // For demo, we create a local object URL (lasts until refresh)
        const fakeUrl = URL.createObjectURL(file);
        
        this.documents[studentId] = this.documents[studentId].map(d => 
            d.id === docId 
            ? { 
                ...d, 
                status: 'En cours', 
                url: fakeUrl, 
                fileName: file.name,
                uploadDate: new Date().toLocaleDateString()
              } 
            : d
        );
        this.saveData();
    }

    updateDocumentStatus(studentId: string, docId: number, status: StudentDocument['status']) {
        if (!this.documents[studentId]) return;
        this.documents[studentId] = this.documents[studentId].map(d => d.id === docId ? { ...d, status } : d);
        this.saveData();
    }
    
    deleteDocument(studentId: string, docId: number) {
        if (!this.documents[studentId]) return;
        this.documents[studentId] = this.documents[studentId].filter(d => d.id !== docId);
        this.saveData();
    }
}

export const dataService = new DataService();
