import type { Metadata } from "next";
import Link from "next/link";
import PersonalPage from "@/components/PersonalPage";
import { normalizeSource } from "@/lib/inquiry";
export const metadata: Metadata = { title: "About me — Edward Song", description: "The person behind the websites, products, and systems.", alternates: { canonical: "/about" } };
export default async function About({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  const query = source ? `?from=${encodeURIComponent(source)}` : "";
  return <PersonalPage source={source} className="about-page">
    <div className="about-layout">
      <div className="personal-intro about-intro">
        <p className="personal-kicker">About me</p>
        <h1>Hi, I’m <span className="about-name">Edward.</span></h1>
      </div>
      <div className="about-copy">
        <p className="about-lead">My work sits between design and engineering. I care about how something feels to use as much as how it works underneath.</p>
        <p>I work independently with businesses and nonprofits, and serve as CTO at The Realms of Asgard, Inc. My background also includes teaching, comedy writing, and legal operations.</p>
        <p>Away from the screen, I enjoy hiking with my dog, Huey.</p>
      </div>
      <ul className="about-details" aria-label="Location and languages"><li>Northern New Jersey / NYC Metro</li><li>Korean & English</li></ul>
      <nav className="personal-links" aria-label="More about Edward"><Link href={`/portfolio${query}`}>Explore my work <span aria-hidden="true">→</span></Link><Link href={`/resume${query}`}>View resume <span aria-hidden="true">→</span></Link></nav>
    </div>
  </PersonalPage>;
}
