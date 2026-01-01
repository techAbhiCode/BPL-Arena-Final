"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, BookOpen, CheckCircle, Zap, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function TheoryLab() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const index = searchParams.get("index");

  const [pattern, setPattern] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Theory for ID:", id);
        const res = await axios.get(`http://localhost:8080/api/patterns/${id}`);
        setPattern(res.data);
        if (res.data.problems && index !== null) {
          setCurrentModule(res.data.problems[Number(index)]);
        }
      } catch (err) {
        console.error("Theory Lab Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, index]);

  if (loading) return <div className="h-screen bg-black text-orange-500 flex items-center justify-center font-black animate-pulse">PREPARING LAB...</div>;
  if (!currentModule) return <div className="h-screen bg-black text-white flex items-center justify-center">No Content Found for this Module.</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-300 flex flex-col">
      {/* Header */}
      <nav className="h-12 border-b border-zinc-900 flex items-center justify-between px-6 bg-zinc-950/50 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/pattern/${id}`}><ChevronLeft className="h-4 w-4 hover:text-white" /></Link>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{currentModule.title}</h2>
        </div>
        <Badge className="bg-orange-600/10 text-orange-600 border-none text-[10px] uppercase font-black tracking-widest px-3">
          {pattern.domain} Lab
        </Badge>
      </nav>

      <main className="max-w-4xl mx-auto w-full p-8 md:p-20 space-y-16">
        {/* Theory Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
             <FileText className="text-orange-600 h-6 w-6" />
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 italic">Conceptual Deep Dive</h3>
          </div>
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
            {currentModule.title}
          </h1>
          <div className="h-1 w-20 bg-orange-600" />
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 leading-relaxed text-xl font-medium">
              {currentModule.statement || "Detailed theoretical explanation goes here. This module covers core principles and use-cases."}
            </p>
          </div>
        </section>

        {/* Knowledge Check Section */}
        <section className="bg-zinc-900/30 border border-zinc-800 p-10 rounded-[48px] shadow-2xl space-y-10">
          <div className="flex items-center gap-3">
            <Zap className="text-orange-500 h-6 w-6 fill-orange-500" />
            <h3 className="text-xl font-black italic uppercase tracking-tight text-white">Knowledge Check</h3>
          </div>

          <div className="space-y-6">
            <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest italic">Question:</p>
            <p className="text-white text-xl font-medium">Based on the lesson video and notes, can you validate the core logic of this {pattern.domain} module?</p>
            
            <div className="grid gap-4 mt-8">
                <Button variant="outline" className="justify-start h-16 rounded-2xl border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 font-bold text-left px-8">
                    A. Validated Logic and Implementation
                </Button>
                <Button variant="outline" className="justify-start h-16 rounded-2xl border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 font-bold text-left px-8">
                    B. Requires further review of the documentation
                </Button>
            </div>
          </div>

          <Button 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-8 rounded-[24px] font-black italic uppercase text-lg shadow-2xl shadow-orange-900/20"
            onClick={() => {
                alert("Concept Mastered! XP added.");
                router.push(`/dashboard/pattern/${id}`);
            }}
          >
            Complete Module <CheckCircle className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>
    </div>
  );
}