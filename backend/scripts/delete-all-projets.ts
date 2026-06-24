/**
 * Supprime tous les dossiers (table Projet). Les échéances liées sont supprimées en cascade.
 *
 * Usage : npx tsx scripts/delete-all-projets.ts --confirm
 */
import "dotenv/config";
import { prisma } from "../src/db.js";

async function main() {
  if (!process.argv.includes("--confirm")) {
    console.error(
      "Refusé : ajoutez --confirm pour exécuter (ex. npm run db:delete-all-projets)."
    );
    process.exit(1);
  }
  const r = await prisma.projet.deleteMany({});
  console.log(`Supprimé ${r.count} projet(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
