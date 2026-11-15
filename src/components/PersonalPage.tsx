import Link from "next/link";
import Portrait from "@/components/Portrait";

export default function PersonalPage({ children, source = "", className = "", footerContact = true }: { children: React.ReactNode; source?: string; className?: string; footerContact?: boolean }) {
  const query = source ? `?from=${encodeURIComponent(source)}` : "";
  return <div className={`page personal-page ${className}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><Portrait source={source} /><Link className="portfolio back-link" href={`/${query}`} aria-label="Return to home"><span aria-hidden="true">←</span> Home</Link></header>
    <main id="main" className="personal-main">{children}</main>
    <footer className="footer"><Link href={`/${query}`} aria-label="Return to home">← Home</Link><span>© {new Date().getFullYear()} Edward Song</span>{footerContact && <Link href={`/start${query}`}>Start a project <span aria-hidden="true">→</span></Link>}</footer>
  </div>;
}
