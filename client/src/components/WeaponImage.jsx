import { useState } from "react";

import { WEAPON_IMAGE } from "../assets/images.js";

export function WeaponImage({ name, className = "weapon-img", alt }) {
  const [broken, setBroken] = useState(false);
  const src = WEAPON_IMAGE[name];

  if (!src || broken) {
    return (
      <div className={`${className} weapon-img-fallback`}>
        <span>{name}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt ?? name}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}
