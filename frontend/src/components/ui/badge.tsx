import { cn } from "@/lib/utils";
import type { EtatDossier } from "@/types/projet.types";
import { OPTIONS_ETAT_DOSSIER } from "@/utils/constants";

const map: Record<EtatDossier, string> = {
  OUVERT: "bg-blue-100 text-blue-800",
  EN_NEGOCIATION: "bg-amber-100 text-amber-800",
  FINIE: "bg-green-100 text-green-800",
  ARCHIVE: "bg-slate-200 text-slate-800",
  ABANDONNE: "bg-red-100 text-red-800",
};

const labels = Object.fromEntries(
  OPTIONS_ETAT_DOSSIER.map((o) => [o.v, o.l])
) as Record<EtatDossier, string>;

export function EtatBadge({ etat }: { etat: EtatDossier }) {
  const raw = String(etat ?? "").trim();
  const label = raw ? labels[etat] ?? raw : "Tous";
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        raw ? map[etat] ?? "bg-slate-100 text-slate-700" : "bg-slate-100 text-slate-700"
      )}
    >
      {label}
    </span>
  );
}
