import { ZodError } from "zod";

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Validation error", issues: err.issues });
  }
  if (err?.code === "P2002") {
    return res.status(409).json({ error: "Resource already exists" });
  }
  console.error(err);
  res.status(err.status ?? 500).json({ error: err.message ?? "Server error" });
}
