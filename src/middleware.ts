import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // Optional: add role-based protection
    // if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // We handle the auth logic in the middleware function above
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/login"],
};