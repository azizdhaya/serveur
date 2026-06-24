import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Données invalides",
      errors: err.flatten().fieldErrors,
    });
    return;
  }
  if (
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientInitializationError
  ) {
    const unavailable =
      err instanceof Prisma.PrismaClientInitializationError ||
      err.code === "P1001" ||
      err.code === "P2010";
    res.status(unavailable ? 503 : 500).json({
      message: unavailable
        ? "Base de données indisponible. Vérifiez MongoDB et réessayez."
        : "Erreur base de données",
    });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Erreur interne du serveur" });
}
