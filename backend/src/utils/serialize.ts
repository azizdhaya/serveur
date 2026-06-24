function dec(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "number") return String(v);
  return String(v);
}

export function serializeProjet<T extends Record<string, unknown>>(p: T): T {
  const out = { ...p } as Record<string, unknown>;
  const numKeys = [
    "montantFinancement",
    "tauxInteret",
    "puissanceInstallee",
    "productionPrevisionnelle",
    "consommationAnnuelle",
    "puUnitairePV",
    "puUnitaireOnd",
    "puOndSiAutreW",
    "montantHT",
    "tva",
    "montantTTC",
    "montantTTCFinal",
    "montantAutofinancement",
    "fraisPoseCmptProsol",
    "paiement1erFactureSTEG",
    "paiement2emeFactureSTEG",
    "fraisAugmentationCalibre",
    "fraisMutationElec",
    "fraisMutationGaz",
    "fraisPassageMonoTri",
    "autresFrais",
    "reglementClient",
    "resteAPayer",
    "subventionDemandee",
  ];
  for (const k of numKeys) {
    if (k in out) out[k] = dec(out[k]);
  }
  if (Array.isArray(out.echeances)) {
    out.echeances = (out.echeances as Record<string, unknown>[]).map((e) => ({
      ...e,
      montant: dec(e.montant),
    }));
  }
  return out as T;
}
