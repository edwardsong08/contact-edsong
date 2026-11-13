import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactActions from "@/components/ContactActions";
import { normalizeSource } from "@/lib/inquiry";
import styles from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Selected work — Edward Song",
  description: "A selection of websites and products designed and built by Edward Song.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Selected work — Edward Song",
    description: "Websites and products, built with purpose.",
    url: "https://contact.edsong.xyz/portfolio",
    siteName: "Edward Song",
    type: "website",
    images: [{ url: "/social.png", width: 1200, height: 630, alt: "Edward Song — Your next idea. Beautifully built." }],
  },
};

const projects = [
  {
    name: "Find the Next 6,000",
    description: "Connection before crisis.",
    image: "/portfolio/find-the-next-6000.jpg",
    alt: "Navy and red campaign website with an illustrated landscape and the headline Find one. Reach one. Connect one.",
    href: "https://findthenext6000.org",
    featured: true,
  },
  {
    name: "Ryu Legal",
    description: "Counsel with clarity.",
    image: "/portfolio/ryu-legal.jpg",
    alt: "Law Office of Soomin Ryu website with navy lettering over a softly lit library.",
    href: "https://www.ryu-legal.com",
    featured: false,
  },
  {
    name: "The Realms of Asgard",
    description: "Play. Connect. Belong.",
    image: "/portfolio/troa.jpg",
    alt: "TROA community website with gold typography and an illuminated city beneath a starry sky.",
    href: "https://therealmsofasgard.com",
    featured: false,
  },
  {
    name: "MyWord",
    description: "Your word. In writing.",
    image: "/portfolio/myword.jpg",
    alt: "MyWord product website in warm white and green, with a preview of the Android inbox using fictional conversations.",
    href: "https://myword.edsong.xyz",
    featured: false,
  },
  {
    name: "QFin Games",
    description: "Curiosity, turned up.",
    image: "/portfolio/qfin-games.jpg",
    alt: "QFin Games studio website with cream typography and colorful pirate card-game artwork.",
    href: "https://qfingames.com",
    featured: false,
  },
];

export default async function Portfolio({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  const homeHref = source ? `/?from=${encodeURIComponent(source)}` : "/";
  const startHref = source ? `/start?from=${encodeURIComponent(source)}` : "/start";

  return (
    <div className={`page ${styles.page}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <Link className="wordmark" href={homeHref}>Edward Song</Link>
        <nav className={styles.navigation} aria-label="Portfolio navigation">
          <Link className={styles.backLink} href={homeHref} aria-label="Back to home"><span aria-hidden="true">←</span> Back</Link>
          <Link className={styles.contactLink} href={startHref}>Start a project <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>
      <main id="main">
        <div className={styles.intro}>
          <h1 className={styles.title}>Selected work.</h1>
        </div>

        <div className={styles.projects}>
          {projects.map((project) => (
            <article key={project.name} className={`${styles.project} ${project.featured ? styles.featured : ""}`}>
              <div className={styles.preview}>
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={1265}
                  height={712}
                  sizes={project.featured ? "(max-width: 800px) calc(100vw - 50px), (max-width: 1200px) calc(100vw - 128px), 1072px" : "(max-width: 700px) calc(100vw - 50px), (max-width: 1200px) calc(50vw - 80px), 520px"}
                  preload={project.featured}
                  className={styles.image}
                />
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectHeading}>
                  <h2><a className={styles.projectLink} href={project.href} target="_blank" rel="noopener noreferrer">{project.name}<span className={styles.newTab}> (opens in a new tab)</span></a></h2>
                  <span className={styles.projectArrow} aria-hidden="true">↗</span>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
              </div>
            </article>
          ))}
        </div>

        <section className={styles.invitation} aria-labelledby="project-heading">
          <h2 id="project-heading">What are you thinking?</h2>
          <ContactActions source={source} />
        </section>
      </main>
      <footer className="footer"><span>© {new Date().getFullYear()} Edward Song</span></footer>
    </div>
  );
}
