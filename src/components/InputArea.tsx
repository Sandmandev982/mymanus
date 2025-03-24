
import React, { useState } from 'react';
import { Send, Paperclip, Trash2, BookmarkPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTemplate } from "@/utils/supabase";

type InputAreaProps = {
  onSubmit: (prompt: string, options?: any) => void;
  isProcessing?: boolean;
};

const InputArea = ({ onSubmit, isProcessing = false }: InputAreaProps) => {
  const [prompt, setPrompt] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateTitle, setTemplateTitle] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(prompt);
  };
  
  const handleSaveTemplate = async () => {
    if (!templateTitle.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for your template.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const newTemplate = await createTemplate(templateTitle, prompt);
      if (newTemplate) {
        setSaveDialogOpen(false);
        setTemplateTitle("");
        toast({
          title: "Template saved",
          description: "Your prompt has been saved as a template.",
        });
      }
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };
  
  const handleClear = () => {
    setPrompt('');
  };
  
  const handleFileUpload = () => {
    toast({
      title: "File upload",
      description: "File upload functionality coming soon.",
    });
  };
  
  return (
    <div className="card-glass w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="prompt" className="block text-sm font-medium text-mymanus-silver mb-1">
            Enter your prompt
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What would you like OpenManus to help you with?"
            className="input-field min-h-32 w-full resize-y"
            disabled={isProcessing}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={handleFileUpload}
                    disabled={isProcessing}
                    className="text-mymanus-silver hover:text-mymanus-gold"
                  >
                    <Paperclip size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attach file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={handleClear}
                    disabled={isProcessing || !prompt}
                    className="text-mymanus-silver hover:text-mymanus-red"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear prompt</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => {
                      if (!prompt.trim()) {
                        toast({
                          title: "Empty prompt",
                          description: "Please enter a prompt before saving as template.",
                          variant: "destructive",
                        });
                        return;
                      }
                      setSaveDialogOpen(true);
                    }}
                    disabled={isProcessing || !prompt}
                    className="text-mymanus-silver hover:text-mymanus-gold"
                  >
                    <BookmarkPlus size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save as template</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Button 
            type="submit" 
            className="btn-primary"
            disabled={isProcessing || !prompt}
          >
            <Send size={16} className="mr-2" />
            {isProcessing ? 'Processing...' : 'Submit'}
          </Button>
        </div>
      </form>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="bg-black border-mymanus-gold/30 text-mymanus-silver">
          <DialogHeader>
            <DialogTitle className="text-mymanus-gold">Save Prompt as Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="template-title">Template Title</Label>
              <Input 
                id="template-title"
                value={templateTitle}
                onChange={(e) => setTemplateTitle(e.target.value)}
                placeholder="Enter a descriptive title"
                className="input-field"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-preview">Prompt Content</Label>
              <div className="p-3 bg-muted/30 rounded text-sm max-h-32 overflow-auto">
                {prompt}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
            <Button className="btn-primary" onClick={handleSaveTemplate}>Save Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InputArea;
