import db from "@/db";
import { getAllEmployeeProfiles } from "./employee";

export async function addTimeInByUser(userId: string, date: Date) {
  const attendance = await db.attendance.create({
    data: {
      userId: userId,
      date: date,
      timeIn: new Date(),
    },
  });
  return attendance;
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
