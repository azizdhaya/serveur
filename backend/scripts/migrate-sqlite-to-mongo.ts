import "dotenv/config";
import { PrismaClient as SqlitePrisma } from "@prisma/client";
import { PrismaClient as MongoPrisma } from "../src/generated/mongo-client/index.js";

const sqlite = new SqlitePrisma();
const mongo = new MongoPrisma();

function dec(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "object" && v && "toString" in v) return String(v);
  return null;
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

async function upsertUsers() {
  const rows = await sqlite.user.findMany();
  for (const part of chunk(rows, 200)) {
    await Promise.all(
      part.map((r) =>
        mongo.user.upsert({
          where: { id: r.id },
          update: {
            nom: r.nom,
            prenom: r.prenom,
            email: r.email,
            telephone: r.telephone,
            password: r.password,
            role: r.role,
            actif: r.actif,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            createdBy: r.createdBy,
            lastLoginAt: r.lastLoginAt,
          },
          create: { ...r },
        })
      )
    );
  }
  return rows.length;
}

async function upsertProjets() {
  const rows = await sqlite.projet.findMany();
  for (const part of chunk(rows, 100)) {
    await Promise.all(
      part.map((r) => {
        const doc = {
          ...r,
          montantFinancement: dec(r.montantFinancement),
          tauxInteret: dec(r.tauxInteret),
          puissanceInstallee: dec(r.puissanceInstallee),
          productionPrevisionnelle: dec(r.productionPrevisionnelle),
          consommationAnnuelle: dec(r.consommationAnnuelle),
          puUnitairePV: dec(r.puUnitairePV),
          puUnitaireOnd: dec(r.puUnitaireOnd),
          puOndSiAutreW: dec(r.puOndSiAutreW),
          montantHT: dec(r.montantHT),
          tva: dec(r.tva),
          montantTTC: dec(r.montantTTC),
          montantTTCFinal: dec(r.montantTTCFinal),
          montantAutofinancement: dec(r.montantAutofinancement),
          fraisPoseCmptProsol: dec(r.fraisPoseCmptProsol),
          paiement1erFactureSTEG: dec(r.paiement1erFactureSTEG),
          paiement2emeFactureSTEG: dec(r.paiement2emeFactureSTEG),
          fraisAugmentationCalibre: dec(r.fraisAugmentationCalibre),
          fraisMutationElec: dec(r.fraisMutationElec),
          fraisMutationGaz: dec(r.fraisMutationGaz),
          fraisPassageMonoTri: dec(r.fraisPassageMonoTri),
          autresFrais: dec(r.autresFrais),
          reglementClient: dec(r.reglementClient),
          resteAPayer: dec(r.resteAPayer),
          subventionDemandee: dec(r.subventionDemandee),
        };
        return (
        mongo.projet.upsert({
          where: { id: r.id },
          update: doc,
          create: doc,
        })
        );
      })
    );
  }
  return rows.length;
}

async function upsertEcheances() {
  const rows = await sqlite.echeance.findMany();
  for (const part of chunk(rows, 300)) {
    await Promise.all(
      part.map((r) =>
        mongo.echeance.upsert({
          where: { projetId_numero: { projetId: r.projetId, numero: r.numero } },
          update: { id: r.id, montant: dec(r.montant), date: r.date },
          create: { ...r, montant: dec(r.montant) },
        })
      )
    );
  }
  return rows.length;
}

async function upsertSessions() {
  const rows = await sqlite.session.findMany();
  for (const part of chunk(rows, 300)) {
    await Promise.all(
      part.map((r) =>
        mongo.session.upsert({
          where: { id: r.id },
          update: { ...r },
          create: { ...r },
        })
      )
    );
  }
  return rows.length;
}

async function upsertActionLogs() {
  const rows = await sqlite.actionLog.findMany();
  for (const part of chunk(rows, 300)) {
    await Promise.all(
      part.map((r) =>
        mongo.actionLog.upsert({
          where: { id: r.id },
          update: { ...r },
          create: { ...r },
        })
      )
    );
  }
  return rows.length;
}

async function main() {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL manquant dans l'environnement.");
  }

  // Test connection early.
  await mongo.$runCommandRaw({ ping: 1 });

  const users = await upsertUsers();
  const projets = await upsertProjets();
  const echeances = await upsertEcheances();
  const sessions = await upsertSessions();
  const logs = await upsertActionLogs();

  console.log("Migration SQLite -> MongoDB terminée.");
  console.log({ users, projets, echeances, sessions, logs });
}

main()
  .then(async () => {
    await sqlite.$disconnect();
    await mongo.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await sqlite.$disconnect();
    await mongo.$disconnect();
    process.exit(1);
  });
