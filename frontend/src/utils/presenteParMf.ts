import { EMPTY_VALUE_LABEL } from "@/utils/constants";

/**
 * Même convention que l’import Excel : colonnes « Présenté par » et « MF »
 * stockées concaténées avec « / » espacés.
 */
export function splitPresenteParMf(
  raw: string | null | undefined
): { presentePar: string; mf: string } {
  if (!raw?.trim()) return { presentePar: "", mf: "" };
  const i = raw.indexOf(" / ");
  if (i >= 0) {
    return {
      presentePar: raw.slice(0, i).trim(),
      mf: raw.slice(i + 3).trim(),
    };
  }
  return { presentePar: raw.trim(), mf: "" };
}

export function joinPresenteParMf(
  presentePar: string,
  mf: string
): string | null {
  const a = presentePar.trim();
  const b = mf.trim();
  if (!a && !b) return null;
  if (!a) return b || null;
  if (!b) return a;
  return `${a} / ${b}`;
}

/** Affichage fiche : libellé unique si vide. */
export function splitPresenteParMfDisplay(
  raw: string | null | undefined
): [string, string] {
  const { presentePar, mf } = splitPresenteParMf(raw);
  const d = (s: string) => (s ? s : EMPTY_VALUE_LABEL);
  return [d(presentePar), d(mf)];
}
