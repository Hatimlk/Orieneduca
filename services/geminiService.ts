
import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Creates a chat session for orientation counseling.
 * Uses ai.chats.create for text-based conversation with grounding capabilities.
 */
export const createChatSession = (userLocation?: { latitude: number, longitude: number }): Chat => {
  // Fix: Use ai.chats.create instead of ai.live.connect because live.connect (Live API) 
  // does not support toolConfig for grounding and returns a Promise<LiveSession> which 
  // doesn't have sendMessageStream.
  return ai.chats.create({
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
      // toolConfig is supported in ai.chats.create and ai.models.generateContent
      toolConfig: userLocation ? {
        retrievalConfig: {
          latLng: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          }
        }
      } : undefined,
    },
  });
};

export type { Chat };
