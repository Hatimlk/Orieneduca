
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, X, MessageCircle, Minus } from 'lucide-react';
import { createChatSession, Chat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

interface AICounselorProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AICounselor: React.FC<AICounselorProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Bonjour ! Je suis l'assistant Orieneduca. Une question sur votre orientation, une école ou un concours ? Je suis là pour vous aider.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Store chat session in ref to persist across renders
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session only once
    if (!chatSessionRef.current) {
      try {
        chatSessionRef.current = createChatSession();
      } catch (e) {
        console.error("Failed to initialize chat:", e);
        setError("Impossible d'initialiser le service IA.");
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() || isLoading || !chatSessionRef.current) return;

    const userMessageText = input.trim();
    setInput('');
    setError(null);

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userMessageText,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessageStream({
        message: userMessageText
      });

      // Create a placeholder for the model response
      const modelMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: modelMsgId,
        role: 'model',
        text: '',
        timestamp: Date.now()
      }]);

      let fullText = '';
      
      for await (const chunk of result) {
        const chunkText = (chunk as GenerateContentResponse).text || '';
        fullText += chunkText;
        
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId 
            ? { ...msg, text: fullText }
            : msg
        ));
      }

    } catch (err) {
      console.error("Error sending message:", err);
      setError("Erreur de communication. Veuillez réessayer.");
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Désolé, j'ai rencontré un problème technique. Veuillez réessayer.",
        timestamp: Date.now(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        
        {/* Chat Window */}
        {isOpen && (
            <div className="bg-white w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 animate-fade-in-up">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-900 p-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 text-yellow-300" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Assistant Orieneduca</h3>
                            <p className="text-primary-100 text-[10px] flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                                En ligne
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button onClick={onToggle} className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <Minus className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-2 shrink-0">
                        <div className="flex">
                            <div className="ml-2">
                                <p className="text-xs text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-hide">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-1 ${
                                    msg.role === 'user' ? 'bg-primary-100 ml-2' : 'bg-indigo-100 mr-2'
                                }`}>
                                    {msg.role === 'user' ? (
                                        <User className="h-3 w-3 text-primary-700" />
                                    ) : (
                                        <Bot className="h-3 w-3 text-indigo-700" />
                                    )}
                                </div>

                                {/* Bubble */}
                                <div
                                    className={`px-3 py-2 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                        msg.role === 'user'
                                            ? 'bg-primary-600 text-white rounded-tr-none'
                                            : msg.isError 
                                                ? 'bg-red-50 text-red-800 border border-red-100 rounded-tl-none'
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }`}
                                >
                                    {msg.role === 'model' && !msg.isError ? (
                                        <div className="text-xs sm:text-sm space-y-1">
                                            {msg.text.split('\n').map((line, i) => (
                                                <p key={i} className={`min-h-[1rem] ${line.trim().startsWith('•') || line.trim().startsWith('-') ? 'pl-4' : ''}`}>
                                                  {line}
                                                </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="whitespace-pre-wrap">{msg.text}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.role === 'user' && (
                        <div className="flex justify-start">
                            <div className="bg-indigo-100 mr-2 h-6 w-6 rounded-full flex items-center justify-center">
                                <Bot className="h-3 w-3 text-indigo-700" />
                            </div>
                            <div className="bg-white border border-gray-100 px-3 py-2 rounded-2xl rounded-tl-none shadow-sm">
                                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                    <form onSubmit={handleSendMessage} className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Posez votre question..."
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-primary-500 focus:border-primary-500 block pl-4 p-2.5 pr-10 shadow-inner"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </button>
                    </form>
                </div>
            </div>
        )}

        {/* Floating Button */}
        <button
            onClick={onToggle}
            className={`p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
                isOpen 
                ? 'bg-gray-800 text-white rotate-90' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
        >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
    </div>
  );
};
