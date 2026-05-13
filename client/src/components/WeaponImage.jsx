import { useState } from "react";

import { WEAPON_IMAGE, weaponLocalPath } from "../assets/images.js";

export function WeaponImage({ name, className = "weapon-img", alt }) {
  const sources = [weaponLocalPath(name), WEAPON_IMAGE[name]].filter(Boolean);
  const [idx, setIdx] = useState(0);

  if (idx >= sources.length) {
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
