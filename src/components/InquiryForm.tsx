"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { buildInquiry, CONTACT_EMAIL, type Inquiry } from "@/lib/inquiry";
import Arrow from "./Arrow";

const projects = ["Website / landing page", "Web application", "Platform / custom build", "Improve an existing project", "Let's figure it out"];
export default function InquiryForm() {
  const [draft, setDraft] = useState<ReturnType<typeof buildInquiry> | null>(null);
  const [copied, setCopied] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (draft) resultRef.current?.focus(); }, [draft]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) || "");
    const inquiry: Inquiry = { name: field("name"), company: field("company"), project: field("project"), budget: field("budget"), timeline: field("timeline"), message: field("message") };
    setDraft(buildInquiry(inquiry));
    setCopied("");
  }
  async function copy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setCopied("Brief copied. Paste it into an email whenever you're ready.");
    } catch {
      setCopied("Copy isn't available here. Select and copy your brief below.");
    }
  }
  return <div className="inquiry-builder">
    <form onSubmit={prepare} onChange={() => { setDraft(null); setCopied(""); }}>
      <div className="form-row"><label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="Nice to meet you, I'm…" required maxLength={100}/></label><label>Company or website <small>(optional)</small><input name="company" autoComplete="organization" placeholder="A name or a link" maxLength={200}/></label></div>
      <label>What are you thinking? <span>*</span><select name="project" defaultValue="" required><option value="" disabled>Pick a starting point</option>{projects.map(project => <option key={project}>{project}</option>)}</select></label>
      <div className="form-row"><label>Budget <small>(optional, USD)</small><select name="budget" defaultValue=""><option value="">Let's discuss</option>{["Under $2,500", "$2,500–$5,000", "$5,000–$10,000", "$10,000–$25,000", "$25,000+"].map(value => <option key={value}>{value}</option>)}</select></label><label>Timeline <small>(optional)</small><select name="timeline" defaultValue=""><option value="">I'm flexible</option>{["As soon as possible", "1–3 months", "3–6 months", "Just exploring"].map(value => <option key={value}>{value}</option>)}</select></label></div>
      <label>A little about your idea <span>*</span><textarea name="message" placeholder="What would you like to build, who is it for, and what should it help them do? Rough ideas are welcome." required minLength={20} maxLength={2000} rows={4}/></label>
      <button type="submit" className="button button-lime">Prepare my email <Arrow diagonal /></button>
      <p className="form-note">This creates a draft. You review and send it from your own email. Nothing entered here is saved on this site.</p>
    </form>
    {draft ? <div className="draft-result" role="region" aria-label="Your email draft" tabIndex={-1} ref={resultRef}>
      <span className="eyebrow">READY WHEN YOU ARE</span><h3>Your idea, ready to send.</h3><p>Choose where to open your draft, then hit send in your email app.</p>
      <div className="draft-actions"><a className="button button-ink" href={draft.mailto}>Open email app <Arrow diagonal /></a><a className="text-link" href={draft.gmail} target="_blank" rel="noopener noreferrer">Open in Gmail <Arrow diagonal /></a><button type="button" className="text-link" onClick={copy}>Copy brief <span aria-hidden="true">↗</span></button></div>
      <p role="status" className="copy-status">{copied}</p>
      <details><summary>Preview your email</summary><p className="draft-subject">To: {CONTACT_EMAIL}<br/>Subject: {draft.subject}</p><pre>{draft.body}</pre></details>
    </div> : null}
    <noscript><p>Email me directly at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. The brief builder needs JavaScript.</p></noscript>
  </div>;
}
