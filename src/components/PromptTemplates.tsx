
import React, { useEffect, useState } from 'react';
import { BookMarked, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTemplates, createTemplate } from "@/utils/supabase";
import { Template } from "@/types/database";

type PromptTemplatesProps = {
  onSelectTemplate: (content: string) => void;
};

const PromptTemplates = ({ onSelectTemplate }: PromptTemplatesProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoading(true);
        const data = await getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Error loading templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleCreateTemplate = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please enter both title and content for the template.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newTemplate = await createTemplate(title, content);
      if (newTemplate) {
        setTemplates([newTemplate, ...templates]);
        setDialogOpen(false);
        setTitle("");
        setContent("");
        toast({
          title: "Template created",
          description: "Your template has been saved.",
        });
      }
    } catch (error) {
      console.error("Error creating template:", error);
    }
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
          onClick={() => setDialogOpen(true)}
          className="text-mymanus-silver hover:text-mymanus-gold"
        >
          <PlusCircle size={16} />
        </Button>
      </div>
      
      <ScrollArea className="h-64">
        {isLoading ? (
          <div className="space-y-2 animate-pulse p-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 rounded-md bg-muted">
                <div className="h-4 bg-mymanus-lightsilver/20 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-mymanus-lightsilver/20 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : templates.length > 0 ? (
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-black border-mymanus-gold/30 text-mymanus-silver">
          <DialogHeader>
            <DialogTitle className="text-mymanus-gold">Create New Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Template Title</Label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title"
                className="input-field"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Template Content</Label>
              <Textarea 
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your prompt template"
                className="input-field min-h-32 resize-y"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button className="btn-primary" onClick={handleCreateTemplate}>Save Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptTemplates;
