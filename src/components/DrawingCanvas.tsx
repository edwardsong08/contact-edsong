"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Stroke = { color: number; path: string };
const colors = ["var(--play-1)", "var(--play-2)", "var(--play-3)"];
const coordinate = (value: number) => value.toFixed(2);

// Midpoint quadratics keep the pen under the pointer without angular joins.
function smoothPath(points: Point[]) {
  if (!points.length) return "";
  const first = points[0];
  let path = `M${coordinate(first.x)} ${coordinate(first.y)}`;
  if (points.length === 1) return path + `l.01 0`;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i], next = points[i + 1];
    path += `Q${coordinate(p.x)} ${coordinate(p.y)} ${coordinate((p.x + next.x) / 2)} ${coordinate((p.y + next.y) / 2)}`;
  }
  const last = points[points.length - 1];
  return path + `L${coordinate(last.x)} ${coordinate(last.y)}`;
}

/** Ephemeral ink: coalesced input, one visual update per frame, bounded history. */
export default function DrawingCanvas({ onDone }: { onDone: () => void }) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [color, setColor] = useState(0);
  const pointer = useRef<number | null>(null);
  const points = useRef<Point[]>([]);
  const live = useRef<SVGPathElement>(null);
  const frame = useRef(0);
  const ink = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function append(event: React.PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const samples = event.nativeEvent.getCoalescedEvents?.() || [];
    for (const sample of samples.length ? samples : [event.nativeEvent]) {
      if (points.current.length >= 4000) break;
      const p = { x: (sample.clientX - bounds.left) / bounds.width * 1000, y: (sample.clientY - bounds.top) / bounds.height * 1000 };
      const previous = points.current[points.current.length - 1];
      // Measure in screen pixels so portrait screens have the same pen feel.
      if (!previous || Math.hypot((p.x-previous.x)*bounds.width/1000, (p.y-previous.y)*bounds.height/1000) >= .8) points.current.push(p);
    }
    if (!frame.current) frame.current = requestAnimationFrame(() => {
      live.current?.setAttribute("d", smoothPath(points.current)); frame.current = 0;
    });
  }
  function finish() {
    if (pointer.current === null) return;
    cancelAnimationFrame(frame.current); frame.current = 0;
    const path = smoothPath(points.current), strokeColor = ink.current;
    if (path) setStrokes(s => [...s.slice(-199), { color: strokeColor, path }]);
    pointer.current = null; points.current = [];
    live.current?.setAttribute("d", "");
  }
  return <div className="playground draw">
    <svg className="drawing-canvas" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label="Doodle canvas. Drag to draw. Escape exits." onPointerDown={event => {
      if (pointer.current !== null || event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      pointer.current = event.pointerId; points.current = []; ink.current = color;
      live.current?.setAttribute("stroke", colors[color]); append(event);
    }} onPointerMove={event => { if (pointer.current === event.pointerId) append(event); }}
      onPointerUp={event => { if (pointer.current === event.pointerId) { append(event); finish(); } }}
      onPointerCancel={finish} onLostPointerCapture={finish}>
      {strokes.map((stroke, i) => <path key={i} d={stroke.path} fill="none" stroke={colors[stroke.color]} strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />)}
      <path ref={live} fill="none" stroke={colors[color]} strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
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
