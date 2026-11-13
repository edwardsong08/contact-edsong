import { NextResponse, type NextRequest } from "next/server";
import { getSiteRedirect } from "@/lib/site";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  // Standalone Next reconstructs nextUrl with its internal listening hostname.
  // Caddy supplies the original routed host in X-Forwarded-Host.
  const host = request.headers.get("x-forwarded-host")?.split(",")[0].trim() || request.headers.get("host");
  if (host) url.host = host;
  const destination = getSiteRedirect(url);
  const response = destination ? NextResponse.redirect(destination, 308) : NextResponse.next();
  // A focused recovery URL clears this origin's old HTTP redirects only. It
  // leaves cookies, local storage, and inquiry drafts alone.
  if (url.pathname === "/" && url.searchParams.get("refresh") === "20261113") {
    response.headers.set("Clear-Site-Data", '"cache"');
    response.headers.set("Cache-Control", "no-store");
  }
  return response;
}

export const config = { matcher: ["/((?!api|_next/static|_next/image).*)"] };
