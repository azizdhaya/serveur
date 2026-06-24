import { randomUUID } from "crypto";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import type { Role } from "@prisma/client";

const accessSecret = process.env.JWT_ACCESS_SECRET ?? "";
const refreshSecret = process.env.JWT_REFRESH_SECRET ?? "";
const accessExpires = process.env.JWT_ACCESS_EXPIRES ?? "15m";
const refreshExpires = process.env.JWT_REFRESH_EXPIRES ?? "7d";

export type AccessPayload = {
  sub: string;
  email: string;
  role: Role;
};

const accessSignOpts = { expiresIn: accessExpires } as SignOptions;
const refreshSignOpts = { expiresIn: refreshExpires } as SignOptions;

export function signAccessToken(payload: AccessPayload): string {
  return jwt.sign(payload, accessSecret as Secret, accessSignOpts);
}

export function signRefreshToken(payload: { sub: string }): string {
  /** jti évite deux JWT identiques la même seconde → contrainte @unique refreshToken (P2002). */
  return jwt.sign(
    { ...payload, jti: randomUUID() },
    refreshSecret as Secret,
    refreshSignOpts
  );
}

export function verifyAccessToken(token: string): AccessPayload {
  return jwt.verify(token, accessSecret as Secret) as AccessPayload;
}

export function verifyRefreshToken(token: string): { sub: string } {
  return jwt.verify(token, refreshSecret as Secret) as { sub: string };
}

export function refreshTokenExpiresMs(): number {
  const d = refreshExpires.match(/^(\d+)([dhms])$/);
  if (!d) return 7 * 24 * 60 * 60 * 1000;
  const n = parseInt(d[1], 10);
  const u = d[2];
  const mult =
    u === "d" ? 86400000 : u === "h" ? 3600000 : u === "m" ? 60000 : 1000;
  return n * mult;
}
