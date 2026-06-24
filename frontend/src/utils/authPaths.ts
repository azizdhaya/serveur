import type { Role } from "@/types/user.types";

/** Page d’accueil après authentification (les commerciaux n’ont pas le tableau de bord). */
export function homePathForRole(role: Role): "/dashboard" | "/projets" {
  return role === "COMMERCIAL" ? "/projets" : "/dashboard";
}
