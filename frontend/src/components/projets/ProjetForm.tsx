import * as Tabs from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { BatteryCharging, Droplets, Shapes, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  useFieldArray,
  useForm,
  useWatch,
  type FieldPath,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import { Link } from "react-router-dom";
import { fetchCommercials } from "@/api/users.api";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  OPTIONS_ETAT_DOSSIER,
  OPTIONS_TYPE_PROJET,
  OPTIONS_APPROBATION_COMMERCIALE,
  OPTIONS_APPROBATION_TECHNIQUE,
  OPTIONS_MODE_PAIEMENT,
  OPTIONS_EXECUTION_INSTALLATION,
  OPTIONS_PROCES_VERBAL,
  OPTIONS_RECEPTION,
  OPTIONS_SAISIE_PROSOL,
  OPTIONS_SAISIE_SUBVENTION,
  OPTIONS_DEBLOCAGE_PROSOL,
  OPTIONS_DEBLOCAGE_SUBVENTION,
  MAX_ECHEANCES,
  AGENT_COMMERCIAL_AUTRE_VALUE,
} from "@/utils/constants";
import { useCatalogLists } from "@/hooks/useCatalogLists";
import { useAuthStore } from "@/store/authStore";
import {
  computeResteAPayerDisplay,
  computeMontantAutofinancementDisplay,
  computeReglementClientDisplay,
  sumEcheancesMontants,
} from "@/utils/financeFormCalculations";
import {
  formatCommercialDisplayName,
  formatDecimalExcel3,
  formatTnd,
  libelleAvecColonInsecable,
} from "@/utils/formatters";
import type { Projet } from "@/types/projet.types";
import type { TypeContrat, TypeProjet } from "@/types/projet.types";
import {
  emptyEcheanceFormRow,
  formValuesToApiPayload,
  libelleDeblocageOnglet,
  projetToFormValues,
  TITRE_ONGLET_SUIVI_DOSSIER,
  type ProjetFormValues,
} from "./projetFormUtils";
import { CatalogListsEditor } from "./CatalogListsEditor";
import { cn } from "@/lib/utils";
import {
  registerMontantExcel3,
  setValueAsUpperFr,
} from "@/utils/formInputTransforms";

function EcheanceTableRow({
  index,
  displayNum,
  register,
  watch,
  montantRegister,
  onRemove,
  canRemove,
}: {
  index: number;
  displayNum: number;
  register: UseFormRegister<ProjetFormValues>;
  watch: UseFormWatch<ProjetFormValues>;
  montantRegister: ReturnType<
    typeof registerMontantExcel3<ProjetFormValues>
  >;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const modeKey = `echeances.${index}.modePaiement` as const;
  const mode = watch(modeKey);
  const modeList = OPTIONS_MODE_PAIEMENT as readonly string[];
  const modeHorsListe =
    mode && !modeList.includes(mode) ? mode : null;
  return (
    <tr className="border-t">
      <td className="p-2 align-top font-medium text-slate-700">
        {displayNum}
      </td>
      <td className="min-w-[11rem] p-2 align-top">
        <select
          className="h-10 w-full rounded-lg border border-slate-200 bg-white px-2 text-sm"
          {...register(modeKey)}
        >
          <option value=""></option>
          {OPTIONS_MODE_PAIEMENT.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
          {modeHorsListe ? (
            <option value={modeHorsListe}>
              {modeHorsListe} (hors liste)
            </option>
          ) : null}
        </select>
      </td>
      <td className="min-w-[8rem] p-2 align-top">
        <Input {...montantRegister} />
      </td>
      <td className="min-w-[9rem] p-2 align-top">
        <DateInput {...register(`echeances.${index}.date`)} />
      </td>
      <td className="min-w-[12rem] p-2 align-top">
        <textarea
          rows={2}
          className={cn(
            "min-h-[4.5rem] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]"
          )}
          placeholder="Description…"
          {...register(`echeances.${index}.description`, {
            setValueAs: setValueAsUpperFr,
          })}
        />
      </td>
      <td className="w-px p-2 align-top">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="whitespace-nowrap text-slate-600"
          disabled={!canRemove}
          onClick={onRemove}
        >
          Retirer
        </Button>
      </td>
    </tr>
  );
}

function EcheanceMobileCard({
  index,
  displayNum,
  register,
  watch,
  montantRegister,
  onRemove,
  canRemove,
}: {
  index: number;
  displayNum: number;
  register: UseFormRegister<ProjetFormValues>;
  watch: UseFormWatch<ProjetFormValues>;
  montantRegister: ReturnType<
    typeof registerMontantExcel3<ProjetFormValues>
  >;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const modeKey = `echeances.${index}.modePaiement` as const;
  const mode = watch(modeKey);
  const modeList = OPTIONS_MODE_PAIEMENT as readonly string[];
  const modeHorsListe =
    mode && !modeList.includes(mode) ? mode : null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-800">Échéance {displayNum}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs text-slate-600"
          disabled={!canRemove}
          onClick={onRemove}
        >
          Retirer
        </Button>
      </div>
      <div className="grid gap-3">
        <Row label="Mode paiement">
          <select
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-2 text-sm"
            {...register(modeKey)}
          >
            <option value=""></option>
            {OPTIONS_MODE_PAIEMENT.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
            {modeHorsListe ? (
              <option value={modeHorsListe}>
                {modeHorsListe} (hors liste)
              </option>
            ) : null}
          </select>
        </Row>
        <Row label="Montant (TND)">
          <Input {...montantRegister} />
        </Row>
        <Row label="Date">
          <DateInput {...register(`echeances.${index}.date`)} />
        </Row>
        <Row label="Description">
          <textarea
            rows={2}
            className={cn(
              "min-h-[4.5rem] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]"
            )}
            placeholder="Description…"
            {...register(`echeances.${index}.description`, {
              setValueAs: setValueAsUpperFr,
            })}
          />
        </Row>
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const labelAffiche = /\s*:\s*$/.test(label.trimEnd())
    ? libelleAvecColonInsecable(label)
    : label;
  return (
    <div className="space-y-1">
      <Label>{labelAffiche}</Label>
      {children}
    </div>
  );
}

function AgentCommercialField({
  register,
  watch,
  commercials,
  canAddCommercial,
}: {
  register: UseFormRegister<ProjetFormValues>;
  watch: UseFormWatch<ProjetFormValues>;
  commercials:
    | { id: string; prenom: string; nom: string }[]
    | undefined;
  canAddCommercial: boolean;
}) {
  const agentCommercialId = watch("agentCommercialId");
  const isAutre = agentCommercialId === AGENT_COMMERCIAL_AUTRE_VALUE;

  return (
    <Row label="Agent commercial">
      <div className="space-y-1.5">
        <select
          className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
          {...register("agentCommercialId")}
        >
          <option value=""></option>
          {commercials?.map((c) => (
            <option key={c.id} value={c.id}>
              {formatCommercialDisplayName(c)}
            </option>
          ))}
          <option value={AGENT_COMMERCIAL_AUTRE_VALUE}>Autre</option>
        </select>
        {isAutre ? (
          <Input
            className="uppercase"
            placeholder="Préciser (optionnel)"
            {...register("agentCommercialAutre", {
              setValueAs: setValueAsUpperFr,
            })}
          />
        ) : null}
        {canAddCommercial ? (
          <Link
            to="/utilisateurs?nouveau=commercial"
            className="inline-block text-xs font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            Ajouter un commercial…
          </Link>
        ) : null}
      </div>
    </Row>
  );
}

type GpsCoords = {
  lat: number;
  lng: number;
};

const TYPE_PROJET_CARD_LABEL: Record<string, string> = {
  PHOTOVOLTAIQUE_CLASSIQUE: "Couplé au réseau",
  ISOLE_AVEC_BATTERIES: "Isolé avec batteries",
  POMPAGE: "Pompage",
  AUTRE: "Autre",
};

function TypeProjetIcon({ typeKey }: { typeKey: string }) {
  if (typeKey === "ISOLE_AVEC_BATTERIES") return <BatteryCharging size={16} />;
  if (typeKey === "POMPAGE") return <Droplets size={16} />;
  if (typeKey === "AUTRE") return <Shapes size={16} />;
  return <Zap size={16} />;
}

function parseGpsCoords(raw: string | null | undefined): GpsCoords | null {
  const t = String(raw ?? "").trim();
  if (!t) return null;
  const m = t.match(/(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)/);
  if (!m) return null;
  const lat = Number(m[1]);
  const lng = Number(m[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

function buildTypeProjetReference(type: "POMPAGE" | "ISOLE_AVEC_BATTERIES" | "AUTRE"): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const prefix = type === "POMPAGE" ? "PMP" : type === "ISOLE_AVEC_BATTERIES" ? "ISB" : "AUT";
  return `${prefix}-${y}${m}${day}-${hh}${mm}${ss}`;
}


export function ProjetForm({
  initial,
  forcedTypeProjet,
  forcedContratAchat,
  forcedConditionSubvention,
  onSubmit,
  submitting,
}: {
  initial?: Projet | null;
  forcedTypeProjet?: TypeProjet;
  forcedContratAchat?: TypeContrat;
  forcedConditionSubvention?: "OUI" | "NON";
  onSubmit: (data: Record<string, unknown>) => void;
  submitting?: boolean;
}) {
  const [showEcheancesMobile, setShowEcheancesMobile] = useState(true);
  const authRole = useAuthStore((s) => s.user?.role);
  const canAddCommercial =
    authRole === "SUPER_ADMIN" || authRole === "ADMIN";
  const { banqueOptions, districtOptions, montantFinancementOptions } = useCatalogLists();
  const { data: commercials } = useQuery({
    queryKey: ["commercials"],
    queryFn: fetchCommercials,
    staleTime: 0,
  });
  const form = useForm<ProjetFormValues>({
    defaultValues: projetToFormValues(initial),
  });
  const { register, handleSubmit, watch, setValue, control, reset } = form;
  const upper = { setValueAs: setValueAsUpperFr };
  const regMoney = (name: FieldPath<ProjetFormValues>) =>
    registerMontantExcel3(register, setValue, name);
  const regAdresseLieuImplantation = register("adresseLieuImplantation", upper);
  const regPresentePar = register("presentePar", upper);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "echeances",
  });

  const reglementClientW = useWatch({ control, name: "reglementClient" });
  const echeancesW = useWatch({ control, name: "echeances" });
  const nbModulesW = useWatch({ control, name: "nbModules" });
  const puUnitairePvW = useWatch({ control, name: "puUnitairePV" });
  const montantFinancementW = useWatch({ control, name: "montantFinancement" });
  const montantFactureW = useWatch({ control, name: "montantTTCFinal" });
  const montantAutofinancementW = useWatch({
    control,
    name: "montantAutofinancement",
  });
  const paiement1erFactureSTEGW = useWatch({
    control,
    name: "paiement1erFactureSTEG",
  });
  const fraisPoseCmptProsolW = useWatch({
    control,
    name: "fraisPoseCmptProsol",
  });
  const paiement2emeFactureSTEGW = useWatch({
    control,
    name: "paiement2emeFactureSTEG",
  });
  const fraisAugmentationCalibreW = useWatch({
    control,
    name: "fraisAugmentationCalibre",
  });
  const fraisMutationElecW = useWatch({ control, name: "fraisMutationElec" });
  const fraisMutationGazW = useWatch({ control, name: "fraisMutationGaz" });
  const fraisPassageMonoTriW = useWatch({
    control,
    name: "fraisPassageMonoTri",
  });
  const autresFraisW = useWatch({ control, name: "autresFrais" });
  const coordonneesGpsW = useWatch({ control, name: "coordonneesGps" });
  const typeProjetW = useWatch({ control, name: "typeProjet" });
  const contratAchatW = useWatch({ control, name: "contratAchat" });
  const conditionSubventionW = useWatch({ control, name: "conditionSubvention" });

  const totalEcheancesTnd = useMemo(
    () => sumEcheancesMontants(echeancesW ?? []),
    [echeancesW]
  );

  const resteCalcule = useMemo(
    () =>
      computeResteAPayerDisplay(
        reglementClientW ?? "",
        totalEcheancesTnd
      ),
    [reglementClientW, totalEcheancesTnd]
  );
  const montantAutofinancementCalcule = useMemo(
    () =>
      computeMontantAutofinancementDisplay(
        String(montantFactureW ?? ""),
        String(montantFinancementW ?? "")
      ),
    [montantFactureW, montantFinancementW]
  );

  useEffect(() => {
    setValue("resteAPayer", resteCalcule, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [resteCalcule, setValue]);

  useEffect(() => {
    const nbModules = Number.parseFloat(String(nbModulesW ?? "").replace(",", "."));
    const puUnitairePv = Number.parseFloat(
      String(puUnitairePvW ?? "").replace(",", ".")
    );
    if (!Number.isFinite(nbModules) || !Number.isFinite(puUnitairePv)) {
      setValue("puissanceInstallee", "", {
        shouldValidate: false,
        shouldDirty: false,
      });
      return;
    }
    const kw = (nbModules * puUnitairePv) / 1000;
    setValue("puissanceInstallee", formatDecimalExcel3(kw), {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [nbModulesW, puUnitairePvW, setValue]);

  useEffect(() => {
    setValue(
      "montantAutofinancement",
      montantAutofinancementCalcule,
      {
        shouldValidate: false,
        shouldDirty: false,
      }
    );
  }, [montantAutofinancementCalcule, setValue]);

  useEffect(() => {
    if (
      typeProjetW === "POMPAGE" ||
      typeProjetW === "ISOLE_AVEC_BATTERIES" ||
      typeProjetW === "AUTRE"
    ) {
      setValue("reglementClient", String(montantFactureW ?? ""), {
        shouldValidate: false,
        shouldDirty: false,
      });
      return;
    }
    setValue(
      "reglementClient",
      computeReglementClientDisplay({
        montantAutofinancement: String(montantAutofinancementW ?? ""),
        fraisPoseCmptProsol: String(fraisPoseCmptProsolW ?? ""),
        paiement1erFactureSTEG: String(paiement1erFactureSTEGW ?? ""),
        paiement2emeFactureSTEG: String(paiement2emeFactureSTEGW ?? ""),
        fraisAugmentationCalibre: String(fraisAugmentationCalibreW ?? ""),
        fraisMutationElec: String(fraisMutationElecW ?? ""),
        fraisMutationGaz: String(fraisMutationGazW ?? ""),
        fraisPassageMonoTri: String(fraisPassageMonoTriW ?? ""),
        autresFrais: String(autresFraisW ?? ""),
      }),
      {
        shouldValidate: false,
        shouldDirty: false,
      }
    );
  }, [
    typeProjetW,
    montantFactureW,
    montantAutofinancementW,
    fraisPoseCmptProsolW,
    paiement1erFactureSTEGW,
    paiement2emeFactureSTEGW,
    fraisAugmentationCalibreW,
    fraisMutationElecW,
    fraisMutationGazW,
    fraisPassageMonoTriW,
    autresFraisW,
    setValue,
  ]);

  useEffect(() => {
    reset(projetToFormValues(initial));
    // Recharger le formulaire quand on change de projet (id) ; pas à chaque re-render du parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- éviter reset si le parent repasse le même projet avec une nouvelle ref d’objet
  }, [initial?.id, reset]);

  useEffect(() => {
    if (!forcedTypeProjet) return;
    setValue("typeProjet", forcedTypeProjet, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [forcedTypeProjet, setValue]);

  useEffect(() => {
    if (!forcedContratAchat) return;
    setValue("contratAchat", forcedContratAchat, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [forcedContratAchat, setValue]);

  useEffect(() => {
    if (!forcedConditionSubvention) return;
    setValue("conditionSubvention", forcedConditionSubvention, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [forcedConditionSubvention, setValue]);

  const banqueW = useWatch({ control, name: "banque" });
  const banqueHorsListe = useMemo(() => {
    const cur = (banqueW ?? "").trim();
    if (!cur) return null;
    if (banqueOptions.some((b) => b === cur)) return null;
    return cur;
  }, [banqueW, banqueOptions]);

  const montantHorsListe = useMemo(() => {
    const cur = (montantFinancementW ?? "").trim();
    if (!cur) return null;
    if (
      montantFinancementOptions.some(
        (m) => String(m) === cur || formatDecimalExcel3(m) === cur
      )
    ) {
      return null;
    }
    return cur;
  }, [montantFinancementW, montantFinancementOptions]);

  const approCommerciale = watch("approbationCommerciale");
  const approCommercialeHorsListe = useMemo(() => {
    const cur = approCommerciale ?? "";
    if (!cur) return null;
    if (OPTIONS_APPROBATION_COMMERCIALE.some((o) => o.v === cur)) return null;
    return cur;
  }, [approCommerciale]);

  const approTechnique = watch("approbationTechnique");
  const approTechniqueHorsListe = useMemo(() => {
    const cur = approTechnique ?? "";
    if (!cur) return null;
    if (OPTIONS_APPROBATION_TECHNIQUE.some((o) => o.v === cur)) return null;
    return cur;
  }, [approTechnique]);

  const receptionVal = watch("reception");
  const receptionHorsListe = useMemo(() => {
    const cur = receptionVal ?? "";
    if (!cur) return null;
    if (OPTIONS_RECEPTION.some((x) => x === cur)) return null;
    return cur;
  }, [receptionVal]);
  const isPompage = typeProjetW === "POMPAGE";
  const isIsole = typeProjetW === "ISOLE_AVEC_BATTERIES";
  const isAutre = typeProjetW === "AUTRE";
  const isProsolAnmeConcerned =
    !isPompage &&
    !isIsole &&
    (contratAchatW === "PROGRAMME_PROSOL" ||
      contratAchatW === "HORS_PROGRAMME_PROSOL") &&
    (conditionSubventionW === "OUI" || conditionSubventionW === "NON");
  const isProgrammeProsolAnmeNon =
    !isPompage &&
    !isIsole &&
    contratAchatW === "PROGRAMME_PROSOL" &&
    conditionSubventionW === "NON";
  const isHorsProsolAnmeOui =
    !isPompage &&
    !isIsole &&
    contratAchatW === "HORS_PROGRAMME_PROSOL" &&
    conditionSubventionW === "OUI";
  const isHorsProsolAnmeNon =
    !isPompage &&
    !isIsole &&
    contratAchatW === "HORS_PROGRAMME_PROSOL" &&
    conditionSubventionW === "NON";
  const isEditMode = Boolean(initial?.id);
  const isCoupleReseau = typeProjetW === "PHOTOVOLTAIQUE_CLASSIQUE";
  const isTypeSimple = isPompage || isIsole || isAutre;
  const canEditContratAnme = isCoupleReseau && (isEditMode || !isProsolAnmeConcerned);
  const showRepartitionHint = isCoupleReseau && !isProsolAnmeConcerned;
  const dossierTabLabel =
    isProsolAnmeConcerned
      ? "Progression dossier"
      : isTypeSimple
      ? "Progression dossier"
      : "Dossier commercial";

  const deblocageTabLabel = libelleDeblocageOnglet(
    contratAchatW,
    conditionSubventionW
  );

  useEffect(() => {
    const type = isPompage
      ? "POMPAGE"
      : isIsole
        ? "ISOLE_AVEC_BATTERIES"
        : isAutre
          ? "AUTRE"
          : null;
    if (!type) return;
    const current = String(watch("reference") ?? "").trim();
    if (current) return;
    setValue("reference", buildTypeProjetReference(type), {
      shouldDirty: true,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [isPompage, isIsole, isAutre, setValue, watch]);

  const gpsMapsUrl = useMemo(() => {
    const coords = parseGpsCoords(coordonneesGpsW);
    if (!coords) return "";
    return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
  }, [coordonneesGpsW]);

  return (
    <form
      className="space-y-5 sm:space-y-6"
      onSubmit={handleSubmit((v) => onSubmit(formValuesToApiPayload(v)))}
    >
      <input type="hidden" {...register("codeBarres")} />
      <Tabs.Root defaultValue="1">
        <Tabs.List className="-mx-1 flex snap-x snap-mandatory gap-1 overflow-x-auto border-b border-slate-200 px-1 pb-2 [-webkit-overflow-scrolling:touch] sm:mx-0 sm:flex-wrap sm:gap-2 sm:px-0">
          {(
            isTypeSimple
              ? [
                  ["1", "Informations client"],
                  ["2", dossierTabLabel],
                  ["3", "Installation"],
                  ["5", "Devis / Facture"],
                ]
              : isProsolAnmeConcerned
                ? [
                    ["1", "Informations client"],
                    ["3", "Installation"],
                    ["5", "Devis / Facture"],
                    ["2", dossierTabLabel],
                    ...(!isHorsProsolAnmeNon
                      ? [["4", TITRE_ONGLET_SUIVI_DOSSIER] as const]
                      : []),
                  ]
              : [
                  ["1", "Informations client"],
                  ["2", dossierTabLabel],
                  ["3", "Installation"],
                  ["4", TITRE_ONGLET_SUIVI_DOSSIER],
                  ["5", "Facturation"],
                ]
          ).map(([v, l]) => (
            <Tabs.Trigger
              key={v}
              value={v}
              className="shrink-0 snap-start rounded-lg border border-transparent px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors data-[state=active]:border-emerald-200 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900 sm:px-3 sm:py-2 sm:text-sm"
            >
              {l}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {showRepartitionHint ? (
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            La nouvelle répartition des onglets s’applique après renseignement du
            contrat d’achat et de la subvention ANME.
          </div>
        ) : null}

        <Tabs.Content value="1" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {!forcedTypeProjet ? (
              isProsolAnmeConcerned ? (
                <input type="hidden" {...register("typeProjet")} />
              ) : (
                <div className="md:col-span-2">
                  <Row label="Type de projet">
                    <input type="hidden" {...register("typeProjet")} />
                    <div
                      role="radiogroup"
                      aria-label="Type de projet"
                      className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                    >
                      {OPTIONS_TYPE_PROJET.map((o) => {
                        const selected =
                          (typeProjetW ?? "PHOTOVOLTAIQUE_CLASSIQUE") === o.v;
                        return (
                          <button
                            key={o.v}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() =>
                              setValue("typeProjet", o.v, {
                                shouldDirty: true,
                                shouldTouch: true,
                              })
                            }
                            className={cn(
                              "flex h-14 items-center justify-between gap-2 rounded-lg border bg-slate-100 px-3 text-left text-sm font-medium text-slate-700 transition sm:h-16 sm:flex-col sm:justify-center sm:gap-1 sm:px-2 sm:text-center sm:text-xs",
                              selected
                                ? "border-[#0081c4] bg-sky-50 text-[#006aa3] shadow-sm"
                                : "border-slate-300 hover:border-slate-400"
                            )}
                          >
                          <TypeProjetIcon typeKey={o.v} />
                            <span>{TYPE_PROJET_CARD_LABEL[o.v] ?? o.l}</span>
                          </button>
                        );
                      })}
                    </div>
                  </Row>
                </div>
              )
            ) : (
              isProsolAnmeConcerned ? (
                <input type="hidden" {...register("typeProjet")} />
              ) : (
                <div className="md:col-span-2">
                  <Row label="Type de projet">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                      {TYPE_PROJET_CARD_LABEL[forcedTypeProjet]}
                    </div>
                    <input type="hidden" {...register("typeProjet")} />
                  </Row>
                </div>
              )
            )}
            {!isTypeSimple ? (
              <Row label="Référence *">
                <Input {...register("reference", { required: true, ...upper })} />
              </Row>
            ) : (
              <input type="hidden" {...register("reference", { required: true, ...upper })} />
            )}
            <Row
              label={
                isTypeSimple
                  ? "Client *"
                  : typeProjetW === "PHOTOVOLTAIQUE_CLASSIQUE"
                    ? "Nom & prénom (abonné) *"
                    : "Nom & prénom (abonné/client) *"
              }
            >
              <Input
                className="uppercase"
                autoComplete="name"
                {...register("abonnes", { required: true, ...upper })}
              />
            </Row>
            {canEditContratAnme ? (
              <>
                <Row label="Contrat d’achat">
                  <select
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                    {...register("contratAchat")}
                  >
                    <option value=""></option>
                    <option value="PROGRAMME_PROSOL">Programme Prosol</option>
                    <option value="HORS_PROGRAMME_PROSOL">
                      Hors Programme Prosol
                    </option>
                  </select>
                </Row>
                <Row label="Subvention ANME">
                  <select
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                    {...register("conditionSubvention")}
                  >
                    <option value=""></option>
                    <option value="OUI">Oui</option>
                    <option value="NON">Non</option>
                  </select>
                </Row>
              </>
            ) : null}
            {isPompage ? (
              <>
                <Row label="Présenté par">
                  <Input
                    className="uppercase"
                    {...regPresentePar}
                    placeholder="Nom ou structure"
                  />
                </Row>
                <Row label="N° CIN">
                  <Input {...register("cin", upper)} />
                </Row>
                <Row label="MF (matricule fiscal)">
                  <Input {...register("mf", upper)} placeholder="Matricule fiscal" />
                </Row>
                <Row label="Adresse / lieu d’implantation">
                  <Input
                    className="uppercase"
                    {...regAdresseLieuImplantation}
                  />
                </Row>
                <Row label="Contact">
                  <Input {...register("contact", upper)} />
                </Row>
                <Row label="Adresse e-mail">
                  <Input
                    type="email"
                    placeholder="exemple@domaine.com"
                    {...register("email")}
                  />
                </Row>
                <Row label="Coordonnées GPS">
                  <div className="space-y-1.5">
                    <Input
                      placeholder="36.8065, 10.1815"
                      {...register("coordonneesGps")}
                    />
                    <div className="flex flex-wrap gap-2">
                      {gpsMapsUrl ? (
                        <Button type="button" variant="outline" size="sm" asChild>
                          <a href={gpsMapsUrl} target="_blank" rel="noreferrer">
                            Ouvrir dans Maps
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Row>
              </>
            ) : isIsole ? (
              <>
                <Row label="Présenté par">
                  <Input
                    className="uppercase"
                    {...regPresentePar}
                    placeholder="Nom ou structure"
                  />
                </Row>
                <Row label="N° CIN">
                  <Input {...register("cin", upper)} />
                </Row>
                <Row label="MF (matricule fiscal)">
                  <Input {...register("mf", upper)} placeholder="Matricule fiscal" />
                </Row>
                <Row label="Adresse / lieu d’implantation">
                  <Input
                    className="uppercase"
                    {...regAdresseLieuImplantation}
                  />
                </Row>
                <Row label="Contact">
                  <Input {...register("contact", upper)} />
                </Row>
                <Row label="Adresse e-mail">
                  <Input
                    type="email"
                    placeholder="exemple@domaine.com"
                    {...register("email")}
                  />
                </Row>
                <Row label="Coordonnées GPS">
                  <div className="space-y-1.5">
                    <Input
                      placeholder="36.8065, 10.1815"
                      {...register("coordonneesGps")}
                    />
                    <div className="flex flex-wrap gap-2">
                      {gpsMapsUrl ? (
                        <Button type="button" variant="outline" size="sm" asChild>
                          <a href={gpsMapsUrl} target="_blank" rel="noreferrer">
                            Ouvrir dans Maps
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Row>
              </>
            ) : (
              <>
                <Row label="Présenté par">
                  <Input
                    className="uppercase"
                    {...regPresentePar}
                    placeholder="Nom ou structure"
                  />
                </Row>
                <Row label="N° CIN">
                  <Input {...register("cin", upper)} />
                </Row>
                <Row label="MF (matricule fiscal)">
                  <Input {...register("mf", upper)} placeholder="Matricule fiscal" />
                </Row>
                <Row label="Adresse / lieu d’implantation">
                  <Input
                    className="uppercase"
                    {...regAdresseLieuImplantation}
                  />
                </Row>
                <Row label="Contact">
                  <Input {...register("contact", upper)} />
                </Row>
                <Row label="Adresse e-mail">
                  <Input
                    type="email"
                    placeholder="exemple@domaine.com"
                    {...register("email")}
                  />
                </Row>
                {isCoupleReseau ? (
                  <Row label="District">
                    <select
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                      {...register("district")}
                    >
                      <option value=""></option>
                      {districtOptions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </Row>
                ) : null}
                <Row label="Coordonnées GPS">
                  <div className="space-y-1.5">
                    <Input
                      placeholder="36.8065, 10.1815"
                      {...register("coordonneesGps")}
                    />
                    <div className="flex flex-wrap gap-2">
                      {gpsMapsUrl ? (
                        <Button type="button" variant="outline" size="sm" asChild>
                          <a href={gpsMapsUrl} target="_blank" rel="noreferrer">
                            Ouvrir dans Maps
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Row>
              </>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content value="2" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {isProsolAnmeConcerned ? (
              <div className="md:col-span-2" lang="fr">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Dates du dossier
                </h3>
                <p className="mb-3 text-xs text-slate-500">
                  Utilisez le calendrier pour chaque date (comme sur le tableau Excel).
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Row label="Date d'installation">
                    <DateInput {...register("dateInstallation")} />
                  </Row>
                  <Row label="Date dépôt de demande MES">
                    <DateInput {...register("dateDepotDemandeMES")} />
                  </Row>
                  <Row label="Date dépôt dossier">
                    <DateInput {...register("dateDepotDossier")} />
                  </Row>
                  <Row label="Date approbation">
                    <DateInput {...register("dateApprobation")} />
                  </Row>
                  <Row label="Date MES">
                    <DateInput {...register("dateMES")} />
                  </Row>
                  <Row label="Date de réception">
                    <DateInput {...register("dateReception")} />
                  </Row>
                  <Row label="Date de paiement pose compteur Prosol">
                    <DateInput {...register("datePaiementPoseCompteurProsol")} />
                  </Row>
                </div>
              </div>
            ) : null}
            {!isTypeSimple ? (
              <Row label="N° police">
                <Input {...register("nPolice", upper)} />
              </Row>
            ) : null}
            <Row label="État du dossier">
              <select
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                {...register("etatDossier")}
              >
                {OPTIONS_ETAT_DOSSIER.map((o) => (
                  <option key={o.v} value={o.v}>
                    {o.l}
                  </option>
                ))}
              </select>
            </Row>
            {!isTypeSimple && (
              <Row label="Approbation commerciale">
                <select
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  {...register("approbationCommerciale")}
                >
                  <option value=""></option>
                  {OPTIONS_APPROBATION_COMMERCIALE.map((o) => (
                    <option key={o.v} value={o.v}>
                      {o.l}
                    </option>
                  ))}
                  {approCommercialeHorsListe != null ? (
                    <option value={approCommercialeHorsListe}>
                      {approCommercialeHorsListe} (hors liste Excel)
                    </option>
                  ) : null}
                </select>
              </Row>
            )}
            {!isTypeSimple && (
              <Row label="Approbation technique">
                <select
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  {...register("approbationTechnique")}
                >
                  <option value=""></option>
                  {OPTIONS_APPROBATION_TECHNIQUE.map((o) => (
                    <option key={o.v} value={o.v}>
                      {o.l}
                    </option>
                  ))}
                  {approTechniqueHorsListe != null ? (
                    <option value={approTechniqueHorsListe}>
                      {approTechniqueHorsListe} (hors liste Excel)
                    </option>
                  ) : null}
                </select>
              </Row>
            )}
            <Row label="Exécution installation">
              <select
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                {...register("executionInstallation")}
              >
                <option value=""></option>
                {OPTIONS_EXECUTION_INSTALLATION.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </Row>
            {isTypeSimple && (
              <Row label="Date d'exécution d'installation">
                <DateInput {...register("dateInstallation")} />
              </Row>
            )}
            {!isTypeSimple && (
              <Row label="Réception">
                <select
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  {...register("reception")}
                >
                  <option value=""></option>
                  {OPTIONS_RECEPTION.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                  {receptionHorsListe != null ? (
                    <option value={receptionHorsListe}>
                      {receptionHorsListe} (hors liste Excel)
                    </option>
                  ) : null}
                </select>
              </Row>
            )}
            {!isTypeSimple && (
              <Row label="Procès-verbal">
                <select
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  {...register("procesVerbal")}
                >
                  <option value=""></option>
                  {OPTIONS_PROCES_VERBAL.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </Row>
            )}
            {!isProsolAnmeConcerned && (
              <AgentCommercialField
                register={register}
                watch={watch}
                commercials={commercials}
                canAddCommercial={canAddCommercial}
              />
            )}
            {!isTypeSimple && !isProsolAnmeConcerned && (
              <Row label="Taux d’intérêt (%)">
                <Input
                  {...regMoney("tauxInteret")}
                  placeholder="ex. 7,5"
                  inputMode="decimal"
                />
              </Row>
            )}
            {!isTypeSimple && !isProsolAnmeConcerned && (
              <Row label="Banque">
                <select
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  {...register("banque")}
                >
                  <option value=""></option>
                  {banqueOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                  {banqueHorsListe != null ? (
                    <option value={banqueHorsListe}>
                      {banqueHorsListe} (hors liste)
                    </option>
                  ) : null}
                </select>
              </Row>
            )}
            {!isProsolAnmeConcerned ? (
              <Row label="Commentaire">
                <Input {...register("commentaire", upper)} />
              </Row>
            ) : null}
          </div>
        </Tabs.Content>

        <Tabs.Content value="3" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {isProsolAnmeConcerned ? (
              <div className="md:col-span-2">
                <Row label="Commentaire">
                  <Input {...register("commentaire", upper)} />
                </Row>
              </div>
            ) : null}
            {isPompage ? (
              <>
                <Row label="Puissance pompe (CV)">
                  <Input {...register("puissanceSouscrite", upper)} />
                </Row>
                <Row label="Marque variateur">
                  <Input {...register("marqueOnd", upper)} />
                </Row>
                <Row label="Modèle variateur solaire">
                  <Input {...register("modeleOnd", upper)} />
                </Row>
                <Row label="Marque PV">
                  <Input {...register("marquePV", upper)} />
                </Row>
                <Row label="Modèle PV">
                  <Input {...register("modelePV", upper)} />
                </Row>
                <Row label="Puissance unité PV (W)">
                  <Input {...regMoney("puUnitairePV")} />
                </Row>
                <Row label="NB PV utilisé">
                  <Input {...register("nbModules")} />
                </Row>
                <Row label="Puissance à installer (KWC)">
                  <Input
                    {...regMoney("puissanceInstallee")}
                    readOnly
                    className="bg-slate-50"
                  />
                </Row>
                <Row label="Équipement (sur mesure)">
                  <textarea
                    rows={4}
                    className={cn(
                      "min-h-[7rem] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]"
                    )}
                    placeholder="Décrivez les équipements, références, quantités, options..."
                    {...register("equipementSurMesure", upper)}
                  />
                </Row>
                <Row label="Intervention (sur mesure)">
                  <textarea
                    rows={4}
                    className={cn(
                      "min-h-[7rem] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]"
                    )}
                    placeholder="Détaillez les interventions prévues, étapes et remarques..."
                    {...register("interventionSurMesure", upper)}
                  />
                </Row>
              </>
            ) : (
              <>
                <Row label={isIsole ? "Puissance à installer (KWC)" : "Puissance installée (kW)"}>
                  <Input
                    {...regMoney("puissanceInstallee")}
                    readOnly
                    className="bg-slate-50"
                  />
                </Row>

                {isIsole && (
                  <Row label="Énergie journalière total (Wh/j)">
                    <Input {...register("productionPrevisionnelle", upper)} />
                  </Row>
                )}

                {isCoupleReseau && (
                  <>
                    <Row label="Type compteur">
                      <select
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                        {...register("typeCompteur")}
                      >
                        <option value=""></option>
                        <option value="MONOPHASE">Monophasé</option>
                        <option value="TRIPHASE">Triphasé</option>
                      </select>
                    </Row>
                    <Row label="N° de compteur">
                      <Input {...register("numeroCompteur", upper)} />
                    </Row>
                    <Row label="Calibre disjoncteur de branchement">
                      <Input {...register("calibreDisjoncteur", upper)} />
                    </Row>
                    <Row label="Puissance souscrite">
                      <Input {...register("puissanceSouscrite", upper)} />
                    </Row>
                    <Row label="Production prévisionnelle">
                      <Input {...register("productionPrevisionnelle", upper)} />
                    </Row>
                    <Row label="Consommation annuelle (kWh/an)">
                      <Input {...register("consommationAnnuelle", upper)} />
                    </Row>
                  </>
                )}

                <Row label={isIsole ? "NB PV utilisé" : "Nb modules"}>
                  <Input {...register("nbModules")} />
                </Row>
                <Row label="Puissance unité PV (W)">
                  <Input {...regMoney("puUnitairePV")} />
                </Row>
                <Row label="Marque PV">
                  <Input {...register("marquePV", upper)} />
                </Row>
                <Row label="Modèle PV">
                  <Input {...register("modelePV", upper)} />
                </Row>

                {isTypeSimple && !isIsole ? (
                  <>
                    <Row label="Équipement (sur mesure)">
                      <textarea
                        rows={4}
                        className={cn(
                          "min-h-[7rem] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]"
                        )}
                        placeholder="Décrivez les équipements, références, quantités, options..."
                        {...register("equipementSurMesure", upper)}
                      />
                    </Row>
                    <Row label="Intervention (sur mesure)">
                      <textarea
                        rows={4}
                        className={cn(
                          "min-h-[7rem] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]"
                        )}
                        placeholder="Détaillez les interventions prévues, étapes et remarques..."
                        {...register("interventionSurMesure", upper)}
                      />
                    </Row>
                  </>
                ) : null}

                {isIsole ? (
                  <>
                    <Row label="Marque batteries">
                      <Input {...register("marqueOnd", upper)} />
                    </Row>
                    <Row label="Modèle batteries">
                      <Input {...register("modeleOnd", upper)} />
                    </Row>
                    <Row label="NB batteries utilisé">
                      <Input {...register("nbOnduleurs")} />
                    </Row>
                    <Row label="Marque onduleur hybride">
                      <Input {...register("autreModeleOnd", upper)} />
                    </Row>
                    <Row label="Modèle onduleur hybride">
                      <Input {...register("numeroCompteur", upper)} />
                    </Row>
                    <Row label="Puissance onduleur hybride">
                      <Input {...regMoney("puUnitaireOnd")} />
                    </Row>
                  </>
                ) : isCoupleReseau ? (
                  <>
                    <Row label="Nb onduleurs">
                      <Input {...register("nbOnduleurs")} />
                    </Row>
                    <Row label="Puissance unité onduleur (W)">
                      <Input {...regMoney("puUnitaireOnd")} />
                    </Row>
                    <Row label="Marque OND">
                      <Input {...register("marqueOnd", upper)} />
                    </Row>
                    <Row label="Modèle OND">
                      <Input {...register("modeleOnd", upper)} />
                    </Row>
                    <Row label="PU OND si autre modèle (W)">
                      <Input {...regMoney("puOndSiAutreW")} />
                    </Row>
                    <Row label="Autre modèle OND">
                      <Input {...register("autreModeleOnd", upper)} />
                    </Row>
                  </>
                ) : null}

                {isIsole ? (
                  <>
                    <Row label="Équipement (sur mesure)">
                      <textarea
                        rows={4}
                        className={cn(
                          "min-h-[7rem] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]"
                        )}
                        placeholder="Décrivez les équipements, références, quantités, options..."
                        {...register("equipementSurMesure", upper)}
                      />
                    </Row>
                    <Row label="Intervention (sur mesure)">
                      <textarea
                        rows={4}
                        className={cn(
                          "min-h-[7rem] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]"
                        )}
                        placeholder="Détaillez les interventions prévues, étapes et remarques..."
                        {...register("interventionSurMesure", upper)}
                      />
                    </Row>
                  </>
                ) : null}
              </>
            )}
          </div>
        </Tabs.Content>

        {!isTypeSimple && !isHorsProsolAnmeNon && (
          <Tabs.Content value="4" className="mt-4 space-y-6">
            {!isProsolAnmeConcerned ? (
              <div lang="fr">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Dates du dossier
                </h3>
                <p className="mb-3 text-xs text-slate-500">
                  Utilisez le calendrier pour chaque date (comme sur le tableau Excel).
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Row label="Date d'installation">
                    <DateInput {...register("dateInstallation")} />
                  </Row>
                  <Row label="Date dépôt de demande MES">
                    <DateInput {...register("dateDepotDemandeMES")} />
                  </Row>
                  <Row label="Date dépôt dossier">
                    <DateInput {...register("dateDepotDossier")} />
                  </Row>
                  <Row label="Date approbation">
                    <DateInput {...register("dateApprobation")} />
                  </Row>
                  <Row label="Date MES">
                    <DateInput {...register("dateMES")} />
                  </Row>
                </div>
              </div>
            ) : null}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-800">
                {deblocageTabLabel}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {!isTypeSimple ? (
                  <input type="hidden" {...register("contratAchat")} />
                ) : null}
                {isProsolAnmeConcerned && !isHorsProsolAnmeOui ? (
                  <Row label="Taux d’intérêt (%)">
                    <Input
                      {...regMoney("tauxInteret")}
                      placeholder="ex. 7,5"
                      inputMode="decimal"
                    />
                  </Row>
                ) : null}
                {isProsolAnmeConcerned && !isHorsProsolAnmeOui ? (
                  <Row label="Banque">
                    <select
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                      {...register("banque")}
                    >
                      <option value=""></option>
                      {banqueOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                      {banqueHorsListe != null ? (
                        <option value={banqueHorsListe}>
                          {banqueHorsListe} (hors liste)
                        </option>
                      ) : null}
                    </select>
                  </Row>
                ) : null}
                {isProsolAnmeConcerned && !isProgrammeProsolAnmeNon ? (
                  <Row label="Montant subvention">
                    <Input
                      inputMode="decimal"
                      placeholder="0,000"
                      {...regMoney("subventionDemandee")}
                    />
                  </Row>
                ) : null}
                {isProsolAnmeConcerned ? (
                  <Row label="Commentaire">
                    <Input {...register("commentaire", upper)} />
                  </Row>
                ) : null}
                {!isHorsProsolAnmeOui ? (
                  <Row label="N° LOT déblocage Prosol">
                    <Input {...register("nLotDebProsol", upper)} />
                  </Row>
                ) : null}
                {!isHorsProsolAnmeOui ? (
                  <Row label="Saisie Prosol">
                    <select
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                      {...register("saisieProsol")}
                    >
                      <option value=""></option>
                      {OPTIONS_SAISIE_PROSOL.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </Row>
                ) : null}
                {!isProgrammeProsolAnmeNon ? (
                  <Row label="N° lot déblocage subvention">
                    <Input {...register("nLotDeblocageSubvention", upper)} />
                  </Row>
                ) : null}
                {!isHorsProsolAnmeOui ? (
                  <Row label="Déblocage Prosol">
                    <select
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                      {...register("deblocageProsol")}
                    >
                      <option value=""></option>
                      {OPTIONS_DEBLOCAGE_PROSOL.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </Row>
                ) : null}
                {!isProgrammeProsolAnmeNon ? (
                  <Row label="Saisie subvention">
                    <select
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                      {...register("saisieSubvention")}
                    >
                      <option value=""></option>
                      {OPTIONS_SAISIE_SUBVENTION.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </Row>
                ) : null}
                {!isProgrammeProsolAnmeNon ? (
                  <Row label="Déblocage subvention">
                    <select
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                      {...register("deblocageSubvention")}
                    >
                      <option value=""></option>
                      {OPTIONS_DEBLOCAGE_SUBVENTION.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </Row>
                ) : null}
              </div>
            </div>
          </Tabs.Content>
        )}

        <Tabs.Content value="5" className="mt-4 space-y-6">
          {isTypeSimple ? (
            <div className="grid gap-4 md:grid-cols-2">
              <input type="hidden" {...regMoney("reglementClient")} />
              <Row label="N° devis">
                <Input {...register("nDevis", upper)} />
              </Row>
              <Row label="Date devis">
                <DateInput {...register("dateDevis")} />
              </Row>
              <Row label="N° facture">
                <Input {...register("nFacture", upper)} />
              </Row>
              <Row label="Date facture">
                <DateInput {...register("dateFacture")} />
              </Row>
              <Row label="Montant devis">
                <Input {...regMoney("montantTTC")} />
              </Row>
              <Row label="Montant facture">
                <Input {...regMoney("montantTTCFinal")} />
              </Row>
              <Row label="Montant TND (financement)">
                <select
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  {...register("montantFinancement")}
                >
                  <option value=""></option>
                  {montantFinancementOptions.map((m) => (
                    <option key={m} value={formatDecimalExcel3(m)}>
                      {formatTnd(m)} TND
                    </option>
                  ))}
                  {montantHorsListe != null ? (
                    <option value={montantHorsListe}>
                      {formatTnd(montantHorsListe)} TND
                    </option>
                  ) : null}
                </select>
              </Row>
              <Row label="Reste à payer (calculé)">
                <input type="hidden" {...register("resteAPayer")} />
                <div className="flex min-h-10 items-center rounded-lg border border-sky-100 bg-gradient-to-r from-sky-50/90 to-orange-50/80 px-3 text-sm font-semibold text-slate-900">
                  {resteCalcule ? (
                    <>
                      {resteCalcule}
                      <span className="ml-1 font-normal text-slate-600">TND</span>
                    </>
                  ) : (
                    <span className="font-normal text-slate-500">
                      Saisir le montant facture et/ou des montants d’échéance
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Calcul : Montant facture − somme des montants des lignes d’échéances.
                </p>
              </Row>
            </div>
          ) : (
            <>
              <div lang="fr">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Devis & facture · dates
                </h3>
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <Row label="Date devis">
                    <DateInput {...register("dateDevis")} />
                  </Row>
                  <Row label="Date facture">
                    <DateInput {...register("dateFacture")} />
                  </Row>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {isProsolAnmeConcerned ? (
                  <AgentCommercialField
                    register={register}
                    watch={watch}
                    commercials={commercials}
                    canAddCommercial={canAddCommercial}
                  />
                ) : null}
                <Row label="N° devis">
                  <Input {...register("nDevis", upper)} />
                </Row>
                <Row label="N° facture">
                  <Input {...register("nFacture", upper)} />
                </Row>
                <Row label="Montant devis">
                  <Input {...regMoney("montantTTC")} />
                </Row>
                <Row label="Montant facture">
                  <Input {...regMoney("montantTTCFinal")} />
                </Row>
                <Row label="Montant TND (financement)">
                  <select
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                    {...register("montantFinancement")}
                  >
                    <option value=""></option>
                    {montantFinancementOptions.map((m) => (
                      <option key={m} value={formatDecimalExcel3(m)}>
                        {formatTnd(m)} TND
                      </option>
                    ))}
                    {montantHorsListe != null ? (
                      <option value={montantHorsListe}>
                        {formatTnd(montantHorsListe)} TND
                      </option>
                    ) : null}
                  </select>
                </Row>
                <Row label="Montant autofinancement">
                  <input type="hidden" {...register("montantAutofinancement")} />
                  <div className="flex min-h-10 items-center rounded-lg border border-slate-100 bg-slate-50 px-3 text-sm font-medium text-slate-900">
                    {montantAutofinancementCalcule || "0,000"}
                  </div>
                </Row>
                <Row label="Frais pose compteur Prosol">
                  <Input
                    inputMode="decimal"
                    placeholder="0,000"
                    {...regMoney("fraisPoseCmptProsol")}
                  />
                </Row>
                <Row label="Paiement facture STEG">
                  <Input
                    inputMode="decimal"
                    placeholder="0,000"
                    {...regMoney("paiement1erFactureSTEG")}
                  />
                </Row>
                <Row label="Frais bureau de contrôle">
                  <Input
                    inputMode="decimal"
                    placeholder="0,000"
                    {...regMoney("paiement2emeFactureSTEG")}
                  />
                </Row>
                <Row label="Frais augmentation calibre">
                  <Input {...regMoney("fraisAugmentationCalibre")} />
                </Row>
                <Row label="Frais mutation élec">
                  <Input {...regMoney("fraisMutationElec")} />
                </Row>
                <Row label="Frais mutation gaz">
                  <Input {...regMoney("fraisMutationGaz")} />
                </Row>
                <Row label="Frais passage mono → tri">
                  <Input {...regMoney("fraisPassageMonoTri")} />
                </Row>
                <Row label="Autres frais">
                  <Input {...regMoney("autresFrais")} />
                </Row>
                <Row label="Règlement client">
                  <Input
                    {...regMoney("reglementClient")}
                    readOnly
                    className="bg-slate-50"
                  />
                </Row>
                {!isProsolAnmeConcerned ? (
                  <Row label="Subvention demandée">
                    <Input {...regMoney("subventionDemandee")} />
                  </Row>
                ) : null}
                <Row label="Reste à payer (calculé)">
                  <input type="hidden" {...register("resteAPayer")} />
                  <div className="flex min-h-10 items-center rounded-lg border border-sky-100 bg-gradient-to-r from-sky-50/90 to-orange-50/80 px-3 text-sm font-semibold text-slate-900">
                    {resteCalcule ? (
                      <>
                        {resteCalcule}
                        <span className="ml-1 font-normal text-slate-600">TND</span>
                      </>
                    ) : (
                      <span className="font-normal text-slate-500">
                        Saisir le règlement client et/ou des montants d’échéance
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Même logique qu’Excel : Règlement client − somme des montants des lignes
                    d’échéances (équivalent Montant Échéance 1 + … + 10). Le résultat peut être négatif.
                  </p>
                </Row>
              </div>
            </>
          )}
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-medium text-slate-800">
                Échéances ({fields.length})
              </h3>
              <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full sm:hidden"
                  onClick={() => setShowEcheancesMobile((s) => !s)}
                >
                  {showEcheancesMobile ? "Masquer les lignes" : "Afficher les lignes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  disabled={fields.length >= MAX_ECHEANCES}
                  onClick={() => append(emptyEcheanceFormRow())}
                >
                  Ajouter une échéance
                </Button>
              </div>
            </div>
            <p className="mb-2 text-xs text-slate-500">
              Jusqu’à {MAX_ECHEANCES} échéances. Les numéros envoyés à l’API sont
              recalculés (1, 2, 3…) à partir des lignes non vides.
            </p>
            {showEcheancesMobile ? (
              <div className="space-y-3 sm:hidden">
                {fields.map((field, index) => (
                  <EcheanceMobileCard
                    key={field.id}
                    index={index}
                    displayNum={index + 1}
                    register={register}
                    watch={watch}
                    montantRegister={registerMontantExcel3(
                      register,
                      setValue,
                      `echeances.${index}.montant`
                    )}
                    onRemove={() => remove(index)}
                    canRemove={fields.length > 1}
                  />
                ))}
              </div>
            ) : null}
            <div className="hidden -mx-1 overflow-x-auto rounded-lg border border-slate-200 sm:mx-0 sm:block">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Mode paiement</th>
                    <th className="p-2 text-left">Montant (TND)</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left" aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <EcheanceTableRow
                      key={field.id}
                      index={index}
                      displayNum={index + 1}
                      register={register}
                      watch={watch}
                      montantRegister={registerMontantExcel3(
                        register,
                        setValue,
                        `echeances.${index}.montant`
                      )}
                      onRemove={() => remove(index)}
                      canRemove={fields.length > 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {totalEcheancesTnd > 0 ? (
              <p className="mt-2 text-xs text-slate-600">
                <span className="font-medium">
                  {libelleAvecColonInsecable("Total des montants d’échéances :")}
                </span>{" "}
                {formatDecimalExcel3(totalEcheancesTnd)} TND
              </p>
            ) : null}
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <CatalogListsEditor className="mt-3" />

      <div className="sticky bottom-0 z-10 -mx-1 mt-2 flex justify-stretch gap-2 border-t border-slate-200 bg-white/95 px-1 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-3 backdrop-blur sm:static sm:mx-0 sm:justify-end sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-4 sm:backdrop-blur-0">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
