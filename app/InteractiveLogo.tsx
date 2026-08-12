"use client";

import { CSSProperties, useState } from "react";

type InteractiveLogoProps = {
  src: string;
  className: string;
  markClassName: string;
};

export default function InteractiveLogo({ src, className, markClassName }: InteractiveLogoProps) {
  const [selected, setSelected] = useState(false);
  const style = { "--logo-image": `url("${src}")` } as CSSProperties;

  return (
    <button
      type="button"
      className={className}
      data-selected={selected ? "true" : "false"}
      aria-pressed={selected}
      aria-label="Toggle Swiss Perpetual logo color"
      onClick={() => setSelected((current) => !current)}
    >
      <span className={markClassName} style={style} aria-hidden="true" />
    </button>
  );
}