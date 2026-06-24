import { useQuery } from "@tanstack/react-query";
import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ProjetFilters as PF } from "@/api/projets.api";
import { fetchCommercials } from "@/api/users.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  OPTIONS_ETAT_DOSSIER,
  OPTIONS_TYPE_PROJET,
  OPTIONS_APPROBATION_COMMERCIALE,
  OPTIONS_APPROBATION_TECHNIQUE,
  OPTIONS_EXECUTION_INSTALLATION,
  OPTIONS_PROCES_VERBAL,
  OPTIONS_RECEPTION,
  OPTIONS_SAISIE_PROSOL,
  OPTIONS_DEBLOCAGE_PROSOL,
  OPTIONS_SAISIE_SUBVENTION,
  OPTIONS_DEBLOCAGE_SUBVENTION,
  PROJET_LIST_DATE_FILTER_KEYS,
  PROJET_LIST_DATE_FILTER_OPTIONS,
  uiListeLabel,
  AGENT_COMMERCIAL_AUTRE_VALUE,
} from "@/utils/constants";
import {
  canonicalExecutionInstallation,
  canonicalDeblocageProsol,
  canonicalDeblocageSubvention,
  canonicalProcesVerbal,
  canonicalReception,
  canonicalSaisieProsol,
  canonicalSaisieSubvention,
  formatCommercialDisplayName,
} from "@/utils/formatters";
import { useCatalogLists } from "@/hooks/useCatalogLists";
import { useAuthStore } from "@/store/authStore";

const LEGACY_APPRO_COMMERCIALE_LABEL: Record<string, string> = {
  EN_ATTENTE: "En attente",
  REJETE: "Rejeté",
  ABANDONNE: "Abandonné",
};

const RESET_FILTER_KEYS: (keyof PF)[] = [
  "district",
  "etat",
  "typeProjet",
  "contrat",
  "typeCompteur",
  "banque",
  "agentId",
  "dateFrom",
  "dateTo",
  "dateField",
  "classement",
  "approbationCommerciale",
  "approbationTechnique",
  "anme",
  "executionInstallation",
  "reception",
  "procesVerbal",
  "saisieProsol",
  "deblocageProsol",
  "saisieSubvention",
  "deblocageSubvention",
  "tauxInteret",
  "lotDeblocage",
];

function selCls() {
  return "h-9 w-full min-w-[8rem] rounded-lg border border-slate-200 bg-white px-2 text-sm";
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-slate-500">{label}</Label>
      {children}
    </div>
  );
}

export function ProjetFiltersBar({
  filters,
  onChange,
  hideAgentFilter,
  onResetSearch,
}: {
  filters: PF;
  onChange: (p: Partial<PF>) => void;
  /** Masquer le filtre agent (ex. rôle commercial : filtrage serveur déjà appliqué). */
  hideAgentFilter?: boolean;
  /** Appelé avec « Réinitialiser les filtres » (ex. vider la recherche libre). */
  onResetSearch?: () => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const authRole = useAuthStore((s) => s.user?.role);
  const { banqueOptions, districtOptions } = useCatalogLists();
  const canAddCommercial =
    authRole === "SUPER_ADMIN" || authRole === "ADMIN";
  const { data: commercials } = useQuery({
    queryKey: ["commercials"],
    queryFn: fetchCommercials,
    enabled: !hideAgentFilter,
    staleTime: 0,
  });

  const patch = (p: Partial<PF>) => onChange({ ...p, page: 1 });

  const resetDetailed = () => {
    onResetSearch?.();
    const cleared: Partial<PF> = { page: 1 };
    for (const k of RESET_FILTER_KEYS) {
      (cleared as Record<string, undefined>)[k] = undefined;
    }
    onChange(cleared);
  };

  const banqueListId = useMemo(() => "banque-suggestions", []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = () => setShowAdvanced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /** Retire un filtre technique hors liste Excel (ex. ancien ABANDONNE). */
  useEffect(() => {
    const t = filters.approbationTechnique;
    if (t == null || t === "") return;
    if (OPTIONS_APPROBATION_TECHNIQUE.some((o) => o.v === t)) return;
    onChange({ approbationTechnique: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.approbationTechnique]);

  /** NEANT n’est plus dans la liste (Approuvé / Pas encore seulement). */
  useEffect(() => {
    const t = filters.approbationCommerciale;
    if (t == null || t === "") return;
    if (OPTIONS_APPROBATION_COMMERCIALE.some((o) => o.v === t)) return;
    onChange({ approbationCommerciale: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.approbationCommerciale]);

  useEffect(() => {
    const t = filters.executionInstallation;
    if (t == null || t === "") return;
    const c = canonicalExecutionInstallation(t);
    if (c && c === t) return;
    if (c) {
      onChange({ executionInstallation: c, page: 1 });
      return;
    }
    onChange({ executionInstallation: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.executionInstallation]);

  useEffect(() => {
    const t = filters.procesVerbal;
    if (t == null || t === "") return;
    const c = canonicalProcesVerbal(t);
    if (c && c === t) return;
    if (c) {
      onChange({ procesVerbal: c, page: 1 });
      return;
    }
    onChange({ procesVerbal: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.procesVerbal]);

  useEffect(() => {
    const t = filters.saisieProsol;
    if (t == null || t === "") return;
    const c = canonicalSaisieProsol(t);
    if (c && c === t) return;
    if (c) {
      onChange({ saisieProsol: c, page: 1 });
      return;
    }
    onChange({ saisieProsol: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.saisieProsol]);

  useEffect(() => {
    const t = filters.deblocageProsol;
    if (t == null || t === "") return;
    const c = canonicalDeblocageProsol(t);
    if (c && c === t) return;
    if (c) {
      onChange({ deblocageProsol: c, page: 1 });
      return;
    }
    onChange({ deblocageProsol: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.deblocageProsol]);

  useEffect(() => {
    const t = filters.saisieSubvention;
    if (t == null || t === "") return;
    const c = canonicalSaisieSubvention(t);
    if (c && c === t) return;
    if (c) {
      onChange({ saisieSubvention: c, page: 1 });
      return;
    }
    onChange({ saisieSubvention: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.saisieSubvention]);

  useEffect(() => {
    const t = filters.deblocageSubvention;
    if (t == null || t === "") return;
    const c = canonicalDeblocageSubvention(t);
    if (c && c === t) return;
    if (c) {
      onChange({ deblocageSubvention: c, page: 1 });
      return;
    }
    onChange({ deblocageSubvention: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.deblocageSubvention]);

  useEffect(() => {
    const t = filters.reception;
    if (t == null || t === "") return;
    const c = canonicalReception(t);
    if (c && c === t) return;
    if (c) {
      onChange({ reception: c, page: 1 });
      return;
    }
    onChange({ reception: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.reception]);

  /** Valeurs de filtre contrat hors liste (ex. ancien NEANT / __NULL__) → « Tous ». */
  useEffect(() => {
    const t = filters.contrat;
    if (t == null || t === "") return;
    if (t === "PROGRAMME_PROSOL" || t === "HORS_PROGRAMME_PROSOL") return;
    onChange({ contrat: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.contrat]);

  /** ANME : uniquement OUI / NON. */
  useEffect(() => {
    const t = filters.anme;
    if (t == null || t === "") return;
    if (t === "OUI" || t === "NON") return;
    onChange({ anme: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.anme]);

  /** Type compteur : seulement Tous / Monophasé / Triphasé (hors __NULL__ / NEANT). */
  useEffect(() => {
    const t = filters.typeCompteur;
    if (t == null || t === "") return;
    if (t === "MONOPHASE" || t === "TRIPHASE") return;
    onChange({ typeCompteur: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.typeCompteur]);

  /** Champ date liste : uniquement les clés Prisma connues (hors valeur vide / obsolète). */
  useEffect(() => {
    const df = filters.dateField;
    if (df == null || df === "") return;
    if ((PROJET_LIST_DATE_FILTER_KEYS as readonly string[]).includes(df)) return;
    onChange({ dateField: undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onChange non mémoïsé côté parent
  }, [filters.dateField]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="District">
          <select
            className={selCls()}
            value={filters.district ?? ""}
            onChange={(e) =>
              patch({ district: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            {districtOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>
        <Field label="État dossier">
          <select
            className={selCls()}
            value={filters.etat ?? ""}
            onChange={(e) => patch({ etat: e.target.value || undefined })}
          >
            <option value="">Tous</option>
            {OPTIONS_ETAT_DOSSIER.map((o) => (
              <option key={o.v} value={o.v}>
                {o.l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Type de projet">
          <select
            className={selCls()}
            value={filters.typeProjet ?? ""}
            onChange={(e) =>
              patch({ typeProjet: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_TYPE_PROJET.map((o) => (
              <option key={o.v} value={o.v}>
                {o.l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Contrat d'achat">
          <select
            className={selCls()}
            value={filters.contrat ?? ""}
            onChange={(e) =>
              patch({ contrat: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            <option value="PROGRAMME_PROSOL">Programme Prosol</option>
            <option value="HORS_PROGRAMME_PROSOL">
              Hors Programme Prosol
            </option>
          </select>
        </Field>
        {!hideAgentFilter && (
          <Field label="Agent commercial">
            <div className="space-y-1">
              <select
                className={selCls()}
                value={filters.agentId ?? ""}
                onChange={(e) =>
                  patch({ agentId: e.target.value || undefined })
                }
              >
                <option value="">Tous</option>
                {commercials?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {formatCommercialDisplayName(c)}
                  </option>
                ))}
                <option value={AGENT_COMMERCIAL_AUTRE_VALUE}>Autre</option>
              </select>
              {canAddCommercial && (
                <Link
                  to="/utilisateurs?nouveau=commercial"
                  className="text-xs font-medium text-sky-700 underline-offset-2 hover:underline"
                >
                  Ajouter un commercial…
                </Link>
              )}
            </div>
          </Field>
        )}
        <Field label="Type compteur">
          <select
            className={selCls()}
            value={filters.typeCompteur ?? ""}
            onChange={(e) =>
              patch({ typeCompteur: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            <option value="MONOPHASE">Monophasé</option>
            <option value="TRIPHASE">Triphasé</option>
          </select>
        </Field>
        <Field label="Banque (contient)">
          <>
            <Input
              className="h-9"
              list={banqueListId}
              placeholder="Texte…"
              value={filters.banque ?? ""}
              onChange={(e) =>
                patch({ banque: e.target.value || undefined })
              }
            />
            <datalist id={banqueListId}>
              {banqueOptions.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </>
        </Field>
      </div>

      <div className="flex justify-end sm:hidden">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced((s) => !s)}
        >
          {showAdvanced ? "Masquer filtres avancés" : "Afficher filtres avancés"}
        </Button>
      </div>

      {showAdvanced ? (
        <>
          <div className="flex flex-wrap items-end gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-3">
        <p className="w-full text-xs font-medium text-slate-600">
          Approbations (statut) et taux
        </p>
        <Field label="Approbation commerciale">
          <select
            className={selCls()}
            value={filters.approbationCommerciale ?? ""}
            onChange={(e) =>
              patch({
                approbationCommerciale: e.target.value || undefined,
              })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_APPROBATION_COMMERCIALE.map((s) => (
              <option key={s.v} value={s.v}>
                {s.l}
              </option>
            ))}
            {filters.approbationCommerciale &&
            !OPTIONS_APPROBATION_COMMERCIALE.some(
              (o) => o.v === filters.approbationCommerciale
            ) ? (
              <option value={filters.approbationCommerciale}>
                {LEGACY_APPRO_COMMERCIALE_LABEL[filters.approbationCommerciale] ??
                  filters.approbationCommerciale}{" "}
                (ancien statut)
              </option>
            ) : null}
          </select>
        </Field>
        <Field label="Approbation technique">
          <select
            className={selCls()}
            value={filters.approbationTechnique ?? ""}
            onChange={(e) =>
              patch({
                approbationTechnique: e.target.value || undefined,
              })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_APPROBATION_TECHNIQUE.map((s) => (
              <option key={s.v} value={s.v}>
                {s.l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Subvention ANME">
          <select
            className={selCls()}
            value={filters.anme ?? ""}
            onChange={(e) =>
              patch({ anme: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            <option value="OUI">Oui</option>
            <option value="NON">Non</option>
          </select>
        </Field>
        <Field label="Taux d&apos;intérêt (%)">
          <Input
            className="h-9 w-28"
            inputMode="decimal"
            placeholder="ex. 5,5"
            value={filters.tauxInteret ?? ""}
            onChange={(e) =>
              patch({ tauxInteret: e.target.value || undefined })
            }
          />
        </Field>
          </div>

          <div className="flex flex-wrap items-end gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-3">
        <p className="w-full text-xs font-medium text-slate-600">
          Chantier (texte) et lot de déblocage
        </p>
        <Field label="Exécution installation">
          <select
            className={selCls()}
            value={filters.executionInstallation ?? ""}
            onChange={(e) =>
              patch({
                executionInstallation: e.target.value || undefined,
              })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_EXECUTION_INSTALLATION.map((x) => (
              <option key={x} value={x}>
                {uiListeLabel(x)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Réception">
          <select
            className={selCls()}
            value={filters.reception ?? ""}
            onChange={(e) =>
              patch({ reception: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_RECEPTION.map((x) => (
              <option key={x} value={x}>
                {uiListeLabel(x)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Procès-verbal">
          <select
            className={selCls()}
            value={filters.procesVerbal ?? ""}
            onChange={(e) =>
              patch({ procesVerbal: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_PROCES_VERBAL.map((x) => (
              <option key={x} value={x}>
                {uiListeLabel(x)}
              </option>
            ))}
          </select>
        </Field>
        <p className="w-full text-xs font-medium text-slate-500">
          Déblocage / saisie (Prosol et subvention)
        </p>
        <Field label="Saisie Prosol">
          <select
            className={selCls()}
            value={filters.saisieProsol ?? ""}
            onChange={(e) =>
              patch({ saisieProsol: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_SAISIE_PROSOL.map((x) => (
              <option key={x} value={x}>
                {uiListeLabel(x)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Déblocage Prosol">
          <select
            className={selCls()}
            value={filters.deblocageProsol ?? ""}
            onChange={(e) =>
              patch({ deblocageProsol: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_DEBLOCAGE_PROSOL.map((x) => (
              <option key={x} value={x}>
                {uiListeLabel(x)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Saisie subvention">
          <select
            className={selCls()}
            value={filters.saisieSubvention ?? ""}
            onChange={(e) =>
              patch({ saisieSubvention: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_SAISIE_SUBVENTION.map((x) => (
              <option key={x} value={x}>
                {uiListeLabel(x)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Déblocage subvention">
          <select
            className={selCls()}
            value={filters.deblocageSubvention ?? ""}
            onChange={(e) =>
              patch({ deblocageSubvention: e.target.value || undefined })
            }
          >
            <option value="">Tous</option>
            {OPTIONS_DEBLOCAGE_SUBVENTION.map((x) => (
              <option key={x} value={x}>
                {uiListeLabel(x)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Lot déblocage (Prosol ou subvention)">
          <Input
            className="h-9 min-w-[12rem]"
            placeholder="N° lot…"
            value={filters.lotDeblocage ?? ""}
            onChange={(e) =>
              patch({ lotDeblocage: e.target.value || undefined })
            }
          />
        </Field>
          </div>

          <div className="flex flex-wrap items-end gap-3">
        <Field label="Filtrer les dates sur">
          <select
            className={selCls()}
            value={filters.dateField ?? "createdAt"}
            onChange={(e) => patch({ dateField: e.target.value })}
          >
            {PROJET_LIST_DATE_FILTER_OPTIONS.map((d) => (
              <option key={d.v} value={d.v}>
                {d.l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Du">
          <Input
            type="date"
            className="h-9 w-auto"
            value={filters.dateFrom ?? ""}
            onChange={(e) =>
              patch({ dateFrom: e.target.value || undefined })
            }
          />
        </Field>
        <Field label="Au">
          <Input
            type="date"
            className="h-9 w-auto"
            value={filters.dateTo ?? ""}
            onChange={(e) => patch({ dateTo: e.target.value || undefined })}
          />
        </Field>
          </div>
        </>
      ) : null}

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1 text-slate-600"
          onClick={resetDetailed}
        >
          <RotateCcw size={14} />
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
}
