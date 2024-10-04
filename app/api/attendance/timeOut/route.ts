import db from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
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
        id: true,
        timeIn: true,
      },
    });
    
    if (todaysAttendance) {
      await db.attendance.update({
        where: { id: todaysAttendance.id },
        data: {
          timeOut: new Date(),
        },
      });
      response = {
        success: true,
        message: "Attendance time Out added successfully",
      };
    } else {
      response = {
        success: false,
        message: "User is not sign in today",
      };
    }
  });
  return NextResponse.json(response);
}
