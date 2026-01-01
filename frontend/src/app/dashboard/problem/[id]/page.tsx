"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Send, ChevronLeft, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function ProblemArena() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const problemIndex = searchParams.get("index");
  
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [code, setCode] = useState("// Babua, yahan apna logic likho...\n\nfunction solve(input, k) {\n  return;\n}");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/patterns/${id}`);
        if (res.data.problems && problemIndex !== null) {
          setCurrentProblem(res.data.problems[Number(problemIndex)]);
        }
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
    };
    fetchDetails();
  }, [id, problemIndex]);

  const handleRun = () => {
    try {
      const testInput = [2, 1, 5, 1, 3, 2];
      const k = 3;
      const runUserCode = new Function('input', 'k', `${code} return solve(input, k);`);
      const result = runUserCode(testInput, k);
      
      if (result === 9) alert("Test Case Passed! ✅ Output: " + result);
      else alert("Wrong Output! ❌ Aaya: " + result + " | Chahiye: 9");
    } catch (err: any) {
      alert("Syntax Error: " + err.message);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      await axios.post(`http://localhost:8080/api/patterns/${id}/complete/${problemIndex}?userId=${savedUser.id}`);
      
      const xp = currentProblem.difficulty === 'Hard' ? 30 : currentProblem.difficulty === 'Medium' ? 20 : 10;
      savedUser.points = (savedUser.points || 0) + xp;
      localStorage.setItem("user", JSON.stringify(savedUser));

      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#f97316', '#ffffff'] });
      
      setTimeout(() => router.push(`/dashboard/pattern/${id}`), 2000);
    } catch (err) {
      alert("Submission Failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentProblem) return <div className="h-screen bg-black text-orange-500 flex items-center justify-center font-black italic animate-pulse">BOOTING ARENA...</div>;

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden text-zinc-300">
      {/* Premium Compact Navbar */}
      <nav className="h-12 border-b border-zinc-900 flex items-center justify-between px-6 bg-zinc-950/50">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/pattern/${id}`}><ChevronLeft className="h-4 w-4 hover:text-white transition-colors" /></Link>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-100">{currentProblem.title}</h2>
          <Badge className="bg-orange-500/10 text-orange-500 border-none text-[10px] px-2 py-0">{currentProblem.difficulty}</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleRun} className="text-zinc-400 hover:text-white text-xs uppercase font-black tracking-tighter">
            <Play className="h-3 w-3 mr-2 text-green-500" /> Run
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700 text-white px-4 h-8 text-xs font-black uppercase italic shadow-lg shadow-orange-900/20">
            {isSubmitting ? "Syncing..." : <><Send className="h-3 w-3 mr-2" /> Submit</>}
          </Button>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden">
        {/* Problem Description with Premium Typography */}
        <div className="w-5/12 border-r border-zinc-900 overflow-y-auto p-10 bg-zinc-950/30">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-8 border-l-4 border-orange-600 pl-4">The Challenge</h1>
          <p className="text-zinc-400 leading-relaxed text-lg mb-10 font-medium">{currentProblem.statement}</p>
          
          <div className="space-y-4">
            <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 block mb-2">Input Context</span>
              <code className="text-orange-500 font-mono">nums = [2, 1, 5, 1, 3, 2], k = 3</code>
            </div>
            {currentProblem.completed && (
              <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl flex items-center gap-3 text-green-500">
                <CheckCircle className="h-5 w-5" /> <span className="text-xs font-black uppercase italic">Victory Claimed</span>
              </div>
            )}
          </div>
        </div>

        {/* IDE Section */}
        <div className="w-7/12 bg-[#0d0d0d] relative">
          <div className="absolute top-4 right-6 z-10 text-[10px] font-black text-zinc-700 uppercase tracking-widest">JavaScript Engine v1.0</div>
          <Editor 
            height="100%" 
            defaultLanguage="javascript" 
            theme="vs-dark" 
            value={code} 
            onChange={(v) => setCode(v || "")} 
            options={{ 
                fontSize: 16, 
                minimap: { enabled: false }, 
                padding: { top: 40 },
                lineNumbers: "on",
                cursorSmoothCaretAnimation: "on",
                fontFamily: "'Fira Code', monospace"
            }} 
          />
        </div>
      </main>
    </div>
  );
}