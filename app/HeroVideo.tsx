"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = { src: string; poster?: string };

export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => void video.play().catch(() => undefined);
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", play);
    play();
    return () => {
      window.removeEventListener("pageshow", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-label="Swiss Perpetual collection film"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}