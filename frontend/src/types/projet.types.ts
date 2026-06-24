export type EtatDossier =
  | "OUVERT"
  | "EN_NEGOCIATION"
  | "FINIE"
  | "ARCHIVE"
  | "ABANDONNE";
export type StatutApprobation =
  | "APPROUVE"
  | "PAS_ENCORE"
  | "NEANT"
  | "EN_ATTENTE"
  | "REJETE"
  | "ABANDONNE";
export type TypeContrat = "PROGRAMME_PROSOL" | "HORS_PROGRAMME_PROSOL";
export type TypeCompteur = "MONOPHASE" | "TRIPHASE";
export type ClassementDossier = "ARCHIVE" | "NON_ARCHIVE";
export type TypeProjet =
  | "PHOTOVOLTAIQUE_CLASSIQUE"
  | "POMPAGE"
  | "ISOLE_AVEC_BATTERIES"
  | "AUTRE";

export type Echeance = {
  id?: string;
  projetId?: string;
  numero: number;
  montant: string | null;
  date: string | null;
  modePaiement: string | null;
  description: string | null;
};

export type AgentCommercial = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
};

export type Projet = {
  id: string;
  codeBarres: string | null;
  reference: string;
  abonnes: string;
  email: string | null;
  cin: string | null;
  contact: string | null;
  coordonneesGps: string | null;
  adresseLieuImplantation: string | null;
  presenteParMF: string | null;
  district: string | null;
  gouvernorat: string | null;
  delegation: string | null;
  municipalite: string | null;
  typeProjet: TypeProjet | null;
  etatDossier: EtatDossier;
  classementDossier: ClassementDossier;
  commentaire: string | null;
  approbationCommerciale: StatutApprobation;
  approbationTechnique: StatutApprobation;
  executionInstallation: string | null;
  reception: string | null;
  procesVerbal: string | null;
  contratAchat: TypeContrat | null;
  montantFinancement: string | null;
  tauxInteret: string | null;
  banque: string | null;
  agentCommercialId: string | null;
  agentCommercialAutre: string | null;
  agentCommercial: AgentCommercial | null;
  puissanceInstallee: string | null;
  typeCompteur: TypeCompteur | null;
  numeroCompteur: string | null;
  calibreDisjoncteur: string | null;
  puissanceSouscrite: string | null;
  productionPrevisionnelle: string | null;
  consommationAnnuelle: string | null;
  nbModules: number | null;
  puUnitairePV: string | null;
  marquePV: string | null;
  modelePV: string | null;
  nbOnduleurs: number | null;
  puUnitaireOnd: string | null;
  puOndSiAutreW: string | null;
  marqueOnd: string | null;
  modeleOnd: string | null;
  autreModeleOnd: string | null;
  equipementSurMesure: string | null;
  interventionSurMesure: string | null;
  rapportPuissance: string | null;
  dateDepotDossier: string | null;
  dateApprobation: string | null;
  dateInstallation: string | null;
  dateDepotDemandeMES: string | null;
  datePaiementPoseCompteurProsol: string | null;
  dateMES: string | null;
  nPolice: string | null;
  nLotDebProsol: string | null;
  saisieProsol: string | null;
  nLotDeblocageSubvention: string | null;
  deblocageProsol: string | null;
  conditionSubvention: string | null;
  saisieSubvention: string | null;
  deblocageSubvention: string | null;
  nDevis: string | null;
  dateDevis: string | null;
  nFacture: string | null;
  dateFacture: string | null;
  montantHT: string | null;
  tva: string | null;
  montantTTC: string | null;
  montantTTCFinal: string | null;
  montantAutofinancement: string | null;
  fraisPoseCmptProsol: string | null;
  paiement1erFactureSTEG: string | null;
  paiement2emeFactureSTEG: string | null;
  fraisAugmentationCalibre: string | null;
  fraisMutationElec: string | null;
  fraisMutationGaz: string | null;
  fraisPassageMonoTri: string | null;
  autresFrais: string | null;
  reglementClient: string | null;
  resteAPayer: string | null;
  subventionDemandee: string | null;
  echeances: Echeance[];
  createdAt: string;
  updatedAt: string;
  logs?: {
    id: string;
    action: string;
    details: unknown;
    createdAt: string;
    user: { nom: string; prenom: string; email: string };
  }[];
};

export type ProjetListResponse = {
  data: Projet[];
  total: number;
  page: number;
  limit: number;
};
