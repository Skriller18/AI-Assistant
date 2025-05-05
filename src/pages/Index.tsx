
import { ChatProvider } from "@/contexts/ChatContext";
import JarvisInterface from "@/components/JarvisInterface";

const Index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/90 p-4">
      <div className="w-full max-w-sm h-[600px] relative">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full z-0"></div>
        <ChatProvider>
          <JarvisInterface />
        </ChatProvider>
      </div>
    </div>
  );
};

export default Index;
