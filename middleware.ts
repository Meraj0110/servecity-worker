// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getUser(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const verifiedRaw = req.cookies.get("verified")?.value;

  if (!token) return { isAuth: false, verified: false };

  let verified: boolean | "pending" = false;

  if (verifiedRaw === "true") verified = true;
  else if (verifiedRaw === "pending") verified = "pending";

  return { isAuth: true, verified };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const user = getUser(req);

  const PUBLIC_PAGES = ["/", "/login", "/signup"];
  const VERIFICATION_PAGE = "/verification-form";

  const isDashboardRoute = pathname.startsWith("/dashboard");

  // 1️⃣ Public routes
  if (PUBLIC_PAGES.includes(pathname)) {
    return NextResponse.next();
  }

  // 2️⃣ Protected routes (dashboard + verification)
  if (!user.isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3️⃣ Authenticated but NOT verified (or pending)
  if (user.verified === false || user.verified === "pending") {
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL(VERIFICATION_PAGE, req.url));
    }
    return NextResponse.next();
  }

  // 4️⃣ Authenticated & verified user
  if (user.verified === true) {
    // verified users should not see verification page
    if (pathname === VERIFICATION_PAGE) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verification-form",
    "/dashboard/:path*", // ✅ THIS FIXES EVERYTHING
  ],
};
