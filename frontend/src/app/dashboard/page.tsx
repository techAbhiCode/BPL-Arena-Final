"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, ChevronRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-black text-white flex items-center justify-center font-black animate-pulse uppercase">Syncing Arena...</div>}>
      <DomainSpecificDashboard />
    </Suspense>
  );
}

function DomainSpecificDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedDomain = searchParams.get("domain"); // URL se domain uthayega

  const [patterns, setPatterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(savedUser));

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/patterns");
        const allData = res.data;

        if (!selectedDomain || selectedDomain.toLowerCase() === "all") {
          // Agar 'Go to Dashboard' click kiya (all mode)
          setPatterns(allData);
        } else {
          const sDomain = selectedDomain.toUpperCase().trim();
          
          const filtered = allData.filter((p: any) => {
            const pDomain = p.domain?.toUpperCase().trim();
            
            // --- SMART MATCHING LOGIC ---
            return (
              pDomain === sDomain || 
              (sDomain.includes("OPERATING") && pDomain === "OS") ||
              (sDomain.includes("NETWORK") && pDomain === "NETWORKS") ||
              (sDomain.includes("LOW LEVEL") && pDomain === "LLD") ||
              (sDomain.includes("AI") && pDomain === "AI")
            );
          });
          setPatterns(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDomain, router]);

  if (loading) return <div className="h-screen bg-black text-orange-600 flex items-center justify-center font-black animate-pulse">FILTERING DOMAIN...</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white border border-zinc-900 rounded-full px-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
              </Button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
                {selectedDomain ? `${selectedDomain} Arena` : "The Learning Hub"}
              </h1>
              <p className="text-zinc-500 mt-4 text-lg font-medium italic">
                {selectedDomain 
                  ? `Focusing on ${selectedDomain} excellence.` 
                  : "Please select a domain from the home screen to see your specialized roadmap."}
              </p>
            </div>
            
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[24px] flex items-center gap-4 shadow-2xl">
              <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Babua Status</p>
                  <p className="text-2xl font-black text-orange-500 italic leading-none">{user?.points || 0} XP</p>
              </div>
              <div className="h-12 w-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-900/40">
                  <Zap className="text-white h-6 w-6 fill-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {patterns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {patterns.map((p: any) => (
              <Link href={`/dashboard/pattern/${p.id}`} key={p.id} className="group">
                <Card className="bg-zinc-900/20 border-zinc-800 hover:border-orange-500/50 transition-all duration-300 h-full rounded-[32px] overflow-hidden group-hover:bg-zinc-900/40">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-4">
                      <Badge className="bg-zinc-800 text-zinc-500 border-none px-3 py-1 text-[10px] font-black uppercase italic tracking-widest">
                        Module {patterns.indexOf(p) + 1}
                      </Badge>
                      <span className="text-zinc-800 font-black text-2xl italic group-hover:text-zinc-700">0{patterns.indexOf(p) + 1}</span>
                    </div>
                    <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-orange-500 transition-colors">
                      {p.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                            <span>Mastery Status</span>
                            <span className="text-zinc-400">{Math.round(p.masteryScore)}%</span>
                        </div>
                        <Progress value={p.masteryScore} className="h-1.5 bg-zinc-800" />
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[9px] font-bold">{p.totalProblems} Lessons</Badge>
                        </div>
                        <div className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all flex items-center font-black uppercase italic text-xs tracking-tighter">
                            Open <ChevronRight className="ml-1 h-4 w-4" />
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          /* "PICK A PATH" STATE (If no domain or no patterns found) */
          <div className="py-20 border-2 border-dashed border-zinc-900 rounded-[48px] flex flex-col items-center justify-center text-center px-6">
            <LayoutGrid className="h-16 w-16 text-zinc-800 mb-6" />
            <h3 className="text-2xl font-black text-zinc-600 uppercase italic mb-2">No Specific Track Active</h3>
            <p className="text-zinc-700 max-w-sm font-medium italic mb-10 text-lg leading-relaxed">
              Babua, please select a learning domain from the main gate to unlock your roadmap.
            </p>
            <Link href="/">
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl px-10 py-6 font-black uppercase italic text-sm">
                Return to Gates
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}