export const CONTACT_EMAIL = "edwardsong08@gmail.com";

export interface Inquiry {
  name: string;
  company: string;
  project: string;
  budget: string;
  timeline: string;
  message: string;
}

export function buildInquiry(inquiry: Inquiry) {
  const name = inquiry.name.trim();
  const subject = `Let's build: ${inquiry.project || "a new project"} — ${name || "Project inquiry"}`;
  const body = [
    "Hi Edward,", "", inquiry.message.trim(), "", "A few project details:",
    `Project: ${inquiry.project || "Let's figure it out"}`,
    `Budget: ${inquiry.budget || "Let's discuss"}`,
    `Timeline: ${inquiry.timeline || "Flexible"}`,
    ...(inquiry.company.trim() ? [`Company / website: ${inquiry.company.trim()}`] : []),
    "", `Thanks,`, name,
  ].join("\n");
  return {
    subject, body,
    mailto: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
