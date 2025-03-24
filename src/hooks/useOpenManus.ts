
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { generateSampleResponse } from '@/utils/responseGenerator';

export const useOpenManus = (onProcessingComplete: (prompt: string, response: string) => Promise<void>) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentInput, setCurrentInput] = useState('');

  const handlePromptSubmit = async (prompt: string) => {
    setIsProcessing(true);
    setCurrentInput(prompt);
    
    try {
      // Simulate API call to OpenManus
      setTimeout(() => {
        // Generate a sample response based on the prompt
        const response = generateSampleResponse(prompt);
        
        // For demonstration: simulate streaming response
        let displayedResponse = '';
        const words = response.split(' ');
        
        const interval = setInterval(() => {
          if (words.length > 0) {
            displayedResponse += words.shift() + ' ';
            onProcessingComplete(prompt, displayedResponse);
          } else {
            clearInterval(interval);
            setIsProcessing(false);
          }
        }, 50);
      }, 1000);
    } catch (error) {
      console.error("Error processing prompt:", error);
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "An error occurred while processing your prompt.",
        variant: "destructive",
      });
    }
  };
  
  return {
    isProcessing,
    currentInput,
    setCurrentInput,
    handlePromptSubmit
  };
};
