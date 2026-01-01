import { GlobalAI } from "@/components/GlobalAI";
import { GlobalNotes } from "@/components/GlobalNotes";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      {/* Yeh dono hamesha top par rahenge */}
      <GlobalAI />
      <GlobalNotes />
    </div>
  );
}