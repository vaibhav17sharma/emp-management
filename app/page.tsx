import { Appbar } from "@/components/AppBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
      {<pre>{JSON.stringify(session, null, 2)}</pre> || "Loading..."}
    </div>
      <Appbar/>
    </div>
  );
}

