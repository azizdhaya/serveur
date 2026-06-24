import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import type { EtatDossier } from "@/types/projet.types";
import {
  EMPTY_VALUE_LABEL,
  OPTIONS_ETAT_DOSSIER,
  OPTIONS_EXECUTION_INSTALLATION,
  OPTIONS_MODE_PAIEMENT,
  OPTIONS_PROCES_VERBAL,
  OPTIONS_RECEPTION,
  OPTIONS_SAISIE_PROSOL,
  OPTIONS_SAISIE_SUBVENTION,
  OPTIONS_DEBLOCAGE_PROSOL,
  OPTIONS_DEBLOCAGE_SUBVENTION,
} from "@/utils/constants";

function normExecutionKey(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalExcelListe(
  raw: string | null | undefined,
  labels: readonly string[]
): string {
  const t = String(raw ?? "").trim();
  if (!t) return "";
  const k = normExecutionKey(t);
  for (const opt of labels) {
    if (normExecutionKey(opt) === k) return opt;
  }
  return "";
}

/** Liste Excel Excution_Installation : insensible à la casse et aux accents. */
export function canonicalExecutionInstallation(
  raw: string | null | undefined
): string {
  return canonicalExcelListe(raw, OPTIONS_EXECUTION_INSTALLATION);
}

/** Liste Excel Procès_Verbal : insensible à la casse et aux accents. */
export function canonicalProcesVerbal(
  raw: string | null | undefined
): string {
  return canonicalExcelListe(raw, OPTIONS_PROCES_VERBAL);
}

/** Liste Excel Réception : insensible à la casse et aux accents. */
export function canonicalReception(
  raw: string | null | undefined
): string {
  return canonicalExcelListe(raw, OPTIONS_RECEPTION);
}

/** Liste Excel mode_paiement + fautes Avoire / Espéce. */
export function canonicalModePaiement(
  raw: string | null | undefined
): string {
  const t = String(raw ?? "").trim();
  if (!t || t === "-" || t === "—" || t === EMPTY_VALUE_LABEL) return "";
  const k = normExecutionKey(t);
  if (k === "avoire" || k === "avoir") return "Avoir";
  if (k === "espece" || k === "espéce") return "Espèce";
  if (k.includes("frais") && k.includes("charge") && k.includes("entreprise")) {
    return "Frais à la charge de l'entreprise";
  }
  return canonicalExcelListe(raw, OPTIONS_MODE_PAIEMENT);
}

/** Liste Excel Saisie_Prosol : insensible à la casse et aux accents. */
export function canonicalSaisieProsol(
  raw: string | null | undefined
): string {
  return canonicalExcelListe(raw, OPTIONS_SAISIE_PROSOL);
}

/** Liste Excel Saisie_Subvention : insensible à la casse et aux accents. */
export function canonicalSaisieSubvention(
  raw: string | null | undefined
): string {
  return canonicalExcelListe(raw, OPTIONS_SAISIE_SUBVENTION);
}

/** Liste Excel Déblocage_Prosol : insensible à la casse et aux accents. */
export function canonicalDeblocageProsol(
  raw: string | null | undefined
): string {
  return canonicalExcelListe(raw, OPTIONS_DEBLOCAGE_PROSOL);
}

/** Liste Excel Déblocage_Subvention : insensible à la casse et aux accents. */
export function canonicalDeblocageSubvention(
  raw: string | null | undefined
): string {
  return canonicalExcelListe(raw, OPTIONS_DEBLOCAGE_SUBVENTION);
}

/** Libellé français pour l’état du dossier (API / Prisma). */
/** Affichage type colonne Excel : « MR NOM PRÉNOM » (prénom « - » ignoré). */
export function formatCommercialDisplayName(c: {
  prenom: string;
  nom: string;
}): string {
  const n = c.nom.trim();
  const p = c.prenom.trim();
  const parts = [n, p].filter((x) => x && x !== "-");
  return `MR ${parts.join(" ")}`.trim().toUpperCase();
}

export function formatAgentCommercialDisplay(p: {
  agentCommercial?: { prenom: string; nom: string } | null;
  agentCommercialAutre?: string | null;
}): string {
  if (p.agentCommercial) return formatCommercialDisplayName(p.agentCommercial);
  const autre = String(p.agentCommercialAutre ?? "").trim();
  if (!autre) return EMPTY_VALUE_LABEL;
  if (autre.toUpperCase() === "AUTRE") return "Autre";
  return autre;
}

export function formatEtatDossier(
  v: EtatDossier | string | null | undefined
): string {
  if (v == null || v === "") return "Tous";
  const o = OPTIONS_ETAT_DOSSIER.find((x) => x.v === v);
  return o?.l ?? String(v);
}

export function formatDateFr(iso: string | null | undefined): string {
  if (!iso) return EMPTY_VALUE_LABEL;
  try {
    return format(parseISO(iso), "dd/MM/yyyy", { locale: fr });
  } catch {
    return EMPTY_VALUE_LABEL;
  }
}

export function formatTnd(n: number | string | null | undefined): string {
  if (n == null || n === "") return EMPTY_VALUE_LABEL;
  const x =
    typeof n === "string"
      ? (() => {
          const cleaned = n
            .trim()
            .replace(/[ \u00A0\u202F]/g, "")
            .replace(/tnd/gi, "")
            .replace(/(?<=\d)\/(?=\d)/g, ".")
            .replace(",", ".");
          return parseFloat(cleaned);
        })()
      : n;
  if (Number.isNaN(x)) return EMPTY_VALUE_LABEL;
  return new Intl.NumberFormat("fr-TN", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(x);
}

/** Affichage taux d’intérêt en % (base données : pourcentage ou fraction 0–1). */
export function formatTauxPercent(n: number | string | null | undefined): string {
  if (n == null || n === "") return EMPTY_VALUE_LABEL;
  const raw = typeof n === "string" ? n.trim().replace(/\s/g, "").replace(",", ".") : n;
  const x = typeof raw === "number" ? raw : parseFloat(String(raw));
  if (!Number.isFinite(x)) return EMPTY_VALUE_LABEL;
  const pct = x > 0 && x <= 1 ? x * 100 : x;
  return `${new Intl.NumberFormat("fr-TN", { maximumFractionDigits: 4 }).format(pct)} %`;
}

/** Décimaux type colonne Excel (ex. 0,000 / 59,500 / 107,100). */
export function formatDecimalExcel3(
  n: number | string | null | undefined
): string {
  if (n == null || n === "") return "";
  const raw = typeof n === "string" ? n.trim().replace(/\s/g, "") : n;
  const x =
    typeof raw === "number"
      ? raw
      : parseFloat(String(raw).replace(",", "."));
  if (!Number.isFinite(x)) return typeof n === "string" ? n : "";
  return new Intl.NumberFormat("fr-TN", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(x);
}

export function formatKw(n: number): string {
  return `${new Intl.NumberFormat("fr-TN", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(n)} kW`;
}

/** Libellé métier pour l’enum API (MONOPHASE / TRIPHASE). */
export function formatTypeCompteur(
  v: "MONOPHASE" | "TRIPHASE" | string | null | undefined
): string {
  if (v == null || v === "") return EMPTY_VALUE_LABEL;
  if (v === "MONOPHASE") return "Monophasé";
  if (v === "TRIPHASE") return "Triphasé";
  return String(v);
}

/** Libellés alignés sur la colonne Excel Contrat_Achat. */
export function formatContratAchat(
  v: "PROGRAMME_PROSOL" | "HORS_PROGRAMME_PROSOL" | string | null | undefined
): string {
  if (v == null || v === "") return EMPTY_VALUE_LABEL;
  if (v === "PROGRAMME_PROSOL") return "Programme Prosol";
  if (v === "HORS_PROGRAMME_PROSOL") return "Hors Programme Prosol";
  return String(v);
}

/**
 * Évite les coupures de ligne entre le dernier mot et « : » (espace fine insécable U+202F).
 * À utiliser pour les libellés du type « Calibre disjoncteur : », « Contrôle : », etc.
 */
export function libelleAvecColonInsecable(key: string): string {
  return key.replace(/\s*:\s*$/, "\u202f:");
}
