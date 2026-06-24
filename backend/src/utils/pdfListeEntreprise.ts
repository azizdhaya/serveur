/**
 * Gabarit type « projets-export-custom » : en-tête société, titre, pied de page.
 * Logo : `backend/assets/logo.png` (ou `logo.jpg`), ou `PDF_LOGO_PATH`.
 * Boîte d’affichage (mm) : `PDF_LOGO_MAX_WIDTH_MM` / `PDF_LOGO_MAX_HEIGHT_MM` (défaut 78×22), ratio conservé.
 */

export function getPdfListeEnteteLignes(): string[] {
  return [
    process.env.PDF_ENTETE_L1 ?? "Ste Just For Future",
    process.env.PDF_ENTETE_L2 ?? "23 rue de la république sousse",
    process.env.PDF_ENTETE_L3 ?? "RIB : ZITOUNA 25 054000000083449780",
    process.env.PDF_ENTETE_L4 ?? "RC :1693414/D / CTVA :1693414DAM000",
  ];
}

export function getPdfListePiedLignes(): string[] {
  return [
    process.env.PDF_PIED_L1 ?? "SARL au capital de 10.000DT",
    process.env.PDF_PIED_L2 ?? "MF : 1693414D/A/M000 / RC : 1693414/D",
    process.env.PDF_PIED_L3 ?? "Adresse : N° 23 AV, de la République Sousse",
    process.env.PDF_PIED_L4 ?? "Tél : 73 201 761 Fax : 73 201 760 GSM : 97 287 005",
    process.env.PDF_PIED_L5 ??
      "sbibenabdallah@gmail.com justforfuture.commercial@gmail.com",
  ];
}

function pickCustomLines(source: Record<string, unknown>, prefix: string, max: number): string[] {
  const lines: string[] = [];
  for (let i = 1; i <= max; i += 1) {
    const v = source[`${prefix}${i}`];
    if (typeof v !== "string") continue;
    const t = v.trim();
    if (!t) continue;
    lines.push(t.slice(0, 200));
  }
  return lines;
}

export function resolvePdfEntrepriseLignes(source: Record<string, unknown>): {
  enteteLignes?: string[];
  piedLignes?: string[];
} {
  const enteteLignes = pickCustomLines(source, "pdfEnteteL", 4);
  const piedLignes = pickCustomLines(source, "pdfPiedL", 5);
  return {
    enteteLignes: enteteLignes.length ? enteteLignes : undefined,
    piedLignes: piedLignes.length ? piedLignes : undefined,
  };
}

/** `entreprise` = rendu comme l’export custom (défaut). `standard` = bandeau vert historique. */
export function pdfListeLayout(): "entreprise" | "standard" {
  const v = process.env.PDF_EXPORT_LISTE_STYLE?.trim().toLowerCase();
  return v === "standard" || v === "legacy" ? "standard" : "entreprise";
}

/** Fusion du fichier `assets/modele-pdf.pdf` après la liste : `1` pour activer (désactivé par défaut avec mise en page entreprise). */
export function pdfListeFusionModeleActivee(): boolean {
  return process.env.PDF_LISTE_FUSION_MODELE === "1";
}

/** Titre principal du PDF liste (défaut). Surcharge : `PDF_LISTE_TITRE` ou paramètre `pdfTitle` / `title` (API). */
export function getPdfListeTitre(): string {
  const t = process.env.PDF_LISTE_TITRE?.trim();
  return t && t.length > 0 ? t.slice(0, 200) : "Rapport clients photovoltaïques";
}

/** Résout le titre depuis une requête (body ou query). */
export function resolvePdfListTitle(source: Record<string, unknown>): string {
  const p = source.pdfTitle;
  const t = source.title;
  const raw = (typeof p === "string" ? p : typeof t === "string" ? t : "")
    .trim()
    .slice(0, 200);
  if (raw.length > 0) return raw;
  return getPdfListeTitre();
}
