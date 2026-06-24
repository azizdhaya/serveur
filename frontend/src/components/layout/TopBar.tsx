import { useQuery } from "@tanstack/react-query";
import { Bell, LogOut, Menu } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchActivityApi } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { formatDateFr } from "@/utils/formatters";
import type { User } from "@/types/user.types";

const roleLabels: Record<User["role"], string> = {
  SUPER_ADMIN: "Super administrateur",
  ADMIN: "Administrateur",
  TECHNICIEN: "Technicien",
  COMMERCIAL: "Commercial",
};

const actionLabels: Record<string, string> = {
  CONNEXION: "Nouvelle connexion",
  CREATION: "Création",
  MODIFICATION: "Modification projet",
  SUPPRESSION: "Suppression projet",
  IMPORT_EXCEL: "Import Excel",
  MODIFICATION_UTILISATEUR: "Modification utilisateur",
};

function activityLastSeenStorageKey(userId: string) {
  return `pv-activity-last-seen:${userId}`;
}

function readActivityLastSeen(userId: string): number | null {
  try {
    const raw = localStorage.getItem(activityLastSeenStorageKey(userId));
    if (raw == null) return null;
    const t = Number(raw);
    return Number.isFinite(t) ? t : null;
  } catch {
    return null;
  }
}

function writeActivityLastSeen(userId: string, ts: number) {
  try {
    localStorage.setItem(activityLastSeenStorageKey(userId), String(ts));
  } catch {
    /* ignore quota / private mode */
  }
}

export function TopBar({
  user,
  onMenuClick,
  onLogout,
}: {
  user: User;
  onMenuClick: () => void;
  onLogout: () => void;
}) {
  const token = useAuthStore((s) => s.accessToken);
  const canSeeActivity = user.role === "SUPER_ADMIN" || user.role === "ADMIN";
  const [openNotif, setOpenNotif] = useState(false);
  const [lastSeenAt, setLastSeenAt] = useState<number | null>(() =>
    readActivityLastSeen(user.id)
  );
  const notifRef = useRef<HTMLDivElement | null>(null);
  const {
    data: activity = [],
    isError: activityError,
    refetch: refetchActivity,
  } = useQuery({
    queryKey: ["activity-feed", user.id],
    queryFn: () => fetchActivityApi(20),
    enabled: !!token && canSeeActivity,
    refetchInterval: 15_000,
    refetchIntervalInBackground: true,
    staleTime: 10_000,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const newestActivityAt = useMemo(() => {
    if (!activity.length) return null;
    const t = Math.max(
      ...activity.map((a) => new Date(a.createdAt).getTime())
    );
    return Number.isFinite(t) ? t : null;
  }, [activity]);

  /** Sans valeur en localStorage : aligner sur la dernière activité connue pour que les nouvelles seules incrémentent le badge. */
  const effectiveLastSeenAt = useMemo(() => {
    if (lastSeenAt != null) return lastSeenAt;
    const stored = readActivityLastSeen(user.id);
    if (stored != null) return stored;
    if (!canSeeActivity) return null;
    return newestActivityAt;
  }, [lastSeenAt, user.id, canSeeActivity, newestActivityAt]);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!notifRef.current) return;
      if (!notifRef.current.contains(event.target as Node)) {
        setOpenNotif(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenNotif(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const unreadCount = useMemo(() => {
    if (effectiveLastSeenAt == null) return 0;
    return activity.filter(
      (a) => new Date(a.createdAt).getTime() > effectiveLastSeenAt
    ).length;
  }, [activity, effectiveLastSeenAt]);

  function actionLabelOf(action: string): string {
    return actionLabels[action] ?? action.replaceAll("_", " ");
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200/80 bg-white/90 px-3 shadow-sm backdrop-blur-md sm:px-6">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#8cc63f] via-[#f18a21] to-[#0081c4] opacity-90"
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 transition-transform hover:scale-105 active:scale-95 lg:hidden"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu de navigation"
        >
          <Menu size={22} className="text-[#0081c4]" />
        </Button>
        <span className="truncate text-sm font-semibold text-[#0c4a6e] lg:hidden">
          Photovoltaïque
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
        {canSeeActivity ? (
          <div className="relative" ref={notifRef}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative text-slate-500 hover:bg-sky-50 hover:text-[#0081c4]"
              aria-label="Notifications"
              aria-expanded={openNotif}
              aria-haspopup="dialog"
              onClick={() => {
                setOpenNotif((v) => {
                  const next = !v;
                  if (next) {
                    const now = Date.now();
                    setLastSeenAt(now);
                    writeActivityLastSeen(user.id, now);
                    void refetchActivity();
                  }
                  return next;
                });
              }}
            >
              <Bell size={20} />
              {unreadCount > 0 ? (
                <span className="absolute right-1 top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              ) : null}
            </Button>
            {openNotif ? (
              <div className="absolute right-0 z-50 mt-2 w-[22rem] max-w-[85vw] rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <div className="border-b border-slate-100 px-2 pb-2 pt-1">
                  <p className="text-sm font-semibold text-slate-800">Activités récentes</p>
                  <p className="text-xs text-slate-500">
                    Connexions et modifications en temps réel
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto py-1">
                  {activityError ? (
                    <p className="px-2 py-3 text-sm text-red-600">
                      Impossible de charger les notifications.
                    </p>
                  ) : activity.length === 0 ? (
                    <p className="px-2 py-3 text-sm text-slate-500">
                      Aucune activité récente.
                    </p>
                  ) : (
                    activity.map((a) => (
                      <div
                        key={a.id}
                        className="rounded-lg px-2 py-2 text-sm hover:bg-slate-50"
                      >
                        <p className="font-medium text-slate-800">
                          {actionLabelOf(a.action)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {a.user.prenom} {a.user.nom} · {formatDateFr(a.createdAt)}
                        </p>
                        {a.projet ? (
                          <Link
                            to={`/projets/${a.projet.id}`}
                            className="text-xs text-[#006aa3] hover:underline"
                            onClick={() => setOpenNotif(false)}
                          >
                            Projet: {a.projet.reference}
                          </Link>
                        ) : null}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="hidden max-w-[min(12rem,42vw)] text-right text-sm sm:block sm:max-w-none">
          <p className="truncate font-semibold text-slate-800">
            {user.prenom} {user.nom}
          </p>
          <p className="truncate text-xs text-slate-500">{roleLabels[user.role]}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 px-2 sm:px-3"
          onClick={onLogout}
          aria-label="Se déconnecter"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Se déconnecter</span>
        </Button>
      </div>
    </header>
  );
}
