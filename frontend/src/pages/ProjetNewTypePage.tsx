import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, BatteryCharging, Droplets, Shapes, X, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TypeContrat } from "@/types/projet.types";
import { TYPE_PROJET_ROUTE_OPTIONS } from "@/utils/typeProjetRouting";

function TypeProjetIcon({ keyName }: { keyName: string }) {
  if (keyName === "isole-batteries") return <BatteryCharging size={20} />;
  if (keyName === "pompage") return <Droplets size={20} />;
  if (keyName === "autre") return <Shapes size={20} />;
  return <Zap size={20} />;
}

export function ProjetNewTypePage() {
  const nav = useNavigate();
  const [openContratDialog, setOpenContratDialog] = useState(false);
  const [openAnmeDialog, setOpenAnmeDialog] = useState(false);
  const [selectedContrat, setSelectedContrat] = useState<TypeContrat | null>(null);

  const handleTypeProjetClick = (typeKey: string) => {
    if (typeKey === "couple-reseau") {
      setOpenContratDialog(true);
      return;
    }
    nav(`/projets/nouveau/${typeKey}`);
  };

  const goToNewProject = (contrat: TypeContrat, anme?: "OUI" | "NON") => {
    const params = new URLSearchParams({ contrat });
    if (anme) params.set("anme", anme);
    nav(`/projets/nouveau/couple-reseau?${params.toString()}`);
  };

  const handleContratPick = (contrat: TypeContrat) => {
    setSelectedContrat(contrat);
    setOpenContratDialog(false);
    setOpenAnmeDialog(true);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-1 sm:px-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <Button variant="ghost" size="sm" asChild className="-ml-1 w-full shrink-0 sm:-ml-2 sm:w-auto">
          <Link to="/projets">
            <ArrowLeft size={18} /> Retour
          </Link>
        </Button>
        <h1 className="min-w-0 text-xl font-semibold text-slate-800 sm:flex-1 sm:text-2xl">
          Nouveau projet
        </h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <p className="mb-3 text-sm font-medium text-slate-700">
          Choisissez le type du projet
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TYPE_PROJET_ROUTE_OPTIONS.map((x) => (
            <button
              key={x.key}
              type="button"
              onClick={() => handleTypeProjetClick(x.key)}
              className={cn(
                "group relative flex h-24 items-center justify-between overflow-hidden rounded-xl border border-emerald-500/70 bg-gradient-to-b from-emerald-200 to-emerald-300 px-4 text-left text-sm font-semibold text-emerald-950 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-700 hover:from-emerald-300 hover:to-emerald-400 hover:shadow-md motion-safe:hover:scale-[1.02] sm:h-20 sm:flex-col sm:justify-center sm:gap-1.5 sm:px-2 sm:text-center sm:text-xs"
              )}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-900/0 via-emerald-950/10 to-emerald-900/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative rounded-full bg-emerald-100 p-2 text-emerald-800 shadow-sm ring-1 ring-emerald-500/60 transition-colors group-hover:bg-emerald-800 group-hover:text-emerald-50 sm:p-1.5">
                <TypeProjetIcon keyName={x.key} />
              </span>
              <span className="relative">{x.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Dialog.Root open={openContratDialog} onOpenChange={setOpenContratDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <Dialog.Title className="text-lg font-semibold text-slate-800">
                  Choisir le type de contrat
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-slate-600">
                  Sélectionnez le contrat pour le projet couplé au réseau.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button
                type="button"
                onClick={() => handleContratPick("PROGRAMME_PROSOL")}
                className="w-full"
              >
                Programme Prosol
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleContratPick("HORS_PROGRAMME_PROSOL")}
                className="w-full"
              >
                Hors Programme Prosol
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={openAnmeDialog} onOpenChange={setOpenAnmeDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <Dialog.Title className="text-lg font-semibold text-slate-800">
                  Subvention ANME
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-slate-600">
                  Le projet est-il concerné par la subvention ANME ?
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button
                type="button"
                onClick={() => {
                  setOpenAnmeDialog(false);
                  goToNewProject(selectedContrat ?? "PROGRAMME_PROSOL", "OUI");
                }}
                className="w-full"
              >
                Oui, concerné
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpenAnmeDialog(false);
                  goToNewProject(selectedContrat ?? "PROGRAMME_PROSOL", "NON");
                }}
                className="w-full"
              >
                Non, pas concerné
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
