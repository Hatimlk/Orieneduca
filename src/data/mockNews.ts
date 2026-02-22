import { NewsArticle, BlogPost } from '../types';
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
