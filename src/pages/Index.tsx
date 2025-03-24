
import React, { useCallback } from 'react';
import { SidebarProvider } from '@/components/layout/Sidebar';
import { Sidebar } from '@/components/layout/Sidebar';
import Header from '@/components/Header';
import SettingsPanel from '@/components/SettingsPanel';
import { useToast } from '@/hooks/use-toast';
import ChatArea from '@/components/ChatArea';
import SidePanel from '@/components/SidePanel';
import { useConversation } from '@/hooks/useConversation';
import { useOpenManus } from '@/hooks/useOpenManus';
import { useSettings } from '@/hooks/useSettings';

const Index = () => {
  const { toast } = useToast();
  
  // Custom hooks
  const { 
    selectedConversation, 
    output, 
    setOutput,
    handleSelectConversation, 
    saveConversation 
  } = useConversation();

  // Callback for updating output during processing
  const handleProcessingUpdate = useCallback((prompt: string, currentOutput: string) => {
    setOutput(currentOutput);
    return saveConversation(prompt, currentOutput);
  }, [saveConversation, setOutput]);

  const { 
    isProcessing, 
    currentInput, 
    setCurrentInput, 
    handlePromptSubmit 
  } = useOpenManus(handleProcessingUpdate);

  const { 
    settingsPanelOpen, 
    setSettingsPanelOpen 
  } = useSettings();
  
  const handleSelectTemplate = (content: string) => {
    setCurrentInput(content);
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
                <div className="lg:col-span-2">
                  <ChatArea 
                    handlePromptSubmit={handlePromptSubmit}
                    output={output}
                    isProcessing={isProcessing}
                  />
                </div>
                
                <div>
                  <SidePanel 
                    onSelectTemplate={handleSelectTemplate}
                    onSelectConversation={handleSelectConversation}
                    selectedConversationId={selectedConversation}
                    onOpenSettings={() => setSettingsPanelOpen(true)}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
        
        <SettingsPanel 
          isOpen={settingsPanelOpen} 
          onClose={() => setSettingsPanelOpen(false)} 
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
