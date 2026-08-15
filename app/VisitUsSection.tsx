"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { VisitLocation } from "./content/types";
import styles from "./VisitUsSection.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => path.startsWith("http") ? path : basePath + path;
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function VisitUsSection({ locations }: { locations: VisitLocation[] }) {
  const stageRef = useRef<HTMLElement>(null);
  const visibleLocations = useMemo(() => (locations ?? []).filter((location) => location.visible), [locations]);
  const [selectedId, setSelectedId] = useState(visibleLocations[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visibleLocations.some((location) => location.id === selectedId)) setSelectedId(visibleLocations[0]?.id ?? "");
  }, [selectedId, visibleLocations]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(clamp(-rect.top / distance));
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const location = visibleLocations.find((item) => item.id === selectedId) ?? visibleLocations[0];
  if (!location) return null;
  const featureReveal = clamp((progress - 0.24) / 0.2);
  const mapReveal = clamp((progress - 0.62) / 0.2);

  return <section ref={stageRef} className={styles.stage} id="visit-us" aria-labelledby="visit-title">
    <div className={styles.sticky}>
      <nav className={styles.selector} aria-label="Select showroom city">
        {visibleLocations.map((item) => <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} aria-pressed={selectedId === item.id}>{item.code}</button>)}
      </nav>
      <article className={styles.heroPanel}>
        <Image src={asset(location.image)} alt={`Swiss Perpetual ${location.city} showroom`} fill unoptimized sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}><p>Swiss Perpetual</p><h2 id="visit-title">{location.city}</h2><span>{location.lead}</span></div>
      </article>
      <article className={styles.featurePanel} style={{ clipPath: `inset(0 0 ${(1 - featureReveal) * 100}% 0)` }} aria-hidden={featureReveal < 0.02}>
        <div className={styles.featureTitle}><p>{location.code} / Visit us</p><h3>Everything you need is near.</h3></div>
        <div className={styles.featureDetails}>
          <div><span>Location</span><h4>{location.area}</h4><p>{location.access}</p></div>
          <div><span>What to expect</span><h4>Considered, never rushed.</h4><p>{location.expectation}</p></div>
        </div>
        <div className={styles.featurePhoto}><Image src={asset(location.image)} alt="" fill unoptimized sizes="48vw" /></div>
      </article>
      <article className={styles.mapPanel} style={{ clipPath: `inset(0 0 ${(1 - mapReveal) * 100}% 0)` }} aria-hidden={mapReveal < 0.02}>
        <iframe title={`Map for Swiss Perpetual ${location.city}`} src={`https://www.google.com/maps?q=${encodeURIComponent(location.map)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className={styles.mapLabel}><p>{location.code} / Find us</p><h3>{location.city}</h3><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.map)}`} target="_blank" rel="noreferrer">Open in Google Maps</a></div>
      </article>
    </div>
  </section>;
}