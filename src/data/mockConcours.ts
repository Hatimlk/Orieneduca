import { Concours } from '../types';
export const MOCK_CONCOURS: Concours[] = [
  {
    id: 'c1',
    schoolName: 'ENSA Maroc',
    title: 'Concours Commun ENSA 2024',
    deadline: '30 Juin 2024',
    examDate: '15 Juillet 2024',
    imageUrl: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accessLevel: 'Post-Bac',
    status: 'Open'
  },
  {
    id: 'c2',
    schoolName: 'ISCAE',
    title: 'Concours d\'accès Grande École',
    deadline: '15 Mai 2024',
    examDate: '28 Mai 2024',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accessLevel: 'Bac+2',
    status: 'Open'
  },
  {
    id: 'c3',
    schoolName: 'FMP',
    title: 'Concours Médecine & Pharmacie',
    deadline: '10 Juillet 2024',
    examDate: '25 Juillet 2024',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accessLevel: 'Post-Bac',
    status: 'Coming Soon'
  },
  {
    id: 'c4',
    schoolName: 'ENA Architecture',
    title: 'Concours National d\'Architecture',
    deadline: '05 Juillet 2024',
    examDate: '20 Juillet 2024',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    accessLevel: 'Post-Bac',
    status: 'Coming Soon'
  }
];
