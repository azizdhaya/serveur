/**
 * Initialise rs0 sur 127.0.0.1:27017 si mongod tourne déjà avec replSetName dans mongod.cfg.
 * Usage : npx tsx scripts/init-replica-set.ts
 * Dépendance : npm i mongodb (devDependency du backend si besoin)
 */
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/?directConnection=true";

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const admin = client.db("admin");
    try {
      const st = await admin.command({ replSetGetStatus: 1 });
      console.log("Replica set déjà actif :", (st as { set?: string }).set ?? "ok");
      return;
    } catch {
      // not initiated
    }
    await admin.command({
      replSetInitiate: {
        _id: "rs0",
        members: [{ _id: 0, host: "127.0.0.1:27017" }],
      },
    });
    console.log("replSetInitiate(rs0) envoyé — attendez quelques secondes puis relancez le seed.");
  } finally {
    await client.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
