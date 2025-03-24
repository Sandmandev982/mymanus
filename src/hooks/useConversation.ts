
import { useState, useEffect } from 'react';
import { createConversation, saveMessage, getMessages } from '@/utils/supabase';
import { Message } from '@/types/database';
import { toast } from "@/hooks/use-toast";

export const useConversation = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | undefined>(undefined);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const loadMessages = async (conversationId: string) => {
    try {
      const messages = await getMessages(conversationId);
      setCurrentMessages(messages);
      
      // If there are messages, show the last response in the output area
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        setOutput(lastMessage.response || '');
      } else {
        setOutput('');
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
  };

  const saveConversation = async (prompt: string, response: string) => {
    try {
      let conversationId = selectedConversation;
      
      // If no conversation is selected, create a new one
      if (!conversationId) {
        // Generate a title from the prompt (first few words)
        const title = prompt.split(' ').slice(0, 5).join(' ') + (prompt.length > 30 ? '...' : '');
        const preview = prompt.substring(0, 100) + (prompt.length > 100 ? '...' : '');
        
        const newConversation = await createConversation(title, preview);
        if (newConversation) {
          conversationId = newConversation.id;
          setSelectedConversation(conversationId);
        }
      }
      
      // Save the message
      if (conversationId) {
        await saveMessage(conversationId, prompt, response);
        
        // Reload messages to update the UI
        if (selectedConversation) {
          await loadMessages(selectedConversation);
        }
      }
    } catch (error) {
      console.error("Error saving conversation:", error);
      toast({
        title: "Error",
        description: "Failed to save conversation",
        variant: "destructive",
      });
    }
  };

  return {
    selectedConversation,
    currentMessages,
    output,
    setOutput,
    handleSelectConversation,
    saveConversation,
    loadMessages
  };
};
