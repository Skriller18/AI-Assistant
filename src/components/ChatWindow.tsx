
import React, { useEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import { ScrollArea } from './ui/scroll-area';

const ChatWindow: React.FC = () => {
  const { messages } = useChatContext();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4 pb-16 overflow-hidden">
      <div className="flex flex-col space-y-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatWindow;
