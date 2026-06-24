import type { Projet } from "@/types/projet.types";
import { joinPresenteParMf, splitPresenteParMf } from "@/utils/presenteParMf";
import {
  computeResteAPayerDisplay,
  parseMoneyInput,
  sumEcheancesMontants,
} from "@/utils/financeFormCalculations";
import {
  canonicalExecutionInstallation,
  canonicalProcesVerbal,
  canonicalReception,
  canonicalSaisieProsol,
  canonicalSaisieSubvention,
  canonicalDeblocageProsol,
  canonicalDeblocageSubvention,
  canonicalModePaiement,
  formatDecimalExcel3,
} from "@/utils/formatters";
import { AGENT_COMMERCIAL_AUTRE_VALUE } from "@/utils/constants";

function normListeKey(v: string): string {
  return String(v)
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Ancienne valeur Excel / base « Néant » : traitée comme non renseignée (liste sans cette entrée). */
function isLegacyNeant(v: string): boolean {
  const k = normListeKey(v);
  return k === "neant" || k === "nant";
}

/**
 * Valeur formulaire pour une colonne Excel à choix : hors liste conservé ;
 * vide, inconnu ou ancien « Néant » → chaîne vide (option `<option value="">` sans libellé).
 */
function excelListeFormValue(
  raw: string | null | undefined,
  canonical: (s: string) => string
): string {
  const r = s(raw);
  if (!r.trim()) return "";
  if (isLegacyNeant(r)) return "";
  const c = canonical(r);
  if (c) return c;
  return r;
}

export type EcheanceFormRow = {
  montant: string;
  date: string;
  modePaiement: string;
  description: string;
};

export function emptyEcheanceFormRow(): EcheanceFormRow {
  return { montant: "", date: "", modePaiement: "", description: "" };
}

function echeancesToFormRows(p?: Projet | null): EcheanceFormRow[] {
  const list = [...(p?.echeances ?? [])].sort((a, b) => a.numero - b.numero);
  const rows = list.map((e) => ({
    montant: sExcel3(e.montant),
    date: d(e.date ?? null),
    modePaiement:
      canonicalModePaiement(s(e.modePaiement)) || s(e.modePaiement),
    description: sUpper(e.description),
  }));
  return rows.length > 0 ? rows : [emptyEcheanceFormRow()];
}

function d(iso: string | null | undefined): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

function s(v: string | number | null | undefined): string {
  if (v == null) return "";
  return String(v);
}

/** Champs montants alignés Excel (3 décimales, virgule). */
function sExcel3(v: string | number | null | undefined): string {
  if (v == null || v === "") return "";
  const str = String(v).trim();
  if (!str) return "";
  const x = parseFloat(str.replace(/\s/g, "").replace(",", "."));
  if (Number.isFinite(x)) return formatDecimalExcel3(x);
  return str;
}

function sUpper(v: string | number | null | undefined): string {
  const t = s(v).trim();
  return t ? t.toLocaleUpperCase("fr-FR") : "";
}

/** `YYYY-MM-DD` (saisie input date) → ISO pour Prisma / MongoDB. */
export function toApiDateString(raw: string): string | null {
  const x = raw.trim();
  if (!x) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(x)) return `${x}T00:00:00.000Z`;
  return x;
}

/** Titre de l’onglet n°4 et de l’encart fiche (tous cas : couplé réseau, Prosol, ANME). */
export const TITRE_ONGLET_SUIVI_DOSSIER = "Suivi dossier";

/**
 * Sous-titre du bloc déblocage / lots (couplé au réseau) selon contrat d’achat et ANME.
 * Quatre combinaisons Prosol × ANME.
 */
export function libelleDeblocageOnglet(
  contratAchat: string | null | undefined,
  conditionSubvention: string | null | undefined
): string {
  const c = String(contratAchat ?? "")
    .trim()
    .toUpperCase();
  const s = String(conditionSubvention ?? "")
    .trim()
    .toUpperCase();
  const hors = c === "HORS_PROGRAMME_PROSOL";
  const prog = c === "PROGRAMME_PROSOL";
  const anmeOui = s === "OUI";
  const anmeNon = s === "NON";
  if (hors && (anmeOui || anmeNon)) return "Déblocage subvention";
  if (prog && anmeNon) return "Déblocage Prosol";
  if (prog && anmeOui) return "Déblocage (Prosol / Subvention)";
  return "Prosol / Subvention";
}

export function projetToFormValues(p?: Projet | null) {
  const { presentePar: presenteParSplit, mf } = splitPresenteParMf(
    p?.presenteParMF
  );
  const base = {
    reference: sUpper(p?.reference),
    abonnes: (() => {
      const t = s(p?.abonnes).trim();
      return t ? t.toLocaleUpperCase("fr-FR") : "";
    })(),
    codeBarres: sUpper(p?.codeBarres),
    email: s(p?.email),
    cin: sUpper(p?.cin),
    contact: sUpper(p?.contact),
    coordonneesGps: s(p?.coordonneesGps),
    adresseLieuImplantation: (() => {
      const t = s(p?.adresseLieuImplantation).trim();
      return t ? t.toLocaleUpperCase("fr-FR") : "";
    })(),
    presentePar: (() => {
      const t = s(presenteParSplit).trim();
      return t ? t.toLocaleUpperCase("fr-FR") : "";
    })(),
    mf: sUpper(mf),
    district: s(p?.district),
    gouvernorat: s(p?.gouvernorat),
    delegation: s(p?.delegation),
    municipalite: s(p?.municipalite),
    typeProjet: p?.typeProjet ?? "PHOTOVOLTAIQUE_CLASSIQUE",
    etatDossier: p?.etatDossier ?? "OUVERT",
    classementDossier: p?.classementDossier ?? "NON_ARCHIVE",
    commentaire: sUpper(p?.commentaire),
    /** Liste avec option vide : NEANT / nouveau dossier → chaîne vide (soumission → NEANT côté API). */
    approbationCommerciale: !p
      ? ""
      : p.approbationCommerciale === "NEANT"
        ? ""
        : (p.approbationCommerciale ?? "PAS_ENCORE"),
    approbationTechnique: !p
      ? ""
      : p.approbationTechnique === "NEANT"
        ? ""
        : (p.approbationTechnique ?? "PAS_ENCORE"),
    executionInstallation: excelListeFormValue(
      p?.executionInstallation,
      canonicalExecutionInstallation
    ),
    reception: excelListeFormValue(p?.reception, canonicalReception),
    procesVerbal: excelListeFormValue(p?.procesVerbal, canonicalProcesVerbal),
    contratAchat: (() => {
      const u = s(p?.contratAchat).trim().toUpperCase();
      if (u === "PROGRAMME_PROSOL" || u === "HORS_PROGRAMME_PROSOL") return u;
      return s(p?.contratAchat);
    })(),
    montantFinancement: sExcel3(p?.montantFinancement),
    tauxInteret: sExcel3(p?.tauxInteret),
    banque: s(p?.banque),
    agentCommercialId: p?.agentCommercialId
      ? s(p.agentCommercialId)
      : p?.agentCommercialAutre
        ? AGENT_COMMERCIAL_AUTRE_VALUE
        : "",
    agentCommercialAutre: s(p?.agentCommercialAutre),
    puissanceInstallee: s(p?.puissanceInstallee),
    typeCompteur: p?.typeCompteur ?? "",
    numeroCompteur: sUpper(p?.numeroCompteur),
    calibreDisjoncteur: sUpper(p?.calibreDisjoncteur),
    puissanceSouscrite: sUpper(p?.puissanceSouscrite),
    productionPrevisionnelle: sUpper(p?.productionPrevisionnelle),
    consommationAnnuelle: sUpper(p?.consommationAnnuelle),
    nbModules: s(p?.nbModules),
    puUnitairePV: s(p?.puUnitairePV),
    marquePV: sUpper(p?.marquePV),
    modelePV: sUpper(p?.modelePV),
    nbOnduleurs: s(p?.nbOnduleurs),
    puUnitaireOnd: s(p?.puUnitaireOnd),
    puOndSiAutreW: s(p?.puOndSiAutreW),
    marqueOnd: sUpper(p?.marqueOnd),
    modeleOnd: sUpper(p?.modeleOnd),
    autreModeleOnd: sUpper(p?.autreModeleOnd),
    equipementSurMesure: sUpper(p?.equipementSurMesure),
    interventionSurMesure: sUpper(p?.interventionSurMesure),
    rapportPuissance: s(p?.rapportPuissance),
    dateDepotDossier: d(p?.dateDepotDossier),
    dateApprobation: d(p?.dateApprobation),
    dateInstallation: d(p?.dateInstallation),
    dateDepotDemandeMES: d(p?.dateDepotDemandeMES),
    datePaiementPoseCompteurProsol: d(p?.datePaiementPoseCompteurProsol),
    dateMES: d(p?.dateMES),
    dateReception: "",
    nPolice: sUpper(p?.nPolice),
    nLotDebProsol: sUpper(p?.nLotDebProsol),
    saisieProsol: excelListeFormValue(p?.saisieProsol, canonicalSaisieProsol),
    nLotDeblocageSubvention: sUpper(p?.nLotDeblocageSubvention),
    deblocageProsol: excelListeFormValue(
      p?.deblocageProsol,
      canonicalDeblocageProsol
    ),
    conditionSubvention: (() => {
      const u = s(p?.conditionSubvention).trim().toUpperCase();
      if (u === "OUI" || u === "NON") return u;
      return s(p?.conditionSubvention);
    })(),
    saisieSubvention: excelListeFormValue(
      p?.saisieSubvention,
      canonicalSaisieSubvention
    ),
    deblocageSubvention: excelListeFormValue(
      p?.deblocageSubvention,
      canonicalDeblocageSubvention
    ),
    nDevis: sUpper(p?.nDevis),
    dateDevis: d(p?.dateDevis),
    nFacture: sUpper(p?.nFacture),
    dateFacture: d(p?.dateFacture),
    montantHT: sExcel3(p?.montantHT),
    tva: sExcel3(p?.tva),
    montantTTC: sExcel3(p?.montantTTC),
    montantTTCFinal: sExcel3(p?.montantTTCFinal),
    montantAutofinancement: sExcel3(p?.montantAutofinancement),
    fraisPoseCmptProsol: sExcel3(p?.fraisPoseCmptProsol),
    paiement1erFactureSTEG: sExcel3(p?.paiement1erFactureSTEG),
    paiement2emeFactureSTEG: sExcel3(p?.paiement2emeFactureSTEG),
    fraisAugmentationCalibre: sExcel3(p?.fraisAugmentationCalibre),
    fraisMutationElec: sExcel3(p?.fraisMutationElec),
    fraisMutationGaz: sExcel3(p?.fraisMutationGaz),
    fraisPassageMonoTri: sExcel3(p?.fraisPassageMonoTri),
    autresFrais: sExcel3(p?.autresFrais),
    reglementClient: sExcel3(p?.reglementClient),
    resteAPayer: sExcel3(p?.resteAPayer),
    subventionDemandee: sExcel3(p?.subventionDemandee),
    echeances: echeancesToFormRows(p),
  };
  return base;
}

export type ProjetFormValues = ReturnType<typeof projetToFormValues>;

export function formValuesToApiPayload(v: ProjetFormValues): Record<string, unknown> {
  const nullIfEmpty = (x: string) => (x.trim() === "" ? null : x);
  const nullIfEmptyUpper = (x: string) => {
    const t = x.trim();
    if (!t) return null;
    return t.toLocaleUpperCase("fr-FR");
  };
  const nullIfEmptyMontant3 = (x: string) => {
    const t = x.trim();
    if (!t) return null;
    const n = parseMoneyInput(t);
    if (n == null) return t;
    return formatDecimalExcel3(n);
  };
  const echeances: {
    numero: number;
    montant: string | null;
    date: string | null;
    modePaiement: string | null;
    description: string | null;
  }[] = [];
  let echNum = 1;
  for (const row of v.echeances ?? []) {
    const m = row.montant ?? "";
    const dt = row.date ?? "";
    const mode = row.modePaiement ?? "";
    const desc = row.description ?? "";
    if (
      (m && m.trim()) ||
      (dt && dt.trim()) ||
      (mode && mode.trim()) ||
      (desc && desc.trim())
    ) {
      const mc = canonicalModePaiement(mode);
      echeances.push({
        numero: echNum,
        montant: nullIfEmptyMontant3(m),
        date: dt && dt.trim() ? toApiDateString(dt) : null,
        modePaiement: mc || nullIfEmpty(mode),
        description: nullIfEmptyUpper(desc),
      });
      echNum += 1;
    }
  }
  return {
    reference: v.reference.trim().toLocaleUpperCase("fr-FR"),
    abonnes: s(v.abonnes).trim().toLocaleUpperCase("fr-FR"),
    codeBarres: nullIfEmptyUpper(v.codeBarres),
    email: nullIfEmpty(v.email),
    cin: nullIfEmptyUpper(v.cin),
    contact: nullIfEmptyUpper(v.contact),
    coordonneesGps: nullIfEmpty(v.coordonneesGps),
    adresseLieuImplantation: nullIfEmpty(
      s(v.adresseLieuImplantation).trim().toLocaleUpperCase("fr-FR")
    ),
    presenteParMF: joinPresenteParMf(
      s(v.presentePar ?? "")
        .trim()
        .toLocaleUpperCase("fr-FR"),
      s(v.mf ?? "")
        .trim()
        .toLocaleUpperCase("fr-FR")
    ),
    district: nullIfEmpty(v.district),
    gouvernorat: nullIfEmpty(v.gouvernorat),
    delegation: nullIfEmpty(v.delegation),
    municipalite: nullIfEmpty(v.municipalite),
    typeProjet: v.typeProjet,
    etatDossier: v.etatDossier,
    classementDossier: v.classementDossier,
    commentaire: nullIfEmptyUpper(v.commentaire),
    approbationCommerciale:
      v.approbationCommerciale === "" ? "NEANT" : v.approbationCommerciale,
    approbationTechnique:
      v.approbationTechnique === "" ? "NEANT" : v.approbationTechnique,
    executionInstallation: (() => {
      const c = canonicalExecutionInstallation(v.executionInstallation);
      return c === "" ? null : c;
    })(),
    reception: nullIfEmpty(v.reception),
    procesVerbal: (() => {
      const c = canonicalProcesVerbal(v.procesVerbal);
      return c === "" ? null : c;
    })(),
    contratAchat: v.contratAchat === "" ? null : v.contratAchat,
    montantFinancement: nullIfEmptyMontant3(v.montantFinancement),
    tauxInteret: nullIfEmptyMontant3(v.tauxInteret),
    banque: nullIfEmpty(v.banque),
    agentCommercialId:
      v.agentCommercialId === AGENT_COMMERCIAL_AUTRE_VALUE
        ? null
        : nullIfEmpty(v.agentCommercialId),
    agentCommercialAutre:
      v.agentCommercialId === AGENT_COMMERCIAL_AUTRE_VALUE
        ? nullIfEmptyUpper(v.agentCommercialAutre) ?? "AUTRE"
        : null,
    puissanceInstallee: nullIfEmpty(v.puissanceInstallee),
    typeCompteur: v.typeCompteur === "" ? null : v.typeCompteur,
    numeroCompteur: nullIfEmptyUpper(v.numeroCompteur),
    calibreDisjoncteur: nullIfEmptyUpper(v.calibreDisjoncteur),
    puissanceSouscrite: nullIfEmptyUpper(v.puissanceSouscrite),
    productionPrevisionnelle: nullIfEmptyUpper(v.productionPrevisionnelle),
    consommationAnnuelle: nullIfEmptyUpper(v.consommationAnnuelle),
    nbModules:
      v.nbModules.trim() === ""
        ? null
        : (() => {
            const n = parseInt(v.nbModules, 10);
            return Number.isNaN(n) ? null : n;
          })(),
    puUnitairePV: nullIfEmpty(v.puUnitairePV),
    marquePV: nullIfEmptyUpper(v.marquePV),
    modelePV: nullIfEmptyUpper(v.modelePV),
    nbOnduleurs:
      v.nbOnduleurs.trim() === ""
        ? null
        : (() => {
            const n = parseInt(v.nbOnduleurs, 10);
            return Number.isNaN(n) ? null : n;
          })(),
    puUnitaireOnd: nullIfEmpty(v.puUnitaireOnd),
    puOndSiAutreW: nullIfEmpty(v.puOndSiAutreW),
    marqueOnd: nullIfEmptyUpper(v.marqueOnd),
    modeleOnd: nullIfEmptyUpper(v.modeleOnd),
    autreModeleOnd: nullIfEmptyUpper(v.autreModeleOnd),
    equipementSurMesure: nullIfEmptyUpper(v.equipementSurMesure),
    interventionSurMesure: nullIfEmptyUpper(v.interventionSurMesure),
    rapportPuissance: nullIfEmpty(v.rapportPuissance),
    dateDepotDossier: toApiDateString(v.dateDepotDossier ?? ""),
    dateApprobation: toApiDateString(v.dateApprobation ?? ""),
    dateInstallation: toApiDateString(v.dateInstallation ?? ""),
    dateDepotDemandeMES: toApiDateString(v.dateDepotDemandeMES ?? ""),
    datePaiementPoseCompteurProsol: toApiDateString(
      v.datePaiementPoseCompteurProsol ?? ""
    ),
    dateMES: toApiDateString(v.dateMES ?? ""),
    nPolice: nullIfEmptyUpper(v.nPolice),
    nLotDebProsol: nullIfEmptyUpper(v.nLotDebProsol),
    saisieProsol: (() => {
      const c = canonicalSaisieProsol(v.saisieProsol);
      return c === "" ? null : c;
    })(),
    nLotDeblocageSubvention: nullIfEmptyUpper(v.nLotDeblocageSubvention),
    deblocageProsol: (() => {
      const c = canonicalDeblocageProsol(v.deblocageProsol);
      return c === "" ? null : c;
    })(),
    conditionSubvention: nullIfEmpty(v.conditionSubvention),
    saisieSubvention: (() => {
      const c = canonicalSaisieSubvention(v.saisieSubvention);
      return c === "" ? null : c;
    })(),
    deblocageSubvention: (() => {
      const c = canonicalDeblocageSubvention(v.deblocageSubvention);
      return c === "" ? null : c;
    })(),
    nDevis: nullIfEmptyUpper(v.nDevis),
    dateDevis: toApiDateString(v.dateDevis ?? ""),
    nFacture: nullIfEmptyUpper(v.nFacture),
    dateFacture: toApiDateString(v.dateFacture ?? ""),
    montantHT: nullIfEmptyMontant3(v.montantHT),
    tva: nullIfEmptyMontant3(v.tva),
    montantTTC: nullIfEmptyMontant3(v.montantTTC),
    montantTTCFinal: nullIfEmptyMontant3(v.montantTTCFinal),
    montantAutofinancement: nullIfEmptyMontant3(v.montantAutofinancement),
    fraisPoseCmptProsol: nullIfEmptyMontant3(v.fraisPoseCmptProsol),
    paiement1erFactureSTEG: nullIfEmptyMontant3(v.paiement1erFactureSTEG),
    paiement2emeFactureSTEG: nullIfEmptyMontant3(v.paiement2emeFactureSTEG),
    fraisAugmentationCalibre: nullIfEmptyMontant3(v.fraisAugmentationCalibre),
    fraisMutationElec: nullIfEmptyMontant3(v.fraisMutationElec),
    fraisMutationGaz: nullIfEmptyMontant3(v.fraisMutationGaz),
    fraisPassageMonoTri: nullIfEmptyMontant3(v.fraisPassageMonoTri),
    autresFrais: nullIfEmptyMontant3(v.autresFrais),
    reglementClient: nullIfEmptyMontant3(v.reglementClient),
    resteAPayer: (() => {
      const totalEch = sumEcheancesMontants(v.echeances);
      const r = computeResteAPayerDisplay(v.reglementClient, totalEch);
      return r.trim() === "" ? null : r;
    })(),
    subventionDemandee: nullIfEmptyMontant3(v.subventionDemandee),
    echeances,
  };
}
