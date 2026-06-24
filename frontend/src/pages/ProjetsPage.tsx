import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileDown, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { ProjetFilters } from "@/api/projets.api";
import {
  archiveProjets,
  deleteProjet,
  fetchProjets,
} from "@/api/projets.api";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PdfExportDialog } from "@/components/projets/PdfExportDialog";
import { ProjetFiltersBar } from "@/components/projets/ProjetFilters";
import { ProjetTable } from "@/components/projets/ProjetTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { libelleAvecColonInsecable } from "@/utils/formatters";

type SortKey =
  | "reference"
  | "abonnes"
  | "etatDossier"
  | "montantTTCFinal"
  | "resteAPayer"
  | "createdAt";

export function ProjetsPage() {
  const role = useAuthStore((s) => s.user?.role ?? "TECHNICIEN");
  const isCommercial = role === "COMMERCIAL";
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [filters, setFilters] = useState<ProjetFilters>({
    page: 1,
    limit: 25,
    sortBy: "createdAt",
    order: "desc",
  });
  const [sortBy, setSortBy] = useState<SortKey>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [deleteProjetId, setDeleteProjetId] = useState<string | null>(null);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setDebounced(search), 300);
    return () => {
      if (t.current) clearTimeout(t.current);
    };
  }, [search]);

  const queryParams = useMemo(
    () => ({
      ...filters,
      search: debounced || undefined,
      sortBy,
      order,
    }),
    [filters, debounced, sortBy, order]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["projets", queryParams],
    queryFn: () => fetchProjets(queryParams),
  });

  const delM = useMutation({
    mutationFn: deleteProjet,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projets"] });
      toast.success("Projet supprimé");
    },
    onError: () => toast.error("Suppression impossible"),
  });

  const archM = useMutation({
    mutationFn: ({ ids, archive }: { ids: string[]; archive: boolean }) =>
      archiveProjets(ids, archive),
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["projets"] });
      setSelected(new Set());
      toast.success(v.archive ? "Archivage effectué" : "Désarchivage effectué");
    },
  });

  const onSort = useCallback((k: SortKey) => {
    setSortBy((prev) => {
      if (prev === k) {
        setOrder((o) => (o === "asc" ? "desc" : "asc"));
        return prev;
      }
      setOrder("asc");
      return k;
    });
  }, []);

  const toggle = (id: string) => {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const toggleAll = () => {
    if (!data?.data.length) return;
    const all = data.data.every((p) => selected.has(p.id));
    if (all) setSelected(new Set());
    else setSelected(new Set(data.data.map((p) => p.id)));
  };

  const deleteProjetDescription = useMemo(() => {
    if (!deleteProjetId) return "";
    const ref = data?.data.find((p) => p.id === deleteProjetId)?.reference;
    return ref
      ? `Le dossier ${ref} sera supprimé de façon définitive. Cette action ne peut pas être annulée.`
      : "Ce dossier sera supprimé de façon définitive. Cette action ne peut pas être annulée.";
  }, [deleteProjetId, data?.data]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">Projets</h1>
          <p className="text-sm text-slate-500">
            {data != null ? data.total : "…"} dossier(s) au total
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap">
          {!isCommercial && (
            <Button asChild className="w-full sm:w-auto">
              <Link to="/projets/nouveau">
                <Plus size={18} /> Nouveau projet
              </Link>
            </Button>
          )}
          {!isCommercial && (
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-auto"
              onClick={() => setExportDialogOpen(true)}
            >
              <FileDown size={18} /> Export sur mesure
              {selected.size > 0 ? ` (${selected.size})` : ""}
            </Button>
          )}
        </div>
      </div>

      {!isCommercial && (
        <PdfExportDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          getExportParams={() => {
            const idsPrefix =
              selected.size > 0
                ? `ids:${[...selected].join(",")}`
                : undefined;
            return {
              ...queryParams,
              page: undefined,
              limit: undefined,
              ...(idsPrefix ? { search: idsPrefix } : {}),
            };
          }}
          selectionHint={
            selected.size > 0
              ? `${libelleAvecColonInsecable("Clients sélectionnés :")} ${selected.size} projet(s) coché(s) dans le tableau.`
              : `${libelleAvecColonInsecable("Sans cases cochées :")} tous les dossiers correspondant aux filtres actuels (hors pagination), comme sur l’export personnalisé.`
          }
        />
      )}

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <Input
          placeholder="Rechercher (référence, client, CIN, contact, N° police / devis / facture, présenté par / MF…)…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xl"
        />
        <ProjetFiltersBar
          filters={filters}
          hideAgentFilter={isCommercial}
          onChange={(p) => setFilters((f) => ({ ...f, ...p }))}
          onResetSearch={() => {
            setSearch("");
            setDebounced("");
          }}
        />
      </div>

      {!isCommercial && selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
          <span>{selected.size} sélectionné(s)</span>
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => archM.mutate({ ids: [...selected], archive: true })}
          >
            Archiver
          </Button>
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => archM.mutate({ ids: [...selected], archive: false })}
          >
            Désarchiver
          </Button>
        </div>
      )}

      {isLoading ? (
        <p className="text-slate-500">Chargement…</p>
      ) : data?.total === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center text-sm text-slate-600">
          <p className="font-medium text-slate-800">Aucun dossier ne correspond</p>
          <p className="mt-2 max-w-lg mx-auto">
            Vérifiez les filtres (ex. contrat « Hors Programme Prosol » si vos
            projets sont surtout « Programme Prosol » ou sans contrat), le district
            exact, ou utilisez « Réinitialiser les filtres » puis « Tous » pour
            le contrat.
          </p>
        </div>
      ) : (
        <ProjetTable
          projets={data?.data ?? []}
          role={role}
          selected={selected}
          onToggle={toggle}
          onToggleAll={toggleAll}
          sortBy={sortBy}
          order={order}
          onSort={onSort}
          onDelete={(id) => setDeleteProjetId(id)}
        />
      )}

      <ConfirmDialog
        open={deleteProjetId != null}
        onOpenChange={(o) => {
          if (!o) setDeleteProjetId(null);
        }}
        title="Supprimer ce projet ?"
        description={deleteProjetDescription}
        onConfirm={() => {
          if (!deleteProjetId) return;
          delM.mutate(deleteProjetId, {
            onSettled: () => setDeleteProjetId(null),
          });
        }}
        pending={delM.isPending}
      />

      {data && data.total > filters.limit! && (
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500">
            Page {filters.page} · {data.data.length} sur {data.total}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <select
              className="col-span-3 rounded border border-slate-200 px-2 py-1 sm:col-span-1"
              value={filters.limit}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  limit: Number(e.target.value),
                  page: 1,
                }))
              }
            >
              {[25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="w-full"
              disabled={filters.page! <= 1}
              onClick={() =>
                setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))
              }
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="w-full"
              disabled={(filters.page ?? 1) * filters.limit! >= data.total}
              onClick={() =>
                setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))
              }
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
