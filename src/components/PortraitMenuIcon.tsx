type IconKind = "home" | "about" | "work" | "resume" | "contact";
type Drawing = { outline: string; detail?: string; accent?: string };

// Original, optically aligned drawings. Theme groups share one SVG so switching
// appearance needs no client state, requests, or hydration-dependent replacement.
const drawings: Record<string, Record<IconKind, Drawing>> = {
  light: {
    home: { outline: "m4 14 12-10 12 10M7 12v15h7v-9h5v9h6V12" },
    about: { outline: "M21 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM7 27v-2a9 9 0 0 1 18 0v2" },
    work: { outline: "M5 5h9v9H5zM19 5h8v9h-8zM5 19h9v8H5zM19 19h8v8h-8z" },
    resume: { outline: "M8 4h11l6 6v18H8zM19 4v7h6", detail: "M12 16h9M12 21h7" },
    contact: { outline: "M8 6h16a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H13l-7 4v-5a4 4 0 0 1-2-3V10a4 4 0 0 1 4-4Z", detail: "M10 13h12M10 18h8" },
  },
  tokyo: {
    home: { outline: "m4 14 12-9 12 9M7 14v13h18V14M13 27v-9h6v9", detail: "M22 5v4", accent: "M4 17v6M27 18v5" },
    about: { outline: "M9 5H5v22h22V5h-4M20 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM9 24a7 7 0 0 1 14 0", accent: "M13 5h6M27 15v5" },
    work: { outline: "M4 9h7v18H4zM14 5h6v22h-6zM23 12h5v15h-5", detail: "M7 13h1M7 17h1M17 9v8M25 17h1", accent: "M14 23h6M4 5h7" },
    resume: { outline: "M7 5h18v22H7zM7 11h18", detail: "M11 16h10M11 21h7", accent: "M11 8h2M16 8h1M22 21v3" },
    contact: { outline: "M5 6h22v17H14l-7 5v-5H5z", detail: "M10 12h12M10 17h8", accent: "M27 10v6M5 10v3" },
  },
  neon: {
    home: { outline: "m4 14 12-10 12 10M7 13v11l3 3h12l3-3V13M13 27v-9h6v9", accent: "M14 12h4" },
    about: { outline: "m12 5-3 4v5l4 4h6l4-4V9l-3-4Zm-7 22 3-5 5-2h6l5 2 3 5", detail: "M12 11h8", accent: "M13 27h6" },
    work: { outline: "m5 5 9 0v9H5Zm14 0h8v9h-8ZM5 19h9v8H5zm14 0h8v8h-8Z", detail: "M14 9h5M9 14v5M23 14v5M14 23h5", accent: "M22 22h2v2h-2z" },
    resume: { outline: "M8 4h12l5 5v19H8zM20 4v6h5", detail: "M12 14h9M12 19h5M17 19v5h4", accent: "M5 11v10M21 24h1" },
    contact: { outline: "M8 5h16l4 4v11l-4 4H14l-7 4v-5l-3-3V9z", detail: "M10 12h12M10 17h8", accent: "M23 17h1" },
  },
  noir: {
    home: { outline: "m4 14 12-10 12 10M7 13v15h18V13M13 28V17h7v11", detail: "M22 5v5", accent: "M10 17v6" },
    about: { outline: "M25 16a9 12 0 1 1-18 0 9 12 0 0 1 18 0Z", detail: "M20 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM10 25v-3a6 6 0 0 1 12 0v3" },
    work: { outline: "M7 4h18v24H7zM11 8h10v11H11z", detail: "M11 24h10M4 8v16M28 8v16" },
    resume: { outline: "M8 4h12l5 5v19H8zM20 4v6h5", detail: "M12 14h9M12 18h9M12 22h6", accent: "M5 8v16" },
    contact: { outline: "M5 5h23v18H15l-8 5v-5H5z", detail: "M10 11h13M10 16h9", accent: "M2 9v10" },
  },
  matcha: {
    home: { outline: "M3 14c5 0 9-5 13-9 4 4 8 9 13 9M6 17h20M8 17v10h16V17M13 27v-7h6v7", detail: "M6 27h20", accent: "M11 11h10" },
    about: { outline: "M20.5 10c.5 3-1.3 5.3-4.4 5.3-3.1 0-5.1-2.2-4.6-5.2.4-2.8 2.3-4.8 4.8-4.6 2.5.1 4 1.9 4.2 4.5ZM6.5 26c.8-5.8 4-8.3 9.5-8.3 5.4 0 8.7 2.6 9.4 8.3", accent: "M11 27c3 .6 7 .6 10-.1" },
    work: { outline: "M4 8 12 5v21l-8 2Zm8-3 8 3v20l-8-2Zm8 3 8-3v21l-8 2", detail: "M7 20c1-3 2-4 3-4M14 20c2-4 3-4 4-2M22 19l4-5", accent: "M24 10v1" },
    resume: { outline: "M8 6h17v20H8ZM8 6c0-3-5-3-5 0s5 3 5 0Zm17 20c0-3 5-3 5 0s-5 3-5 0Z", detail: "M12 12h9M12 17h8M12 22h5" },
    contact: { outline: "M16 5C8 5 4 8 4 14c0 4 2 7 5 8l-1 6 7-4c8 0 13-3 13-10 0-6-4-9-12-9Z", detail: "M10 12c4-.5 8-.5 12 0M10 17c3-.3 6-.3 9 0" },
  },
};

export default function PortraitMenuIcon({ kind }: { kind: IconKind }) {
  return <svg className="portrait-menu-icon" viewBox="0 0 32 32" width="24" height="24"
    fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {Object.entries(drawings).map(([theme, set]) => <g key={theme} className={`menu-icon-drawing icon-${theme}`}>
      <path d={set[kind].outline} />
      {set[kind].detail && <path className="menu-icon-detail" d={set[kind].detail} />}
      {set[kind].accent && <path className="menu-icon-accent" d={set[kind].accent} />}
    </g>)}
  </svg>;
}
