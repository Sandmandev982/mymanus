
import React from 'react';
import { Trash2, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

type Conversation = {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
};

type ConversationHistoryProps = {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  selectedId?: string;
};

const ConversationHistory = ({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation, 
  selectedId 
}: ConversationHistoryProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="card-glass w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-mymanus-silver flex items-center">
          <MessageCircle size={16} className="mr-2" />
          Conversation History
        </h3>
      </div>
      
      <ScrollArea className="h-64">
        {conversations.length > 0 ? (
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
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-mymanus-lightsilver truncate">
                    {conversation.preview}
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
                          onDeleteConversation(conversation.id);
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
