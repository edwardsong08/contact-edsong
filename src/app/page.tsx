import Link from "next/link";
import Portrait from "@/components/Portrait";
import ContactActions from "@/components/ContactActions";
import { normalizeSource } from "@/lib/inquiry";
import { SHOW_PORTFOLIO_LINK } from "@/lib/site";

export default async function Home({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  return (
    <div className="page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <Portrait source={source} />
        {SHOW_PORTFOLIO_LINK ? <Link className="portfolio" href={source ? `/portfolio?from=${encodeURIComponent(source)}` : "/portfolio"}>My work <span aria-hidden="true">↗</span></Link> : null}
      </header>
      <main id="main" className="main">
        <div className="intro">
          <h1 className="hero-title"><span className="headline-first">Your next idea.</span><br/><span className="headline-second"><em className="headline-accent">Beautifully</em><span className="headline-ending"> built.</span></span></h1>
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
