"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import PortraitMenuIcon from "./PortraitMenuIcon";

const items = [
  { label: "About me", href: "/about", icon: "about" },
  { label: "Selected work", href: "/portfolio", icon: "work" },
  { label: "Resume", href: "/resume", icon: "resume" },
] as const;

export default function Portrait({ source = "" }: { source?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();
  const filterId = `portrait-goo-${menuId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault(); setOpen(false); trigger.current?.focus();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open]);

  useEffect(() => {
    if (open) options.current[active]?.focus();
  }, [open, active]);

  function openAt(index: number) { setActive(index); setOpen(true); }
  function navigate(event: React.KeyboardEvent) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": case "ArrowDown": next = (active + 1) % items.length; break;
      case "ArrowLeft": case "ArrowUp": next = (active + items.length - 1) % items.length; break;
      case "Home": next = 0; break;
      case "End": next = items.length - 1; break;
      default: return;
    }
    event.preventDefault(); setActive(next);
  }

  return <div ref={root} className="portrait-navigation" data-open={open}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={trigger} type="button" className="portrait-trigger" aria-label={open ? "Close personal menu" : "Open personal menu"}
      aria-haspopup="menu" aria-expanded={open} aria-controls={menuId}
      onClick={() => { if (open) setOpen(false); else openAt(0); }}
      onKeyDown={event => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault(); openAt(event.key === "ArrowUp" ? items.length - 1 : 0);
        }
      }}>
      <span className="portrait"><Image src="/portrait.png" width={88} height={88} sizes="44px" alt="" /></span>
      <span className="portrait-close" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path className="portrait-menu-cue" d="m3 4.5 3 3 3-3"/><path className="portrait-menu-dismiss" d="m3 3 6 6m0-6L3 9" /></svg></span>
    </button>
    <svg className="portrait-goo" viewBox="-16 -16 232 212" width="232" height="212" aria-hidden="true" focusable="false">
      <defs><filter id={filterId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter></defs>
      <g filter={`url(#${filterId})`}><circle cx="22" cy="22" r="20" />
        {items.map((item, index) => <circle key={item.label} className={`portrait-drop portrait-position-${index}`} cx="22" cy="22" r="26" />)}
      </g>
    </svg>
    <div id={menuId} className="portrait-menu" role="menu" aria-label="Personal navigation" aria-hidden={!open} inert={!open} onKeyDown={navigate}>
      {items.map((item, index) => <Link key={item.label} ref={element => { options.current[index] = element; }}
        className={`portrait-blob portrait-position-${index}`} href={item.href + (source ? `?from=${encodeURIComponent(source)}` : "")} role="menuitem" aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)} tabIndex={open && active === index ? 0 : -1}
        onFocus={() => setActive(index)}>
        <span className="portrait-blob-content">
          <PortraitMenuIcon kind={item.icon} />
        </span>
        <span className="portrait-blob-label">{item.label}</span>
        <span className="portrait-blob-soon" aria-hidden="true">›</span>
      </Link>)}
    </div>
  </div>;
}
