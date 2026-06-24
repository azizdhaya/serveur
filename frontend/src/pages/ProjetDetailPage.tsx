import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ArrowLeft, FileText, Pencil } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { deleteProjet, createBlobDownloadSession, downloadProjetPdf, fetchProjet } from "@/api/projets.api";
import { isMobileBrowser } from "@/utils/blobDownload";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EtatBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MobileCollapsibleCard } from "@/components/ui/MobileCollapsibleCard";
import { useAuthStore } from "@/store/authStore";
import type { Projet, StatutApprobation } from "@/types/projet.types";
import {
  ligneResteAPayerDepuisProjet,
  parseMoneyInput,
} from "@/utils/financeFormCalculations";
import {
  formatDecimalExcel3,
  formatAgentCommercialDisplay,
  formatContratAchat,
  formatDateFr,
  formatEtatDossier,
  formatTauxPercent,
  formatTnd,
  formatTypeCompteur,
  libelleAvecColonInsecable,
} from "@/utils/formatters";
import { splitPresenteParMfDisplay } from "@/utils/presenteParMf";
import { TITRE_ONGLET_SUIVI_DOSSIER } from "@/components/projets/projetFormUtils";
import { cn } from "@/lib/utils";
import { EMPTY_VALUE_LABEL, uiListeLabel } from "@/utils/constants";

type ColCardTone = "white" | "yellow" | "green" | "blue";

function dash(v: unknown): string {
  if (v == null || v === "") return EMPTY_VALUE_LABEL;
  return uiListeLabel(String(v));
}

const STATUT_APPRO_LABEL: Record<StatutApprobation, string> = {
  APPROUVE: "Approuvé",
  PAS_ENCORE: "Pas encore",
  NEANT: EMPTY_VALUE_LABEL,
  EN_ATTENTE: "En attente",
  REJETE: "Rejeté",
  ABANDONNE: "Abandonné",
};

const SUFFIX_COLON_FINE = "\u202f:";

/** Dernier segment + « : » sans coupure (évite « d'autofinancement » puis « : » seul en ligne suivante). */
function DetailRowLabel({ k }: { k: string }) {
  const s = libelleAvecColonInsecable(k);
  const idx = s.lastIndexOf(SUFFIX_COLON_FINE);
  if (idx < 0) return s;
  const base = s.slice(0, idx).trimEnd();
  const lastSpace = base.lastIndexOf(" ");
  if (lastSpace < 0) {
    return (
      <span className="whitespace-nowrap">
        {base}
        {SUFFIX_COLON_FINE}
      </span>
    );
  }
  const head = base.slice(0, lastSpace + 1);
  const tail = base.slice(lastSpace + 1);
  return (
    <>
      <span className="break-words">{head}</span>
      <span className="whitespace-nowrap">
        {tail}
        {SUFFIX_COLON_FINE}
      </span>
    </>
  );
}

function Row({
  k,
  v,
  alt,
}: {
  k: string;
  v: ReactNode;
  /** Fond alterné (style tableau). */
  alt?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-2 gap-y-0.5 border-b border-slate-100 py-2 text-[13px] last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:text-sm ${
        alt ? "bg-slate-50/80" : ""
      }`}
    >
      <dt className="min-w-0 font-medium text-slate-700">
        <DetailRowLabel k={k} />
      </dt>
      <dd className="min-w-0 break-words text-slate-900">{v}</dd>
    </div>
  );
}

const COL_CARD_TONE: Record<
  ColCardTone,
  { card: string; header: string; title: string }
> = {
  white: {
    card: "bg-white",
    header: "bg-gradient-to-r from-slate-700 to-slate-800",
    title: "text-white",
  },
  yellow: {
    card: "bg-white",
    header: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    title: "text-yellow-950",
  },
  green: {
    card: "bg-white",
    header: "bg-gradient-to-r from-emerald-700 to-emerald-800",
    title: "text-emerald-50",
  },
  blue: {
    card: "bg-white",
    header: "bg-gradient-to-r from-sky-700 to-blue-800",
    title: "text-sky-50",
  },
};

function ColCard({
  title,
  children,
  tone = "white",
}: {
  title: string;
  children: ReactNode;
  tone?: ColCardTone;
}) {
  const s = COL_CARD_TONE[tone];
  return (
    <Card
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden rounded-none border-0 shadow-md transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg",
        s.card
      )}
    >
      <CardHeader className={cn("flex min-h-[60px] items-center py-2.5 sm:min-h-[70px] sm:py-3", s.header)}>
        <h2
          className={cn(
            "text-sm font-semibold leading-tight sm:text-[15px]",
            s.title
          )}
        >
          {title}
        </h2>
      </CardHeader>
      <CardContent className="flex-1 space-y-0 bg-white p-0 px-2 pb-2 pt-1 sm:px-4 sm:pb-3">
        {children}
      </CardContent>
    </Card>
  );
}

function ProjetFourColumns({ p }: { p: Projet }) {
  const [presentePar, mf] = splitPresenteParMfDisplay(p.presenteParMF);
  const agentNom = formatAgentCommercialDisplay(p);
  const montantAutofinancementAffiche = (() => {
    const direct = parseMoneyInput(p.montantAutofinancement);
    if (direct != null) return `${formatTnd(direct)} TND`;
    const facture = parseMoneyInput(p.montantTTCFinal);
    const financement = parseMoneyInput(p.montantFinancement);
    if (facture == null && financement == null) return EMPTY_VALUE_LABEL;
    const calc = (facture ?? 0) - (financement ?? 0);
    return `${formatTnd(calc)} TND`;
  })();
  const gpsMapsUrl = (() => {
    const t = String(p.coordonneesGps ?? "").trim();
    const m = t.match(/(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)/);
    if (!m) return null;
    const lat = Number(m[1]);
    const lng = Number(m[2]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  })();
  const typeProjetLabel =
    p.typeProjet === "POMPAGE"
      ? "Pompage"
      : p.typeProjet === "ISOLE_AVEC_BATTERIES"
        ? "Isolé avec batteries"
        : p.typeProjet === "AUTRE"
          ? "Autre"
        : "Couplé au réseau";
  const isPompage = p.typeProjet === "POMPAGE";
  const isIsole = p.typeProjet === "ISOLE_AVEC_BATTERIES";
  const isAutre = p.typeProjet === "AUTRE";
  const isTypeSpecifique = isPompage || isIsole || isAutre;
  const puissanceSouscriteLabel = isPompage ? "Puissance pompe :" : "Puissance souscrite :";
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

  return (
    <div className="pb-2">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <ColCard tone="white" title="1 · Données relatives au client">
          <Row k="Type de projet :" v={typeProjetLabel} />
          <Row k="Référence :" v={dash(p.reference)} alt />
          <Row k="Client :" v={dash(p.abonnes)} />
          <Row k="Présenté par :" v={presentePar} alt />
          <Row k="CIN :" v={dash(p.cin)} />
          <Row k="MF :" v={mf} alt />
          <Row k="Lieu d'implantation :" v={dash(p.adresseLieuImplantation)} />
          <Row k="Contact :" v={dash(p.contact)} alt />
          <Row k="Adresse e-mail :" v={dash(p.email)} />
          <Row k="District :" v={dash(p.district)} alt />
          <Row k="Type compteur :" v={formatTypeCompteur(p.typeCompteur)} />
          <Row k="N° de compteur :" v={dash(p.numeroCompteur)} alt />
          <Row
            k="Calibre disjoncteur de branchement :"
            v={dash(p.calibreDisjoncteur)}
          />
          <Row k={puissanceSouscriteLabel} v={dash(p.puissanceSouscrite)} alt />
          <Row
            k="Consommation annuelle :"
            v={
              p.consommationAnnuelle != null && p.consommationAnnuelle !== ""
                ? `${formatTnd(p.consommationAnnuelle)} kWh/an`
                : EMPTY_VALUE_LABEL
            }
          />
          <Row
            k="Coordonnées GPS :"
            alt
            v={
              p.coordonneesGps ? (
                <span>
                  {p.coordonneesGps}
                  {gpsMapsUrl ? (
                    <>
                      {" "}
                      <span className="text-slate-400">·</span>
                      {" "}
                      <a
                        href={gpsMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#006aa3] underline"
                      >
                        Ouvrir Maps
                      </a>
                    </>
                  ) : null}
                </span>
              ) : (
                EMPTY_VALUE_LABEL
              )
            }
          />
        </ColCard>

        <ColCard
          tone="yellow"
          title={
            isTypeSpecifique
              ? "2 · Devis / Facture"
              : "2 · Données relatives au dossier commercial"
          }
        >
          {isTypeSpecifique ? (
            <>
              <Row k="N° devis :" v={dash(p.nDevis)} />
              <Row k="Date devis :" v={formatDateFr(p.dateDevis)} alt />
              <Row k="N° facture :" v={dash(p.nFacture)} />
              <Row k="Date facture :" v={formatDateFr(p.dateFacture)} alt />
              <Row k="Montant devis :" v={`${formatTnd(p.montantTTC)} TND`} />
              <Row
                k="Montant facture :"
                v={`${formatTnd(p.montantTTCFinal)} TND`}
                alt
              />
              <Row
                k="Montant financement TND :"
                v={`${formatTnd(p.montantFinancement)} TND`}
              />
              <Row k="Reste à payer :" v={ligneResteAPayerDepuisProjet(p)} alt />
            </>
          ) : (
            <>
              <Row k="Contrat d'achat :" v={formatContratAchat(p.contratAchat)} />
              <Row
                k="Montant financement TND :"
                v={`${formatTnd(p.montantFinancement)} TND`}
                alt
              />
              <Row k="N° devis :" v={dash(p.nDevis)} />
              <Row k="Taux d'intérêt :" v={formatTauxPercent(p.tauxInteret)} alt />
              <Row k="Montant devis :" v={`${formatTnd(p.montantTTC)} TND`} />
              <Row
                k="Montant facture :"
                v={`${formatTnd(p.montantTTCFinal)} TND`}
                alt
              />
              <Row k="Montant d'autofinancement :" v={montantAutofinancementAffiche} />
              <Row k="Reste à payer :" v={ligneResteAPayerDepuisProjet(p)} alt />
              <Row k="N° facture :" v={dash(p.nFacture)} />
              <Row k="Agent commercial :" v={agentNom} alt />
              <Row k="Banque :" v={dash(p.banque)} />
              <Row k="N° police :" v={dash(p.nPolice)} />
              <Row k="Date devis :" v={formatDateFr(p.dateDevis)} alt />
              <Row k="Date facture :" v={formatDateFr(p.dateFacture)} />
              <Row
                k="Subvention demandée :"
                v={`${formatTnd(p.subventionDemandee)} TND`}
                alt
              />
            </>
          )}
        </ColCard>

        <ColCard tone="green" title="3 · Données relatives à l'installation">
          <Row
            k={
              isPompage || isIsole
                ? "Puissance à installer (KWC) :"
                : "Puissance installée (kW) :"
            }
            v={
              p.puissanceInstallee != null && p.puissanceInstallee !== ""
                ? `${formatDecimalExcel3(p.puissanceInstallee)} ${isTypeSpecifique ? "KWC" : "kW"}`
                : EMPTY_VALUE_LABEL
            }
          />
          {isIsole ? (
            <Row
              k="Énergie journalière total (Wh/j) :"
              v={dash(p.productionPrevisionnelle)}
              alt
            />
          ) : !isPompage ? (
            <Row
              k="Production prévisionnelle :"
              v={dash(p.productionPrevisionnelle)}
              alt
            />
          ) : null}
          <Row
            k={isPompage || isIsole ? "NB PV utilisé :" : "Nb modules :"}
            v={dash(p.nbModules)}
          />
          <Row
            k="Puissance unité PV (W) :"
            v={
              p.puUnitairePV != null && p.puUnitairePV !== ""
                ? `${formatTnd(p.puUnitairePV)} W`
                : EMPTY_VALUE_LABEL
            }
            alt
          />
          <Row k="Marque PV :" v={dash(p.marquePV)} />
          <Row k="Modèle PV :" v={dash(p.modelePV)} alt />
          {isPompage ? (
            <>
              <Row k="Marque variateur :" v={dash(p.marqueOnd)} alt />
              <Row k="Modèle variateur solaire :" v={dash(p.modeleOnd)} />
            </>
          ) : isIsole ? (
            <>
              <Row k="Marque batteries :" v={dash(p.marqueOnd)} alt />
              <Row k="Modèle batteries :" v={dash(p.modeleOnd)} />
              <Row k="NB batteries utilisé :" v={dash(p.nbOnduleurs)} alt />
              <Row k="Marque onduleur hybride :" v={dash(p.autreModeleOnd)} />
              <Row k="Modèle onduleur hybride :" v={dash(p.numeroCompteur)} alt />
              <Row
                k="Puissance onduleur hybride :"
                v={
                  p.puUnitaireOnd != null && p.puUnitaireOnd !== ""
                    ? `${formatTnd(p.puUnitaireOnd)} W`
                    : EMPTY_VALUE_LABEL
                }
              />
            </>
          ) : isTypeSpecifique ? (
            <>
              <Row k="Équipement (sur mesure) :" v={dash(p.equipementSurMesure)} alt />
              <Row k="Intervention (sur mesure) :" v={dash(p.interventionSurMesure)} />
            </>
          ) : (
            <>
              <Row k="Nb onduleurs :" v={dash(p.nbOnduleurs)} />
              <Row k="Marque onduleur :" v={dash(p.marqueOnd)} alt />
              <Row
                k="Puissance unité onduleur (W) :"
                v={
                  p.puUnitaireOnd != null && p.puUnitaireOnd !== ""
                    ? `${formatTnd(p.puUnitaireOnd)} W`
                    : EMPTY_VALUE_LABEL
                }
              />
              <Row k="Modèle onduleur :" v={dash(p.modeleOnd)} alt />
              <Row
                k="PU ond si autre modèle (W) :"
                v={
                  p.puOndSiAutreW != null && p.puOndSiAutreW !== ""
                    ? `${formatTnd(p.puOndSiAutreW)} W`
                    : EMPTY_VALUE_LABEL
                }
              />
              <Row k="Autre modèle onduleur :" v={dash(p.autreModeleOnd)} alt />
            </>
          )}
        </ColCard>

        <ColCard
          tone="blue"
          title={`4 · ${TITRE_ONGLET_SUIVI_DOSSIER}`}
        >
          {isTypeSpecifique ? (
            <>
              <Row k="État de dossier :" v={formatEtatDossier(p.etatDossier)} />
              <Row
                k="Date d'exécution d'installation :"
                v={formatDateFr(p.dateInstallation)}
                alt
              />
              <Row k="Exécution d'installation :" v={dash(p.executionInstallation)} />
              <Row k="Agent commercial :" v={agentNom} alt />
            </>
          ) : (
            <>
              <Row k="État de dossier :" v={formatEtatDossier(p.etatDossier)} />
              <Row
                k="Approbation :"
                alt
                v={
                  <span className="block text-xs leading-relaxed">
                    <span className="text-slate-500">
                      {libelleAvecColonInsecable("Commerciale :")}
                    </span>{" "}
                    {STATUT_APPRO_LABEL[p.approbationCommerciale]}
                    <br />
                    <span className="text-slate-500">
                      {libelleAvecColonInsecable("Technique :")}
                    </span>{" "}
                    {STATUT_APPRO_LABEL[p.approbationTechnique]}
                  </span>
                }
              />
              <Row k="Exécution d'installation :" v={dash(p.executionInstallation)} />
              <Row k="Réception :" v={dash(p.reception)} alt />
              <Row k="Procès-verbal :" v={dash(p.procesVerbal)} />
              <Row k="N° lot déblocage PROSOL :" v={dash(p.nLotDebProsol)} alt />
              {!isHorsProsolAnmeOui ? (
                <Row k="Saisie Prosol :" v={dash(p.saisieProsol)} />
              ) : null}
              <Row
                k="Déblocage Prosol :"
                v={dash(p.deblocageProsol)}
                alt={!isHorsProsolAnmeOui}
              />
              {!isProgrammeProsolAnmeNon ? (
                <>
                  <Row
                    k="N° lot déblocage subvention :"
                    v={dash(p.nLotDeblocageSubvention)}
                  />
                  <Row k="Saisie subvention :" v={dash(p.saisieSubvention)} alt />
                  <Row k="Déblocage subvention :" v={dash(p.deblocageSubvention)} />
                </>
              ) : null}
            </>
          )}
        </ColCard>
      </div>
    </div>
  );
}

export function ProjetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const role = useAuthStore((s) => s.user?.role);
  const qc = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: p, isLoading } = useQuery({
    queryKey: ["projet", id],
    queryFn: () => fetchProjet(id!),
    enabled: !!id,
  });

  const del = useMutation({
    mutationFn: () => deleteProjet(id!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projets"] });
      toast.success("Projet supprimé");
      nav("/projets");
    },
  });

  if (isLoading || !p) {
    return <p className="text-slate-500">Chargement…</p>;
  }

  const canDelete = role === "SUPER_ADMIN" || role === "ADMIN";
  const isCommercial = role === "COMMERCIAL";
  const progressionDates = [
    ["Date devis", p.dateDevis],
    ["Date facture", p.dateFacture],
    ["Date dépôt dossier", p.dateDepotDossier],
    ["Date approbation", p.dateApprobation],
    ["Date paiement pose compteur Prosol", p.datePaiementPoseCompteurProsol],
    ["Date dépôt demande MES", p.dateDepotDemandeMES],
    ["Date installation", p.dateInstallation],
    ["Date MES", p.dateMES],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="sm" asChild className="shrink-0">
          <Link to="/projets">
            <ArrowLeft size={18} /> Retour
          </Link>
        </Button>
        <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
          <h1 className="truncate text-xl font-semibold text-slate-800 sm:text-2xl">
            {p.abonnes}
          </h1>
          <p className="truncate text-sm text-slate-500">Réf. {p.reference}</p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <EtatBadge etat={p.etatDossier} />
          {!isCommercial ? (
            <>
              <Button variant="outline" asChild size="sm" className="grow sm:grow-0">
                <Link to={`/projets/${p.id}/modifier`}>
                  <Pencil size={18} /> Modifier
                </Link>
              </Button>
              <Button
                variant="outline"
                type="button"
                size="sm"
                className="grow sm:grow-0"
                onClick={() => {
                  const session = createBlobDownloadSession();
                  session.begin();
                  void downloadProjetPdf(p.id, p.reference, undefined, session)
                    .then(() => {
                      if (isMobileBrowser()) {
                        toast.success(
                          session.wasPopupBlocked()
                            ? "PDF affiché dans l’application — utilisez Ouvrir ou Partager pour l’enregistrer."
                            : "PDF prêt — consultez le nouvel onglet ou utilisez Partager pour l’enregistrer."
                        );
                      }
                    })
                    .catch(() => {
                      session.cancel();
                      toast.error("Export PDF impossible");
                    });
                }}
              >
                <FileText size={18} /> PDF
              </Button>
            </>
          ) : null}
          {canDelete && (
            <Button
              variant="destructive"
              type="button"
              size="sm"
              className="grow sm:grow-0"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Supprimer
            </Button>
          )}
        </div>
      </div>

      <ProjetFourColumns p={p} />

      {p.commentaire?.trim() ? (
        <MobileCollapsibleCard title="Commentaire" defaultOpen>
          <div className="whitespace-pre-wrap text-sm text-slate-700">{p.commentaire}</div>
        </MobileCollapsibleCard>
      ) : null}

      <MobileCollapsibleCard title="Suivi dossier (calendrier)" defaultOpen>
        <div className="md:-mt-1">
          <ol className="relative border-s border-slate-200 ps-6">
            {progressionDates.map(([label, d]) => (
              <li key={label} className="mb-6 ms-2">
                <div className="absolute -start-1.5 mt-1.5 size-3 rounded-full bg-emerald-600" />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-sm text-slate-500">{formatDateFr(d)}</p>
              </li>
            ))}
          </ol>
        </div>
      </MobileCollapsibleCard>

      {p.echeances?.some(
        (e) =>
          e.montant ||
          e.date ||
          e.modePaiement ||
          e.description
      ) ? (
        <MobileCollapsibleCard title="Échéances">
            <ul className="divide-y divide-slate-100 text-sm">
              {p.echeances
                .filter(
                  (e) =>
                    e.montant ||
                    e.date ||
                    e.modePaiement ||
                    e.description
                )
                .map((e) => (
                  <li key={e.numero} className="space-y-1 py-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-medium text-slate-700">
                        Échéance {e.numero}
                        {e.modePaiement ? (
                          <span className="ms-2 font-normal text-slate-500">
                            · {e.modePaiement}
                          </span>
                        ) : null}
                      </span>
                      <span>
                        {formatTnd(e.montant)} TND · {formatDateFr(e.date)}
                      </span>
                    </div>
                    {e.description?.trim() ? (
                      <p className="whitespace-pre-wrap text-slate-600">
                        {e.description}
                      </p>
                    ) : null}
                  </li>
                ))}
            </ul>
        </MobileCollapsibleCard>
      ) : null}

      {p.logs && p.logs.length > 0 ? (
        <MobileCollapsibleCard title="Historique">
             <ul className="space-y-2 text-sm">
              {p.logs.map((l) => (
                <li
                  key={l.id}
                  className="flex flex-col gap-1 border-b border-slate-100 py-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span>
                    {l.action} · {l.user.prenom} {l.user.nom}
                  </span>
                  <span className="text-slate-500">
                    {formatDateFr(l.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
        </MobileCollapsibleCard>
      ) : null}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Supprimer ce projet ?"
        description={`Le dossier ${p.reference} (${p.abonnes}) sera supprimé définitivement. Cette action ne peut pas être annulée.`}
        onConfirm={() => {
          del.mutate(undefined, {
            onSettled: () => setDeleteDialogOpen(false),
          });
        }}
        pending={del.isPending}
      />
    </div>
  );
}
