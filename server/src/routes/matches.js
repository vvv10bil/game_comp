import { Router } from "express";
import { z } from "zod";

import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

export const matchRouter = Router();

const matchSchema = z.object({
  map: z.string().min(1).max(64),
  result: z.enum(["win", "loss", "draw"]),
  score: z.string().regex(/^\d{1,2}:\d{1,2}$/),
  kills: z.number().int().min(0).max(200).default(0),
  deaths: z.number().int().min(0).max(200).default(0),
  assists: z.number().int().min(0).max(200).default(0),
  playedAt: z.string().datetime().optional(),
});

matchRouter.use(requireAuth);

matchRouter.get("/", async (req, res, next) => {
  try {
    const matches = await prisma.match.findMany({
      where: { userId: req.userId },
      orderBy: { playedAt: "desc" },
      take: 100,
    });
    res.json(matches);
  } catch (err) {
    next(err);
  }
});

matchRouter.get("/stats", async (req, res, next) => {
  try {
    const matches = await prisma.match.findMany({ where: { userId: req.userId } });
    const total = matches.length;
    const wins = matches.filter((m) => m.result === "win").length;
    const losses = matches.filter((m) => m.result === "loss").length;
    const kills = matches.reduce((s, m) => s + m.kills, 0);
    const deaths = matches.reduce((s, m) => s + m.deaths, 0);
    res.json({
      total,
      wins,
      losses,
      winRate: total ? Number(((wins / total) * 100).toFixed(1)) : 0,
      kd: deaths ? Number((kills / deaths).toFixed(2)) : kills,
    });
  } catch (err) {
    next(err);
  }
});

matchRouter.post("/", async (req, res, next) => {
  try {
    const data = matchSchema.parse(req.body);
    const match = await prisma.match.create({
      data: {
        ...data,
        playedAt: data.playedAt ? new Date(data.playedAt) : undefined,
        userId: req.userId,
      },
    });
    res.status(201).json(match);
  } catch (err) {
    next(err);
  }
});

matchRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await prisma.match.deleteMany({
      where: { id: req.params.id, userId: req.userId },
    });
    if (result.count === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
