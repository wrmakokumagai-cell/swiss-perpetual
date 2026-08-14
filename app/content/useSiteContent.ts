"use client";

import { useEffect, useState } from "react";
import { defaultSiteContent } from "./defaults";
import type { SiteContent } from "./types";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let live = true;
    fetch("/api/content", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((value) => { if (live) setContent(value); })
      .catch(() => undefined)
      .finally(() => { if (live) setLoaded(true); });
    return () => { live = false; };
  }, []);
  return { content, loaded };
}
