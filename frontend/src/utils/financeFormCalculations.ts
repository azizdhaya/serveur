import { EMPTY_VALUE_LABEL } from "@/utils/constants";
import { formatDecimalExcel3, formatTnd } from "@/utils/formatters";

/** Parse une saisie montant TND (virgule, espaces). */
export function parseMoneyInput(raw: string | null | undefined): number | null {
  const s = String(raw ?? "").trim();
  if (!s || s === "—" || s === "-" || s === EMPTY_VALUE_LABEL) return null;
  const cleaned = s
    .replace(/[ \u00A0\u202F]/g, "")
    .replace(/tnd/gi, "")
    .replace(/(?<=\d)\/(?=\d)/g, ".")
    .replace(",", ".");
  const x = parseFloat(cleaned);
  return Number.isFinite(x) ? x : null;
}

/** Somme des montants des lignes d’échéances (lignes vides ignorées). */
export function sumEcheancesMontants(
  rows:
    | readonly { montant?: string | number | null }[]
    | null
    | undefined
): number {
  let s = 0;
  for (const row of rows ?? []) {
    const raw = row?.montant;
    const m = parseMoneyInput(
      raw != null && raw !== "" ? String(raw) : ""
    );
    if (m != null) s += m;
  }
  return s;
}

/**
 * Reste (Excel) = Règlement client − Σ(Montant Échéance 1…N).
 * Les lignes du tableau « Échéances » correspondent aux colonnes Montant Échéance 1, 2, …
 * Peut être négatif si la somme des échéances dépasse le règlement saisi.
 * Chaîne vide si ni règlement ni montant d’échéance n’est renseigné.
 */
export function computeResteAPayerDisplay(
  reglementClient: string,
  totalEcheancesTnd: number = 0
): string {
  const regParsed = parseMoneyInput(reglementClient);
  const ech = Number.isFinite(totalEcheancesTnd)
    ? totalEcheancesTnd
    : 0;
  if (regParsed == null && ech === 0) return "";
  const reg = regParsed ?? 0;
  const reste = reg - ech;
  return formatDecimalExcel3(reste);
}

/**
 * Texte pour la fiche projet : reste = Règlement − Σ échéances (priorité),
 * sinon valeur `resteAPayer` stockée (anciens enregistrements).
 */
export function ligneResteAPayerDepuisProjet(p: {
  reglementClient: string | null;
  echeances: readonly { montant?: string | number | null }[] | null | undefined;
  resteAPayer: string | null;
}): string {
  const totalEch = sumEcheancesMontants(p.echeances);
  const calc = computeResteAPayerDisplay(
    String(p.reglementClient ?? ""),
    totalEch
  );
  if (calc.trim() !== "") return `${calc} TND`;
  const r = formatTnd(p.resteAPayer);
  return r === EMPTY_VALUE_LABEL ? r : `${r} TND`;
}

/** Somme HT + TVA (contrôle d’affichage, pas imposée au champ Montant TTC). */
export function computeSommeHtTvaDisplay(
  montantHT: string,
  tva: string
): string | null {
  const ht = parseMoneyInput(montantHT);
  const tv = parseMoneyInput(tva);
  if (ht == null && tv == null) return null;
  return formatDecimalExcel3((ht ?? 0) + (tv ?? 0));
}

/** Montant autofinancement = Montant facture - Montant financement TND. */
export function computeMontantAutofinancementDisplay(
  montantFacture: string,
  montantFinancement: string
): string {
  const facture = parseMoneyInput(montantFacture) ?? 0;
  const financement = parseMoneyInput(montantFinancement) ?? 0;
  return formatDecimalExcel3(facture - financement);
}

/**
 * Règlement client = Autofinancement + Frais pose compteur Prosol
 * + Paiement STEG 1 + Paiement STEG 2
 * + Frais bureau de contrôle + Frais mutation élec + Frais mutation gaz
 * + Frais passage mono->tri + Autres frais.
 */
export function computeReglementClientDisplay(parts: {
  montantAutofinancement: string;
  fraisPoseCmptProsol: string;
  paiement1erFactureSTEG: string;
  paiement2emeFactureSTEG: string;
  fraisAugmentationCalibre: string;
  fraisMutationElec: string;
  fraisMutationGaz: string;
  fraisPassageMonoTri: string;
  autresFrais: string;
}): string {
  const total =
    (parseMoneyInput(parts.montantAutofinancement) ?? 0) +
    (parseMoneyInput(parts.fraisPoseCmptProsol) ?? 0) +
    (parseMoneyInput(parts.paiement1erFactureSTEG) ?? 0) +
    (parseMoneyInput(parts.paiement2emeFactureSTEG) ?? 0) +
    (parseMoneyInput(parts.fraisAugmentationCalibre) ?? 0) +
    (parseMoneyInput(parts.fraisMutationElec) ?? 0) +
    (parseMoneyInput(parts.fraisMutationGaz) ?? 0) +
    (parseMoneyInput(parts.fraisPassageMonoTri) ?? 0) +
    (parseMoneyInput(parts.autresFrais) ?? 0);
  return formatDecimalExcel3(total);
}
