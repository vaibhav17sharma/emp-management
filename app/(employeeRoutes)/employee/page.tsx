import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
export default async function Dashboard() {
  const session = await getUserDetails();
  return (
    <div className="break-words">
      <p className="text-lg font-medium">
        <span className="font-bold">Hi</span> {session?.user?.name}
      </p>
      <h1>Dashboard</h1>
      <p>User Details: {JSON.stringify(session, null, 2)}</p>
    </div>
  );
}
