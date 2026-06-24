import { prisma } from "../db.js";

const SOCIETE_CODE = "default";

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

function sanitize(v: unknown): string {
  return String(v ?? "").trim();
}

function toSocieteInfo(raw: Partial<SocieteInfo> | null | undefined): SocieteInfo {
  return {
    denomination: sanitize(raw?.denomination),
    nomCommercial: sanitize(raw?.nomCommercial),
    adresseSiegeSocial: sanitize(raw?.adresseSiegeSocial),
    adresseActivite: sanitize(raw?.adresseActivite),
    formeJuridique: sanitize(raw?.formeJuridique),
    mf: sanitize(raw?.mf),
    capitalSocial: sanitize(raw?.capitalSocial),
    contactFixe: sanitize(raw?.contactFixe),
    contactFax: sanitize(raw?.contactFax),
    contactMobile: sanitize(raw?.contactMobile),
    adresseEmail: sanitize(raw?.adresseEmail),
    rib: sanitize(raw?.rib),
    banque: sanitize(raw?.banque),
    codeSteg: sanitize(raw?.codeSteg),
    codeAnme: sanitize(raw?.codeAnme),
    validiteAnme: sanitize(raw?.validiteAnme),
    gerant: sanitize(raw?.gerant),
    pdfLogoDataUrl: sanitize(raw?.pdfLogoDataUrl),
  };
}

export async function getSocieteInfo(): Promise<SocieteInfo> {
  const societe = await upsertSocieteRecord(null);
  return toSocieteInfo(societe ?? DEFAULT_SOCIETE_INFO);
}

export async function updateSocieteInfo(input: SocieteInfo): Promise<SocieteInfo> {
  const data = toSocieteInfo(input);
  const societe = await upsertSocieteRecord(data);
  return toSocieteInfo(societe ?? data);
}

function buildAutoPdfEntete(info: SocieteInfo): string[] {
  const lines: string[] = [];
  if (info.denomination) {
    lines.push(`Dénomination sociale : ${info.denomination}`);
  }
  const partCodes = [
    info.codeSteg ? `Code STEG : ${info.codeSteg}` : "",
    info.codeAnme ? `Code ANME : ${info.codeAnme}` : "",
    info.validiteAnme ? `Validité : ${info.validiteAnme}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
  if (partCodes) {
    lines.push(partCodes);
  }
  if (info.rib) {
    lines.push(`RIB : ${info.rib}`);
  }
  if (info.banque) {
    lines.push(`Banque : ${info.banque}`);
  }
  return lines.slice(0, 4);
}

function buildAutoPdfPied(info: SocieteInfo): string[] {
  const lines: string[] = [];
  const line1 = [
    info.nomCommercial ? `Nom commercial : ${info.nomCommercial}` : "",
    info.formeJuridique ? `Forme juridique : ${info.formeJuridique}` : "",
    info.capitalSocial ? `Capital social : ${info.capitalSocial}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
  if (line1) lines.push(line1);

  const line2 = [
    info.mf ? `MF : ${info.mf}` : "",
    info.gerant ? `Gérant : ${info.gerant}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
  if (line2) lines.push(line2);

  if (info.adresseSiegeSocial) {
    lines.push(`Adresse siège social : ${info.adresseSiegeSocial}`);
  }
  if (info.adresseActivite) {
    lines.push(`Adresse activité : ${info.adresseActivite}`);
  }

  const lineContacts = [
    info.contactFixe ? `Fixe : ${info.contactFixe}` : "",
    info.contactFax ? `Fax : ${info.contactFax}` : "",
    info.contactMobile ? `Mobile : ${info.contactMobile}` : "",
    info.adresseEmail ? `Mail : ${info.adresseEmail}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
  if (lineContacts) lines.push(lineContacts);
  return lines.slice(0, 5);
}

export function buildSocietePdfEntreprise(info: SocieteInfo): {
  enteteLignes: string[];
  piedLignes: string[];
  logoDataUrl: string;
} {
  const enteteLignes = buildAutoPdfEntete(info);
  const piedLignes = buildAutoPdfPied(info);
  const logoDataUrl = info.pdfLogoDataUrl.trim();
  return {
    enteteLignes,
    piedLignes,
    logoDataUrl,
  };
}

type SocieteRecord = SocieteInfo & { code?: string };

function canUsePrismaSocieteModel(): boolean {
  const p = prisma as unknown as { societe?: { upsert?: unknown } };
  return typeof p.societe?.upsert === "function";
}

async function findSocieteRaw(): Promise<SocieteRecord | null> {
  const out = (await prisma.$runCommandRaw({
    find: "Societe",
    filter: { code: SOCIETE_CODE },
    limit: 1,
    singleBatch: true,
  })) as { cursor?: { firstBatch?: unknown[] } };
  const first = out.cursor?.firstBatch?.[0];
  if (!first || typeof first !== "object") return null;
  return first as SocieteRecord;
}

async function upsertSocieteRecord(
  data: SocieteInfo | null
): Promise<SocieteRecord | null> {
  if (canUsePrismaSocieteModel()) {
    const p = prisma as unknown as {
      societe: {
        upsert(args: {
          where: { code: string };
          update: SocieteInfo | Record<string, never>;
          create: { code: string } & SocieteInfo;
        }): Promise<SocieteRecord>;
      };
    };
    return p.societe.upsert({
      where: { code: SOCIETE_CODE },
      update: data ?? {},
      create: { code: SOCIETE_CODE, ...(data ?? DEFAULT_SOCIETE_INFO) },
    });
  }

  const now = new Date();
  const setData = data
    ? { ...data, updatedAt: now }
    : { updatedAt: now };
  await prisma.$runCommandRaw({
    update: "Societe",
    updates: [
      {
        q: { code: SOCIETE_CODE },
        u: {
          $set: setData,
          $setOnInsert: { code: SOCIETE_CODE, createdAt: now },
        },
        upsert: true,
        multi: false,
      },
    ],
  });
  return findSocieteRaw();
}
