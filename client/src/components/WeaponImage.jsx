import { useState } from "react";

import { weaponSources } from "../assets/images.js";

export function WeaponImage({ name, className = "weapon-img", alt }) {
  const sources = weaponSources(name);
  const [idx, setIdx] = useState(0);

  if (sources.length === 0 || idx >= sources.length) {
    return (
      <div className={`${className} weapon-img-fallback`}>
        <span>{name}</span>
      </div>
    );
  }

  return (
    <img
      key={idx}
      className={className}
      src={sources[idx]}
      alt={alt ?? name}
      loading="lazy"
      onError={() => setIdx((i) => i + 1)}
    />
  );
}
