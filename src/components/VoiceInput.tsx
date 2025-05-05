
import React, { useEffect } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { Mic, Send, MessageCircle } from 'lucide-react';
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
        // Use type assertion to handle the different browser implementations
        const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognition = new SpeechRecognitionAPI();
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
    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
      <div className="flex items-center space-x-2 justify-center">
        {transcript.trim() && (
          <div className="relative flex-1 max-w-sm mx-auto">
            <div className="min-h-[40px] rounded-full bg-background/60 backdrop-blur-lg px-4 py-2 text-sm text-foreground border border-primary/10 shadow-lg">
              {transcript}
            </div>
          </div>
        )}
        
        <Button
          onClick={handleMicClick}
          size="icon"
          className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} rounded-full h-14 w-14 shadow-lg relative z-10`}
          disabled={isLoading}
        >
          <Mic className="h-6 w-6" />
          {isListening && (
            <span className="absolute inset-0 rounded-full animate-pulse-ring border-2 border-red-500"></span>
          )}
        </Button>
        
        {transcript.trim() && (
          <Button
            onClick={handleSendClick}
            size="icon"
            className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-lg"
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
