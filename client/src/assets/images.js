// Image resolution order used by <WeaponImage> and <MapThumb>:
//   1. Local file from client/public/media/   (highest priority)
//   2. ByMykel/CSGO-API GitHub CDN
//   3. CSS-only fallback card
//
// Drop your CS2 game assets into:
//   client/public/media/intro.webm
//   client/public/media/weapons/<slug>.png      (e.g. ak-47.png, m4a4.png)
//   client/public/media/maps/<map>.png          (e.g. de_dust2.png)

export function weaponLocalPath(name) {
  if (!name) return null;
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return `/media/weapons/${slug}.png`;
}

export function mapLocalPath(map) {
  if (!map) return null;
  return `/media/maps/${map}.png`;
}

export const HERO_VIDEO = "/media/intro.webm";

const CDN = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images";

export const WEAPON_IMAGE = {
  "AK-47": `${CDN}/econ/weapons/base_weapons/weapon_ak47.png`,
  "M4A4": `${CDN}/econ/weapons/base_weapons/weapon_m4a1.png`,
  "M4A1-S": `${CDN}/econ/weapons/base_weapons/weapon_m4a1_silencer.png`,
  "AWP": `${CDN}/econ/weapons/base_weapons/weapon_awp.png`,
  "FAMAS": `${CDN}/econ/weapons/base_weapons/weapon_famas.png`,
  "Galil AR": `${CDN}/econ/weapons/base_weapons/weapon_galilar.png`,
  "Desert Eagle": `${CDN}/econ/weapons/base_weapons/weapon_deagle.png`,
  "USP-S": `${CDN}/econ/weapons/base_weapons/weapon_usp_silencer.png`,
  "Glock-18": `${CDN}/econ/weapons/base_weapons/weapon_glock.png`,
  "P250": `${CDN}/econ/weapons/base_weapons/weapon_p250.png`,
  "MP9": `${CDN}/econ/weapons/base_weapons/weapon_mp9.png`,
  "MAC-10": `${CDN}/econ/weapons/base_weapons/weapon_mac10.png`,
};

export const MAP_IMAGE = {
  de_dust2: `${CDN}/maps/screenshots/de_dust2.png`,
  de_mirage: `${CDN}/maps/screenshots/de_mirage.png`,
  de_inferno: `${CDN}/maps/screenshots/de_inferno.png`,
  de_nuke: `${CDN}/maps/screenshots/de_nuke.png`,
  de_overpass: `${CDN}/maps/screenshots/de_overpass.png`,
  de_ancient: `${CDN}/maps/screenshots/de_ancient.png`,
  de_anubis: `${CDN}/maps/screenshots/de_anubis.png`,
  de_vertigo: `${CDN}/maps/screenshots/de_vertigo.png`,
};

// Fallback gradient used when remote image is unavailable.
export const MAP_THEME = {
  de_dust2:    "linear-gradient(135deg, #c9a16b 0%, #6b4f2a 100%)",
  de_mirage:   "linear-gradient(135deg, #e0b07c 0%, #8a4a2a 100%)",
  de_inferno:  "linear-gradient(135deg, #d4724a 0%, #5a2412 100%)",
  de_nuke:     "linear-gradient(135deg, #6b8eb0 0%, #2a3a4f 100%)",
  de_overpass: "linear-gradient(135deg, #7fa07d 0%, #2f4a2c 100%)",
  de_ancient:  "linear-gradient(135deg, #6b8a5a 0%, #2c3d24 100%)",
  de_anubis:   "linear-gradient(135deg, #d6b86a 0%, #6b5022 100%)",
  de_vertigo:  "linear-gradient(135deg, #94a3b8 0%, #334155 100%)",
};
