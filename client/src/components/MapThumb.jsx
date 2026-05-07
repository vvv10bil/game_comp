import { useState } from "react";

import { MAP_IMAGE, MAP_THEME } from "../assets/images.js";

export function MapThumb({ map, size = "sm" }) {
  const [broken, setBroken] = useState(false);
  const src = MAP_IMAGE[map];
  const className = `map-thumb map-thumb-${size}`;
  const fallbackStyle = { background: MAP_THEME[map] ?? "var(--bg-hover)" };

  if (!src || broken) {
    return (
      <div className={className} style={fallbackStyle}>
        <span className="map-thumb-label">{map}</span>
      </div>
    );
  }

  return (
    <div className={className} style={fallbackStyle}>
      <img
        src={src}
        alt={map}
        loading="lazy"
        onError={() => setBroken(true)}
      />
      <span className="map-thumb-label">{map}</span>
    </div>
  );
}
