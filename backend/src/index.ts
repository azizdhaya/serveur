import "dotenv/config";
import cors from "cors";
import express from "express";
import type { Server } from "node:http";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projetRoutes from "./routes/projet.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import societeRoutes from "./routes/societe.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { ensureDefaultAdmin } from "./bootstrap/ensureDefaultAdmin.js";
import { connectPrisma, disconnectPrisma, pingPrisma, prisma } from "./db.js";

const app = express();
const port = parseInt(process.env.PORT ?? "8787", 10);
const host = process.env.HOST ?? "0.0.0.0";
const requestTimeoutMs = Math.max(
  1_000,
  parseInt(process.env.SERVER_REQUEST_TIMEOUT_MS ?? "60000", 10) || 60_000
);
const headersTimeoutMs = Math.max(
  requestTimeoutMs + 1_000,
  parseInt(process.env.SERVER_HEADERS_TIMEOUT_MS ?? "65000", 10) || 65_000
);
const keepAliveTimeoutMs = Math.max(
  1_000,
  parseInt(process.env.SERVER_KEEP_ALIVE_TIMEOUT_MS ?? "61000", 10) || 61_000
);
const shutdownTimeoutMs = Math.max(
  2_000,
  parseInt(process.env.SERVER_SHUTDOWN_TIMEOUT_MS ?? "10000", 10) || 10_000
);
let isReady = false;
let isShuttingDown = false;
let server: Server | null = null;

function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const allowedOrigins = new Set<string>([
  ...parseAllowedOrigins(process.env.CORS_ORIGINS),
  ...parseAllowedOrigins(process.env.FRONTEND_URL),
]);

const ngrokHostRegex = /^https?:\/\/[a-z0-9-]+\.(ngrok-free\.dev|ngrok\.io|ngrok\.app)$/i;

function isAllowedCorsOrigin(origin: string): boolean {
  // Autorise localhost/127 en dev local.
  if (/^https?:\/\/localhost(?::\d+)?$/i.test(origin)) return true;
  if (/^https?:\/\/127\.0\.0\.1(?::\d+)?$/i.test(origin)) return true;
  // Autorise les URL ngrok.
  if (ngrokHostRegex.test(origin)) return true;
  // Autorise les origines explicitement configurées par env.
  return allowedOrigins.has(origin);
}

app.use(
  cors({
    origin(origin, callback) {
      // Requêtes server-to-server / curl sans Origin.
      if (!origin) return callback(null, true);
      if (isAllowedCorsOrigin(origin)) return callback(null, true);
      // Origine refusée : pas d'en-têtes CORS (blocage navigateur) sans erreur 500.
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "25mb" }));

function healthPayload() {
  return {
    ok: true,
    ready: isReady && !isShuttingDown,
    shuttingDown: isShuttingDown,
    uptimeSec: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}

app.get("/health", (_req, res) => res.json(healthPayload()));
app.get("/api/health", (_req, res) => res.json(healthPayload()));
async function handleReady(res: express.Response) {
  if (isShuttingDown || !isReady) {
    res.status(503).json({
      ok: false,
      ready: false,
      message: isShuttingDown ? "Arrêt en cours" : "Initialisation en cours",
    });
    return;
  }
  try {
    await pingPrisma();
    res.json({ ok: true, ready: true });
  } catch {
    res.status(503).json({
      ok: false,
      ready: false,
      message: "Base de données indisponible",
    });
  }
}
app.get("/ready", async (_req, res) => {
  await handleReady(res);
});
app.get("/api/ready", async (_req, res) => {
  await handleReady(res);
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projets", projetRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/societe", societeRoutes);

app.use(errorMiddleware);

async function closeServerGracefully(): Promise<void> {
  if (!server) return;
  await new Promise<void>((resolve, reject) => {
    server!.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function gracefulShutdown(reason: string, exitCode = 0) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  isReady = false;
  console.warn(`Arrêt gracieux déclenché (${reason})...`);
  const timeout = setTimeout(() => {
    console.error("Arrêt gracieux dépassé, terminaison forcée.");
    process.exit(1);
  }, shutdownTimeoutMs);
  try {
    await closeServerGracefully();
    await disconnectPrisma();
    clearTimeout(timeout);
    console.log("Arrêt gracieux terminé.");
    process.exit(exitCode);
  } catch (e) {
    clearTimeout(timeout);
    console.error("Erreur pendant l’arrêt gracieux:", e);
    process.exit(1);
  }
}

async function bootstrap() {
  await connectPrisma();

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.SKIP_DEV_ADMIN_BOOTSTRAP !== "1"
  ) {
    try {
      await ensureDefaultAdmin(prisma);
      console.log(
        "Compte dev admin prêt : connexion auto possible (voir frontend / seed)."
      );
    } catch (e) {
      console.error("Impossible de créer/mettre à jour l’admin par défaut :", e);
      throw e;
    }
  }

  server = app.listen(port, host, () => {
    console.log(
      `API photovoltaïque sur le port ${port} (http://localhost:${port} et http://127.0.0.1:${port})`
    );
    console.log(
      `Timeouts HTTP: request=${requestTimeoutMs}ms, headers=${headersTimeoutMs}ms, keepAlive=${keepAliveTimeoutMs}ms`
    );
  });
  server.requestTimeout = requestTimeoutMs;
  server.headersTimeout = headersTimeoutMs;
  server.keepAliveTimeout = keepAliveTimeoutMs;
  isReady = true;

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${port} déjà utilisé (EADDRINUSE). Fermez l’autre terminal avec Ctrl+C, ou sous PowerShell :`,
        `\n  Get-NetTCPConnection -LocalPort ${port} -State Listen | Select-Object OwningProcess`,
        `\n  Stop-Process -Id <PID> -Force`
      );
    } else {
      console.error(err);
    }
    process.exit(1);
  });

  process.once("SIGINT", () => {
    void gracefulShutdown("SIGINT", 0);
  });
  process.once("SIGTERM", () => {
    void gracefulShutdown("SIGTERM", 0);
  });
  process.once("unhandledRejection", (reason) => {
    console.error("Unhandled promise rejection:", reason);
    void gracefulShutdown("unhandledRejection", 1);
  });
  process.once("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    void gracefulShutdown("uncaughtException", 1);
  });
}

bootstrap().catch((error) => {
  console.error("Démarrage API impossible:", error);
  process.exit(1);
});
