import type { Response } from "express";
import { jsPDF } from "jspdf";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { AppError } from "../middleware/error.middleware.js";
import type { AccessPayload } from "../utils/jwt.js";
import * as svc from "../services/projet.service.js";
import * as stats from "../services/stats.service.js";
import {
  buildProjetFichePdf,
  buildProjetsListPdf,
} from "../utils/projetPdfExport.js";
import {
  DEFAULT_PDF_LIST_COLUMN_KEYS,
  normalizePdfColumnKeys,
  parsePdfColumnKeysParam,
  parsePdfColumnsFromBody,
  PDF_LIST_COLUMN_META,
} from "../utils/projetPdfListColumns.js";
import { serializeProjet } from "../utils/serialize.js";
import {
  archiveBodySchema,
  normalizeProjetBody,
  projetBodySchema,
} from "../validation/schemas.js";
import { mergePdfWithModele } from "../utils/mergePdfModele.js";
import {
  getPdfListeTitre,
  pdfListeFusionModeleActivee,
  pdfListeLayout,
  resolvePdfEntrepriseLignes,
  resolvePdfListTitle,
} from "../utils/pdfListeEntreprise.js";
import {
  buildSocietePdfEntreprise,
  getSocieteInfo,
} from "../services/societe.service.js";

export async function list(req: AuthRequest, res: Response) {
  const out = await svc.listProjets(req.user!, req.query as svc.ProjetListQuery);
  res.json({
    ...out,
    data: out.data.map((p) => serializeProjet(p as never)),
  });
}

export async function getOne(req: AuthRequest, res: Response) {
  const p = await svc.getProjetById(req.user!, req.params.id);
  res.json(serializeProjet(p as never));
}

export async function create(req: AuthRequest, res: Response) {
  const body = normalizeProjetBody(projetBodySchema.parse(req.body));
  const p = await svc.createProjet(req.user!, body);
  res.status(201).json(serializeProjet(p as never));
}

export async function update(req: AuthRequest, res: Response) {
  const body = normalizeProjetBody(projetBodySchema.parse(req.body));
  const p = await svc.updateProjet(req.user!, req.params.id, body);
  res.json(serializeProjet(p as never));
}

export async function remove(req: AuthRequest, res: Response) {
  await svc.deleteProjet(req.user!, req.params.id);
  res.status(204).end();
}

export async function archiveMany(req: AuthRequest, res: Response) {
  const body = archiveBodySchema.parse(req.body);
  const out = await svc.archiveProjets(req.user!, body.ids, body.archive);
  res.json(out);
}

export async function exportExcel(req: AuthRequest, res: Response) {
  const q = req.query as svc.ProjetListQuery;
  let ids: string[] | undefined;
  if (typeof q.search === "string" && q.search.startsWith("ids:")) {
    ids = q.search.slice(4).split(",").filter(Boolean);
  }
  const rows = await svc.findManyForExport(req.user!, q, ids);
  const buf = svc.buildExcelBuffer(rows);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="projets-export.xlsx"'
  );
  res.send(buf);
}

/** Export Excel sur mesure : mêmes filtres que la liste + colonnes choisies (corps JSON). */
export async function exportExcelPost(req: AuthRequest, res: Response) {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const colsRaw = body.columns;
  const q = { ...body } as Record<string, unknown>;
  delete q.columns;
  delete q.pdfTitle;
  delete q.title;
  const requested = parsePdfColumnsFromBody(colsRaw);
  const columnKeys = normalizePdfColumnKeys(requested);
  let ids: string[] | undefined;
  const search = (q as svc.ProjetListQuery).search;
  if (typeof search === "string" && search.startsWith("ids:")) {
    ids = search
      .slice(4)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  const rows = await svc.findManyForExport(
    req.user!,
    q as svc.ProjetListQuery,
    ids
  );
  const buf = svc.buildExcelBufferForColumns(rows, columnKeys);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="projets-export.xlsx"'
  );
  res.send(buf);
}

async function sendProjetsListPdfResponse(
  res: Response,
  user: AccessPayload,
  q: svc.ProjetListQuery,
  columnKeys: string[],
  listTitle: string,
  pdfEntreprise?: {
    enteteLignes?: string[];
    piedLignes?: string[];
    logoDataUrl?: string;
  }
): Promise<void> {
  let ids: string[] | undefined;
  if (typeof q.search === "string" && q.search.startsWith("ids:")) {
    ids = q.search.slice(4).split(",").map((x) => x.trim()).filter(Boolean);
  }
  const rows = await svc.findManyForExport(user, q, ids);
  const dash = await stats.dashboardStats(user);

  const gen = new Date().toLocaleString("fr-FR", {
    dateStyle: "short",
    timeStyle: "medium",
  });
  const layout = pdfListeLayout();
  const subtitleLines =
    layout === "entreprise"
      ? [`Clients sélectionnés: ${rows.length} | Généré le: ${gen}`]
      : [
          `Projets exportés: ${rows.length} | Généré le: ${gen}`,
          `Total base: ${dash.totalProjets} | Terminés: ${dash.termines.count} | En cours: ${dash.enCours.count}`,
        ];

  const doc = new jsPDF({ orientation: "landscape" });
  buildProjetsListPdf(
    doc,
    rows as never,
    subtitleLines,
    columnKeys,
    layout,
    listTitle,
    pdfEntreprise
  );

  const raw = Buffer.from(doc.output("arraybuffer"));
  const out = pdfListeFusionModeleActivee()
    ? await mergePdfWithModele(raw)
    : raw;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="projets-export.pdf"'
  );
  res.send(out);
}

export async function exportPdf(req: AuthRequest, res: Response) {
  const raw = req.query as Record<string, unknown>;
  const listTitle = resolvePdfListTitle(raw);
  const logoDataUrl = typeof raw.pdfLogoDataUrl === "string" ? raw.pdfLogoDataUrl.trim() : "";
  const defaultPdfEntreprise = buildSocietePdfEntreprise(await getSocieteInfo());
  const pdfEntreprise = resolvePdfEntrepriseLignes(raw);
  const q = { ...raw } as Record<string, unknown>;
  delete q.pdfTitle;
  delete q.title;
  delete q.pdfEnteteL1;
  delete q.pdfEnteteL2;
  delete q.pdfEnteteL3;
  delete q.pdfEnteteL4;
  delete q.pdfPiedL1;
  delete q.pdfPiedL2;
  delete q.pdfPiedL3;
  delete q.pdfPiedL4;
  delete q.pdfPiedL5;
  delete q.pdfLogoDataUrl;
  const requested = parsePdfColumnKeysParam(req.query.columns);
  const columnKeys = normalizePdfColumnKeys(requested);
  await sendProjetsListPdfResponse(
    res,
    req.user!,
    q as svc.ProjetListQuery,
    columnKeys,
    listTitle,
    {
      enteteLignes: pdfEntreprise.enteteLignes ?? defaultPdfEntreprise.enteteLignes,
      piedLignes: pdfEntreprise.piedLignes ?? defaultPdfEntreprise.piedLignes,
      logoDataUrl: logoDataUrl || defaultPdfEntreprise.logoDataUrl,
    }
  );
}

/** Même logique que GET mais filtres + colonnes dans le corps (évite URL trop longues). */
export async function exportPdfPost(req: AuthRequest, res: Response) {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const listTitle = resolvePdfListTitle(body);
  const logoDataUrl = typeof body.pdfLogoDataUrl === "string" ? body.pdfLogoDataUrl.trim() : "";
  const defaultPdfEntreprise = buildSocietePdfEntreprise(await getSocieteInfo());
  const pdfEntreprise = resolvePdfEntrepriseLignes(body);
  const colsRaw = body.columns;
  const q = { ...body } as Record<string, unknown>;
  delete q.columns;
  delete q.pdfTitle;
  delete q.title;
  delete q.pdfEnteteL1;
  delete q.pdfEnteteL2;
  delete q.pdfEnteteL3;
  delete q.pdfEnteteL4;
  delete q.pdfPiedL1;
  delete q.pdfPiedL2;
  delete q.pdfPiedL3;
  delete q.pdfPiedL4;
  delete q.pdfPiedL5;
  delete q.pdfLogoDataUrl;
  const requested = parsePdfColumnsFromBody(colsRaw);
  const columnKeys = normalizePdfColumnKeys(requested);
  await sendProjetsListPdfResponse(
    res,
    req.user!,
    q as svc.ProjetListQuery,
    columnKeys,
    listTitle,
    {
      enteteLignes: pdfEntreprise.enteteLignes ?? defaultPdfEntreprise.enteteLignes,
      piedLignes: pdfEntreprise.piedLignes ?? defaultPdfEntreprise.piedLignes,
      logoDataUrl: logoDataUrl || defaultPdfEntreprise.logoDataUrl,
    }
  );
}

export async function exportPdfColumnsMeta(
  _req: AuthRequest,
  res: Response
): Promise<void> {
  res.json({
    columns: PDF_LIST_COLUMN_META,
    defaultColumnKeys: DEFAULT_PDF_LIST_COLUMN_KEYS,
    defaultPdfTitle: getPdfListeTitre(),
  });
}

export async function importExcel(req: AuthRequest, res: Response) {
  const file = req.file;
  if (!file?.buffer) {
    res.status(400).json({ message: "Fichier manquant" });
    return;
  }
  const result = await svc.importExcel(req.user!, file.buffer);
  res.json(result);
}

export async function exportOnePdf(req: AuthRequest, res: Response) {
  if (req.user?.role === "COMMERCIAL") {
    throw new AppError(403, "Export PDF non autorisé pour ce rôle");
  }
  const raw = req.query as Record<string, unknown>;
  const logoDataUrl = typeof raw.pdfLogoDataUrl === "string" ? raw.pdfLogoDataUrl.trim() : "";
  const defaultPdfEntreprise = buildSocietePdfEntreprise(await getSocieteInfo());
  const pdfEntreprise = resolvePdfEntrepriseLignes(raw);
  const p = await svc.getProjetById(req.user!, req.params.id);
  const doc = new jsPDF();
  buildProjetFichePdf(doc, p as never, {
    enteteLignes: pdfEntreprise.enteteLignes ?? defaultPdfEntreprise.enteteLignes,
    piedLignes: pdfEntreprise.piedLignes ?? defaultPdfEntreprise.piedLignes,
    logoDataUrl: logoDataUrl || defaultPdfEntreprise.logoDataUrl,
  });
  const out = Buffer.from(doc.output("arraybuffer"));
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="projet-${p.reference}.pdf"`
  );
  res.send(out);
}

export async function exportOnePdfPost(req: AuthRequest, res: Response) {
  if (req.user?.role === "COMMERCIAL") {
    throw new AppError(403, "Export PDF non autorisé pour ce rôle");
  }
  const raw = (req.body ?? {}) as Record<string, unknown>;
  const logoDataUrl =
    typeof raw.pdfLogoDataUrl === "string" ? raw.pdfLogoDataUrl.trim() : "";
  const defaultPdfEntreprise = buildSocietePdfEntreprise(await getSocieteInfo());
  const pdfEntreprise = resolvePdfEntrepriseLignes(raw);
  const p = await svc.getProjetById(req.user!, req.params.id);
  const doc = new jsPDF();
  buildProjetFichePdf(doc, p as never, {
    enteteLignes: pdfEntreprise.enteteLignes ?? defaultPdfEntreprise.enteteLignes,
    piedLignes: pdfEntreprise.piedLignes ?? defaultPdfEntreprise.piedLignes,
    logoDataUrl: logoDataUrl || defaultPdfEntreprise.logoDataUrl,
  });
  const out = Buffer.from(doc.output("arraybuffer"));
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="projet-${p.reference}.pdf"`
  );
  res.send(out);
}
