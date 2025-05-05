
import React, { useEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

const CurrentMessage: React.FC = () => {
  const { messages, transcript, isListening, isSpeaking } = useChatContext();
  const lastMessage = messages[messages.length - 1];
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, transcript]);

  return (
    <div className="w-full max-w-md px-4 py-2 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isListening && transcript ? (
          <motion.div
            key="transcript"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="bg-background/40 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-primary/10 overflow-hidden">
              <p className="text-primary-foreground">{transcript}</p>
            </div>
          </motion.div>
        ) : isSpeaking && lastMessage?.type === 'jarvis' ? (
          <motion.div
            key={lastMessage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="bg-secondary/50 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg overflow-hidden">
              <p className="text-secondary-foreground">{lastMessage.content}</p>
            </div>
          </motion.div>
        ) : lastMessage && !isListening ? (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <p className="text-primary-foreground/60 text-sm">
              Press the mic button to talk with Jarvis
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div ref={contentRef} />
    </div>
  );
};

export default CurrentMessage;
