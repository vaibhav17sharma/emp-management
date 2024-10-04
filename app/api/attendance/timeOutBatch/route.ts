import db from "@/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json("Unauthorized", {
      status: 401,
    });
  }
  const dateParam = req.nextUrl.searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : new Date();
  date.setHours(0, 0, 0, 0);

  const startOfDay = new Date(date);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  await db.$transaction(async (db) => {
    const attendancesToUpdate = await db.attendance.findMany({
      where: {
        timeOut: null,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const updatePromises = attendancesToUpdate.map((attendance) => {
      const newTimeOut = new Date(attendance.timeIn);
      newTimeOut.setHours(newTimeOut.getHours() + 9);

      return db.attendance.update({
        where: { id: attendance.id },
        data: { timeOut: newTimeOut },
      });
    });

    await Promise.all(updatePromises);
  });
  return NextResponse.json({
    success: true,
    message: "Attendance time out updated successfully",
  });
}
