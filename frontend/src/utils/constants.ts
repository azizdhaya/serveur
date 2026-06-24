/** Limite saisie échéances (UI + cohérence avec l’API). */
export const MAX_ECHEANCES = 200;

/** Import Excel : colonnes Montant/Date échéance 1…N (au-delà de l’historique 10). */
export const MAX_ECHEANCES_EXCEL_IMPORT = 40;

/** Libellé affiché pour une valeur liste Excel (identique à la valeur stockée). */
export function uiListeLabel(v: string): string {
  return v;
}

/** Champs vides : fiche, tableaux, montants, dates, PDF. */
export const EMPTY_VALUE_LABEL = "Non renseigné";

/** États dossier (Excel Etat_Dossier / formulaire). */
export const OPTIONS_ETAT_DOSSIER = [
  { v: "OUVERT", l: "Ouvert" },
  { v: "EN_NEGOCIATION", l: "En négociation" },
  { v: "FINIE", l: "Fini" },
  { v: "ARCHIVE", l: "Archivé" },
] as const;

export const OPTIONS_TYPE_PROJET = [
  { v: "PHOTOVOLTAIQUE_CLASSIQUE", l: "Couplé au réseau" },
  { v: "POMPAGE", l: "Pompage" },
  { v: "ISOLE_AVEC_BATTERIES", l: "Isolé avec batteries" },
  { v: "AUTRE", l: "Autre" },
] as const;

/** Districts (liste métier / Excel). L’ordre suit la référence projet. */
export const DISTRICTS = [
  "Ariana",
  "Béja",
  "Bizerte",
  "El Jem",
  "Enfidha",
  "Ezzahra",
  "Gabes",
  "Gafsa",
  "Jebeniana",
  "Jendouba",
  "Jerba",
  "Kairouan Nord",
  "Kairouan Sud",
  "Kasserine",
  "Kebili",
  "Le Bardo",
  "Le Kef",
  "Le Kram",
  "Mahdia",
  "Mahres",
  "Manouba",
  "Mednine",
  "Menzel Bourguiba",
  "Menzel Bouzelfa",
  "Menzel Temime",
  "Moknine",
  "Monastir",
  "Mourouj",
  "Msaken",
  "Nabeul",
  "Oueslatia",
  "Sfax Nord",
  "Sfax Sud",
  "Sfax Ville",
  "Sidi Bouzid",
  "Siliana",
  "Sousse Nord",
  "Sousse Ville",
  "Tataouine",
  "Tozeur",
  "Tunis Ville",
  "Zaghouan",
  "Zarzis",
] as const;

/** Remplissage auto du gouvernorat à partir du district (noms administratifs courants). */
export const GOUV_BY_DISTRICT: Record<string, string> = {
  Ariana: "Ariana",
  Béja: "Béja",
  Bizerte: "Bizerte",
  "El Jem": "Mahdia",
  Enfidha: "Sousse",
  Ezzahra: "Ben Arous",
  Gabes: "Gabès",
  Gafsa: "Gafsa",
  Jebeniana: "Sfax",
  Jendouba: "Jendouba",
  Jerba: "Médenine",
  "Kairouan Nord": "Kairouan",
  "Kairouan Sud": "Kairouan",
  Kasserine: "Kasserine",
  Kebili: "Kébili",
  "Le Bardo": "Tunis",
  "Le Kef": "Le Kef",
  "Le Kram": "Tunis",
  Mahdia: "Mahdia",
  Mahres: "Sfax",
  Manouba: "La Manouba",
  Mednine: "Médenine",
  "Menzel Bourguiba": "Bizerte",
  "Menzel Bouzelfa": "Nabeul",
  "Menzel Temime": "Nabeul",
  Moknine: "Monastir",
  Monastir: "Monastir",
  Mourouj: "Ben Arous",
  Msaken: "Sousse",
  Nabeul: "Nabeul",
  Oueslatia: "Kairouan",
  "Sfax Nord": "Sfax",
  "Sfax Sud": "Sfax",
  "Sfax Ville": "Sfax",
  "Sidi Bouzid": "Sidi Bouzid",
  Siliana: "Siliana",
  "Sousse Nord": "Sousse",
  "Sousse Ville": "Sousse",
  Tataouine: "Tataouine",
  Tozeur: "Tozeur",
  "Tunis Ville": "Tunis",
  Zaghouan: "Zaghouan",
  Zarzis: "Médenine",
};

/** Banques (Excel / formulaire). Peut être étendu localement via « Personnaliser les listes ». */
export const BANQUES = [
  "Banque Zitouna",
  "STB",
  "UIB",
  "BH",
  "BNA",
  "ATTIJARI",
  "Amen Bank",
  "Autre",
] as const;

/** Valeurs par défaut (colonne Excel Montant_TND). Extensible localement dans le formulaire projet. */
export const MONTANTS_FINANCEMENT_TND = [
  0, 3500, 5000, 6500, 7500, 10000,
] as const;

/** Valeur formulaire / filtre pour agent commercial hors liste utilisateurs. */
export const AGENT_COMMERCIAL_AUTRE_VALUE = "__AUTRE__" as const;

/** Colonne Excel Approbation_Technique : Approuvé, Pas encore (NEANT n’est plus proposé en liste). */
export const OPTIONS_APPROBATION_TECHNIQUE = [
  { v: "APPROUVE", l: "Approuvé" },
  { v: "PAS_ENCORE", l: "Pas encore" },
] as const;

/** Colonne Excel Approbation_Commercial : Approuvé, Pas encore (NEANT n’est plus proposé en liste). */
export const OPTIONS_APPROBATION_COMMERCIALE = [
  { v: "APPROUVE", l: "Approuvé" },
  { v: "PAS_ENCORE", l: "Pas encore" },
] as const;

/** Colonne Excel Excution_Installation (sans valeur « Néant » en liste). */
export const OPTIONS_EXECUTION_INSTALLATION = [
  "Exécutée",
  "Pas encore",
] as const;

/** Colonne Excel Procès_Verbal (sans « Néant » en liste). */
export const OPTIONS_PROCES_VERBAL = ["Obtenue", "Pas encore"] as const;

/** Colonne Excel mode_paiement (orthographe corrigée : Avoir, Espèce). */
export const OPTIONS_MODE_PAIEMENT = [
  "Avoir",
  "Chèque",
  "Espèce",
  "Frais à la charge de l'entreprise",
  "Retenue à la source",
  "Traite Bancaire",
  "Versement",
  "Virement",
  "Autre",
] as const;

/** Colonne Excel Réception (sans « Néant » en liste). */
export const OPTIONS_RECEPTION = ["Pas encore", "Réceptionner"] as const;

/** Colonne Excel Saisie_Prosol (sans « Néant » en liste). */
export const OPTIONS_SAISIE_PROSOL = ["Envoyé", "Pas encore"] as const;

/** Colonne Excel Saisie_Subvention : mêmes libellés que Saisie_Prosol. */
export const OPTIONS_SAISIE_SUBVENTION = OPTIONS_SAISIE_PROSOL;

/** Colonne Excel Déblocage_Prosol (sans « Néant » en liste). */
export const OPTIONS_DEBLOCAGE_PROSOL = ["Pas encore", "Payer"] as const;

/** Colonne Excel Déblocage_Subvention : mêmes libellés que Déblocage_Prosol. */
export const OPTIONS_DEBLOCAGE_SUBVENTION = OPTIONS_DEBLOCAGE_PROSOL;

/**
 * Champs date pour la liste projets (« Filtrer les dates sur » + params Du/Au).
 * À garder aligné avec `DATE_FILTER_FIELDS` dans `backend/src/services/projet.service.ts`.
 */
export const PROJET_LIST_DATE_FILTER_KEYS = [
  "createdAt",
  "updatedAt",
  "dateDepotDossier",
  "dateApprobation",
  "dateInstallation",
  "dateDepotDemandeMES",
  "dateMES",
  "dateDevis",
  "dateFacture",
] as const;

export type ProjetListDateFilterKey =
  (typeof PROJET_LIST_DATE_FILTER_KEYS)[number];

/** Libellés du sélecteur (espace fine insécable avant « : », comme sur la fiche). */
export const PROJET_LIST_DATE_FILTER_OPTIONS: {
  v: ProjetListDateFilterKey;
  l: string;
}[] = [
  { v: "createdAt", l: "Date\u202f: création dossier" },
  { v: "updatedAt", l: "Date\u202f: dernière mise à jour" },
  { v: "dateDepotDossier", l: "Date\u202f: dépôt dossier" },
  { v: "dateApprobation", l: "Date\u202f: approbation" },
  { v: "dateInstallation", l: "Date\u202f: installation" },
  { v: "dateDepotDemandeMES", l: "Date\u202f: dépôt demande MES" },
  { v: "dateMES", l: "Date\u202f: MES" },
  { v: "dateDevis", l: "Date\u202f: devis" },
  { v: "dateFacture", l: "Date\u202f: facture" },
];
