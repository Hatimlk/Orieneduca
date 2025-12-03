
export enum SchoolCategory {
  ENGINEERING = 'Ingénierie',
  BUSINESS = 'Commerce & Gestion',
  MEDICINE = 'Médecine & Pharmacie',
  TECHNOLOGY = 'Technologie (EST/BTS)',
  UNIVERSITY = 'Université',
  OTHER = 'Autre'
}

export interface AdmissionCriteria {
  bacTypes: string[];
  averageGradeRequired: string;
  keySubjects: string[];
}

export interface School {
  id: string;
  name: string;
  category: SchoolCategory;
  city: string;
  description: string;
  shortDefinition?: string;
  duration?: string;
  formations?: string[];
  opportunities?: string[];
  logoUrl: string;
  website: string;
  isPublic: boolean;
  admissionCriteria?: AdmissionCriteria;
  coordinates: {
    lat: number;
    lng: number;
  };
  network?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  tag: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

export interface Concours {
  id: string;
  schoolName: string;
  title: string;
  deadline: string;
  examDate: string;
  imageUrl: string;
  accessLevel: 'Post-Bac' | 'Bac+2' | 'Bac+3' | 'Master';
  status: 'Open' | 'Closed' | 'Coming Soon';
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  location: 'Maroc' | 'Étranger';
  country: string;
  type: 'Excellence' | 'Sociale' | 'Recherche' | 'Coopération';
  deadline: string;
  value: string;
  description: string;
  eligibility: string[];
  targetLevels: string[];
  imageUrl: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isError?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  requiredPoints: number;
  unlocked: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  questions: QuizQuestion[];
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  points: number;
  level: number;
  badges: string[]; // IDs of unlocked badges
  role?: 'student' | 'admin';
  // Admin tracking fields
  plan?: 'Premium' | 'Gratuit' | 'Plus';
  target?: string;
  progress?: number;
  status?: 'On Track' | 'Late' | 'Blocked';
  lastActive?: string;
  alertMessage?: string;
  // Profile fields
  phone?: string;
  filiere?: string;
  city?: string;
  schoolType?: string;
  subscriptionDate?: string;
}

export interface StudentTask {
  id: number;
  text: string;
  done: boolean;
}

export interface StudentDocument {
  id: number;
  name: string; // The required document name (e.g. "CIN")
  status: 'Manquant' | 'En cours' | 'Validé' | 'Rejeté';
  url?: string; // The URL of the uploaded file
  fileName?: string; // The original filename uploaded by student
  uploadDate?: string;
}

export enum NavPage {
  HOME = 'home',
  SCHOOLS = 'schools',
  CONCOURS = 'concours',
  SCHOLARSHIPS = 'scholarships',
  SIMULATOR = 'simulator',
  DASHBOARD = 'dashboard',
  ADMIN_DASHBOARD = 'admin_dashboard',
  STUDY_ABROAD = 'study_abroad',
  ORIENEDUCA_PLUS = 'orieneduca_plus',
  BLOG = 'blog',
  ORIENTATION_TESTS = 'orientation_tests',
  CONSULTATION = 'consultation',
  PRIVACY = 'privacy',
  LEGAL = 'legal'
}
