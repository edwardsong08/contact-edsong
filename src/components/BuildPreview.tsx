"use client";

import { useState } from "react";
import Arrow from "./Arrow";

const modes = ["A website", "A web app", "A bigger idea"] as const;
export default function BuildPreview() {
  const [mode, setMode] = useState(0);
  return <div className="build-preview">
    <div className="preview-label"><span className="tiny-cross">+</span> A little possibility, in pixels.</div>
    <div className="preview-stage">
      <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
      <div className="browser-preview" aria-label={`Illustrative ${modes[mode].toLowerCase()} concept`}>
        <div className="browser-bar"><span className="browser-dots" aria-hidden="true"><i/><i/><i/></span><span>your-next-big-thing.com</span><span className="browser-plus" aria-hidden="true">+</span></div>
        <div className={`concept concept-${mode}`}>
          {mode === 0 ? <>
            <div className="concept-nav"><b>form & field<span>®</span></b><span>Made for the everyday ↗</span></div>
            <div className="concept-site"><div><span className="micro">A DIFFERENT PERSPECTIVE</span><p>Small details.<br/><em>Big feeling.</em></p><span className="mock-link">Find your thing <Arrow /></span></div><div className="sculpture" aria-hidden="true"><div/><div/><div/></div></div>
            <div className="concept-bottom"><span>Thoughtfully made. Beautifully simple.</span><span>01 — 03</span></div>
          </> : mode === 1 ? <>
            <div className="concept-nav"><b>Monday<span>●</span></b><span>Your space to make progress.</span></div>
            <div className="app-greeting">A little less busywork.<br/><em>A lot more clarity.</em></div>
            <div className="mock-stats"><div><span>In progress</span><strong>08</strong><small>Everything in its place</small></div><div><span>This week</span><strong>12<span>↗</span></strong><small>One step further</small></div></div>
            <div className="mock-task"><i/> Website launch <span>In motion</span></div>
          </> : <>
            <div className="concept-nav"><b>Common Ground<span>↗</span></b><span>A connected experience.</span></div>
            <div className="platform-heading">More than a page.<br/><em>A whole ecosystem.</em></div>
            <div className="platform-map" aria-hidden="true"><div className="platform-line"/><span>People</span><b>YOUR IDEA</b><span>Workflows</span><span>Data</span><span>Possibility</span></div>
          </>}
        </div>
      </div>
      <div className="preview-sticker" aria-hidden="true"><span>BUILT AROUND</span><b>you.</b><span>NOT A TEMPLATE</span></div>
      <div className="preview-note">An idea → something real <svg width="45" height="30" viewBox="0 0 45 30" fill="none" aria-hidden="true"><path d="M2 6c15 22 28 16 35 0m-11 4 12-6 3 13" stroke="currentColor" strokeWidth="1.4"/></svg></div>
    </div>
    <div className="preview-controls" aria-label="Explore illustrative project concepts">{modes.map((label, i) => <button type="button" aria-pressed={mode === i} key={label} onClick={() => setMode(i)}>{label}<span aria-hidden="true">{mode === i ? "↗" : "+"}</span></button>)}</div>
    <p className="concept-caption">Illustrative concepts. Your project starts with your story.</p>
  </div>;
}
