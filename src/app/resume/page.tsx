import type { Metadata } from "next";
import PersonalPage from "@/components/PersonalPage";
import { normalizeSource } from "@/lib/inquiry";
export const metadata: Metadata = { title: "Resume — Edward Song", description: "Edward Song — CTO, technical lead, and product engineer.", alternates: { canonical: "/resume" } };
const experience = [
 { role: "Chief Technology Officer", kind: "Volunteer", organization: "The Realms of Asgard, Inc.", dates: "Feb 2026 — Present", points: [
  "Lead technology for a 50+ volunteer organization and 800+ member community.",
  "Build and operate public sites, internal platforms, game integrations, servers, backups, bots, and AI tools.",
  "Reduced recurring costs by bringing platforms, hosting, and game infrastructure in-house.",
  "Established access controls, deployment workflows, SOPs, and tools for administrative and volunteer crisis-response work."
 ] },
 { role: "Technical Lead", kind: "Contract", organization: "Ryu Legal", dates: "Aug 2022 — Present", points: [
  "Own infrastructure, security, deployments, and custom software for the firm.",
  "Led SEO and performance improvements that contributed to 30%+ more client inquiries.",
  "Build secure intake, internal tools, and integrations using custom and open-source software."
 ] },
 { role: "Product Lead", kind: "", organization: "Legal Technology Startup", dates: "Sep 2021 — Aug 2023", points: [
  "Turned U.S. immigration-service operations into product requirements, decision trees, and wireframes.",
  "Designed intake, eligibility triage, document collection, milestone tracking, and attorney-client matching."
 ] }
];
export default async function Resume({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
 const source = normalizeSource((await searchParams).from);
 return <PersonalPage source={source} className="resume-page">
  <div className="personal-intro resume-intro"><p className="personal-kicker">Resume</p><h1>Edward Song</h1><p className="personal-lead">CTO · Technical Lead · Product Engineer</p><p className="resume-location">Northern New Jersey / NYC Metro</p><p className="resume-summary">I build and operate software, infrastructure, and workflow systems.</p><a className="resume-download" href="/Resume-Edward_Song.pdf" download>Download PDF <span aria-hidden="true">↓</span></a></div>
  <div className="resume-body">

   <section className="resume-section" id="experience"><h2><span>01</span> Experience</h2><div>{experience.map(job=><article className="resume-job" key={job.organization}><p className="resume-dates">{job.dates}</p><div className="resume-job-content"><div className="resume-job-heading"><h3>{job.role}{job.kind && <span>{job.kind}</span>}</h3></div><p className="resume-organization">{job.organization}</p>{job.organization.startsWith("The Realms") && <p className="resume-progression">Promoted from Software Engineer to Senior Software Engineer, Interim CTO, and CTO.</p>}<ul>{job.points.map(point=><li key={point}>{point}</li>)}</ul></div></article>)}</div></section>
   <section className="resume-section" id="capabilities"><h2><span>02</span> Core capabilities</h2><dl className="resume-skills"><div><dt>Leadership</dt><dd>Technical direction, product strategy, requirements, team coordination, stakeholder translation</dd></div><div><dt>Systems & security</dt><dd>Workflow systems, RBAC, secure intake, auditability, performance, operational governance</dd></div><div><dt>Engineering</dt><dd>TypeScript/JavaScript, PHP, Go, Python, Java, SQL; React, Next.js, Spring Boot</dd></div><div><dt>Infrastructure & operations</dt><dd>Linux, Proxmox, Coolify, Cloudflare, Docker, GitHub Actions, self-hosting, Kubernetes migration planning</dd></div></dl></section>
   <section className="resume-section" id="selected"><h2><span>03</span> Selected work</h2><div className="resume-skills"><p><strong>Main Hub</strong>Interactive map of my projects, services, and infrastructure.</p><p><strong>TROA Gaming Systems, Division 2</strong>More than a dozen Space Engineers plugins, plus maps, servers, and community tools.</p></div></section>
   <section className="resume-section" id="background"><h2><span>04</span> Background</h2><dl className="resume-skills"><div><dt>Earlier experience · 2014–2025</dt><dd>Legal operations, education/admissions consulting, and professional writing</dd></div><div><dt>Selected education</dt><dd>University of Michigan, Ann Arbor — Engineering coursework<br/>Penn State — Political Science coursework</dd></div><div><dt>Prior cloud experience</dt><dd>AWS EC2, RDS, and S3</dd></div><div><dt>Languages</dt><dd>Korean and English</dd></div></dl></section>
  </div>
 </PersonalPage>;
}
