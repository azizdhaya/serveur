export type ActivityLog = {
  id: string;
  action: string;
  createdAt: string;
  user: {
    nom: string;
    prenom: string;
    email: string;
  };
  projet: {
    id: string;
    reference: string;
  } | null;
  details: unknown;
};
