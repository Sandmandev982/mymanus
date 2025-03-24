
import React from 'react';
import { Menu, Settings, User, HelpCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/layout/Sidebar";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-4 py-3 bg-black border-b border-mymanus-silver/20 backdrop-blur-sm z-10">
      <div className="flex items-center">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="mr-2 text-mymanus-silver hover:text-mymanus-gold">
            <Menu size={20} />
          </Button>
        </SidebarTrigger>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-mymanus-gold">MyManus</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-mymanus-red/20 text-mymanus-red border border-mymanus-red/30">Beta</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-mymanus-silver hover:text-mymanus-gold">
          <HelpCircle size={20} />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-mymanus-silver hover:text-mymanus-gold">
          <Settings size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-mymanus-silver hover:text-mymanus-gold">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-accent border-mymanus-silver/20">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-mymanus-gold/10 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-mymanus-gold/10 cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-mymanus-gold/10 cursor-pointer text-mymanus-red">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
