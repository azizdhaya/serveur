import {
  Building2,
  LayoutDashboard,
  FolderKanban,
  Users,
  UserCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/user.types";

const linkClass =
  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-200 transition-all duration-200 ease-out hover:bg-white/10 hover:pl-4 hover:text-white active:scale-[0.99]";

const activeClass =
  "bg-white/15 text-white shadow-inner ring-1 ring-white/20 before:absolute before:left-0 before:top-1/2 before:h-8 before:w-1 before:-translate-y-1/2 before:rounded-r before:bg-[#f18a21] before:content-['']";

type Item = { to: string; label: string; icon: React.ReactNode; roles?: Role[] };

const items: Item[] = [
  {
    to: "/dashboard",
    label: "Tableau de bord",
    icon: <LayoutDashboard size={20} />,
    roles: ["SUPER_ADMIN", "ADMIN", "TECHNICIEN"],
  },
  { to: "/projets", label: "Projets", icon: <FolderKanban size={20} /> },
  {
    to: "/utilisateurs",
    label: "Utilisateurs",
    icon: <Users size={20} />,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    to: "/societe",
    label: "Société",
    icon: <Building2 size={20} />,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  { to: "/profil", label: "Profil", icon: <UserCircle size={20} /> },
];

export function Sidebar({
  role,
  mobileOpen,
  onClose,
}: {
  role: Role;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Fermer le menu"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/50 transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        tabIndex={mobileOpen ? 0 : -1}
      />
      <aside
        aria-label="Navigation principale"
        className={cn(
          "flex h-full w-[min(17rem,85vw)] flex-shrink-0 flex-col text-slate-200 shadow-xl",
          "border-r border-white/10 bg-gradient-to-b from-[#0081c4] via-[#006aa3] to-[#0c4a6e]",
          "fixed inset-y-0 left-0 z-50 overscroll-contain transition-transform duration-300 ease-out",
          "lg:static lg:z-auto lg:h-auto lg:min-h-screen lg:w-60 lg:translate-x-0 lg:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3 pt-4">
          {items
            .filter((i) => !i.roles || i.roles.includes(role))
            .map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive }) =>
                  cn(linkClass, isActive && activeClass)
                }
                onClick={() => onClose()}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        "transition-colors duration-200",
                        isActive
                          ? "text-white"
                          : "text-[#8cc63f] group-hover:text-[#d4f08a]"
                      )}
                    >
                      {i.icon}
                    </span>
                    <span className="font-medium">{i.label}</span>
                  </>
                )}
              </NavLink>
            ))}
        </nav>
      </aside>
    </>
  );
}
