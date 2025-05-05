
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { MessageCircle } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isJarvis = message.type === 'jarvis';

  return (
    <div
      className={cn(
        'flex w-full animate-fade-in transition-all duration-300',
        isJarvis ? 'justify-start' : 'justify-end'
      )}
    >
      <div
        className={cn(
          'max-w-[85%] flex items-center gap-2',
          isJarvis ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        {isJarvis && (
          <div className="relative flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
              <span className="text-xs font-semibold text-primary-foreground">J</span>
            </div>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
          </div>
        )}
        
        <div
          className={cn(
            'rounded-3xl px-4 py-3 shadow-md backdrop-blur-sm',
            isJarvis 
              ? 'bg-secondary/80 text-secondary-foreground rounded-tl-sm' 
              : 'bg-primary/20 backdrop-blur-lg rounded-tr-sm border border-primary/10'
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
