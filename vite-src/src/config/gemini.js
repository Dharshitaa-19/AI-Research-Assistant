import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== "YOUR_GEMINI_API_KEY_HERE") {
    return envKey;
  }
  // No hardcoded key - users must add their key to .env as VITE_GEMINI_API_KEY
  return "";
};

const apiKey = getApiKey();
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Sends a message to the Gemini model and returns the text response.
 * Supports conversational history memory formatting.
 */
export const generateAIResponse = async (prompt, chatHistory = []) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    
    // Format history for Gemini chat API
    // Roles must be exactly "user" or "model"
    const formattedHistory = chatHistory
      .filter(msg => msg.text && (msg.sender === 'user' || msg.sender === 'ai'))
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
