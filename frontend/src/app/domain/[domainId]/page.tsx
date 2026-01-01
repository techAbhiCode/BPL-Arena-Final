import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

const patterns = [
  {
    name: "Two Pointers",
    problems: [
      { title: "Valid Palindrome", difficulty: "Easy", status: "completed" },
      { title: "Two Sum II", difficulty: "Medium", status: "current" },
      { title: "3Sum", difficulty: "Medium", status: "pending" },
    ],
  },
  {
    name: "Sliding Window",
    problems: [
      { title: "Maximum Sum Subarray", difficulty: "Easy", status: "pending" },
      { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", status: "pending" },
    ],
  },
];

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">DSA: Mastery Path</h1>
          <p className="text-zinc-400 mb-6">Don't solve questions, master patterns.</p>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-orange-500 font-medium">Overall Progress</span>
              <span>12%</span>
            </div>
            <Progress value={12} className="h-2 bg-zinc-800" />
          </div>
        </div>

        <div className="space-y-8">
          {patterns.map((pattern, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                {pattern.name}
              </h2>
              
              <div className="grid gap-3">
                {pattern.problems.map((prob, pIdx) => (
                  <div 
                    key={pIdx} 
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      prob.status === 'current' 
                      ? 'bg-orange-500/5 border-orange-500/30' 
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {prob.status === 'completed' && <CheckCircle2 className="text-green-500 h-5 w-5" />}
                      {prob.status === 'current' && <PlayCircle className="text-orange-500 h-5 w-5" />}
                      {prob.status === 'pending' && <Circle className="text-zinc-600 h-5 w-5" />}
                      
                      <div>
                        <h3 className={`font-medium ${prob.status === 'pending' ? 'text-zinc-500' : 'text-zinc-200'}`}>
                          {prob.title}
                        </h3>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold">
                          {prob.difficulty}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs hover:text-orange-500">
                      {prob.status === 'completed' ? 'Review' : 'Solve'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}