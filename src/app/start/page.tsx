import type { Metadata } from "next";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import { normalizeSource } from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Start a project — Edward Song",
  description: "Tell Edward a little about your idea. A website, a web app, or something bigger.",
  alternates: { canonical: "/start" },
  robots: { index: false, follow: true },
};

export default async function StartPage({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  return (
    <div className="page form-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <Link className="wordmark" href={source ? `/?from=${encodeURIComponent(source)}` : "/"}>Edward Song</Link>
        <Link className="portfolio back-link" href={source ? `/?from=${encodeURIComponent(source)}` : "/"} aria-label="Back to home"><span aria-hidden="true">←</span> Back</Link>
      </header>
      <main id="main" className="inquiry-main">
        <div className="inquiry-content">
          <InquiryForm source={source} />
        </div>
      </main>
      <footer className="footer"><span>© {new Date().getFullYear()} Edward Song</span></footer>
    </div>
  );
}
