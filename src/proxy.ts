import { NextResponse, type NextRequest } from "next/server";
import { getSiteRedirect } from "@/lib/site";

export function proxy(request: NextRequest) {
  const destination = getSiteRedirect(request.nextUrl);
  return destination ? NextResponse.redirect(destination, 308) : NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next/static|_next/image).*)"] };
