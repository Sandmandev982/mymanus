
import React, { useRef } from 'react';
import { Copy, Download, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type OutputAreaProps = {
  content: string;
  isLoading?: boolean;
};

const OutputArea = ({ content, isLoading = false }: OutputAreaProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard",
        description: "The content has been copied to your clipboard.",
      });
    }
  };
  
  const handleDownload = () => {
    if (content) {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mymanus-output.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded",
        description: "The content has been downloaded as a text file.",
      });
    }
  };
  
  const handleFeedback = (positive: boolean) => {
    toast({
      title: positive ? "Positive feedback sent" : "Negative feedback sent",
      description: positive 
        ? "Thank you for your positive feedback!" 
        : "We'll work on improving based on your feedback.",
    });
  };
  
  return (
    <div className="card-glass w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-mymanus-silver">Output</h3>
        
        <div className="flex gap-2">
          {!isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleFeedback(true)}
                    disabled={!content || isLoading}
                    className="text-mymanus-silver hover:text-mymanus-gold"
                  >
                    <ThumbsUp size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Good response</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {!isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleFeedback(false)}
                    disabled={!content || isLoading}
                    className="text-mymanus-silver hover:text-mymanus-red"
                  >
                    <ThumbsDown size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Poor response</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleCopy}
                  disabled={!content || isLoading}
                  className="text-mymanus-silver hover:text-mymanus-gold"
                >
                  <Copy size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleDownload}
                  disabled={!content || isLoading}
                  className="text-mymanus-silver hover:text-mymanus-gold"
                >
                  <Download size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download as text</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div
        ref={contentRef}
        className={`bg-muted rounded-md p-4 min-h-64 w-full text-mymanus-silver overflow-auto whitespace-pre-wrap ${
          isLoading ? 'shimmer' : ''
        }`}
      >
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
          </div>
        ) : content ? (
          content
        ) : (
          <div className="text-mymanus-lightsilver text-center h-full flex items-center justify-center">
            <p>Your response will appear here.</p>
          </div>
        )}
      </div>
      
      {isMobile && content && !isLoading && (
        <div className="flex justify-center mt-3 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleFeedback(true)}
            className="text-mymanus-silver hover:text-mymanus-gold"
          >
            <ThumbsUp size={16} className="mr-1" />
            Good
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleFeedback(false)}
            className="text-mymanus-silver hover:text-mymanus-red"
          >
            <ThumbsDown size={16} className="mr-1" />
            Poor
          </Button>
        </div>
      )}
    </div>
  );
};

export default OutputArea;
