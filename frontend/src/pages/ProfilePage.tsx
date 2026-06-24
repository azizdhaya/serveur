import { useState } from "react";
import { toast } from "sonner";
import { changePasswordApi } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_VALUE_LABEL } from "@/utils/constants";
import { useAuthStore } from "@/store/authStore";

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const [cur, setCur] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (n1 !== n2) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (n1.length < 8) {
      toast.error("8 caractères minimum");
      return;
    }
    setLoading(true);
    try {
      await changePasswordApi(cur, n1);
      toast.success("Mot de passe modifié");
      setCur("");
      setN1("");
      setN2("");
    } catch {
      toast.error("Échec : vérifiez le mot de passe actuel");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg space-y-4 sm:space-y-6">
      <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">Mon profil</h1>
      <Card>
        <CardHeader className="py-3 sm:py-6">
          <h2 className="text-sm font-medium sm:text-base">Informations</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            {user.prenom} {user.nom}
          </p>
          <p className="text-slate-500">{user.email}</p>
          <p className="text-slate-500">{user.telephone ?? EMPTY_VALUE_LABEL}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="py-3 sm:py-6">
          <h2 className="text-sm font-medium sm:text-base">Changer le mot de passe</h2>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={submit}>
            <div className="space-y-1">
              <Label>Mot de passe actuel</Label>
              <Input
                type="password"
                value={cur}
                onChange={(e) => setCur(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Nouveau mot de passe</Label>
              <Input
                type="password"
                value={n1}
                onChange={(e) => setN1(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Confirmation</Label>
              <Input
                type="password"
                value={n2}
                onChange={(e) => setN2(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
              {loading ? "…" : "Enregistrer"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
