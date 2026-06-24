import {
  ClassementDossier,
  StatutApprobation,
  TypeCompteur,
  TypeContrat,
} from "@prisma/client";
import { formatCommercialExcelCell } from "./commercialDisplay.js";
import { etatDossierToFrenchLabel } from "./excelMapping.js";
import type { ProjetPdfModel } from "./projetPdfModel.js";
import { EMPTY_VALUE_LABEL_FR } from "./emptyDisplay.js";

export type PdfListColumnMeta = {
  key: string;
  label: string;
  group: string;
};

function dash(s: unknown): string {
  if (s == null || s === "") return EMPTY_VALUE_LABEL_FR;
  return String(s);
}

function fmtDateFr(d: Date | null | undefined): string {
  if (!d) return EMPTY_VALUE_LABEL_FR;
  try {
    return d.toLocaleDateString("fr-FR");
  } catch {
    return EMPTY_VALUE_LABEL_FR;
  }
}

function parseNumericLoose(v: number | string | null | undefined): number | null {
  if (v == null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v)
    .trim()
    .replace(/[ \u00A0\u202F]/g, "")
    .replace(/tnd/gi, "")
    .replace(/(?<=\d)\/(?=\d)/g, ".")
    .replace(",", ".");
  if (!s) return null;
  const x = Number.parseFloat(s);
  return Number.isFinite(x) ? x : null;
}

function fmtNumberFr(n: number, maxFrac = 3): string {
  return n
    .toLocaleString("fr-FR", { maximumFractionDigits: maxFrac })
    .replace(/[\u00A0\u202F]/g, " ");
}

function fmtMoney(n: number | string | null | undefined): string {
  const x = parseNumericLoose(n);
  if (x == null) return EMPTY_VALUE_LABEL_FR;
  return `${fmtNumberFr(x, 3)} TND`;
}

function fmtTaux(n: number | string | null | undefined): string {
  const raw = parseNumericLoose(n);
  if (raw == null) return EMPTY_VALUE_LABEL_FR;
  const x = raw > 0 && raw <= 1 ? raw * 100 : raw;
  return `${fmtNumberFr(x, 4)} %`;
}

function appr(a: StatutApprobation): string {
  switch (a) {
    case StatutApprobation.APPROUVE:
      return "Approuvé";
    case StatutApprobation.NEANT:
      return "Pas encore";
    case StatutApprobation.EN_ATTENTE:
      return "En attente";
    case StatutApprobation.REJETE:
      return "Rejeté";
    case StatutApprobation.ABANDONNE:
      return "Abandonné";
    default:
      return "Pas encore";
  }
}

function contratLabel(c: TypeContrat | null | undefined): string {
  if (c === TypeContrat.PROGRAMME_PROSOL) return "Programme Prosol";
  if (c === TypeContrat.HORS_PROGRAMME_PROSOL) return "Hors Programme Prosol";
  return EMPTY_VALUE_LABEL_FR;
}

function typeCompteurLabel(t: TypeCompteur | null | undefined): string {
  if (t === TypeCompteur.TRIPHASE) return "Triphasé";
  if (t === TypeCompteur.MONOPHASE) return "Monophasé";
  return EMPTY_VALUE_LABEL_FR;
}

function typeProjetLabel(t: string | null | undefined): string {
  if (t === "PHOTOVOLTAIQUE_CLASSIQUE") return "Couplé au réseau";
  if (t === "POMPAGE") return "Pompage";
  if (t === "ISOLE_AVEC_BATTERIES") return "Isolé avec batteries";
  if (t === "AUTRE") return "Autre";
  return "Couplé au réseau";
}

function splitPresente(s: string | null | undefined): [string, string] {
  if (!s?.trim()) return [EMPTY_VALUE_LABEL_FR, EMPTY_VALUE_LABEL_FR];
  const i = s.indexOf(" / ");
  if (i >= 0) {
    const a = s.slice(0, i).trim();
    const b = s.slice(i + 3).trim();
    return [a || EMPTY_VALUE_LABEL_FR, b || EMPTY_VALUE_LABEL_FR];
  }
  return [s.trim(), EMPTY_VALUE_LABEL_FR];
}

const cell = (p: ProjetPdfModel): Record<string, string> => ({
  reference: dash(p.reference),
  abonnes: dash(p.abonnes),
  email: dash(p.email),
  cin: dash(p.cin),
  contact: dash(p.contact),
  coordonneesGps: dash(p.coordonneesGps),
  adresseLieuImplantation: dash(p.adresseLieuImplantation),
  presenteParMF: dash(p.presenteParMF),
  presentePar: splitPresente(p.presenteParMF)[0],
  mf: splitPresente(p.presenteParMF)[1],
  district: dash(p.district),
  gouvernorat: dash(p.gouvernorat),
  delegation: dash(p.delegation),
  municipalite: dash(p.municipalite),
  etatDossier: etatDossierToFrenchLabel(p.etatDossier),
  classementDossier:
    p.classementDossier === ClassementDossier.ARCHIVE
      ? "Archivé"
      : "Non archivé",
  approbationCommerciale: appr(p.approbationCommerciale),
  approbationTechnique: appr(p.approbationTechnique),
  executionInstallation: dash(p.executionInstallation),
  reception: dash(p.reception),
  procesVerbal: dash(p.procesVerbal),
  typeProjet: typeProjetLabel(p.typeProjet),
  contratAchat: contratLabel(p.contratAchat),
  montantFinancement: fmtMoney(p.montantFinancement ?? null),
  tauxInteret: fmtTaux(p.tauxInteret ?? null),
  banque: dash(p.banque),
  agentCommercial: p.agentCommercial
    ? formatCommercialExcelCell(p.agentCommercial)
    : p.agentCommercialAutre
      ? String(p.agentCommercialAutre).trim().toUpperCase() === "AUTRE"
        ? "Autre"
        : String(p.agentCommercialAutre)
      : EMPTY_VALUE_LABEL_FR,
  puissanceInstallee:
    p.puissanceInstallee != null ? String(p.puissanceInstallee) : EMPTY_VALUE_LABEL_FR,
  typeCompteur: typeCompteurLabel(p.typeCompteur),
  numeroCompteur: dash(p.numeroCompteur),
  calibreDisjoncteur: dash(p.calibreDisjoncteur),
  puissanceSouscrite: dash(p.puissanceSouscrite),
  productionPrevisionnelle: dash(p.productionPrevisionnelle),
  consommationAnnuelle: dash(p.consommationAnnuelle),
  nbModules: dash(p.nbModules),
  puUnitairePV: p.puUnitairePV != null ? String(p.puUnitairePV) : EMPTY_VALUE_LABEL_FR,
  marquePV: dash(p.marquePV),
  modelePV: dash(p.modelePV),
  nbOnduleurs: dash(p.nbOnduleurs),
  puUnitaireOnd: p.puUnitaireOnd != null ? String(p.puUnitaireOnd) : EMPTY_VALUE_LABEL_FR,
  puOndSiAutreW: p.puOndSiAutreW != null ? String(p.puOndSiAutreW) : EMPTY_VALUE_LABEL_FR,
  marqueOnd: dash(p.marqueOnd),
  modeleOnd: dash(p.modeleOnd),
  autreModeleOnd: dash(p.autreModeleOnd),
  equipementSurMesure: dash(p.equipementSurMesure),
  interventionSurMesure: dash(p.interventionSurMesure),
  rapportPuissance: dash(p.rapportPuissance),
  dateDepotDossier: fmtDateFr(p.dateDepotDossier),
  dateApprobation: fmtDateFr(p.dateApprobation),
  dateInstallation: fmtDateFr(p.dateInstallation),
  dateDepotDemandeMES: fmtDateFr(p.dateDepotDemandeMES),
  dateMES: fmtDateFr(p.dateMES),
  nPolice: dash(p.nPolice),
  nLotDebProsol: dash(p.nLotDebProsol),
  saisieProsol: dash(p.saisieProsol),
  nLotDeblocageSubvention: dash(p.nLotDeblocageSubvention),
  deblocageProsol: dash(p.deblocageProsol),
  conditionSubvention: dash(p.conditionSubvention),
  saisieSubvention: dash(p.saisieSubvention),
  deblocageSubvention: dash(p.deblocageSubvention),
  nDevis: dash(p.nDevis),
  dateDevis: fmtDateFr(p.dateDevis),
  nFacture: dash(p.nFacture),
  dateFacture: fmtDateFr(p.dateFacture),
  montantHT: fmtMoney(p.montantHT ?? null),
  tva: fmtMoney(p.tva ?? null),
  montantTTC: fmtMoney(p.montantTTC ?? null),
  montantTTCFinal: fmtMoney(p.montantTTCFinal ?? null),
  montantAutofinancement: fmtMoney(p.montantAutofinancement ?? null),
  fraisPoseCmptProsol: fmtMoney(p.fraisPoseCmptProsol ?? null),
  paiement1erFactureSTEG: fmtMoney(p.paiement1erFactureSTEG ?? null),
  paiement2emeFactureSTEG: fmtMoney(p.paiement2emeFactureSTEG ?? null),
  fraisAugmentationCalibre: fmtMoney(p.fraisAugmentationCalibre ?? null),
  fraisMutationElec: fmtMoney(p.fraisMutationElec ?? null),
  fraisMutationGaz: fmtMoney(p.fraisMutationGaz ?? null),
  fraisPassageMonoTri: fmtMoney(p.fraisPassageMonoTri ?? null),
  autresFrais: fmtMoney(p.autresFrais ?? null),
  reglementClient: fmtMoney(p.reglementClient ?? null),
  resteAPayer: fmtMoney(p.resteAPayer ?? null),
  subventionDemandee: fmtMoney(p.subventionDemandee ?? null),
  commentaire: (() => {
    const c = p.commentaire?.trim();
    if (!c) return EMPTY_VALUE_LABEL_FR;
    if (c.length <= 120) return c;
    return `${c.slice(0, 117)}…`;
  })(),
  echeances: (() => {
    const e = p.echeances ?? [];
    if (e.length === 0) return EMPTY_VALUE_LABEL_FR;
    const head = e
      .slice(0, 4)
      .map(
        (x) =>
          `#${x.numero} ${x.montant != null ? String(x.montant) : EMPTY_VALUE_LABEL_FR} ${fmtDateFr(x.date)}`
      )
      .join(" · ");
    return e.length > 4 ? `${head} (+${e.length - 4})` : head;
  })(),
});

/** Métadonnées pour l’UI (ordre d’affichage des groupes / colonnes). */
export const PDF_LIST_COLUMN_META: readonly PdfListColumnMeta[] = [
  { key: "reference", label: "Référence", group: "Identification" },
  { key: "abonnes", label: "Client", group: "Identification" },
  { key: "email", label: "Adresse e-mail", group: "Identification" },
  { key: "cin", label: "N° CIN", group: "Identification" },
  { key: "contact", label: "Contact", group: "Identification" },
  { key: "coordonneesGps", label: "Coordonnées GPS", group: "Identification" },
  {
    key: "adresseLieuImplantation",
    label: "Adresse / lieu d’implantation",
    group: "Identification",
  },
  { key: "presenteParMF", label: "Présenté par / MF", group: "Identification" },
  { key: "presentePar", label: "Présenté par", group: "Identification" },
  { key: "mf", label: "MF", group: "Identification" },
  { key: "district", label: "District", group: "Localisation" },
  { key: "gouvernorat", label: "Gouvernorat", group: "Localisation" },
  { key: "delegation", label: "Délégation", group: "Localisation" },
  { key: "municipalite", label: "Municipalité", group: "Localisation" },
  { key: "etatDossier", label: "État dossier", group: "Dossier" },
  { key: "classementDossier", label: "Classement", group: "Dossier" },
  {
    key: "approbationCommerciale",
    label: "Approbation commerciale",
    group: "Dossier",
  },
  {
    key: "approbationTechnique",
    label: "Approbation technique",
    group: "Dossier",
  },
  {
    key: "executionInstallation",
    label: "Exécution installation",
    group: "Dossier",
  },
  { key: "reception", label: "Réception", group: "Dossier" },
  { key: "procesVerbal", label: "Procès-verbal", group: "Dossier" },
  { key: "typeProjet", label: "Type de projet", group: "Dossier" },
  { key: "contratAchat", label: "Contrat d’achat", group: "Commercial" },
  {
    key: "montantFinancement",
    label: "Montant financement (TND)",
    group: "Commercial",
  },
  { key: "tauxInteret", label: "Taux d’intérêt", group: "Commercial" },
  { key: "banque", label: "Banque", group: "Commercial" },
  { key: "agentCommercial", label: "Agent commercial", group: "Commercial" },
  { key: "nDevis", label: "N° devis", group: "Commercial" },
  { key: "dateDevis", label: "Date devis", group: "Commercial" },
  { key: "nFacture", label: "N° facture", group: "Commercial" },
  { key: "dateFacture", label: "Date facture", group: "Commercial" },
  {
    key: "puissanceInstallee",
    label: "Puissance installée (kW)",
    group: "Installation",
  },
  { key: "typeCompteur", label: "Type compteur", group: "Installation" },
  { key: "numeroCompteur", label: "N° de compteur", group: "Installation" },
  {
    key: "calibreDisjoncteur",
    label: "Calibre disjoncteur de branchement",
    group: "Installation",
  },
  {
    key: "puissanceSouscrite",
    label: "Puissance souscrite / pompe",
    group: "Installation",
  },
  {
    key: "productionPrevisionnelle",
    label: "Production prévisionnelle",
    group: "Installation",
  },
  {
    key: "consommationAnnuelle",
    label: "Consommation annuelle (kWh)",
    group: "Installation",
  },
  { key: "nbModules", label: "Nb modules", group: "Installation" },
  {
    key: "puUnitairePV",
    label: "Puissance unité PV (W)",
    group: "Installation",
  },
  { key: "marquePV", label: "Marque PV", group: "Installation" },
  { key: "modelePV", label: "Modèle PV", group: "Installation" },
  { key: "nbOnduleurs", label: "Nb onduleurs", group: "Installation" },
  {
    key: "puUnitaireOnd",
    label: "Puissance unité onduleur (W)",
    group: "Installation",
  },
  {
    key: "puOndSiAutreW",
    label: "PU ond. autre modèle (W)",
    group: "Installation",
  },
  { key: "marqueOnd", label: "Marque onduleur", group: "Installation" },
  { key: "modeleOnd", label: "Modèle onduleur", group: "Installation" },
  {
    key: "autreModeleOnd",
    label: "Autre modèle onduleur",
    group: "Installation",
  },
  {
    key: "equipementSurMesure",
    label: "Équipement (sur mesure)",
    group: "Installation",
  },
  {
    key: "interventionSurMesure",
    label: "Intervention (sur mesure)",
    group: "Installation",
  },
  { key: "rapportPuissance", label: "Rapport puissance", group: "Installation" },
  {
    key: "dateDepotDossier",
    label: "Date dépôt dossier",
    group: "Dates & suivi",
  },
  {
    key: "dateApprobation",
    label: "Date approbation",
    group: "Dates & suivi",
  },
  {
    key: "dateInstallation",
    label: "Date installation",
    group: "Dates & suivi",
  },
  {
    key: "dateDepotDemandeMES",
    label: "Date dépôt demande MES",
    group: "Dates & suivi",
  },
  { key: "dateMES", label: "Date MES", group: "Dates & suivi" },
  { key: "nPolice", label: "N° police", group: "Dates & suivi" },
  { key: "nLotDebProsol", label: "N° lot déblocage PROSOL", group: "Prosol / subvention" },
  { key: "saisieProsol", label: "Saisie Prosol", group: "Prosol / subvention" },
  {
    key: "nLotDeblocageSubvention",
    label: "N° lot subvention",
    group: "Prosol / subvention",
  },
  {
    key: "deblocageProsol",
    label: "Déblocage Prosol",
    group: "Prosol / subvention",
  },
  {
    key: "conditionSubvention",
    label: "Condition subvention",
    group: "Prosol / subvention",
  },
  {
    key: "saisieSubvention",
    label: "Saisie subvention",
    group: "Prosol / subvention",
  },
  {
    key: "deblocageSubvention",
    label: "Déblocage subvention",
    group: "Prosol / subvention",
  },
  { key: "montantTTC", label: "Montant devis", group: "Facturation & frais" },
  {
    key: "montantTTCFinal",
    label: "Montant facture",
    group: "Facturation & frais",
  },
  {
    key: "montantAutofinancement",
    label: "Montant autofinancement",
    group: "Facturation & frais",
  },
  {
    key: "fraisPoseCmptProsol",
    label: "Frais pose cmpt Prosol",
    group: "Facturation & frais",
  },
  {
    key: "paiement1erFactureSTEG",
    label: "Paiement facture STEG",
    group: "Facturation & frais",
  },
  {
    key: "paiement2emeFactureSTEG",
    label: "Frais bureau de contrôle",
    group: "Facturation & frais",
  },
  {
    key: "fraisAugmentationCalibre",
    label: "Frais augmentation calibre",
    group: "Facturation & frais",
  },
  {
    key: "fraisMutationElec",
    label: "Frais mutation élec.",
    group: "Facturation & frais",
  },
  {
    key: "fraisMutationGaz",
    label: "Frais mutation gaz",
    group: "Facturation & frais",
  },
  {
    key: "fraisPassageMonoTri",
    label: "Frais passage mono → tri",
    group: "Facturation & frais",
  },
  { key: "autresFrais", label: "Autres frais", group: "Facturation & frais" },
  {
    key: "reglementClient",
    label: "Règlement client",
    group: "Facturation & frais",
  },
  { key: "resteAPayer", label: "Reste à payer", group: "Facturation & frais" },
  {
    key: "subventionDemandee",
    label: "Subvention demandée",
    group: "Facturation & frais",
  },
  { key: "commentaire", label: "Commentaire", group: "Autre" },
  { key: "echeances", label: "Échéances (résumé)", group: "Autre" },
];

const ALLOWED_KEYS = new Set(PDF_LIST_COLUMN_META.map((c) => c.key));

const LABEL_BY_KEY = new Map(
  PDF_LIST_COLUMN_META.map((c) => [c.key, c.label] as const)
);

/** Colonnes par défaut (aligné « projets-export-custom » : 6 colonnes). */
export const DEFAULT_PDF_LIST_COLUMN_KEYS: readonly string[] = [
  "reference",
  "typeProjet",
  "abonnes",
  "etatDossier",
  "montantTTCFinal",
  "resteAPayer",
];

export function pdfListCellValue(key: string, p: ProjetPdfModel): string {
  const row = cell(p);
  return row[key] ?? EMPTY_VALUE_LABEL_FR;
}

export function labelsForPdfListKeys(keys: string[]): string[] {
  return keys.map((k) => LABEL_BY_KEY.get(k) ?? k);
}

/** En-têtes de colonnes raccourcis pour le rapport « clients » (aligné export custom). */
const RAPPORT_CLIENTS_HEAD: Partial<Record<string, string>> = {
  reference: "Référence",
  abonnes: "Client",
  typeProjet: "Type projet",
  etatDossier: "État",
  montantTTCFinal: "Montant facture",
  resteAPayer: "Reste à payer",
  contratAchat: "Contrat",
  montantFinancement: "Montant TND",
  tauxInteret: "Taux",
  banque: "Banque",
  dateDepotDossier: "Dépôt",
};

export function labelsForRapportClientsPdf(keys: string[]): string[] {
  return keys.map((k) => RAPPORT_CLIENTS_HEAD[k] ?? LABEL_BY_KEY.get(k) ?? k);
}

export function parsePdfColumnKeysParam(raw: unknown): string[] | undefined {
  if (raw == null || raw === "") return undefined;
  const s = Array.isArray(raw) ? raw.join(",") : String(raw);
  const parts = s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  return parts.length ? parts : undefined;
}

/** Corps JSON (POST) : `columns` en tableau ou chaîne séparée par des virgules. */
export function parsePdfColumnsFromBody(columns: unknown): string[] | undefined {
  if (columns == null) return undefined;
  if (Array.isArray(columns)) {
    const out = columns.map((c) => String(c).trim()).filter(Boolean);
    return out.length ? out : undefined;
  }
  return parsePdfColumnKeysParam(columns);
}

/** Filtre et déduplique ; retourne les clés valides uniquement. */
export function normalizePdfColumnKeys(requested: string[] | undefined): string[] {
  if (!requested?.length) return [...DEFAULT_PDF_LIST_COLUMN_KEYS];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const k of requested) {
    if (!ALLOWED_KEYS.has(k) || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out.length ? out : [...DEFAULT_PDF_LIST_COLUMN_KEYS];
}
