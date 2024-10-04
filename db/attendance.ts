import db from "@/db";
import { getAllEmployeeProfiles } from "./employee";

interface AttendanceRecord {
  date: Date;
  timeIn: Date;
  timeOut: Date | null;
}

export async function getAttendanceByDate(date: Date) {
  const attendances = await db.attendance.findMany({
    where: {
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
    select: {
      profile: true,
      timeIn: true,
    },
  });

  return attendances;
}

export async function getAttendanceByUser(userId: string) {
  const attendances = await db.attendance.findMany({
    where: {
      userId,
    },
    select: {
      profile: true,
      timeIn: true,
    },
  });

  return attendances;
}

export async function getAbsentUserByDate(date: Date) {
  const attendanceRecords = await getAttendanceByDate(date);
  const presentUserIds = new Set(
    attendanceRecords.map((record) => record.profile.id)
  );

  const allEmployees = await getAllEmployeeProfiles();

  const absentEmployees = allEmployees.filter(
    (employee: any) => !presentUserIds.has(employee.id)
  );

  return absentEmployees;
}

export async function getUserTodayAttendance(userId: string) {
  const todaysAttendance = await db.attendance.findFirst({
    where: {
      userId: userId,
      date: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
    select: {
      profile: true,
      timeIn: true,
      timeOut: true,
    },
  });

  return todaysAttendance || { timeIn: null, timeOut: null };
}

export async function getAttendanceChartData(userID: string): Promise<{
  lastWeek: any[];
  lastMonth: any[];
}> {
  const now = new Date();
  const lastWeekStart = new Date(now);
  lastWeekStart.setDate(now.getDate() - 7);
  const lastMonthStart = new Date(now);
  lastMonthStart.setMonth(now.getMonth() - 1);

  const attendanceData: AttendanceRecord[] = await db.attendance.findMany({
    select: {
      date: true,
      timeIn: true,
      timeOut: true,
    },
    where: {
      userId: userID,
      date: {
        gte: lastMonthStart,
        lt: new Date(now.setHours(0, 0, 0, 0)),
      },
    },
  });

  const processAttendanceData = (attendanceData: AttendanceRecord[]) => {
    return attendanceData.map((record) => {
      const timeIn = new Date(record.timeIn).getTime();
      const timeOut = record.timeOut
        ? new Date(record.timeOut).getTime()
        : null;

      let totalMinutes;
      if (timeOut) {
        totalMinutes = (timeOut - timeIn) / (1000 * 60);
      } else {
        totalMinutes = 9 * 60;
      }
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return {
        date: record.date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        valueKey: totalMinutes,
        value: `${hours} h ${minutes.toFixed(0)} min`,
      };
    });
  };

  const lastWeekData = attendanceData.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= lastWeekStart && recordDate < now;
  });

  const lastMonthData = attendanceData.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= lastMonthStart && recordDate < now;
  });

  const lastWeekChartData = processAttendanceData(lastWeekData);
  const lastMonthChartData = processAttendanceData(lastMonthData);

  return {
    lastWeek: lastWeekChartData,
    lastMonth: lastMonthChartData,
  };
}

export async function getTeamAttendanceTodayByUser(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const result = await db.$transaction(async (db) => {
    const userWithProfile = await db.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            teams: {
              include: {
                employees: true,
              },
            },
          },
        },
      },
    });
    
    if (!userWithProfile || !userWithProfile.profile || !userWithProfile.profile.teams.length) {
      return [];
    }

    const employeeIds = userWithProfile.profile.teams.flatMap(team =>
      team.employees.map(emp => emp.userId)
    );
    const attendances = await db.attendance.findMany({
      where: {
        userId: {
          in: employeeIds,
        },
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
      select: {
        profile: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const names = attendances.map(emp => ({
      name: `${emp.profile.firstName} ${emp.profile.lastName}`,
      email: null,
    }));

    return names;
  });

  return result;
}
