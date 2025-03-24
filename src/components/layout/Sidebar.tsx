
import React, { createContext, useContext, useState } from 'react';
import { cn } from "@/lib/utils";
import { 
  History, 
  BookMarked, 
  Settings, 
  Upload, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  Zap,
  MessageSquare
} from 'lucide-react';

type SidebarContextType = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
  setExpanded: () => {},
  toggle: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);
  
  const toggle = () => setExpanded(prev => !prev);
  
  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarTrigger = ({ children }: { children?: React.ReactNode }) => {
  const { toggle } = useContext(SidebarContext);
  
  return (
    <div onClick={toggle} className="cursor-pointer">
      {children}
    </div>
  );
};

export const Sidebar = () => {
  const { expanded, toggle } = useContext(SidebarContext);
  
  return (
    <div 
      className={cn(
        "h-screen fixed top-0 left-0 z-40 flex flex-col bg-black border-r border-mymanus-silver/20 transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between h-14 px-4 border-b border-mymanus-silver/20">
        {expanded ? (
          <h2 className="text-lg font-montserrat font-semibold text-mymanus-gold">MyManus</h2>
        ) : (
          <div className="w-full flex justify-center">
            <span className="text-xl font-bold text-mymanus-gold">M</span>
          </div>
        )}
        <button
          onClick={toggle}
          className="text-mymanus-silver hover:text-mymanus-gold transition-colors duration-200"
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1">
          <SidebarItem icon={MessageSquare} label="Prompts" active />
          <SidebarItem icon={BookMarked} label="Templates" />
          <SidebarItem icon={History} label="History" />
          <SidebarItem icon={Zap} label="Quick Actions" />
        </nav>
        
        <div className="mt-6 pt-4 border-t border-mymanus-silver/20">
          <h3 className={cn("px-2 mb-2 text-xs font-semibold text-mymanus-lightsilver", !expanded && "sr-only")}>Tools</h3>
          <nav className="space-y-1">
            <SidebarItem icon={Upload} label="Upload" />
            <SidebarItem icon={Download} label="Download" />
            <SidebarItem icon={Settings} label="Settings" />
          </nav>
        </div>
      </div>
    </div>
  );
};

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => {
  const { expanded } = useContext(SidebarContext);
  
  return (
    <div 
      className={cn(
        "sidebar-item",
        active && "sidebar-item-active",
        !expanded && "justify-center"
      )}
    >
      <Icon size={20} />
      {expanded && <span>{label}</span>}
    </div>
  );
};

export default Sidebar;
