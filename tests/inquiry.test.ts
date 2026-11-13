import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { normalizeSource, validateInquiry } from "../src/lib/inquiry.ts";
import { CONTACT_EMAIL, createInquiryHandler } from "../src/lib/send-inquiry.ts";

const origin = "https://edsong.xyz";
const inquiry = { name: " Alex & Lee ", email: " alex@example.com ", message: "We would like a website for our independent design studio.", source: "https://client.example/work?private=value#section", website: "" };
const settings = { apiKey: "test-key-never-used-outside-tests", allowedOrigins: [origin] };
function request(body: unknown = inquiry, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/inquiry`, { method: "POST", headers: { origin, "content-type": "application/json", "x-inquiry-id": randomUUID(), "cf-connecting-ip": "192.0.2.1", ...headers }, body: JSON.stringify(body) });
}

test("only the referring hostname is retained, and unsafe source values are dropped", () => {
  assert.equal(normalizeSource(inquiry.source), "client.example");
  for (const value of ["javascript:alert(1)", "https://user:password@example.com/private", "ftp://example.com", ["example.com"], "not a domain", ""]) assert.equal(normalizeSource(value), "");
  assert.equal(normalizeSource("Example.com/path?token=secret"), "example.com");
});

test("validates the three visible fields and rejects header injection and oversized messages", () => {
  const valid = validateInquiry(inquiry);
  assert.equal(valid.value?.name, "Alex & Lee");
  assert.equal(valid.value?.email, "alex@example.com");
  assert.equal(valid.value?.source, "client.example");
  assert.ok(validateInquiry({ ...inquiry, email: "not-an-email" }).errors?.email);
  assert.ok(validateInquiry({ ...inquiry, name: "Alex\r\nBcc: someone@example.com" }).errors?.name);
  assert.ok(validateInquiry({ ...inquiry, message: "x".repeat(3001) }).errors?.message);
  assert.equal(Object.keys(validateInquiry(null).errors || {}).length, 3);
});

test("sends exclusively to Edward, sets Reply-To, preserves message text, and deduplicates retries", async () => {
  const calls: { url: string; body: Record<string, unknown>; headers: Headers }[] = [];
  const send = (async (url, init) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body)), headers: new Headers(init?.headers) });
    return Response.json({ id: "mail-provider-id" });
  }) as typeof fetch;
  const handle = createInquiryHandler(() => settings, send);
  const submission = request({ ...inquiry, to: "attacker@example.com" });
  const retry = submission.clone();
  const first = await handle(submission);
  assert.equal(first.status, 200);
  assert.deepEqual(await first.json(), { success: true });
  assert.equal((await handle(retry)).status, 200);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.deepEqual(calls[0].body.to, [CONTACT_EMAIL]);
  assert.equal(calls[0].body.reply_to, "alex@example.com");
  assert.match(String(calls[0].body.text), /Alex & Lee/);
  assert.match(String(calls[0].body.text), /client.example/);
  assert.doesNotMatch(String(calls[0].body.text), /private=value|#section/);
  assert.equal(calls[0].headers.get("idempotency-key"), calls[1].headers.get("idempotency-key"));
});

test("rejects malformed, cross-origin, invalid, and honeypot submissions before contacting the provider", async () => {
  let calls = 0;
  const send = (async () => { calls++; return Response.json({ id: "must-not-send" }); }) as typeof fetch;
  const handle = createInquiryHandler(() => settings, send);
  assert.equal((await handle(request(inquiry, { origin: "https://other.example" }))).status, 403);
  assert.equal((await handle(request(inquiry, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await handle(request(inquiry, { "x-inquiry-id": "invalid" }))).status, 400);
  assert.equal((await handle(request({ ...inquiry, email: "invalid" }))).status, 400);
  assert.equal((await handle(request({ ...inquiry, website: "spam.example" }))).status, 400);
  assert.equal((await handle(request({ ...inquiry, message: "x".repeat(20_000) }))).status, 413);
  assert.equal(calls, 0);
});

test("missing mail configuration and provider errors never produce a success response", async () => {
  const unconfigured = createInquiryHandler(() => ({ allowedOrigins: [origin] }));
  assert.equal((await unconfigured(request())).status, 503);
  for (const result of [Response.json({ error: "provider secret details" }, { status: 403 }), Response.json({ error: "provider error" })]) {
    const handle = createInquiryHandler(() => settings, (async () => result) as typeof fetch);
    const response = await handle(request());
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /provider secret details/);
  }
  const timeout = createInquiryHandler(() => settings, (async () => { throw new Error("internal error"); }) as typeof fetch);
  assert.equal((await timeout(request())).status, 502);
});

test("rate limits repeated submissions and recovers after the window expires", async () => {
  let time = 1000;
  let calls = 0;
  const handle = createInquiryHandler(() => settings, (async () => { calls++; return Response.json({ id: "sent" }); }) as typeof fetch, () => time);
  for (let i = 0; i < 5; i++) assert.equal((await handle(request())).status, 200);
  const limited = await handle(request());
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "900");
  assert.equal(calls, 5);
  time += 15 * 60_000;
  assert.equal((await handle(request())).status, 200);
});
