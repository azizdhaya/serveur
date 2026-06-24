import { BANQUES, DISTRICTS, MONTANTS_FINANCEMENT_TND } from "@/utils/constants";

export type CatalogListsState = {
  extraBanques: string[];
  extraDistricts: string[];
  extraMontantsTnd: number[];
};

const STORAGE_KEY = "pv-dashboard:catalog-lists-v1";

const DEFAULT_STATE: CatalogListsState = {
  extraBanques: [],
  extraDistricts: [],
  extraMontantsTnd: [],
};

const listeners = new Set<() => void>();

export function subscribeCatalogLists(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function emit(): void {
  for (const l of listeners) l();
}

export function parseCatalogListsState(raw: string | null): CatalogListsState {
  if (!raw) return { ...DEFAULT_STATE };
  try {
    const j = JSON.parse(raw) as Record<string, unknown>;
    const extraBanques = Array.isArray(j.extraBanques)
      ? (j.extraBanques as unknown[])
          .map((x) => String(x).trim())
          .filter(Boolean)
      : [];
    const extraMontantsTnd = Array.isArray(j.extraMontantsTnd)
      ? (j.extraMontantsTnd as unknown[])
          .map((x) =>
            typeof x === "number"
              ? x
              : parseFloat(String(x).replace(/\s/g, "").replace(",", "."))
          )
          .filter((n) => Number.isFinite(n))
      : [];
    const extraDistricts = Array.isArray(j.extraDistricts)
      ? (j.extraDistricts as unknown[])
          .map((x) => String(x).trim())
          .filter(Boolean)
      : [];
    return { extraBanques, extraDistricts, extraMontantsTnd };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function getCatalogListsState(): CatalogListsState {
  if (typeof localStorage === "undefined") return { ...DEFAULT_STATE };
  return parseCatalogListsState(localStorage.getItem(STORAGE_KEY));
}

export function updateCatalogListsState(
  updater: (prev: CatalogListsState) => CatalogListsState
): void {
  if (typeof localStorage === "undefined") return;
  const next = updater(getCatalogListsState());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

export function resetCatalogListsState(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  emit();
}

/** Banques d’origine + entrées ajoutées (sans doublon, libellés normalisés en trim). */
export function mergeBanqueOptions(state: CatalogListsState): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const b of [...BANQUES, ...state.extraBanques]) {
    const k = b.trim();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out;
}

/** Districts d’origine + entrées ajoutées (sans doublon, libellés normalisés en trim). */
export function mergeDistrictOptions(state: CatalogListsState): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const d of [...DISTRICTS, ...state.extraDistricts]) {
    const k = d.trim();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out;
}

/** Montants Excel + montants ajoutés, triés. */
export function mergeMontantFinancementOptions(
  state: CatalogListsState
): number[] {
  const nums = new Set<number>();
  for (const n of MONTANTS_FINANCEMENT_TND) nums.add(Number(n));
  for (const n of state.extraMontantsTnd) nums.add(Number(n));
  return [...nums].sort((a, b) => a - b);
}
