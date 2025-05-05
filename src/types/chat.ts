
export type MessageType = 'user' | 'jarvis';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}
