
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { Avatar } from './ui/avatar';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isJarvis = message.type === 'jarvis';

  return (
    <div
      className={cn(
        'flex w-full mb-4 animate-fade-in',
        isJarvis ? 'justify-start' : 'justify-end'
      )}
    >
      <div
        className={cn(
          'flex max-w-[80%]',
          isJarvis ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        {isJarvis && (
          <div className="mr-2 flex-shrink-0">
            <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
              <span className="text-xs font-semibold">J</span>
            </Avatar>
          </div>
        )}
        
        <div
          className={cn(
            'rounded-2xl px-4 py-2 glass-panel',
            isJarvis ? 'rounded-tl-sm bg-secondary' : 'rounded-tr-sm bg-primary/20'
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
