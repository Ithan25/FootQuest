import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Only match authenticated routes (dashboard).
     * All public pages, static assets, and SEO files are excluded
     * so that Googlebot (and unauthenticated users) can access them
     * without being redirected by the Supabase session middleware.
     */
    "/hub/:path*",
    "/games/:path*",
    "/leaderboard/:path*",
    "/shop/:path*",
    "/profile/:path*",
  ],
};
