import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { fetchProjet, updateProjet } from "@/api/projets.api";
import { ProjetForm } from "@/components/projets/ProjetForm";
import { Button } from "@/components/ui/button";
import type { TypeProjet } from "@/types/projet.types";

export function ProjetEditPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const qc = useQueryClient();
  const { data: p, isLoading } = useQuery({
    queryKey: ["projet", id],
    queryFn: () => fetchProjet(id!),
    enabled: !!id,
  });

  const m = useMutation({
    mutationFn: (body: Record<string, unknown>) => updateProjet(id!, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projets"] });
      qc.invalidateQueries({ queryKey: ["projet", id] });
      toast.success("Projet mis à jour");
      nav(`/projets/${id}`);
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
      toast.error(zod || d?.message || "Erreur à l’enregistrement");
    },
  });

  if (isLoading || !p) {
    return <p className="text-slate-500">Chargement…</p>;
  }

  const forcedTypeProjet: TypeProjet | undefined =
    p.typeProjet === "PHOTOVOLTAIQUE_CLASSIQUE" ||
    p.typeProjet === "POMPAGE" ||
    p.typeProjet === "ISOLE_AVEC_BATTERIES" ||
    p.typeProjet === "AUTRE"
      ? p.typeProjet
      : undefined;
  return (
    <div className="mx-auto max-w-5xl space-y-4 px-0.5 sm:px-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <Button variant="ghost" size="sm" asChild className="-ml-1 w-full shrink-0 sm:-ml-2 sm:w-auto">
          <Link to={`/projets/${id}`}>
            <ArrowLeft size={18} /> Retour
          </Link>
        </Button>
        <h1 className="min-w-0 truncate text-xl font-semibold text-slate-800 sm:flex-1 sm:text-2xl">
          Modifier · {p.reference}
        </h1>
      </div>
      <ProjetForm
        key={p.id}
        initial={p}
        forcedTypeProjet={forcedTypeProjet}
        onSubmit={(body) => m.mutate(body)}
        submitting={m.isPending}
      />
    </div>
  );
}
