import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
export default async function Dashboard() {
  const session = await getUserDetails();
  return (
    <>
      <span className="break-words">
        {JSON.stringify(session, null, 2)}
      </span>
    </>
  );
}
