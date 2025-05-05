
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, MessageType } from '../types/chat';
import { toast } from '@/components/ui/sonner';

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, type: MessageType) => void;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  setTranscript: (text: string) => void;
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
  webhookUrl?: string;
}

export const ChatProvider = ({ children, webhookUrl = 'https://echo.zuplo.io/' }: ChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello, I'm Jarvis. How may I assist you today?",
      type: 'jarvis',
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (content: string, type: MessageType) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const startListening = () => {
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage(content, 'user');
    
    // Clear transcript
    setTranscript('');
    
    // Send to webhook
    setIsLoading(true);
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();
      
      // Add Jarvis response
      setTimeout(() => {
        addMessage(data.message || 'I received your message. How can I help further?', 'jarvis');
        setIsLoading(false);
      }, 1000); // Slight delay for a more natural conversation feel
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to communicate with Jarvis. Please try again.');
      setIsLoading(false);
    }
  };

  const value = {
    messages,
    addMessage,
    isListening,
    startListening,
    stopListening,
    transcript,
    setTranscript,
    sendMessage,
    isLoading,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
