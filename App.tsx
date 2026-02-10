
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { SchoolFinder } from './features/website/SchoolFinder';
import { BacCalculator } from './features/website/BacCalculator';
import { AICounselor } from './components/AICounselor';
import { ConcoursList } from './features/client/ConcoursList';
import { ScholarshipFinder } from './features/website/ScholarshipFinder';
import { PremiumGate } from './features/client/PremiumGate';
import { AuthModal } from './components/AuthModal';
import { StudentDashboard } from './features/client/StudentDashboard';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { StudyAbroad } from './features/website/StudyAbroad';
import { OrieneducaPlus } from './features/website/OrieneducaPlus';
import { Blog } from './features/website/Blog';
import { OrientationTests } from './features/website/OrientationTests';
import { Consultation } from './features/website/Consultation';
import { PrivacyPolicy, LegalNotice } from './features/website/LegalPages';
import { Footer } from './components/Footer';
import { AlertBar } from './components/AlertBar';
import { HomePage } from './features/website/HomePage';
import { NavPage, User } from './types';
import { MOCK_BLOG_POSTS } from './constants';
import { Shield } from 'lucide-react';
import { ComingSoon } from './features/website/ComingSoon';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavPage>(NavPage.COMING_SOON);

  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderProtectedPage = (component: React.ReactNode, title: string, description: string) => {
    if (!user?.isPremium) {
      return (
        <PremiumGate
          title={title}
          description={description}
          onUnlock={() => setIsAuthModalOpen(true)}
        />
      );
    }
    return component;
  };

  const handleImpersonate = (studentUser: User) => {
    setUser(studentUser);
    setCurrentPage(NavPage.DASHBOARD);
  };

  const renderPage = () => {
    switch (currentPage) {
      case NavPage.SCHOOLS:
        return <SchoolFinder />;
      case NavPage.ORIENTATION_TESTS:
        return <OrientationTests />;
      case NavPage.STUDY_ABROAD:
        return <StudyAbroad />;
      case NavPage.ORIENEDUCA_PLUS:
        return <OrieneducaPlus />;
      case NavPage.BLOG:
        return <Blog onNavigate={setCurrentPage} />;
      case NavPage.CONSULTATION:
        return <Consultation />;
      case NavPage.PRIVACY:
        return <PrivacyPolicy />;
      case NavPage.LEGAL:
        return <LegalNotice />;
      case NavPage.DASHBOARD:
        if (!user) {
          return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès Réservé</h2>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
              >
                Se connecter à mon espace
              </button>
            </div>
          );
        }
        return <StudentDashboard user={user} onNavigate={setCurrentPage} />;
      case NavPage.ADMIN_DASHBOARD:
        if (user?.role !== 'admin') {
          return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès Non Autorisé</h2>
              <p className="text-gray-600 mb-6">Vous n'avez pas les droits nécessaires pour accéder au portail administrateur.</p>
              <button
                onClick={() => setCurrentPage(NavPage.HOME)}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          );
        }
        return <AdminDashboard onImpersonate={handleImpersonate} />;
      case NavPage.CONCOURS:
        return renderProtectedPage(
          <div className="animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button onClick={() => setCurrentPage(NavPage.DASHBOARD)} className="text-sm text-gray-500 hover:text-primary-600 flex items-center mb-2">
                ← Retour au tableau de bord
              </button>
            </div>
            <ConcoursList />
          </div>,
          "Espace Concours Privé",
          "L'accès au calendrier détaillé des concours, aux seuils d'admission et aux annales est réservé aux membres Premium."
        );
      case NavPage.SCHOLARSHIPS:
        return (
          <div className="animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button onClick={() => setCurrentPage(user ? NavPage.DASHBOARD : NavPage.HOME)} className="text-sm text-gray-500 hover:text-primary-600 flex items-center mb-2">
                ← Retour {user ? 'au tableau de bord' : 'à l\'accueil'}
              </button>
            </div>
            <ScholarshipFinder />
          </div>
        );
      case NavPage.SIMULATOR:
        return (
          <div className="animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button onClick={() => setCurrentPage(user ? NavPage.DASHBOARD : NavPage.HOME)} className="text-sm text-gray-500 hover:text-primary-600 flex items-center mb-2">
                ← Retour {user ? 'au tableau de bord' : 'à l\'accueil'}
              </button>
            </div>
            <BacCalculator />
          </div>
        );
      case NavPage.HOME:
      default:
        return (
          <>
            <AlertBar />
            <HomePage
              onNavigate={(page) => {
                if (page === NavPage.CONCOURS && !user) {
                  setIsAuthModalOpen(true);
                } else {
                  setCurrentPage(page);
                }
              }}
              onOpenChat={() => setIsChatOpen(true)}
            />
          </>
        );
    }
  };

  if (currentPage === NavPage.COMING_SOON) {
    return <ComingSoon />;
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={() => {
          setUser(null);
          setCurrentPage(NavPage.HOME);
        }}
      />

      <main className="flex-grow animate-fade-in">
        {renderPage()}
      </main>

      {currentPage !== NavPage.ADMIN_DASHBOARD && (
        <AICounselor isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      )}

      <Footer onNavigate={setCurrentPage} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(newUser) => {
          setUser(newUser);
          setIsAuthModalOpen(false);
          if (newUser.role === 'admin') {
            setCurrentPage(NavPage.ADMIN_DASHBOARD);
          } else {
            setCurrentPage(NavPage.DASHBOARD);
          }
        }}
      />
    </div>
  );
};

export default App;
