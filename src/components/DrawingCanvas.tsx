"use client";

import { useRef, useState } from "react";

type Stroke = { color: number; points: string };
const colors = ["var(--play-1)", "var(--play-2)", "var(--play-3)"];

/** Ephemeral, bounded drawing. Normalized coordinates preserve composition on resize. */
export default function DrawingCanvas({ onDone }: { onDone: () => void }) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [color, setColor] = useState(0);
  const pointer = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });
  function point(event: React.PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - bounds.left) / bounds.width * 1000, y: (event.clientY - bounds.top) / bounds.height * 1000 };
  }

  return <div className="playground draw">
    <svg className="drawing-canvas" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label="Doodle canvas. Drag to draw. Escape exits." onPointerDown={event => {
      if (pointer.current !== null || event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      pointer.current = event.pointerId;
      const p = point(event); last.current = p;
      setStrokes(s => [...s.slice(-199), { color, points: p.x + "," + p.y + " " + (p.x + .01) + "," + p.y }]);
    }} onPointerMove={event => {
      if (pointer.current !== event.pointerId) return;
      const p = point(event);
      if (Math.hypot(p.x - last.current.x, p.y - last.current.y) < .5) return;
      last.current = p;
      setStrokes(s => s.map((stroke, i) => i === s.length - 1 && stroke.points.length < 100000
        ? { ...stroke, points: stroke.points + " " + p.x.toFixed(2) + "," + p.y.toFixed(2) } : stroke));
    }} onPointerUp={event => { if (pointer.current === event.pointerId) pointer.current = null; }}
      onPointerCancel={() => { pointer.current = null; }}
      onLostPointerCapture={() => { pointer.current = null; }}>
      {strokes.map((stroke, i) => <polyline key={i} points={stroke.points} fill="none" stroke={colors[stroke.color]} strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
    <div className="play-toolbar" role="region" aria-label="Doodle controls">
      <div className="pen-colors" aria-label="Ink color">{colors.map((c, i) => <button key={c} aria-label={"Ink " + (i + 1)} aria-pressed={color === i} onClick={() => setColor(i)}><span style={{ background: c }} /></button>)}</div>
      <span className="tool-divider" aria-hidden="true" />
      <button className="drawing-tool" title="Undo" aria-label="Undo last stroke" disabled={!strokes.length} onClick={() => setStrokes(s => s.slice(0, -1))}><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5-5 5 5 5M4 10h10a5 5 0 0 1 0 10h-2"/></svg></button>
      <button className="drawing-tool" title="Clear drawing" aria-label="Clear drawing" disabled={!strokes.length} onClick={() => setStrokes([])}><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 15 9-10a2 2 0 0 1 3 0l4 4a2 2 0 0 1 0 3l-8 9H8l-4-4a2 2 0 0 1 0-2ZM9 10l8 8M12 21h9"/></svg></button>
      <button className="play-done" onClick={onDone}>Done</button>
    </div>
  </div>;
}
