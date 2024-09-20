import {
  absentieColumns,
  presentieColumns,
} from "@/components/columns/attendanceColumns";
import { DataTable } from "@/components/ui/data-table";
import { getAbsentUserByDate, getAttendanceByDate } from "@/db/attendance";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Attendance() {
  const session = await getServerSession(authOptions);
  const attendance = await getAttendanceByDate(new Date("2024-09-19"));
  const absentEmployees = await getAbsentUserByDate(new Date("2024-09-19"));
  return (
    <div className="">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Attendance</h1>
      </div>
      <div>
        <DataTable
          columns={presentieColumns}
          data={attendance}
          filterColumn={"profile_firstName"}
          totalText={"presentie"}
        />
      </div>
      <div>
        <DataTable
          columns={absentieColumns}
          data={absentEmployees}
          filterColumn={"profile_firstName"}
          totalText={"absentie"}
        />
      </div>
    </div>
  );
}
