import db from '@/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }
  const user = await db.user.findFirst({
    where: {
      token,
    },
    select:{
      email: true,
      role: true,
    }
  });
  return NextResponse.json({
    user,
  });
}