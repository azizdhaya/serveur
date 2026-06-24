import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import {
  DEFAULT_COMMERCIAL_PASSWORD,
  ensureDefaultCommercials,
} from "../src/bootstrap/ensureDefaultCommercials.js";
import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  ensureDefaultAdmin,
} from "../src/bootstrap/ensureDefaultAdmin.js";

const prisma = new PrismaClient();

async function main() {
  await ensureDefaultAdmin(prisma);
  await ensureDefaultCommercials(prisma);
  console.log(
    "Compte super-admin prêt :",
    DEFAULT_ADMIN_EMAIL,
    " / mot de passe :",
    DEFAULT_ADMIN_PASSWORD
  );
  console.log(
    "Commerciaux de référence (si absents) : mot de passe",
    DEFAULT_COMMERCIAL_PASSWORD
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
