import { Scholarship } from '../types';
export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'minhaty',
    title: 'Bourse Minhaty (Enseignement Supérieur)',
    provider: 'Ministère de l\'Enseignement Supérieur',
    location: 'Maroc',
    country: 'Maroc',
    type: 'Sociale',
    deadline: '31 Juillet',
    value: 'Jusqu\'à 1900 DH / trimestre',
    description: 'La bourse nationale destinée aux étudiants issus de familles à revenu modeste poursuivant leurs études dans le public.',
    eligibility: ['Nationalité Marocaine', 'Revenu familial limité', 'Non-salarié', 'Inscrit dans le public'],
    targetLevels: ['Bac', 'Licence', 'Master'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    tags: ['Public', 'Social', 'National'],
    criteria: {
      minGrade: 10, // Just need to pass
      targetSector: 'All',
      socialCriteria: true
    }
  },
  {
    id: 'ocp',
    title: 'Bourse d\'Excellence Fondation OCP',
    provider: 'Fondation OCP',
    location: 'Maroc',
    country: 'Maroc',
    type: 'Excellence',
    deadline: '15 Septembre',
    value: 'Couverture Totale + Vie',
    description: 'Programme prestigieux pour soutenir les bacheliers brillants issus de milieux défavorisés accédant aux grandes écoles.',
    eligibility: ['Bac Mention Très Bien', 'Revenu modeste', 'Admis dans une filière d\'excellence'],
    targetLevels: ['Bac'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    tags: ['Prestige', 'Ingénierie', 'UM6P'],
    criteria: {
      minGrade: 16,
      targetSector: 'All',
      socialCriteria: true,
      targetCities: ['Khouribga', 'Benguerir', 'Youssoufia', 'Safi', 'Jorf Lasfar']
    }
  },
  {
    id: 'fm6',
    title: 'Bourse Istihqaq',
    provider: 'Fondation Mohammed VI',
    location: 'Maroc',
    country: 'Maroc',
    type: 'Excellence',
    deadline: '30 Septembre',
    value: '3000 DH / mois',
    description: 'Bourse de mérite destinée aux enfants des adhérents de la Fondation (Enseignement) ayant obtenu le Bac avec Excellence.',
    eligibility: ['Parent Enseignant', 'Bac Mention Très Bien (≥16/20)', 'Inscription validée'],
    targetLevels: ['Bac'],
    imageUrl: 'https://images.unsplash.com/photo-1427504746696-ea5abd7dfe83?auto=format&fit=crop&w=1000&q=80',
    tags: ['Réservé', 'Éducation', 'Mérite'],
    criteria: {
      minGrade: 16,
      targetSector: 'Education',
      socialCriteria: false
    }
  },
  {
    id: 'eiffel',
    title: 'Bourse d\'Excellence Eiffel',
    provider: 'Campus France',
    location: 'Étranger',
    country: 'France',
    type: 'Excellence',
    deadline: '10 Janvier',
    value: '1181€ / mois + Billet avion',
    description: 'Destinée aux futurs décideurs étrangers, pour des formations de niveau Master et Doctorat en France.',
    eligibility: ['Excellence académique', 'Moins de 25 ans (Master)', 'Candidature présentée par l\'établissement'],
    targetLevels: ['Master', 'Doctorat'],
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    tags: ['France', 'Ingénierie', 'Gestion'],
    criteria: {
      minGrade: 14,
      targetSector: 'All',
      socialCriteria: false
    }
  },
  {
    id: 'chevening',
    title: 'Chevening Scholarships',
    provider: 'UK Government',
    location: 'Étranger',
    country: 'Royaume-Uni',
    type: 'Excellence',
    deadline: '07 Novembre',
    value: 'Couverture Totale (Frais + Vie)',
    description: 'Bourse complète pour étudier un Master d\'un an au Royaume-Uni. Vise les futurs leaders.',
    eligibility: ['Licence validée', '2 ans d\'expérience pro', 'Potentiel de leadership'],
    targetLevels: ['Master'],
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80',
    tags: ['Leadership', 'Anglais', 'Master'],
    criteria: {
      minGrade: 14,
      targetSector: 'All',
      socialCriteria: false
    }
  },
  {
    id: 'fulbright',
    title: 'Fulbright Study Grant',
    provider: 'MACECE (USA-Morocco)',
    location: 'Étranger',
    country: 'USA',
    type: 'Excellence',
    deadline: '15 Octobre',
    value: 'Frais de scolarité + Allocation',
    description: 'Le programme phare d\'échange entre le Maroc et les USA pour les étudiants en Master.',
    eligibility: ['Licence (4 ans)', 'Bon niveau d\'anglais (TOEFL)', 'Excellence académique'],
    targetLevels: ['Master'],
    imageUrl: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=1000&q=80',
    tags: ['USA', 'Recherche', 'Prestige'],
    criteria: {
      minGrade: 14,
      targetSector: 'All',
      socialCriteria: false
    }
  },
  {
    id: 'hungary',
    title: 'Stipendium Hungaricum',
    provider: 'Gouvernement Hongrois',
    location: 'Étranger',
    country: 'Hongrie',
    type: 'Coopération',
    deadline: '15 Janvier',
    value: 'Exonération + Allocation mensuelle',
    description: 'Programme de coopération bilatérale offrant des bourses complètes pour Licence, Master et Doctorat.',
    eligibility: ['Baccalauréat', 'Dossier académique solide', 'Test de langue (Anglais)'],
    targetLevels: ['Licence', 'Master', 'Doctorat'],
    imageUrl: 'https://images.unsplash.com/photo-1559734602-f51d25a63174?auto=format&fit=crop&w=1000&q=80',
    tags: ['Europe', 'Accessible', 'Tous niveaux'],
    criteria: {
      minGrade: 12,
      targetSector: 'All',
      socialCriteria: false
    }
  },
  {
    id: 'csc',
    title: 'Bourse du Gouvernement Chinois (CSC)',
    provider: 'China Scholarship Council',
    location: 'Étranger',
    country: 'Chine',
    type: 'Coopération',
    deadline: '31 Mars',
    value: 'Totale : Frais + Logement + Argent',
    description: 'L\'une des bourses les plus généreuses au monde pour attirer les talents internationaux en Chine.',
    eligibility: ['Bonne santé', 'Bon dossier', 'Anglais ou Chinois'],
    targetLevels: ['Licence', 'Master', 'Doctorat'],
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80',
    tags: ['Asie', 'Généreux', 'Logement inclus'],
    criteria: {
      minGrade: 13,
      targetSector: 'All',
      socialCriteria: false
    }
  }
];
