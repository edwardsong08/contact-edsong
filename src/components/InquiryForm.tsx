"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { INQUIRY_LIMITS, type InquiryErrors } from "@/lib/inquiry";

export default function InquiryForm({ source }: { source: string }) {
  const [status, setStatus] = useState<"ready" | "sending" | "sent">("ready");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<InquiryErrors>({});
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const attempt = useRef<{ body: string; id: string } | null>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { setReady(true); }, []);
  useEffect(() => { if (status === "sent") successHeading.current?.focus(); }, [status]);
  useEffect(() => {
    const invalid = Object.keys(fields)[0];
    if (invalid) formRef.current?.querySelector<HTMLElement>(`[name="${invalid === "name" || invalid === "email" ? invalid : "message"}"]`)?.focus();
  }, [fields]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    const body = JSON.stringify({ name: data.get("name"), email: data.get("email"), message: data.get("message"), website: data.get("website"), source });
    if (attempt.current?.body !== body) attempt.current = { body, id: crypto.randomUUID() };
    const requestId = attempt.current.id;
    setStatus("sending");
    setError("");
    setFields({});
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Inquiry-Id": requestId },
        body,
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        setError(result?.error || "Your message couldn’t be sent. Please try again in a moment.");
        setFields(result?.fields || {});
        setStatus("ready");
        return;
      }
      setEmail(String(data.get("email") || "").trim());
      setStatus("sent");
    } catch {
      setError("Your message couldn’t be sent. Please try again in a moment.");
      setStatus("ready");
    }
  }

  if (status === "sent") return (
    <div className="inquiry-success">
      <div className="success-mark" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="m6 14 5 5L22 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
      <h1 className="form-title" tabIndex={-1} ref={successHeading}>Message sent.</h1>
      <p className="form-description">Thanks for sharing your idea.<br/>I’ll reply to <strong>{email}</strong>.</p>
      <Link className="primary-button" href={source ? `/?from=${encodeURIComponent(source)}` : "/"}><span aria-hidden="true">←</span> Back to home</Link>
    </div>
  );

  return (
    <>
      <div className="form-heading">
        <h1 className="form-title">Tell me your idea.</h1>
        <p className="form-description">A few sentences is plenty.</p>
      </div>
      <form className="inquiry-form" ref={formRef} method="post" action="/api/inquiry" onSubmit={submit} aria-busy={status === "sending"}>
        <fieldset disabled={!ready || status === "sending"}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" autoComplete="name" required maxLength={INQUIRY_LIMITS.name} aria-invalid={!!fields.name} aria-describedby={fields.name ? "name-error" : undefined}/>
              {fields.name ? <p id="name-error" className="field-error">{fields.name}</p> : null}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={INQUIRY_LIMITS.email} aria-invalid={!!fields.email} aria-describedby={fields.email ? "email-error" : undefined}/>
              {fields.email ? <p id="email-error" className="field-error">{fields.email}</p> : null}
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="message">What would you like to build?</label>
            <textarea id="message" name="message" required minLength={10} maxLength={INQUIRY_LIMITS.message} rows={5} placeholder="What do you need, and who is it for?" aria-invalid={!!fields.message} aria-describedby={fields.message ? "message-error" : undefined}/>
            {fields.message ? <p id="message-error" className="field-error">{fields.message}</p> : null}
          </div>
          <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
          {error ? <p className="submission-error" role="alert">{error}</p> : null}
          <div className="submit-row">
            <button className="primary-button" type="submit">{status === "sending" ? "Sending…" : "Send message"}</button>
            <p>I’ll reply personally.</p>
          </div>
        </fieldset>
      </form>
      <noscript><p>Please enable JavaScript to use the contact form.</p></noscript>
    </>
  );
}
