"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./portfolio.module.css";

export type Project = {
  name: string;
  type: string;
  image?: string;
  alt?: string;
  href: string;
  featured?: boolean;
  category: "work" | "development" | "personal";
  previewHref?: string;
  comingSoon?: boolean;
};

function ProjectPreview({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = overflow; };
  }, []);

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="project-preview-title"
    onClose={onClose} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
    }}>
    <div className={styles.dialogHeader}>
      <h2 id="project-preview-title">{project.name}</h2>
      <a className={styles.externalPreview} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} in a new tab`} title="Open site in a new tab">
        <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true"><path d="M14 4h6v6m0-6L10 14M10 5H5v14h14v-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      <button ref={closeButton} className={styles.closePreview} aria-label="Close project preview" onClick={() => dialog.current?.close()}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>
    </div>
    <div className={styles.previewCanvas} aria-busy={loading}>
      {loading && <div className={styles.loadingPreview} role="status">Loading preview…</div>}
      <iframe src={project.previewHref ?? project.href} title={`${project.name} live preview`} className={styles.liveFrame}
        onLoad={() => setLoading(false)} sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" />
    </div>
  </dialog>;
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);

  function renderProject(project: Project, nested = false) {
    const Heading = nested ? "h4" : "h3";
    if (project.comingSoon) return <article key={project.name} className={styles.project}>
      <div className={styles.preview}><Image src="/portfolio/blog-coming-soon.svg" alt="Blog coming soon" width={1265} height={712} sizes="(max-width:700px) 90vw, 520px" className={styles.placeholderImage}/></div>
      <div className={styles.projectInfo}><div className={styles.projectHeading}><Heading>{project.name}</Heading></div></div>
    </article>;
    return <article key={project.name} className={styles.project}>
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.previewLink}
        aria-label={`Preview ${project.name}`} aria-haspopup="dialog" onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault(); opener.current = event.currentTarget; setSelected(project);
        }}>
        <div className={styles.preview}><Image src={project.image!} alt={project.alt!} width={1265} height={712}
          sizes="(max-width:700px) calc(100vw - 50px), (max-width:800px) calc(50vw - 50px), (max-width:1200px) calc(50vw - 82px), 520px"
          preload={project.featured} className={styles.image} /></div>
      <div className={styles.projectInfo}><div className={styles.projectHeading}>
        <Heading className={styles.projectLink}><span className={styles.projectName}>{project.name}</span><span className={styles.projectType}>{project.type}</span></Heading>
        <span className={styles.projectArrow} aria-hidden="true">⤢</span>
      </div></div>
      </a>
    </article>;
  }

  return <>
    <section className={styles.collection} aria-labelledby="work-title">
      <h2 id="work-title" className={styles.sectionTitle}><span className={styles.sectionNumber}>01</span>Work</h2>
      <div className={styles.projects}>{projects.filter(project => project.category === "work").map(project => renderProject(project))}</div>
      <section className={styles.development} aria-labelledby="development-title">
        <h3 id="development-title" className={styles.subsectionTitle}><span aria-hidden="true" />In development</h3>
        <div className={styles.projects}>{projects.filter(project => project.category === "development").map(project => renderProject(project, true))}</div>
      </section>
    </section>
    <section className={styles.collection} aria-labelledby="personal-title">
      <h2 id="personal-title" className={styles.sectionTitle}><span className={styles.sectionNumber}>02</span>Personal</h2>
      <div className={styles.projects}>{projects.filter(project => project.category === "personal").map(project => renderProject(project))}</div>
    </section>
    {selected && <ProjectPreview project={selected} onClose={() => { setSelected(null); opener.current?.focus({ preventScroll: true }); }} />}
  </>;
}
