import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/orders", "/products", "/users"]; // Add your protected routes here
const signInRoute = "/sign-in";

export function middleware(request: NextRequest) {
  // Check if the request URL is in the list of protected routes
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // Check for a token or authentication cookie
    const token = request.cookies.get("token")?.value || ""; // Adjust based on how you store tokens

    // If there's no token, redirect to the sign-in page
    if (!token) {
      return NextResponse.redirect(new URL(signInRoute, request.url));
    }
  }

  // Continue to the requested route if authenticated
  return NextResponse.next();
}

// Optionally, specify paths where this middleware should run
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
