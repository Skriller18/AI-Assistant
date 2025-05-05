
import React, { useEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { Mic, Speaker } from 'lucide-react';
import { Button } from './ui/button';
import CurrentMessage from './CurrentMessage';

const VoiceInterface: React.FC = () => {
  const { 
    isListening, 
    startListening, 
    stopListening, 
    transcript, 
    sendMessage,
    isLoading,
    messages,
    isSpeaking
  } = useChatContext();
  
  const lastMessage = messages[messages.length - 1];
  const isJarvisLastMessage = lastMessage?.type === 'jarvis';
  
  const handleMicClick = () => {
    if (isListening) {
      stopListening();
      if (transcript.trim()) {
        sendMessage(transcript);
      }
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Voice Visualization Element */}
      <div className="relative flex items-center justify-center mb-8 w-48 h-48">
        <div className={`absolute inset-0 rounded-full bg-primary/5 ${isSpeaking ? 'animate-pulse-slow' : ''}`}></div>
        <div className={`absolute inset-4 rounded-full bg-primary/10 ${isSpeaking ? 'animate-pulse-medium' : ''}`}></div>
        <div className={`absolute inset-8 rounded-full bg-primary/20 ${isSpeaking ? 'animate-pulse-fast' : ''}`}></div>
        <div className="absolute inset-12 rounded-full bg-background/70 backdrop-blur-md flex items-center justify-center">
          {isSpeaking ? (
            <Speaker className="h-14 w-14 text-primary animate-pulse" />
          ) : (
            <span className="text-3xl font-bold text-primary-foreground">J</span>
          )}
        </div>
      </div>
      
      {/* Current Message Display */}
      <CurrentMessage />
      
      {/* Microphone Button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Button
          onClick={handleMicClick}
          size="icon"
          className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} rounded-full h-16 w-16 shadow-lg relative z-10`}
          disabled={isLoading || isSpeaking}
        >
          <Mic className="h-8 w-8" />
          {isListening && (
            <span className="absolute inset-0 rounded-full animate-pulse-ring border-2 border-red-500"></span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default VoiceInterface;
