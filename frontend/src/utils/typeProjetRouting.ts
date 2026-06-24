import type { TypeProjet } from "@/types/projet.types";

export const TYPE_PROJET_ROUTE_OPTIONS = [
  { key: "couple-reseau", type: "PHOTOVOLTAIQUE_CLASSIQUE" as TypeProjet, label: "Couplé au réseau" },
  { key: "isole-batteries", type: "ISOLE_AVEC_BATTERIES" as TypeProjet, label: "Isolé avec batteries" },
  { key: "pompage", type: "POMPAGE" as TypeProjet, label: "Pompage" },
  { key: "autre", type: "AUTRE" as TypeProjet, label: "Autre" },
] as const;

export function typeProjetFromRouteKey(k?: string): TypeProjet | null {
  const hit = TYPE_PROJET_ROUTE_OPTIONS.find((x) => x.key === String(k ?? "").trim());
  return hit?.type ?? null;
}

export function routeKeyFromTypeProjet(type: TypeProjet): string {
  const hit = TYPE_PROJET_ROUTE_OPTIONS.find((x) => x.type === type);
  return hit?.key ?? "couple-reseau";
}
