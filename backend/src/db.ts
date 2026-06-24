import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function connectPrisma() {
  try {
    await prisma.$connect();
    // Valide réellement la disponibilité du serveur Mongo.
    await prisma.user.count();
    console.log("Prisma MongoDB connecté.");
  } catch (error) {
    console.error("Échec connexion Prisma/MongoDB:", error);
    throw error;
  }
}

export async function pingPrisma() {
  await prisma.user.count();
}

export async function disconnectPrisma() {
  await prisma.$disconnect();
}
