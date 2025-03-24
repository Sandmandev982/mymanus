
import { supabase } from "@/integrations/supabase/client";
import { Conversation, Template, Message } from "@/types/database";
import { toast } from "@/components/ui/use-toast";

// Conversation functions
export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching conversations:', error);
    toast({
      title: "Error",
      description: "Failed to load conversations",
      variant: "destructive",
    });
    return [];
  }
};

export const createConversation = async (title: string, preview: string): Promise<Conversation | null> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert([{ title, preview }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    toast({
      title: "Error",
      description: "Failed to create conversation",
      variant: "destructive",
    });
    return null;
  }
};

export const deleteConversation = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    toast({
      title: "Error",
      description: "Failed to delete conversation",
      variant: "destructive",
    });
    return false;
  }
};

// Template functions
export const getTemplates = async (): Promise<Template[]> => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching templates:', error);
    toast({
      title: "Error",
      description: "Failed to load templates",
      variant: "destructive",
    });
    return [];
  }
};

export const createTemplate = async (title: string, content: string): Promise<Template | null> => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .insert([{ title, content }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating template:', error);
    toast({
      title: "Error",
      description: "Failed to create template",
      variant: "destructive",
    });
    return null;
  }
};

// Message functions
export const getMessages = async (conversationId: string): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('timestamp', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    toast({
      title: "Error",
      description: "Failed to load messages",
      variant: "destructive",
    });
    return [];
  }
};

export const saveMessage = async (conversationId: string, prompt: string, response: string): Promise<Message | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ conversation_id: conversationId, prompt, response }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving message:', error);
    toast({
      title: "Error",
      description: "Failed to save message",
      variant: "destructive",
    });
    return null;
  }
};
