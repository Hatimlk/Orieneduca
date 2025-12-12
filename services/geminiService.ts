
import { GoogleGenAI, Chat } from "@google/genai";

// Utilisation d'une méthode plus sûre pour accéder aux variables d'environnement dans Vite
// Note: Sur Vercel, assurez-vous d'ajouter API_KEY dans les "Environment Variables" des réglages du projet.
const getApiKey = () => {
  try {
    return (import.meta as any).env?.VITE_API_KEY || (process as any).env?.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (userLocation?: { latitude: number, longitude: number }): Chat => {
  return ai.live.connect({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Tu es un conseiller d'orientation expert et bienveillant, spécialisé dans le système éducatif marocain et français (Post-Bac). 
      Ton objectif est d'aider les étudiants (lycéens et étudiants du supérieur) à trouver leur voie.
      
      Règles:
      1. Sois précis sur les acronymes (CPGE, ENSA, ENCG, FST, EST, BTS, etc.).
      2. Utilise la recherche Google pour vérifier les dates de concours 2024/2025 et les seuils d'admission récents si l'utilisateur le demande.
      3. Utilise Google Maps pour localiser des établissements si l'utilisateur demande des écoles "proches" ou dans une ville précise.
      4. Reste encourageant mais réaliste concernant les seuils d'admission.
      5. Tes réponses doivent être structurées (listes à puces) et inclure les sources (liens) fournies par les outils de recherche.
      6. Parle toujours en français.
      
      Contexte: Tu es l'assistant virtuel du site "Orieneduca".`,
      tools: [
        { googleSearch: {} },
        { googleMaps: {} }
      ],
      toolConfig: userLocation ? {
        retrievalConfig: {
          latLng: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          }
        }
      } : undefined,
    },
  }) as any; // Cast car l'interface Chat de createChatSession est plus adaptée ici
};

export type { Chat };
