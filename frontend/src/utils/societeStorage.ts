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

const STORAGE_KEY = "pv-dashboard:societe-info-v1";

const DEFAULT_SOCIETE_INFO: SocieteInfo = {
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

function cleanString(v: unknown): string {
  return String(v ?? "").trim();
}

export function getDefaultSocieteInfo(): SocieteInfo {
  return { ...DEFAULT_SOCIETE_INFO };
}

export function parseSocieteInfo(raw: string | null): SocieteInfo {
  if (!raw) return getDefaultSocieteInfo();
  try {
    const j = JSON.parse(raw) as Record<string, unknown>;
    return {
      denomination: cleanString(j.denomination),
      nomCommercial: cleanString(j.nomCommercial),
      adresseSiegeSocial: cleanString(j.adresseSiegeSocial),
      adresseActivite: cleanString(j.adresseActivite),
      formeJuridique: cleanString(j.formeJuridique),
      mf: cleanString(j.mf),
      capitalSocial: cleanString(j.capitalSocial),
      contactFixe: cleanString(j.contactFixe),
      contactFax: cleanString(j.contactFax),
      contactMobile: cleanString(j.contactMobile),
      adresseEmail: cleanString(j.adresseEmail),
      rib: cleanString(j.rib),
      banque: cleanString(j.banque),
      codeSteg: cleanString(j.codeSteg),
      codeAnme: cleanString(j.codeAnme),
      validiteAnme: cleanString(j.validiteAnme),
      gerant: cleanString(j.gerant),
      pdfLogoDataUrl: cleanString(j.pdfLogoDataUrl),
    };
  } catch {
    return getDefaultSocieteInfo();
  }
}

export function getSocieteInfo(): SocieteInfo {
  if (typeof localStorage === "undefined") return getDefaultSocieteInfo();
  return parseSocieteInfo(localStorage.getItem(STORAGE_KEY));
}

export function saveSocieteInfo(info: SocieteInfo): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
}

export function resetSocieteInfo(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

function buildAutoPdfEntete(info: SocieteInfo): string {
  const lines: string[] = [];
  if (info.denomination.trim()) {
    lines.push(`Dénomination sociale : ${info.denomination.trim()}`);
  }
  const steg = info.codeSteg.trim();
  const anme = info.codeAnme.trim();
  const validite = info.validiteAnme.trim();
  if (steg || anme || validite) {
    const part1 = steg ? `Code STEG : ${steg}` : "";
    const part2 = anme ? `Code ANME : ${anme}` : "";
    const part3 = validite ? `Validité : ${validite}` : "";
    lines.push([part1, part2, part3].filter(Boolean).join(" | "));
  }
  if (info.rib.trim()) {
    lines.push(`RIB : ${info.rib.trim()}`);
  }
  if (info.banque.trim()) {
    lines.push(`Banque : ${info.banque.trim()}`);
  }
  return lines.join("\n");
}

function buildAutoPdfPied(info: SocieteInfo): string {
  const lines: string[] = [];
  const nomCommercial = info.nomCommercial.trim();
  const formeJuridique = info.formeJuridique.trim();
  const capital = info.capitalSocial.trim();
  const mf = info.mf.trim();
  const gerant = info.gerant.trim();
  const adresseSiege = info.adresseSiegeSocial.trim();
  const adresseActivite = info.adresseActivite.trim();
  const fixe = info.contactFixe.trim();
  const fax = info.contactFax.trim();
  const mobile = info.contactMobile.trim();
  const email = info.adresseEmail.trim();

  if (nomCommercial || formeJuridique || capital) {
    const p1 = nomCommercial ? `Nom commercial : ${nomCommercial}` : "";
    const p2 = formeJuridique ? `Forme juridique : ${formeJuridique}` : "";
    const p3 = capital ? `Capital social : ${capital}` : "";
    lines.push([p1, p2, p3].filter(Boolean).join(" | "));
  }
  if (mf || gerant) {
    const p1 = mf ? `MF : ${mf}` : "";
    const p2 = gerant ? `Gérant : ${gerant}` : "";
    lines.push([p1, p2].filter(Boolean).join(" | "));
  }
  if (adresseSiege) {
    lines.push(`Adresse siège social : ${adresseSiege}`);
  }
  if (adresseActivite) {
    lines.push(`Adresse activité : ${adresseActivite}`);
  }
  if (fixe || fax || mobile || email) {
    const p1 = fixe ? `Fixe : ${fixe}` : "";
    const p2 = fax ? `Fax : ${fax}` : "";
    const p3 = mobile ? `Mobile : ${mobile}` : "";
    const p4 = email ? `Mail : ${email}` : "";
    lines.push([p1, p2, p3, p4].filter(Boolean).join(" | "));
  }
  return lines.join("\n");
}

export function getSocietePdfPayload(info: SocieteInfo): Record<string, string> {
  const out: Record<string, string> = {};
  const splitLines = (raw: string, max: number): string[] =>
    raw
      .split(/\r?\n/g)
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, max);
  const enteteAutoLines = splitLines(buildAutoPdfEntete(info), 4);
  enteteAutoLines.forEach((line, idx) => {
    out[`pdfEnteteL${idx + 1}`] = line;
  });

  const piedAutoLines = splitLines(buildAutoPdfPied(info), 5);
  piedAutoLines.forEach((line, idx) => {
    out[`pdfPiedL${idx + 1}`] = line;
  });
  if (info.pdfLogoDataUrl.trim()) {
    out.pdfLogoDataUrl = info.pdfLogoDataUrl.trim();
  }
  return out;
}
