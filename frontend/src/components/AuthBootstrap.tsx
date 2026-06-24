import { useEffect, useState } from "react";
import { meApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";

/**
 * Au démarrage, restaure l'utilisateur à partir du token persistant.
 */
export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"loading" | "ready">("loading");
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const token = useAuthStore.getState().accessToken;
      if (!token) {
        if (!cancelled) setState("ready");
        return;
      }
      try {
        const user = await meApi();
        if (!cancelled) {
          setUser(user);
          setState("ready");
        }
      } catch {
        logout();
        if (!cancelled) setState("ready");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [setUser, logout]);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <p className="text-sm text-slate-300">Chargement…</p>
      </div>
    );
  }

  return <>{children}</>;
}
