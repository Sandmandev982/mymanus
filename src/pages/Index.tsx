
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

// Sample conversation data
const sampleConversations = [
  {
    id: '1',
    title: 'Website Redesign Plan',
    preview: 'Create a detailed plan for redesigning our company website...',
    timestamp: '2h ago',
  },
  {
    id: '2',
    title: 'Marketing Email Draft',
    preview: 'Draft a marketing email for our new product launch...',
    timestamp: '5h ago',
  },
  {
    id: '3',
    title: 'Code Review Feedback',
    preview: 'Provide feedback on this pull request code...',
    timestamp: 'Yesterday',
  },
];

// Sample template data
const sampleTemplates = [
  {
    id: '1',
    title: 'Blog Post Outline',
    content: 'Create a detailed outline for a blog post about [TOPIC]. Include an introduction, at least 5 main sections with subpoints, and a conclusion.',
  },
  {
    id: '2',
    title: 'Code Documentation',
    content: 'Generate comprehensive documentation for the following code: [CODE]. Include function descriptions, parameters, return values, and usage examples.',
  },
  {
    id: '3',
    title: 'Marketing Email',
    content: 'Write a marketing email for [PRODUCT] targeting [AUDIENCE]. The email should highlight key benefits, include a compelling call-to-action, and be approximately 300 words.',
  },
];

const Index = () => {
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handlePromptSubmit = (prompt: string) => {
    setIsProcessing(true);
    setOutput(''); // Clear previous output
    
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
          setOutput(displayedResponse);
        } else {
          clearInterval(interval);
          setIsProcessing(false);
        }
      }, 50);
    }, 1000);
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
    // In a real app, we would load the conversation content here
    toast({
      title: "Conversation selected",
      description: "This would load the conversation in a real application.",
    });
  };
  
  const handleDeleteConversation = (id: string) => {
    // In a real app, we would delete the conversation here
    toast({
      title: "Conversation deleted",
      description: "This would delete the conversation in a real application.",
    });
  };
  
  const handleSelectTemplate = (content: string) => {
    // In a real app, we would set this content in the input area
    toast({
      title: "Template selected",
      description: "This would fill the input area with the template in a real application.",
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
                  <PromptTemplates 
                    templates={sampleTemplates} 
                    onSelectTemplate={handleSelectTemplate} 
                  />
                  
                  {/* Conversation History */}
                  <ConversationHistory 
                    conversations={sampleConversations}
                    onSelectConversation={handleSelectConversation}
                    onDeleteConversation={handleDeleteConversation}
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
