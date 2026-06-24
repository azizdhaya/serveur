import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EtatBadge } from "@/components/ui/badge";
import type { Projet } from "@/types/projet.types";
import { EMPTY_VALUE_LABEL } from "@/utils/constants";
import { formatContratAchat, formatTnd } from "@/utils/formatters";
import type { Role } from "@/types/user.types";

type SortKey =
  | "reference"
  | "abonnes"
  | "etatDossier"
  | "montantTTCFinal"
  | "resteAPayer"
  | "createdAt";

function typeProjetLabel(t: Projet["typeProjet"]): string {
  if (t === "POMPAGE") return "Pompage";
  if (t === "ISOLE_AVEC_BATTERIES") return "Isolé avec batteries";
  if (t === "AUTRE") return "Autre";
  return "Couplé au réseau";
}

function formatAnme(v: string | null | undefined): string {
  if (v === "OUI") return "Oui";
  if (v === "NON") return "Non";
  return EMPTY_VALUE_LABEL;
}

export function ProjetTable({
  projets,
  role,
  selected,
  onToggle,
  onToggleAll,
  sortBy,
  order,
  onSort,
  onDelete,
}: {
  projets: Projet[];
  role: Role;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  sortBy: SortKey;
  order: "asc" | "desc";
  onSort: (k: SortKey) => void;
  onDelete: (id: string) => void;
}) {
  const canDelete = role === "SUPER_ADMIN" || role === "ADMIN";
  const canEdit = role !== "COMMERCIAL";
  const canSelect = role !== "COMMERCIAL";
  const allSel = projets.length > 0 && projets.every((p) => selected.has(p.id));

  const th = (k: SortKey, label: string) => (
    <th className="cursor-pointer px-3 py-2 hover:bg-slate-100" onClick={() => onSort(k)}>
      {label}
      {sortBy === k && (order === "asc" ? " ↑" : " ↓")}
    </th>
  );

  return (
    <>
      <div className="space-y-3 sm:hidden">
        {projets.map((p) => (
          <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link
                  className="font-medium text-[#006aa3] transition-colors hover:text-[#f18a21] hover:underline"
                  to={`/projets/${p.id}`}
                >
                  {p.reference}
                </Link>
                <p className="mt-1 text-xs text-slate-500">{typeProjetLabel(p.typeProjet)}</p>
              </div>
              {canSelect ? (
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => onToggle(p.id)}
                  aria-label={`Sélection ${p.reference}`}
                />
              ) : null}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <p>
                <span className="font-medium text-slate-700">Contrat:</span>{" "}
                {p.typeProjet === "PHOTOVOLTAIQUE_CLASSIQUE"
                  ? p.contratAchat
                    ? formatContratAchat(p.contratAchat)
                    : EMPTY_VALUE_LABEL
                  : EMPTY_VALUE_LABEL}
              </p>
              <p>
                <span className="font-medium text-slate-700">ANME:</span>{" "}
                {p.typeProjet === "PHOTOVOLTAIQUE_CLASSIQUE"
                  ? formatAnme(p.conditionSubvention)
                  : EMPTY_VALUE_LABEL}
              </p>
              <p className="col-span-2 truncate">
                <span className="font-medium text-slate-700">Client:</span> {p.abonnes}
              </p>
              <p>
                <span className="font-medium text-slate-700">Facture:</span>{" "}
                {formatTnd(p.montantTTCFinal)}
              </p>
              <p>
                <span className="font-medium text-slate-700">Reste:</span>{" "}
                {formatTnd(p.resteAPayer)}
              </p>
            </div>
            <div className="mt-2">
              <EtatBadge etat={p.etatDossier} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/projets/${p.id}`}>
                  <Eye size={16} />
                </Link>
              </Button>
              {canEdit ? (
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/projets/${p.id}/modifier`}>
                    <Pencil size={16} />
                  </Link>
                </Button>
              ) : (
                <div />
              )}
              {canDelete ? (
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() => onDelete(p.id)}
                >
                  <Trash2 size={16} />
                </Button>
              ) : (
                <div />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white sm:block">
      <table className="w-full min-w-[980px] text-left text-sm">
        <thead className="sticky top-0 bg-slate-50 text-slate-600">
          <tr>
            {canSelect && (
              <th className="w-10 px-3 py-2">
                <input
                  type="checkbox"
                  checked={allSel}
                  onChange={onToggleAll}
                  aria-label="Tout sélectionner"
                />
              </th>
            )}
            {th("reference", "Référence")}
            <th className="px-3 py-2">Type projet</th>
            <th className="px-3 py-2">Contrat d'achat</th>
            <th className="px-3 py-2">ANME</th>
            {th("abonnes", "Abonné / client")}
            {th("etatDossier", "État dossier")}
            {th("montantTTCFinal", "Montant facture")}
            {th("resteAPayer", "Reste à payer")}
            <th className="px-3 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((p, i) => (
            <tr
              key={p.id}
              className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
            >
              {canSelect && (
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={() => onToggle(p.id)}
                    aria-label={`Sélection ${p.reference}`}
                  />
                </td>
              )}
              <td className="px-3 py-2 font-medium">
                <Link
                  className="text-[#006aa3] transition-colors hover:text-[#f18a21] hover:underline"
                  to={`/projets/${p.id}`}
                >
                  {p.reference}
                </Link>
              </td>
              <td className="px-3 py-2">{typeProjetLabel(p.typeProjet)}</td>
              <td className="max-w-[11rem] truncate px-3 py-2 text-slate-700">
                {p.typeProjet === "PHOTOVOLTAIQUE_CLASSIQUE"
                  ? p.contratAchat
                    ? formatContratAchat(p.contratAchat)
                    : EMPTY_VALUE_LABEL
                  : EMPTY_VALUE_LABEL}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-slate-700">
                {p.typeProjet === "PHOTOVOLTAIQUE_CLASSIQUE"
                  ? formatAnme(p.conditionSubvention)
                  : EMPTY_VALUE_LABEL}
              </td>
              <td className="max-w-[200px] truncate px-3 py-2">{p.abonnes}</td>
              <td className="px-3 py-2">
                <EtatBadge etat={p.etatDossier} />
              </td>
              <td className="px-3 py-2">{formatTnd(p.montantTTCFinal)}</td>
              <td className="px-3 py-2">{formatTnd(p.resteAPayer)}</td>
              <td className="px-3 py-2 text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      to={`/projets/${p.id}`}
                      title={`Voir le dossier ${p.reference}`}
                      aria-label={`Voir le dossier ${p.reference}`}
                    >
                      <Eye size={18} />
                    </Link>
                  </Button>
                  {canEdit && (
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        to={`/projets/${p.id}/modifier`}
                        title={`Modifier le dossier ${p.reference}`}
                        aria-label={`Modifier le dossier ${p.reference}`}
                      >
                        <Pencil size={18} />
                      </Link>
                    </Button>
                  )}
                  {canDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      type="button"
                      onClick={() => onDelete(p.id)}
                      aria-label="Supprimer"
                    >
                      <Trash2 size={18} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
