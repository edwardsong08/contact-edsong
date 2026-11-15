import type { Metadata } from "next";
import PersonalPage from "@/components/PersonalPage";
import { normalizeSource } from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Resume — Edward Song",
  description: "Edward Song’s career timeline, technical focus, and areas of work.",
  alternates: { canonical: "/resume" },
};

const experience = [
  { role: "Chief Technology Officer", organization: "The Realms of Asgard, Inc.", dates: "Feb 2026 — Present" },
  { role: "Independent Engineering & Consulting", organization: "", dates: "Aug 2022 — Present" },
  { role: "Product Lead", organization: "Legal Technology Startup", dates: "Sep 2021 — Aug 2023" },
];

const focus = [
  "Technical direction & architecture",
  "Product engineering & integrations",
  "Infrastructure, security & reliability",
];

const areasOfWork = [
  "Health tech",
  "Legal tech",
  "Nonprofit technology",
  "Games & interactive systems",
];

export default async function Resume({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  const source = normalizeSource((await searchParams).from);
  return (
    <PersonalPage source={source} className="resume-page">
      <div className="personal-intro resume-intro">
        <p className="personal-kicker">Resume</p>
        <h1>Edward Song</h1>
      </div>

      <div className="resume-body">
        <section className="resume-section resume-career" aria-labelledby="experience">
          <h2 id="experience">Experience</h2>
          <ol className="resume-timeline">
            {experience.map(job => (
              <li className="resume-job" key={job.role}>
                <p className="resume-dates">{job.dates}</p>
                <div className="resume-job-content">
                  <h3>{job.role}</h3>
                  {job.organization && <p className="resume-organization">{job.organization}</p>}
                </div>
              </li>
            ))}
            <li className="resume-job resume-earlier">
              <p className="resume-dates">2014 — 2025</p>
              <div className="resume-job-content">
                <h3>Earlier experience</h3>
                <ul className="resume-earlier-fields">
                  <li>Legal operations</li>
                  <li>Education & admissions consulting</li>
                  <li>Professional writing</li>
                </ul>
              </div>
            </li>
          </ol>
        </section>

        <div className="resume-details">
          <section className="resume-section" aria-labelledby="focus">
            <h2 id="focus">Focus</h2>
            <ul className="resume-focus">
              {focus.map(item => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section className="resume-section resume-areas" aria-labelledby="areas-of-work">
            <h2 id="areas-of-work">Areas of work</h2>
            <ul className="resume-area-list">
              {areasOfWork.map(area => <li key={area}>{area}</li>)}
            </ul>
          </section>
          <section className="resume-section resume-languages" aria-labelledby="languages">
            <h2 id="languages">Languages</h2>
            <p>Korean · English</p>
          </section>
        </div>
      </div>
    </PersonalPage>
  );
}
