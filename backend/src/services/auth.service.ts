import { randomBytes } from "crypto";
import type { User } from "@prisma/client";
import { prisma } from "../db.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import {
  refreshTokenExpiresMs,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { AppError } from "../middleware/error.middleware.js";

export async function login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (!user || !user.actif) {
    throw new AppError(401, "Identifiants incorrects");
  }
  const ok = await comparePassword(password.trim(), user.password);
  if (!ok) throw new AppError(401, "Identifiants incorrects");

  const refreshToken = signRefreshToken({ sub: user.id });
  const expiresAt = new Date(Date.now() + refreshTokenExpiresMs());
  await prisma.session.create({
    data: { userId: user.id, refreshToken, expiresAt },
  });
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });
  await prisma.actionLog.create({
    data: {
      userId: user.id,
      action: "CONNEXION",
      details: { email: user.email },
    },
  });

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    accessToken,
    refreshToken,
    user: publicUser(user),
  };
}

export type ActivityLogItem = {
  id: string;
  action: string;
  createdAt: Date;
  user: { nom: string; prenom: string; email: string };
  projet: { id: string; reference: string } | null;
  details: unknown;
};

export async function recentActivity(limit = 20): Promise<ActivityLogItem[]> {
  const capped = Number.isFinite(limit) ? Math.max(1, Math.min(100, limit)) : 20;
  const logs = await prisma.actionLog.findMany({
    orderBy: { createdAt: "desc" },
    take: capped,
    include: {
      user: {
        select: {
          nom: true,
          prenom: true,
          email: true,
        },
      },
      projet: {
        select: {
          id: true,
          reference: true,
        },
      },
    },
  });
  return logs.map((l) => ({
    id: l.id,
    action: l.action,
    createdAt: l.createdAt,
    user: l.user,
    projet: l.projet ?? null,
    details: l.details,
  }));
}

export async function refresh(refreshToken: string) {
  let payload: { sub: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(401, "Refresh token invalide");
  }
  const session = await prisma.session.findUnique({
    where: { refreshToken },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) {
    throw new AppError(401, "Session expirée");
  }
  if (!session.user.actif) {
    throw new AppError(401, "Compte désactivé");
  }
  const accessToken = signAccessToken({
    sub: session.user.id,
    email: session.user.email,
    role: session.user.role,
  });
  return { accessToken };
}

export async function logout(refreshToken: string) {
  await prisma.session.deleteMany({ where: { refreshToken } });
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, "Utilisateur introuvable");
  return publicUser(user);
}

export async function changePassword(
  userId: string,
  current: string,
  next: string
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, "Utilisateur introuvable");
  const ok = await comparePassword(current, user.password);
  if (!ok) throw new AppError(400, "Mot de passe actuel incorrect");
  await prisma.user.update({
    where: { id: userId },
    data: { password: await hashPassword(next) },
  });
}

export function publicUser(user: User) {
  const { password: _p, ...rest } = user;
  return rest;
}

export function generateTempPassword(): string {
  return randomBytes(6).toString("base64url") + "Aa1!";
}
