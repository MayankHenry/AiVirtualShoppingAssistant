// OpenRouter API service for AI chat
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const openRouterApi = {
  chat: async (messages: ChatMessage[]): Promise<string> => {
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      throw error;
    }
  },

  // AI-powered product search and recommendations
  searchWithAI: async (query: string, products: any[]): Promise<string> => {
    const systemPrompt = `You are an AI shopping assistant for an e-commerce platform. You have access to the following products:
    
${products.map(p => `- ${p.title}: $${p.price} (Category: ${p.category}) - ${p.description.substring(0, 100)}...`).join('\n')}

Help the user find products based on their query. Provide specific product recommendations with prices and brief descriptions. Be helpful and conversational.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ];

    return await openRouterApi.chat(messages);
  }
};