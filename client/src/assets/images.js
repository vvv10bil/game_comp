// Image resolution order used by <WeaponImage> and <MapThumb>:
//   1. Local file from client/public/media/   (highest priority)
//   2. ByMykel/CSGO-API GitHub CDN
//   3. CSS-only fallback card

const CDN = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/images";

// Maps weapon display name (as returned by /api/weapons) to a local file
// in client/public/media/. If a weapon isn't here, the CDN URL below is used.
const WEAPON_LOCAL = {
  "AK-47":         "/media/ak47.png",
  "M4A1-S":        "/media/m4a1_c.png",
  "AWP":           "/media/awp.png",
  "FAMAS":         "/media/famas.png",
  "Galil AR":      "/media/galil.png",
  "AUG":           "/media/aug.png",
  "SSG 08":        "/media/ssg08.png",
  "Desert Eagle":  "/media/deagle.png",
  "USP-S":         "/media/usp.png",
  "P250":          "/media/p250.png",
  "Tec-9":         "/media/tec9.png",
  "Five-SeveN":    "/media/fiveseven.png",
  "Dual Berettas": "/media/dual_beretas.png",
  "MP9":           "/media/mp9.png",
  "MP5-SD":        "/media/mp5.png",
  "MAC-10":        "/media/mac10.png",
  "P90":           "/media/p90.png",
  "Nova":          "/media/nova.png",
  "XM1014":        "/media/m1014.png",
};

const WEAPON_CDN = {
  "AK-47":         `${CDN}/econ/weapons/base_weapons/weapon_ak47.png`,
  "M4A4":          `${CDN}/econ/weapons/base_weapons/weapon_m4a1.png`,
  "M4A1-S":        `${CDN}/econ/weapons/base_weapons/weapon_m4a1_silencer.png`,
  "AWP":           `${CDN}/econ/weapons/base_weapons/weapon_awp.png`,
  "FAMAS":         `${CDN}/econ/weapons/base_weapons/weapon_famas.png`,
  "Galil AR":      `${CDN}/econ/weapons/base_weapons/weapon_galilar.png`,
  "AUG":           `${CDN}/econ/weapons/base_weapons/weapon_aug.png`,
  "SSG 08":        `${CDN}/econ/weapons/base_weapons/weapon_ssg08.png`,
  "Desert Eagle":  `${CDN}/econ/weapons/base_weapons/weapon_deagle.png`,
  "USP-S":         `${CDN}/econ/weapons/base_weapons/weapon_usp_silencer.png`,
  "Glock-18":      `${CDN}/econ/weapons/base_weapons/weapon_glock.png`,
  "P250":          `${CDN}/econ/weapons/base_weapons/weapon_p250.png`,
  "Tec-9":         `${CDN}/econ/weapons/base_weapons/weapon_tec9.png`,
  "Five-SeveN":    `${CDN}/econ/weapons/base_weapons/weapon_fiveseven.png`,
  "Dual Berettas": `${CDN}/econ/weapons/base_weapons/weapon_elite.png`,
  "MP9":           `${CDN}/econ/weapons/base_weapons/weapon_mp9.png`,
  "MP5-SD":        `${CDN}/econ/weapons/base_weapons/weapon_mp5sd.png`,
  "MAC-10":        `${CDN}/econ/weapons/base_weapons/weapon_mac10.png`,
  "P90":           `${CDN}/econ/weapons/base_weapons/weapon_p90.png`,
  "Nova":          `${CDN}/econ/weapons/base_weapons/weapon_nova.png`,
  "XM1014":        `${CDN}/econ/weapons/base_weapons/weapon_xm1014.png`,
};

export function weaponSources(name) {
  return [WEAPON_LOCAL[name], WEAPON_CDN[name]].filter(Boolean);
}

export function mapSources(map) {
  if (!map) return [];
  return [`/media/${map}.png`, `${CDN}/maps/screenshots/${map}.png`];
}

export const HERO_VIDEO = "/media/intro.webm";

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
