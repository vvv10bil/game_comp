import { Router } from "express";

export const weaponRouter = Router();

const WEAPONS = [
  { id: "ak47", name: "AK-47", category: "rifle", side: "T", price: 2700 },
  { id: "m4a4", name: "M4A4", category: "rifle", side: "CT", price: 3100 },
  { id: "m4a1s", name: "M4A1-S", category: "rifle", side: "CT", price: 2900 },
  { id: "awp", name: "AWP", category: "sniper", side: "BOTH", price: 4750 },
  { id: "famas", name: "FAMAS", category: "rifle", side: "CT", price: 2050 },
  { id: "galil", name: "Galil AR", category: "rifle", side: "T", price: 1800 },
  { id: "deagle", name: "Desert Eagle", category: "pistol", side: "BOTH", price: 700 },
  { id: "usp", name: "USP-S", category: "pistol", side: "CT", price: 0 },
  { id: "glock", name: "Glock-18", category: "pistol", side: "T", price: 0 },
  { id: "p250", name: "P250", category: "pistol", side: "BOTH", price: 300 },
  { id: "mp9", name: "MP9", category: "smg", side: "CT", price: 1250 },
  { id: "mac10", name: "MAC-10", category: "smg", side: "T", price: 1050 },
];

weaponRouter.get("/", (req, res) => {
  const { side, category } = req.query;
  let result = WEAPONS;
  if (side) result = result.filter((w) => w.side === side || w.side === "BOTH");
  if (category) result = result.filter((w) => w.category === category);
  res.json(result);
});
