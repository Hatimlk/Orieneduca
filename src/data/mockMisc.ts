import { Badge, Quiz, Registration } from '../types';
export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'Explorateur', description: 'A complété le test d\'orientation RIASEC', iconName: 'Compass', requiredPoints: 0, unlocked: true },
  { id: 'b2', name: 'Stratège', description: 'A créé une Todolist de candidatures', iconName: 'Target', requiredPoints: 50, unlocked: true },
  { id: 'b3', name: 'Assidu', description: 'A visité l\'espace Dashboard 3 jours de suite', iconName: 'CalendarCheck', requiredPoints: 100, unlocked: false },
  { id: 'b4', name: 'Expert France', description: 'Score parfait au quiz "Procédures France"', iconName: 'Plane', requiredPoints: 200, unlocked: false },
  { id: 'b5', name: 'Futur Ingénieur', description: 'A consulté 10 fiches d\'écoles d\'ingénieurs', iconName: 'Cpu', requiredPoints: 150, unlocked: false },
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'quiz-metiers',
    title: 'Les métiers de demain au Maroc',
    description: 'Testez vos connaissances sur le marché du travail marocain en 2025.',
    xpReward: 100,
    completed: false,
    questions: [
      { id: 1, question: "Quel secteur recrute le plus d'ingénieurs en 2025 au Maroc ?", options: ["Automobile & Aéronautique", "Textile", "Agriculture"], correctAnswer: 0, explanation: "L'industrie automobile et aéronautique est en plein boom avec les zones franches de Tanger et Kénitra." },
      { id: 2, question: "Qu'est-ce qu'un Data Scientist ?", options: ["Un expert en biologie", "Un expert en analyse de données", "Un médecin"], correctAnswer: 1, explanation: "Le Data Scientist analyse des données massives (Big Data) pour aider les entreprises à décider." },
      { id: 3, question: "Quelle compétence est devenue indispensable ?", options: ["Savoir taper vite", "Les Soft Skills (Communication)", "Connaître le latin"], correctAnswer: 1, explanation: "Les compétences comportementales (Soft Skills) sont aussi importantes que les diplômes." }
    ]
  },
  {
    id: 'quiz-campus',
    title: 'Procédures Campus France',
    description: 'Maîtrisez-vous les étapes pour étudier en France ?',
    xpReward: 150,
    completed: false,
    questions: [
      { id: 1, question: "Quelle est la plateforme officielle pour postuler ?", options: ["Parcoursup", "Études en France", "France Visa"], correctAnswer: 1, explanation: "Pour les étudiants hors-UE, la procédure passe obligatoirement par 'Études en France'." },
      { id: 2, question: "Quel test de langue est généralement requis ?", options: ["TOEFL", "TCF ou DELF", "Aucun"], correctAnswer: 1, explanation: "Le TCF (Test de Connaissance du Français) ou le DELF B2 est exigé par la majorité des universités." },
      { id: 3, question: "Combien de vœux maximum peut-on faire en L1 ?", options: ["3 vœux", "7 vœux", "Illimité"], correctAnswer: 0, explanation: "Pour une demande d'admission préalable (DAP) en Licence 1, c'est limité à 3 vœux (DAP Blanche)." }
    ]
  },
  {
    id: 'quiz-logique',
    title: 'Logique & Raisonnement (ENSA)',
    description: 'Entraînez-vous pour le concours avec des suites logiques.',
    xpReward: 200,
    completed: false,
    questions: [
      { id: 1, question: "Quel nombre complète la suite : 2, 4, 8, 16, ... ?", options: ["20", "24", "32"], correctAnswer: 2, explanation: "On multiplie par 2 à chaque étape." },
      { id: 2, question: "A est le père de B. B est la sœur de C. Qui est A pour C ?", options: ["Le frère", "Le père", "L'oncle"], correctAnswer: 1, explanation: "A est le père de B, et B et C sont frères/sœurs, donc A est le père de C." },
      { id: 3, question: "Si LUNDI = 5, MARDI = 5, MERCREDI = 8, JEUDI = ?", options: ["5", "4", "6"], correctAnswer: 0, explanation: "Le nombre correspond au nombre de lettres du mot. JEUDI a 5 lettres." }
    ]
  },
];

export const MOCK_REGISTRATIONS: Registration[] = [
  {
    id: 2,
    schoolName: 'FMP Casablanca',
    formation: 'Médecine Générale',
    date: '10/06/2024',
    status: 'Admissible',
    notes: 'Convoqué au concours le 25/07'
  }
];

export const HISTORICAL_SEUILS = [
  // --- ENSA (National Average Trends) ---
  { school: 'ENSA', city: 'National', branch: 'SM', years: { 2020: 12.50, 2021: 12.00, 2022: 12.00, 2023: 12.50, 2024: 12.75 } },
  { school: 'ENSA', city: 'National', branch: 'PC', years: { 2020: 15.40, 2021: 14.50, 2022: 14.00, 2023: 14.50, 2024: 15.20 } },
  { school: 'ENSA', city: 'National', branch: 'SVT', years: { 2020: 16.50, 2021: 15.50, 2022: 15.00, 2023: 15.50, 2024: 16.00 } },

  // --- ENSAM (Meknès & Casa averaged for simplicity, can be split) ---
  { school: 'ENSAM', city: 'National', branch: 'SM', years: { 2020: 13.50, 2021: 12.50, 2022: 12.25, 2023: 12.75, 2024: 13.00 } },
  { school: 'ENSAM', city: 'National', branch: 'PC', years: { 2020: 16.50, 2021: 15.80, 2022: 15.50, 2023: 16.00, 2024: 16.17 } },
  { school: 'ENSAM', city: 'National', branch: 'SVT', years: { 2020: 17.50, 2021: 16.50, 2022: 16.00, 2023: 16.50, 2024: 17.00 } },

  // --- ENCG (TAFEM is a concours, but pre-selection exists) ---
  { school: 'ENCG', city: 'National', branch: 'Eco', years: { 2020: 12.00, 2021: 12.00, 2022: 12.00, 2023: 12.00, 2024: 12.00 } }, // Fixed threshold usually
  { school: 'ENCG', city: 'National', branch: 'SM', years: { 2020: 12.50, 2021: 12.50, 2022: 12.00, 2023: 12.00, 2024: 12.50 } },
  { school: 'ENCG', city: 'National', branch: 'PC', years: { 2020: 14.50, 2021: 14.00, 2022: 13.50, 2023: 14.00, 2024: 14.00 } },

  // --- Médecine (FMP/FMD) ---
  { school: 'Médecine', city: 'National', branch: 'All', years: { 2020: 12.00, 2021: 12.00, 2022: 12.00, 2023: 12.00, 2024: 13.00 } }, // recent change to 13.00 for some

  // --- ISCAE (Elite) ---
  { school: 'ISCAE', city: 'Casablanca', branch: 'Eco', years: { 2020: 18.50, 2021: 18.00, 2022: 17.80, 2023: 17.50, 2024: 17.97 } },
  { school: 'ISCAE', city: 'Casablanca', branch: 'SM', years: { 2020: 18.00, 2021: 17.50, 2022: 17.42, 2023: 17.80, 2024: 18.10 } },
  { school: 'ISCAE', city: 'Casablanca', branch: 'PC', years: { 2020: 18.90, 2021: 18.50, 2022: 18.20, 2023: 18.50, 2024: 18.82 } },

  // --- ENA (Architecture) ---
  { school: 'ENA', city: 'National', branch: 'All', years: { 2020: 14.00, 2021: 13.50, 2022: 13.00, 2023: 13.00, 2024: 13.00 } }
];

export const MOCK_UNIVERSITIES = [
  { id: 1, name: "Université Paris-Saclay", country: "France", city: "Paris", tuition: 170, minGrade: 14, field: "Sciences", language: "Français", level: "B2", requiredSubjects: ["Maths", "Physique"], image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=400&q=80", tags: ["Top 20 Mondial", "Recherche"] },
  { id: 2, name: "Sorbonne Université", country: "France", city: "Paris", tuition: 170, minGrade: 13, field: "Lettres & Sciences", language: "Français", level: "C1", requiredSubjects: ["Français", "Philo"], image: "https://images.unsplash.com/photo-1549633030-89d0743bad01?auto=format&fit=crop&w=400&q=80", tags: ["Prestige", "Histoire"] },
  { id: 3, name: "INSA Lyon", country: "France", city: "Lyon", tuition: 601, minGrade: 15, field: "Ingénierie", language: "Français", level: "B2", requiredSubjects: ["Maths", "Physique"], image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80", tags: ["Post-Bac", "Technique"] },
  { id: 4, name: "Université Technique d'Istanbul", country: "Turquie", city: "Istanbul", tuition: 500, minGrade: 12, field: "Ingénierie", language: "Anglais", level: "B2", requiredSubjects: ["Maths", "Anglais"], image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=80", tags: ["Architecture", "Public"] },
  { id: 5, name: "Koç University", country: "Turquie", city: "Istanbul", tuition: 15000, minGrade: 14, field: "Commerce", language: "Anglais", level: "C1", requiredSubjects: ["Maths", "Anglais"], image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80", tags: ["Privé", "Anglais"] },
  { id: 6, name: "Wuhan University", country: "Chine", city: "Wuhan", tuition: 3000, minGrade: 12, field: "Médecine", language: "Anglais", level: "B2", requiredSubjects: ["SVT", "Chimie"], image: "https://images.unsplash.com/photo-1599707367072-cd6ada2aca71?auto=format&fit=crop&w=400&q=80", tags: ["Bourses CSC", "Immense Campus"] },
  { id: 7, name: "Tongji University", country: "Chine", city: "Shanghai", tuition: 4000, minGrade: 13, field: "Architecture", language: "Anglais", level: "B2", requiredSubjects: ["Maths", "Physique"], image: "https://images.unsplash.com/photo-1470074196321-289228590a4e?auto=format&fit=crop&w=400&q=80", tags: ["Technologie", "Partenariats"] },
];
