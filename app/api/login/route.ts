import db from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  adminSecret: z.string(),
});

export async function POST(req: NextRequest) {
  const parseBody = bodySchema.safeParse(await req.json());
  if (!parseBody.success) {
    return NextResponse.json(
      { error: parseBody.error.message },
      { status: 400 }
    );
  }

  const { email, password, adminSecret } = parseBody.data;

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  const user = await db.user.findFirst({
    where: { email: email },
  });
  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }

  if (user.password !== password) {
    return NextResponse.json({}, { status: 401 });
  } else {
    const token = await db.user.update({
      where: { id: user.id },
      data: { token: user.token },
    });

    return NextResponse.json(
      {
        message: "User is successfully logged in",
        token: token.token,
      },
      {
        status: 200,
      }
    );
  }
}
