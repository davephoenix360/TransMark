import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { LRUCache } from 'lru-cache';
import * as dotenv from 'dotenv'

dotenv.config()

const systemPrompt = `
You are a knowledgeable assistant. Answer questions based on the context or data provided to you. 
Ensure your responses are accurate and relevant to the given information. How can I help you today?
`;


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
});

// Initialize a cache
const cache = new LRUCache<string, string>({
  max: 100, // Maximum number of items to store in the cache
  ttl: 1000 * 60 * 5, // Time to live: 5 minutes
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    console.log(data)

    // Define the structure of each message
    type Message = {
      role: "system" | "user" | "assistant";
      content: string;
    };

    const messages: Message[] = [
      {
        role: "system",
        content: systemPrompt
      },
      ...data,
    ];

    const result = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile", // Consider using a faster model if available
      messages: messages,
      max_tokens: 150, // Limit the response length
      temperature: 0.7, // Adjust for faster responses (lower value) or more creative responses (higher value)
    });

    return new NextResponse(result.choices[0].message.content);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};