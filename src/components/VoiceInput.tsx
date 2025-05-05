
import React, { useEffect } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { Mic, Send } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/components/ui/sonner';

const VoiceInput: React.FC = () => {
  const { 
    isListening, 
    startListening, 
    stopListening, 
    transcript, 
    setTranscript,
    sendMessage,
    isLoading
  } = useChatContext();

  // Set up speech recognition
  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    if (isListening) {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const result = event.results[current];
          const transcriptText = result[0].transcript;
          setTranscript(transcriptText);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          toast.error('Failed to recognize speech. Please try again.');
          stopListening();
        };

        recognition.start();
      } else {
        toast.error('Speech recognition is not supported in this browser.');
        stopListening();
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, setTranscript, stopListening]);

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

  const handleSendClick = () => {
    if (transcript.trim()) {
      sendMessage(transcript);
    }
  };

  return (
    <div className="border-t border-border px-4 py-3 glass-panel rounded-b-lg">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <div className="min-h-[40px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
            {transcript || (isListening ? 'Listening...' : 'Click the mic to speak...')}
          </div>
        </div>
        
        <Button
          onClick={handleMicClick}
          size="icon"
          className={`rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} relative`}
          disabled={isLoading}
        >
          <Mic className="h-5 w-5" />
          {isListening && (
            <span className="absolute inset-0 rounded-full animate-pulse-ring border-2 border-red-500"></span>
          )}
        </Button>
        
        {transcript.trim() && (
          <Button
            onClick={handleSendClick}
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;
