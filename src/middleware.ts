import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const unProtectedRoutes = [
  "/sign-in",
  "/sign-up",
  "/api/auth/login",
  "/api/auth/register",
]; // Add your protected routes here

export function middleware(request: NextRequest) {
  // Check if the request URL is in the list of protected routes
  if (
    unProtectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
  ) {
    return NextResponse.next();
  }

  // Check for a token or authentication cookie
  const token = request.cookies.get("token")?.value || ""; // Adjust based on how you store tokens

  // If there's no token, redirect to the sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// Optionally, specify paths where this middleware should run
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
