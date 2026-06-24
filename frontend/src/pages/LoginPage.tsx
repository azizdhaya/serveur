import { useState } from "react";
import { isAxiosError } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginApi } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { homePathForRole } from "@/utils/authPaths";

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (token && user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      setAuth(data);
      toast.success("Connexion réussie");
      navigate(homePathForRole(data.user.role), { replace: true });
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const apiMessage =
          typeof error.response?.data?.message === "string"
            ? error.response.data.message
            : undefined;
        if (!error.response) {
          toast.error("Impossible de joindre le serveur. Vérifiez la connexion.");
        } else if (status === 401) {
          toast.error("Échec de connexion: email ou mot de passe incorrect");
        } else {
          toast.error(apiMessage ?? `Erreur serveur (${status ?? "inconnue"})`);
        }
      } else {
        toast.error("Échec de connexion: email ou mot de passe incorrect");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[100dvh] min-h-screen items-center justify-center bg-slate-100 px-3 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 pb-4 sm:pb-6">
          <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">Connexion</h1>
          <p className="text-xs text-slate-500 sm:text-sm">
            Accédez au tableau de bord photovoltaïque.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="text-xs text-slate-500 hover:text-slate-700"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              </button>
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
