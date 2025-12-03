

import { School, SchoolCategory, NewsArticle, Concours, Scholarship, BlogPost, Badge, Quiz } from './types';

// Helper to generate realistic looking data for the bulk list
const generateSchool = (
    id: string, 
    name: string, 
    cat: SchoolCategory, 
    city: string, 
    desc: string, 
    isPublic: boolean, 
    bacs: string[], 
    grade: string, 
    subjects: string[], 
    network?: string,
    // New optional params with defaults
    def: string = "Établissement d'enseignement supérieur de référence au Maroc.",
    dur: string = "3 à 5 ans",
    forms: string[] = ["Tronc Commun", "Spécialisation"],
    opps: string[] = ["Cadre supérieur", "Master", "Entrepreneuriat"]
): School => ({
  id,
  name,
  category: cat,
  city,
  description: desc,
  shortDefinition: def,
  duration: dur,
  formations: forms,
  opportunities: opps,
  logoUrl: `https://ui-avatars.com/api/?name=${name.replace(/ /g, '+')}&background=random&color=fff&size=128`, // Dynamic placeholder
  website: '#',
  isPublic,
  admissionCriteria: {
    bacTypes: bacs,
    averageGradeRequired: grade,
    keySubjects: subjects
  },
  coordinates: { lat: 33.5731, lng: -7.5898 }, // Default coords (Casa), map is hidden anyway
  network
});

// Common Data Sets for Networks
const ENSA_DATA = {
    def: "Grande école d'ingénieurs publique formant des ingénieurs d'état polyvalents avec une prépa intégrée.",
    dur: "5 ans (2 ans CPIP + 3 ans Cycle Ingénieur)",
    forms: ["Génie Informatique", "Génie Industriel", "Génie Civil", "Génie Mécanique", "Génie Électrique", "Génie des Systèmes Télécoms", "Génie des Procédés", "Génie Énergétique"],
    opps: ["Ingénieur d'État", "Chef de Projet", "Directeur Technique", "Consultant", "Chercheur", "Entrepreneur"]
};

const ENCG_DATA = {
    def: "École de commerce et de gestion publique accessible directement après le bac.",
    dur: "5 ans (Grade Master)",
    forms: ["Gestion Financière et Comptable", "Audit et Contrôle de Gestion", "Marketing et Actions Commerciales", "Commerce International", "Management des Ressources Humaines"],
    opps: ["Auditeur", "Contrôleur de Gestion", "Responsable Marketing", "Directeur RH", "Expert-Comptable (via cycle)", "Trader"]
};

const MED_DATA = {
    def: "Faculté formant les futurs médecins généralistes et spécialistes.",
    dur: "6 ans (Médecine Générale)",
    forms: ["Médecine Générale", "Spécialités (via Résidanat)", "Chirurgie", "Pédiatrie", "Cardiologie"],
    opps: ["Médecin Généraliste", "Médecin Spécialiste", "Médecin Chercheur", "Santé Publique", "Clinique Privée"]
};

const EST_DATA = {
    def: "École supérieure de technologie offrant des formations techniques courtes et professionnalisantes.",
    dur: "2 ans (DUT) ou 3 ans (Licence Pro)",
    forms: ["Génie Informatique", "Techniques de Management", "Génie Électrique", "Finance et Comptabilité", "Logistique"],
    opps: ["Technicien Spécialisé", "Assistant Ingénieur", "Poursuite d'études (LP, Cycle Ingénieur)", "Insertion professionnelle immédiate"]
};

export const MOCK_SCHOOLS: School[] = [
  // --- INGENIERIE (ENSA) ---
  generateSchool('ensa-1', 'ENSA Tanger', SchoolCategory.ENGINEERING, 'Tanger', 'École Nationale des Sciences Appliquées de Tanger.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~12-13', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-2', 'ENSA Agadir', SchoolCategory.ENGINEERING, 'Agadir', 'École Nationale des Sciences Appliquées d\'Agadir.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~12-13', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-3', 'ENSA Oujda', SchoolCategory.ENGINEERING, 'Oujda', 'École Nationale des Sciences Appliquées d\'Oujda.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~12', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-4', 'ENSA Kénitra', SchoolCategory.ENGINEERING, 'Kénitra', 'École Nationale des Sciences Appliquées de Kénitra.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~13', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-5', 'ENSA Marrakech', SchoolCategory.ENGINEERING, 'Marrakech', 'École Nationale des Sciences Appliquées de Marrakech.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~13.5', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-6', 'ENSA Fès', SchoolCategory.ENGINEERING, 'Fès', 'École Nationale des Sciences Appliquées de Fès.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~13', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-7', 'ENSA El Jadida', SchoolCategory.ENGINEERING, 'El Jadida', 'École Nationale des Sciences Appliquées d\'El Jadida.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~12.5', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-8', 'ENSA Tétouan', SchoolCategory.ENGINEERING, 'Tétouan', 'École Nationale des Sciences Appliquées de Tétouan.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~13', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-9', 'ENSA Safi', SchoolCategory.ENGINEERING, 'Safi', 'École Nationale des Sciences Appliquées de Safi.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~12', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-10', 'ENSA Al Hoceima', SchoolCategory.ENGINEERING, 'Al Hoceima', 'École Nationale des Sciences Appliquées d\'Al Hoceima.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~12', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-11', 'ENSA Berrechid', SchoolCategory.ENGINEERING, 'Berrechid', 'École Nationale des Sciences Appliquées de Berrechid.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~12.5', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),
  generateSchool('ensa-12', 'ENSA Khouribga', SchoolCategory.ENGINEERING, 'Khouribga', 'École Nationale des Sciences Appliquées de Khouribga.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil ~12', ['Maths', 'Physique'], 'ENSA', ENSA_DATA.def, ENSA_DATA.dur, ENSA_DATA.forms, ENSA_DATA.opps),

  // --- INGENIERIE (AUTRES) ---
  generateSchool('emi-1', 'EMI Rabat', SchoolCategory.ENGINEERING, 'Rabat', 'École Mohammadia d\'Ingénieurs. Accès Post-Prépa (CNC).', true, ['Bac+2 (CPGE)'], 'Concours CNC', ['Maths', 'Physique'], undefined, "Première école d'ingénieurs au Maroc (Régime Militaire).", "3 ans (Cycle Ingénieur)", ["Génie Civil", "Génie Électrique", "Génie Informatique", "Génie Minéral", "Génie Mécanique", "Modélisation"], ["Officier de réserve", "Ingénieur d'état", "Hauts cadres"]),
  generateSchool('ehtp-1', 'EHTP Casablanca', SchoolCategory.ENGINEERING, 'Casablanca', 'École Hassania des Travaux Publics. Accès Post-Prépa.', true, ['Bac+2 (CPGE)'], 'Concours CNC', ['Maths', 'Physique'], undefined, "École de référence dans les BTP et l'aménagement.", "3 ans (Cycle Ingénieur)", ["Génie Civil", "Génie Hydraulique", "Météorologie", "SIG", "Génie Électrique"], ["Ingénieur BTP", "Chef de projet infrastructure", "Bureau d'études"]),
  generateSchool('inpt-1', 'INPT Rabat', SchoolCategory.ENGINEERING, 'Rabat', 'Institut National des Postes et Télécommunications.', true, ['Bac+2 (CPGE)'], 'Concours CNC', ['Maths', 'Physique', 'Info'], undefined, "Leader en télécoms et technologies de l'information.", "3 ans (Cycle Ingénieur)", ["Advanced Software Engineering", "Data Engineer", "Cyber Security", "Smart Systems"], ["Ingénieur Télécoms", "Architecte Cloud", "Expert Cybersécurité"]),
  generateSchool('ensam-1', 'ENSAM Meknès', SchoolCategory.ENGINEERING, 'Meknès', 'École Nationale Supérieure d\'Arts et Métiers.', true, ['Sc. Math', 'PC', 'STM'], 'Seuil ~14', ['Maths', 'Physique'], 'ENSAM', "École d'ingénieurs spécialisée en mécanique et technologies.", "5 ans", ["Génie Mécanique", "Génie Industriel", "Intelligence Artificielle", "Électromécanique"], ["Ingénieur process", "Directeur de production", "Ingénieur R&D"]),
  generateSchool('ensam-2', 'ENSAM Casablanca', SchoolCategory.ENGINEERING, 'Casablanca', 'École Nationale Supérieure d\'Arts et Métiers.', true, ['Sc. Math', 'PC', 'STM'], 'Seuil ~14.5', ['Maths', 'Physique'], 'ENSAM', "École d'ingénieurs spécialisée en mécanique et technologies.", "5 ans", ["Génie Mécanique", "Génie Industriel", "Intelligence Artificielle", "Électromécanique"], ["Ingénieur process", "Directeur de production", "Ingénieur R&D"]),
  generateSchool('um6p-1', 'UM6P', SchoolCategory.ENGINEERING, 'Ben Guerir', 'Université Mohammed VI Polytechnique (Prestige).', false, ['Sc. Math', 'PC'], 'Excellence (>16)', ['Maths', 'Anglais'], undefined, "Université d'excellence axée sur la recherche appliquée et'innovation.", "Variable", ["Science des Données", "Chimie Industrielle", "Agriculture Durable", "Sciences Politiques", "Architecture"], ["Chercheur", "Innovateur", "Leader Africain"]),

  // --- COMMERCE (ENCG) ---
  generateSchool('encg-1', 'ENCG Agadir', SchoolCategory.BUSINESS, 'Agadir', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-2', 'ENCG Casablanca', SchoolCategory.BUSINESS, 'Casablanca', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-3', 'ENCG El Jadida', SchoolCategory.BUSINESS, 'El Jadida', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-4', 'ENCG Fès', SchoolCategory.BUSINESS, 'Fès', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-5', 'ENCG Kénitra', SchoolCategory.BUSINESS, 'Kénitra', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-6', 'ENCG Marrakech', SchoolCategory.BUSINESS, 'Marrakech', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-7', 'ENCG Oujda', SchoolCategory.BUSINESS, 'Oujda', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-8', 'ENCG Settat', SchoolCategory.BUSINESS, 'Settat', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-9', 'ENCG Tanger', SchoolCategory.BUSINESS, 'Tanger', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),
  generateSchool('encg-10', 'ENCG Dakhla', SchoolCategory.BUSINESS, 'Dakhla', 'École Nationale de Commerce et de Gestion.', true, ['Eco', 'PC', 'Math'], 'TAFEM', ['Maths', 'Langues'], 'ENCG', ENCG_DATA.def, ENCG_DATA.dur, ENCG_DATA.forms, ENCG_DATA.opps),

  // --- COMMERCE (AUTRES) ---
  generateSchool('iscae-1', 'ISCAE Casablanca', SchoolCategory.BUSINESS, 'Casablanca', 'Institut Supérieur de Commerce et d\'Administration des Entreprises.', true, ['Bac+2 (Prépa)'], 'Concours écrit', ['Culture G', 'Maths', 'Anglais'], 'ISCAE', "La Business School de référence au Maroc.", "3 ans (Cycle Grande École)", ["Finance", "Audit", "Marketing", "Stratégie"], ["Top Management", "Finance de marché", "Consulting"]),
  generateSchool('iscae-2', 'ISCAE Rabat', SchoolCategory.BUSINESS, 'Rabat', 'Institut Supérieur de Commerce et d\'Administration des Entreprises.', true, ['Bac+2 (Prépa)'], 'Concours écrit', ['Culture G', 'Maths', 'Anglais'], 'ISCAE', "La Business School de référence au Maroc.", "3 ans (Cycle Grande École)", ["Finance", "Audit", "Marketing", "Stratégie"], ["Top Management", "Finance de marché", "Consulting"]),

  // --- MEDECINE & PHARMACIE ---
  generateSchool('fmp-1', 'FMP Casablanca', SchoolCategory.MEDICINE, 'Casablanca', 'Faculté de Médecine et de Pharmacie.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMP', MED_DATA.def, MED_DATA.dur, MED_DATA.forms, MED_DATA.opps),
  generateSchool('fmp-2', 'FMP Rabat', SchoolCategory.MEDICINE, 'Rabat', 'Faculté de Médecine et de Pharmacie.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMP', MED_DATA.def, MED_DATA.dur, MED_DATA.forms, MED_DATA.opps),
  generateSchool('fmp-3', 'FMP Marrakech', SchoolCategory.MEDICINE, 'Marrakech', 'Faculté de Médecine et de Pharmacie.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMP', MED_DATA.def, MED_DATA.dur, MED_DATA.forms, MED_DATA.opps),
  generateSchool('fmp-4', 'FMP Fès', SchoolCategory.MEDICINE, 'Fès', 'Faculté de Médecine et de Pharmacie.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMP', MED_DATA.def, MED_DATA.dur, MED_DATA.forms, MED_DATA.opps),
  generateSchool('fmp-5', 'FMP Oujda', SchoolCategory.MEDICINE, 'Oujda', 'Faculté de Médecine et de Pharmacie.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMP', MED_DATA.def, MED_DATA.dur, MED_DATA.forms, MED_DATA.opps),
  generateSchool('fmp-6', 'FMP Tanger', SchoolCategory.MEDICINE, 'Tanger', 'Faculté de Médecine et de Pharmacie.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMP', MED_DATA.def, MED_DATA.dur, MED_DATA.forms, MED_DATA.opps),
  generateSchool('fmp-7', 'FMP Agadir', SchoolCategory.MEDICINE, 'Agadir', 'Faculté de Médecine et de Pharmacie.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMP', MED_DATA.def, MED_DATA.dur, MED_DATA.forms, MED_DATA.opps),
  
  generateSchool('fmd-1', 'FMD Casablanca', SchoolCategory.MEDICINE, 'Casablanca', 'Faculté de Médecine Dentaire.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMD', "Formation des médecins dentistes.", "6 ans", ["Médecine Dentaire"], ["Dentiste", "Orthodontiste", "Chirurgien dentiste"]),
  generateSchool('fmd-2', 'FMD Rabat', SchoolCategory.MEDICINE, 'Rabat', 'Faculté de Médecine Dentaire.', true, ['Sc. Math', 'PC', 'SVT'], 'Seuil > 12', ['SVT', 'Physique'], 'FMD', "Formation des médecins dentistes.", "6 ans", ["Médecine Dentaire"], ["Dentiste", "Orthodontiste", "Chirurgien dentiste"]),

  // --- SCIENCES & TECH (FST) ---
  generateSchool('fst-1', 'FST Settat', SchoolCategory.TECHNOLOGY, 'Settat', 'Faculté des Sciences et Techniques.', true, ['Sc. Math', 'PC'], 'Selection Dossier', ['Maths', 'Physique'], 'FST', "Faculté à caractère scientifique et technique (Système LMD Ingénieur).", "3 ans (L), 5 ans (M/Ing)", ["MIP (Maths Info Physique)", "BCG (Bio Chimie Géologie)", "Cycle Ingénieur"], ["Cadre technique", "Ingénieur", "Chercheur"]),
  generateSchool('fst-2', 'FST Mohammedia', SchoolCategory.TECHNOLOGY, 'Mohammedia', 'Faculté des Sciences et Techniques.', true, ['Sc. Math', 'PC'], 'Selection Dossier', ['Maths', 'Physique'], 'FST', "Faculté à caractère scientifique et technique (Système LMD Ingénieur).", "3 ans (L), 5 ans (M/Ing)", ["MIP (Maths Info Physique)", "BCG (Bio Chimie Géologie)", "Cycle Ingénieur"], ["Cadre technique", "Ingénieur", "Chercheur"]),
  generateSchool('fst-3', 'FST Fès', SchoolCategory.TECHNOLOGY, 'Fès', 'Faculté des Sciences et Techniques.', true, ['Sc. Math', 'PC'], 'Selection Dossier', ['Maths', 'Physique'], 'FST', "Faculté à caractère scientifique et technique (Système LMD Ingénieur).", "3 ans (L), 5 ans (M/Ing)", ["MIP (Maths Info Physique)", "BCG (Bio Chimie Géologie)", "Cycle Ingénieur"], ["Cadre technique", "Ingénieur", "Chercheur"]),
  generateSchool('fst-4', 'FST Marrakech', SchoolCategory.TECHNOLOGY, 'Marrakech', 'Faculté des Sciences et Techniques.', true, ['Sc. Math', 'PC'], 'Selection Dossier', ['Maths', 'Physique'], 'FST', "Faculté à caractère scientifique et technique (Système LMD Ingénieur).", "3 ans (L), 5 ans (M/Ing)", ["MIP (Maths Info Physique)", "BCG (Bio Chimie Géologie)", "Cycle Ingénieur"], ["Cadre technique", "Ingénieur", "Chercheur"]),
  generateSchool('fst-5', 'FST Tanger', SchoolCategory.TECHNOLOGY, 'Tanger', 'Faculté des Sciences et Techniques.', true, ['Sc. Math', 'PC'], 'Selection Dossier', ['Maths', 'Physique'], 'FST', "Faculté à caractère scientifique et technique (Système LMD Ingénieur).", "3 ans (L), 5 ans (M/Ing)", ["MIP (Maths Info Physique)", "BCG (Bio Chimie Géologie)", "Cycle Ingénieur"], ["Cadre technique", "Ingénieur", "Chercheur"]),
  
  // --- TECHNOLOGIE (EST) ---
  generateSchool('est-1', 'EST Casablanca', SchoolCategory.TECHNOLOGY, 'Casablanca', 'École Supérieure de Technologie.', true, ['Tous Bac'], 'Selection Dossier', ['Moyenne Générale'], 'EST', EST_DATA.def, EST_DATA.dur, EST_DATA.forms, EST_DATA.opps),
  generateSchool('est-2', 'EST Salé', SchoolCategory.TECHNOLOGY, 'Salé', 'École Supérieure de Technologie.', true, ['Tous Bac'], 'Selection Dossier', ['Moyenne Générale'], 'EST', EST_DATA.def, EST_DATA.dur, EST_DATA.forms, EST_DATA.opps),
  generateSchool('est-3', 'EST Agadir', SchoolCategory.TECHNOLOGY, 'Agadir', 'École Supérieure de Technologie.', true, ['Tous Bac'], 'Selection Dossier', ['Moyenne Générale'], 'EST', EST_DATA.def, EST_DATA.dur, EST_DATA.forms, EST_DATA.opps),
  generateSchool('est-4', 'EST Oujda', SchoolCategory.TECHNOLOGY, 'Oujda', 'École Supérieure de Technologie.', true, ['Tous Bac'], 'Selection Dossier', ['Moyenne Générale'], 'EST', EST_DATA.def, EST_DATA.dur, EST_DATA.forms, EST_DATA.opps),

  // --- ARCHITECTURE & AGRI ---
  generateSchool('ena-1', 'ENA Rabat', SchoolCategory.OTHER, 'Rabat', 'École Nationale d\'Architecture.', true, ['Sc. Math', 'PC', 'SVT'], 'Concours', ['Dessin', 'Maths'], 'ENA', "La seule école publique formant des architectes d'état.", "6 ans", ["Architecture", "Urbanisme"], ["Architecte", "Urbaniste", "Inspecteur des monuments"]),
  generateSchool('ena-2', 'ENA Marrakech', SchoolCategory.OTHER, 'Marrakech', 'École Nationale d\'Architecture.', true, ['Sc. Math', 'PC', 'SVT'], 'Concours', ['Dessin', 'Maths'], 'ENA', "La seule école publique formant des architectes d'état.", "6 ans", ["Architecture", "Urbanisme"], ["Architecte", "Urbaniste", "Inspecteur des monuments"]),
  generateSchool('ena-3', 'ENA Fès', SchoolCategory.OTHER, 'Fès', 'École Nationale d\'Architecture.', true, ['Sc. Math', 'PC', 'SVT'], 'Concours', ['Dessin', 'Maths'], 'ENA', "La seule école publique formant des architectes d'état.", "6 ans", ["Architecture", "Urbanisme"], ["Architecte", "Urbaniste", "Inspecteur des monuments"]),
  generateSchool('ena-4', 'ENA Tétouan', SchoolCategory.OTHER, 'Tétouan', 'École Nationale d\'Architecture.', true, ['Sc. Math', 'PC', 'SVT'], 'Concours', ['Dessin', 'Maths'], 'ENA', "La seule école publique formant des architectes d'état.", "6 ans", ["Architecture", "Urbanisme"], ["Architecte", "Urbaniste", "Inspecteur des monuments"]),
  generateSchool('ena-5', 'ENA Agadir', SchoolCategory.OTHER, 'Agadir', 'École Nationale d\'Architecture.', true, ['Sc. Math', 'PC', 'SVT'], 'Concours', ['Dessin', 'Maths'], 'ENA', "La seule école publique formant des architectes d'état.", "6 ans", ["Architecture", "Urbanisme"], ["Architecte", "Urbaniste", "Inspecteur des monuments"]),
  generateSchool('ena-6', 'ENA Oujda', SchoolCategory.OTHER, 'Oujda', 'École Nationale d\'Architecture.', true, ['Sc. Math', 'PC', 'SVT'], 'Concours', ['Dessin', 'Maths'], 'ENA', "La seule école publique formant des architectes d'état.", "6 ans", ["Architecture", "Urbanisme"], ["Architecte", "Urbaniste", "Inspecteur des monuments"]),
  
  generateSchool('iav-1', 'IAV Hassan II', SchoolCategory.ENGINEERING, 'Rabat', 'Institut Agronomique et Vétérinaire.', true, ['Sc. Math', 'PC', 'SVT', 'Agronomie'], 'Selection + Test', ['SVT', 'Maths'], undefined, "Leader en sciences de la nature et de l'ingénieur.", "5 ans (Ingénieur) / 6 ans (Vétérinaire)", ["Agronomie", "Topographie", "Génie Rural", "Médecine Vétérinaire", "Industrie Agroalimentaire"], ["Ingénieur Agronome", "Vétérinaire", "Ingénieur Topographe"]),
  
  // --- PRIVE ---
  generateSchool('aui-1', 'Al Akhawayn', SchoolCategory.UNIVERSITY, 'Ifrane', 'Al Akhawayn University.', false, ['Tous Bac'], 'Dossier + TOEFL', ['Anglais', 'Maths'], undefined, "Université anglophone suivant le système américain.", "4 ans (Bachelor)", ["Business Administration", "Computer Science", "Engineering", "International Studies"], ["International Career", "Master abroad"]),
  generateSchool('uirm-1', 'UIR', SchoolCategory.UNIVERSITY, 'Rabat', 'Université Internationale de Rabat.', false, ['Tous Bac'], 'Concours', ['Logique', 'Langues'], undefined, "Université semi-publique avec des partenariats internationaux.", "3 à 5 ans", ["Aerospace", "Automobile", "Dentaire", "Architecture", "Business"], ["Cadre", "Ingénieur", "Dentiste"]),
  generateSchool('uic-1', 'UIC', SchoolCategory.UNIVERSITY, 'Casablanca', 'Université Internationale de Casablanca.', false, ['Tous Bac'], 'Dossier + Entretien', ['Motivation'], undefined, "Membre du réseau Honoris United Universities.", "3 à 5 ans", ["Sciences de la Santé", "Ingénierie", "Commerce", "Droit"], ["Professionnel de santé", "Ingénieur", "Juriste"]),
];

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
    tags: ['Public', 'Social', 'National']
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
    description: 'Programme prestigieux pour soutenir les bacheliers brillants issus de milieux défavorisés accédant aux grandes écoles (UM6P, CPGE, etc.).',
    eligibility: ['Bac Mention Très Bien', 'Revenu modeste', 'Admis dans une filière d\'excellence'],
    targetLevels: ['Bac'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    tags: ['Prestige', 'Ingénierie', 'UM6P']
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
    tags: ['France', 'Ingénierie', 'Gestion']
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
    tags: ['Leadership', 'Anglais', 'Master']
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
    tags: ['USA', 'Recherche', 'Prestige']
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
    tags: ['Europe', 'Accessible', 'Tous niveaux']
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
    tags: ['Asie', 'Généreux', 'Logement inclus']
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Concours d\'accès ENSA 2024: Tout savoir',
    summary: 'Les inscriptions pour le concours commun des ENSA sont ouvertes jusqu\'au 30 juin. Voici les seuils prévisionnels et les pièces demandées.',
    date: '15 Mai 2024',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Concours'
  },
  {
    id: '2',
    title: 'Réforme des études de médecine',
    summary: 'Le ministère a annoncé la réduction de la durée de formation à 6 ans au lieu de 7 ans pour le diplôme de docteur en médecine.',
    date: '10 Mai 2024',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Important'
  },
  {
    id: '3',
    title: 'Guide des bourses Erasmus+ 2025',
    summary: 'Comment partir étudier en Europe gratuitement ? Notre guide complet pour postuler aux échanges Erasmus+ pour la rentrée prochaine.',
    date: '05 Mai 2024',
    imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'International'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'choix-filiere',
    title: 'Comment choisir sa filière après le bac ?',
    excerpt: 'Choisir son orientation est la première décision adulte majeure. Voici la méthode en 3 étapes pour ne pas se tromper et aligner passion et débouchés.',
    content: `
      <p>L'orientation post-bac n'est pas une loterie. C'est un processus de connaissance de soi et du marché. Voici comment procéder méthodiquement.</p>
      
      <h3>1. L'introspection : Qui êtes-vous ?</h3>
      <p>Avant de regarder les écoles, regardez-vous. Quelles matières vous passionnent ? Êtes-vous théorique ou pratique ? Aimez-vous le contact humain ou les chiffres ?</p>
      <p><em>Conseil : Faites notre test RIASEC gratuit pour avoir une première piste scientifique sur votre profil.</em></p>

      <h3>2. La réalité du marché marocain</h3>
      <p>Il faut concilier rêve et emploi. Certaines filières sont saturées (ex: biologie fondamentale sans spécialisation), d'autres explosent (ex: Intelligence Artificielle, Énergies Renouvelables, Logistique).</p>

      <h3>3. Université vs Grande École</h3>
      <ul>
        <li><strong>Faculté :</strong> Autonomie, gratuité, recherche, théorie. Idéal si vous êtes discipliné et visez l'enseignement ou l'expertise.</li>
        <li><strong>Grande École (ENSA, ENCG) :</strong> Encadrement, réseau, pratique, insertion rapide. Idéal si vous cherchez du concret et une carrière en entreprise.</li>
        <li><strong>Formation Pro (EST, BTS) :</strong> Court, technique, opérationnel. Parfait pour travailler rapidement.</li>
      </ul>
    `,
    author: 'Dr. Idrissi',
    date: '02 Juin 2024',
    readTime: '5 min',
    category: 'Orientation',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    tags: ['Conseil', 'Avenir', 'Bac']
  },
  {
    id: 'erreurs-ensa',
    title: 'Les erreurs les plus fréquentes des candidats ENSA',
    excerpt: 'Chaque année, des élèves brillants ratent le concours ENSA à cause de détails. Découvrez les pièges à éviter pour sécuriser votre place.',
    content: `
      <p>Le concours commun des ENSA est sélectif. Avoir une bonne note au Bac ne suffit pas. Voici les pièges classiques.</p>

      <h3>1. Négliger le seuil de présélection</h3>
      <p>Beaucoup d'élèves pensent qu'un 12/20 suffit. Historiquement, les seuils tournent autour de 12.5 à 13.5 selon les années. Visez toujours 14+ pour être sûr d'être convoqué.</p>

      <h3>2. Mal gérer le temps du QCM</h3>
      <p>L'épreuve est un marathon de vitesse. Vous avez peu de temps par question. L'erreur fatale est de bloquer 5 minutes sur un exercice de maths difficile alors que 3 questions faciles de physique attendent.</p>

      <h3>3. Répondre au hasard (Attention aux points négatifs !)</h3>
      <p>Le système de notation sanctionne souvent les mauvaises réponses (-1 ou système similaire). Si vous ne savez pas, ne répondez pas ! Mieux vaut un 0 qu'un -1 qui annule une bonne réponse.</p>

      <h3>4. Ignorer les annales</h3>
      <p>Les questions reviennent souvent sous des formes similaires. S'entraîner sur les concours 2018-2023 est la meilleure préparation possible.</p>
    `,
    author: 'Amine El Fassi',
    date: '30 Mai 2024',
    readTime: '4 min',
    category: 'Concours',
    imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1000&q=80',
    tags: ['Ingénierie', 'Astuces', 'ENSA']
  },
  {
    id: 'metiers-2030',
    title: 'Les métiers les plus demandés au Maroc en 2030',
    excerpt: 'Le monde change. Découvrez les secteurs qui recruteront massivement dans 5 ans : Tech, Green Energy et Santé Digitale.',
    content: `
      <p>Vous commencez vos études en 2024 pour travailler en 2029/2030. Ne choisissez pas une filière du passé. Voici les tendances lourdes au Maroc.</p>

      <h3>1. La Tech et l'IA</h3>
      <p>Le Maroc se positionne comme un hub digital africain. Les développeurs Fullstack, experts en Cybersécurité et surtout les ingénieurs en Intelligence Artificielle seront les rois du marché.</p>

      <h3>2. Les Énergies Vertes (Hydrogène & Solaire)</h3>
      <p>Avec des projets géants comme Noor et l'offre Maroc Hydrogène Vert, les ingénieurs en efficacité énergétique et gestion de projets industriels verts seront en pénurie.</p>

      <h3>3. La Santé Connectée</h3>
      <p>La généralisation de la couverture médicale booste le besoin de médecins, mais aussi de gestionnaires hospitaliers et d'experts en e-santé (télémédecine).</p>

      <h3>4. L'AgriTech</h3>
      <p>Face au stress hydrique, l'agriculture marocaine doit se moderniser. Les ingénieurs agronomes spécialisés en gestion de l'eau et biotechnologies sont l'avenir.</p>
    `,
    author: 'Karim Tazi',
    date: '28 Mai 2024',
    readTime: '6 min',
    category: 'Carrière',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1000&q=80',
    tags: ['Futur', 'Emploi', 'Maroc']
  },
  {
    id: 'etudier-france-guide',
    title: 'Étudier en France : Guide complet 2025',
    excerpt: 'Procédures Campus France, TCF, Garants financiers... Tout ce qu\'il faut savoir pour réussir sa mobilité étudiante sans stress.',
    content: `
      <p>La France reste la destination n°1. Mais la procédure est stricte. Voici la roadmap pour septembre 2025.</p>

      <h3>Étape 1 : Le Test de Langue (Septembre - Octobre)</h3>
      <p>Inscrivez-vous au TCF-DAP ou TCF-SO dès la rentrée. Un niveau B2 est le minimum requis, mais un C1 booste considérablement votre dossier, surtout pour les écoles de commerce ou communication.</p>

      <h3>Étape 2 : La Plateforme "Études en France" (Novembre - Janvier)</h3>
      <p>C'est là que tout se joue. Vous choisirez vos 7 vœux (pour les Licences) ou plus pour les Masters.
      <br><strong>Astuce :</strong> Ne mettez pas que des universités parisiennes très sélectives. Visez aussi des villes comme Lyon, Toulouse ou Bordeaux.</p>

      <h3>Étape 3 : Le dossier financier (Mai - Juillet)</h3>
      <p>Le consulat exige un blocage bancaire d'environ 7380€ (615€ x 12 mois) ou un garant résidant en France avec des revenus solides. Anticipez cette somme dès maintenant.</p>

      <h3>Étape 4 : Le Logement</h3>
      <p>C'est souvent le point noir. Postulez au CROUS, mais regardez aussi les résidences privées dès que vous avez une admission. Sans logement, pas de visa.</p>
    `,
    author: 'Sarah Benali',
    date: '25 Mai 2024',
    readTime: '7 min',
    category: 'Études en France',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    tags: ['Visa', 'Campus France', 'Guide']
  },
  {
    id: 'bourse-etranger',
    title: 'Comment décrocher une bourse pour étudier à l\'étranger ?',
    excerpt: 'Le guide ultime pour financer vos études en France, aux USA ou en Chine. Stratégies et documents clés.',
    content: `
      <p>Étudier à l'étranger est un rêve pour beaucoup d'étudiants marocains, mais le coût peut être un obstacle majeur. Heureusement, il existe de nombreuses bourses d'études. Voici comment maximiser vos chances.</p>
      
      <h3>1. Cibler les bons programmes</h3>
      <p>Ne postulez pas au hasard. Identifiez les bourses qui correspondent à votre profil (Excellence, Sociale, Recherche). Les plus connues sont :</p>
      <ul>
        <li><strong>Bourse Eiffel (France) :</strong> Pour les masters et doctorats en ingénierie et gestion.</li>
        <li><strong>Fulbright (USA) :</strong> Très prestigieuse, couvre presque tout.</li>
        <li><strong>CSC (Chine) :</strong> Souvent très généreuse, incluant logement et argent de poche.</li>
      </ul>

      <h3>2. Soigner sa lettre de motivation</h3>
      <p>C'est l'élément décisif. Ne faites pas de copier-coller. Expliquez votre projet professionnel, pourquoi ce pays, et pourquoi cette université spécifique. Montrez votre impact futur au Maroc.</p>
    `,
    author: 'Sarah Benali',
    date: '20 Mai 2024',
    readTime: '5 min',
    category: 'Bourses',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
    tags: ['International', 'Finance', 'Conseils']
  },
];

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