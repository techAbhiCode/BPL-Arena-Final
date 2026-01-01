"use client";
import { useState, useEffect } from "react";
import { StickyNote, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";

export function GlobalNotes() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const pathname = usePathname(); // Yeh batayega hum abhi kis page par hain

  useEffect(() => {
    // Har page (URL) ke liye alag notes load honge
    const saved = localStorage.getItem(`global-notes-${pathname}`);
    setNotes(saved || "");
  }, [pathname]);

  const saveNotes = () => {
    localStorage.setItem(`global-notes-${pathname}`, notes);
    alert("Notes saved for this page! 📝");
  };

  return (
    <>
      <div className="fixed bottom-24 right-8 z-[90]">
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(!isOpen)}
          className={`h-10 w-10 rounded-full border-zinc-800 bg-zinc-900 shadow-xl ${isOpen ? 'text-orange-500' : 'text-zinc-400'}`}
        >
          <StickyNote className="h-5 w-5" />
        </Button>
      </div>

      {isOpen && (
        <div className="fixed top-20 right-8 w-80 h-[500px] bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-3xl z-[110] p-6 flex flex-col shadow-2xl animate-in fade-in zoom-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-orange-500 italic">Page Notes</h3>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={saveNotes} className="h-8 w-8 text-green-500"><Save className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)} className="h-8 w-8 text-zinc-500"><X className="h-4 w-4" /></Button>
            </div>
          </div>
          <Textarea 
            className="flex-1 bg-zinc-900/50 border-zinc-800 focus:border-orange-500 resize-none text-xs leading-relaxed"
            placeholder="Important points yahan likho..."
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
          />
        </div>
      )}
    </>
  );
}