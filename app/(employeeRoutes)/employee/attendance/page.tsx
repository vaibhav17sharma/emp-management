import { AttendanceChart } from "@/components/common/AttendanceChart";
import CheckInCard from "@/components/common/CheckInCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAttendanceChartData,
  getTeamAttendanceTodayByUser,
  getUserTodayAttendance,
} from "@/db/attendance";
import { authOptions } from "@/lib/auth";
import { File } from "lucide-react";
import { getServerSession } from "next-auth";

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
export default async function Attendance() {
  const session = await getUserDetails();
  const userID = session?.user?.id as string;
  const userName = session?.user?.name as string;
  const attendance = await getUserTodayAttendance(userID);
  const attendanceChart = await getAttendanceChartData(userID);
  const teamAttendance = await getTeamAttendanceTodayByUser(userID);

  return (
    <>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <CheckInCard
              userId={userID}
              userName={userName}
              checkIn={attendance.timeIn}
              checkOut={attendance.timeOut}
            />
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="week">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Attendance</CardTitle>
                  <CardDescription>
                    Attendance record for the past week.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceChart chartData={attendanceChart.lastWeek} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="month">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Attendance</CardTitle>
                  <CardDescription>
                    Attendance record for the past month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceChart chartData={attendanceChart.lastMonth} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid gap-4 pt-0 p-4">
        <Card>
            <CardHeader>
              <CardTitle>Team Attendance</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {teamAttendance.map((team, index) => (
                <div key={team.name+index} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>{team.name.charAt(0)+""+team.name.split(" ")[1].charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {team.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {team.email}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
