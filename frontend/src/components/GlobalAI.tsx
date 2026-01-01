"use client";
import { useState } from "react";
import { Bot, Sparkles, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function GlobalAI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase">Babua AI</span>
            </div>
            <X className="h-4 w-4 cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex-1 p-4 text-xs text-zinc-400 italic">
            "Radhe Radhe! Main har page par aapke saath hoon. Kuch bhi poochiye..."
          </div>
          <div className="p-3 border-t border-zinc-800 flex gap-2">
            <Input className="bg-zinc-800 border-none h-8 text-xs" placeholder="Ask AI..." />
            <Button size="icon" className="h-8 w-8 bg-orange-600"><Send className="h-3 w-3" /></Button>
          </div>
        </div>
      )}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-2xl shadow-orange-900/40"
      >
        {isOpen ? <X /> : <Sparkles />}
      </Button>
    </div>
  );
}