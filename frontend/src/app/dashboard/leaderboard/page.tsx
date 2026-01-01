"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, Medal, Target } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Backend se leaderboard data fetch karo
    axios.get("http://localhost:8080/api/users/leaderboard")
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-orange-500/20 rounded-xl">
            <Trophy className="text-orange-500 h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">BPL Leaderboard</h1>
            <p className="text-zinc-500 text-sm">Real-time ranking of Babua Programming League</p>
          </div>
        </header>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-800/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[100px] text-zinc-400">Rank</TableHead>
                <TableHead className="text-zinc-400">Babua (User)</TableHead>
                <TableHead className="text-zinc-400">Total Solved</TableHead>
                <TableHead className="text-right text-zinc-400">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any, index: number) => (
                <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-800/30 transition">
                  <TableCell className="font-mono text-lg">
                    {index === 0 ? <Medal className="text-yellow-500" /> : index + 1}
                  </TableCell>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-zinc-700">
                      <AvatarFallback className="bg-zinc-800 text-xs">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-zinc-200">{user.username}</p>
                        <p className="text-[10px] text-zinc-500 uppercase">{user.rank}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-400">{user.totalSolved} Problems</TableCell>
                  <TableCell className="text-right font-bold text-orange-500">{user.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}