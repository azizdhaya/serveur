import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import * as societe from "../services/societe.service.js";
import { societeBodySchema } from "../validation/schemas.js";

export async function getInfo(_req: AuthRequest, res: Response) {
  const info = await societe.getSocieteInfo();
  res.json(info);
}

export async function updateInfo(req: AuthRequest, res: Response) {
  const body = societeBodySchema.parse(req.body);
  const info = await societe.updateSocieteInfo(body);
  res.json(info);
}
