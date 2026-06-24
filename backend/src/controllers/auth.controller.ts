import type { Response } from "express";
import * as auth from "../services/auth.service.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  changePasswordSchema,
  loginSchema,
  refreshSchema,
} from "../validation/schemas.js";

export async function login(req: AuthRequest, res: Response) {
  const body = loginSchema.parse(req.body);
  const out = await auth.login(body.email, body.password);
  res.json(out);
}

export async function refresh(req: AuthRequest, res: Response) {
  const body = refreshSchema.parse(req.body);
  const out = await auth.refresh(body.refreshToken);
  res.json(out);
}

export async function logout(req: AuthRequest, res: Response) {
  const body = refreshSchema.parse(req.body);
  await auth.logout(body.refreshToken);
  res.status(204).end();
}

export async function me(req: AuthRequest, res: Response) {
  const u = await auth.getMe(req.user!.sub);
  res.json(u);
}

export async function changePassword(req: AuthRequest, res: Response) {
  const body = changePasswordSchema.parse(req.body);
  await auth.changePassword(
    req.user!.sub,
    body.currentPassword,
    body.newPassword
  );
  res.status(204).end();
}

export async function activity(req: AuthRequest, res: Response) {
  const raw = Number(req.query.limit);
  const limit = Number.isFinite(raw) ? raw : 20;
  const out = await auth.recentActivity(limit);
  res.json(out);
}
