import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db.js";
import { verifyAccessToken, type AccessPayload } from "../utils/jwt.js";
import { AppError } from "./error.middleware.js";

export type AuthRequest = Request & { user?: AccessPayload };

export function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): void {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) {
    next(new AppError(401, "Non authentifié"));
    return;
  }
  const token = h.slice(7);
  let payload: AccessPayload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    next(new AppError(401, "Token invalide ou expiré"));
    return;
  }
  prisma.user
    .findUnique({
      where: { id: payload.sub },
      select: { id: true, actif: true },
    })
    .then((user) => {
      if (!user || !user.actif) {
        next(new AppError(401, "Compte désactivé"));
        return;
      }
      req.user = payload;
      next();
    })
    .catch(() => next(new AppError(401, "Non authentifié")));
}
