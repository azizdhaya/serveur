import { axiosClient } from "./axiosClient";
import type { Projet, ProjetListResponse } from "@/types/projet.types";
import {
  createBlobDownloadSession,
  deliverBlob,
  type BlobDownloadSession,
} from "@/utils/blobDownload";

export { createBlobDownloadSession, type BlobDownloadSession };

export type ProjetFilters = {
  page?: number;
  limit?: number;
  search?: string;
  etat?: string;
  district?: string;
  contrat?: string;
  typeProjet?: string;
  banque?: string;
  agentId?: string;
  dateFrom?: string;
  dateTo?: string;
  dateField?: string;
  classement?: string;
  approbationCommerciale?: string;
  approbationTechnique?: string;
  /** Subvention ANME : OUI | NON. */
  anme?: string;
  executionInstallation?: string;
  reception?: string;
  procesVerbal?: string;
  /** Colonnes Excel Saisie_Prosol / Déblocage_Prosol (valeur exacte). */
  saisieProsol?: string;
  deblocageProsol?: string;
  /** Saisie_Subvention / Déblocage_Subvention (valeur exacte). */
  saisieSubvention?: string;
  deblocageSubvention?: string;
  /** Taux d'intérêt (%) — valeur recherchée. */
  tauxInteret?: string;
  /** Lot Prosol ou lot subvention (contient). */
  lotDeblocage?: string;
  /** MONOPHASE | TRIPHASE | NEANT (non renseigné). */
  typeCompteur?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

function toParams(f: ProjetFilters) {
  const p = new URLSearchParams();
  Object.entries(f).forEach(([k, v]) => {
    if (v !== undefined && v !== "") p.set(k, String(v));
  });
  return p.toString();
}

export async function fetchProjets(f: ProjetFilters) {
  const q = toParams(f);
  const { data } = await axiosClient.get<ProjetListResponse>(
    `/projets?${q}`
  );
  return data;
}

export async function fetchProjet(id: string) {
  const { data } = await axiosClient.get<Projet>(`/projets/${id}`);
  return data;
}

export async function createProjet(body: Record<string, unknown>) {
  const { data } = await axiosClient.post<Projet>("/projets", body);
  return data;
}

export async function updateProjet(id: string, body: Record<string, unknown>) {
  const { data } = await axiosClient.put<Projet>(`/projets/${id}`, body);
  return data;
}

export async function deleteProjet(id: string) {
  await axiosClient.delete(`/projets/${id}`);
}

export async function archiveProjets(ids: string[], archive: boolean) {
  const { data } = await axiosClient.post<{ count: number }>(
    "/projets/archive",
    { ids, archive }
  );
  return data;
}

async function saveBlobResponse(
  data: Blob,
  filename: string,
  session?: BlobDownloadSession
) {
  if (session) {
    return session.deliver(data, filename);
  }
  return deliverBlob(data, filename);
}

async function readBlobErrorMessage(blob: Blob): Promise<string> {
  const text = await blob.text();
  try {
    const j = JSON.parse(text) as { message?: string };
    if (j.message) return j.message;
  } catch {
    /* réponse non JSON */
  }
  return text.trim().slice(0, 280) || "Erreur serveur";
}

function responseContentType(headers: Record<string, unknown>): string {
  const h = headers as Record<string, string | undefined>;
  return String(h["content-type"] ?? h["Content-Type"] ?? "").toLowerCase();
}

/** Paramètres d’export : mêmes filtres que la liste + champs optionnels étendus côté API. */
export type ProjetExportParams = ProjetFilters & Record<string, string | number | undefined>;

export async function downloadExportExcel(
  params: ProjetExportParams,
  filename = "projets-export.xlsx",
  session?: BlobDownloadSession
) {
  const { data } = await axiosClient.get("/projets/export/excel", {
    params,
    responseType: "blob",
  });
  await saveBlobResponse(data, filename, session);
}

const XLSX_CONTENT =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

/** Export Excel sur mesure (colonnes en JSON, comme le PDF). */
export async function downloadExportExcelPost(
  body: Record<string, unknown>,
  filename = "projets-export.xlsx",
  session?: BlobDownloadSession
) {
  const { data, headers, status } = await axiosClient.post<Blob>(
    "/projets/export/excel",
    body,
    {
      responseType: "blob",
      validateStatus: () => true,
    }
  );
  if (status >= 400) {
    throw new Error(await readBlobErrorMessage(data));
  }
  if (!responseContentType(headers as Record<string, unknown>).includes(XLSX_CONTENT)) {
    throw new Error(await readBlobErrorMessage(data));
  }
  await saveBlobResponse(data, filename, session);
}

export type PdfListColumnMeta = {
  key: string;
  label: string;
  group: string;
};

export async function fetchPdfExportColumnsMeta() {
  const { data } = await axiosClient.get<{
    columns: PdfListColumnMeta[];
    defaultColumnKeys: string[];
    defaultPdfTitle: string;
  }>("/projets/export/pdf/columns");
  return data;
}

export async function downloadExportPdf(
  params: ProjetExportParams,
  filename = "projets-export.pdf",
  session?: BlobDownloadSession
) {
  const { data, headers, status } = await axiosClient.get<Blob>(
    "/projets/export/pdf",
    {
      params,
      responseType: "blob",
      validateStatus: () => true,
    }
  );
  if (status >= 400) {
    throw new Error(await readBlobErrorMessage(data));
  }
  if (!responseContentType(headers as Record<string, unknown>).includes("application/pdf")) {
    throw new Error(await readBlobErrorMessage(data));
  }
  await saveBlobResponse(data, filename, session);
}

/** Export PDF avec colonnes en corps JSON (recommandé : pas de limite d’URL). */
export async function downloadExportPdfPost(
  body: Record<string, unknown>,
  filename = "projets-export.pdf",
  session?: BlobDownloadSession
) {
  const { data, headers, status } = await axiosClient.post<Blob>(
    "/projets/export/pdf",
    body,
    {
      responseType: "blob",
      validateStatus: () => true,
    }
  );
  if (status >= 400) {
    throw new Error(await readBlobErrorMessage(data));
  }
  if (!responseContentType(headers as Record<string, unknown>).includes("application/pdf")) {
    throw new Error(await readBlobErrorMessage(data));
  }
  await saveBlobResponse(data, filename, session);
}

export async function downloadProjetPdf(
  id: string,
  reference: string,
  body?: Record<string, string>,
  session?: BlobDownloadSession
) {
  const { data, headers, status } = await axiosClient.post<Blob>(
    `/projets/${id}/export/pdf`,
    body ?? {},
    {
      responseType: "blob",
      validateStatus: () => true,
    }
  );
  if (status >= 400) {
    throw new Error(await readBlobErrorMessage(data));
  }
  if (!responseContentType(headers as Record<string, unknown>).includes("application/pdf")) {
    throw new Error(await readBlobErrorMessage(data));
  }
  await saveBlobResponse(data, `projet-${reference}.pdf`, session);
}

export async function importProjetsExcel(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await axiosClient.post<{
    ok: number;
    errors: { row: number; message: string }[];
  }>("/projets/import", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
