import { useEffect, useMemo, useState } from "react";
import {
  getCatalogListsState,
  mergeBanqueOptions,
  mergeDistrictOptions,
  mergeMontantFinancementOptions,
  subscribeCatalogLists,
  updateCatalogListsState,
} from "@/utils/catalogListsStorage";

/**
 * Listes banques / montants TND : valeurs par défaut (`constants.ts`) + extras
 * persistés (localStorage), partagés entre formulaire projet et filtres.
 */
export function useCatalogLists() {
  const [tick, setTick] = useState(0);
  useEffect(() => subscribeCatalogLists(() => setTick((t) => t + 1)), []);

  return useMemo(() => {
    void tick;
    const state = getCatalogListsState();
    const banqueOptions = mergeBanqueOptions(state);
    const districtOptions = mergeDistrictOptions(state);
    const montantFinancementOptions = mergeMontantFinancementOptions(state);

    const addBanque = (name: string) => {
      const t = name.trim();
      if (!t) return;
      updateCatalogListsState((prev) =>
        mergeBanqueOptions(prev).some((x) => x === t)
          ? prev
          : { ...prev, extraBanques: [...prev.extraBanques, t] }
      );
    };

    const removeExtraBanque = (name: string) => {
      updateCatalogListsState((prev) => ({
        ...prev,
        extraBanques: prev.extraBanques.filter((x) => x !== name),
      }));
    };

    const addDistrict = (name: string) => {
      const t = name.trim();
      if (!t) return;
      updateCatalogListsState((prev) =>
        mergeDistrictOptions(prev).some((x) => x === t)
          ? prev
          : { ...prev, extraDistricts: [...prev.extraDistricts, t] }
      );
    };

    const removeExtraDistrict = (name: string) => {
      updateCatalogListsState((prev) => ({
        ...prev,
        extraDistricts: prev.extraDistricts.filter((x) => x !== name),
      }));
    };

    const addMontantTnd = (raw: string) => {
      const x = parseFloat(
        String(raw).trim().replace(/\s/g, "").replace(",", ".")
      );
      if (!Number.isFinite(x)) return;
      updateCatalogListsState((prev) => {
        if (mergeMontantFinancementOptions(prev).some((m) => m === x)) return prev;
        return { ...prev, extraMontantsTnd: [...prev.extraMontantsTnd, x] };
      });
    };

    const removeExtraMontantTnd = (n: number) => {
      updateCatalogListsState((prev) => ({
        ...prev,
        extraMontantsTnd: prev.extraMontantsTnd.filter((x) => x !== n),
      }));
    };

    return {
      state,
      banqueOptions,
      districtOptions,
      montantFinancementOptions,
      addBanque,
      removeExtraBanque,
      addDistrict,
      removeExtraDistrict,
      addMontantTnd,
      removeExtraMontantTnd,
    };
  }, [tick]);
}
