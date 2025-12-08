// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Fake auth reader — replace with your JWT/session logic
function getUser(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const verified = req.cookies.get("verified")?.value;
  if (!token) return { isAuth: false, verified: false };

  // Example: decode your JWT here
  // const payload = decodeJwt(token)
  // return { isAuth: true, verified: payload.verified }

  return { isAuth: true, verified }; // example
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const user = getUser(req);

  const PUBLIC_PAGES = ["/", "/login", "/signup"];
  const VERIFICATION_PAGE = "/verification-form";
  const DASHBOARD_PAGE = "/dashboard";

  // 1️⃣ PUBLIC ROUTES — always allowed
  if (PUBLIC_PAGES.includes(pathname)) {
    return NextResponse.next();
  }

  // 2️⃣ PROTECTED ROUTES — requires auth
  // If not authenticated → redirect to login
  if (!user.isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3️⃣ AUTHENTICATED BUT NOT VERIFIED USER
  if (user.isAuth && !user.verified) {
    if (pathname === DASHBOARD_PAGE) {
      return NextResponse.redirect(new URL(VERIFICATION_PAGE, req.url));
    }
    return NextResponse.next(); // allow /verification
  }

  // 4️⃣ AUTHENTICATED & VERIFIED USER
  if (user.isAuth && user.verified) {
    // verified user should NOT stay on verification page
    if (pathname === VERIFICATION_PAGE) {
      return NextResponse.redirect(new URL(DASHBOARD_PAGE, req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/signup", "/", "/verification-form", "/dashboard"],
};
