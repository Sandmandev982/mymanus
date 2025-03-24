
import React from 'react';
import PromptTemplates from '@/components/PromptTemplates';
import ConversationHistory from '@/components/ConversationHistory';
import { Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

type SidePanelProps = {
  onSelectTemplate: (content: string) => void;
  onSelectConversation: (id: string) => void;
  selectedConversationId?: string;
  onOpenSettings: () => void;
};

const SidePanel = ({ 
  onSelectTemplate, 
  onSelectConversation, 
  selectedConversationId,
  onOpenSettings 
}: SidePanelProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      {isMobile && (
        <Button 
          onClick={onOpenSettings}
          className="btn-secondary w-full mb-4"
        >
          <Settings size={16} className="mr-2" />
          Settings
        </Button>
      )}
      
      <PromptTemplates onSelectTemplate={onSelectTemplate} />
      
      <ConversationHistory 
        onSelectConversation={onSelectConversation}
        selectedId={selectedConversationId}
      />
    </div>
  );
};

export default SidePanel;
