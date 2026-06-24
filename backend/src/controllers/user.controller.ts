import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import * as user from "../services/user.service.js";
import { userCreateSchema, userUpdateSchema } from "../validation/schemas.js";

export async function list(_req: AuthRequest, res: Response) {
  const data = await user.listUsers();
  res.json(data);
}

export async function getOne(req: AuthRequest, res: Response) {
  const u = await user.getUser(req.params.id);
  res.json(u);
}

export async function create(req: AuthRequest, res: Response) {
  const body = userCreateSchema.parse(req.body);
  const out = await user.createUser(req.user!, body);
  res.status(201).json(out);
}

export async function update(req: AuthRequest, res: Response) {
  const body = userUpdateSchema.parse(req.body);
  const u = await user.updateUser(req.user!, req.params.id, body);
  res.json(u);
}

export async function toggle(req: AuthRequest, res: Response) {
  const u = await user.toggleUser(req.user!, req.params.id);
  res.json(u);
}

export async function remove(req: AuthRequest, res: Response) {
  await user.deleteUser(req.user!, req.params.id);
  res.status(204).end();
}

export async function resetPassword(req: AuthRequest, res: Response) {
  const out = await user.resetPassword(req.user!, req.params.id);
  res.json(out);
}

export async function commercials(_req: AuthRequest, res: Response) {
  const data = await user.listCommercials();
  res.json(data);
}
