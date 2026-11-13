import { createHmac, randomBytes } from "node:crypto";
import { CONTACT_EMAIL, validateInquiry } from "./inquiry.ts";

type Configuration = { apiKey?: string; from?: string; allowedOrigins: string[] };
type RateEntry = { count: number; expires: number };

export function createInquiryHandler(config: () => Configuration, send: typeof fetch = fetch, now = Date.now) {
  // Bounded, process-local abuse protection. IP addresses and inquiry content are never stored or logged.
  const clients = new Map<string, RateEntry>();
  const salt = randomBytes(32);
  let globalLimit: RateEntry = { count: 0, expires: 0 };

  function reply(body: unknown, status: number, extra: Record<string, string> = {}) {
    return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extra } });
  }

  return async function handleInquiry(request: Request): Promise<Response> {
    const settings = config();
    if (!settings.allowedOrigins.includes(request.headers.get("origin") || "")) return reply({ error: "Please submit the form from this website." }, 403);
    if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") return reply({ error: "Invalid request format." }, 415);
    const requestId = request.headers.get("x-inquiry-id") || "";
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(requestId)) return reply({ error: "Please refresh the page and try again." }, 400);

    const maxBytes = 16 * 1024;
    if (Number(request.headers.get("content-length")) > maxBytes) return reply({ error: "Your message is too long." }, 413);
    const chunks: Uint8Array[] = [];
    let size = 0;
    let input: unknown;
    try {
      const reader = request.body?.getReader();
      if (reader) {
        for (;;) {
          const chunk = await reader.read();
          if (chunk.done) break;
          size += chunk.value.byteLength;
          if (size > maxBytes) {
            await reader.cancel();
            return reply({ error: "Your message is too long." }, 413);
          }
          chunks.push(chunk.value);
        }
      }
      input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return reply({ error: "Please check your message and try again." }, 400);
    }
    if (input && typeof input === "object" && "website" in input && input.website) return reply({ error: "Unable to submit this message." }, 400);
    const validation = validateInquiry(input);
    if (validation.errors) return reply({ error: "Please check the highlighted fields.", fields: validation.errors }, 400);
    if (!settings.apiKey) return reply({ error: "Sending is temporarily unavailable. Please use the email address below." }, 503);

    const time = now();
    for (const [key, value] of clients) if (value.expires <= time) clients.delete(key);
    const address = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const identifier = createHmac("sha256", salt).update(address).digest("hex");
    const current = clients.get(identifier);
    const client = current && current.expires > time ? current : { count: 0, expires: time + 15 * 60_000 };
    if (globalLimit.expires <= time) globalLimit = { count: 0, expires: time + 60 * 60_000 };
    if (client.count >= 5 || globalLimit.count >= 60 || (!current && clients.size >= 2000)) {
      const retry = Math.max(1, Math.ceil(((client.count >= 5 ? client.expires : globalLimit.expires) - time) / 1000));
      return reply({ error: "Please wait a little before sending again, or email me directly." }, 429, { "Retry-After": String(retry) });
    }
    client.count++;
    globalLimit.count++;
    clients.set(identifier, client);

    const inquiry = validation.value;
    const text = ["New project inquiry from contact.edsong.xyz", "", `Name: ${inquiry.name}`, `Email: ${inquiry.email}`, ...(inquiry.source ? [`Referring site (provided by link): ${inquiry.source}`] : []), "", inquiry.message].join("\n");
    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST",
        redirect: "error",
        headers: { Authorization: `Bearer ${settings.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact-inquiry/${requestId}` },
        body: JSON.stringify({ from: settings.from || "Edward Song <noreply@edsong.xyz>", to: [CONTACT_EMAIL], reply_to: inquiry.email, subject: `Project inquiry from ${inquiry.name}`, text }),
        signal: AbortSignal.timeout(15_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || typeof result?.id !== "string" || !result.id) return reply({ error: "Your message couldn’t be sent. Please try again or email me directly." }, 502);
      return reply({ success: true }, 200);
    } catch {
      return reply({ error: "Your message couldn’t be sent. Please try again or email me directly." }, 502);
    }
  };
}
