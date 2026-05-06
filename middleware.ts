import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (PWA manifest)
     * - ads.txt (AdSense)
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|ads.txt|robots.txt|sitemap.xml|google31ad35b3c46d6e07.html|cgu|mentions-legales|politique-confidentialite|a-propos|contact|guide|blog|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
