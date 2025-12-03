
import React, { useState, useRef, useEffect } from 'react';
import { User, NavPage, StudentTask, StudentDocument } from '../types';
import { 
  Calendar, Globe, FileText, CheckSquare, Clock, Plus, Trash2, Calculator, Trophy, Target, Sparkles, Flame, FolderOpen, Upload, Award, CheckCircle, BookOpen, Layout, Zap, X, User as UserIcon, Mail, Phone, MapPin, Building, GraduationCap, Download
} from 'lucide-react';
import { GamificationHub } from './GamificationHub';
import { MOCK_SCHOOLS, MOCK_BLOG_POSTS, MOCK_CONCOURS } from '../constants';
import { dataService } from '../services/dataService';

interface StudentDashboardProps {
  user: User;
  onNavigate: (page: NavPage) => void;
}

const RECOMMENDED_SCHOOLS = MOCK_SCHOOLS.slice(0, 2);
const RECOMMENDED_ARTICLES = MOCK_BLOG_POSTS.slice(0, 2);

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user: initialUser, onNavigate }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [tasks, setTasks] = useState<StudentTask[]>([]);
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'PROFILE'>('DASHBOARD');
  
  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadDocId, setCurrentUploadDocId] = useState<number | null>(null);

  useEffect(() => {
      const freshUser = dataService.getStudentById(initialUser.id);
      if (freshUser) setUser(freshUser);

      setTasks(dataService.getTasks(initialUser.id));
      setDocuments(dataService.getDocuments(initialUser.id));
  }, [initialUser.id]);

  const gamificationRef = useRef<HTMLDivElement>(null);

  const handleAddPoints = (points: number) => {
      const updatedUser = { ...user, points: user.points + points };
      setUser(updatedUser);
      dataService.updateStudent(updatedUser);
  };

  // Tasks
  const toggleTask = (id: number) => {
    dataService.toggleTask(user.id, id);
    setTasks(dataService.getTasks(user.id));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    dataService.addTask(user.id, newTask);
    setTasks(dataService.getTasks(user.id));
    setNewTask('');
  };

  const deleteTask = (id: number) => {
    dataService.deleteTask(user.id, id);
    setTasks(dataService.getTasks(user.id));
  };

  // Documents
  const DOC_SUGGESTIONS = ["Lettre de Motivation", "CV", "Relevé de Notes", "Attestation Réussite", "Photo d'identité"];

  const handleAddDocumentRequest = (e: React.FormEvent) => {
      e?.preventDefault();
      if (!newDocName.trim()) return;
      dataService.addDocument(user.id, newDocName);
      setDocuments(dataService.getDocuments(user.id));
      setNewDocName('');
      setIsAddingDoc(false);
  };

  const handleDeleteDocument = (id: number) => {
      dataService.deleteDocument(user.id, id);
      setDocuments(dataService.getDocuments(user.id));
  };

  // Handle File Upload Trigger
  const triggerFileUpload = (docId: number) => {
      setCurrentUploadDocId(docId);
      if (fileInputRef.current) {
          fileInputRef.current.click();
      }
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0] && currentUploadDocId !== null) {
          const file = e.target.files[0];
          // Validate file size/type if needed
          if (file.size > 5 * 1024 * 1024) {
              alert("Le fichier est trop volumineux (max 5Mo)");
              return;
          }
          
          dataService.uploadDocument(user.id, currentUploadDocId, file);
          setDocuments(dataService.getDocuments(user.id));
          
          // Reset
          if (fileInputRef.current) fileInputRef.current.value = '';
          setCurrentUploadDocId(null);
      }
  };

  const handleDownloadDoc = (doc: StudentDocument) => {
      if (doc.url) {
          const link = document.createElement('a');
          link.href = doc.url;
          link.download = doc.fileName || doc.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } else {
          // Fallback
          alert("Document non disponible pour le téléchargement.");
      }
  };

  const aiSuggestion = {
      title: "Objectif Ingénieur",
      text: `D'après ton profil ${user.target || 'Étudiant'}, il est temps d'avancer. Tu as ${tasks.filter(t => !t.done).length} tâches en attente.`,
      action: "Voir mes tâches"
  };

  const ProfileView = () => (
      <div className="animate-fade-in space-y-8">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-900 to-indigo-900 h-32 relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              </div>
              <div className="px-8 pb-8 relative">
                  <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-6">
                      <div className="w-24 h-24 bg-white p-1 rounded-2xl shadow-xl mr-6 relative">
                          <div className="w-full h-full bg-primary-100 rounded-xl flex items-center justify-center text-primary-700 font-bold text-3xl">
                              {user.name.charAt(0)}
                          </div>
                          {user.isPremium && (
                              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-sm border-2 border-white">
                                  <Sparkles className="w-4 h-4 fill-current" />
                              </div>
                          )}
                      </div>
                      <div className="flex-1 mt-4 md:mt-0">
                          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                          <p className="text-gray-500 font-medium">{user.plan || 'Membre Gratuit'} • {user.email}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex gap-3">
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm">
                              Modifier
                          </button>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Coordonnées */}
                      <div className="space-y-6">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center border-b border-gray-100 pb-2">
                              <UserIcon className="w-5 h-5 mr-2 text-primary-600" /> Coordonnées
                          </h3>
                          <div className="space-y-4">
                              <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-4 text-primary-600">
                                      <Phone className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-gray-400 font-bold uppercase">Téléphone</p>
                                      <p className="text-gray-900 font-medium">{user.phone || 'Non renseigné'}</p>
                                  </div>
                              </div>
                              <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-4 text-primary-600">
                                      <MapPin className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-gray-400 font-bold uppercase">Ville</p>
                                      <p className="text-gray-900 font-medium">{user.city || 'Non renseignée'}</p>
                                  </div>
                              </div>
                              <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-4 text-primary-600">
                                      <Mail className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                                      <p className="text-gray-900 font-medium">{user.email}</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Scolarité */}
                      <div className="space-y-6">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center border-b border-gray-100 pb-2">
                              <GraduationCap className="w-5 h-5 mr-2 text-accent-600" /> Scolarité & Objectifs
                          </h3>
                          <div className="space-y-4">
                              <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center mr-4 text-accent-600">
                                      <BookOpen className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-gray-400 font-bold uppercase">Filière Actuelle</p>
                                      <p className="text-gray-900 font-medium">{user.filiere || 'Non renseignée'}</p>
                                  </div>
                              </div>
                              <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center mr-4 text-accent-600">
                                      <Building className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-gray-400 font-bold uppercase">Type d'établissement</p>
                                      <p className="text-gray-900 font-medium">{user.schoolType || 'Non renseigné'}</p>
                                  </div>
                              </div>
                              <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center mr-4 text-accent-600">
                                      <Target className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-gray-400 font-bold uppercase">Objectif Post-Bac</p>
                                      <p className="text-gray-900 font-medium">{user.target || 'Non défini'}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-6 h-6" />
                  </div>
                  <p className="text-gray-500 text-sm mb-1">Total Points XP</p>
                  <p className="text-3xl font-extrabold text-gray-900">{user.points}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6" />
                  </div>
                  <p className="text-gray-500 text-sm mb-1">Niveau Actuel</p>
                  <p className="text-3xl font-extrabold text-gray-900">{user.level}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6" />
                  </div>
                  <p className="text-gray-500 text-sm mb-1">Membre depuis</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{user.subscriptionDate || '2024'}</p>
              </div>
          </div>
      </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Hidden File Input */}
      <input 
          type="file" 
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
      />

      <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl mb-8 w-fit">
          <button 
            onClick={() => setActiveTab('DASHBOARD')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'DASHBOARD' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
              Tableau de bord
          </button>
          <button 
            onClick={() => setActiveTab('PROFILE')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'PROFILE' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
              Mon Profil
          </button>
      </div>

      {activeTab === 'PROFILE' ? (
          <ProfileView />
      ) : (
        <>
            {/* AI Coach Hero Section */}
            <div className="bg-gradient-to-r from-primary-900 to-indigo-900 rounded-3xl p-6 md:p-8 shadow-xl mb-8 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shrink-0 shadow-inner">
                            <Sparkles className="w-7 h-7 text-yellow-300" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 flex items-center">
                                Coach Intelligent <span className="ml-3 text-xs bg-accent-500 text-gray-900 px-2 py-0.5 rounded font-bold uppercase">IA Beta</span>
                            </h2>
                            <p className="text-indigo-100 max-w-2xl leading-relaxed text-sm md:text-base">
                                "Bonjour {user.name}, {aiSuggestion.text}"
                            </p>
                        </div>
                    </div>
                    <button className="bg-white text-primary-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg flex items-center shrink-0">
                        <Zap className="w-4 h-4 mr-2 text-accent-600" />
                        {aiSuggestion.action}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Progression Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: 'Global', percent: user.progress || 0, color: 'bg-green-500', icon: <Target className="w-5 h-5 text-green-600" /> },
                            { label: 'Dossier', percent: documents.filter(d => d.status === 'Validé').length / (documents.length || 1) * 100, color: 'bg-blue-500', icon: <Globe className="w-5 h-5 text-blue-600" /> },
                            { label: 'Tâches', percent: tasks.filter(t => t.done).length / (tasks.length || 1) * 100, color: 'bg-orange-500', icon: <Trophy className="w-5 h-5 text-orange-600" /> },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`p-2 rounded-xl ${item.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-bold text-gray-900">{Math.round(item.percent)}%</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">{item.label}</h3>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className={`h-2 rounded-full ${item.color}`} style={{width: `${item.percent}%`}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* To-Do List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900 flex items-center text-sm">
                                <CheckSquare className="w-4 h-4 mr-2 text-primary-600" /> Plan d'Action
                            </h3>
                            <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
                                {tasks.filter(t => t.done).length}/{tasks.length}
                            </span>
                        </div>
                        <div className="p-5">
                            <form onSubmit={addTask} className="mb-4 flex gap-2">
                                <input 
                                    type="text" 
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Ajouter une tâche personnelle..." 
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                                <button type="submit" className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </form>
                            <div className="space-y-2">
                                {tasks.map(task => (
                                    <div key={task.id} className="flex items-center group">
                                        <button 
                                            onClick={() => toggleTask(task.id)}
                                            className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-primary-500'}`}
                                        >
                                            {task.done && <CheckSquare className="w-3 h-3 text-white" />}
                                        </button>
                                        <span className={`flex-1 text-xs font-medium ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                            {task.text}
                                        </span>
                                        <button onClick={() => deleteTask(task.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Concours & Recommendations omitted for brevity, keeping same layout structure */}
                    
                    <div ref={gamificationRef}>
                        <GamificationHub 
                            userPoints={user.points} 
                            userBadges={user.badges} 
                            onAddPoints={handleAddPoints}
                            onUnlockBadge={(id) => console.log("Unlock", id)}
                        />
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* User Stats Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all" onClick={() => setActiveTab('PROFILE')}>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg mr-3">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{user.name}</h3>
                                    <p className="text-xs text-gray-500">{user.plan || 'Gratuit'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-primary-600 flex items-center justify-end">
                                    <Flame className="w-4 h-4 mr-1 text-orange-500 fill-orange-500" /> 12
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Jours consécutifs</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                                    <span>Niveau {user.level}</span>
                                    <span>{user.points} XP</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-primary-500 to-indigo-500 h-2 rounded-full" style={{width: `${(user.points % 1000) / 10}%`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mes Documents */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                            <span className="flex items-center"><FolderOpen className="w-5 h-5 mr-2 text-primary-600" /> Mes Documents</span>
                        </h3>
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group relative">
                                    <div className="flex items-center min-w-0">
                                        <FileText className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-700 truncate">{doc.name}</span>
                                            {doc.fileName && <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{doc.fileName}</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center ml-2 shrink-0 gap-1">
                                        <span 
                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full mr-1 ${
                                            doc.status === 'Validé' 
                                            ? 'text-green-600 bg-green-100' 
                                            : doc.status === 'Rejeté' 
                                            ? 'text-red-600 bg-red-100'
                                            : doc.status === 'En cours'
                                            ? 'text-blue-600 bg-blue-100'
                                            : 'text-orange-600 bg-orange-100'
                                        }`}>
                                            {doc.status}
                                        </span>
                                        
                                        {/* Actions based on status */}
                                        {(doc.status === 'Manquant' || doc.status === 'Rejeté') && (
                                            <button 
                                                onClick={() => triggerFileUpload(doc.id)}
                                                className="text-primary-600 bg-primary-50 hover:bg-primary-100 p-1.5 rounded-lg transition-colors"
                                                title="Importer"
                                            >
                                                <Upload className="w-3.5 h-3.5" />
                                            </button>
                                        )}

                                        {doc.status === 'Validé' && (
                                            <button 
                                                onClick={() => handleDownloadDoc(doc)}
                                                className="text-green-600 bg-green-50 hover:bg-green-100 p-1.5 rounded-lg transition-colors"
                                                title="Télécharger"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                            </button>
                                        )}

                                        <button 
                                            onClick={() => handleDeleteDocument(doc.id)}
                                            className="text-gray-300 hover:text-red-500 p-1 transition-opacity"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {isAddingDoc ? (
                                <form onSubmit={handleAddDocumentRequest} className="mt-2 animate-fade-in">
                                    <div className="flex gap-2 mb-2">
                                        <input 
                                            type="text" 
                                            value={newDocName}
                                            onChange={(e) => setNewDocName(e.target.value)}
                                            placeholder="Nom du document..." 
                                            className="flex-1 bg-white border border-primary-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                                            autoFocus
                                        />
                                        <button type="submit" className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 shadow-sm">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setIsAddingDoc(false)}
                                            className="bg-gray-100 text-gray-500 p-2 rounded-lg hover:bg-gray-200"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {DOC_SUGGESTIONS.map(s => (
                                            <button 
                                                key={s}
                                                type="button"
                                                onClick={() => setNewDocName(s)}
                                                className="text-[10px] px-2 py-1 bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600 rounded-md transition-colors border border-gray-200 hover:border-primary-200"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </form>
                            ) : (
                                <button 
                                    onClick={() => setIsAddingDoc(true)}
                                    className="w-full py-2 border border-dashed border-gray-300 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-primary-600 hover:border-primary-300 transition-all flex items-center justify-center mt-2"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Demander un ajout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
      )}
    </div>
  );
};
