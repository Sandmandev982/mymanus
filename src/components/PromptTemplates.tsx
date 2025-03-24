
import React from 'react';
import { BookMarked, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

type Template = {
  id: string;
  title: string;
  content: string;
};

type PromptTemplatesProps = {
  templates: Template[];
  onSelectTemplate: (content: string) => void;
};

const PromptTemplates = ({ templates, onSelectTemplate }: PromptTemplatesProps) => {
  const handleCreateTemplate = () => {
    toast({
      title: "Create Template",
      description: "Template creation functionality coming soon.",
    });
  };
  
  return (
    <div className="card-glass w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-mymanus-silver flex items-center">
          <BookMarked size={16} className="mr-2" />
          Prompt Templates
        </h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCreateTemplate}
          className="text-mymanus-silver hover:text-mymanus-gold"
        >
          <PlusCircle size={16} />
        </Button>
      </div>
      
      <ScrollArea className="h-64">
        {templates.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="p-3 rounded-md bg-muted hover:bg-mymanus-gold/10 cursor-pointer transition-colors duration-200"
                onClick={() => onSelectTemplate(template.content)}
              >
                <h4 className="text-sm font-medium text-mymanus-silver mb-1">
                  {template.title}
                </h4>
                <p className="text-xs text-mymanus-lightsilver line-clamp-2">
                  {template.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-mymanus-lightsilver">
            <p>No templates available.</p>
            <p className="text-sm mt-1">Create a template or save a prompt to see it here.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default PromptTemplates;
