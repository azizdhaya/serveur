import type { jsPDF } from "jspdf";
import autoTableImport from "jspdf-autotable";
import {
  ClassementDossier,
  EtatDossier,
  StatutApprobation,
  TypeCompteur,
  TypeContrat,
} from "@prisma/client";
import { formatCommercialExcelCell } from "./commercialDisplay.js";
import { etatDossierToFrenchLabel } from "./excelMapping.js";
import {
  labelsForPdfListKeys,
  labelsForRapportClientsPdf,
  pdfListCellValue,
} from "./projetPdfListColumns.js";
import {
  getPdfListeLogoDrawMmFromDataUrl,
  getPdfListeLogoDrawMm,
  loadPdfLogoForJsPdf,
  resolvePdfLogoPath,
} from "./pdfLogo.js";
import {
  getPdfListeEnteteLignes,
  getPdfListePiedLignes,
  getPdfListeTitre,
} from "./pdfListeEntreprise.js";
import type { ProjetPdfModel } from "./projetPdfModel.js";
import { EMPTY_VALUE_LABEL_FR } from "./emptyDisplay.js";

export type { ProjetPdfModel } from "./projetPdfModel.js";

/** ESM Node : `import x from "jspdf-autotable"` peut être `{ default: fn }` au lieu de `fn`. */
function resolveJspdfAutoTable(): (
  doc: jsPDF,
  opts: Record<string, unknown>
) => void {
  const mod = autoTableImport as unknown;
  if (typeof mod === "function") {
    return mod as (doc: jsPDF, opts: Record<string, unknown>) => void;
  }
  const d = (mod as { default?: unknown }).default;
  if (typeof d === "function") {
    return d as (doc: jsPDF, opts: Record<string, unknown>) => void;
  }
  const inner = (d as { default?: unknown })?.default;
  if (typeof inner === "function") {
    return inner as (doc: jsPDF, opts: Record<string, unknown>) => void;
  }
  throw new Error("jspdf-autotable : export par défaut non résolu");
}

const runAutoTable = resolveJspdfAutoTable();

function dash(s: unknown): string {
  if (s == null || s === "") return EMPTY_VALUE_LABEL_FR;
  return String(s);
}

function fmtDateFr(d: Date | null | undefined): string {
  if (!d) return EMPTY_VALUE_LABEL_FR;
  try {
    return d.toLocaleDateString("fr-FR");
  } catch {
    return EMPTY_VALUE_LABEL_FR;
  }
}

function parseNumericLoose(v: number | string | null | undefined): number | null {
  if (v == null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v)
    .trim()
    .replace(/[ \u00A0\u202F]/g, "")
    .replace(/tnd/gi, "")
    .replace(/(?<=\d)\/(?=\d)/g, ".")
    .replace(",", ".");
  if (!s) return null;
  const x = Number.parseFloat(s);
  return Number.isFinite(x) ? x : null;
}

function fmtMoney(n: number | string | null | undefined): string {
  const x = parseNumericLoose(n);
  if (x == null) return EMPTY_VALUE_LABEL_FR;
  const formatted = x
    .toLocaleString("fr-FR", { maximumFractionDigits: 3 })
    .replace(/[\u00A0\u202F]/g, " ");
  return `${formatted} TND`;
}

/** Affiche un taux en % (accepte valeurs déjà en % ou fraction type 0,075). */
function fmtTaux(n: number | string | null | undefined): string {
  const raw = parseNumericLoose(n);
  if (raw == null) return EMPTY_VALUE_LABEL_FR;
  const x = raw > 0 && raw <= 1 ? raw * 100 : raw;
  const formatted = x
    .toLocaleString("fr-FR", { maximumFractionDigits: 4 })
    .replace(/[\u00A0\u202F]/g, " ");
  return `${formatted} %`;
}

function appr(a: StatutApprobation): string {
  switch (a) {
    case StatutApprobation.APPROUVE:
      return "Approuvé";
    case StatutApprobation.NEANT:
      return "Pas encore";
    case StatutApprobation.EN_ATTENTE:
      return "En attente";
    case StatutApprobation.REJETE:
      return "Rejeté";
    case StatutApprobation.ABANDONNE:
      return "Abandonné";
    default:
      return "Pas encore";
  }
}

function contratLabel(c: TypeContrat | null | undefined): string {
  if (c === TypeContrat.PROGRAMME_PROSOL) return "Programme Prosol";
  if (c === TypeContrat.HORS_PROGRAMME_PROSOL) return "Hors Programme Prosol";
  return EMPTY_VALUE_LABEL_FR;
}

function typeCompteurLabel(t: TypeCompteur | null | undefined): string {
  if (t === TypeCompteur.TRIPHASE) return "Triphasé";
  if (t === TypeCompteur.MONOPHASE) return "Monophasé";
  return EMPTY_VALUE_LABEL_FR;
}

function typeProjetLabel(t: string | null | undefined): string {
  if (t === "PHOTOVOLTAIQUE_CLASSIQUE" || t === "COUPLE_RESEAU")
    return "Couplé au réseau";
  if (t === "POMPAGE") return "Pompage";
  if (t === "ISOLE_AVEC_BATTERIES" || t === "SITE_ISOLE_BATTERIE")
    return "Isolé avec batteries";
  if (t === "AUTRE") return "Autre";
  return "Couplé au réseau";
}

function puissanceSouscriteLabel(t: string | null | undefined): string {
  return t === "POMPAGE" ? "Puissance pompe" : "Puissance souscrite";
}

function splitPresente(s: string | null | undefined): [string, string] {
  if (!s?.trim()) return [EMPTY_VALUE_LABEL_FR, EMPTY_VALUE_LABEL_FR];
  const i = s.indexOf(" / ");
  if (i >= 0) {
    const a = s.slice(0, i).trim();
    const b = s.slice(i + 3).trim();
    return [a || EMPTY_VALUE_LABEL_FR, b || EMPTY_VALUE_LABEL_FR];
  }
  return [s.trim(), EMPTY_VALUE_LABEL_FR];
}

function section(
  doc: jsPDF,
  title: string,
  rows: [string, string][],
  startY: number
): number {
  doc.setTextColor(25, 25, 25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(title, 14, startY);
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.2);
  doc.line(14, startY + 1.5, doc.internal.pageSize.getWidth() - 14, startY + 1.5);
  doc.setFont("helvetica", "normal");
  runAutoTable(doc, {
    startY: startY + 3.5,
    head: [["Champ", "Valeur"]],
    body: rows,
    styles: { fontSize: 8, cellPadding: 1.5 },
    headStyles: { fillColor: [245, 245, 245], textColor: [20, 20, 20] },
    columnStyles: { 0: { cellWidth: 58 } },
    margin: { left: 14, right: 14, bottom: 26 },
  });
  const last = (doc as unknown as { lastAutoTable?: { finalY?: number } })
    .lastAutoTable;
  return (last?.finalY ?? startY) + 8;
}

export function buildProjetFichePdf(
  doc: jsPDF,
  p: ProjetPdfModel,
  options?: {
    enteteLignes?: string[];
    piedLignes?: string[];
    logoDataUrl?: string;
  }
): void {
  const [presentePar, mf] = splitPresente(p.presenteParMF);
  const agent = p.agentCommercial
    ? formatCommercialExcelCell(p.agentCommercial)
    : p.agentCommercialAutre
      ? String(p.agentCommercialAutre).trim().toUpperCase() === "AUTRE"
        ? "Autre"
        : String(p.agentCommercialAutre)
      : EMPTY_VALUE_LABEL_FR;
  const isPompage = p.typeProjet === "POMPAGE";
  const isIsole = p.typeProjet === "ISOLE_AVEC_BATTERIES";
  const isAutre = p.typeProjet === "AUTRE";
  const isTypeSpecifique = isPompage || isIsole || isAutre;
  const contratAchatNorm = String(p.contratAchat ?? "")
    .trim()
    .toUpperCase();
  const conditionSubventionNorm = String(p.conditionSubvention ?? "")
    .trim()
    .toUpperCase();
  const isHorsProsolAnmeOui =
    contratAchatNorm === "HORS_PROGRAMME_PROSOL" && conditionSubventionNorm === "OUI";
  const isProgrammeProsolAnmeNon =
    contratAchatNorm === "PROGRAMME_PROSOL" && conditionSubventionNorm === "NON";
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const hasEnteteOverride = Object.prototype.hasOwnProperty.call(
    options ?? {},
    "enteteLignes"
  );
  const hasPiedOverride = Object.prototype.hasOwnProperty.call(
    options ?? {},
    "piedLignes"
  );
  const hasLogoOverride = Object.prototype.hasOwnProperty.call(
    options ?? {},
    "logoDataUrl"
  );
  const entete = hasEnteteOverride
    ? options?.enteteLignes ?? []
    : getPdfListeEnteteLignes();
  const pied = hasPiedOverride ? options?.piedLignes ?? [] : getPdfListePiedLignes();
  const customLogoDataUrl = options?.logoDataUrl?.trim() ?? "";
  const customLogoMatch = customLogoDataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,/);
  const customLogoFormat = (() => {
    const ext = customLogoMatch?.[1]?.toLowerCase();
    if (ext === "jpg" || ext === "jpeg") return "JPEG";
    if (ext === "png") return "PNG";
    if (ext === "webp") return "WEBP";
    return "PNG";
  })();
  const logoPathFiche = hasLogoOverride ? null : resolvePdfLogoPath();
  const logoFiche = logoPathFiche ? loadPdfLogoForJsPdf(logoPathFiche) : null;
  let logoBottom = 0;
  if (customLogoDataUrl) {
    try {
      const measured = getPdfListeLogoDrawMmFromDataUrl(customLogoDataUrl);
      const x = pageW - 14 - measured.w;
      const y = 10;
      doc.addImage(customLogoDataUrl, customLogoFormat, x, y, measured.w, measured.h);
      logoBottom = y + measured.h;
    } catch {
      /* ignoré */
    }
  } else if (logoFiche) {
    try {
      const measured = logoPathFiche ? getPdfListeLogoDrawMm(logoPathFiche) : { w: 22, h: 14 };
      const x = pageW - 14 - measured.w;
      const y = 10;
      doc.addImage(logoFiche.dataUri, logoFiche.format, x, y, measured.w, measured.h);
      logoBottom = y + measured.h;
    } catch {
      /* ignoré */
    }
  }
  doc.setFont("helvetica", "normal");
  doc.setTextColor(55, 65, 80);
  doc.setFontSize(9);
  let yR = 12;
  for (const line of entete) {
    doc.text(line, 14, yR, { align: "left" });
    yR += 4.5;
  }
  const headerBottom = Math.max(logoBottom, yR);
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.25);
  doc.line(14, headerBottom + 2, pageW - 14, headerBottom + 2);
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Fiche projet photovoltaïque", 14, headerBottom + 9);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${p.reference} · ${p.abonnes}`, 14, headerBottom + 15);
  doc.setTextColor(30, 30, 30);

  let y = headerBottom + 22;

  const s1: [string, string][] = [
    ["Type de projet", typeProjetLabel(p.typeProjet)],
    ["Référence", dash(p.reference)],
    ["Client", dash(p.abonnes)],
    ["Présenté par", presentePar],
    ["CIN", dash(p.cin)],
    ["MF", mf],
    ["Contact", dash(p.contact)],
    ["Adresse e-mail", dash(p.email)],
    ["Lieu d’implantation", dash(p.adresseLieuImplantation)],
    ["District", dash(p.district)],
    ["Type compteur", typeCompteurLabel(p.typeCompteur)],
    ["N° de compteur", dash(p.numeroCompteur)],
    ["Calibre disjoncteur de branchement", dash(p.calibreDisjoncteur)],
    [puissanceSouscriteLabel(p.typeProjet), dash(p.puissanceSouscrite)],
    [
      "Consommation annuelle (kWh/an)",
      p.consommationAnnuelle != null
        ? `${dash(p.consommationAnnuelle)} kWh/an`
        : EMPTY_VALUE_LABEL_FR,
    ],
    ["Coordonnées GPS", dash(p.coordonneesGps)],
  ];
  y = section(doc, "1 · Client", s1, y);

  const s2: [string, string][] = isTypeSpecifique
    ? [
        ["N° devis", dash(p.nDevis)],
        ["Date devis", fmtDateFr(p.dateDevis)],
        ["N° facture", dash(p.nFacture)],
        ["Date facture", fmtDateFr(p.dateFacture)],
        ["Montant devis", fmtMoney(p.montantTTC ?? null)],
        ["Montant facture", fmtMoney(p.montantTTCFinal ?? null)],
        ["Montant financement TND", fmtMoney(p.montantFinancement ?? null)],
        ["Reste à payer", fmtMoney(p.resteAPayer ?? null)],
      ]
    : [
        ["Contrat d’achat", contratLabel(p.contratAchat)],
        ["Montant financement TND", fmtMoney(p.montantFinancement ?? null)],
        ["N° devis", dash(p.nDevis)],
        ["Taux d’intérêt", fmtTaux(p.tauxInteret ?? null)],
        ["Montant devis", fmtMoney(p.montantTTC ?? null)],
        ["Montant facture", fmtMoney(p.montantTTCFinal ?? null)],
        ["Montant autofinancement", fmtMoney(p.montantAutofinancement ?? null)],
        ["Reste à payer", fmtMoney(p.resteAPayer ?? null)],
        ["N° facture", dash(p.nFacture)],
        ["Agent commercial", agent],
        ["Banque", dash(p.banque)],
        ["N° police", dash(p.nPolice)],
        ["Date devis", fmtDateFr(p.dateDevis)],
        ["Date facture", fmtDateFr(p.dateFacture)],
        ["Subvention demandée", fmtMoney(p.subventionDemandee ?? null)],
      ];
  y = section(doc, "2 · Dossier commercial", s2, y);

  const s3: [string, string][] = [
    [
      isPompage || isIsole ? "Puissance à installer (KWC)" : "Puissance installée (kW)",
      p.puissanceInstallee != null ? String(p.puissanceInstallee) : EMPTY_VALUE_LABEL_FR,
    ],
    [
      isIsole ? "Énergie journalière total (Wh/j)" : "Production prévisionnelle",
      dash(p.productionPrevisionnelle),
    ],
    [isPompage || isIsole ? "NB PV utilisé" : "Nb modules", dash(p.nbModules)],
    [
      "Puissance unité PV (W)",
      p.puUnitairePV != null ? String(p.puUnitairePV) : EMPTY_VALUE_LABEL_FR,
    ],
    ["Marque PV", dash(p.marquePV)],
    ["Modèle PV", dash(p.modelePV)],
  ];
  if (isPompage) {
    s3.push(["Marque variateur", dash(p.marqueOnd)]);
    s3.push(["Modèle variateur solaire", dash(p.modeleOnd)]);
    s3.push(["Équipement (sur mesure)", dash(p.equipementSurMesure)]);
    s3.push(["Intervention (sur mesure)", dash(p.interventionSurMesure)]);
  } else if (isIsole) {
    s3.push(["Marque batteries", dash(p.marqueOnd)]);
    s3.push(["Modèle batteries", dash(p.modeleOnd)]);
    s3.push(["NB batteries utilisé", dash(p.nbOnduleurs)]);
    s3.push(["Marque onduleur hybride", dash(p.autreModeleOnd)]);
    s3.push(["Modèle onduleur hybride", dash(p.numeroCompteur)]);
    s3.push([
      "Puissance onduleur hybride",
      p.puUnitaireOnd != null ? String(p.puUnitaireOnd) : EMPTY_VALUE_LABEL_FR,
    ]);
    s3.push(["Équipement (sur mesure)", dash(p.equipementSurMesure)]);
    s3.push(["Intervention (sur mesure)", dash(p.interventionSurMesure)]);
  } else if (isAutre) {
    s3.push(["Équipement (sur mesure)", dash(p.equipementSurMesure)]);
    s3.push(["Intervention (sur mesure)", dash(p.interventionSurMesure)]);
  } else {
    s3.push(["Nb onduleurs", dash(p.nbOnduleurs)]);
    s3.push([
      "Puissance unité onduleur (W)",
      p.puUnitaireOnd != null ? String(p.puUnitaireOnd) : EMPTY_VALUE_LABEL_FR,
    ]);
    s3.push(["Marque onduleur", dash(p.marqueOnd)]);
    s3.push(["Modèle onduleur", dash(p.modeleOnd)]);
    s3.push([
      "PU ond. autre (W)",
      p.puOndSiAutreW != null ? String(p.puOndSiAutreW) : EMPTY_VALUE_LABEL_FR,
    ]);
    s3.push(["Autre modèle onduleur", dash(p.autreModeleOnd)]);
  }
  y = section(doc, "3 · Installation", s3, y);

  const s4: [string, string][] = isTypeSpecifique
    ? [
        ["État dossier", etatDossierToFrenchLabel(p.etatDossier)],
        ["Date d'exécution d'installation", fmtDateFr(p.dateInstallation)],
        ["Exécution d'installation", dash(p.executionInstallation)],
        ["Agent commercial", agent],
      ]
    : [
        ["État dossier", etatDossierToFrenchLabel(p.etatDossier)],
        [
          "Approbation",
          `Commerciale : ${appr(p.approbationCommerciale)} | Technique : ${appr(
            p.approbationTechnique
          )}`,
        ],
        ["Exécution d'installation", dash(p.executionInstallation)],
        ["Réception", dash(p.reception)],
        ["Procès-verbal", dash(p.procesVerbal)],
        ["N° lot déblocage PROSOL", dash(p.nLotDebProsol)],
        ...(!isHorsProsolAnmeOui ? ([["Saisie Prosol", dash(p.saisieProsol)]] as [string, string][]) : []),
        ["Déblocage Prosol", dash(p.deblocageProsol)],
        ...(!isProgrammeProsolAnmeNon
          ? ([
              ["N° lot subvention", dash(p.nLotDeblocageSubvention)],
              ["Saisie subvention", dash(p.saisieSubvention)],
              ["Déblocage subvention", dash(p.deblocageSubvention)],
            ] as [string, string][])
          : []),
      ];
  y = section(doc, "4 · Suivi dossier", s4, y);

  if (p.echeances?.length) {
    const echBody = p.echeances.map((e) => [
      String(e.numero),
      e.montant != null ? String(e.montant) : EMPTY_VALUE_LABEL_FR,
      fmtDateFr(e.date),
      dash(e.modePaiement),
      dash(e.description),
    ]);
    runAutoTable(doc, {
      startY: y,
      head: [["N°", "Montant", "Date", "Mode paiement", "Description"]],
      body: echBody,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [245, 245, 245], textColor: [20, 20, 20] },
      margin: { left: 14, right: 14, bottom: 26 },
    });
    const last = (doc as unknown as { lastAutoTable?: { finalY?: number } })
      .lastAutoTable;
    y = (last?.finalY ?? y) + 6;
  }

  if (p.commentaire?.trim()) {
    if (y > doc.internal.pageSize.getHeight() - 44) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Commentaire", 14, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(
      p.commentaire.trim(),
      doc.internal.pageSize.getWidth() - 28
    );
    doc.text(lines, 14, y + 6);
  }

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i += 1) {
    doc.setPage(i);
    doc.setDrawColor(210, 214, 220);
    doc.setLineWidth(0.25);
    doc.line(14, pageH - 24, pageW - 14, pageH - 24);
    doc.setTextColor(55, 65, 80);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    let fy = pageH - 20;
    for (const line of pied) {
      doc.text(line, 14, fy);
      fy += 3.5;
    }
    doc.text(`Page ${i}/${totalPages}`, pageW - 14, pageH - 6, { align: "right" });
  }
}

export function buildProjetsListPdf(
  doc: jsPDF,
  rows: ProjetPdfModel[],
  subtitleLines: string[],
  columnKeys: string[],
  layout: "entreprise" | "standard" = "entreprise",
  reportTitle?: string,
  options?: {
    enteteLignes?: string[];
    piedLignes?: string[];
    logoDataUrl?: string;
  }
): void {
  const titre = (reportTitle?.trim() || getPdfListeTitre()).slice(0, 200);
  const head = [
    layout === "entreprise"
      ? labelsForRapportClientsPdf(columnKeys)
      : labelsForPdfListKeys(columnKeys),
  ];
  const tableRows = rows.map((p) =>
    columnKeys.map((k) => String(pdfListCellValue(k, p)))
  );

  const nCols = columnKeys.length;
  const fs = nCols > 14 ? 5.5 : nCols > 10 ? 6.5 : 7;

  if (layout === "standard") {
    doc.setFillColor(15, 118, 110);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 22, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(titre, 14, 14);
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(8);
    let subY = 26;
    for (const line of subtitleLines) {
      doc.text(line, 14, subY);
      subY += 4;
    }

    runAutoTable(doc, {
      startY: subY + 4,
      head,
      body: tableRows,
      styles: { fontSize: fs, cellPadding: 0.8 },
      headStyles: { fillColor: [15, 118, 110], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 10, right: 10 },
    });
    return;
  }

  /** Gabarit type export custom : logo à gauche, société à droite, ligne verte, titre, sous-titres, tableau. */
  const hasEnteteOverride = Object.prototype.hasOwnProperty.call(
    options ?? {},
    "enteteLignes"
  );
  const hasPiedOverride = Object.prototype.hasOwnProperty.call(
    options ?? {},
    "piedLignes"
  );
  const hasLogoOverride = Object.prototype.hasOwnProperty.call(
    options ?? {},
    "logoDataUrl"
  );
  const entete = hasEnteteOverride
    ? options?.enteteLignes ?? []
    : getPdfListeEnteteLignes();
  const pied = hasPiedOverride ? options?.piedLignes ?? [] : getPdfListePiedLignes();
  const bottomReserveMm = 28;
  const margin = 14;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  const logoPath = hasLogoOverride ? null : resolvePdfLogoPath();
  const logo = logoPath ? loadPdfLogoForJsPdf(logoPath) : null;
  const customLogoDataUrl = options?.logoDataUrl?.trim() ?? "";
  const customLogoMatch = customLogoDataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,/);
  const customLogoFormat = (() => {
    const ext = customLogoMatch?.[1]?.toLowerCase();
    if (ext === "jpg" || ext === "jpeg") return "JPEG";
    if (ext === "png") return "PNG";
    if (ext === "webp") return "WEBP";
    return "PNG";
  })();
  const { w: logoW, h: logoH } = logoPath
    ? getPdfListeLogoDrawMm(logoPath)
    : { w: 0, h: 0 };
  const customLogoDraw = customLogoDataUrl
    ? getPdfListeLogoDrawMmFromDataUrl(customLogoDataUrl)
    : null;
  const logoDrawW = customLogoDraw?.w ?? logoW;
  const logoDrawH = customLogoDraw?.h ?? logoH;

  if (customLogoDataUrl) {
    try {
      doc.addImage(customLogoDataUrl, customLogoFormat, pageW - margin - logoDrawW, 10, logoDrawW, logoDrawH);
    } catch {
      /* image custom illisible */
    }
  } else if (logo) {
    try {
      doc.addImage(logo.dataUri, logo.format, pageW - margin - logoDrawW, 10, logoDrawW, logoDrawH);
    } catch {
      /* image illisible ou format non géré */
    }
  }

  doc.setFont("helvetica", "normal");
  doc.setTextColor(28, 37, 54);
  doc.setFontSize(9);
  let yR = 12;
  for (const line of entete) {
    doc.text(line, margin, yR);
    yR += 5;
  }
  const logoBottom = customLogoDataUrl || logo ? 10 + logoDrawH : 0;
  const headerTextBottom = yR;
  const sepY = Math.max(logoBottom, headerTextBottom) + 3;

  doc.setDrawColor(15, 118, 110);
  doc.setLineWidth(0.35);
  doc.line(margin, sepY, pageW - margin, sepY);

  let y = sepY + 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(28, 37, 54);
  doc.text(titre, margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  y += 7;
  doc.setTextColor(55, 65, 80);
  for (const line of subtitleLines) {
    doc.text(line, margin, y);
    y += 5;
  }
  doc.setDrawColor(210, 214, 220);
  doc.setLineWidth(0.25);
  doc.line(margin, y + 2, pageW - margin, y + 2);
  const tableStartY = y + 6;

  runAutoTable(doc, {
    startY: tableStartY,
    head,
    body: tableRows,
    styles: {
      fontSize: fs,
      cellPadding: 1,
      textColor: [34, 43, 64],
    },
    headStyles: {
      fillColor: [226, 232, 240],
      textColor: [15, 23, 42],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 12, right: 12, bottom: bottomReserveMm },
    didDrawPage: (data: { pageNumber: number }) => {
      doc.setPage(data.pageNumber);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(55, 65, 80);
      let fy = pageH - bottomReserveMm + 3;
      for (const pl of pied) {
        doc.text(pl, 12, fy);
        fy += 3.5;
      }
      doc.text(`Page ${data.pageNumber}`, pageW - 24, pageH - 6);
    },
  });
}
