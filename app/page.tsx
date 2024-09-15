"use client" 
import { Appbar } from "@/components/AppBar";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
      {JSON.stringify(session.data?.user) || "Loading..."}
    </div>
      <Appbar/>
    </div>
  );
}

