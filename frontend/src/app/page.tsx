"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, LayoutDashboard, Trophy, LogOut, BookOpen, Code, Server, Cpu, Database, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

// Domains shown on the home page (standardized ids)
const DOMAINS = [
  { id: "DSA", name: "DSA", desc: "Pattern-based, interview-focused solving.", icon: <Code />, color: "text-blue-500" },
  { id: "SYSTEM DESIGN", name: "System Design", desc: "Beginner → Advanced Architecture.", icon: <Server />, color: "text-purple-500" },
  { id: "LLD", name: "Low Level Design", desc: "Master SOLID, Design Patterns & LLD.", icon: <LayoutDashboard />, color: "text-green-500" },
  { id: "OS", name: "Operating Systems", desc: "Core concepts, Process & Memory.", icon: <Cpu />, color: "text-red-500" },
  { id: "NETWORKS", name: "Computer Networks", desc: "TCP/IP, HTTP & Network Layers.", icon: <Globe />, color: "text-cyan-500" },
  { id: "DBMS", name: "DBMS", desc: "SQL, NoSQL & Schema Design.", icon: <Database />, color: "text-yellow-500" },
  { id: "AI", name: "AI / ML Fundamentals", desc: "Applied focus on Math & Models.", icon: <Brain />, color: "text-orange-500" }
];

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-orange-500/30">
      {/* Dynamic Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black italic tracking-tighter uppercase">BPL <span className="text-orange-600">Arena</span></h1>
        
        <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
          <Link href="/" className="text-orange-500">Home</Link>
          <Link href="/dashboard/leaderboard" className="text-zinc-400 hover:text-white transition-colors">Leaderboard</Link>
          
          {user ? (
            <div className="flex items-center gap-4 border-l border-zinc-800 pl-6">
              <span className="text-zinc-500">Hi, {user.username}</span>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-zinc-500 hover:text-red-500"><LogOut className="h-4 w-4" /></Button>
            </div>
          ) : (
            <Link href="/login"><Button variant="outline" size="sm" className="border-zinc-800">Login</Button></Link>
          )}
        </div>
      </nav>

      <main className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-orange-600/10 blur-[120px] -z-10 rounded-full" />
        
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-6 leading-none">
          Babua <br /> <span className="text-orange-600">League</span>
        </h1>
        
        <p className="max-w-xl text-zinc-500 text-lg mb-12">
          The ultimate playground to master DSA patterns and climb the leaderboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {user ? (
            <Link href="/dashboard?domain=all">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-8 text-xl font-black uppercase italic rounded-2xl shadow-2xl shadow-orange-900/20 group transition-all">
                Go to Dashboard <LayoutDashboard className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/signup">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-8 text-xl font-black uppercase italic rounded-2xl transition-all">
                  Join the League
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-zinc-800 px-10 py-8 text-xl font-black uppercase italic rounded-2xl hover:bg-zinc-900">
                  Login to Arena
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>

      {/* Domains Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DOMAINS.map((domain, i) => (
          <Link 
            key={i} 
            href={user ? `/dashboard?domain=${domain.id}` : "/login"} 
            className="group"
          >
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[32px] hover:border-orange-500/50 transition-all duration-300 h-full flex flex-col justify-between hover:bg-zinc-900/60">
              <div>
                <div className={`p-4 bg-zinc-800 w-fit rounded-2xl mb-6 group-hover:scale-110 transition-transform ${domain.color}`}>
                  {domain.icon}
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">{domain.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{domain.desc}</p>
              </div>
              <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      <Footer />
    </div>
  );
}

function Badge({ children, className }: any) {
    return <span className={`px-2 py-0.5 rounded text-white font-bold uppercase tracking-widest ${className}`}>{children}</span>;
}

function Globe(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/><path d="M12 2a14.5 14.5 0 0 1 0 20"/></svg> }