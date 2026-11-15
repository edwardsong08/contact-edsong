import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PersonalPage from "@/components/PersonalPage";
import { normalizeSource } from "@/lib/inquiry";
export const metadata: Metadata = { title: "About me — Edward Song", description: "The person behind the websites, products, and systems.", alternates: { canonical: "/about" } };
export default async function About({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  const query = source ? `?from=${encodeURIComponent(source)}` : "";
  return <PersonalPage source={source} className="about-page">
    <div className="about-layout">
      <div className="personal-intro about-intro"><p className="personal-kicker">About me</p><h1>Hi, I’m Edward.</h1></div>
      <figure className="about-photo"><Image src="/about-edward.webp" alt="Edward smiling beside his Labrador" width={2944} height={2208} loading="eager" sizes="(max-width:800px) 90vw, 480px" /><figcaption><span>Northern New Jersey / NYC Metro</span><span>Korean & English</span></figcaption></figure>
      <div className="about-copy">
        <p>I design and build websites, web apps, and the systems that keep them running.</p>
        <p>I’m CTO at The Realms of Asgard, Inc., and an independent engineer and consultant working with businesses and nonprofits.</p>
        <p>Before software, I worked in teaching, comedy writing, and legal operations. Those experiences shaped how I listen, explain ideas, and work through problems.</p>
        <p>Outside work, I enjoy hiking, guitar, reading, and golf.</p>
        <div className="personal-links"><Link href={`/portfolio${query}`}>Explore my work <span aria-hidden="true">→</span></Link><Link href={`/resume${query}`}>View resume <span aria-hidden="true">→</span></Link></div>
      </div>
    </div>
  </PersonalPage>;
}
