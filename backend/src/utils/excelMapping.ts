import {
  ClassementDossier,
  EtatDossier,
  StatutApprobation,
  TypeCompteur,
  TypeContrat,
} from "@prisma/client";
import { Prisma } from "@prisma/client";
import { formatCommercialExcelCell } from "./commercialDisplay.js";

/** Nombre de paires Montant/Date échéance dans le gabarit (import + export). */
export const ECHEANCE_EXCEL_COUNT = 40;

/** En-têtes dans l'ordre du fichier Excel source (étendu avec échéances 1…N). */
export const EXCEL_HEADERS: string[] = [
  "Code Barre",
  "Référence",
  "Abonnés",
  "État de Dossier",
  "District",
  "Approbation Commercial",
  "Approbation Technique",
  "Exécution d'Installation",
  "Réception",
  "Procès-Verbal",
  "N° LOT DEB.PROSOL",
  "Saisie Prosol",
  "N° Lot Déblocage subvention :",
  "Déblocage Prosol",
  "Condition subvention",
  "Saisie Subvention",
  "Déblocage Subvention",
  "CONTACT",
  "Contrat d'Achat",
  "Puissance à Installée (W)",
  "Type Compteur",
  "Numéro Compteur",
  "Calibre disjoncteur",
  "Puissance souscrite",
  "Production prévisionnelle ",
  "Date Dépôt Dossier",
  "Date Approbation",
  "N° Police",
  "Date d'Installation :",
  "Date Dépôt de dde de MES",
  "Date de MES",
  "N° CIN",
  "Montant_TND",
  "Taux d'Intérêt",
  "Banque",
  "Agent Commercial",
  "Adresse",
  "Lieu Implantation",
  "Présenté par",
  "MF",
  "Nb Modules",
  "PU PV (W)",
  "Marque PV",
  "Modèle PV",
  "Nb Onduleur (s)",
  "PU OND (W)",
  "Marque OND",
  "Modèle OND",
  "PU OND si autre modèle (W)",
  "Autre modèle OND",
  "Rapport de puissance :",
  "Consomation Annuelle (KWh/an)",
  "Subvention Demandée",
  "N° DEVIS",
  "Date devis",
  "N° Facture",
  "Date Facture",
  "Montant HT",
  "TVA",
  "Montant TTC",
  "Montant TTC Final",
  "Montant d'Autofinancement",
  "Frais pose cmpt Prosol Elec",
  "Paiement 1er Facture STEG",
  "Paiement 2ème Facture STEG2",
  "Frais augmentation calibre",
  "Frais mutation Elec",
  "Frais mutation Gaz",
  "Frais passage mono à tri",
  "Autre frais",
  "Réglement client",
  ...Array.from({ length: ECHEANCE_EXCEL_COUNT }, (_, idx) => {
    const n = idx + 1;
    const dateH = n === 9 ? "Date échéance9" : `Date échéance ${n}`;
    return [`Montant échéance ${n}`, dateH] as const;
  }).flat(),
  "Reste à payer",
  "Quementaire",
  "Classement Dossier",
];

function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function buildHeaderMap(row: string[]): Map<string, number> {
  const m = new Map<string, number>();
  row.forEach((h, i) => {
    m.set(norm(h), i);
  });
  return m;
}

function cell(
  row: unknown[],
  map: Map<string, number>,
  ...aliases: string[]
): string {
  for (const a of aliases) {
    const i = map.get(norm(a));
    if (i !== undefined && row[i] != null) {
      const v = row[i];
      if (v instanceof Date) return v.toISOString();
      const s = String(v).trim();
      if (s !== "") return s;
    }
  }
  return "";
}

function parseExcelDate(v: string): Date | null {
  if (!v) return null;
  const n = Number(v);
  if (!Number.isNaN(n) && n > 20000 && n < 60000) {
    const utc = Math.round((n - 25569) * 86400 * 1000);
    return new Date(utc);
  }
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function parseNum(v: string): number | null {
  if (!v || v === "_") return null;
  const x = v.replace(/\s/g, "").replace(",", ".");
  if (x === "" || x === "-") return null;
  const n = parseFloat(x);
  return Number.isNaN(n) ? null : n;
}

/** Taux d’intérêt en % ; Excel peut contenir « 7,5 », « 7,5 % » ou une fraction « 0,075 ». */
function parseTauxInteretPercent(raw: string): number | null {
  const t = String(raw ?? "").trim();
  if (!t || t === "_") return null;
  const cleaned = t.replace(/\s/g, "").replace(/%/g, "").replace(",", ".");
  if (cleaned === "" || cleaned === "-") return null;
  const n = parseFloat(cleaned);
  if (!Number.isFinite(n)) return null;
  if (n > 0 && n <= 1) return n * 100;
  return n;
}

/** Libellés français pour export Excel / PDF (alignés métier, genre masculin pour « dossier »). */
export function etatDossierToFrenchLabel(e: EtatDossier): string {
  switch (e) {
    case EtatDossier.ABANDONNE:
      return "Abandonné";
    case EtatDossier.ARCHIVE:
      return "Archivé";
    case EtatDossier.EN_NEGOCIATION:
      return "En négociation";
    case EtatDossier.FINIE:
      return "Fini";
    case EtatDossier.OUVERT:
      return "Ouvert";
    default:
      return "Ouvert";
  }
}

function mapEtat(s: string): EtatDossier {
  const t = String(s ?? "").trim();
  if (!t) return EtatDossier.OUVERT;
  const n = norm(t);
  if (n.includes("abandon")) return EtatDossier.ABANDONNE;
  if (n === "archiver" || n === "archive") return EtatDossier.ARCHIVE;
  if (n.includes("negoci")) return EtatDossier.EN_NEGOCIATION;
  if (n.includes("fini") || n.includes("finie") || n.includes("termine"))
    return EtatDossier.FINIE;
  if (n.includes("ouvert")) return EtatDossier.OUVERT;
  return EtatDossier.OUVERT;
}

/** Libellés canoniques (liste Excel / formulaire). */
function mapExecutionInstallation(s: string): string | null {
  const t = String(s ?? "").trim();
  if (!t) return null;
  const n = norm(t);
  if (n === "executee" || n === "execute") return "Exécutée";
  if (n === "neant" || n === "nant") return null;
  if (n === "pas encore") return "Pas encore";
  return t;
}

function mapProcesVerbal(s: string): string | null {
  const t = String(s ?? "").trim();
  if (!t) return null;
  const n = norm(t);
  if (n === "neant" || n === "nant") return null;
  if (n === "obtenue") return "Obtenue";
  if (n === "pas encore") return "Pas encore";
  return t;
}

function mapReception(s: string): string | null {
  const t = String(s ?? "").trim();
  if (!t) return null;
  const n = norm(t);
  if (n === "neant" || n === "nant") return null;
  if (n === "pas encore") return "Pas encore";
  if (n === "receptionner" || n === "receptionne") return "Réceptionner";
  return t;
}

function mapSaisieProsol(s: string): string | null {
  const t = String(s ?? "").trim();
  if (!t) return null;
  const n = norm(t);
  if (n === "envoye") return "Envoyé";
  if (n === "neant" || n === "nant") return null;
  if (n === "pas encore") return "Pas encore";
  return t;
}

function mapDeblocageProsol(s: string): string | null {
  const t = String(s ?? "").trim();
  if (!t) return null;
  const n = norm(t);
  if (n === "neant" || n === "nant") return null;
  if (n === "pas encore") return "Pas encore";
  if (n === "payer") return "Payer";
  return t;
}

function mapAppro(s: string): StatutApprobation {
  const t = String(s ?? "").trim();
  if (!t) return StatutApprobation.PAS_ENCORE;
  const up = t.toUpperCase().replace(/\s+/g, "_");
  if (up === "APPROUVE") return StatutApprobation.APPROUVE;
  if (up === "PAS_ENCORE") return StatutApprobation.PAS_ENCORE;
  if (up === "NEANT") return StatutApprobation.NEANT;
  if (up === "EN_ATTENTE") return StatutApprobation.EN_ATTENTE;
  if (up === "REJETE") return StatutApprobation.REJETE;
  if (up === "ABANDONNE") return StatutApprobation.ABANDONNE;
  const n = norm(t);
  if (n.includes("approuv")) return StatutApprobation.APPROUVE;
  if (n === "neant" || n === "nant") return StatutApprobation.NEANT;
  if (n.includes("attente")) return StatutApprobation.EN_ATTENTE;
  if (n.includes("rejet")) return StatutApprobation.REJETE;
  if (n.includes("abandon")) return StatutApprobation.ABANDONNE;
  if (n === "pas encore" || n.includes("pas encore"))
    return StatutApprobation.PAS_ENCORE;
  return StatutApprobation.PAS_ENCORE;
}

/** Colonne Excel Approbation_Commercial : Approuvé, Néant, Pas encore ; sinon repli sur mapAppro. */
function mapApproCommerciale(s: string): StatutApprobation {
  const t = String(s ?? "").trim();
  if (!t) return StatutApprobation.PAS_ENCORE;
  const up = t.toUpperCase().replace(/\s+/g, "_");
  if (up === "APPROUVE" || up === "NEANT" || up === "PAS_ENCORE") {
    return mapAppro(t);
  }
  const n = norm(t);
  if (n.includes("approuv")) return StatutApprobation.APPROUVE;
  if (n === "neant" || n === "nant") return StatutApprobation.NEANT;
  if (n === "pas encore" || n.includes("pas encore")) {
    return StatutApprobation.PAS_ENCORE;
  }
  return mapAppro(t);
}

function mapContrat(s: string): TypeContrat | null {
  const t = String(s ?? "").trim();
  if (!t) return null;
  const up = t.toUpperCase().replace(/\s+/g, "_");
  if (up === "PROGRAMME_PROSOL") return TypeContrat.PROGRAMME_PROSOL;
  if (up === "HORS_PROGRAMME_PROSOL") return TypeContrat.HORS_PROGRAMME_PROSOL;
  const n = norm(t);
  if (!n) return null;
  if (
    n === "neant" ||
    n === "nant" ||
    n === "na" ||
    n === "n a" ||
    n === "vide" ||
    n === "aucun" ||
    n === "sans" ||
    n === "nd" ||
    n === "n d" ||
    n === "-" ||
    n === "x" ||
    n === "xx"
  )
    return null;
  /** « Hors Programme Prosol » contient aussi « programme » + « prosol » : tester hors en premier. */
  if (n.includes("hors")) return TypeContrat.HORS_PROGRAMME_PROSOL;
  if (n.includes("programme") && n.includes("prosol"))
    return TypeContrat.PROGRAMME_PROSOL;
  return null;
}

function mapCompteur(s: string): TypeCompteur | null {
  const t = String(s ?? "").trim();
  if (!t) return null;
  const up = t.toUpperCase().replace(/\s+/g, "");
  if (up === "MONOPHASE") return TypeCompteur.MONOPHASE;
  if (up === "TRIPHASE") return TypeCompteur.TRIPHASE;
  const n = norm(t);
  if (!n) return null;
  /** Valeurs « vide / non applicable » (ex. Néant, faute Néant → néant). */
  if (
    n === "neant" ||
    n === "nant" ||
    n === "na" ||
    n === "n a" ||
    n === "vide" ||
    n === "aucun" ||
    n === "sans" ||
    n === "nd" ||
    n === "n d" ||
    n === "-" ||
    n === "x" ||
    n === "xx"
  )
    return null;
  if (n.includes("tri")) return TypeCompteur.TRIPHASE;
  if (n.includes("mono")) return TypeCompteur.MONOPHASE;
  return null;
}

function mapClassement(s: string): ClassementDossier {
  const n = norm(s);
  if (n.includes("archiv") && !n.includes("non")) return ClassementDossier.ARCHIVE;
  return ClassementDossier.NON_ARCHIVE;
}

/** Colonne Excel mode_paiement (fautes courantes : Avoire, Espéce). */
function mapModePaiement(s: string): string | null {
  const t = String(s ?? "").trim();
  if (!t || t === "-" || t === "—") return null;
  const n = norm(t);
  if (n === "avoire" || n === "avoir") return "Avoir";
  if (n === "cheque" || n === "chèque") return "Chèque";
  if (n === "espece" || n === "espéce" || n === "espèce") return "Espèce";
  if (n.includes("frais") && n.includes("charge") && n.includes("entreprise")) {
    return "Frais à la charge de l'entreprise";
  }
  if (n.includes("retenue") && n.includes("source"))
    return "Retenue à la source";
  if (n.includes("traite") && n.includes("bancaire")) return "Traite Bancaire";
  if (n === "versement") return "Versement";
  if (n === "virement") return "Virement";
  if (n === "autre") return "Autre";
  const labels = [
    "Avoir",
    "Chèque",
    "Espèce",
    "Frais à la charge de l'entreprise",
    "Retenue à la source",
    "Traite Bancaire",
    "Versement",
    "Virement",
    "Autre",
  ];
  for (const lab of labels) {
    if (norm(lab) === n) return lab;
  }
  return t;
}

export type RowImportResult = {
  reference: string;
  data: Prisma.ProjetCreateInput;
  echeances: {
    numero: number;
    montant: number | null;
    date: Date | null;
    modePaiement: string | null;
    description: string | null;
  }[];
  agentCommercialName?: string;
};

export function rowToProjetInput(
  row: unknown[],
  headerRow: string[]
): RowImportResult | null {
  const map = buildHeaderMap(headerRow);
  const ref = cell(row, map, "Référence", "Reference", "Référence :");
  if (!ref) return null;
  const adresse = cell(row, map, "Adresse", "Adresse :");
  const lieu = cell(
    row,
    map,
    "Lieu Implantation",
    "Lieu Implantation :",
    "Lieu d'implantation",
    "Lieu d’implantation",
    "Lieu Implantation "
  );
  const adresseLieu =
    [adresse, lieu].filter(Boolean).join(" — ") || null;

  const echeances: RowImportResult["echeances"] = [];
  for (let i = 1; i <= ECHEANCE_EXCEL_COUNT; i++) {
    const mAliases = [`Montant échéance ${i}`];
    const dAliases =
      i === 9
        ? ["Date échéance9", `Date échéance ${i}`]
        : [`Date échéance ${i}`];
    const ms = parseNum(cell(row, map, ...mAliases));
    const ds = cell(row, map, ...dAliases);
    const modeRaw =
      cell(
        row,
        map,
        `Mode paiement ${i}`,
        `Mode paiement échéance ${i}`
      ) ||
      (i === 1 ? cell(row, map, "mode_paiement") : "");
    const descEch = cell(
      row,
      map,
      `Description échéance ${i}`,
      `Commentaire échéance ${i}`
    );
    echeances.push({
      numero: i,
      montant: ms,
      date: parseExcelDate(ds),
      modePaiement: mapModePaiement(modeRaw),
      description: descEch?.trim() ? descEch.trim() : null,
    });
  }

  const approFusion = cell(row, map, "Approbation :", "Approbation");

  let puissanceInstalleeVal = parseNum(
    cell(
      row,
      map,
      "Puissance à Installée (W)",
      "Puissance à Installée :"
    )
  );
  if (puissanceInstalleeVal == null) {
    const kwc = parseNum(cell(row, map, "Puissance à installer (KWC)"));
    if (kwc != null) puissanceInstalleeVal = kwc * 1000;
  }

  const commentBase = cell(
    row,
    map,
    "Quementaire",
    "Commentaire",
    "Commentaire / Bloc Note"
  );
  const gpsTxt = cell(row, map, "Coordonnées GPS", "Coordonnées GPS :");
  const commentMerged =
    [commentBase, gpsTxt ? `GPS : ${gpsTxt}` : ""]
      .filter((x) => x && String(x).trim() !== "")
      .join("\n") || null;

  return {
    reference: ref,
    agentCommercialName: cell(row, map, "Agent Commercial") || undefined,
    echeances,
    data: {
      codeBarres: cell(row, map, "Code Barre") || null,
      reference: ref,
      abonnes:
        cell(
          row,
          map,
          "Abonnés",
          "Abonné",
          "Abonnes",
          "Client",
          "Nom et prénom",
          "Nom & prénom",
          "Nom et prenom",
          "Raison sociale"
        ) || ref,
      etatDossier: mapEtat(
        cell(
          row,
          map,
          "État de Dossier",
          "Etat de Projet",
          "Etat_Dossier",
          "État de dossier"
        )
      ),
      district: cell(row, map, "District") || null,
      gouvernorat: cell(row, map, "Gouvernorat", "Gouvernorat ") || null,
      delegation: cell(row, map, "Délégation", "Delegation", "Délégation ") || null,
      municipalite: cell(row, map, "Municipalité", "Municipalite", "Municipalité ") || null,
      approbationCommerciale: mapApproCommerciale(
        cell(
          row,
          map,
          "Approbation Commercial",
          "Approbation_Commercial",
          "Approbation commerciale"
        ) || approFusion
      ),
      approbationTechnique: mapAppro(
        cell(
          row,
          map,
          "Approbation Technique",
          "Approbation_Technique",
          "Approbation technique"
        ) || approFusion
      ),
      executionInstallation: (() => {
        const raw = cell(
          row,
          map,
          "Exécution d'Installation",
          "Exécution d’Installation",
          "Excution_Installation",
          "Execution_Installation",
          "Exécution installation"
        );
        return mapExecutionInstallation(raw) || null;
      })(),
      reception: (() => {
        const raw = cell(row, map, "Réception");
        return mapReception(raw) || null;
      })(),
      procesVerbal: (() => {
        const raw = cell(
          row,
          map,
          "Procès-Verbal",
          "Procès_Verbal",
          "Proces_Verbal",
          "Procès verbal"
        );
        return mapProcesVerbal(raw) || null;
      })(),
      nLotDebProsol: cell(row, map, "N° LOT DEB.PROSOL") || null,
      saisieProsol: (() => {
        const raw = cell(
          row,
          map,
          "Saisie Prosol",
          "Saisie_Prosol",
          "Saisie prosol"
        );
        return mapSaisieProsol(raw) || null;
      })(),
      nLotDeblocageSubvention:
        cell(row, map, "N° Lot Déblocage subvention :") || null,
      deblocageProsol: (() => {
        const raw = cell(
          row,
          map,
          "Déblocage Prosol",
          "Déblocage_Prosol",
          "Deblocage_Prosol",
          "Déblocage prosol"
        );
        return mapDeblocageProsol(raw) || null;
      })(),
      conditionSubvention: cell(row, map, "Condition subvention") || null,
      saisieSubvention: (() => {
        const raw = cell(
          row,
          map,
          "Saisie Subvention",
          "Saisie_Subvention",
          "Saisie subvention"
        );
        return mapSaisieProsol(raw) || null;
      })(),
      deblocageSubvention: (() => {
        const raw = cell(
          row,
          map,
          "Déblocage Subvention",
          "Déblocage_Subvention",
          "Deblocage_Subvention",
          "Déblocage subvention"
        );
        return mapDeblocageProsol(raw) || null;
      })(),
      contact:
        cell(
          row,
          map,
          "CONTACT",
          "Contact",
          "Téléphone",
          "Telephone",
          "Tel",
          "GSM",
          "Mobile"
        ) || null,
      contratAchat: mapContrat(
        cell(
          row,
          map,
          "Contrat d'Achat",
          "Contrat d'Achat :",
          "Contrat_Achat",
          "Contrat Achat"
        )
      ),
      puissanceInstallee: puissanceInstalleeVal,
      typeCompteur: mapCompteur(
        cell(
          row,
          map,
          "Type Compteur",
          "Type Compteur :",
          "Type_Compteur",
          "Type_Copmteur",
          "Type Copmteur"
        )
      ),
      numeroCompteur: cell(row, map, "Numéro Compteur") || null,
      calibreDisjoncteur: cell(row, map, "Calibre disjoncteur") || null,
      puissanceSouscrite: cell(row, map, "Puissance souscrite") || null,
      productionPrevisionnelle: parseNum(
        cell(row, map, "Production prévisionnelle ", "Production prévisionnelle")
      ),
      dateDepotDossier: parseExcelDate(
        cell(row, map, "Date Dépôt Dossier", "Date Dépôt Dossier :")
      ),
      dateApprobation: parseExcelDate(
        cell(row, map, "Date Approbation", "Date Approbation :")
      ),
      nPolice:
        cell(row, map, "N° Police", "N° de Police", "N° de Police :") || null,
      dateInstallation: parseExcelDate(
        cell(row, map, "Date d'Installation :")
      ),
      dateDepotDemandeMES: parseExcelDate(
        cell(row, map, "Date Dépôt de dde de MES")
      ),
      dateMES: parseExcelDate(cell(row, map, "Date de MES")),
      cin: cell(row, map, "N° CIN", "N° CIN :", "CIN", "N CIN") || null,
      montantFinancement: parseNum(
        cell(
          row,
          map,
          "Montant_TND",
          "Montant TND",
          "Montant Financement TND",
          "Montant Financement TND :"
        )
      ),
      tauxInteret: parseTauxInteretPercent(cell(row, map, "Taux d'Intérêt")),
      banque: cell(row, map, "Banque") || null,
      adresseLieuImplantation:
        adresseLieu ||
        cell(
          row,
          map,
          "Lieu Implantation",
          "Lieu Implantation :",
          "Lieu d'implantation"
        ) ||
        null,
      presenteParMF:
        [
          cell(
            row,
            map,
            "Présenté par",
            "Présenté par :",
            "Présenter par",
            "Présenter par :",
            "Presente par",
            "Presenté par"
          ),
          cell(row, map, "MF", "MF :", "Matricule fiscal", "M F"),
        ]
          .filter(Boolean)
          .join(" / ") || null,
      nbModules:
        parseInt(
          cell(
            row,
            map,
            "Nb Modules",
            "Nombre PV",
            "Nombre PV :",
            "NB PV Utilisé"
          ),
          10
        ) || null,
      puUnitairePV: parseNum(
        cell(
          row,
          map,
          "PU PV (W)",
          "Puissace Unité PV (W)",
          "Puissance Unité PV :"
        )
      ),
      marquePV: cell(row, map, "Marque PV") || null,
      modelePV: cell(row, map, "Modèle PV", "Modèle PV :") || null,
      nbOnduleurs:
        parseInt(
          cell(
            row,
            map,
            "Nb Onduleur (s)",
            "Nombre Onduleur",
            "Nombre Onduleur :"
          ),
          10
        ) || null,
      puUnitaireOnd: parseNum(
        cell(
          row,
          map,
          "PU OND (W)",
          "Puissance Unité Onduleur W",
          "Puissance Unité Onduleur W :"
        )
      ),
      puOndSiAutreW: parseNum(
        cell(
          row,
          map,
          "PU OND si autre modèle (W)",
          "PU OND si autre modele (W)"
        )
      ),
      marqueOnd:
        cell(row, map, "Marque OND", "Marque Onduleur", "Marque Onduleur :") ||
        null,
      modeleOnd:
        cell(
          row,
          map,
          "Modèle OND",
          "Modele OND",
          "Modèle Onduleur",
          "Modèle Onduleur :"
        ) || null,
      autreModeleOnd: cell(row, map, "Autre modèle OND", "Autre modele OND") || null,
      rapportPuissance:
        cell(
          row,
          map,
          "Rapport de puissance :",
          "Rapport de puissance",
          "Rapport de puissance:"
        ) || null,
      consommationAnnuelle: parseNum(
        cell(row, map, "Consomation Annuelle (KWh/an)")
      ),
      subventionDemandee: parseNum(
        cell(row, map, "Subvention Demandée")
      ),
      nDevis: cell(row, map, "N° DEVIS", "N° Devis", "N° Devis :") || null,
      dateDevis: parseExcelDate(
        cell(row, map, "Date devis", "Date Devis", "Date Devis :")
      ),
      nFacture: cell(row, map, "N° Facture", "N° Facture :") || null,
      dateFacture: parseExcelDate(
        cell(row, map, "Date Facture", "Date facture :")
      ),
      montantHT: parseNum(cell(row, map, "Montant HT")),
      tva: parseNum(cell(row, map, "TVA")),
      montantTTC: parseNum(cell(row, map, "Montant TTC")),
      montantTTCFinal: parseNum(cell(row, map, "Montant TTC Final")),
      montantAutofinancement: parseNum(
        cell(row, map, "Montant d'Autofinancement")
      ),
      fraisPoseCmptProsol: parseNum(
        cell(
          row,
          map,
          "Frais pose cmpt Prosol Elec",
          "Frais pose compteur Prosol"
        )
      ),
      paiement1erFactureSTEG: parseNum(
        cell(row, map, "Paiement 1er Facture STEG", "Paiement")
      ),
      paiement2emeFactureSTEG: parseNum(
        cell(row, map, "Paiement 2ème Facture STEG2")
      ),
      fraisAugmentationCalibre: parseNum(
        cell(row, map, "Frais augmentation calibre")
      ),
      fraisMutationElec: parseNum(cell(row, map, "Frais mutation Elec")),
      fraisMutationGaz: parseNum(cell(row, map, "Frais mutation Gaz")),
      fraisPassageMonoTri: parseNum(
        cell(row, map, "Frais passage mono à tri")
      ),
      autresFrais: parseNum(cell(row, map, "Autre frais")),
      reglementClient: parseNum(cell(row, map, "Réglement client")),
      resteAPayer: parseNum(cell(row, map, "Reste à payer")),
      commentaire: commentMerged,
      classementDossier: mapClassement(
        cell(row, map, "Classement Dossier")
      ),
    },
  };
}

function excelSerial(d: Date): number {
  const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor(utc / 86400000) + 25569;
}

export function projetToExcelRow(p: {
  codeBarres: string | null;
  reference: string;
  abonnes: string;
  etatDossier: EtatDossier;
  district: string | null;
  approbationCommerciale: StatutApprobation;
  approbationTechnique: StatutApprobation;
  executionInstallation: string | null;
  reception: string | null;
  procesVerbal: string | null;
  nLotDebProsol: string | null;
  saisieProsol: string | null;
  nLotDeblocageSubvention: string | null;
  deblocageProsol: string | null;
  conditionSubvention: string | null;
  saisieSubvention: string | null;
  deblocageSubvention: string | null;
  contact: string | null;
  contratAchat: TypeContrat | null;
  puissanceInstallee: unknown;
  typeCompteur: TypeCompteur | null;
  numeroCompteur: string | null;
  calibreDisjoncteur: string | null;
  puissanceSouscrite: string | null;
  productionPrevisionnelle: unknown;
  dateDepotDossier: Date | null;
  dateApprobation: Date | null;
  nPolice: string | null;
  dateInstallation: Date | null;
  dateDepotDemandeMES: Date | null;
  dateMES: Date | null;
  cin: string | null;
  montantFinancement: unknown;
  tauxInteret: unknown;
  banque: string | null;
  agentCommercial: { prenom: string; nom: string } | null;
  adresseLieuImplantation: string | null;
  presenteParMF: string | null;
  nbModules: number | null;
  puUnitairePV: unknown;
  marquePV: string | null;
  modelePV: string | null;
  nbOnduleurs: number | null;
  puUnitaireOnd: unknown;
  puOndSiAutreW?: unknown;
  marqueOnd: string | null;
  modeleOnd: string | null;
  autreModeleOnd?: string | null;
  rapportPuissance?: string | null;
  consommationAnnuelle: unknown;
  subventionDemandee: unknown;
  nDevis: string | null;
  dateDevis: Date | null;
  nFacture: string | null;
  dateFacture: Date | null;
  montantHT: unknown;
  tva: unknown;
  montantTTC: unknown;
  montantTTCFinal: unknown;
  montantAutofinancement: unknown;
  fraisPoseCmptProsol: unknown;
  paiement1erFactureSTEG: unknown;
  paiement2emeFactureSTEG: unknown;
  fraisAugmentationCalibre: unknown;
  fraisMutationElec: unknown;
  fraisMutationGaz: unknown;
  fraisPassageMonoTri: unknown;
  autresFrais: unknown;
  reglementClient: unknown;
  resteAPayer: unknown;
  commentaire: string | null;
  classementDossier: ClassementDossier;
  echeances?: { numero: number; montant: unknown; date: Date | null }[];
}): unknown[] {
  const decStr = (v: unknown) =>
    v == null ? "" : typeof v === "object" && "toFixed" in (v as object)
      ? (v as { toFixed: () => string }).toFixed()
      : String(v);
  const decStrFr3 = (v: unknown) => {
    if (v == null || v === "") return "";
    const n =
      typeof v === "number"
        ? v
        : Number(String(v).trim().replace(/\s/g, "").replace(",", "."));
    if (!Number.isFinite(n)) return v == null ? "" : String(v);
    return new Intl.NumberFormat("fr-TN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(n);
  };
  const splitAddr = (s: string | null) => {
    if (!s) return ["", ""];
    const parts = s.split(" — ");
    if (parts.length >= 2) return [parts[0], parts.slice(1).join(" — ")];
    return ["", s];
  };
  const [adresse, lieu] = splitAddr(p.adresseLieuImplantation);
  const agent = p.agentCommercial
    ? formatCommercialExcelCell(p.agentCommercial)
    : "";
  const etatLabel = etatDossierToFrenchLabel(p.etatDossier);
  const appr = (a: StatutApprobation) => {
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
      case StatutApprobation.PAS_ENCORE:
        return "Pas encore";
      default:
        return "Pas encore";
    }
  };
  const contrat =
    p.contratAchat === TypeContrat.PROGRAMME_PROSOL
      ? "Programme Prosol"
      : p.contratAchat === TypeContrat.HORS_PROGRAMME_PROSOL
        ? "Hors Programme Prosol"
        : "";
  const compteur =
    p.typeCompteur === TypeCompteur.TRIPHASE
      ? "Triphasé"
      : p.typeCompteur === TypeCompteur.MONOPHASE
        ? "Monophasé"
        : "";
  const ech = (n: number) =>
    p.echeances?.find((e) => e.numero === n) ?? {
      montant: null,
      date: null,
    };
  const row: unknown[] = [
    p.codeBarres ?? "",
    p.reference,
    p.abonnes,
    etatLabel,
    p.district ?? "",
    appr(p.approbationCommerciale),
    appr(p.approbationTechnique),
    p.executionInstallation ?? "",
    p.reception ?? "",
    p.procesVerbal ?? "",
    p.nLotDebProsol ?? "",
    p.saisieProsol ?? "",
    p.nLotDeblocageSubvention ?? "",
    p.deblocageProsol ?? "",
    p.conditionSubvention ?? "",
    p.saisieSubvention ?? "",
    p.deblocageSubvention ?? "",
    p.contact ?? "",
    contrat,
    decStr(p.puissanceInstallee),
    compteur,
    p.numeroCompteur ?? "",
    p.calibreDisjoncteur ?? "",
    p.puissanceSouscrite ?? "",
    decStr(p.productionPrevisionnelle),
    p.dateDepotDossier ? excelSerial(p.dateDepotDossier) : "",
    p.dateApprobation ? excelSerial(p.dateApprobation) : "",
    p.nPolice ?? "",
    p.dateInstallation ? excelSerial(p.dateInstallation) : "",
    p.dateDepotDemandeMES ? excelSerial(p.dateDepotDemandeMES) : "",
    p.dateMES ? excelSerial(p.dateMES) : "",
    p.cin ?? "",
    decStr(p.montantFinancement),
    decStr(p.tauxInteret),
    p.banque ?? "",
    agent,
    adresse,
    lieu,
    "",
    "",
    p.nbModules ?? "",
    decStr(p.puUnitairePV),
    p.marquePV ?? "",
    p.modelePV ?? "",
    p.nbOnduleurs ?? "",
    decStr(p.puUnitaireOnd),
    p.marqueOnd ?? "",
    p.modeleOnd ?? "",
    decStr(p.puOndSiAutreW),
    p.autreModeleOnd ?? "",
    p.rapportPuissance ?? "",
    decStr(p.consommationAnnuelle),
    decStr(p.subventionDemandee),
    p.nDevis ?? "",
    p.dateDevis ? excelSerial(p.dateDevis) : "",
    p.nFacture ?? "",
    p.dateFacture ? excelSerial(p.dateFacture) : "",
    decStr(p.montantHT),
    decStr(p.tva),
    decStr(p.montantTTC),
    decStr(p.montantTTCFinal),
    decStr(p.montantAutofinancement),
    decStrFr3(p.fraisPoseCmptProsol),
    decStrFr3(p.paiement1erFactureSTEG),
    decStrFr3(p.paiement2emeFactureSTEG),
    decStr(p.fraisAugmentationCalibre),
    decStr(p.fraisMutationElec),
    decStr(p.fraisMutationGaz),
    decStr(p.fraisPassageMonoTri),
    decStr(p.autresFrais),
    decStr(p.reglementClient),
  ];
  for (let i = 1; i <= ECHEANCE_EXCEL_COUNT; i++) {
    const e = ech(i);
    row.push(decStr(e.montant));
    row.push(e.date ? excelSerial(e.date) : "");
  }
  row.push(decStr(p.resteAPayer));
  row.push(p.commentaire ?? "");
  row.push(
    p.classementDossier === ClassementDossier.ARCHIVE
      ? "Archiver"
      : "Non Archiver"
  );
  return row;
}
