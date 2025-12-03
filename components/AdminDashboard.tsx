
import React, { useState, useEffect } from 'react';
import { 
    Users, AlertTriangle, TrendingUp, Globe, Search, Filter, CheckCircle, Clock, XCircle, Mail, FileText, X, Check, Plus, Trash2, LogIn, CheckSquare, Upload, Shield, Download
} from 'lucide-react';
import { User, StudentTask, StudentDocument } from '../types';
import { dataService } from '../services/dataService';

interface AdminDashboardProps {
    onImpersonate?: (user: User) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onImpersonate }) => {
    const [students, setStudents] = useState<User[]>([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTarget, setFilterTarget] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Detail View State
    const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
    const [studentTasks, setStudentTasks] = useState<StudentTask[]>([]);
    const [studentDocs, setStudentDocs] = useState<StudentDocument[]>([]);
    
    // Form States
    const [newTaskText, setNewTaskText] = useState('');
    const [newDocName, setNewDocName] = useState('');

    // Load data
    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setStudents(dataService.getStudents().filter(u => u.role !== 'admin'));
    };

    useEffect(() => {
        if (selectedStudent) {
            setStudentTasks(dataService.getTasks(selectedStudent.id));
            setStudentDocs(dataService.getDocuments(selectedStudent.id));
        }
    }, [selectedStudent]);

    // Filter Logic
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || student.status === filterStatus;
        const matchesTarget = filterTarget === 'All' || 
                              (filterTarget === 'France' && student.target === 'France') ||
                              (filterTarget === 'Maroc' && student.target?.includes('Maroc'));
        return matchesSearch && matchesStatus && matchesTarget;
    });

    // --- ACTIONS ---

    // Tasks
    const handleAddTask = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (selectedStudent && newTaskText.trim()) {
            dataService.addTask(selectedStudent.id, newTaskText);
            setStudentTasks(dataService.getTasks(selectedStudent.id));
            setNewTaskText('');
        }
    };

    const handleToggleTask = (taskId: number) => {
        if (selectedStudent) {
            dataService.toggleTask(selectedStudent.id, taskId);
            setStudentTasks(dataService.getTasks(selectedStudent.id));
        }
    };

    const handleDeleteTask = (taskId: number) => {
        if (selectedStudent) {
            dataService.deleteTask(selectedStudent.id, taskId);
            setStudentTasks(dataService.getTasks(selectedStudent.id));
        }
    };

    // Documents
    const handleAddDocument = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (selectedStudent && newDocName.trim()) {
            dataService.addDocument(selectedStudent.id, newDocName);
            setStudentDocs(dataService.getDocuments(selectedStudent.id));
            setNewDocName('');
        }
    };

    const handleUpdateDocStatus = (docId: number, status: StudentDocument['status']) => {
        if (selectedStudent) {
            dataService.updateDocumentStatus(selectedStudent.id, docId, status);
            setStudentDocs(dataService.getDocuments(selectedStudent.id));
        }
    };

    const handleDeleteDocument = (docId: number) => {
        if (selectedStudent) {
            dataService.deleteDocument(selectedStudent.id, docId);
            setStudentDocs(dataService.getDocuments(selectedStudent.id));
        }
    };

    const handleDownloadDocument = (doc: StudentDocument) => {
        if (doc.url) {
            // If we have a URL (from recent upload), use it
            const link = document.createElement('a');
            link.href = doc.url;
            link.download = doc.fileName || `document_${doc.name}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Fallback for mock data or expired URLs: Generate a text file
            const element = document.createElement("a");
            const file = new Blob([`Contenu simulé du document: ${doc.name}\n\nÉtudiant: ${selectedStudent?.name}\nStatus: ${doc.status}`], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = `${doc.name.replace(/\s+/g, '_')}_${selectedStudent?.name.replace(/\s+/g, '_')}.txt`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };

    const handleSendMessage = () => {
        if(selectedStudent) {
            window.location.href = `mailto:${selectedStudent.email}?subject=Orieneduca - Mise à jour de votre dossier`;
        }
    };

    // Student Profile
    const handleUpdateProgress = (newProgress: number) => {
        if (selectedStudent) {
            const updated = { ...selectedStudent, progress: newProgress };
            dataService.updateStudent(updated);
            setSelectedStudent(updated);
            refreshData();
        }
    };

    const handleAddPoints = (points: number) => {
        if (selectedStudent) {
            const updated = { ...selectedStudent, points: selectedStudent.points + points };
            dataService.updateStudent(updated);
            setSelectedStudent(updated);
            refreshData();
        }
    };

    // Export CSV Function
    const handleExportCSV = () => {
        const headers = ['ID', 'Nom', 'Email', 'Téléphone', 'Filière', 'Ville', 'Plan', 'Cible', 'Progression (%)', 'Statut', 'Points XP', 'Niveau'];
        const rows = filteredStudents.map(s => [
            s.id,
            `"${s.name.replace(/"/g, '""')}"`,
            `"${s.email.replace(/"/g, '""')}"`,
            `"${(s.phone || '').replace(/"/g, '""')}"`,
            `"${(s.filiere || '').replace(/"/g, '""')}"`,
            `"${(s.city || '').replace(/"/g, '""')}"`,
            `"${(s.plan || 'Gratuit').replace(/"/g, '""')}"`,
            `"${(s.target || '').replace(/"/g, '""')}"`,
            s.progress || 0,
            s.status || 'On Track',
            s.points,
            s.level
        ].join(','));

        const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `etudiants_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const getStatusColor = (status: string | undefined) => {
        switch(status) {
            case 'On Track': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Late': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Blocked': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const totalStudents = students.length;
    const blockedStudents = students.filter(s => s.status === 'Blocked').length;
    const franceCandidates = students.filter(s => s.target === 'France').length;
    const premiumUsers = students.filter(s => s.plan === 'Plus' || s.plan === 'Premium').length;

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 animate-fade-in font-sans text-slate-600">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Portail Conseiller</h1>
                    <p className="text-slate-500 mt-1 flex items-center text-sm">
                        <Shield className="w-4 h-4 mr-1.5 text-primary-600" /> Espace de gestion et de suivi des dossiers étudiants
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button 
                        onClick={handleExportCSV}
                        className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 flex items-center transition-all shadow-sm"
                    >
                        <FileText className="w-4 h-4 mr-2" /> Exporter CSV
                    </button>
                    {selectedStudent ? (
                        <button 
                            onClick={handleSendMessage}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 flex items-center shadow-lg shadow-slate-900/20 transition-all"
                        >
                            <Mail className="w-4 h-4 mr-2" /> Message à {selectedStudent.name.split(' ')[0]}
                        </button>
                    ) : (
                        <button disabled className="bg-slate-300 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center cursor-not-allowed">
                            <Mail className="w-4 h-4 mr-2" /> Nouveau Message
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Étudiants', value: totalStudents, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Dossiers à Risque', value: blockedStudents, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
                    { label: 'Candidats France', value: franceCandidates, icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Membres Premium', value: premiumUsers, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className={`flex-1 transition-all duration-300 w-full ${selectedStudent ? 'lg:w-2/3' : ''}`}>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
                        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                            <h2 className="font-bold text-lg text-slate-900 flex items-center">
                                <Users className="w-5 h-5 mr-2 text-slate-400" /> Liste des Étudiants
                            </h2>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="relative flex-1 sm:flex-none sm:w-64">
                                    <input 
                                        type="text" 
                                        placeholder="Rechercher un étudiant..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full bg-white transition-all shadow-sm"
                                    />
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                </div>
                                <div className="relative">
                                    <select 
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="py-2.5 pl-4 pr-8 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium cursor-pointer shadow-sm appearance-none"
                                    >
                                        <option value="All">Tous status</option>
                                        <option value="On Track">On Track</option>
                                        <option value="Late">En Retard</option>
                                        <option value="Blocked">Bloqué</option>
                                    </select>
                                    <Filter className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-xs tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Étudiant</th>
                                        <th className="px-6 py-4">Objectif</th>
                                        <th className="px-6 py-4">Progression</th>
                                        <th className="px-6 py-4">Statut</th>
                                        <th className="px-6 py-4 text-right">Dernière activité</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredStudents.map(student => (
                                        <tr 
                                            key={student.id} 
                                            onClick={() => setSelectedStudent(student)}
                                            className={`cursor-pointer transition-all duration-200 ${selectedStudent?.id === student.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-4 border-2 border-white shadow-sm ${selectedStudent?.id === student.id ? 'bg-primary-200 text-primary-800' : 'bg-slate-200 text-slate-600'}`}>
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{student.name}</p>
                                                        <p className="text-xs text-slate-500">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {student.target === 'France' ? <Globe className="w-4 h-4 mr-2 text-indigo-500" /> : <div className="w-4 h-4 mr-2" />}
                                                    <span className="font-medium">{student.target || 'Non défini'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-full max-w-[100px] bg-slate-200 rounded-full h-1.5 mb-1">
                                                    <div className={`h-1.5 rounded-full ${student.progress && student.progress > 50 ? 'bg-green-500' : 'bg-orange-500'}`} style={{width: `${student.progress || 0}%`}}></div>
                                                </div>
                                                <span className="text-xs font-medium text-slate-500">{student.progress || 0}%</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(student.status)}`}>
                                                    {student.status === 'On Track' && <CheckCircle className="w-3 h-3 mr-1" />}
                                                    {student.status === 'Late' && <Clock className="w-3 h-3 mr-1" />}
                                                    {student.status === 'Blocked' && <XCircle className="w-3 h-3 mr-1" />}
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-slate-400 text-xs">
                                                {student.lastActive || 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredStudents.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                    <Search className="w-12 h-12 mb-4 opacity-20" />
                                    <p>Aucun étudiant trouvé pour ces critères.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {selectedStudent && (
                    <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col animate-slide-in-right overflow-hidden lg:h-[calc(100vh-3rem)] lg:sticky lg:top-6">
                        <div className="p-6 bg-slate-900 text-white relative overflow-hidden shrink-0">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="flex items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-bold text-2xl mr-4 border border-white/10 shadow-inner">
                                        {selectedStudent.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-xl leading-tight">{selectedStudent.name}</h2>
                                        <p className="text-xs text-slate-300 font-mono mt-1">{selectedStudent.email}</p>
                                        <div className="flex items-center mt-2 space-x-2">
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-accent-500 text-slate-900 rounded">{selectedStudent.plan}</span>
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-white/20 text-white rounded flex items-center">
                                                <TrendingUp className="w-3 h-3 mr-1" /> Niv {selectedStudent.level}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedStudent(null)} className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <p className="text-slate-400 font-bold uppercase mb-1">Téléphone</p>
                                    <p className="font-medium text-slate-700">{selectedStudent.phone || 'Non renseigné'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-bold uppercase mb-1">Filière</p>
                                    <p className="font-medium text-slate-700">{selectedStudent.filiere || 'Non renseignée'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-bold uppercase mb-1">Ville</p>
                                    <p className="font-medium text-slate-700">{selectedStudent.city || 'Non renseignée'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-bold uppercase mb-1">Lycée</p>
                                    <p className="font-medium text-slate-700">{selectedStudent.schoolType || 'Non renseigné'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => onImpersonate && onImpersonate(selectedStudent)}
                                    className="col-span-2 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:border-primary-300 hover:text-primary-600 transition-all flex items-center justify-center shadow-sm group"
                                >
                                    <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Se connecter en tant que
                                </button>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between mb-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Progression Globale</label>
                                    <span className="text-sm font-bold text-primary-600">{selectedStudent.progress || 0}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" max="100" 
                                    value={selectedStudent.progress || 0}
                                    onChange={(e) => handleUpdateProgress(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600 hover:accent-primary-700"
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between uppercase tracking-wide">
                                    <span className="flex items-center"><CheckSquare className="w-4 h-4 mr-2 text-slate-400" /> Tâches</span>
                                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">{studentTasks.length}</span>
                                </h3>
                                <div className="space-y-2 mb-3">
                                    {studentTasks.map(task => (
                                        <div key={task.id} className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl hover:border-primary-200 transition-colors group shadow-sm">
                                            <div 
                                                className="flex items-center cursor-pointer min-w-0" 
                                                onClick={() => handleToggleTask(task.id)}
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors shrink-0 ${task.done ? 'bg-green-500 border-green-500' : 'border-slate-300 group-hover:border-primary-400'}`}>
                                                    {task.done && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <span className={`text-sm truncate font-medium ${task.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
                                            </div>
                                            <button onClick={() => handleDeleteTask(task.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                    {studentTasks.length === 0 && <p className="text-xs text-slate-400 italic text-center py-2">Aucune tâche assignée.</p>}
                                </div>
                                <form onSubmit={handleAddTask} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={newTaskText}
                                        onChange={(e) => setNewTaskText(e.target.value)}
                                        placeholder="Nouvelle tâche..."
                                        className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-white shadow-sm"
                                    />
                                    <button type="submit" className="bg-primary-600 text-white p-2.5 rounded-xl hover:bg-primary-700 shadow-md shadow-primary-600/20"><Plus className="w-5 h-5" /></button>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between uppercase tracking-wide">
                                    <span className="flex items-center"><FileText className="w-4 h-4 mr-2 text-slate-400" /> Documents</span>
                                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">{studentDocs.length}</span>
                                </h3>
                                <div className="space-y-3 mb-4">
                                    {studentDocs.map(doc => (
                                        <div key={doc.id} className="p-3 bg-white border border-slate-200 rounded-xl group relative shadow-sm hover:shadow-md transition-all">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-slate-700 truncate" title={doc.name}>
                                                        {doc.name}
                                                    </span>
                                                    {doc.fileName && (
                                                        <span className="text-[10px] text-slate-400 flex items-center truncate">
                                                            <FileText className="w-3 h-3 mr-1" /> {doc.fileName}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                                        doc.status === 'Validé' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                        doc.status === 'Rejeté' ? 'bg-red-50 text-red-700 border-red-200' : 
                                                        doc.status === 'En cours' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                        'bg-orange-50 text-orange-700 border-orange-200'
                                                    }`}>{doc.status}</span>
                                                    
                                                    {/* Download Button - only if file present or just placeholder */}
                                                    <button 
                                                        onClick={() => handleDownloadDocument(doc)}
                                                        className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                                                        title="Télécharger le document"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>

                                                    <button onClick={() => handleDeleteDocument(doc.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleUpdateDocStatus(doc.id, 'Validé')} className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors flex items-center justify-center">
                                                    <CheckCircle className="w-3 h-3 mr-1" /> Valider
                                                </button>
                                                <button onClick={() => handleUpdateDocStatus(doc.id, 'Rejeté')} className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors flex items-center justify-center">
                                                    <XCircle className="w-3 h-3 mr-1" /> Rejeter
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {studentDocs.length === 0 && <p className="text-xs text-slate-400 italic text-center py-2">Aucun document requis.</p>}
                                </div>
                                
                                <form onSubmit={handleAddDocument} className="flex gap-2 pt-2 border-t border-slate-200">
                                    <input 
                                        type="text" 
                                        value={newDocName}
                                        onChange={(e) => setNewDocName(e.target.value)}
                                        placeholder="Demander un document..."
                                        className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-white shadow-sm"
                                    />
                                    <button type="submit" className="bg-slate-800 text-white p-2.5 rounded-xl hover:bg-slate-700 shadow-md"><Upload className="w-5 h-5" /></button>
                                </form>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                                <h3 className="text-xs font-bold text-blue-800 mb-3 uppercase tracking-wide">Gamification</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-blue-900">{selectedStudent.points} XP</span>
                                    <button 
                                        onClick={() => handleAddPoints(50)} 
                                        className="text-xs bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all font-bold shadow-sm"
                                    >
                                        + 50 XP
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
