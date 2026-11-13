import Link from "next/link";
import { SHOW_PORTFOLIO_LINK } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <Link className="wordmark" href="/">Edward Song</Link>
        {SHOW_PORTFOLIO_LINK ? <Link className="portfolio" href="/portfolio">My work <span aria-hidden="true">↗</span></Link> : null}
      </header>
      <main id="main" className="inquiry-main">
        <div className="inquiry-content form-heading">
          <p className="eyebrow">404 · Page not found</p>
          <h1 className="form-title">Let’s get you back.</h1>
          <p className="form-description">This page may have moved, or the link isn’t quite right.</p>
          <div className="contact-actions"><Link className="primary-button" href="/">Back to home <span aria-hidden="true">←</span></Link></div>
        </div>
      </main>
      <footer className="footer"><span>© {new Date().getFullYear()} Edward Song</span></footer>
    </div>
  );
}
