"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  Layout, 
  BookOpen 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CourseVideoPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [pattern, setPattern] = useState<any>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/patterns/${id}`);
        setPattern(res.data);
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // --- SMART REDIRECT LOGIC ---
  const handleActionClick = () => {
    // Agar domain DSA hai toh Arena (Editor) mein bhejo
    if (pattern?.domain?.toUpperCase() === "DSA") {
      router.push(`/dashboard/problem/${id}?index=${activeLessonIndex}`);
    } else {
      // Baki saare domains (OS, DBMS, etc.) ke liye Theory/Quiz Lab mein bhejo
      router.push(`/dashboard/theory/${id}?index=${activeLessonIndex}`);
    }
  };

  // Safety Check: Loading state
  if (loading || !pattern) {
    return (
      <div className="h-screen bg-zinc-950 text-orange-500 flex items-center justify-center font-black italic uppercase animate-pulse tracking-widest">
        Initializing Masterclass...
      </div>
    );
  }

  const currentLesson = pattern.problems[activeLessonIndex];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      
      {/* 1. Header Section */}
      <header className="h-16 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-1.5 rounded-lg">
            <Layout className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-sm font-black uppercase italic tracking-tighter">
            {pattern.name} <span className="text-zinc-500 mx-2">|</span> 
            <span className="text-orange-500">{pattern.domain}</span>
          </h1>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-zinc-800 text-zinc-500 hover:text-white" 
          onClick={() => router.push(`/dashboard?domain=${pattern.domain}`)}
        >
          Exit Course
        </Button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* 2. Left Side: Video Player & Description */}
        <div className="flex-1 bg-black flex flex-col border-r border-zinc-900 overflow-y-auto">
          {/* YouTube Iframe Container */}
          <div className="aspect-video w-full bg-zinc-900 shadow-2xl relative">
            {currentLesson?.videoUrl ? (
              <iframe
                className="w-full h-full"
                src={currentLesson.videoUrl.replace("watch?v=", "embed/")}
                title="Lesson Video"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 gap-4">
                <PlayCircle className="h-20 w-20" />
                <p className="font-bold uppercase text-xs tracking-widest">Video content coming soon for this lesson</p>
              </div>
            )}
          </div>
          
          {/* Content Description */}
          <div className="p-8 md:p-12 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-[10px] font-black uppercase border-orange-500/20 text-orange-500 px-3">
                            {currentLesson?.difficulty || "Standard"}
                        </Badge>
                        <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
                            Module {activeLessonIndex + 1}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                        {currentLesson?.title || "Untitled Lesson"}
                    </h2>
                </div>

                <Button 
                  onClick={handleActionClick}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-7 rounded-2xl font-black italic uppercase text-lg shadow-xl shadow-orange-900/40 transition-all hover:scale-105"
                >
                  {pattern.domain === "DSA" ? "Start Solving" : "Start Lab"} 
                  <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
            </div>

            <div className="h-[1px] bg-zinc-900 w-full mb-8" />
            
            <div className="space-y-4 max-w-4xl">
                <h3 className="text-sm font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Lesson Overview
                </h3>
                <p className="text-zinc-400 leading-relaxed text-lg font-medium italic">
                    {currentLesson?.statement || "Watch the video carefully to understand the core concepts. Once you're confident with the logic, proceed to the interactive session."}
                </p>
            </div>
          </div>
        </div>

        {/* 3. Right Side: Curriculum Sidebar */}
        <div className="w-full lg:w-96 bg-zinc-950 flex flex-col overflow-y-auto border-l border-zinc-900">
          <div className="p-6 border-b border-zinc-900 bg-zinc-900/20 sticky top-0 z-10 backdrop-blur-md">
            <h3 className="font-black italic uppercase text-xs tracking-[0.2em] text-orange-500">
                Course Curriculum
            </h3>
            <p className="text-[10px] text-zinc-600 font-bold uppercase mt-1">
                {pattern.problems.length} Lessons • {pattern.domain} Roadmap
            </p>
          </div>

          <div className="flex flex-col">
            {pattern.problems.map((prob: any, index: number) => (
              <button
                key={index}
                onClick={() => setActiveLessonIndex(index)}
                className={`flex items-center gap-4 p-6 border-b border-zinc-900 transition-all text-left group ${
                    activeLessonIndex === index 
                    ? 'bg-orange-600/10 border-r-4 border-r-orange-600' 
                    : 'hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex-shrink-0">
                  {prob.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500 shadow-lg shadow-green-900/20" />
                  ) : (
                    <PlayCircle className={`h-6 w-6 transition-colors ${
                        activeLessonIndex === index ? 'text-orange-500' : 'text-zinc-800 group-hover:text-zinc-600'
                    }`} />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className={`text-sm font-black uppercase italic truncate tracking-tight ${
                      activeLessonIndex === index ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}>
                    {prob.title}
                  </p>
                  <p className="text-[9px] uppercase font-black text-zinc-700 mt-1 tracking-widest">
                    {prob.difficulty} Level
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}