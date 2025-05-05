
import React from 'react';
import ChatWindow from './ChatWindow';
import VoiceInput from './VoiceInput';
import { useChatContext } from '@/contexts/ChatContext';
import { Loader2 } from 'lucide-react';

const JarvisInterface: React.FC = () => {
  const { isLoading } = useChatContext();

  return (
    <div className="flex flex-col h-full relative rounded-lg glass-panel overflow-hidden border border-secondary/50 shadow-lg">
      <div className="bg-secondary/50 px-4 py-3 flex items-center">
        <h1 className="text-lg font-semibold text-primary-foreground flex items-center">
          <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-glow inline-block"></span>
          JARVIS
        </h1>
        {isLoading && (
          <div className="ml-auto">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
      </div>
      <ChatWindow />
      <VoiceInput />
    </div>
  );
};

export default JarvisInterface;
