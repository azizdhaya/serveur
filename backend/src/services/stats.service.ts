import {
  ClassementDossier,
  EtatDossier,
  StatutApprobation,
  TypeContrat,
  TypeProjet,
} from "@prisma/client";
import { prisma } from "../db.js";
import { EMPTY_VALUE_LABEL_FR } from "../utils/emptyDisplay.js";
import { canonicalDeblocageProsol } from "../utils/deblocageProsol.js";
import { canonicalDeblocageSubvention } from "../utils/deblocageSubvention.js";
import { canonicalExecutionInstallation } from "../utils/executionInstallation.js";
import { canonicalProcesVerbal } from "../utils/procesVerbal.js";
import { canonicalReception } from "../utils/reception.js";
import type { AccessPayload } from "../utils/jwt.js";

function commercialWhere(
  user: AccessPayload
): { agentCommercialId?: string } | Record<string, never> {
  if (user.role !== "COMMERCIAL") return {};
  return { agentCommercialId: user.sub };
}

export async function dashboardStats(user: AccessPayload) {
  const w = commercialWhere(user);
  const [
    total,
    finie,
    ouvert,
    abandonne,
    puissanceAgg,
    financeAgg,
    prosolAttente,
    aArchiver,
    createdThisMonth,
    puissanceParTypeRows,
  ] = await Promise.all([
    prisma.projet.count({ where: w }),
    prisma.projet.count({ where: { ...w, etatDossier: EtatDossier.FINIE } }),
    prisma.projet.count({ where: { ...w, etatDossier: EtatDossier.OUVERT } }),
    prisma.projet.count({
      where: { ...w, etatDossier: EtatDossier.ABANDONNE },
    }),
    prisma.projet.aggregate({
      where: w,
      _sum: { puissanceInstallee: true },
    }),
    prisma.projet.aggregate({
      where: w,
      _sum: { montantFinancement: true },
    }),
    prisma.projet.count({
      where: {
        ...w,
        contratAchat: TypeContrat.PROGRAMME_PROSOL,
        OR: [
          { approbationTechnique: StatutApprobation.EN_ATTENTE },
          { approbationCommerciale: StatutApprobation.EN_ATTENTE },
        ],
      },
    }),
    prisma.projet.count({
      where: {
        ...w,
        etatDossier: EtatDossier.FINIE,
        classementDossier: ClassementDossier.NON_ARCHIVE,
      },
    }),
    prisma.projet.count({
      where: {
        ...w,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
    prisma.projet.groupBy({
      by: ["typeProjet"],
      where: w,
      _sum: { puissanceInstallee: true },
    }),
  ]);

  const pct = (n: number) =>
    total ? Math.round((n / total) * 1000) / 10 : 0;

  const puissanceParTypeKw = {
    PHOTOVOLTAIQUE_CLASSIQUE: 0,
    POMPAGE: 0,
    ISOLE_AVEC_BATTERIES: 0,
    AUTRE: 0,
    sansTypeKw: 0,
  };
  for (const r of puissanceParTypeRows) {
    const kw = Number(r._sum.puissanceInstallee ?? 0);
    if (r.typeProjet == null) {
      puissanceParTypeKw.sansTypeKw += kw;
    } else if (r.typeProjet === TypeProjet.PHOTOVOLTAIQUE_CLASSIQUE) {
      puissanceParTypeKw.PHOTOVOLTAIQUE_CLASSIQUE = kw;
    } else if (r.typeProjet === TypeProjet.POMPAGE) {
      puissanceParTypeKw.POMPAGE = kw;
    } else if (r.typeProjet === TypeProjet.ISOLE_AVEC_BATTERIES) {
      puissanceParTypeKw.ISOLE_AVEC_BATTERIES = kw;
    } else if (r.typeProjet === TypeProjet.AUTRE) {
      puissanceParTypeKw.AUTRE = kw;
    }
  }

  return {
    totalProjets: total,
    termines: { count: finie, pourcent: pct(finie) },
    enCours: { count: ouvert, pourcent: pct(ouvert) },
    abandonnes: { count: abandonne, pourcent: pct(abandonne) },
    puissanceTotaleKw: Number(puissanceAgg._sum.puissanceInstallee ?? 0),
    puissanceParTypeKw,
    financementTotalTnd: Number(financeAgg._sum.montantFinancement ?? 0),
    prosolEnAttente: prosolAttente,
    aArchiver,
    nouveauxCeMois: createdThisMonth,
  };
}

export async function parDistrict(user: AccessPayload, limit = 10) {
  const w = commercialWhere(user);
  const rows = await prisma.projet.groupBy({
    by: ["district"],
    where: { ...w, district: { not: null } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: limit,
  });
  return rows.map((r) => ({
    district: r.district ?? EMPTY_VALUE_LABEL_FR,
    count: r._count.id,
  }));
}

export async function parEtat(user: AccessPayload) {
  const w = commercialWhere(user);
  const rows = await prisma.projet.groupBy({
    by: ["etatDossier"],
    where: w,
    _count: { id: true },
  });
  return rows.map((r) => ({
    etat: r.etatDossier,
    count: r._count.id,
  }));
}

export async function parContratAchat(user: AccessPayload) {
  const w = commercialWhere(user);
  const rows = await prisma.projet.groupBy({
    by: ["contratAchat"],
    where: w,
    _count: { id: true },
  });
  return rows.map((r) => ({
    contrat: r.contratAchat,
    count: r._count.id,
  }));
}

export async function parMois(user: AccessPayload, annee: number) {
  const w = commercialWhere(user);
  const from = new Date(annee, 0, 1);
  const to = new Date(annee + 1, 0, 1);
  const projets = await prisma.projet.findMany({
    where: {
      ...w,
      dateInstallation: { gte: from, lt: to },
    },
    select: { dateInstallation: true },
  });
  const byMonth = Array.from({ length: 12 }, (_, i) => ({
    mois: i + 1,
    count: 0,
  }));
  for (const p of projets) {
    if (!p.dateInstallation) continue;
    const m = p.dateInstallation.getMonth();
    byMonth[m].count++;
  }
  return byMonth;
}

export async function financierGlobal(user: AccessPayload) {
  const w = commercialWhere(user);
  const agg = await prisma.projet.aggregate({
    where: w,
    _sum: {
      montantTTCFinal: true,
      montantFinancement: true,
      resteAPayer: true,
    },
    _avg: { montantFinancement: true },
  });
  return {
    montantTTCFinal: Number(agg._sum.montantTTCFinal ?? 0),
    montantFinancement: Number(agg._sum.montantFinancement ?? 0),
    resteAPayer: Number(agg._sum.resteAPayer ?? 0),
    financementMoyen: Number(agg._avg.montantFinancement ?? 0),
  };
}

export async function prosolParDistrict(user: AccessPayload) {
  const w = commercialWhere(user);
  const rows = await prisma.projet.groupBy({
    by: ["district", "contratAchat"],
    where: { ...w, district: { not: null } },
    _count: { id: true },
  });
  const map = new Map<
    string,
    { district: string; prosol: number; hors: number }
  >();
  for (const r of rows) {
    const d = r.district ?? EMPTY_VALUE_LABEL_FR;
    if (!map.has(d)) map.set(d, { district: d, prosol: 0, hors: 0 });
    const e = map.get(d)!;
    if (r.contratAchat === TypeContrat.PROGRAMME_PROSOL) e.prosol += r._count.id;
    else if (r.contratAchat === TypeContrat.HORS_PROGRAMME_PROSOL)
      e.hors += r._count.id;
  }
  return [...map.values()].sort((a, b) => b.prosol + b.hors - (a.prosol + a.hors));
}

export async function parDeblocage(user: AccessPayload) {
  const w = commercialWhere(user);
  const rows = await prisma.projet.groupBy({
    by: ["deblocageProsol"],
    where: w,
    _count: { id: true },
  });
  return rows.map((r) => ({
    deblocage: r.deblocageProsol,
    count: r._count.id,
  }));
}

function parseMoneyField(v: string | number | null | undefined): number {
  if (v == null || v === "") return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const x = parseFloat(String(v).trim().replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(x) ? x : 0;
}

/**
 * Encours (somme des restes à payer) et volume de dossiers par district.
 * Les projets sans district sont regroupés sous « Non renseigné » (comme en base).
 */
export async function recoulementParDistrict(user: AccessPayload) {
  const w = commercialWhere(user);
  const projets = await prisma.projet.findMany({
    where: w,
    select: { district: true, resteAPayer: true },
  });
  const map = new Map<string, { resteTotal: number; dossierCount: number }>();
  for (const p of projets) {
    const raw = p.district?.trim();
    const d = raw ? raw : "Non renseigné";
    const reste = parseMoneyField(p.resteAPayer);
    const cur = map.get(d) ?? { resteTotal: 0, dossierCount: 0 };
    cur.resteTotal += reste;
    cur.dossierCount += 1;
    map.set(d, cur);
  }
  return [...map.entries()]
    .map(([district, v]) => ({
      district,
      resteTotal: v.resteTotal,
      dossierCount: v.dossierCount,
    }))
    .sort(
      (a, b) =>
        b.resteTotal - a.resteTotal ||
        b.dossierCount - a.dossierCount ||
        a.district.localeCompare(b.district, "fr")
    );
}

/**
 * Par district : nombre de dossiers avec approbations encore « Pas encore »,
 * réception « Pas encore », procès-verbal « Pas encore » (libellés Excel / canoniques),
 * déblocage Prosol / subvention au libellé « Pas encore ».
 */
export async function diligencesParDistrict(user: AccessPayload) {
  const w = commercialWhere(user);
  const projets = await prisma.projet.findMany({
    where: {
      ...w,
      typeProjet: TypeProjet.PHOTOVOLTAIQUE_CLASSIQUE,
    },
    select: {
      district: true,
      approbationTechnique: true,
      approbationCommerciale: true,
      executionInstallation: true,
      reception: true,
      procesVerbal: true,
      deblocageProsol: true,
      deblocageSubvention: true,
    },
  });
  const map = new Map<
    string,
    {
      approTechniquePasEncore: number;
      approCommercialePasEncore: number;
      installationPasEncore: number;
      receptionPasEncore: number;
      procVerbalPasEncore: number;
      deblocageProsolPasEncore: number;
      deblocageSubventionPayer: number;
      deblocageSubventionPasEncore: number;
    }
  >();
  for (const p of projets) {
    const raw = p.district?.trim();
    const d = raw ? raw : "Non renseigné";
    const cur =
      map.get(d) ?? {
        approTechniquePasEncore: 0,
        approCommercialePasEncore: 0,
        installationPasEncore: 0,
        receptionPasEncore: 0,
        procVerbalPasEncore: 0,
        deblocageProsolPasEncore: 0,
        deblocageSubventionPayer: 0,
        deblocageSubventionPasEncore: 0,
      };
    if (p.approbationTechnique === StatutApprobation.PAS_ENCORE) {
      cur.approTechniquePasEncore += 1;
    }
    if (p.approbationCommerciale === StatutApprobation.PAS_ENCORE) {
      cur.approCommercialePasEncore += 1;
    }
    if (canonicalExecutionInstallation(p.executionInstallation) === "Pas encore") {
      cur.installationPasEncore += 1;
    }
    if (canonicalReception(p.reception) === "Pas encore") {
      cur.receptionPasEncore += 1;
    }
    if (canonicalProcesVerbal(p.procesVerbal) === "Pas encore") {
      cur.procVerbalPasEncore += 1;
    }
    const deblocageProsol = canonicalDeblocageProsol(p.deblocageProsol);
    if (deblocageProsol === "Pas encore") {
      cur.deblocageProsolPasEncore += 1;
    }
    const deblocageSubvention = canonicalDeblocageSubvention(p.deblocageSubvention);
    if (deblocageSubvention === "Payer") {
      cur.deblocageSubventionPayer += 1;
    } else if (deblocageSubvention === "Pas encore") {
      cur.deblocageSubventionPasEncore += 1;
    }
    map.set(d, cur);
  }
  const rows = [...map.entries()].map(([district, v]) => ({
    district,
    ...v,
  }));
  rows.sort((a, b) => {
    const sa =
      a.approTechniquePasEncore +
      a.approCommercialePasEncore +
      a.installationPasEncore +
      a.receptionPasEncore +
      a.procVerbalPasEncore +
      a.deblocageProsolPasEncore +
      a.deblocageSubventionPayer +
      a.deblocageSubventionPasEncore;
    const sb =
      b.approTechniquePasEncore +
      b.approCommercialePasEncore +
      b.installationPasEncore +
      b.receptionPasEncore +
      b.procVerbalPasEncore +
      b.deblocageProsolPasEncore +
      b.deblocageSubventionPayer +
      b.deblocageSubventionPasEncore;
    if (sb !== sa) return sb - sa;
    return a.district.localeCompare(b.district, "fr");
  });
  return rows;
}
