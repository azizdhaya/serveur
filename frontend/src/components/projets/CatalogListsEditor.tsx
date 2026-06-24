import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCatalogLists } from "@/hooks/useCatalogLists";
import { cn } from "@/lib/utils";
import { BANQUES, DISTRICTS } from "@/utils/constants";
import { resetCatalogListsState } from "@/utils/catalogListsStorage";
import { formatTnd } from "@/utils/formatters";

const defaultBanquesSet = new Set<string>([...BANQUES]);
const defaultDistrictsSet = new Set<string>([...DISTRICTS]);

/**
 * Personnalisation locale (navigateur) des listes déroulantes Banque, District et Montant TND (financement).
 */
export function CatalogListsEditor({ className }: { className?: string }) {
  const {
    state,
    addBanque,
    removeExtraBanque,
    addDistrict,
    removeExtraDistrict,
    addMontantTnd,
    removeExtraMontantTnd,
  } = useCatalogLists();
  const [bankDraft, setBankDraft] = useState("");
  const [districtDraft, setDistrictDraft] = useState("");
  const [montantDraft, setMontantDraft] = useState("");

  const onReset = () => {
    if (
      !window.confirm(
        "Supprimer toutes les banques et montants TND ajoutés manuellement ?"
      )
    ) {
      return;
    }
    resetCatalogListsState();
  };

  return (
    <details
      className={cn(
        "rounded-lg border border-slate-200 bg-slate-50/90 px-3 py-2 text-sm text-slate-700",
        className
      )}
    >
      <summary className="cursor-pointer select-none font-medium text-slate-800 [&::-webkit-details-marker]:hidden [&::marker]:hidden">
        Personnaliser les listes (banques, districts et montants financement TND)
      </summary>
      <div className="mt-3 space-y-5 border-t border-slate-200/80 pt-3">
        <p className="text-xs text-slate-500">
          Les choix ajoutés sont enregistrés dans ce navigateur et apparaissent
          dans le formulaire projet et les filtres.
        </p>

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600">Banques supplémentaires</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Input
              className="min-w-0 sm:min-w-[12rem] sm:flex-1"
              placeholder="Nom de la banque…"
              value={bankDraft}
              onChange={(e) => setBankDraft(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full shrink-0 sm:w-auto"
              onClick={() => {
                addBanque(bankDraft);
                setBankDraft("");
              }}
            >
              Ajouter
            </Button>
          </div>
          {state.extraBanques.length > 0 ? (
            <ul className="space-y-1 rounded-md border border-slate-100 bg-white p-2 text-xs">
              {state.extraBanques.map((b) => (
                <li
                  key={b}
                  className="flex items-center justify-between gap-2 border-b border-slate-50 py-1 last:border-0"
                >
                  <span>{b}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 shrink-0 text-rose-600 hover:text-rose-700"
                    onClick={() => removeExtraBanque(b)}
                  >
                    Retirer
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">Aucune banque ajoutée.</p>
          )}
          <p className="text-[11px] text-slate-400">
            Les banques d’origine ({[...defaultBanquesSet].join(", ")}) ne peuvent
            pas être retirées ici ; seules vos entrées supplémentaires sont modifiables.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600">Districts supplémentaires</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Input
              className="min-w-0 sm:min-w-[12rem] sm:flex-1"
              placeholder="Nom du district…"
              value={districtDraft}
              onChange={(e) => setDistrictDraft(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full shrink-0 sm:w-auto"
              onClick={() => {
                addDistrict(districtDraft);
                setDistrictDraft("");
              }}
            >
              Ajouter
            </Button>
          </div>
          {state.extraDistricts.length > 0 ? (
            <ul className="space-y-1 rounded-md border border-slate-100 bg-white p-2 text-xs">
              {state.extraDistricts.map((d) => (
                <li
                  key={d}
                  className="flex items-center justify-between gap-2 border-b border-slate-50 py-1 last:border-0"
                >
                  <span>{d}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 shrink-0 text-rose-600 hover:text-rose-700"
                    onClick={() => removeExtraDistrict(d)}
                  >
                    Retirer
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">Aucun district ajouté.</p>
          )}
          <p className="text-[11px] text-slate-400">
            Les districts d’origine ({[...defaultDistrictsSet].join(", ")}) ne peuvent
            pas être retirés ici ; seules vos entrées supplémentaires sont modifiables.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600">
            Montants TND (financement) supplémentaires
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Input
              className="min-w-0 w-full sm:w-32 sm:min-w-[8rem]"
              inputMode="decimal"
              placeholder="ex. 12000"
              value={montantDraft}
              onChange={(e) => setMontantDraft(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full shrink-0 sm:w-auto"
              onClick={() => {
                addMontantTnd(montantDraft);
                setMontantDraft("");
              }}
            >
              Ajouter
            </Button>
          </div>
          {state.extraMontantsTnd.length > 0 ? (
            <ul className="space-y-1 rounded-md border border-slate-100 bg-white p-2 text-xs">
              {state.extraMontantsTnd.map((m) => (
                <li
                  key={m}
                  className="flex items-center justify-between gap-2 border-b border-slate-50 py-1 last:border-0"
                >
                  <span>{formatTnd(m)} TND</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 shrink-0 text-rose-600 hover:text-rose-700"
                    onClick={() => removeExtraMontantTnd(m)}
                  >
                    Retirer
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">Aucun montant ajouté.</p>
          )}
          <p className="text-[11px] text-slate-400">
            Pour « modifier » une entrée ajoutée, retirez-la puis saisissez la nouvelle valeur.
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200/80 pt-2 sm:flex-row sm:flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={onReset}
          >
            Réinitialiser les personnalisations
          </Button>
        </div>
      </div>
    </details>
  );
}
