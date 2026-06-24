import { z } from "zod";
import {
  ClassementDossier,
  EtatDossier,
  Role,
  StatutApprobation,
  TypeCompteur,
  TypeContrat,
  TypeProjet,
} from "@prisma/client";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

const echeanceSchema = z.object({
  numero: z.number().int().min(1).max(200),
  montant: z.string().nullable().optional(),
  date: z.string().nullable().optional(),
  modePaiement: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

const decimalish = z.union([z.string(), z.number()]).nullable().optional();

export const projetBodySchema = z.object({
  reference: z.string().min(1),
  abonnes: z.string().min(1),
  codeBarres: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  cin: z.string().nullable().optional(),
  contact: z.string().nullable().optional(),
  coordonneesGps: z.string().nullable().optional(),
  adresseLieuImplantation: z.string().nullable().optional(),
  presenteParMF: z.string().nullable().optional(),
  district: z.string().nullable().optional(),
  gouvernorat: z.string().nullable().optional(),
  delegation: z.string().nullable().optional(),
  municipalite: z.string().nullable().optional(),
  typeProjet: z.nativeEnum(TypeProjet).optional(),
  etatDossier: z.nativeEnum(EtatDossier).optional(),
  classementDossier: z.nativeEnum(ClassementDossier).optional(),
  commentaire: z.string().nullable().optional(),
  approbationCommerciale: z.nativeEnum(StatutApprobation).optional(),
  approbationTechnique: z.nativeEnum(StatutApprobation).optional(),
  executionInstallation: z.string().nullable().optional(),
  reception: z.string().nullable().optional(),
  procesVerbal: z.string().nullable().optional(),
  contratAchat: z.nativeEnum(TypeContrat).nullable().optional(),
  montantFinancement: decimalish,
  tauxInteret: decimalish,
  banque: z.string().nullable().optional(),
  /** Chaîne vide (select « — ») → null pour éviter connect Prisma avec id invalide. */
  agentCommercialId: z.preprocess(
    (v) => (v === "" || v === "__AUTRE__" ? null : v),
    z.string().min(1).nullable().optional()
  ),
  agentCommercialAutre: z.string().nullable().optional(),
  puissanceInstallee: decimalish,
  typeCompteur: z.nativeEnum(TypeCompteur).nullable().optional(),
  numeroCompteur: z.string().nullable().optional(),
  calibreDisjoncteur: z.string().nullable().optional(),
  puissanceSouscrite: z.string().nullable().optional(),
  productionPrevisionnelle: decimalish,
  consommationAnnuelle: decimalish,
  nbModules: z.number().nullable().optional(),
  puUnitairePV: decimalish,
  marquePV: z.string().nullable().optional(),
  modelePV: z.string().nullable().optional(),
  nbOnduleurs: z.number().nullable().optional(),
  puUnitaireOnd: decimalish,
  puOndSiAutreW: decimalish,
  marqueOnd: z.string().nullable().optional(),
  modeleOnd: z.string().nullable().optional(),
  autreModeleOnd: z.string().nullable().optional(),
  equipementSurMesure: z.string().nullable().optional(),
  interventionSurMesure: z.string().nullable().optional(),
  rapportPuissance: z.string().nullable().optional(),
  dateDepotDossier: z.string().nullable().optional(),
  dateApprobation: z.string().nullable().optional(),
  dateInstallation: z.string().nullable().optional(),
  dateDepotDemandeMES: z.string().nullable().optional(),
  datePaiementPoseCompteurProsol: z.string().nullable().optional(),
  dateMES: z.string().nullable().optional(),
  nPolice: z.string().nullable().optional(),
  nLotDebProsol: z.string().nullable().optional(),
  saisieProsol: z.string().nullable().optional(),
  nLotDeblocageSubvention: z.string().nullable().optional(),
  deblocageProsol: z.string().nullable().optional(),
  conditionSubvention: z.string().nullable().optional(),
  saisieSubvention: z.string().nullable().optional(),
  deblocageSubvention: z.string().nullable().optional(),
  nDevis: z.string().nullable().optional(),
  dateDevis: z.string().nullable().optional(),
  nFacture: z.string().nullable().optional(),
  dateFacture: z.string().nullable().optional(),
  montantHT: decimalish,
  tva: decimalish,
  montantTTC: decimalish,
  montantTTCFinal: decimalish,
  montantAutofinancement: decimalish,
  fraisPoseCmptProsol: decimalish,
  paiement1erFactureSTEG: decimalish,
  paiement2emeFactureSTEG: decimalish,
  fraisAugmentationCalibre: decimalish,
  fraisMutationElec: decimalish,
  fraisMutationGaz: decimalish,
  fraisPassageMonoTri: decimalish,
  autresFrais: decimalish,
  reglementClient: decimalish,
  resteAPayer: decimalish,
  subventionDemandee: decimalish,
  echeances: z.array(echeanceSchema).max(200).optional(),
});

export function normalizeProjetBody(
  raw: z.infer<typeof projetBodySchema>
): z.infer<typeof projetBodySchema> {
  const num = (v: unknown): number | null | undefined => {
    if (v === undefined) return undefined;
    if (v === null) return null;
    const s = String(v).trim().replace(/\s/g, "").replace(/,/g, ".");
    if (s === "" || s === "-" || s === ".") return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  };
  return {
    ...raw,
    montantFinancement: num(raw.montantFinancement),
    tauxInteret: num(raw.tauxInteret),
    puissanceInstallee: num(raw.puissanceInstallee),
    productionPrevisionnelle: num(raw.productionPrevisionnelle),
    consommationAnnuelle: num(raw.consommationAnnuelle),
    puUnitairePV: num(raw.puUnitairePV),
    puUnitaireOnd: num(raw.puUnitaireOnd),
    puOndSiAutreW: num(raw.puOndSiAutreW),
    montantHT: num(raw.montantHT),
    tva: num(raw.tva),
    montantTTC: num(raw.montantTTC),
    montantTTCFinal: num(raw.montantTTCFinal),
    montantAutofinancement: num(raw.montantAutofinancement),
    fraisPoseCmptProsol: num(raw.fraisPoseCmptProsol),
    paiement1erFactureSTEG: num(raw.paiement1erFactureSTEG),
    paiement2emeFactureSTEG: num(raw.paiement2emeFactureSTEG),
    fraisAugmentationCalibre: num(raw.fraisAugmentationCalibre),
    fraisMutationElec: num(raw.fraisMutationElec),
    fraisMutationGaz: num(raw.fraisMutationGaz),
    fraisPassageMonoTri: num(raw.fraisPassageMonoTri),
    autresFrais: num(raw.autresFrais),
    reglementClient: num(raw.reglementClient),
    resteAPayer: num(raw.resteAPayer),
    subventionDemandee: num(raw.subventionDemandee),
  };
}

export const userCreateSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().nullable().optional(),
  password: z.string().min(8).optional(),
  role: z.nativeEnum(Role).refine((r) => r !== Role.SUPER_ADMIN),
  actif: z.boolean().optional(),
});

export const userUpdateSchema = z.object({
  nom: z.string().min(1).optional(),
  prenom: z.string().min(1).optional(),
  email: z.string().email().optional(),
  telephone: z.string().nullable().optional(),
  password: z.string().min(8).optional(),
  role: z.nativeEnum(Role).optional(),
  actif: z.boolean().optional(),
});

export const archiveBodySchema = z.object({
  ids: z.array(z.string()).min(1),
  archive: z.boolean(),
});

export const societeBodySchema = z.object({
  denomination: z.string().optional().default(""),
  nomCommercial: z.string().optional().default(""),
  adresseSiegeSocial: z.string().optional().default(""),
  adresseActivite: z.string().optional().default(""),
  formeJuridique: z.string().optional().default(""),
  mf: z.string().optional().default(""),
  capitalSocial: z.string().optional().default(""),
  contactFixe: z.string().optional().default(""),
  contactFax: z.string().optional().default(""),
  contactMobile: z.string().optional().default(""),
  adresseEmail: z.string().optional().default(""),
  rib: z.string().optional().default(""),
  banque: z.string().optional().default(""),
  codeSteg: z.string().optional().default(""),
  codeAnme: z.string().optional().default(""),
  validiteAnme: z.string().optional().default(""),
  gerant: z.string().optional().default(""),
  pdfLogoDataUrl: z.string().optional().default(""),
});
