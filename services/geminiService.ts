
import { GoogleGenAI, Type } from "@google/genai";
import { Event } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getEventRecommendations = async (userPrompt: string, events: Event[]) => {
  const eventContext = events.map(e => ({
    title: e.title,
    category: e.category,
    description: e.description,
    price: e.price
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user says: "${userPrompt}". 
    Here are available events: ${JSON.stringify(eventContext)}. 
    Recommend 2-3 events based on their query and explain why.`,
    config: {
      temperature: 0.7,
      topP: 0.9,
    },
  });

  return response.text;
};

export const summarizeEvent = async (event: Event) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize this event into a catchy 2-sentence highlight: ${event.title} - ${event.description}`,
  });
  return response.text;
};

export const generateEventImage = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `High quality, professional poster for an event: ${prompt}` }]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
