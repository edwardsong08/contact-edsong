"use client";

import { useRef, useState } from "react";

type Stroke = { color: number; points: string };
const colors = ["var(--play-1)", "var(--play-2)", "var(--play-3)"];

/** Ephemeral drawing: no upload, persistence, or background animation loop. */
export default function DrawingCanvas({ onDone }: { onDone: () => void }) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [color, setColor] = useState(0);
  const pointer = useRef<number | null>(null);

  return <div className="playground draw">
    <svg className="drawing-canvas" aria-label="Drawing canvas. Drag to draw." onPointerDown={e => {
      if (pointer.current !== null || e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      pointer.current = e.pointerId;
      const point = e.clientX + "," + e.clientY;
      setStrokes(s => [...s.slice(-199), { color, points: point + " " + (e.clientX + .1) + "," + e.clientY }]);
    }} onPointerMove={e => {
      if (pointer.current !== e.pointerId) return;
      setStrokes(s => s.map((stroke, i) => i === s.length - 1 && stroke.points.length < 100000
        ? { ...stroke, points: stroke.points + " " + e.clientX + "," + e.clientY } : stroke));
    }} onPointerUp={e => { if (pointer.current === e.pointerId) pointer.current = null; }}
      onPointerCancel={() => { pointer.current = null; }}
      onLostPointerCapture={() => { pointer.current = null; }}>
      {strokes.map((stroke, i) => <polyline key={i} points={stroke.points} fill="none" stroke={colors[stroke.color]} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
    <div className="play-toolbar" role="region" aria-label="Drawing controls">
      <div className="play-hint">Make your mark.<small>Only here. Only for now.</small></div>
      <div className="play-tools">
        <div className="pen-colors" aria-label="Ink color">{colors.map((c, i) => <button key={c} aria-label={"Ink " + (i + 1)} aria-pressed={color === i} style={{ background: c }} onClick={() => setColor(i)} />)}</div>
        <button disabled={!strokes.length} onClick={() => setStrokes(s => s.slice(0, -1))}>Undo</button>
        <button disabled={!strokes.length} onClick={() => setStrokes([])}>Clear</button>
        <button className="play-done" onClick={onDone}>Done</button>
      </div>
    </div>
  </div>;
}

