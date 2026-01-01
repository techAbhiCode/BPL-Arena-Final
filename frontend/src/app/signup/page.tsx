"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/signup", formData);
      alert("Registration Successful! Ab login karo.");
      router.push("/login");
    } catch (err) {
      alert("Error: Username pehle se ho sakta hai.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Join the League 🚀</CardTitle>
          <CardDescription className="text-center text-zinc-500">Create your account to start solving</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="babua_coder" className="bg-zinc-800 border-zinc-700" 
                onChange={(e) => setFormData({...formData, username: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="babua@example.com" className="bg-zinc-800 border-zinc-700"
                onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="bg-zinc-800 border-zinc-700"
                onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">Sign Up</Button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-500">
            Already have an account? <Link href="/login" className="text-orange-500 hover:underline">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}