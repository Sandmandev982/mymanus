
import React, { useState } from 'react';
import { Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [expanded, setExpanded] = useState({
    model: true,
    generation: true,
    advanced: false,
  });
  
  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div 
      className={cn(
        "fixed inset-y-0 right-0 w-80 bg-black border-l border-mymanus-silver/20 shadow-lg p-4 z-50 transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-mymanus-gold flex items-center">
          <Settings size={18} className="mr-2" />
          Settings
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-mymanus-silver hover:text-mymanus-red"
        >
          <X size={18} />
        </Button>
      </div>
      
      <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-6rem)] pr-2">
        {/* Model Settings */}
        <div className="border-b border-mymanus-silver/20 pb-4">
          <button 
            onClick={() => toggleSection('model')}
            className="flex items-center justify-between w-full text-left mb-2 text-mymanus-silver hover:text-mymanus-gold"
          >
            <h3 className="text-md font-medium">Model Settings</h3>
            {expanded.model ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expanded.model && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="model-select" className="text-mymanus-silver">Model</Label>
                <Select defaultValue="gpt-4">
                  <SelectTrigger id="model-select" className="input-field">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-2">Claude 2</SelectItem>
                    <SelectItem value="llama-2">Llama 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="stream-toggle" className="text-mymanus-silver">Stream Response</Label>
                <Switch id="stream-toggle" defaultChecked />
              </div>
            </div>
          )}
        </div>
        
        {/* Generation Settings */}
        <div className="border-b border-mymanus-silver/20 pb-4">
          <button 
            onClick={() => toggleSection('generation')}
            className="flex items-center justify-between w-full text-left mb-2 text-mymanus-silver hover:text-mymanus-gold"
          >
            <h3 className="text-md font-medium">Generation Settings</h3>
            {expanded.generation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expanded.generation && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature-slider" className="text-mymanus-silver">Temperature: 0.7</Label>
                </div>
                <Slider 
                  id="temperature-slider" 
                  defaultValue={[0.7]} 
                  max={2} 
                  step={0.1} 
                  className="w-full" 
                />
                <p className="text-xs text-mymanus-lightsilver">
                  Controls randomness: Lower values are more deterministic, higher values more creative.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-tokens" className="text-mymanus-silver">Max Tokens</Label>
                <Input 
                  id="max-tokens" 
                  type="number" 
                  defaultValue={256} 
                  className="input-field" 
                />
                <p className="text-xs text-mymanus-lightsilver">
                  Maximum number of tokens to generate.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Advanced Settings */}
        <div>
          <button 
            onClick={() => toggleSection('advanced')}
            className="flex items-center justify-between w-full text-left mb-2 text-mymanus-silver hover:text-mymanus-gold"
          >
            <h3 className="text-md font-medium">Advanced Settings</h3>
            {expanded.advanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expanded.advanced && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <Label htmlFor="debug-mode" className="text-mymanus-silver">Debug Mode</Label>
                <Switch id="debug-mode" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key" className="text-mymanus-silver">API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="Enter API key" 
                  className="input-field" 
                />
              </div>
              
              <Button className="btn-secondary w-full">
                Save Settings
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
