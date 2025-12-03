
import React from 'react';
import { Shield, Lock, FileText, Server, MapPin, Mail, ArrowLeft } from 'lucide-react';

// Shared layout for legal pages
const LegalLayout: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; lastUpdated: string }> = ({ title, icon, children, lastUpdated }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-900 p-8 md:p-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            {icon}
          </div>
          <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Document Officiel</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{title}</h1>
        <p className="text-gray-400 text-sm">Dernière mise à jour : {lastUpdated}</p>
      </div>
      <div className="p-8 md:p-12 prose prose-lg prose-blue max-w-none text-gray-600">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Politique de Confidentialité" icon={<Lock className="w-8 h-8 text-accent-400" />} lastUpdated="25 Mai 2024">
      <h3>1. Collecte de l'information</h3>
      <p>
        Nous recueillons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, participez à un concours, et / ou lorsque vous vous déconnectez. Les informations recueillies incluent votre nom, votre adresse e-mail, votre numéro de téléphone et/ou votre parcours scolaire.
      </p>
      <p>
        En outre, nous recevons et enregistrons automatiquement des informations à partir de votre ordinateur et navigateur, y compris votre adresse IP, vos logiciels et votre matériel, et la page que vous demandez.
      </p>

      <h3>2. Utilisation des informations</h3>
      <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
      <ul>
        <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
        <li>Fournir un contenu publicitaire personnalisé</li>
        <li>Améliorer notre site Web</li>
        <li>Améliorer le service client et vos besoins de prise en charge</li>
        <li>Vous contacter par e-mail</li>
        <li>Administrer un concours, une promotion, ou une enquête</li>
      </ul>

      <h3>3. Confidentialité du commerce en ligne</h3>
      <p>
        Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.
      </p>

      <h3>4. Divulgation à des tiers</h3>
      <p>
        Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
      </p>

      <h3>5. Protection des informations</h3>
      <p>
        Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne. Seuls les employés qui ont besoin d'effectuer un travail spécifique (par exemple, la facturation ou le service à la clientèle) ont accès aux informations personnelles identifiables.
      </p>

      <h3>6. Consentement</h3>
      <p>En utilisant notre site, vous consentez à notre politique de confidentialité.</p>
    </LegalLayout>
  );
};

export const LegalNotice: React.FC = () => {
  return (
    <LegalLayout title="Mentions Légales" icon={<FileText className="w-8 h-8 text-primary-400" />} lastUpdated="01 Janvier 2024">
      <h3>1. Édition du site</h3>
      <p>
        Le site <strong>Orieneduca.ma</strong> est édité par la société <strong>Orieneduca SARL</strong>, société à responsabilité limitée au capital de 100.000 DH.
      </p>
      <ul className="list-none pl-0 space-y-2">
        <li className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-400" /> <strong>Siège social :</strong> Technopark, Route de Nouaceur, Casablanca, Maroc</li>
        <li className="flex items-center"><FileText className="w-4 h-4 mr-2 text-gray-400" /> <strong>RC :</strong> 123456 | <strong>ICE :</strong> 001234567890000</li>
        <li className="flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-400" /> <strong>Email :</strong> legal@orieneduca.ma</li>
      </ul>

      <h3>2. Hébergement</h3>
      <p>
        Le site est hébergé par la société <strong>Vercel Inc.</strong><br/>
        <span className="flex items-center mt-1"><Server className="w-4 h-4 mr-2 text-gray-400" /> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</span>
      </p>

      <h3>3. Propriété intellectuelle</h3>
      <p>
        L'ensemble de ce site relève de la législation marocaine et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
      </p>
      <p>
        La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
      </p>

      <h3>4. Responsabilité</h3>
      <p>
        Les informations communiquées sur le site Orieneduca sont fournies à titre indicatif, elles sont non contractuelles et ne sauraient engager la responsabilité de l'éditeur. Orieneduca se réserve le droit de modifier le contenu du site à tout moment et sans préavis.
      </p>
      <p>
        L'utilisateur est seul responsable de l'utilisation qu'il fait des informations présentes sur le site. Orieneduca ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site.
      </p>
    </LegalLayout>
  );
};
