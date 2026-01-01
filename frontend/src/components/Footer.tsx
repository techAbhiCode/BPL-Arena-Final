import { Github, Twitter, Linkedin, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-600 p-1.5 rounded-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                BPL <span className="text-orange-600 text-sm">ARENA</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed italic font-medium">
              The ultimate battleground for modern developers. Master DSA, System Design, and Core CS Fundamentals with a gamified experience.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 bg-zinc-900 rounded-xl hover:bg-orange-600 transition-colors group">
                <Github className="h-5 w-5 text-zinc-400 group-hover:text-white" />
              </Link>
              <Link href="#" className="p-2 bg-zinc-900 rounded-xl hover:bg-orange-600 transition-colors group">
                <Twitter className="h-5 w-5 text-zinc-400 group-hover:text-white" />
              </Link>
              <Link href="#" className="p-2 bg-zinc-900 rounded-xl hover:bg-orange-600 transition-colors group">
                <Linkedin className="h-5 w-5 text-zinc-400 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-bold uppercase italic">Home</Link></li>
              <li><Link href="/dashboard" className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-bold uppercase italic">Dashboard</Link></li>
              <li><Link href="/leaderboard" className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-bold uppercase italic">Leaderboard</Link></li>
            </ul>
          </div>

          {/* Support/Legal */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-bold uppercase italic">Documentation</Link></li>
              <li><Link href="#" className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-bold uppercase italic flex items-center">API Docs <ExternalLink className="ml-2 h-3 w-3" /></Link></li>
              <li><Link href="#" className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-bold uppercase italic">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
            © 2026 BABUA PROGRAMMING LEAGUE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700">Built with ⚡ by</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 italic underline decoration-orange-900/50 underline-offset-4">
               Team Babua
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}