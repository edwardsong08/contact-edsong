import { createInquiryHandler } from "../../../lib/send-inquiry";

export const runtime = "nodejs";
export const POST = createInquiryHandler(() => ({
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.INQUIRY_FROM,
  allowedOrigins: process.env.NODE_ENV === "production"
    ? ["https://edsong.xyz", "https://www.edsong.xyz", "https://contact.edsong.xyz", "https://www.contact.edsong.xyz"]
    : ["http://localhost:3096", "http://127.0.0.1:3096"],
}));
