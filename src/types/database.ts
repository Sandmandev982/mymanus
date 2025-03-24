
export type Conversation = {
  id: string;
  title: string;
  preview: string | null;
  timestamp: string;
};

export type Template = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  prompt: string | null;
  response: string | null;
  timestamp: string;
};
