import ContactActions from "@/components/ContactActions";

export default function Home() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <a className="wordmark" href="https://edsong.xyz" aria-label="Edward Song portfolio">Edward Song</a>
        <a className="portfolio" href="https://edsong.xyz">My work <span aria-hidden="true">↗</span></a>
      </header>
      <main id="main" className="main">
        <div className="intro">
          <p className="eyebrow">Independent design & development</p>
          <h1>Your next idea.<br/><span>Beautifully built.</span></h1>
          <p className="description">Websites and web apps, designed around you.<br className="wide-break"/> From a simple first page to a complete platform.</p>
          <ContactActions />
        </div>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Edward Song</span>
        <a href="https://www.linkedin.com/in/edward-y-song">LinkedIn <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  );
}
