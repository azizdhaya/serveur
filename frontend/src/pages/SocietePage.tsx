import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  EMPTY_SOCIETE_INFO,
  fetchSocieteInfo,
  type SocieteInfo,
  updateSocieteInfo,
} from "@/api/societe.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

export function SocietePage() {
  const queryClient = useQueryClient();
  const [edited, setEdited] = useState<SocieteInfo | null>(null);
  const [showPdfSettings, setShowPdfSettings] = useState(false);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["societe-info"],
    queryFn: fetchSocieteInfo,
  });
  const saveMutation = useMutation({
    mutationFn: updateSocieteInfo,
  });

  const serverForm = data ?? EMPTY_SOCIETE_INFO;
  const form = edited ?? serverForm;

  const setField = <K extends keyof SocieteInfo>(key: K, value: SocieteInfo[K]) =>
    setEdited((prev) => ({ ...(prev ?? serverForm), [key]: value }));

  async function persistSocieteInfo(payload: SocieteInfo, successMessage: string) {
    const payloadSizeBytes = new Blob([JSON.stringify(payload)]).size;
    if (payloadSizeBytes > 24 * 1024 * 1024) {
      toast.error("Logo trop volumineux. Choisissez une image plus légère.");
      return;
    }
    const saved = await saveMutation.mutateAsync(payload);
    queryClient.setQueryData(["societe-info"], saved);
    setEdited(null);
    toast.success(successMessage);
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await persistSocieteInfo(form, "Informations société enregistrées");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Enregistrement impossible";
      toast.error(msg);
    }
  };

  const onReset = async () => {
    if (!window.confirm("Réinitialiser les informations société enregistrées ?")) return;
    try {
      await persistSocieteInfo(EMPTY_SOCIETE_INFO, "Informations société réinitialisées");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Réinitialisation impossible";
      toast.error(msg);
    }
  };

  const onPickLogo = () => {
    logoInputRef.current?.click();
  };

  const onClearLogo = async () => {
    const payload = { ...form, pdfLogoDataUrl: "" };
    setField("pdfLogoDataUrl", "");
    try {
      await persistSocieteInfo(payload, "Logo PDF supprimé");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Suppression du logo impossible";
      toast.error(msg);
    }
  };

  const onLogoChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result ?? "");
      if (!dataUrl.startsWith("data:image/")) {
        toast.error("Format d'image non supporté");
        return;
      }
      const payload = { ...form, pdfLogoDataUrl: dataUrl };
      setField("pdfLogoDataUrl", dataUrl);
      try {
        await persistSocieteInfo(payload, "Logo PDF enregistré");
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Enregistrement du logo impossible";
        toast.error(msg);
      }
    };
    reader.onerror = () => toast.error("Impossible de lire le fichier image");
    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4 sm:space-y-6">
      <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">Société</h1>
      <Card>
        <CardHeader>
          <h2 className="font-medium">Informations de la société</h2>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-slate-500">Chargement…</p>
          ) : null}
          <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Dénomination" value={form.denomination} onChange={(v) => setField("denomination", v)} />
              <Field
                label="Nom commercial"
                value={form.nomCommercial}
                onChange={(v) => setField("nomCommercial", v)}
              />
              <Field
                label="Adresse du siège social"
                value={form.adresseSiegeSocial}
                onChange={(v) => setField("adresseSiegeSocial", v)}
              />
              <Field
                label="Adresse d'activité"
                value={form.adresseActivite}
                onChange={(v) => setField("adresseActivite", v)}
              />
              <Field
                label="Forme juridique"
                value={form.formeJuridique}
                onChange={(v) => setField("formeJuridique", v)}
              />
              <Field label="MF" value={form.mf} onChange={(v) => setField("mf", v)} />
              <Field
                label="Capital social"
                value={form.capitalSocial}
                onChange={(v) => setField("capitalSocial", v)}
              />
              <Field label="Gérant" value={form.gerant} onChange={(v) => setField("gerant", v)} />
              <Field
                label="Contact fixe"
                value={form.contactFixe}
                onChange={(v) => setField("contactFixe", v)}
              />
              <Field label="Fax" value={form.contactFax} onChange={(v) => setField("contactFax", v)} />
              <Field
                label="Mobile"
                value={form.contactMobile}
                onChange={(v) => setField("contactMobile", v)}
              />
              <Field
                label="Adresse mail"
                value={form.adresseEmail}
                onChange={(v) => setField("adresseEmail", v)}
              />
              <Field label="RIB" value={form.rib} onChange={(v) => setField("rib", v)} />
              <Field label="Banque" value={form.banque} onChange={(v) => setField("banque", v)} />
              <Field label="Code STEG" value={form.codeSteg} onChange={(v) => setField("codeSteg", v)} />
              <Field label="Code ANME" value={form.codeAnme} onChange={(v) => setField("codeAnme", v)} />
              <Field
                label="Validité ANME"
                value={form.validiteAnme}
                onChange={(v) => setField("validiteAnme", v)}
                placeholder="ex. 31/12/2026"
              />
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-700">Zone paramètres PDF</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => setShowPdfSettings((s) => !s)}
                >
                  {showPdfSettings ? "Masquer paramètres PDF" : "Paramètres PDF"}
                </Button>
              </div>
              {showPdfSettings ? (
                <div className="mt-3 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Logo PDF</Label>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="h-28 w-full max-w-[18rem] overflow-hidden rounded-md border border-slate-300 bg-white">
                          {form.pdfLogoDataUrl ? (
                            <img
                              src={form.pdfLogoDataUrl}
                              alt="Logo PDF"
                              className="h-full w-full object-contain"
                            />
                          ) : null}
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-auto">
                          <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onLogoChange(e.target.files?.[0] ?? null)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={onPickLogo}
                          >
                            Sélection du logo
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => void onClearLogo()}
                          >
                            Pas de logo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:flex-wrap">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={saveMutation.isPending || isLoading}
              >
                Enregistrer
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => void onReset()}
                disabled={saveMutation.isPending || isLoading}
              >
                Réinitialiser
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
