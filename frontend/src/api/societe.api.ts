import { axiosClient } from "./axiosClient";

export type SocieteInfo = {
  denomination: string;
  nomCommercial: string;
  adresseSiegeSocial: string;
  adresseActivite: string;
  formeJuridique: string;
  mf: string;
  capitalSocial: string;
  contactFixe: string;
  contactFax: string;
  contactMobile: string;
  adresseEmail: string;
  rib: string;
  banque: string;
  codeSteg: string;
  codeAnme: string;
  validiteAnme: string;
  gerant: string;
  pdfLogoDataUrl: string;
};

export const EMPTY_SOCIETE_INFO: SocieteInfo = {
  denomination: "",
  nomCommercial: "",
  adresseSiegeSocial: "",
  adresseActivite: "",
  formeJuridique: "",
  mf: "",
  capitalSocial: "",
  contactFixe: "",
  contactFax: "",
  contactMobile: "",
  adresseEmail: "",
  rib: "",
  banque: "",
  codeSteg: "",
  codeAnme: "",
  validiteAnme: "",
  gerant: "",
  pdfLogoDataUrl: "",
};

export async function fetchSocieteInfo() {
  const { data } = await axiosClient.get<SocieteInfo>("/societe");
  return { ...EMPTY_SOCIETE_INFO, ...data };
}

export async function updateSocieteInfo(body: SocieteInfo) {
  const { data } = await axiosClient.put<SocieteInfo>("/societe", body);
  return { ...EMPTY_SOCIETE_INFO, ...data };
}
