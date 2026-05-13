import { useState } from "react";

import { MAP_THEME, mapSources } from "../assets/images.js";

export function MapThumb({ map, size = "sm" }) {
  const sources = mapSources(map);
  const [idx, setIdx] = useState(0);
  const className = `map-thumb map-thumb-${size}`;
  const fallbackStyle = { background: MAP_THEME[map] ?? "var(--bg-hover)" };

  if (sources.length === 0 || idx >= sources.length) {
    return (
      <div className={className} style={fallbackStyle}>
        <span className="map-thumb-label">{map}</span>
      </div>
    );
  }

  return (
    <div className={className} style={fallbackStyle}>
      <img
        key={idx}
        src={sources[idx]}
        alt={map}
        loading="lazy"
        onError={() => setIdx((i) => i + 1)}
      />
      <span className="map-thumb-label">{map}</span>
    </div>
  );
}
