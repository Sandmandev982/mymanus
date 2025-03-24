
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/layout/Sidebar';
import { Sidebar } from '@/components/layout/Sidebar';
import Header from '@/components/Header';
import InputArea from '@/components/InputArea';
import OutputArea from '@/components/OutputArea';
import SettingsPanel from '@/components/SettingsPanel';
import ConversationHistory from '@/components/ConversationHistory';
import PromptTemplates from '@/components/PromptTemplates';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { createConversation, saveMessage, getMessages } from '@/utils/supabase';
import { Message } from '@/types/database';

const Index = () => {
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | undefined>(undefined);
  const [currentInput, setCurrentInput] = useState('');
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const loadMessages = async (conversationId: string) => {
    try {
      const messages = await getMessages(conversationId);
      setCurrentMessages(messages);
      
      // If there are messages, show the last response in the output area
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        setOutput(lastMessage.response || '');
      } else {
        setOutput('');
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handlePromptSubmit = async (prompt: string) => {
    setIsProcessing(true);
    setCurrentInput(prompt);
    setOutput(''); // Clear previous output
    
    try {
      // Simulate API call to OpenManus
      setTimeout(async () => {
        // Generate a sample response based on the prompt
        const response = generateSampleResponse(prompt);
        
        // For demonstration: simulate streaming response
        let displayedResponse = '';
        const words = response.split(' ');
        
        const interval = setInterval(() => {
          if (words.length > 0) {
            displayedResponse += words.shift() + ' ';
            setOutput(displayedResponse);
          } else {
            clearInterval(interval);
            finishProcessing(prompt, displayedResponse);
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
  
  const finishProcessing = async (prompt: string, response: string) => {
    try {
      let conversationId = selectedConversation;
      
      // If no conversation is selected, create a new one
      if (!conversationId) {
        // Generate a title from the prompt (first few words)
        const title = prompt.split(' ').slice(0, 5).join(' ') + (prompt.length > 30 ? '...' : '');
        const preview = prompt.substring(0, 100) + (prompt.length > 100 ? '...' : '');
        
        const newConversation = await createConversation(title, preview);
        if (newConversation) {
          conversationId = newConversation.id;
          setSelectedConversation(conversationId);
        }
      }
      
      // Save the message
      if (conversationId) {
        await saveMessage(conversationId, prompt, response);
        
        // Reload messages to update the UI
        if (selectedConversation) {
          await loadMessages(selectedConversation);
        }
      }
    } catch (error) {
      console.error("Error saving conversation:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const generateSampleResponse = (prompt: string) => {
    // Very basic response generation for demo purposes
    if (prompt.toLowerCase().includes('code') || prompt.toLowerCase().includes('function')) {
      return `Here's a sample function to get you started:

\`\`\`javascript
function processData(input) {
  // Input validation
  if (!input || typeof input !== 'object') {
    throw new Error('Input must be a valid object');
  }
  
  // Process the data
  const result = {
    processed: true,
    timestamp: new Date().toISOString(),
    data: input
  };
  
  return result;
}
\`\`\`

This function takes an input object, validates it, and returns a processed result with metadata. You can extend this with specific logic for your use case.`;
    } else if (prompt.toLowerCase().includes('list') || prompt.toLowerCase().includes('steps')) {
      return `Here are the recommended steps:

1. **Analyze Current Situation**: Review existing assets and identify gaps
2. **Set Clear Objectives**: Define specific, measurable goals
3. **Develop Strategy**: Create a comprehensive approach
4. **Implement Tactics**: Execute specific actions
5. **Measure Results**: Track performance against objectives
6. **Iterate and Improve**: Make data-driven adjustments

Each step should be documented and shared with relevant stakeholders.`;
    } else {
      return `Based on your request, I recommend taking a structured approach that balances innovation with practicality. The key is to focus on user needs while maintaining alignment with business objectives.

Consider these aspects:
- Identify primary user pain points
- Prioritize solutions based on impact vs. effort
- Develop a phased implementation plan
- Establish clear metrics for success

This approach will help ensure that your project delivers meaningful results while managing scope effectively.`;
    }
  };
  
  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
  };
  
  const handleSelectTemplate = (content: string) => {
    setCurrentInput(content);
    // Auto-fill the input area by grabbing a reference to the InputArea component
    // For now, we'll just show a toast message
    toast({
      title: "Template selected",
      description: "Template content loaded into the input area.",
    });
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-black text-mymanus-silver">
        <Sidebar />
        
        <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-mymanus-gold mb-2 animate-fade-in">
                MyManus Interface
              </h1>
              <p className="text-mymanus-lightsilver mb-8 animate-fade-in">
                Simplify your workflow with OpenManus - enter your prompt below to get started.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Input Area */}
                  <InputArea onSubmit={handlePromptSubmit} isProcessing={isProcessing} />
                  
                  {/* Output Area */}
                  <OutputArea content={output} isLoading={isProcessing} />
                </div>
                
                <div className="space-y-6">
                  {/* Settings Button (for mobile) */}
                  {isMobile && (
                    <Button 
                      onClick={() => setSettingsPanelOpen(true)}
                      className="btn-secondary w-full mb-4"
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Button>
                  )}
                  
                  {/* Prompt Templates */}
                  <PromptTemplates onSelectTemplate={handleSelectTemplate} />
                  
                  {/* Conversation History */}
                  <ConversationHistory 
                    onSelectConversation={handleSelectConversation}
                    selectedId={selectedConversation}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
        
        {/* Settings Panel */}
        <SettingsPanel 
          isOpen={settingsPanelOpen} 
          onClose={() => setSettingsPanelOpen(false)} 
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
