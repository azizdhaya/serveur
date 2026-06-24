import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../utils/bcrypt.js";

/** Mot de passe initial des commerciaux créés par le seed (à changer en prod). */
export const DEFAULT_COMMERCIAL_PASSWORD = "Commercial@2024!";

/**
 * Crée les agents commerciaux de référence (alignés sur la colonne Excel) s’ils n’existent pas encore.
 */
export async function ensureDefaultCommercials(client: PrismaClient): Promise<void> {
  const password = await hashPassword(DEFAULT_COMMERCIAL_PASSWORD);
  const rows: { nom: string; prenom: string; email: string }[] = [
    { nom: "Achek", prenom: "Anis", email: "commercial.achek.anis@photovoltaique.tn" },
    {
      nom: "Ben Haj Abdallah",
      prenom: "Lotfi",
      email: "commercial.benhaj.lotfi@photovoltaique.tn",
    },
    { nom: "Giza", prenom: "Ali", email: "commercial.giza.ali@photovoltaique.tn" },
    {
      nom: "Haj Omor",
      prenom: "Ridha",
      email: "commercial.hajomor.ridha@photovoltaique.tn",
    },
    { nom: "Hmed", prenom: "-", email: "commercial.hmed@photovoltaique.tn" },
    {
      nom: "Zakhama",
      prenom: "Achraf",
      email: "commercial.zakhama.achraf@photovoltaique.tn",
    },
  ];

  for (const row of rows) {
    const existing = await client.user.findUnique({
      where: { email: row.email },
    });
    if (existing) continue;
    await client.user.create({
      data: {
        nom: row.nom,
        prenom: row.prenom,
        email: row.email,
        password,
        role: Role.COMMERCIAL,
        actif: true,
      },
    });
  }
}
