
import React, { useState } from 'react';
import { Send, Paperclip, Trash2, BookmarkPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

type InputAreaProps = {
  onSubmit: (prompt: string, options?: any) => void;
  isProcessing?: boolean;
};

const InputArea = ({ onSubmit, isProcessing = false }: InputAreaProps) => {
  const [prompt, setPrompt] = useState('');
  
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
  
  const handleSaveTemplate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt before saving as template.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Template saved",
      description: "Your prompt has been saved as a template.",
    });
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
                    onClick={handleSaveTemplate}
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
    </div>
  );
};

export default InputArea;
