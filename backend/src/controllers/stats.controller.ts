import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import * as stats from "../services/stats.service.js";

export async function dashboard(req: AuthRequest, res: Response) {
  const data = await stats.dashboardStats(req.user!);
  res.json(data);
}

export async function parDistrict(req: AuthRequest, res: Response) {
  const limit = parseInt(String(req.query.limit ?? "10"), 10) || 10;
  const data = await stats.parDistrict(req.user!, limit);
  res.json(data);
}

export async function parEtat(req: AuthRequest, res: Response) {
  const data = await stats.parEtat(req.user!);
  res.json(data);
}

export async function parContratAchat(req: AuthRequest, res: Response) {
  const data = await stats.parContratAchat(req.user!);
  res.json(data);
}

export async function parMois(req: AuthRequest, res: Response) {
  const y = parseInt(String(req.query.annee ?? new Date().getFullYear()), 10);
  const data = await stats.parMois(req.user!, y);
  res.json(data);
}

export async function financier(req: AuthRequest, res: Response) {
  const data = await stats.financierGlobal(req.user!);
  res.json(data);
}

export async function prosolDistrict(req: AuthRequest, res: Response) {
  const data = await stats.prosolParDistrict(req.user!);
  res.json(data);
}

export async function parDeblocage(req: AuthRequest, res: Response) {
  const data = await stats.parDeblocage(req.user!);
  res.json(data);
}

export async function recoulementParDistrict(req: AuthRequest, res: Response) {
  const data = await stats.recoulementParDistrict(req.user!);
  res.json(data);
}

export async function diligencesParDistrict(req: AuthRequest, res: Response) {
  const data = await stats.diligencesParDistrict(req.user!);
  res.json(data);
}
