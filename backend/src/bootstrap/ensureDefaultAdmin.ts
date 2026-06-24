import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../utils/bcrypt.js";

/** Aligné sur le frontend (AuthBootstrap) et sur l’ancien seed. */
export const DEFAULT_ADMIN_EMAIL = "admin@photovoltaique.tn";
export const DEFAULT_ADMIN_PASSWORD = "Admin@2024!";

/**
 * Crée ou réinitialise le super-admin par défaut (mot de passe hashé à jour).
 * Même logique que l’ancien prisma/seed.ts (pas d’upsert Prisma, compatible Mongo sans RS).
 */
export async function ensureDefaultAdmin(client: PrismaClient): Promise<void> {
  const email = DEFAULT_ADMIN_EMAIL;
  const password = await hashPassword(DEFAULT_ADMIN_PASSWORD);

  const existing = await client.user.findUnique({ where: { email } });
  if (existing) {
    await client.user.update({
      where: { email },
      data: {
        password,
        actif: true,
        role: Role.SUPER_ADMIN,
        nom: "Admin",
        prenom: "Super",
      },
    });
  } else {
    await client.user.create({
      data: {
        nom: "Admin",
        prenom: "Super",
        email,
        password,
        role: Role.SUPER_ADMIN,
        actif: true,
      },
    });
  }
}
