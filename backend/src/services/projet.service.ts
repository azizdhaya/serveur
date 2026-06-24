import {
  ClassementDossier,
  EtatDossier,
  Prisma,
  StatutApprobation,
  TypeCompteur,
  TypeContrat,
  TypeProjet,
} from "@prisma/client";
import { prisma } from "../db.js";
import { AppError } from "../middleware/error.middleware.js";
import type { AccessPayload } from "../utils/jwt.js";
import { parsePagination } from "../utils/pagination.js";
import {
  EXCEL_HEADERS,
  projetToExcelRow,
  rowToProjetInput,
} from "../utils/excelMapping.js";
import {
  labelsForPdfListKeys,
  normalizePdfColumnKeys,
  pdfListCellValue,
} from "../utils/projetPdfListColumns.js";
import type { ProjetPdfModel } from "../utils/projetPdfModel.js";
import { canonicalExecutionInstallation } from "../utils/executionInstallation.js";
import { canonicalProcesVerbal } from "../utils/procesVerbal.js";
import { canonicalSaisieProsol } from "../utils/saisieProsol.js";
import { canonicalDeblocageProsol } from "../utils/deblocageProsol.js";
import { canonicalSaisieSubvention } from "../utils/saisieSubvention.js";
import { canonicalDeblocageSubvention } from "../utils/deblocageSubvention.js";
import { EMPTY_VALUE_LABEL_FR } from "../utils/emptyDisplay.js";
import * as XLSX from "xlsx";

/** Déduit le type métier depuis le nom de l’onglet Excel et normalise les anciennes valeurs Mongo (ex. COUPLE_RESEAU). */
function typeProjetFromSheetName(sheetName: string): TypeProjet {
  const n = sheetName
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
  if (n.includes("pompage")) return TypeProjet.POMPAGE;
  if (n.includes("isol") || n.includes("batter")) {
    return TypeProjet.ISOLE_AVEC_BATTERIES;
  }
  if (n.includes("autre")) return "AUTRE" as TypeProjet;
  return TypeProjet.PHOTOVOLTAIQUE_CLASSIQUE;
}

function normExcelHeader(s: unknown): string {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function looksLikeKvpLayout(raw: unknown[][]): boolean {
  if (!raw.length) return false;
  /** Tableau standard : 1ʳᵉ ligne = en-têtes avec Référence + Abonnés (feuille liste). */
  const row0 = (raw[0] ?? []).map((c) => String(c ?? "").toLowerCase());
  const row0Joined = row0.join(" ");
  if (row0Joined.includes("abonné") || row0Joined.includes("abonne"))
    return false;

  const probe = raw.slice(0, 15).flat().map((x) => normExcelHeader(x));
  return probe.some((x) => x === "reference");
}

/** Convertit un format "fiche" (lignes clé/valeur) en tableau [headers, ...rows]. */
function kvpLayoutToMatrix(raw: unknown[][]): unknown[][] {
  const rows: Record<string, unknown>[] = [];
  let current: Record<string, unknown> | null = null;
  const hasReferenceValue = (r: Record<string, unknown>) =>
    Object.entries(r).some(
      ([k, v]) => normExcelHeader(k) === "reference" && String(v ?? "").trim() !== ""
    );

  for (let i = 0; i < raw.length - 1; i++) {
    const keyRow = raw[i] ?? [];
    const valRow = raw[i + 1] ?? [];
    const k0 = normExcelHeader(keyRow[0]);
    const k1 = normExcelHeader(keyRow[1]);
    const k2 = normExcelHeader(keyRow[2]);
    const k3 = normExcelHeader(keyRow[3]);
    const hasReferenceHeader = [k0, k1, k2, k3].includes("reference");

    if (hasReferenceHeader) {
      if (current && hasReferenceValue(current)) rows.push(current);
      current = {};
    }
    if (!current) continue;

    for (let c = 0; c <= 3; c++) {
      const rawKey = String(keyRow[c] ?? "").trim();
      if (!rawKey) continue;
      const nk = normExcelHeader(rawKey);
      if (nk.includes("donnees relatives")) continue;
      const val = valRow[c];
      const text = String(val ?? "").trim();
      if (text === "") continue;
      current[rawKey] = val;
    }
    i++; // consume la ligne de valeurs
  }
  if (current && hasReferenceValue(current)) rows.push(current);

  const headersSet = new Set<string>();
  for (const r of rows) Object.keys(r).forEach((h) => headersSet.add(h));
  const headers = Array.from(headersSet);
  const matrix: unknown[][] = [headers];
  for (const r of rows) matrix.push(headers.map((h) => r[h] ?? ""));
  return matrix;
}

const SHEET_SKIP = /^(outils|feuil\d*)$/i;

/** Extrait une matrice [en-têtes, ...lignes] depuis une feuille brute. */
function matrixFromSheetRaw(raw: unknown[][]): unknown[][] | null {
  if (!raw.length) return null;
  if (looksLikeKvpLayout(raw)) {
    const converted = kvpLayoutToMatrix(raw);
    return converted.length > 1 ? converted : null;
  }
  const maxScan = Math.min(8, raw.length);
  for (let start = 0; start < maxScan; start++) {
    const headerRow = (raw[start] as string[]).map((h) => String(h ?? ""));
    const haystack = headerRow.join(" ").toLowerCase();
    if (haystack.includes("référence") || haystack.includes("reference")) {
      return raw.slice(start);
    }
  }
  return null;
}

/**
 * Toutes les feuilles contenant un tableau importable (ligne d’en-têtes avec Référence).
 * Importe ainsi les onglets « Couplé réseau », « Pompage », « Isolé batteries », etc.
 */
function collectImportableMatrices(
  wb: XLSX.WorkBook
): { sheetName: string; matrix: unknown[][] }[] {
  const out: { sheetName: string; matrix: unknown[][] }[] = [];
  for (const name of wb.SheetNames) {
    if (SHEET_SKIP.test(name.trim())) continue;
    const sheet = wb.Sheets[name];
    if (!sheet) continue;
    const raw = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
      header: 1,
      defval: "",
    }) as unknown[][];
    const matrix = matrixFromSheetRaw(raw);
    if (!matrix || matrix.length < 2) continue;
    out.push({ sheetName: name.trim(), matrix });
  }
  return out;
}

const agentSelect = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
};

const projetInclude = {
  agentCommercial: { select: agentSelect },
  echeances: { orderBy: { numero: "asc" as const } },
};

/** Aligné sur `PROJET_LIST_DATE_FILTER_KEYS` dans `frontend/src/utils/constants.ts`. */
const DATE_FILTER_FIELDS = [
  "createdAt",
  "updatedAt",
  "dateDepotDossier",
  "dateApprobation",
  "dateInstallation",
  "dateDepotDemandeMES",
  "dateMES",
  "dateDevis",
  "dateFacture",
] as const;

export type ProjetListQuery = {
  page?: string;
  limit?: string;
  search?: string;
  etat?: string;
  district?: string;
  contrat?: string;
  typeProjet?: string;
  banque?: string;
  agentId?: string;
  dateFrom?: string;
  dateTo?: string;
  /** Champ date utilisé avec dateFrom / dateTo (défaut : createdAt). */
  dateField?: string;
  classement?: string;
  gouvernorat?: string;
  delegation?: string;
  municipalite?: string;
  approbationCommerciale?: string;
  approbationTechnique?: string;
  typeCompteur?: string;
  numeroCompteur?: string;
  calibreDisjoncteur?: string;
  puissanceSouscrite?: string;
  codeBarres?: string;
  contact?: string;
  presenteParMF?: string;
  adresse?: string;
  nPolice?: string;
  nDevis?: string;
  nFacture?: string;
  nLotDebProsol?: string;
  nLotDeblocageSubvention?: string;
  marquePV?: string;
  modelePV?: string;
  marqueOnd?: string;
  modeleOnd?: string;
  autreModeleOnd?: string;
  rapportPuissance?: string;
  executionInstallation?: string;
  reception?: string;
  procesVerbal?: string;
  saisieProsol?: string;
  deblocageProsol?: string;
  conditionSubvention?: string;
  /** Subvention ANME : OUI | NON (filtre exact, insensible à la casse). */
  anme?: string;
  saisieSubvention?: string;
  deblocageSubvention?: string;
  commentaire?: string;
  puissanceMin?: string;
  puissanceMax?: string;
  nbModulesMin?: string;
  nbModulesMax?: string;
  nbOnduleursMin?: string;
  nbOnduleursMax?: string;
  montantTTCMin?: string;
  montantTTCMax?: string;
  montantFinancementMin?: string;
  montantFinancementMax?: string;
  /** Taux d'intérêt (%) — valeur exacte (tolérance numérique). */
  tauxInteret?: string;
  /** Texte présent dans N° lot Prosol OU N° lot déblocage subvention. */
  lotDeblocage?: string;
  sortBy?: string;
  order?: string;
};

function commercialFilter(user: AccessPayload): Prisma.ProjetWhereInput | null {
  if (user.role !== "COMMERCIAL") return null;
  return { agentCommercialId: user.sub };
}

function endOfDayLocal(isoYmd: string): Date {
  return new Date(`${isoYmd}T23:59:59.999`);
}

function decBound(s?: string): number | undefined {
  if (!s?.trim()) return undefined;
  const x = s
    .trim()
    .replace(/\s/g, "")
    .replace(/%/g, "")
    .replace(",", ".");
  if (!/^-?\d*\.?\d+$/.test(x)) return undefined;
  const n = Number(x);
  return Number.isFinite(n) ? n : undefined;
}

function intBound(s?: string): number | undefined {
  if (!s?.trim()) return undefined;
  const n = parseInt(s.trim(), 10);
  return Number.isFinite(n) ? n : undefined;
}

function buildWhere(
  user: AccessPayload,
  q: ProjetListQuery
): Prisma.ProjetWhereInput {
  const and: Prisma.ProjetWhereInput[] = [];
  const cf = commercialFilter(user);
  if (cf) and.push(cf);

  if (q.search?.trim()) {
    const s = q.search.trim();
    and.push({
      OR: [
        { reference: { contains: s } },
        { abonnes: { contains: s } },
        { cin: { contains: s } },
        { contact: { contains: s } },
        { nPolice: { contains: s } },
        { nDevis: { contains: s } },
        { nFacture: { contains: s } },
        { presenteParMF: { contains: s } },
      ],
    });
  }
  if (q.etat) {
    const e = q.etat as EtatDossier;
    if (Object.values(EtatDossier).includes(e)) and.push({ etatDossier: e });
  }
  if (q.district?.trim()) {
    and.push({
      district: { equals: q.district.trim(), mode: "insensitive" },
    });
  }
  if (q.contrat) {
    if (q.contrat === "NEANT" || q.contrat === "__NULL__") {
      and.push({ contratAchat: null });
    } else {
      const c = q.contrat as TypeContrat;
      if (Object.values(TypeContrat).includes(c))
        and.push({ contratAchat: c });
    }
  }
  if (q.typeProjet) {
    const tp = q.typeProjet as TypeProjet;
    if (Object.values(TypeProjet).includes(tp)) and.push({ typeProjet: tp });
  }
  if (q.banque?.trim()) and.push({ banque: { contains: q.banque.trim() } });
  if (q.agentId) {
    if (q.agentId === "__AUTRE__") {
      and.push({ agentCommercialId: null, agentCommercialAutre: { not: null } });
    } else {
      and.push({ agentCommercialId: q.agentId });
    }
  }
  if (q.classement) {
    const cl = q.classement as ClassementDossier;
    if (Object.values(ClassementDossier).includes(cl))
      and.push({ classementDossier: cl });
  }
  if (q.gouvernorat?.trim())
    and.push({ gouvernorat: { contains: q.gouvernorat.trim() } });
  if (q.delegation?.trim())
    and.push({ delegation: { contains: q.delegation.trim() } });
  if (q.municipalite?.trim())
    and.push({ municipalite: { contains: q.municipalite.trim() } });
  if (q.approbationCommerciale) {
    const a = q.approbationCommerciale as StatutApprobation;
    if (Object.values(StatutApprobation).includes(a))
      and.push({ approbationCommerciale: a });
  }
  if (q.approbationTechnique) {
    const a = q.approbationTechnique as StatutApprobation;
    if (Object.values(StatutApprobation).includes(a))
      and.push({ approbationTechnique: a });
  }
  if (q.typeCompteur) {
    if (q.typeCompteur === "NEANT" || q.typeCompteur === "__NULL__") {
      and.push({ typeCompteur: null });
    } else {
      const t = q.typeCompteur as TypeCompteur;
      if (Object.values(TypeCompteur).includes(t))
        and.push({ typeCompteur: t });
    }
  }
  if (q.numeroCompteur?.trim())
    and.push({ numeroCompteur: { contains: q.numeroCompteur.trim() } });
  if (q.calibreDisjoncteur?.trim())
    and.push({
      calibreDisjoncteur: { contains: q.calibreDisjoncteur.trim() },
    });
  if (q.puissanceSouscrite?.trim())
    and.push({
      puissanceSouscrite: { contains: q.puissanceSouscrite.trim() },
    });
  const contains = (field: keyof Prisma.ProjetWhereInput, v?: string) => {
    const t = v?.trim();
    if (t) and.push({ [field]: { contains: t } } as Prisma.ProjetWhereInput);
  };
  contains("codeBarres", q.codeBarres);
  contains("contact", q.contact);
  contains("presenteParMF", q.presenteParMF);
  if (q.adresse?.trim())
    and.push({
      adresseLieuImplantation: { contains: q.adresse.trim() },
    });
  contains("nPolice", q.nPolice);
  contains("nDevis", q.nDevis);
  contains("nFacture", q.nFacture);
  contains("nLotDebProsol", q.nLotDebProsol);
  contains("nLotDeblocageSubvention", q.nLotDeblocageSubvention);
  if (q.lotDeblocage?.trim()) {
    const lt = q.lotDeblocage.trim();
    and.push({
      OR: [
        { nLotDebProsol: { contains: lt } },
        { nLotDeblocageSubvention: { contains: lt } },
      ],
    });
  }
  contains("marquePV", q.marquePV);
  contains("modelePV", q.modelePV);
  contains("marqueOnd", q.marqueOnd);
  contains("modeleOnd", q.modeleOnd);
  contains("autreModeleOnd", q.autreModeleOnd);
  contains("rapportPuissance", q.rapportPuissance);
  contains("executionInstallation", q.executionInstallation);
  if (q.reception?.trim()) {
    and.push({
      reception: {
        equals: q.reception.trim(),
        mode: "insensitive",
      },
    });
  }
  contains("procesVerbal", q.procesVerbal);
  if (q.saisieProsol?.trim()) {
    and.push({
      saisieProsol: { equals: q.saisieProsol.trim(), mode: "insensitive" },
    });
  }
  if (q.deblocageProsol?.trim()) {
    and.push({
      deblocageProsol: { equals: q.deblocageProsol.trim(), mode: "insensitive" },
    });
  }
  if (q.anme === "OUI" || q.anme === "NON") {
    and.push({
      conditionSubvention: { equals: q.anme, mode: "insensitive" },
    });
  } else {
    contains("conditionSubvention", q.conditionSubvention);
  }
  if (q.saisieSubvention?.trim()) {
    and.push({
      saisieSubvention: {
        equals: q.saisieSubvention.trim(),
        mode: "insensitive",
      },
    });
  }
  if (q.deblocageSubvention?.trim()) {
    and.push({
      deblocageSubvention: {
        equals: q.deblocageSubvention.trim(),
        mode: "insensitive",
      },
    });
  }
  contains("commentaire", q.commentaire);

  const pMin = decBound(q.puissanceMin);
  const pMax = decBound(q.puissanceMax);
  if (pMin || pMax) {
    and.push({
      puissanceInstallee: {
        ...(pMin && { gte: pMin }),
        ...(pMax && { lte: pMax }),
      },
    });
  }
  const nmMin = intBound(q.nbModulesMin);
  const nmMax = intBound(q.nbModulesMax);
  if (nmMin != null || nmMax != null) {
    and.push({
      nbModules: {
        ...(nmMin != null && { gte: nmMin }),
        ...(nmMax != null && { lte: nmMax }),
      },
    });
  }
  const noMin = intBound(q.nbOnduleursMin);
  const noMax = intBound(q.nbOnduleursMax);
  if (noMin != null || noMax != null) {
    and.push({
      nbOnduleurs: {
        ...(noMin != null && { gte: noMin }),
        ...(noMax != null && { lte: noMax }),
      },
    });
  }
  const ttcMin = decBound(q.montantTTCMin);
  const ttcMax = decBound(q.montantTTCMax);
  if (ttcMin || ttcMax) {
    and.push({
      montantTTC: {
        ...(ttcMin && { gte: ttcMin }),
        ...(ttcMax && { lte: ttcMax }),
      },
    });
  }
  const mfMin = decBound(q.montantFinancementMin);
  const mfMax = decBound(q.montantFinancementMax);
  if (mfMin || mfMax) {
    and.push({
      montantFinancement: {
        ...(mfMin && { gte: mfMin }),
        ...(mfMax && { lte: mfMax }),
      },
    });
  }
  const tauxFiltre = decBound(q.tauxInteret);
  if (tauxFiltre !== undefined) {
    const eps = 0.002;
    const pct = { gte: tauxFiltre - eps, lte: tauxFiltre + eps };
    const frac = {
      gte: tauxFiltre / 100 - 1e-5,
      lte: tauxFiltre / 100 + 1e-5,
    };
    and.push({
      OR: [{ tauxInteret: pct }, { tauxInteret: frac }],
    });
  }

  if (q.dateFrom || q.dateTo) {
    const field = DATE_FILTER_FIELDS.includes(
      q.dateField as (typeof DATE_FILTER_FIELDS)[number]
    )
      ? (q.dateField as (typeof DATE_FILTER_FIELDS)[number])
      : "createdAt";
    const gte = q.dateFrom ? new Date(q.dateFrom) : undefined;
    const lte = q.dateTo ? endOfDayLocal(q.dateTo) : undefined;
    and.push({
      [field]: {
        ...(gte && { gte }),
        ...(lte && { lte }),
      },
    } as Prisma.ProjetWhereInput);
  }
  return and.length ? { AND: and } : {};
}

function sortField(sortBy?: string): keyof Prisma.ProjetOrderByWithRelationInput {
  const allowed = [
    "createdAt",
    "reference",
    "abonnes",
    "district",
    "etatDossier",
    "contratAchat",
    "dateDepotDossier",
    "puissanceInstallee",
    "montantTTCFinal",
    "resteAPayer",
  ] as const;
  const s = sortBy as (typeof allowed)[number];
  return allowed.includes(s) ? s : "createdAt";
}

export async function listProjets(user: AccessPayload, q: ProjetListQuery) {
  const { page, limit, skip } = parsePagination(q);
  const where = buildWhere(user, q);
  const order = q.order === "asc" ? "asc" : "desc";
  const orderBy = { [sortField(q.sortBy)]: order } as Prisma.ProjetOrderByWithRelationInput;

  const [total, data] = await Promise.all([
    prisma.projet.count({ where }),
    prisma.projet.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: projetInclude,
    }),
  ]);

  return { data, total, page, limit };
}

export async function getProjetById(user: AccessPayload, id: string) {
  const p = await prisma.projet.findFirst({
    where: {
      id,
      ...(commercialFilter(user) ?? {}),
    },
    include: {
      ...projetInclude,
      logs: {
        take: 50,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { nom: true, prenom: true, email: true } } },
      },
    },
  });
  if (!p) throw new AppError(404, "Projet introuvable");
  return p;
}

type CommercialPick = { id: string; nom: string; prenom: string };

/** SQLite : pas de `mode: insensitive` — correspondance insensible à la casse en mémoire. */
function matchCommercialByName(
  commercials: CommercialPick[],
  name: string | undefined
): string | null {
  if (!name?.trim()) return null;
  const raw = name.trim();
  const parts = raw.split(/\s+/);
  const same = (a: string, b: string) =>
    a.localeCompare(b, "fr", { sensitivity: "accent" }) === 0;
  if (parts.length < 2) {
    return (
      commercials.find((c) => same(c.nom, raw) || same(c.prenom, raw))?.id ??
      null
    );
  }
  const prenom = parts[0];
  const nom = parts.slice(1).join(" ");
  return (
    commercials.find((c) => same(c.prenom, prenom) && same(c.nom, nom))?.id ??
    null
  );
}

type ProjetPayload = {
  reference: string;
  abonnes: string;
  codeBarres?: string | null;
  email?: string | null;
  cin?: string | null;
  contact?: string | null;
  coordonneesGps?: string | null;
  adresseLieuImplantation?: string | null;
  presenteParMF?: string | null;
  district?: string | null;
  gouvernorat?: string | null;
  delegation?: string | null;
  municipalite?: string | null;
  typeProjet?: TypeProjet;
  etatDossier?: EtatDossier;
  classementDossier?: ClassementDossier;
  commentaire?: string | null;
  approbationCommerciale?: StatutApprobation;
  approbationTechnique?: StatutApprobation;
  executionInstallation?: string | null;
  reception?: string | null;
  procesVerbal?: string | null;
  contratAchat?: TypeContrat | null;
  montantFinancement?: string | number | null;
  tauxInteret?: string | number | null;
  banque?: string | null;
  agentCommercialId?: string | null;
  agentCommercialAutre?: string | null;
  puissanceInstallee?: string | number | null;
  typeCompteur?: TypeCompteur | null;
  numeroCompteur?: string | null;
  calibreDisjoncteur?: string | null;
  puissanceSouscrite?: string | null;
  productionPrevisionnelle?: string | number | null;
  consommationAnnuelle?: string | number | null;
  nbModules?: number | null;
  puUnitairePV?: string | number | null;
  marquePV?: string | null;
  modelePV?: string | null;
  nbOnduleurs?: number | null;
  puUnitaireOnd?: string | number | null;
  puOndSiAutreW?: string | number | null;
  marqueOnd?: string | null;
  modeleOnd?: string | null;
  autreModeleOnd?: string | null;
  equipementSurMesure?: string | null;
  interventionSurMesure?: string | null;
  rapportPuissance?: string | null;
  dateDepotDossier?: string | null;
  dateApprobation?: string | null;
  dateInstallation?: string | null;
  dateDepotDemandeMES?: string | null;
  datePaiementPoseCompteurProsol?: string | null;
  dateMES?: string | null;
  nPolice?: string | null;
  nLotDebProsol?: string | null;
  saisieProsol?: string | null;
  nLotDeblocageSubvention?: string | null;
  deblocageProsol?: string | null;
  conditionSubvention?: string | null;
  saisieSubvention?: string | null;
  deblocageSubvention?: string | null;
  nDevis?: string | null;
  dateDevis?: string | null;
  nFacture?: string | null;
  dateFacture?: string | null;
  montantHT?: string | number | null;
  tva?: string | number | null;
  montantTTC?: string | number | null;
  montantTTCFinal?: string | number | null;
  montantAutofinancement?: string | number | null;
  fraisPoseCmptProsol?: string | number | null;
  paiement1erFactureSTEG?: string | number | null;
  paiement2emeFactureSTEG?: string | number | null;
  fraisAugmentationCalibre?: string | number | null;
  fraisMutationElec?: string | number | null;
  fraisMutationGaz?: string | number | null;
  fraisPassageMonoTri?: string | number | null;
  autresFrais?: string | number | null;
  reglementClient?: string | number | null;
  resteAPayer?: string | number | null;
  subventionDemandee?: string | number | null;
  echeances?: {
    numero: number;
    montant?: string | null;
    date?: string | null;
    modePaiement?: string | null;
    description?: string | null;
  }[];
};

function dec(s: string | number | null | undefined) {
  if (s == null || s === "") return null;
  const str = (typeof s === "number" ? String(s) : String(s))
    .trim()
    .replace(/\s/g, "")
    .replace(/,/g, ".");
  if (str === "" || str === "-" || str === ".") return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}

function emptyToNull(s: string | null | undefined) {
  if (s == null) return null;
  const t = String(s).trim();
  return t === "" || t === "-" ? null : t;
}

function optDate(s?: string | null) {
  if (s == null || String(s).trim() === "") return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Champs scalaires Prisma (sans agent ni échéances). */
function payloadToProjetScalars(p: ProjetPayload): Prisma.ProjetCreateInput {
  const data: Prisma.ProjetCreateInput = {
    reference: p.reference,
    abonnes: p.abonnes,
    codeBarres: p.codeBarres ?? null,
    email: p.email ?? null,
    cin: p.cin ?? null,
    contact: p.contact ?? null,
    coordonneesGps: p.coordonneesGps ?? null,
    adresseLieuImplantation: p.adresseLieuImplantation ?? null,
    presenteParMF: p.presenteParMF ?? null,
    district: p.district ?? null,
    gouvernorat: p.gouvernorat ?? null,
    delegation: p.delegation ?? null,
    municipalite: p.municipalite ?? null,
    typeProjet: p.typeProjet,
    etatDossier: p.etatDossier,
    classementDossier: p.classementDossier,
    commentaire: p.commentaire ?? null,
    approbationCommerciale: p.approbationCommerciale,
    approbationTechnique: p.approbationTechnique,
    executionInstallation: canonicalExecutionInstallation(
      p.executionInstallation
    ),
    reception: p.reception ?? null,
    procesVerbal: canonicalProcesVerbal(p.procesVerbal),
    contratAchat: p.contratAchat ?? null,
    montantFinancement: dec(p.montantFinancement),
    tauxInteret: dec(p.tauxInteret),
    banque: p.banque ?? null,
    puissanceInstallee: dec(p.puissanceInstallee),
    typeCompteur: p.typeCompteur ?? null,
    numeroCompteur: p.numeroCompteur ?? null,
    calibreDisjoncteur: p.calibreDisjoncteur ?? null,
    puissanceSouscrite: p.puissanceSouscrite ?? null,
    productionPrevisionnelle: dec(p.productionPrevisionnelle),
    consommationAnnuelle: dec(p.consommationAnnuelle),
    nbModules: p.nbModules ?? null,
    puUnitairePV: dec(p.puUnitairePV),
    marquePV: p.marquePV ?? null,
    modelePV: p.modelePV ?? null,
    nbOnduleurs: p.nbOnduleurs ?? null,
    puUnitaireOnd: dec(p.puUnitaireOnd),
    puOndSiAutreW: dec(p.puOndSiAutreW),
    marqueOnd: p.marqueOnd ?? null,
    modeleOnd: p.modeleOnd ?? null,
    autreModeleOnd: p.autreModeleOnd ?? null,
    rapportPuissance: p.rapportPuissance ?? null,
    dateDepotDossier: optDate(p.dateDepotDossier),
    dateApprobation: optDate(p.dateApprobation),
    dateInstallation: optDate(p.dateInstallation),
    dateDepotDemandeMES: optDate(p.dateDepotDemandeMES),
    datePaiementPoseCompteurProsol: optDate(p.datePaiementPoseCompteurProsol),
    dateMES: optDate(p.dateMES),
    nPolice: p.nPolice ?? null,
    nLotDebProsol: p.nLotDebProsol ?? null,
    saisieProsol: canonicalSaisieProsol(p.saisieProsol),
    nLotDeblocageSubvention: p.nLotDeblocageSubvention ?? null,
    deblocageProsol: canonicalDeblocageProsol(p.deblocageProsol),
    conditionSubvention: p.conditionSubvention ?? null,
    saisieSubvention: canonicalSaisieSubvention(p.saisieSubvention),
    deblocageSubvention: canonicalDeblocageSubvention(p.deblocageSubvention),
    nDevis: p.nDevis ?? null,
    dateDevis: optDate(p.dateDevis),
    nFacture: p.nFacture ?? null,
    dateFacture: optDate(p.dateFacture),
    montantHT: dec(p.montantHT),
    tva: dec(p.tva),
    montantTTC: dec(p.montantTTC),
    montantTTCFinal: dec(p.montantTTCFinal),
    montantAutofinancement: dec(p.montantAutofinancement),
    fraisPoseCmptProsol: dec(p.fraisPoseCmptProsol),
    paiement1erFactureSTEG: dec(p.paiement1erFactureSTEG),
    paiement2emeFactureSTEG: dec(p.paiement2emeFactureSTEG),
    fraisAugmentationCalibre: dec(p.fraisAugmentationCalibre),
    fraisMutationElec: dec(p.fraisMutationElec),
    fraisMutationGaz: dec(p.fraisMutationGaz),
    fraisPassageMonoTri: dec(p.fraisPassageMonoTri),
    autresFrais: dec(p.autresFrais),
    reglementClient: dec(p.reglementClient),
    resteAPayer: dec(p.resteAPayer),
    subventionDemandee: dec(p.subventionDemandee),
  };
  // Champs ajoutés récemment ; garde la compatibilité si l'IDE a encore d'anciens types Prisma.
  (data as Record<string, unknown>).equipementSurMesure =
    p.equipementSurMesure ?? null;
  (data as Record<string, unknown>).interventionSurMesure =
    p.interventionSurMesure ?? null;
  (data as Record<string, unknown>).agentCommercialAutre =
    p.agentCommercialAutre ?? null;
  return data;
}

export async function createProjet(user: AccessPayload, payload: ProjetPayload) {
  if (user.role === "COMMERCIAL") {
    throw new AppError(403, "Création non autorisée pour ce rôle");
  }
  const exists = await prisma.projet.findUnique({
    where: { reference: payload.reference },
  });
  if (exists) throw new AppError(400, "Cette référence existe déjà");

  const agentId = payload.agentCommercialId ?? null;

  const scalars = payloadToProjetScalars(payload);

  const projet = await prisma.projet.create({
    data: {
      ...scalars,
      agentCommercial: agentId
        ? { connect: { id: agentId } }
        : undefined,
      echeances: payload.echeances?.length
        ? {
            create: payload.echeances.map((e) => ({
              numero: e.numero,
              montant: dec(e.montant),
              date: optDate(e.date),
              modePaiement: emptyToNull(e.modePaiement),
              description: emptyToNull(e.description),
            })),
          }
        : undefined,
    },
    include: projetInclude,
  });

  await prisma.actionLog.create({
    data: {
      userId: user.sub,
      projetId: projet.id,
      action: "CREATION",
      details: { reference: projet.reference },
    },
  });

  return projet;
}

export async function updateProjet(
  user: AccessPayload,
  id: string,
  payload: ProjetPayload
) {
  if (user.role === "COMMERCIAL") {
    throw new AppError(403, "Modification non autorisée pour ce rôle");
  }
  const existing = await prisma.projet.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "Projet introuvable");

  let agentId: string | null;
  if (Object.prototype.hasOwnProperty.call(payload, "agentCommercialId")) {
    agentId = payload.agentCommercialId ?? null;
  } else {
    agentId = existing.agentCommercialId;
  }

  if (payload.reference && payload.reference !== existing.reference) {
    const refTaken = await prisma.projet.findUnique({
      where: { reference: payload.reference },
    });
    if (refTaken) throw new AppError(400, "Cette référence existe déjà");
  }

  const scalars = payloadToProjetScalars(payload);

  await prisma.projet.update({
    where: { id },
    data: {
      ...scalars,
      agentCommercial: agentId
        ? { connect: { id: agentId } }
        : { disconnect: true },
    },
    include: projetInclude,
  });

  if (payload.echeances) {
    await prisma.echeance.deleteMany({ where: { projetId: id } });
    if (payload.echeances.length) {
      await prisma.echeance.createMany({
        data: payload.echeances.map((e) => ({
          projetId: id,
          numero: e.numero,
          montant: dec(e.montant),
          date: optDate(e.date),
          modePaiement: emptyToNull(e.modePaiement),
          description: emptyToNull(e.description),
        })),
      });
    }
  }

  const refreshed = await prisma.projet.findUnique({
    where: { id },
    include: projetInclude,
  });

  await prisma.actionLog.create({
    data: {
      userId: user.sub,
      projetId: id,
      action: "MODIFICATION",
      details: { reference: refreshed!.reference },
    },
  });

  return refreshed!;
}

export async function deleteProjet(user: AccessPayload, id: string) {
  if (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN") {
    throw new AppError(403, "Accès refusé");
  }
  const existing = await prisma.projet.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "Projet introuvable");
  await prisma.projet.delete({ where: { id } });
  await prisma.actionLog.create({
    data: {
      userId: user.sub,
      action: "SUPPRESSION",
      details: { reference: existing.reference },
    },
  });
}

export async function archiveProjets(
  user: AccessPayload,
  ids: string[],
  archive: boolean
) {
  if (user.role === "COMMERCIAL") {
    throw new AppError(403, "Archivage non autorisé pour ce rôle");
  }
  if (!ids.length) return { count: 0 };
  const where: Prisma.ProjetWhereInput = {
    id: { in: ids },
    ...(commercialFilter(user) ?? {}),
  };
  const r = await prisma.projet.updateMany({
    where,
    data: {
      classementDossier: archive
        ? ClassementDossier.ARCHIVE
        : ClassementDossier.NON_ARCHIVE,
    },
  });
  return { count: r.count };
}

export async function findManyForExport(
  user: AccessPayload,
  q: ProjetListQuery,
  ids?: string[]
) {
  /** `ids:` sans identifiants → aucune ligne (évite un fallback sur la recherche texte). */
  if (ids !== undefined && ids.length === 0) {
    return [];
  }
  const where: Prisma.ProjetWhereInput =
    ids !== undefined && ids.length > 0
      ? {
          id: { in: ids },
          ...(commercialFilter(user) ?? {}),
        }
      : buildWhere(user, q);
  return prisma.projet.findMany({
    where,
    include: projetInclude,
    orderBy: { reference: "asc" },
  });
}

export function buildExcelBuffer(
  rows: Awaited<ReturnType<typeof findManyForExport>>
) {
  const aoa = [EXCEL_HEADERS, ...rows.map((p) => projetToExcelRow(p))];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Projets");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

/** Export Excel avec les mêmes colonnes que l’export PDF sur mesure (clés + libellés métier). */
export function buildExcelBufferForColumns(
  rows: Awaited<ReturnType<typeof findManyForExport>>,
  columnKeys: string[]
) {
  const keys = normalizePdfColumnKeys(columnKeys);
  const headers = labelsForPdfListKeys(keys);
  const aoa = [
    headers,
    ...rows.map((p) =>
      keys.map((k) =>
        pdfListCellValue(k, p as unknown as ProjetPdfModel)
      )
    ),
  ];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Projets");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

export async function importExcel(
  user: AccessPayload,
  buffer: Buffer
): Promise<{ ok: number; errors: { row: number; message: string }[] }> {
  if (user.role === "COMMERCIAL") {
    throw new AppError(403, "Import non autorisé");
  }
  const wb = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const blocks = collectImportableMatrices(wb);
  if (!blocks.length) {
    return {
      ok: 0,
      errors: [
        {
          row: 0,
          message:
            "Aucune feuille reconnue (en-têtes avec « Référence » ou mise en forme fiche). Fichier vide ou mauvais classeur.",
        },
      ],
    };
  }
  const commercials = await prisma.user.findMany({
    where: { role: "COMMERCIAL", actif: true },
    select: { id: true, nom: true, prenom: true },
    orderBy: [{ nom: "asc" }, { prenom: "asc" }],
  });
  const errors: { row: number; message: string }[] = [];
  let ok = 0;
  for (const { sheetName, matrix } of blocks) {
    const headerRow = (matrix[0] as string[]).map((h) => String(h ?? ""));
    const typeProjetFeuille = typeProjetFromSheetName(sheetName);
    const prefix = (msg: string) =>
      `Feuille « ${sheetName} » : ${msg}`;
    for (let i = 1; i < matrix.length; i++) {
      const row = matrix[i];
      if (!row || !row.some((c) => c !== "" && c != null)) continue;
      try {
        const parsed = rowToProjetInput(row as unknown[], headerRow);
        if (!parsed) {
          const hasContent = row.some((c) => {
            const s = String(c ?? "").trim();
            return (
              s !== "" &&
              s !== "—" &&
              s !== "-" &&
              s !== EMPTY_VALUE_LABEL_FR
            );
          });
          if (hasContent) {
            errors.push({
              row: i + 1,
              message: prefix(`ligne ${i + 1}, référence manquante`),
            });
          }
          continue;
        }
        const agentId = matchCommercialByName(
          commercials,
          parsed.agentCommercialName
        );
        const { reference, data: createData, echeances } = parsed;
        /** Ne charge que l’id : certains documents Mongo ont d’anciennes valeurs d’enum
         * (ex. COUPLE_RESEAU) qui feraient échouer l’hydratation Prisma sur findUnique complet. */
        const existing = await prisma.projet.findFirst({
          where: { reference },
          select: { id: true },
        });
        const echCreates = echeances
          .filter((e) => e.montant || e.date || e.modePaiement || e.description)
          .map((e) => ({
            numero: e.numero,
            montant: e.montant ?? null,
            date: e.date,
            modePaiement: e.modePaiement ?? null,
            description: e.description ?? null,
          }));
        if (existing) {
          await prisma.projet.update({
            where: { id: existing.id },
            data: {
              ...createData,
              typeProjet: typeProjetFeuille,
              agentCommercial: agentId
                ? { connect: { id: agentId } }
                : { disconnect: true },
              echeances: {
                deleteMany: {},
                create: echCreates,
              },
            } as Prisma.ProjetUpdateInput,
          });
        } else {
          await prisma.projet.create({
            data: {
              ...createData,
              typeProjet: typeProjetFeuille,
              agentCommercial: agentId
                ? { connect: { id: agentId } }
                : undefined,
              echeances: echCreates.length
                ? { create: echCreates }
                : undefined,
            } as Prisma.ProjetCreateInput,
          });
        }
        ok++;
      } catch (e) {
        errors.push({
          row: i + 1,
          message: prefix(
            `ligne ${i + 1} : ${e instanceof Error ? e.message : "Erreur"}`
          ),
        });
      }
    }
  }
  await prisma.actionLog.create({
    data: {
      userId: user.sub,
      action: "IMPORT_EXCEL",
      details: { ok, errors: errors.length },
    },
  });
  return { ok, errors };
}
