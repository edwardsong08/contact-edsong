import type { Metadata } from "next";
import ProjectGallery, { type Project } from "./ProjectGallery";
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

const projects: Project[] = [
  {
    name: "Find the Next 6,000",
    category: "work",
    type: "Nonprofit",
    image: "/portfolio/find-the-next-6000.jpg",
    alt: "Navy and red campaign website with an illustrated landscape and the headline Find one. Reach one. Connect one.",
    href: "https://findthenext6000.org",
    featured: true,
  },
  {
    name: "Ryu Legal",
    category: "work",
    type: "Law firm",
    image: "/portfolio/ryu-legal.jpg",
    alt: "Law Office of Soomin Ryu website with navy lettering over a softly lit library.",
    href: "https://www.ryu-legal.com",
    featured: false,
  },
  {
    name: "The Realms of Asgard",
    category: "work",
    type: "Nonprofit",
    image: "/portfolio/troa.jpg",
    alt: "TROA community website with gold typography and an illuminated city beneath a starry sky.",
    href: "https://therealmsofasgard.com",
    featured: false,
  },
  {
    name: "Bifrost Controller",
    category: "work",
    type: "Controller mapping",
    image: "/portfolio/bifrost-controller.jpg",
    alt: "Bifrost Controller product page with a charcoal and gold controller on a Nordic mapping workbench.",
    href: "https://therealmsofasgard.com/gaming-hub/bifrost-controller",
    featured: false,
  },
  {
    name: "CloseDesk",
    category: "development",
    type: "Real estate workspace",
    image: "/portfolio/closedesk.jpg",
    alt: "CloseDesk website with navy typography on warm white and a preview of its transaction workspace using fictional example data.",
    href: "https://closedesk.edsong.xyz",
    featured: false,
  },
  {
    name: "Grantstead",
    category: "development",
    type: "Grant workspace",
    image: "/portfolio/grantstead.jpg",
    alt: "Grantstead website with green serif typography and a diagram connecting a nonprofit common application to individual funder drafts.",
    href: "https://grants.edsong.xyz",
    featured: false,
  },
  {
    name: "QFin Games",
    category: "work",
    type: "Independent game studio",
    image: "/portfolio/qfin-games.jpg",
    alt: "QFin Games studio website with cream typography and colorful pirate card-game artwork.",
    href: "https://qfingames.com",
    featured: false,
  },
  { name: "Main Hub", type: "Interactive project map", category: "personal", image: "/portfolio/main-hub.jpg", alt: "Main Hub living systems map with connected project territories on a dark canvas.", href: "https://hub.edsong.xyz" },
  { name: "Blog", type: "Coming soon", category: "personal", href: "https://blog.edsong.xyz", comingSoon: true },
];

export default async function Portfolio({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  // Explicit development-only mapping: production never receives localhost URLs.
  const localPreviews = process.env.NODE_ENV === "development" && process.env.PORTFOLIO_LOCAL_PREVIEWS === "1";
  const localOrigins: Record<string, string> = {
    "findthenext6000.org": "http://127.0.0.1:3191",
    "www.ryu-legal.com": "http://127.0.0.1:3192",
    "therealmsofasgard.com": "http://127.0.0.1:3193",
    "qfingames.com": "http://127.0.0.1:3194",
    "closedesk.edsong.xyz": "http://127.0.0.1:3195",
    "grants.edsong.xyz": "http://127.0.0.1:3196",
  };
  const previewProjects = projects.map(project => {
    const destination = new URL(project.href);
    const origin = localPreviews ? localOrigins[destination.hostname] : undefined;
    const previewPath = origin && destination.hostname === "therealmsofasgard.com" ? `/v3${destination.pathname === "/" ? "" : destination.pathname}` : destination.pathname;
    return { ...project, previewHref: origin ? `${origin}${previewPath}` : project.href };
  });

  return (
    <PersonalPage source={source} footerContact={false}>
      <div className={styles.page}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Selected work.</h1>
        </div>

        <ProjectGallery projects={previewProjects} />

        <div className={styles.invitation}>
          <ContactActions source={source} />
        </div>
      </div>
    </PersonalPage>
  );
}
