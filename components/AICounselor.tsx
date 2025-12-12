
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, X, MessageCircle, Minus, ExternalLink, MapPin } from 'lucide-react';
import { createChatSession, Chat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

interface AICounselorProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface GroundingSource {
  title: string;
  uri: string;
  type: 'web' | 'maps';
}

export const AICounselor: React.FC<AICounselorProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Bonjour ! Je suis l'assistant Orieneduca. Une question sur votre orientation, une date de concours ou une école proche de vous ? Je suis là pour vous aider.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<Record<string, GroundingSource[]>>({});
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initChat = async () => {
    try {
      let location = undefined;
      try {
        const pos = await new Promise<GeolocationPosition>((res, rej) => 
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
        );
        location = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      } catch (e) {
        console.warn("Location permission denied or timed out");
      }
      chatSessionRef.current = createChatSession(location);
    } catch (e) {
      console.error("Failed to initialize chat:", e);
      setError("Impossible d'initialiser le service IA.");
    }
  };

  useEffect(() => {
    if (!chatSessionRef.current) {
        initChat();
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

      const modelMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: modelMsgId,
        role: 'model',
        text: '',
        timestamp: Date.now()
      }]);

      let fullText = '';
      let collectedSources: GroundingSource[] = [];
      
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        fullText += c.text || '';
        
        // Extract grounding sources
        const groundingMetadata = (c as any).candidates?.[0]?.groundingMetadata;
        if (groundingMetadata?.groundingChunks) {
          groundingMetadata.groundingChunks.forEach((chunk: any) => {
            if (chunk.web) {
              collectedSources.push({ title: chunk.web.title, uri: chunk.web.uri, type: 'web' });
            } else if (chunk.maps) {
               collectedSources.push({ title: chunk.maps.title || "Lieu Google Maps", uri: chunk.maps.uri, type: 'maps' });
            }
          });
        }

        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId 
            ? { ...msg, text: fullText }
            : msg
        ));
        
        if (collectedSources.length > 0) {
            setSources(prev => ({ ...prev, [modelMsgId]: collectedSources }));
        }
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
        {isOpen && (
            <div className="bg-white w-[350px] sm:w-[420px] h-[600px] max-h-[85vh] rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 animate-fade-in-up">
                {/* Header */}
                <div className="bg-primary-900 p-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="bg-accent-500 p-1.5 rounded-xl shadow-lg">
                            <Bot className="h-5 w-5 text-gray-900" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Conseiller Orieneduca</h3>
                            <p className="text-primary-300 text-[10px] flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                                IA avec recherche en temps réel
                            </p>
                        </div>
                    </div>
                    <button onClick={onToggle} className="p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Minus className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 scrollbar-hide">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center mt-1 shadow-sm ${
                                    msg.role === 'user' ? 'bg-primary-600 text-white ml-2' : 'bg-white border border-gray-200 text-primary-600 mr-2'
                                }`}>
                                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                                </div>

                                <div className="space-y-2">
                                    <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                        msg.role === 'user'
                                            ? 'bg-primary-600 text-white rounded-tr-none'
                                            : msg.isError 
                                                ? 'bg-red-50 text-red-800 border border-red-100 rounded-tl-none'
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }`}>
                                        <div className="space-y-2">
                                            {msg.text.split('\n').map((line, i) => (
                                                <p key={i} className={line.trim().startsWith('•') || line.trim().startsWith('-') ? 'pl-4' : ''}>
                                                  {line}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sources Bar */}
                                    {sources[msg.id] && (
                                        <div className="flex flex-wrap gap-2 animate-fade-in">
                                            {Array.from(new Set(sources[msg.id].map(s => s.uri))).map((uri, idx) => {
                                                const source = sources[msg.id].find(s => s.uri === uri)!;
                                                return (
                                                    <a 
                                                        key={idx}
                                                        href={source.uri}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-primary-600 hover:bg-primary-50 transition-colors shadow-sm"
                                                    >
                                                        {source.type === 'web' ? <ExternalLink className="w-3 h-3 mr-1" /> : <MapPin className="w-3 h-3 mr-1" />}
                                                        <span className="truncate max-w-[120px]">{source.title}</span>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 h-8 w-8 rounded-xl flex items-center justify-center mr-2 shadow-sm">
                                <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                            </div>
                            <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                                <div className="flex space-x-1">
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Posez votre question (concours, écoles...)"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent block pl-4 p-3.5 pr-12 transition-all"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-900 hover:bg-primary-800 text-white rounded-xl p-2 transition-all disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                    <p className="text-[10px] text-gray-400 mt-2 text-center">L'IA peut faire des erreurs. Vérifiez les sources officielles.</p>
                </div>
            </div>
        )}

        <button
            onClick={onToggle}
            className={`p-4 rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-110 flex items-center justify-center group ${
                isOpen 
                ? 'bg-gray-900 text-white rotate-90' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
        >
            {isOpen ? <X className="h-7 w-7" /> : (
                <div className="relative">
                    <MessageCircle className="h-7 w-7" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-primary-600 group-hover:scale-125 transition-transform"></span>
                </div>
            )}
        </button>
    </div>
  );
};
