import type { NextFunction, Response } from "express";
import type { Role } from "@prisma/client";
import type { AuthRequest } from "./auth.middleware.js";
import { AppError } from "./error.middleware.js";

export function authorize(...allowed: Role[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "Non authentifié"));
      return;
    }
    if (!allowed.includes(req.user.role)) {
      next(new AppError(403, "Accès refusé"));
      return;
    }
    next();
  };
}
