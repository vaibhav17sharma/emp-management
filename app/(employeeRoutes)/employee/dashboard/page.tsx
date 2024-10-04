import { getTeamAttendanceTodayByUser } from "@/db/attendance";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
export default async function Dashboard() {
  const session = await getUserDetails();
  const userID = session?.user?.id as string;
  const userName = session?.user?.name as string;

  const data = await getTeamAttendanceTodayByUser(userID);

  return (
    <>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          Hey {userName} #{userID}
        </div>
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
