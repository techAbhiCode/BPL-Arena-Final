"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", formData);
      // USER DATA KO BROWSER ME SAVE KARO
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/");
    } catch (err) {
      alert("Invalid Username or Password!");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Radhe Radhe! 👋</CardTitle>
          <CardDescription className="text-center text-zinc-500">Enter your credentials to enter the Arena</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="babua_coder" className="bg-zinc-800 border-zinc-700"
                onChange={(e) => setFormData({...formData, username: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="bg-zinc-800 border-zinc-700"
                onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">Login</Button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-500">
            Don't have an account? <Link href="/signup" className="text-orange-500 hover:underline">Sign Up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}