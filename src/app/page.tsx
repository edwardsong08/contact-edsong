import Link from "next/link";
import ContactActions from "@/components/ContactActions";
import { normalizeSource } from "@/lib/inquiry";

export default async function Home({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  return (
    <div className="page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <Link className="wordmark" href={source ? `/?from=${encodeURIComponent(source)}` : "/"}>Edward Song</Link>
        <Link className="portfolio" href={source ? `/portfolio?from=${encodeURIComponent(source)}` : "/portfolio"}>My work <span aria-hidden="true">↗</span></Link>
      </header>
      <main id="main" className="main">
        <div className="intro">
          <p className="eyebrow">Independent design & development</p>
          <h1>Your next idea.<br/><span>Beautifully built.</span></h1>
          <p className="description">Websites and web apps, designed around you.<br className="wide-break"/> From a simple first page to a complete platform.</p>
          <ContactActions source={source} />
        </div>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Edward Song</span>
      </footer>
    </div>
  );
}
