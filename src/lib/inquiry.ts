export const CONTACT_EMAIL = "edwardsong08@gmail.com";

export const INQUIRY_LIMITS = { name: 100, email: 254, message: 3000 } as const;
export type Inquiry = { name: string; email: string; message: string; source: string };
export type InquiryErrors = Partial<Record<"name" | "email" | "message", string>>;

export function normalizeSource(value: unknown): string {
  if (typeof value !== "string" || value.length > 2048) return "";
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password || !url.hostname.includes(".")) return "";
    return url.hostname.toLowerCase().slice(0, 253);
  } catch {
    return "";
  }
}

export function validateInquiry(input: unknown): { value: Inquiry; errors?: never } | { value?: never; errors: InquiryErrors } {
  const data = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const errors: InquiryErrors = {};
  if (!name || name.length > INQUIRY_LIMITS.name || /[\r\n\x00-\x1f\x7f]/.test(name)) errors.name = "Please enter your name (up to 100 characters).";
  if (email.length > INQUIRY_LIMITS.email || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\x00-\x1f\x7f]/.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10 || message.length > INQUIRY_LIMITS.message || /\x00/.test(message)) errors.message = "Please write between 10 and 3,000 characters about your idea.";
  if (Object.keys(errors).length) return { errors };
  return { value: { name, email, message, source: normalizeSource(data.source) } };
}
