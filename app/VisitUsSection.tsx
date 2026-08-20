"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { VisitLocation } from "./content/types";
import styles from "./VisitUsSection.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => path.startsWith("http") ? path : basePath + path;

export default function VisitUsSection({ locations }: { locations: VisitLocation[] }) {
  const visibleLocations = useMemo(() => (locations ?? []).filter((location) => location.visible), [locations]);
  const [selectedId, setSelectedId] = useState(visibleLocations[0]?.id ?? "");

  useEffect(() => {
    if (!visibleLocations.some((location) => location.id === selectedId)) setSelectedId(visibleLocations[0]?.id ?? "");
  }, [selectedId, visibleLocations]);

  const location = visibleLocations.find((item) => item.id === selectedId) ?? visibleLocations[0];
  if (!location) return null;

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(location.map)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.map)}`;

  return (
    <section className={styles.section} id="visit-us" aria-labelledby="visit-title">
      <header className={styles.headingRow}>
        <p>Visit us</p>
        <div>
          <h2 id="visit-title">A closer look, in person.</h2>
          <p>Discover the Swiss Perpetual collection in Manila, Cebu, or Davao through a private, considered viewing.</p>
        </div>
      </header>

      <nav className={styles.selector} aria-label="Select showroom city">
        {visibleLocations.map((item) => (
          <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} aria-pressed={selectedId === item.id}>
            {item.code}
          </button>
        ))}
      </nav>

      <article className={styles.showroom} key={`showroom-${location.id}`}>
        <Image src={asset(location.image)} alt={`Swiss Perpetual ${location.city} showroom`} fill priority={location.id === visibleLocations[0]?.id} unoptimized sizes="(max-width: 760px) 100vw, 96vw" />
        <div className={styles.showroomShade} />
        <div className={styles.showroomCopy}>
          <p>{location.code} / Swiss Perpetual</p>
          <h3>{location.city}</h3>
          <span>{location.lead}</span>
        </div>
      </article>

      <div className={styles.details} key={`details-${location.id}`}>
        <div className={styles.detailsLead}>
          <p>{location.code} / Private viewing</p>
          <h3>Everything you need is near.</h3>
        </div>
        <div>
          <p className={styles.label}>Location</p>
          <h4>{location.area}</h4>
          <p>{location.access}</p>
        </div>
        <div>
          <p className={styles.label}>What to expect</p>
          <h4>Considered, never rushed.</h4>
          <p>{location.expectation}</p>
        </div>
      </div>

      <article className={styles.mapBlock} key={`map-${location.id}`}>
        <iframe title={`Map for Swiss Perpetual ${location.city}`} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className={styles.mapCopy}>
          <p>{location.code} / Find us</p>
          <h3>{location.city}</h3>
          <p>{location.area}. Arrange a private viewing and take the time to experience each piece closely.</p>
          <a href={mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
        </div>
      </article>
    </section>
  );
}
