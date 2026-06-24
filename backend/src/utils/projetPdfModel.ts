import {
  ClassementDossier,
  EtatDossier,
  StatutApprobation,
  TypeCompteur,
  TypeContrat,
} from "@prisma/client";

type Agent = { prenom: string; nom: string } | null;
type Echeance = {
  numero: number;
  montant: unknown;
  date: Date | null;
  modePaiement: string | null;
  description: string | null;
};

export type ProjetPdfModel = {
  reference: string;
  abonnes: string;
  email?: string | null;
  cin?: string | null;
  contact?: string | null;
  coordonneesGps?: string | null;
  adresseLieuImplantation?: string | null;
  presenteParMF?: string | null;
  district?: string | null;
  gouvernorat?: string | null;
  delegation?: string | null;
  municipalite?: string | null;
  etatDossier: EtatDossier;
  classementDossier: ClassementDossier;
  commentaire?: string | null;
  approbationCommerciale: StatutApprobation;
  approbationTechnique: StatutApprobation;
  executionInstallation?: string | null;
  reception?: string | null;
  procesVerbal?: string | null;
  typeProjet?: string | null;
  contratAchat?: TypeContrat | null;
  montantFinancement?: number | null;
  tauxInteret?: number | null;
  banque?: string | null;
  puissanceInstallee?: number | null;
  typeCompteur?: TypeCompteur | null;
  numeroCompteur?: string | null;
  calibreDisjoncteur?: string | null;
  puissanceSouscrite?: string | null;
  productionPrevisionnelle?: number | null;
  consommationAnnuelle?: number | null;
  nbModules?: number | null;
  puUnitairePV?: number | null;
  marquePV?: string | null;
  modelePV?: string | null;
  nbOnduleurs?: number | null;
  puUnitaireOnd?: number | null;
  puOndSiAutreW?: number | null;
  marqueOnd?: string | null;
  modeleOnd?: string | null;
  autreModeleOnd?: string | null;
  equipementSurMesure?: string | null;
  interventionSurMesure?: string | null;
  rapportPuissance?: string | null;
  dateDepotDossier?: Date | null;
  dateApprobation?: Date | null;
  dateInstallation?: Date | null;
  dateDepotDemandeMES?: Date | null;
  dateMES?: Date | null;
  nPolice?: string | null;
  nLotDebProsol?: string | null;
  saisieProsol?: string | null;
  nLotDeblocageSubvention?: string | null;
  deblocageProsol?: string | null;
  conditionSubvention?: string | null;
  saisieSubvention?: string | null;
  deblocageSubvention?: string | null;
  nDevis?: string | null;
  dateDevis?: Date | null;
  nFacture?: string | null;
  dateFacture?: Date | null;
  montantHT?: number | null;
  tva?: number | null;
  montantTTC?: number | null;
  montantTTCFinal?: number | null;
  montantAutofinancement?: number | null;
  fraisPoseCmptProsol?: number | null;
  paiement1erFactureSTEG?: number | null;
  paiement2emeFactureSTEG?: number | null;
  fraisAugmentationCalibre?: number | null;
  fraisMutationElec?: number | null;
  fraisMutationGaz?: number | null;
  fraisPassageMonoTri?: number | null;
  autresFrais?: number | null;
  reglementClient?: number | null;
  resteAPayer?: number | null;
  subventionDemandee?: number | null;
  agentCommercial?: Agent;
  agentCommercialAutre?: string | null;
  echeances?: Echeance[];
};
