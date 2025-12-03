
import React, { useState } from 'react';
import { Trophy, Star, Lock, CheckCircle, ArrowRight, Award, HelpCircle, PlayCircle, XCircle, Compass, Target, CalendarCheck, Plane, Cpu } from 'lucide-react';
import { Badge, Quiz, QuizQuestion } from '../types';
import { MOCK_BADGES, MOCK_QUIZZES } from '../constants';

interface GamificationHubProps {
  userPoints: number;
  userBadges: string[];
  onAddPoints: (points: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

// Helper to map icon names strings to Lucide components
const getIcon = (name: string) => {
  switch (name) {
    case 'Compass': return <Compass className="w-6 h-6" />;
    case 'Target': return <Target className="w-6 h-6" />;
    case 'CalendarCheck': return <CalendarCheck className="w-6 h-6" />;
    case 'Plane': return <Plane className="w-6 h-6" />;
    case 'Cpu': return <Cpu className="w-6 h-6" />;
    default: return <Award className="w-6 h-6" />;
  }
};

export const GamificationHub: React.FC<GamificationHubProps> = ({ userPoints, userBadges, onAddPoints, onUnlockBadge }) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<{isCorrect: boolean, text: string, selectedOption: number} | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setQuizScore(0);
    setShowResult(false);
    setFeedback(null);
  };

  const handleAnswer = (optionIndex: number) => {
    if (!activeQuiz) return;
    const question = activeQuiz.questions[currentQuestionIdx];
    const isCorrect = optionIndex === question.correctAnswer;

    setFeedback({
      isCorrect,
      text: question.explanation,
      selectedOption: optionIndex
    });

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    setFeedback(null);
    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setShowResult(true);
      // Calculate rewards
      // If score > 50%, award XP
      const passingScore = Math.ceil(activeQuiz.questions.length / 2);
      if (quizScore >= passingScore && !completedQuizzes.includes(activeQuiz.id)) {
          onAddPoints(activeQuiz.xpReward);
          setCompletedQuizzes(prev => [...prev, activeQuiz.id]);
      }
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setFeedback(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Badges Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" /> Mes Badges & Succès
            </h3>
            <span className="text-xs text-gray-500">{userBadges.length}/{MOCK_BADGES.length} débloqués</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {MOCK_BADGES.map(badge => {
                const isUnlocked = userBadges.includes(badge.id) || badge.unlocked; // Using mock unlocked prop for demo
                return (
                    <div key={badge.id} className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all ${isUnlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-100 opacity-60 grayscale'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm ${isUnlocked ? 'bg-white text-yellow-600' : 'bg-gray-200 text-gray-400'}`}>
                            {getIcon(badge.iconName)}
                        </div>
                        <h4 className="font-bold text-sm text-gray-900 mb-1">{badge.name}</h4>
                        <p className="text-[10px] text-gray-500 leading-tight">{badge.description}</p>
                        {!isUnlocked && (
                            <div className="mt-2 text-[10px] font-medium text-gray-400 flex items-center">
                                <Lock className="w-3 h-3 mr-1" /> {badge.requiredPoints} XP
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>

      {/* Quiz Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-primary-600" /> Quiz Interactifs
        </h3>

        {!activeQuiz ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_QUIZZES.map(quiz => {
                    const isDone = completedQuizzes.includes(quiz.id);
                    return (
                        <div key={quiz.id} className="border border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-md uppercase">
                                    Orientation
                                </span>
                                <span className="flex items-center text-xs font-bold text-yellow-600">
                                    <Star className="w-3 h-3 mr-1 fill-current" /> {quiz.xpReward} XP
                                </span>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600">{quiz.title}</h4>
                            <p className="text-sm text-gray-500 mb-4">{quiz.description}</p>
                            <button 
                                onClick={() => handleStartQuiz(quiz)}
                                disabled={isDone}
                                className={`w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center ${isDone ? 'bg-green-100 text-green-700' : 'bg-gray-900 text-white hover:bg-primary-600'}`}
                            >
                                {isDone ? (
                                    <>Complété <CheckCircle className="w-4 h-4 ml-2" /></>
                                ) : (
                                    <>Commencer <PlayCircle className="w-4 h-4 ml-2" /></>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        ) : (
            // Active Quiz Interface
            <div className="animate-fade-in">
                <div className="mb-6 flex justify-between items-center">
                    <h4 className="font-bold text-xl text-gray-900">{activeQuiz.title}</h4>
                    <button onClick={closeQuiz} className="text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6" /></button>
                </div>

                {!showResult ? (
                    <div>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 h-2 rounded-full mb-6">
                            <div 
                                className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${((currentQuestionIdx) / activeQuiz.questions.length) * 100}%` }}
                            ></div>
                        </div>

                        <p className="text-gray-800 font-medium text-lg mb-6">
                            {activeQuiz.questions[currentQuestionIdx].question}
                        </p>

                        <div className="space-y-3 mb-6">
                            {activeQuiz.questions[currentQuestionIdx].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => !feedback && handleAnswer(idx)}
                                    disabled={!!feedback}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                        feedback 
                                            ? idx === activeQuiz.questions[currentQuestionIdx].correctAnswer
                                                ? 'border-green-500 bg-green-50 text-green-800'
                                                : idx === feedback.selectedOption ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50 text-gray-400'
                                            : 'border-gray-100 hover:border-primary-300 hover:bg-primary-50'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {feedback && (
                            <div className={`p-4 rounded-xl mb-6 ${feedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                <p className="font-bold mb-1">{feedback.isCorrect ? 'Correct !' : 'Oups, raté !'}</p>
                                <p className="text-sm">{feedback.text}</p>
                            </div>
                        )}

                        {feedback && (
                            <button 
                                onClick={handleNextQuestion}
                                className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700"
                            >
                                {currentQuestionIdx < activeQuiz.questions.length - 1 ? 'Question suivante' : 'Voir le résultat'}
                            </button>
                        )}
                    </div>
                ) : (
                    // Result View
                    <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                            {quizScore > activeQuiz.questions.length / 2 ? <Trophy className="w-10 h-10 text-yellow-600" /> : <Target className="w-10 h-10 text-gray-400" />}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Terminé !</h3>
                        <p className="text-gray-600 mb-6">
                            Vous avez obtenu un score de <span className="font-bold text-primary-600">{quizScore}/{activeQuiz.questions.length}</span>
                        </p>
                        
                        {quizScore >= Math.ceil(activeQuiz.questions.length / 2) && !completedQuizzes.includes(activeQuiz.id) && (
                             <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold mb-6 animate-bounce">
                                 + {activeQuiz.xpReward} XP gagnés !
                             </div>
                        )}

                        <button 
                            onClick={closeQuiz}
                            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800"
                        >
                            Retour au Dashboard
                        </button>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
