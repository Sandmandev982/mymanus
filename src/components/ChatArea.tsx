
import React from 'react';
import InputArea from '@/components/InputArea';
import OutputArea from '@/components/OutputArea';

type ChatAreaProps = {
  handlePromptSubmit: (prompt: string) => void;
  output: string;
  isProcessing: boolean;
};

const ChatArea = ({ handlePromptSubmit, output, isProcessing }: ChatAreaProps) => {
  return (
    <div className="space-y-6">
      <InputArea onSubmit={handlePromptSubmit} isProcessing={isProcessing} />
      <OutputArea content={output} isLoading={isProcessing} />
    </div>
  );
};

export default ChatArea;
