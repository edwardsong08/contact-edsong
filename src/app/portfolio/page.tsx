import type { Metadata } from "next";
import Image from "next/image";
import PersonalPage from "@/components/PersonalPage";
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
    url: "https://edsong.xyz/portfolio",
    siteName: "Edward Song",
    type: "website",
    images: [{ url: "/social.png", width: 1200, height: 630, alt: "Edward Song — Your next idea. Beautifully built." }],
  },
};

const projects = [
  {
    name: "Find the Next 6,000",
    type: "Nonprofit",
    image: "/portfolio/find-the-next-6000.jpg",
    alt: "Navy and red campaign website with an illustrated landscape and the headline Find one. Reach one. Connect one.",
    href: "https://findthenext6000.org",
    featured: true,
  },
  {
    name: "Ryu Legal",
    type: "Law firm",
    image: "/portfolio/ryu-legal.jpg",
    alt: "Law Office of Soomin Ryu website with navy lettering over a softly lit library.",
    href: "https://www.ryu-legal.com",
    featured: false,
  },
  {
    name: "The Realms of Asgard",
    type: "Nonprofit",
    image: "/portfolio/troa.jpg",
    alt: "TROA community website with gold typography and an illuminated city beneath a starry sky.",
    href: "https://therealmsofasgard.com",
    featured: false,
  },
  {
    name: "Bifrost Controller",
    type: "Controller mapping",
    image: "/portfolio/bifrost-controller.jpg",
    alt: "Bifrost Controller product page with a charcoal and gold controller on a Nordic mapping workbench.",
    href: "https://therealmsofasgard.com/gaming-hub/bifrost-controller",
    featured: false,
  },
  {
    name: "CloseDesk",
    type: "Real estate workspace",
    image: "/portfolio/closedesk.jpg",
    alt: "CloseDesk website with navy typography on warm white and a preview of its transaction workspace using fictional example data.",
    href: "https://closedesk.edsong.xyz",
    featured: false,
  },
  {
    name: "Grantstead",
    type: "Grant workspace",
    image: "/portfolio/grantstead.jpg",
    alt: "Grantstead website with green serif typography and a diagram connecting a nonprofit common application to individual funder drafts.",
    href: "https://grants.edsong.xyz",
    featured: false,
  },
  {
    name: "QFin Games",
    type: "Independent game studio",
    image: "/portfolio/qfin-games.jpg",
    alt: "QFin Games studio website with cream typography and colorful pirate card-game artwork.",
    href: "https://qfingames.com",
    featured: false,
  },
];

export default async function Portfolio({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);

  return (
    <PersonalPage source={source}>
      <div className={styles.page}>
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
                  sizes="(max-width:700px) calc(100vw - 50px), (max-width:800px) calc(50vw - 50px), (max-width:1200px) calc(50vw - 82px), 520px"
                  preload={project.featured}
                  className={styles.image}
                />
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectHeading}>
                  <h2><a className={styles.projectLink} href={project.href} target="_blank" rel="noopener noreferrer"><span className={styles.projectName}>{project.name}</span><span className={styles.projectType}>{project.type}</span><span className={styles.newTab}> (opens in a new tab)</span></a></h2>
                  <span className={styles.projectArrow} aria-hidden="true">↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className={styles.invitation} aria-labelledby="project-heading">
          <h2 id="project-heading">What are you thinking?</h2>
          <ContactActions source={source} />
        </section>
      </div>
    </PersonalPage>
  );
}
