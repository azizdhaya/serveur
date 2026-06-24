/** Colonne Excel Excution_Installation (sans valeur liste « Néant »). */
const LABELS = ["Exécutée", "Pas encore"] as const;

function normKey(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Valeur stockée = libellé Excel exact, ou null si vide / hors liste. */
export function canonicalExecutionInstallation(
  raw: string | null | undefined
): string | null {
  if (raw == null) return null;
  const t = String(raw).trim();
  if (!t) return null;
  const k = normKey(t);
  if (k === "neant" || k === "nant") return null;
  for (const opt of LABELS) {
    if (normKey(opt) === k) return opt;
  }
  return null;
}
