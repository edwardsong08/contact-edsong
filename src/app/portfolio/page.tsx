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
    category: "Community initiative · Website",
    description: "A bold visual identity and a clear path through a Veteran-led initiative. Mission, resources, and ways to connect, brought together in one place.",
    image: "/portfolio/find-the-next-6000.jpg",
    alt: "Navy and red campaign website with an illustrated landscape and the headline Find one. Reach one. Connect one.",
    href: "https://findthenext6000.org",
    featured: true,
  },
  {
    name: "Ryu Legal",
    category: "Professional services · Website",
    description: "A considered home for a law practice. Clear services, a distinctive presence, and a straightforward way to get in touch.",
    image: "/portfolio/ryu-legal.jpg",
    alt: "Law Office of Soomin Ryu website with navy lettering over a softly lit library.",
    href: "https://www.ryu-legal.com",
    featured: false,
  },
  {
    name: "The Realms of Asgard",
    category: "Volunteer work · Community platform",
    description: "A connected home for a growing community, spanning its public website, learning, recruitment, and support tools.",
    image: "/portfolio/troa.jpg",
    alt: "TROA community website with gold typography and an illuminated city beneath a starry sky.",
    href: "https://therealmsofasgard.com",
    featured: false,
  },
  {
    name: "MyWord",
    category: "Personal product · Alpha & private pilot",
    description: "An Android texting app with a companion web platform for selected business records and agreements. Designed as one connected experience.",
    image: "/portfolio/myword.jpg",
    alt: "MyWord product website in warm white and green, with a preview of the Android inbox using fictional conversations.",
    href: "https://myword.edsong.xyz",
    featured: false,
  },
  {
    name: "QFin Games",
    category: "Independent studio · Website",
    description: "A playful studio website that gives its first game a world of its own, with a closer look at the work in development.",
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
        <Link className={styles.contactLink} href={startHref}>Start a project <span aria-hidden="true">↗</span></Link>
      </header>
      <main id="main">
        <div className={styles.intro}>
          <p className="eyebrow">Selected work</p>
          <h1 className={styles.title}>Built with purpose.</h1>
          <p className={styles.description}>A selection of websites and products<br className="wide-break" /> I’ve designed and built.</p>
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
                <p className={styles.category}>{project.category}</p>
                <div className={styles.projectHeading}>
                  <h2><a className={styles.projectLink} href={project.href} target="_blank" rel="noopener noreferrer">{project.name}<span className={styles.newTab}> (opens in a new tab)</span></a></h2>
                  <span className={styles.projectArrow} aria-hidden="true">↗</span>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
                <span className={styles.viewLink} aria-hidden="true">View website <span>↗</span></span>
              </div>
            </article>
          ))}
        </div>

        <section className={styles.invitation} aria-labelledby="project-heading">
          <h2 id="project-heading">What are you thinking?</h2>
          <p>A new website. A useful app. Something of your own.</p>
          <ContactActions source={source} />
        </section>
      </main>
      <footer className="footer"><span>© {new Date().getFullYear()} Edward Song</span></footer>
    </div>
  );
}
