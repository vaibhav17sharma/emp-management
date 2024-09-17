import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/employee/:path*", "/admin/:path*", "/landing"],
};

export default withAuth(async (req) => {
  if (process.env.LOCAL_CMS_PROVIDER) return;

  const token = req.nextauth.token;
  const url = new URL(req.url);

  if(!token && url.pathname.startsWith('/landing')){
    return NextResponse.redirect(new URL("/signin", req.url));
  } 

  if(token && url.pathname.startsWith('/landing')){
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/invalidsession", req.url));
  }
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/user?token=${token.jwtToken}`
  );
  const userJson = await userResponse.json();

  if (!userJson.user) {
    return NextResponse.redirect(new URL("/invalidsession", req.url));
  }

  if (url.pathname.startsWith("/admin")) {
    if (!["ADMIN", "HR"].includes(userJson.user.role)) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  if (url.pathname.startsWith("/employee")) {
    if (!["EMPLOYEE", "HR", "ADMIN"].includes(userJson.user.role)) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  return NextResponse.next();
});
