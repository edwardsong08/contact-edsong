import { NextResponse, type NextRequest } from "next/server";
import { getSiteRedirect } from "@/lib/site";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  // Standalone Next reconstructs nextUrl with its internal listening hostname.
  // Caddy supplies the original routed host in X-Forwarded-Host.
  const host = request.headers.get("x-forwarded-host")?.split(",")[0].trim() || request.headers.get("host");
  if (host) url.host = host;
  const destination = getSiteRedirect(url);
  return destination ? NextResponse.redirect(destination, 308) : NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next/static|_next/image).*)"] };
