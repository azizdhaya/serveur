export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "TECHNICIEN"
  | "COMMERCIAL";

export type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  role: Role;
  actif: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string | null;
  projetsCount?: number;
};
