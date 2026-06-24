import { useQuery } from "@tanstack/react-query";
import {
  Archive,
  BatteryCharging,
  CheckCircle2,
  Droplets,
  FolderOpen,
  GaugeCircle,
  Landmark,
  Receipt,
  Rocket,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchProjets } from "@/api/projets.api";
import { fetchCommercials } from "@/api/users.api";
import {
  fetchDashboard,
  fetchParContratAchat,
  fetchParDeblocage,
  fetchParEtat,
  fetchDiligencesParDistrict,
  fetchFinancier,
} from "@/api/stats.api";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MobileCollapsibleCard } from "@/components/ui/MobileCollapsibleCard";
import { MobileOnlyCollapsible } from "@/components/ui/MobileOnlyCollapsible";
import { useAuthStore } from "@/store/authStore";
import {
  formatContratAchat,
  formatDecimalExcel3,
  formatCommercialDisplayName,
  formatDateFr,
  formatEtatDossier,
  formatKw,
} from "@/utils/formatters";
import { EtatBadge } from "@/components/ui/badge";
import {
  EMPTY_VALUE_LABEL,
  OPTIONS_DEBLOCAGE_PROSOL,
  OPTIONS_ETAT_DOSSIER,
  uiListeLabel,
} from "@/utils/constants";

const CHART_BLUE = "#0ea5e9";
const CHART_YELLOW = "#eab308";
const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#6366f1"];
const CONTRACT_COLORS = [CHART_BLUE, CHART_YELLOW];
const DEBLOCAGE_COLORS = [CHART_BLUE, CHART_YELLOW, "#94a3b8", CHART_BLUE];
const DILIGENCE_LINE_COLORS = {
  appTechnique: "#0ea5e9",
  appCommerciale: "#10b981",
  installation: "#64748b",
  reception: "#f59e0b",
  procVerbal: "#8b5cf6",
  deblocProsolPasEncore: "#b45309",
  deblocSubvPayer: CHART_YELLOW,
  deblocSubvPasEncore: CHART_BLUE,
} as const;

type DiligenceLinePoint = {
  district: string;
  appTechnique: number;
  appCommerciale: number;
  installation: number;
  reception: number;
  procVerbal: number;
  deblocProsolPasEncore: number;
  deblocSubventionPasEncore: number;
};

function DiligenceLineChartBlock({
  data,
  minWidth,
  isMobile,
}: {
  data: DiligenceLinePoint[];
  minWidth: number;
  isMobile: boolean;
}) {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <div style={{ minWidth }}>
        <ResponsiveContainer width="100%" height={isMobile ? 260 : 300}>
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="district"
              tick={{ fontSize: 11, fill: "#64748b" }}
              angle={isMobile ? -40 : -30}
              textAnchor="end"
              height={isMobile ? 84 : 72}
              interval={0}
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} width={36} />
            <Tooltip
              contentStyle={{ borderRadius: 10, borderColor: "#cbd5e1" }}
              formatter={(value) => {
                const n = typeof value === "number" ? value : Number(value ?? 0);
                return Number.isFinite(n) ? n.toLocaleString("fr-FR") : EMPTY_VALUE_LABEL;
              }}
            />
            <Line
              type="monotone"
              dataKey="appTechnique"
              name="App. technique"
              stroke={DILIGENCE_LINE_COLORS.appTechnique}
              strokeWidth={2}
              dot={isMobile ? false : { r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="appCommerciale"
              name="App. commerciale"
              stroke={DILIGENCE_LINE_COLORS.appCommerciale}
              strokeWidth={2}
              dot={isMobile ? false : { r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="installation"
              name="Installation"
              stroke={DILIGENCE_LINE_COLORS.installation}
              strokeWidth={2}
              dot={isMobile ? false : { r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="reception"
              name="Réception"
              stroke={DILIGENCE_LINE_COLORS.reception}
              strokeWidth={2}
              dot={isMobile ? false : { r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="procVerbal"
              name="Procès-verbal"
              stroke={DILIGENCE_LINE_COLORS.procVerbal}
              strokeWidth={2}
              dot={isMobile ? false : { r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="deblocProsolPasEncore"
              name="Déblocage Prosol"
              stroke={DILIGENCE_LINE_COLORS.deblocProsolPasEncore}
              strokeWidth={2}
              dot={isMobile ? false : { r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="deblocSubventionPasEncore"
              name="Déblocage subvention"
              stroke={DILIGENCE_LINE_COLORS.deblocSubvPasEncore}
              strokeWidth={2}
              dot={isMobile ? false : { r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function typeProjetLabel(t: string | null | undefined): string {
  if (t === "POMPAGE") return "Pompage";
  if (t === "ISOLE_AVEC_BATTERIES") return "Isolé avec batteries";
  if (t === "AUTRE") return "Autre";
  return "Couplé au réseau";
}

function fmtMoney(v: number | string | null | undefined): string {
  if (v == null || v === "") return EMPTY_VALUE_LABEL;
  const x = formatDecimalExcel3(v);
  return x === "" ? EMPTY_VALUE_LABEL : `${x} TND`;
}

function etatTone(etatKey: string): "blue" | "emerald" | "amber" | "rose" | "slate" {
  if (etatKey === "FINIE") return "emerald";
  if (etatKey === "OUVERT") return "blue";
  if (etatKey === "EN_NEGOCIATION") return "amber";
  if (etatKey === "ABANDONNE") return "rose";
  return "slate";
}

export function DashboardPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const authRole = useAuthStore((s) => s.user?.role);
  const isCommercial = authRole === "COMMERCIAL";
  const { data: dash } = useQuery({ queryKey: ["stats", "dash"], queryFn: fetchDashboard });
  const { data: deblocages } = useQuery({
    queryKey: ["stats", "deblocage"],
    queryFn: fetchParDeblocage,
  });
  const { data: etats } = useQuery({
    queryKey: ["stats", "etat"],
    queryFn: fetchParEtat,
  });
  const { data: contrats } = useQuery({
    queryKey: ["stats", "contratAchat"],
    queryFn: fetchParContratAchat,
  });
  const { data: diligencesDistrict } = useQuery({
    queryKey: ["stats", "diligencesDistrict"],
    queryFn: fetchDiligencesParDistrict,
  });
  const { data: fin } = useQuery({
    queryKey: ["stats", "fin"],
    queryFn: fetchFinancier,
  });
  const { data: coupledStats } = useQuery({
    queryKey: ["stats", "typeProjet", "PHOTOVOLTAIQUE_CLASSIQUE"],
    queryFn: () =>
      fetchProjets({
        page: 1,
        limit: 1,
        typeProjet: "PHOTOVOLTAIQUE_CLASSIQUE",
      }),
  });
  const { data: pompageStats } = useQuery({
    queryKey: ["stats", "typeProjet", "POMPAGE"],
    queryFn: () =>
      fetchProjets({
        page: 1,
        limit: 1,
        typeProjet: "POMPAGE",
      }),
  });
  const { data: isoleStats } = useQuery({
    queryKey: ["stats", "typeProjet", "ISOLE_AVEC_BATTERIES"],
    queryFn: () =>
      fetchProjets({
        page: 1,
        limit: 1,
        typeProjet: "ISOLE_AVEC_BATTERIES",
      }),
  });
  const { data: autreStats } = useQuery({
    queryKey: ["stats", "typeProjet", "AUTRE"],
    queryFn: () =>
      fetchProjets({
        page: 1,
        limit: 1,
        typeProjet: "AUTRE",
      }),
  });
  const { data: recent } = useQuery({
    queryKey: ["projets", "recent"],
    queryFn: () => fetchProjets({ page: 1, limit: 10, sortBy: "createdAt", order: "desc" }),
  });
  const { data: commercialBarData, isLoading: commercialBarLoading } = useQuery({
    queryKey: ["stats", "commercials", "projets-count"],
    queryFn: async () => {
      const commercials = await fetchCommercials();
      const rows = await Promise.all(
        commercials.map(async (c) => {
          const res = await fetchProjets({ page: 1, limit: 1, agentId: c.id });
          return {
            id: c.id,
            name: formatCommercialDisplayName(c),
            count: res.total ?? 0,
          };
        })
      );
      return rows.sort((a, b) => b.count - a.count);
    },
    staleTime: 60_000,
  });

  const pieData = OPTIONS_ETAT_DOSSIER.map((o, i) => {
    const row = etats?.find((e) => e.etat === o.v);
    return {
      key: o.v,
      name: formatEtatDossier(o.v),
      value: row?.count ?? 0,
      color: COLORS[i % COLORS.length],
    };
  });

  const contractPieData = [
    {
      key: "PROGRAMME_PROSOL",
      name: formatContratAchat("PROGRAMME_PROSOL"),
      value: contrats?.find((c) => c.contrat === "PROGRAMME_PROSOL")?.count ?? 0,
      color: CONTRACT_COLORS[0],
    },
    {
      key: "HORS_PROGRAMME_PROSOL",
      name: formatContratAchat("HORS_PROGRAMME_PROSOL"),
      value: contrats?.find((c) => c.contrat === "HORS_PROGRAMME_PROSOL")?.count ?? 0,
      color: CONTRACT_COLORS[1],
    },
  ];

  const deblocagePieData = OPTIONS_DEBLOCAGE_PROSOL.map((label, i) => ({
    key: label,
    name: uiListeLabel(label),
    value:
      deblocages?.find(
        (d) => (d.deblocage ?? "").trim().toLowerCase() === label.toLowerCase()
      )?.count ?? 0,
    color: DEBLOCAGE_COLORS[i % DEBLOCAGE_COLORS.length],
  }));

  const diligencesLineData =
    diligencesDistrict?.map((d) => ({
      district: d.district,
      appTechnique: d.approTechniquePasEncore,
      appCommerciale: d.approCommercialePasEncore,
      installation: d.installationPasEncore,
      reception: d.receptionPasEncore,
      procVerbal: d.procVerbalPasEncore,
      deblocProsolPasEncore: d.deblocageProsolPasEncore,
      deblocSubventionPasEncore: d.deblocageSubventionPasEncore,
    })) ?? [];
  const nonRenseigneDistrictLabel = "Non renseigné";
  const diligencesNonRenseigneData = diligencesLineData.filter(
    (d) => d.district.trim().toLowerCase() === nonRenseigneDistrictLabel.toLowerCase()
  );
  const diligencesRenseigneData = diligencesLineData.filter(
    (d) => d.district.trim().toLowerCase() !== nonRenseigneDistrictLabel.toLowerCase()
  );
  const deblocageSubventionTotals = (diligencesDistrict ?? []).reduce(
    (acc, d) => {
      acc.payer += d.deblocageSubventionPayer;
      acc.pasEncore += d.deblocageSubventionPasEncore;
      return acc;
    },
    { payer: 0, pasEncore: 0 }
  );
  const deblocageSubventionLineData = [
    { statut: "Payer", valeur: deblocageSubventionTotals.payer },
    { statut: "En attente", valeur: deblocageSubventionTotals.pasEncore },
  ];
  const hasContractData = contractPieData.some((x) => x.value > 0);
  const hasDeblocageData = deblocagePieData.some((x) => x.value > 0);
  const hasSubventionData = deblocageSubventionLineData.some((x) => x.valeur > 0);
  const contractLegendItems = contractPieData.map((x) => ({
    label: x.name,
    color: x.color,
    value: x.value,
  }));
  const deblocageLegendItems = deblocagePieData.map((x) => ({
    label: x.name,
    color: x.color,
    value: x.value,
  }));
  const subventionLegendItems = deblocageSubventionLineData.map((x) => ({
    label: x.statut,
    color:
      x.statut === "Payer"
        ? DILIGENCE_LINE_COLORS.deblocSubvPayer
        : DILIGENCE_LINE_COLORS.deblocSubvPasEncore,
    value: x.valeur,
  }));
  const progressionLegendItems = [
    { label: "App. technique", color: DILIGENCE_LINE_COLORS.appTechnique },
    { label: "App. commerciale", color: DILIGENCE_LINE_COLORS.appCommerciale },
    { label: "Installation", color: DILIGENCE_LINE_COLORS.installation },
    { label: "Réception", color: DILIGENCE_LINE_COLORS.reception },
    { label: "Procès-verbal", color: DILIGENCE_LINE_COLORS.procVerbal },
    { label: "Déblocage Prosol", color: DILIGENCE_LINE_COLORS.deblocProsolPasEncore },
    {
      label: "Déblocage subvention",
      color: DILIGENCE_LINE_COLORS.deblocSubvPasEncore,
    },
  ];
  const diligenceChartMinWidth = Math.max(
    isMobile ? 360 : 420,
    diligencesRenseigneData.length * (isMobile ? 38 : 48)
  );
  const diligenceNonRenseigneMinWidth = Math.max(
    isMobile ? 360 : 420,
    diligencesNonRenseigneData.length * (isMobile ? 38 : 48)
  );
  const commercialChartMinWidth = Math.max(
    isMobile ? 360 : 460,
    (commercialBarData?.length ?? 0) * (isMobile ? 64 : 78)
  );
  const pieInnerRadius = isMobile ? 42 : 60;
  const pieOuterRadius = isMobile ? 72 : 90;

  const typeProjetData = [
    {
      key: "PHOTOVOLTAIQUE_CLASSIQUE",
      label: "Couplé au réseau",
      count: coupledStats?.total ?? 0,
      color: "#0ea5e9",
    },
    {
      key: "POMPAGE",
      label: "Pompage",
      count: pompageStats?.total ?? 0,
      color: "#10b981",
    },
    {
      key: "ISOLE_AVEC_BATTERIES",
      label: "Isolé avec batteries",
      count: isoleStats?.total ?? 0,
      color: "#6366f1",
    },
    {
      key: "AUTRE",
      label: "Autre",
      count: autreStats?.total ?? 0,
      color: "#475569",
    },
  ] as const;
  const totalTypes = typeProjetData.reduce((acc, x) => acc + x.count, 0);
  const sortedTypeProjetData = [...typeProjetData].sort((a, b) => {
    if (a.key === "AUTRE" && b.key !== "AUTRE") return 1;
    if (b.key === "AUTRE" && a.key !== "AUTRE") return -1;
    return b.count - a.count;
  });

  if (!dash) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        Chargement…
      </div>
    );
  }

  const pkw = dash.puissanceParTypeKw ?? {
    PHOTOVOLTAIQUE_CLASSIQUE: 0,
    POMPAGE: 0,
    ISOLE_AVEC_BATTERIES: 0,
    AUTRE: 0,
    sansTypeKw: 0,
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <Card className="w-full overflow-hidden rounded-none border border-[#5b88b8]/40 bg-gradient-to-b from-[#0b3f78] to-[#072449] text-white shadow-md">
        <CardContent className="relative p-5 sm:p-6">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 34%, rgba(0,0,0,0.15) 100%), repeating-linear-gradient(to right, rgba(201,227,255,0.30) 0 2px, transparent 2px 88px), repeating-linear-gradient(to bottom, rgba(201,227,255,0.30) 0 2px, transparent 2px 64px), repeating-linear-gradient(to right, rgba(255,255,255,0.12) 0 1px, transparent 1px 17px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-100/10 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-44 w-44 rounded-full bg-blue-100/10 blur-3xl" />
          <div className="relative space-y-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
                Tableau de bord
              </h1>
              <p className="mt-1 text-xs text-white/90 sm:text-sm">
                Pilotage global de vos projets avec les nouveaux indicateurs métier.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isCommercial ? <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <h2 className="font-medium text-slate-800">Répartition par type de projet</h2>
          <p className="text-xs text-slate-500">
            Visualisation prioritaire du portefeuille projet par type.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedTypeProjetData.map((x) => {
              const pct = totalTypes > 0 ? Math.round((x.count / totalTypes) * 100) : 0;
              return (
                <div key={x.key} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-700">{x.label}</p>
                    <p className="text-sm font-semibold text-slate-900">{x.count}</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: x.color }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{pct}% du parc projet</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card> : null}

      {!isCommercial ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total projets"
          value={dash.totalProjets}
          subtitle={`+${dash.nouveauxCeMois} ce mois`}
          icon={<Sun size={22} />}
          tone="blue"
        />
        {pieData.map((s) => {
          const pct = dash.totalProjets > 0 ? Math.round((s.value / dash.totalProjets) * 100) : 0;
          const icon =
            s.key === "FINIE" ? (
              <CheckCircle2 size={22} />
            ) : s.key === "ARCHIVE" ? (
              <Archive size={22} />
            ) : s.key === "EN_NEGOCIATION" ? (
              <TrendingUp size={22} />
            ) : (
              <FolderOpen size={22} />
            );
          return (
            <StatCard
              key={s.key}
              title={s.name}
              value={s.value}
              subtitle={`${pct}% du total`}
              icon={icon}
              tone={etatTone(s.key)}
            />
          );
        })}
      </div> : null}

      {!isCommercial ? <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Puissance installée (kW) par type
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Puissance totale"
            value={formatKw(dash.puissanceTotaleKw)}
            subtitle="Tous types confondus"
            icon={<GaugeCircle size={22} />}
            tone="slate"
          />
          <StatCard
            title="Couplé au réseau"
            value={formatKw(pkw.PHOTOVOLTAIQUE_CLASSIQUE)}
            subtitle="Puissance cumulée"
            icon={<Zap size={22} />}
            tone="blue"
          />
          <StatCard
            title="Pompage"
            value={formatKw(pkw.POMPAGE)}
            subtitle="Puissance cumulée"
            icon={<Droplets size={22} />}
            tone="emerald"
          />
          <StatCard
            title="Isolé avec batteries"
            value={formatKw(pkw.ISOLE_AVEC_BATTERIES)}
            subtitle="Puissance cumulée"
            icon={<BatteryCharging size={22} />}
            tone="amber"
          />
          {pkw.AUTRE > 0 ? (
            <StatCard
              title="Autre"
              value={formatKw(pkw.AUTRE)}
              subtitle="Puissance cumulée"
              icon={<FolderOpen size={22} />}
              tone="slate"
            />
          ) : null}
        </div>
        {pkw.sansTypeKw > 0 ? (
          <p className="text-xs text-slate-500">
            Puissance sur dossiers sans type renseigné :{" "}
            <span className="font-medium text-slate-700">
              {formatKw(pkw.sansTypeKw)}
            </span>
          </p>
        ) : null}
      </div> : null}

      {!isCommercial ? <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Synthèse financière
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Montant facture"
            value={fin ? fmtMoney(fin.montantTTCFinal) : EMPTY_VALUE_LABEL}
            subtitle="Somme des montants facture"
            icon={<Receipt size={22} />}
            tone="emerald"
          />
          <StatCard
            title="Financement"
            value={fin ? fmtMoney(fin.montantFinancement) : EMPTY_VALUE_LABEL}
            subtitle={fin ? `Fin. moyen : ${fmtMoney(fin.financementMoyen)}` : undefined}
            icon={<Landmark size={22} />}
            tone="amber"
          />
          <StatCard
            title="Reste à payer"
            value={
              fin ? (
                <span
                  className={fin.resteAPayer < 0 ? "text-rose-700" : undefined}
                >
                  {fmtMoney(fin.resteAPayer)}
                </span>
              ) : (
                EMPTY_VALUE_LABEL
              )
            }
            subtitle="Soldes globaux (agrégat)"
            icon={<TrendingUp size={22} />}
            tone="slate"
          />
        </div>
      </div> : null}

      <MobileOnlyCollapsible
        title="Analyses visuelles"
        description="Contrats, déblocages et suivi commercial. Touchez pour afficher sur mobile."
        defaultOpen={false}
      >
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {!isCommercial ? <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <h2 className="font-medium text-slate-800">Contrats d'achat</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-52 sm:h-64">
              {hasContractData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contractPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={pieInnerRadius}
                      outerRadius={pieOuterRadius}
                      paddingAngle={2}
                    >
                      {contractPieData.map((x) => (
                        <Cell key={x.key} fill={x.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 10,
                        borderColor: "#cbd5e1",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Aucune donnée à afficher.
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-600">
              {contractLegendItems.map((x) => (
                <span key={x.label} className="inline-flex items-center gap-1.5">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: x.color }}
                  />
                  {x.label}: {x.value}
                </span>
              ))}
            </div>
          </CardContent>
        </Card> : null}

        {!isCommercial ? <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <h2 className="font-medium text-slate-800">Déblocage Prosol</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-52 sm:h-64">
              {hasDeblocageData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deblocagePieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={pieInnerRadius}
                      outerRadius={pieOuterRadius}
                      paddingAngle={2}
                    >
                      {deblocagePieData.map((x) => (
                        <Cell key={x.key} fill={x.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 10,
                        borderColor: "#cbd5e1",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Aucune donnée à afficher.
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-600">
              {deblocageLegendItems.map((x) => (
                <span key={x.label} className="inline-flex items-center gap-1.5">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: x.color }}
                  />
                  {x.label}: {x.value}
                </span>
              ))}
            </div>
          </CardContent>
        </Card> : null}

        {!isCommercial && diligencesDistrict !== undefined && deblocageSubventionLineData.length > 0 ? (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <h2 className="font-medium text-slate-800">Déblocage subvention</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-52 sm:h-64">
                {hasSubventionData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deblocageSubventionLineData}
                        dataKey="valeur"
                        nameKey="statut"
                        cx="50%"
                        cy="50%"
                        innerRadius={pieInnerRadius}
                        outerRadius={pieOuterRadius}
                        paddingAngle={2}
                      >
                        {deblocageSubventionLineData.map((x) => (
                          <Cell
                            key={x.statut}
                            fill={
                              x.statut === "Payer"
                                ? DILIGENCE_LINE_COLORS.deblocSubvPayer
                                : DILIGENCE_LINE_COLORS.deblocSubvPasEncore
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 10,
                          borderColor: "#cbd5e1",
                        }}
                        formatter={(value) => {
                          const n = typeof value === "number" ? value : Number(value ?? 0);
                          return Number.isFinite(n) ? n.toLocaleString("fr-FR") : EMPTY_VALUE_LABEL;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">
                    Aucune donnée à afficher.
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-600">
                {subventionLegendItems.map((x) => (
                  <span key={x.label} className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: x.color }}
                    />
                    {x.label}: {x.value}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}

        <Card className={`border-slate-200 shadow-sm ${isCommercial ? "" : "xl:col-span-3"}`}>
          <CardHeader>
            <h2 className="font-medium text-slate-800">Suivi commercial</h2>
            <p className="text-xs text-slate-500">
              Nombre de dossiers attribués par agent commercial.
            </p>
          </CardHeader>
          <CardContent className="h-72 sm:h-80">
            {commercialBarLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Chargement…
              </div>
            ) : commercialBarData && commercialBarData.length > 0 ? (
              <div className="h-full w-full overflow-x-auto pb-1">
                {isMobile ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={commercialBarData}
                      layout="vertical"
                      margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        type="number"
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: "#64748b" }}
                        width={36}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#64748b" }}
                        width={110}
                        tickFormatter={(label) =>
                          String(label).length > 18 ? `${String(label).slice(0, 18)}…` : String(label)
                        }
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: 10, borderColor: "#cbd5e1" }}
                        formatter={(value) => {
                          const n = typeof value === "number" ? value : Number(value ?? 0);
                          return Number.isFinite(n) ? n : EMPTY_VALUE_LABEL;
                        }}
                        labelFormatter={(label) => `Commercial : ${label}`}
                      />
                      <Bar
                        dataKey="count"
                        name="Dossiers"
                        fill="#0ea5e9"
                        radius={[0, 6, 6, 0]}
                        maxBarSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ minWidth: commercialChartMinWidth }} className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={commercialBarData}
                        margin={{ top: 8, right: 12, left: 0, bottom: 64 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          angle={-20}
                          textAnchor="end"
                          interval={0}
                          height={62}
                        />
                        <YAxis
                          allowDecimals={false}
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          width={36}
                        />
                        <Tooltip
                          contentStyle={{ borderRadius: 10, borderColor: "#cbd5e1" }}
                          formatter={(value) => {
                            const n = typeof value === "number" ? value : Number(value ?? 0);
                            return Number.isFinite(n) ? n : EMPTY_VALUE_LABEL;
                          }}
                          labelFormatter={(label) => `Commercial : ${label}`}
                        />
                        <Bar dataKey="count" name="Dossiers" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Aucun dossier commercial à afficher.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </MobileOnlyCollapsible>

      <div className="grid gap-6">
        <MobileCollapsibleCard
          title="Progression dossier"
          defaultOpen={false}
          description={
            <p>
              Comptage des dossiers couplés au réseau par district : approbation technique et
              commerciale en{" "}
              <span className="font-medium text-slate-600">attente</span>, réception et
              installation en{" "}
              <span className="font-medium text-slate-600">attente</span>, procès-verbal en{" "}
              <span className="font-medium text-slate-600">attente</span>, déblocage Prosol et déblocage
              subvention en{" "}
              <span className="font-medium text-slate-600">attente</span>.
            </p>
          }
          contentClassName="space-y-6"
        >
            {diligencesDistrict !== undefined && diligencesRenseigneData.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Courbe des diligences (couplé au réseau)
                </p>
                <DiligenceLineChartBlock
                  data={diligencesRenseigneData}
                  minWidth={diligenceChartMinWidth}
                  isMobile={isMobile}
                />
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-600">
                  {progressionLegendItems.map((x) => (
                    <span key={x.label} className="inline-flex items-center gap-1.5">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: x.color }}
                      />
                      {x.label}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {diligencesDistrict !== undefined && diligencesNonRenseigneData.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Courbe des diligences (district non renseigné)
                </p>
                <DiligenceLineChartBlock
                  data={diligencesNonRenseigneData}
                  minWidth={diligenceNonRenseigneMinWidth}
                  isMobile={isMobile}
                />
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-600">
                  {progressionLegendItems.map((x) => (
                    <span key={x.label} className="inline-flex items-center gap-1.5">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: x.color }}
                      />
                      {x.label}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
        </MobileCollapsibleCard>
      </div>

      {!isCommercial ? <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-base font-medium text-slate-800 sm:text-[15px]">
            <Rocket size={16} className="shrink-0 text-cyan-700" />
            Derniers projets
          </h2>
          <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
            <Link to="/projets">Voir tout</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:hidden">
            {recent?.data?.length ? (
              recent.data.map((p) => (
                <div key={p.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      className="font-medium text-[#0d5ea8] transition-colors hover:text-[#f18a21] hover:underline"
                      to={`/projets/${p.id}`}
                    >
                      {p.reference}
                    </Link>
                    <EtatBadge etat={p.etatDossier} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{typeProjetLabel(p.typeProjet)}</p>
                  <p className="mt-2 text-sm text-slate-700">{p.abonnes}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <p>
                      <span className="font-medium text-slate-700">Facture:</span> {fmtMoney(p.montantTTCFinal)}
                    </p>
                    <p>
                      <span className="font-medium text-slate-700">Reste:</span> {fmtMoney(p.resteAPayer)}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Créé le {formatDateFr(p.createdAt)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Aucun projet récent à afficher.</p>
            )}
          </div>
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="pb-2 pr-4">Référence</th>
                  <th className="pb-2 pr-4">Type projet</th>
                  <th className="pb-2 pr-4">Client</th>
                  <th className="pb-2 pr-4">État</th>
                  <th className="pb-2 pr-4">Montant facture</th>
                  <th className="pb-2 pr-4">Reste à payer</th>
                  <th className="pb-2">Créé le</th>
                </tr>
              </thead>
              <tbody>
                {recent?.data?.length ? (
                  recent.data.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-2 pr-4">
                        <Link
                          className="font-medium text-[#0d5ea8] transition-colors hover:text-[#f18a21] hover:underline"
                          to={`/projets/${p.id}`}
                        >
                          {p.reference}
                        </Link>
                      </td>
                      <td className="py-2 pr-4">{typeProjetLabel(p.typeProjet)}</td>
                      <td className="py-2 pr-4">{p.abonnes}</td>
                      <td className="py-2 pr-4">
                        <EtatBadge etat={p.etatDossier} />
                      </td>
                      <td className="py-2 pr-4">{fmtMoney(p.montantTTCFinal)}</td>
                      <td className="py-2 pr-4">{fmtMoney(p.resteAPayer)}</td>
                      <td className="py-2">{formatDateFr(p.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-4 text-slate-500" colSpan={7}>
                      Aucun projet récent à afficher.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card> : null}
    </div>
  );
}
