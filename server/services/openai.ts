import OpenAI from "openai";

// Creating the OpenAI client with the API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const DEFAULT_MODEL = "gpt-4o";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Type guard to validate chat message format
export function isChatMessage(message: any): message is ChatMessage {
  return (
    message &&
    typeof message === 'object' &&
    (message.role === 'system' || message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string'
  );
}

/**
 * Get a response from OpenAI's chat completions API
 * @param messages - Array of messages in the conversation history
 * @param options - Optional parameters for the API call
 * @returns The assistant's response as a string
 */
export async function getChatResponse(
  messages: ChatMessage[], 
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: options.model || DEFAULT_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);
    
    // Return a fallback response if OpenAI API is unavailable
    const userMessage = messages.find(m => m.role === "user")?.content || "";
    return getFallbackResponse(userMessage);
  }
}

/**
 * Generate a fallback response when OpenAI API is unavailable
 * @param userMessage - The user's message
 * @returns A pre-defined response based on keywords in the user's message
 */
function getFallbackResponse(userMessage: string): string {
  const lowerCaseMessage = userMessage.toLowerCase();
  
  // Check for common export-related topics
  if (lowerCaseMessage.includes("documentation") || lowerCaseMessage.includes("document")) {
    return "For export operations, documentation is critical. You'll typically need commercial invoices, packing lists, certificates of origin, and bills of lading. Exvorta can help you generate these documents based on your specific product and destination market requirements.";
  } 
  
  if (lowerCaseMessage.includes("shipping") || lowerCaseMessage.includes("logistics")) {
    return "Shipping and logistics are key components of successful exporting. Based on your product and destination, you'll need to choose between air freight, ocean shipping, or land transportation. Exvorta can help you compare options and connect with reliable logistics providers.";
  }
  
  if (lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("finance")) {
    return "International payments involve several methods with varying levels of security. Letters of credit offer the most protection but are complex, while open accounts are simpler but riskier. Exvorta can help you understand the best payment terms for your specific trade relationship.";
  }
  
  if (lowerCaseMessage.includes("compliance") || lowerCaseMessage.includes("regulation")) {
    return "Export compliance varies significantly by product type and destination country. It's essential to understand both your home country's export regulations and your destination's import requirements. Exvorta's compliance tools can help you navigate these complex requirements.";
  }
  
  if (lowerCaseMessage.includes("market") || lowerCaseMessage.includes("research")) {
    return "Market research is the foundation of successful exporting. Exvorta provides data-driven insights on market demand, competition, pricing trends, and regulatory requirements for your specific products across global markets.";
  }
  
  // Check for additional topics
  if (lowerCaseMessage.includes("tariff") || lowerCaseMessage.includes("tax") || lowerCaseMessage.includes("duty")) {
    return "Import tariffs and duties vary by product category and country. Most countries use the Harmonized System (HS) code to determine applicable taxes. Exvorta's platform can help you identify the correct HS codes for your products and estimate duties for different markets.";
  }
  
  if (lowerCaseMessage.includes("insurance") || lowerCaseMessage.includes("risk management")) {
    return "Cargo insurance is essential for international shipments to protect against loss or damage. Typical coverage ranges from 110-120% of the commercial invoice value. Exvorta can help you assess appropriate insurance needs based on your product characteristics, route risks, and shipping method.";
  }
  
  if (lowerCaseMessage.includes("certification") || lowerCaseMessage.includes("standard")) {
    return "Product certifications vary by market and product type. Common certifications include CE (European conformity), FDA (US Food and Drug Administration), and ISO standards. Exvorta can help identify required certifications for your specific products and target markets.";
  }
  
  // Default response
  return "I'm here to help with your export questions about documentation, shipping logistics, payment methods, compliance regulations, market research, tariffs, certifications, insurance, and more. Could you provide more details about your specific export needs or the market you're targeting?";
}

/**
 * Generate a response for the customer service AI assistant
 * @param userMessage - The user's latest message
 * @param conversationHistory - Previous messages in the conversation
 * @returns The assistant's response
 */
export async function getCustomerServiceResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  // The system message sets the behavior and knowledge context for the assistant
  const systemMessage: ChatMessage = {
    role: "system",
    content: `You are an expert AI assistant for Exvorta, an AI-powered export-import logistics platform.
    Your role is to provide detailed, specific answers about Exvorta's features and international trade.

    Key Exvorta Features:
    1. Market Analysis:
    - AI-powered market demand forecasting
    - Competitor analysis in target markets
    - Price trend monitoring
    - Market entry risk assessment
    
    2. Documentation & Compliance:
    - Automated document generation
    - Real-time compliance checking
    - Country-specific regulation updates
    - Digital document storage
    
    3. Logistics Management:
    - Shipping route optimization
    - Real-time shipment tracking
    - Cost comparison tools
    - Customs clearance assistance
    
    4. Buyer Matching:
    - Verified international buyer database
    - AI-powered matching algorithm
    - Buyer verification reports
    - Secure communication channel
    
    5. Risk Management:
    - AI risk scoring
    - Insurance recommendations
    - Payment security options
    - Market volatility alerts

    Respond with specific, actionable information about how Exvorta's features address the user's needs.
    Always provide concrete examples and specific features rather than general statements.
    
    Be conversational, helpful, and concise. Focus on providing practical advice related to international 
    trade, export processes, or using Exvorta's features. If you don't know something, acknowledge it and 
    offer to connect the user with a human export specialist.`
  };

  // Combine the system message, conversation history, and new user message
  const userMsg: ChatMessage = { role: "user", content: userMessage };
  
  const messages: ChatMessage[] = [
    systemMessage,
    ...conversationHistory,
    userMsg
  ];

  return await getChatResponse(messages, {
    temperature: 0.7 // Slightly creative but still focused responses
  });
}