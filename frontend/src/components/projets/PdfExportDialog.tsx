import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  createBlobDownloadSession,
  downloadExportExcelPost,
  downloadExportPdfPost,
  fetchPdfExportColumnsMeta,
  type ProjetExportParams,
  type PdfListColumnMeta,
} from "@/api/projets.api";
import { isMobileBrowser } from "@/utils/blobDownload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function orderedSelectedKeys(
  meta: PdfListColumnMeta[],
  selected: Set<string>
): string[] {
  return meta.filter((c) => selected.has(c.key)).map((c) => c.key);
}

function normalizeForSearch(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function friendlyGroupLabel(group: string): string {
  const g = normalizeForSearch(group);
  if (g.includes("ident")) return "Informations client";
  if (g.includes("install")) return "Installation";
  if (g.includes("fact") || g.includes("devis")) return "Devis / Facture";
  if (g.includes("dossier") || g.includes("progress")) return "Progression dossier";
  if (g.includes("prosol") || g.includes("subvention") || g.includes("debloc")) {
    return "Déblocage (Prosol / Subvention)";
  }
  return group;
}

function friendlyColumnLabel(col: PdfListColumnMeta): string {
  if (col.key === "abonnes") return "Abonné / Client";
  if (col.key === "conditionSubvention") return "Subvention ANME (Oui / Non)";
  if (col.key === "nLotDebProsol") return "N° lot déblocage Prosol";
  if (col.key === "nLotDeblocageSubvention") return "N° lot déblocage subvention";
  if (col.key === "fraisPoseCmptProsol") return "Paiement pose compteur Prosol";
  return col.label;
}

function groupAnchorId(group: string): string {
  return `export-group-${normalizeForSearch(group).replace(/[^a-z0-9]+/g, "-")}`;
}

type TypeProjetScope =
  | "PHOTOVOLTAIQUE_CLASSIQUE"
  | "POMPAGE"
  | "ISOLE_AVEC_BATTERIES"
  | "AUTRE";

function normalizeTypeProjetScope(raw: unknown): TypeProjetScope | null {
  if (raw === "PHOTOVOLTAIQUE_CLASSIQUE") return raw;
  if (raw === "POMPAGE") return raw;
  if (raw === "ISOLE_AVEC_BATTERIES") return raw;
  if (raw === "AUTRE") return raw;
  return null;
}

function isColumnRelevantForType(key: string, typeScope: TypeProjetScope | null): boolean {
  if (!typeScope) return true;

  const commonExcluded = new Set([
    "approbationCommerciale",
    "approbationTechnique",
    "reception",
    "procesVerbal",
    "contratAchat",
    "montantFinancement",
    "tauxInteret",
    "banque",
    "district",
    "gouvernorat",
    "delegation",
    "municipalite",
    "dateDepotDossier",
    "dateApprobation",
    "dateDepotDemandeMES",
    "dateMES",
    "nPolice",
    "nLotDebProsol",
    "saisieProsol",
    "nLotDeblocageSubvention",
    "deblocageProsol",
    "conditionSubvention",
    "saisieSubvention",
    "deblocageSubvention",
    "montantHT",
    "tva",
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
    "subventionDemandee",
    "typeCompteur",
    "calibreDisjoncteur",
  ]);
  if (commonExcluded.has(key)) return false;

  if (typeScope === "PHOTOVOLTAIQUE_CLASSIQUE") {
    const coupleReseauExcluded = new Set([
      "equipementSurMesure",
      "interventionSurMesure",
    ]);
    return !coupleReseauExcluded.has(key);
  }

  if (typeScope === "POMPAGE") {
    const pompageExcluded = new Set([
      "numeroCompteur",
      "consommationAnnuelle",
      "nbOnduleurs",
      "puUnitaireOnd",
      "puOndSiAutreW",
      "autreModeleOnd",
      "rapportPuissance",
    ]);
    return !pompageExcluded.has(key);
  }

  if (typeScope === "ISOLE_AVEC_BATTERIES") {
    const isoleExcluded = new Set([
      "puOndSiAutreW",
      "rapportPuissance",
    ]);
    return !isoleExcluded.has(key);
  }

  if (typeScope === "AUTRE") {
    const autreExcluded = new Set([
      "numeroCompteur",
      "consommationAnnuelle",
      "nbOnduleurs",
      "puUnitaireOnd",
      "puOndSiAutreW",
      "autreModeleOnd",
      "rapportPuissance",
    ]);
    return !autreExcluded.has(key);
  }

  return true;
}

export function PdfExportDialog({
  open,
  onOpenChange,
  getExportParams,
  selectionHint,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  getExportParams: () => ProjetExportParams;
  selectionHint?: string;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pdf-export-columns"],
    queryFn: fetchPdfExportColumnsMeta,
    enabled: open,
    staleTime: 60_000,
  });

  const [selected, setSelected] = useState<Set<string> | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const typeProjetScope = useMemo(() => {
    const params = getExportParams();
    return normalizeTypeProjetScope((params as Record<string, unknown>).typeProjet);
  }, [getExportParams]);

  const columnsForType = useMemo(
    () =>
      (data?.columns ?? []).filter((c) =>
        isColumnRelevantForType(c.key, typeProjetScope)
      ),
    [data?.columns, typeProjetScope]
  );

  const selectedKeys = useMemo(() => {
    if (selected) return selected;
    return new Set(
      columnsForType
        .filter((c) => (data?.defaultColumnKeys ?? []).includes(c.key))
        .map((c) => c.key)
    );
  }, [selected, data, columnsForType]);

  const pdfTitleValue = pdfTitle ?? data?.defaultPdfTitle ?? "";

  const groups = useMemo(() => {
    const m = new Map<string, PdfListColumnMeta[]>();
    for (const c of columnsForType) {
      const g = c.group;
      if (!m.has(g)) m.set(g, []);
      m.get(g)!.push(c);
    }
    return m;
  }, [columnsForType]);

  const groupOrder = useMemo(() => {
    const seen = new Set<string>();
    const order: string[] = [];
    for (const c of columnsForType) {
      if (!seen.has(c.group)) {
        seen.add(c.group);
        order.push(c.group);
      }
    }
    return order;
  }, [columnsForType]);

  const visibleColumnsByGroup = useMemo(() => {
    const q = normalizeForSearch(searchTerm);
    const map = new Map<string, PdfListColumnMeta[]>();
    for (const g of groupOrder) {
      const cols = (groups.get(g) ?? []).filter((col) => {
        if (!q) return true;
        const haystack = normalizeForSearch(
          `${friendlyColumnLabel(col)} ${col.label} ${col.key} ${friendlyGroupLabel(g)} ${g}`
        );
        return haystack.includes(q);
      });
      if (cols.length > 0) map.set(g, cols);
    }
    return map;
  }, [groupOrder, groups, searchTerm]);

  const visibleGroupOrder = useMemo(
    () => groupOrder.filter((g) => (visibleColumnsByGroup.get(g) ?? []).length > 0),
    [groupOrder, visibleColumnsByGroup]
  );

  const visibleSelectedCount = useMemo(
    () =>
      [...visibleColumnsByGroup.values()]
        .flat()
        .filter((c) => selectedKeys.has(c.key)).length,
    [visibleColumnsByGroup, selectedKeys]
  );

  const visibleColumnsCount = useMemo(
    () => [...visibleColumnsByGroup.values()].flat().length,
    [visibleColumnsByGroup]
  );

  const toggle = (key: string) => {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  };

  const selectAll = () => {
    if (!columnsForType.length) return;
    setSelected(new Set(columnsForType.map((c) => c.key)));
  };

    const selectNone = () => setSelected(new Set());

  const selectDefault = () => {
    if (!data?.defaultColumnKeys) return;
    const filtered = columnsForType
      .filter((c) => data.defaultColumnKeys.includes(c.key))
      .map((c) => c.key);
    setSelected(new Set(filtered));
  };

  const onExport = async () => {
    if (!columnsForType.length) return;
    if (!orderedSelectedKeys(columnsForType, selectedKeys).length) return;
    const base = getExportParams();
    const keys = orderedSelectedKeys(columnsForType, selectedKeys);
    const dateStr = new Date().toISOString().slice(0, 10);
    const session = createBlobDownloadSession();
    session.begin();
    setIsExporting(true);
    try {
      if (exportFormat === "excel") {
        await downloadExportExcelPost(
          { ...base, columns: keys },
          `projets-export-${dateStr}.xlsx`,
          session
        );
      } else {
        await downloadExportPdfPost(
          {
            ...base,
            columns: keys,
            ...(pdfTitleValue.trim() ? { pdfTitle: pdfTitleValue.trim() } : {}),
          },
          `projets-export-${dateStr}.pdf`,
          session
        );
      }
      if (isMobileBrowser()) {
        toast.success(
          exportFormat === "pdf"
            ? session.wasPopupBlocked()
              ? "PDF affiché dans l’application — utilisez Ouvrir ou Partager pour l’enregistrer."
              : "PDF prêt — consultez le nouvel onglet ou utilisez Partager pour l’enregistrer."
            : "Fichier prêt — utilisez Partager ou le lien de téléchargement."
        );
      }
      onOpenChange(false);
    } catch (e) {
      session.cancel();
      const msg = e instanceof Error ? e.message : "Export échoué";
      toast.error(msg);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        if (v) {
          setSelected(null);
          setPdfTitle(null);
          setExportFormat("pdf");
          setSearchTerm("");
        }
        onOpenChange(v);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "fixed inset-0 z-50 flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden rounded-none border-0 bg-white p-0 shadow-lg duration-200",
            "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[min(95dvh,60rem)] sm:w-[min(calc(100vw-1rem),70rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:border sm:border-slate-200"
          )}
        >
          <div className="shrink-0 border-b border-slate-100 px-4 py-2 sm:px-5 sm:py-4">
            <Dialog.Title className="text-base font-semibold text-slate-800 sm:text-lg">
              Export sur mesure
            </Dialog.Title>
            <Dialog.Description className="mt-1 line-clamp-3 text-xs text-slate-600 sm:line-clamp-none sm:text-sm">
              Choisissez le format (PDF ou Excel), puis les colonnes à inclure.
              L’ordre des colonnes suit la liste ci-dessous.
              {typeProjetScope ? (
                <span className="mt-1 block font-medium text-[#006aa3]">
                  Colonnes adaptées au type :{" "}
                  {typeProjetScope === "POMPAGE"
                    ? "Pompage"
                    : typeProjetScope === "ISOLE_AVEC_BATTERIES"
                      ? "Isolé avec batteries"
                      : typeProjetScope === "AUTRE"
                        ? "Autre"
                      : "Couplé au réseau"}
                </span>
              ) : null}
              {selectionHint ? (
                <span className="mt-1 block font-medium text-amber-800">
                  {selectionHint}
                </span>
              ) : null}
            </Dialog.Description>
          </div>

          <div className="shrink-0 border-b border-slate-100 px-4 py-2 sm:px-5 sm:py-3">
            <Label className="text-slate-700">Format d’export</Label>
            <div
              className="mt-2 flex w-full max-w-md rounded-lg border border-slate-200 p-1"
              role="group"
              aria-label="Format d’export"
            >
              <button
                type="button"
                onClick={() => setExportFormat("pdf")}
                className={cn(
                  "flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors sm:px-3 sm:py-2",
                  exportFormat === "pdf"
                    ? "bg-[#f18a21] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                PDF
              </button>
              <button
                type="button"
                onClick={() => setExportFormat("excel")}
                className={cn(
                  "flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors sm:px-3 sm:py-2",
                  exportFormat === "excel"
                    ? "bg-[#f18a21] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                Excel
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {exportFormat === "pdf"
                ? "Le PDF inclut l’en-tête société, le logo et le titre du document."
                : "Le fichier Excel reprend uniquement les colonnes cochées (pas de logo ni titre de rapport)."}
            </p>
          </div>

          {exportFormat === "pdf" ? (
            <div className="shrink-0 space-y-1.5 border-b border-slate-100 px-4 py-3 sm:px-5">
              <Label htmlFor="pdf-export-title" className="text-slate-700">
                Titre du document
              </Label>
              <Input
                id="pdf-export-title"
                type="text"
                maxLength={200}
                placeholder="Ex. Rapport clients photovoltaïques"
                value={pdfTitleValue}
                onChange={(e) => setPdfTitle(e.target.value)}
                disabled={isLoading || isError}
                className="max-w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-0"
              />
            </div>
          ) : null}

          <div className="shrink-0 border-b border-slate-100 px-4 py-2 sm:px-5 sm:py-3">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={selectAll}
                className="h-8 px-2 text-xs sm:h-9 sm:px-3"
              >
                Tout sélectionner
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={selectNone}
                className="h-8 px-2 text-xs sm:h-9 sm:px-3"
              >
                Tout désélectionner
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={selectDefault}
                className="col-span-2 h-8 px-2 text-xs sm:col-auto sm:h-9 sm:px-3"
              >
                Défaut (export classique)
              </Button>
              <div className="col-span-2 text-right text-xs font-medium text-slate-500 sm:ml-auto sm:col-auto sm:text-left">
                {visibleSelectedCount}/{visibleColumnsCount} sélectionnées
              </div>
            </div>
          </div>

          {isLoading ? (
            <p className="min-h-0 shrink-0 px-5 py-8 text-center text-sm text-slate-500">
              Chargement des colonnes…
            </p>
          ) : isError ? (
            <p className="min-h-0 shrink-0 px-5 py-8 text-center text-sm text-red-600">
              Impossible de charger la liste des colonnes.
            </p>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-3 [-webkit-overflow-scrolling:touch] sm:px-5 sm:py-4">
              <div className="mb-2 hidden rounded-lg border border-[#d6ecf8] bg-[#f3fbff] p-2.5 text-xs text-slate-700 sm:mb-3 sm:block">
                Sélectionnez les informations à exporter. Sur téléphone, vous pouvez utiliser les
                boutons de section ci-dessous pour aller directement au bon bloc.
              </div>
              <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50/70 p-2">
                <Label htmlFor="export-column-search" className="text-xs text-slate-600">
                  Rechercher une information
                </Label>
                <Input
                  id="export-column-search"
                  type="text"
                  placeholder="Ex. client, banque, déblocage, devis…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1 h-9"
                />
              </div>
              {visibleGroupOrder.length ? (
                <div className="mb-3 rounded-lg border border-slate-200 bg-white p-2">
                  <p className="mb-2 text-xs font-medium text-slate-600">Accès rapide par section</p>
                  <div className="grid grid-cols-1 gap-1.5 sm:flex sm:gap-2 sm:overflow-x-auto sm:pb-1">
                    {visibleGroupOrder.map((g) => {
                      const cols = visibleColumnsByGroup.get(g) ?? [];
                      const selectedCount = cols.filter((c) => selectedKeys.has(c.key)).length;
                      return (
                        <button
                          key={g}
                          type="button"
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 sm:shrink-0 sm:px-3"
                          onClick={() => {
                            document.getElementById(groupAnchorId(g))?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }}
                        >
                          <span className="inline-block max-w-full truncate align-bottom sm:max-w-none">
                            {friendlyGroupLabel(g)} ({selectedCount}/{cols.length})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              <div className="space-y-4 pb-2 pr-1 sm:space-y-6 sm:pb-1">
                {visibleGroupOrder.map((g) => (
                  <div
                    key={g}
                    id={groupAnchorId(g)}
                    className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3"
                  >
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="pt-0.5 text-xs font-semibold uppercase leading-normal tracking-wide text-[#006aa3]">
                          {friendlyGroupLabel(g)}
                        </h3>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {
                            (visibleColumnsByGroup.get(g) ?? []).filter((c) =>
                              selectedKeys.has(c.key)
                            ).length
                          }
                          /
                          {(visibleColumnsByGroup.get(g) ?? []).length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          className="text-slate-500 hover:text-slate-700"
                          onClick={() =>
                            setSelected((prev) => {
                              const n = new Set(prev);
                              for (const col of visibleColumnsByGroup.get(g) ?? []) n.add(col.key);
                              return n;
                            })
                          }
                        >
                          Tout cocher
                        </button>
                        <button
                          type="button"
                          className="text-slate-500 hover:text-slate-700"
                          onClick={() =>
                            setSelected((prev) => {
                              const n = new Set(prev);
                              for (const col of visibleColumnsByGroup.get(g) ?? []) n.delete(col.key);
                              return n;
                            })
                          }
                        >
                          Vider
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
                      {(visibleColumnsByGroup.get(g) ?? []).map((col) => (
                        <label
                          key={col.key}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200/70 bg-white px-2 py-1.5 text-xs hover:bg-slate-50 sm:text-sm"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 shrink-0 rounded border-slate-300 text-[#0081c4] focus:ring-[#0081c4]"
                            checked={selectedKeys.has(col.key)}
                            onChange={() => toggle(col.key)}
                          />
                          <span className="text-slate-800">{friendlyColumnLabel(col)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                {!visibleGroupOrder.length ? (
                  <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    Aucune information trouvée pour cette recherche.
                  </p>
                ) : null}
              </div>
            </div>
          )}

          <div className="sticky bottom-0 z-10 shrink-0 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.1)] backdrop-blur supports-[backdrop-filter]:bg-white/90 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:flex sm:justify-end sm:gap-2 sm:px-5 sm:py-4 sm:shadow-none sm:backdrop-blur-0">
            <Button
              type="button"
              variant="outline"
              className="hidden h-10 px-4 text-sm sm:inline-flex"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              className="h-11 w-full px-4 text-sm font-semibold sm:h-10 sm:w-auto"
              onClick={() => void onExport()}
              disabled={
                isExporting ||
                isLoading ||
                !columnsForType.length ||
                orderedSelectedKeys(columnsForType, selectedKeys).length === 0
              }
            >
              {isExporting
                ? "Génération…"
                : exportFormat === "pdf"
                  ? "Générer le PDF"
                  : "Exporter Excel"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full px-4 text-sm sm:hidden"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
