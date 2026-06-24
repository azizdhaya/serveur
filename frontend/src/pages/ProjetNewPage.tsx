import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { createProjet } from "@/api/projets.api";
import { ProjetForm } from "@/components/projets/ProjetForm";
import { Button } from "@/components/ui/button";
import type { TypeContrat } from "@/types/projet.types";
import { typeProjetFromRouteKey } from "@/utils/typeProjetRouting";

export function ProjetNewPage() {
  const { typeKey } = useParams<{ typeKey: string }>();
  const [searchParams] = useSearchParams();
  const forcedTypeProjet = typeProjetFromRouteKey(typeKey);
  const contratFromQuery = searchParams.get("contrat");
  const anmeFromQuery = searchParams.get("anme");
  const forcedContratAchat: TypeContrat | undefined =
    forcedTypeProjet === "PHOTOVOLTAIQUE_CLASSIQUE" &&
    (contratFromQuery === "PROGRAMME_PROSOL" ||
      contratFromQuery === "HORS_PROGRAMME_PROSOL")
      ? contratFromQuery
      : undefined;
  const forcedConditionSubvention: "OUI" | "NON" | undefined =
    forcedTypeProjet === "PHOTOVOLTAIQUE_CLASSIQUE" &&
    (anmeFromQuery === "OUI" || anmeFromQuery === "NON")
      ? anmeFromQuery
      : undefined;
  const nav = useNavigate();
  const qc = useQueryClient();
  const m = useMutation({
    mutationFn: createProjet,
    onSuccess: (p) => {
      qc.invalidateQueries({ queryKey: ["projets"] });
      toast.success("Projet créé");
      nav(`/projets/${p.id}`);
    },
    onError: (e: {
      response?: {
        data?: { message?: string; errors?: Record<string, string[] | undefined> };
      };
    }) => {
      const d = e.response?.data;
      const zod =
        d?.errors &&
        Object.values(d.errors)
          .flat()
          .filter(Boolean)
          .join(" · ");
      toast.error(zod || d?.message || "Erreur à la création");
    },
  });

  if (!forcedTypeProjet) {
    return <Navigate to="/projets/nouveau" replace />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-0.5 sm:px-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <Button variant="ghost" size="sm" asChild className="-ml-1 w-full shrink-0 sm:-ml-2 sm:w-auto">
          <Link to="/projets/nouveau">
            <ArrowLeft size={18} /> Retour
          </Link>
        </Button>
        <h1 className="min-w-0 text-xl font-semibold text-slate-800 sm:flex-1 sm:text-2xl">
          Nouveau projet
        </h1>
      </div>
      <ProjetForm
        key="nouveau"
        forcedTypeProjet={forcedTypeProjet}
        forcedContratAchat={forcedContratAchat}
        forcedConditionSubvention={forcedConditionSubvention}
        onSubmit={(body) => m.mutate(body)}
        submitting={m.isPending}
      />
    </div>
  );
}
