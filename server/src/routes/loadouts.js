import { Router } from "express";
import { z } from "zod";

import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

export const loadoutRouter = Router();

const loadoutSchema = z.object({
  name: z.string().min(1).max(64),
  side: z.enum(["T", "CT"]),
  primary: z.string().min(1).max(64),
  secondary: z.string().min(1).max(64),
  knife: z.string().max(64).optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
});

loadoutRouter.use(requireAuth);

loadoutRouter.get("/", async (req, res, next) => {
  try {
    const loadouts = await prisma.loadout.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(loadouts);
  } catch (err) {
    next(err);
  }
});

loadoutRouter.post("/", async (req, res, next) => {
  try {
    const data = loadoutSchema.parse(req.body);
    const loadout = await prisma.loadout.create({
      data: { ...data, userId: req.userId },
    });
    res.status(201).json(loadout);
  } catch (err) {
    next(err);
  }
});

loadoutRouter.put("/:id", async (req, res, next) => {
  try {
    const data = loadoutSchema.parse(req.body);
    const result = await prisma.loadout.updateMany({
      where: { id: req.params.id, userId: req.userId },
      data,
    });
    if (result.count === 0) return res.status(404).json({ error: "Not found" });
    const loadout = await prisma.loadout.findUnique({ where: { id: req.params.id } });
    res.json(loadout);
  } catch (err) {
    next(err);
  }
});

loadoutRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await prisma.loadout.deleteMany({
      where: { id: req.params.id, userId: req.userId },
    });
    if (result.count === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
