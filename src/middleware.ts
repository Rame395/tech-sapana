import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdmin = (token as any)?.role === "ADMIN";
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    if (isAuthPage) {
      if (isAuth && isAdmin) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return null;
    }

    // Block non-admin users from admin panel even if authenticated
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return null;
  },
  {
    callbacks: {
      // We handle auth checks manually in the middleware function above
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/login"],
};