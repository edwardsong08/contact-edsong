"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/inquiry";

export default function ContactActions() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setStatus("Email copied");
    } catch {
      setStatus("Select the address to copy it");
    }
  }
  return (
    <div className="contact-actions">
      <a className="primary-button" href={`mailto:${CONTACT_EMAIL}?subject=Let%27s%20build%20something`}>
        Let’s talk <span aria-hidden="true">↗</span>
      </a>
      <div className="email-row">
        <a className="email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <button type="button" className="copy-button" aria-label="Copy email address" onClick={copyEmail}>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M12 4V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <p className="copy-status" role="status">{status}</p>
    </div>
  );
}
