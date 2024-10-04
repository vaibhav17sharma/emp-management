import db from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  let response: any;

  await db.$transaction(async (db) => {
    const todaysAttendance = await db.attendance.findFirst({
      where: {
        userId: session.user.id,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
      select: {
        profile: true,
        timeIn: true,
      },
    });

    if (!todaysAttendance) {
      const attend = await db.attendance.create({
        data: {
          userId: session.user.id,
          date: new Date(),
          timeIn: new Date(),
        },
      });
      response = {
        success: true,
        timeIn: attend.timeIn,
        message: "Attendance time in added successfully",
      };
    } else {
      response = {
        success: false,
        message: "User already checked in today",
      };
    }
  });
  return NextResponse.json(response);
}
