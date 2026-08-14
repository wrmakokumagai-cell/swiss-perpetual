"use client";

import { CSSProperties, useEffect, useRef } from "react";
import styles from "./HomeEditorial.module.css";

type WipeStyle = CSSProperties & { "--wipe-line-1": number; "--wipe-line-2": number; "--wipe-line-3": number };
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => value * value * (3 - 2 * value);

export default function ScrollWipeHeading({ lines = ["Watches with", "a life beyond", "the moment."] }: { lines?: [string, string, string] }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const heading = headingRef.current;
    const stage = heading?.closest<HTMLElement>("[data-wipe-stage]");
    if (!heading || !stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      if (reducedMotion.matches) {
        [1, 2, 3].forEach((line) => heading.style.setProperty(`--wipe-line-${line}`, "1"));
        return;
      }
      const rect = stage.getBoundingClientRect();
      const revealStart = window.innerHeight * 0.5 - stage.offsetHeight * 0.5;
      const distance = Math.max(160, stage.offsetHeight * 0.72);
      const progress = clamp((revealStart - rect.top) / distance);
      const line = (start: number, end: number) => smooth(clamp((progress - start) / (end - start)));
      heading.style.setProperty("--wipe-line-1", String(line(0.04, 0.28)));
      heading.style.setProperty("--wipe-line-2", String(line(0.20, 0.44)));
      heading.style.setProperty("--wipe-line-3", String(line(0.36, 0.60)));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(draw); };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => { if (frame) window.cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reducedMotion.removeEventListener("change", schedule); };
  }, []);
  const initialStyle = { "--wipe-line-1": 0, "--wipe-line-2": 0, "--wipe-line-3": 0 } as WipeStyle;
  const lineStyle = (variable: string) => ({ "--line-progress": variable } as CSSProperties);
  return <h2 ref={headingRef} id="feature-title" className={styles.wipeHeading} style={initialStyle} aria-label={lines.join(" ")}>
    {lines.map((line, index) => <span className={styles.wipeLine} style={lineStyle(`var(--wipe-line-${index + 1})`)} key={`${line}-${index}`}>{line}</span>)}
  </h2>;
}
