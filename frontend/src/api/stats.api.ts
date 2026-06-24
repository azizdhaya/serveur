import { axiosClient } from "./axiosClient";

export type DashboardStats = {
  totalProjets: number;
  termines: { count: number; pourcent: number };
  enCours: { count: number; pourcent: number };
  abandonnes: { count: number; pourcent: number };
  puissanceTotaleKw: number;
  puissanceParTypeKw: {
    PHOTOVOLTAIQUE_CLASSIQUE: number;
    POMPAGE: number;
    ISOLE_AVEC_BATTERIES: number;
    AUTRE: number;
    sansTypeKw: number;
  };
  financementTotalTnd: number;
  prosolEnAttente: number;
  aArchiver: number;
  nouveauxCeMois: number;
};

export async function fetchDashboard() {
  const { data } = await axiosClient.get<DashboardStats>(
    "/stats/dashboard"
  );
  return data;
}

export async function fetchParDistrict(limit = 10) {
  const { data } = await axiosClient.get<{ district: string; count: number }[]>(
    `/stats/par-district?limit=${limit}`
  );
  return data;
}

export async function fetchParEtat() {
  const { data } = await axiosClient.get<{ etat: string; count: number }[]>(
    "/stats/par-etat"
  );
  return data;
}

export async function fetchParContratAchat() {
  const { data } = await axiosClient.get<{ contrat: string | null; count: number }[]>(
    "/stats/par-contrat-achat"
  );
  return data;
}

export async function fetchParMois(annee: number) {
  const { data } = await axiosClient.get<{ mois: number; count: number }[]>(
    `/stats/par-mois?annee=${annee}`
  );
  return data;
}

export async function fetchFinancier() {
  const { data } = await axiosClient.get<{
    montantTTCFinal: number;
    montantFinancement: number;
    resteAPayer: number;
    financementMoyen: number;
  }>("/stats/financier");
  return data;
}

export async function fetchProsolDistrict() {
  const { data } = await axiosClient.get<
    { district: string; prosol: number; hors: number }[]
  >("/stats/prosol-par-district");
  return data;
}

export async function fetchParDeblocage() {
  const { data } = await axiosClient.get<
    { deblocage: string | null; count: number }[]
  >("/stats/par-deblocage");
  return data;
}

export async function fetchRecoulementParDistrict() {
  const { data } = await axiosClient.get<
    { district: string; resteTotal: number; dossierCount: number }[]
  >("/stats/recoulement-par-district");
  return data;
}

export type DiligenceParDistrict = {
  district: string;
  approTechniquePasEncore: number;
  approCommercialePasEncore: number;
  installationPasEncore: number;
  receptionPasEncore: number;
  procVerbalPasEncore: number;
  /** Déblocage Prosol au libellé « Pas encore ». */
  deblocageProsolPasEncore: number;
  deblocageSubventionPayer: number;
  deblocageSubventionPasEncore: number;
};

export async function fetchDiligencesParDistrict() {
  const { data } = await axiosClient.get<DiligenceParDistrict[]>(
    "/stats/diligences-par-district"
  );
  return data;
}
