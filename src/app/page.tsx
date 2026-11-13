import Link from "next/link";
import ContactActions from "@/components/ContactActions";
import { normalizeSource } from "@/lib/inquiry";
import { SHOW_PORTFOLIO_LINK } from "@/lib/site";

export default async function Home({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  return (
    <div className="page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <Link className="wordmark" href={source ? `/?from=${encodeURIComponent(source)}` : "/"}>Edward Song</Link>
        {SHOW_PORTFOLIO_LINK ? <Link className="portfolio" href={source ? `/portfolio?from=${encodeURIComponent(source)}` : "/portfolio"}>My work <span aria-hidden="true">↗</span></Link> : null}
      </header>
      <main id="main" className="main">
        <div className="intro">
          <p className="eyebrow">Independent design & development</p>
          <h1>Your next idea.<br/><span>Beautifully built.</span></h1>
          <p className="description">Websites and web apps.<br className="wide-break"/> From landing pages to complete platforms.</p>
          <ContactActions source={source} />
        </div>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Edward Song</span>
      </footer>
    </div>
  );
}
