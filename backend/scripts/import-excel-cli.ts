/**
 * Remplit la base avec toutes les lignes du Excel (création ou mise à jour par « Référence »).
 *
 * Avant la 1ʳᵉ import après mise à jour du schéma :
 *   npx prisma db push && npx prisma generate
 *
 * Usage :
 *   npx tsx scripts/import-excel-cli.ts "C:\chemin\vers\tableau de bord projets photovoltaïques.xlsx"
 * Sans argument : .\data\tableau de bord projets photovoltaïques.xlsx
 */
import "dotenv/config";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "../src/db.js";
import { importExcel } from "../src/services/projet.service.js";
import type { AccessPayload } from "../src/utils/jwt.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, "..");

const defaultRelative = path.join(
  "data",
  "tableau de bord projets photovoltaïques.xlsx"
);

async function main() {
  const argPath = process.argv[2]?.trim();
  const filePath = argPath
    ? path.resolve(process.cwd(), argPath)
    : path.join(backendRoot, defaultRelative);

  if (!existsSync(filePath)) {
    console.error("Fichier introuvable :", filePath);
    console.error(
      "\nPlacez le Excel dans backend/data/ avec le nom exact :",
      "\n  tableau de bord projets photovoltaïques.xlsx",
      "\nou passez le chemin complet en argument."
    );
    process.exit(1);
  }

  const admin = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN", actif: true },
    orderBy: { createdAt: "asc" },
  });
  if (!admin) {
    console.error("Aucun SUPER_ADMIN : exécutez d’abord npx prisma db seed");
    process.exit(1);
  }

  const user: AccessPayload = {
    sub: admin.id,
    email: admin.email,
    role: admin.role,
  };

  console.log("Fichier :", filePath);
  console.log("Import en cours (upsert par référence)…");

  const buffer = readFileSync(filePath);
  const { ok, errors } = await importExcel(user, buffer);

  console.log("\nTerminé.");
  console.log("Lignes importées / mises à jour :", ok);
  if (errors.length) {
    console.log("Erreurs :", errors.length);
    const preview = errors.slice(0, 20);
    for (const e of preview) {
      console.log(`  Ligne ${e.row}: ${e.message}`);
    }
    if (errors.length > 20) {
      console.log(`  … et ${errors.length - 20} autre(s).`);
    }
    process.exitCode = 1;
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
