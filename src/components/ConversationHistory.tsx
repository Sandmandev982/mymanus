
import React, { useEffect, useState } from 'react';
import { Trash2, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { getConversations, deleteConversation } from "@/utils/supabase";
import { Conversation } from "@/types/database";
import { toast } from "@/components/ui/use-toast";

type ConversationHistoryProps = {
  onSelectConversation: (id: string) => void;
  selectedId?: string;
};

const ConversationHistory = ({ 
  onSelectConversation, 
  selectedId 
}: ConversationHistoryProps) => {
  const isMobile = useIsMobile();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setIsLoading(true);
        const data = await getConversations();
        setConversations(data);
      } catch (error) {
        console.error("Error loading conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const handleDeleteConversation = async (id: string) => {
    try {
      const success = await deleteConversation(id);
      if (success) {
        setConversations(conversations.filter(conv => conv.id !== id));
        toast({
          title: "Conversation deleted",
          description: "The conversation has been removed.",
        });
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="card-glass w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-mymanus-silver flex items-center">
          <MessageCircle size={16} className="mr-2" />
          Conversation History
        </h3>
      </div>
      
      <ScrollArea className="h-64">
        {isLoading ? (
          <div className="space-y-2 animate-pulse p-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-2 rounded-md bg-muted">
                <div className="h-4 bg-mymanus-lightsilver/20 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-mymanus-lightsilver/20 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : conversations.length > 0 ? (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`flex items-start justify-between p-2 rounded-md transition-colors duration-200 ${
                  selectedId === conversation.id 
                    ? 'bg-mymanus-gold/10 border border-mymanus-gold/30' 
                    : 'hover:bg-muted'
                }`}
              >
                <div 
                  className="flex-1 cursor-pointer" 
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium text-mymanus-silver truncate">
                      {conversation.title}
                    </h4>
                    <span className="text-xs text-mymanus-lightsilver">
                      {formatTimestamp(conversation.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-mymanus-lightsilver truncate">
                    {conversation.preview || "No preview available"}
                  </p>
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(conversation.id);
                        }}
                        className="ml-2 mt-1 text-mymanus-lightsilver hover:text-mymanus-red"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete conversation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-mymanus-lightsilver">
            <p>No conversation history yet.</p>
            <p className="text-sm mt-1">Start a new conversation to see it here.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ConversationHistory;
