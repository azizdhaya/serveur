import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  createUserApi,
  deleteUserApi,
  fetchUsers,
  toggleUserApi,
  updateUserApi,
} from "@/api/users.api";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Role } from "@/types/user.types";
import { formatDateFr } from "@/utils/formatters";

export function UsersPage() {
  const qc = useQueryClient();
  const [searchParams] = useSearchParams();
  const createCommercialFromUrl = searchParams.get("nouveau") === "commercial";
  const [open, setOpen] = useState(createCommercialFromUrl);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteUserTarget, setDeleteUserTarget] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    role: "COMMERCIAL" as Role,
  });
  const [manageForm, setManageForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    role: "TECHNICIEN" as Role,
    password: "",
    passwordConfirm: "",
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createM = useMutation({
    mutationFn: () =>
      createUserApi({
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        telephone: form.telephone || null,
        role: form.role,
      }),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["commercials"] });
      setOpen(false);
      setForm({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        role: "COMMERCIAL",
      });
      if (res.tempPassword) {
        toast.success(`Mot de passe temporaire : ${res.tempPassword}`, {
          duration: 12000,
        });
      } else toast.success("Utilisateur créé");
    },
    onError: () => toast.error("Création impossible"),
  });

  const toggleM = useMutation({
    mutationFn: toggleUserApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["commercials"] });
      toast.success("Statut mis à jour");
    },
  });

  const updateM = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: {
        nom: string;
        prenom: string;
        email: string;
        telephone: string | null;
        role: Role;
        password?: string;
      };
    }) => updateUserApi(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["commercials"] });
      toast.success("Informations utilisateur mises à jour");
      setManageOpen(false);
      setSelectedUserId(null);
    },
    onError: () => toast.error("Mise à jour impossible"),
  });

  const delM = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["commercials"] });
      toast.success("Utilisateur supprimé");
    },
    onError: () => toast.error("Suppression refusée"),
  });

  if (isLoading) return <p className="text-slate-500">Chargement…</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">
          Utilisateurs
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button type="button" className="w-full sm:w-auto" onClick={() => setOpen(true)}>
            Nouvel utilisateur
          </Button>
        </div>
      </div>

      {open && (
        <Card>
          <CardHeader>
            <h2 className="font-medium">Créer un utilisateur</h2>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Nom</Label>
              <Input
                value={form.nom}
                onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label>Prénom</Label>
              <Input
                value={form.prenom}
                onChange={(e) =>
                  setForm((f) => ({ ...f, prenom: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Téléphone</Label>
              <Input
                value={form.telephone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, telephone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Rôle</Label>
              <select
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value as Role }))
                }
              >
                <option value="COMMERCIAL">Commercial</option>
                <option value="ADMIN">Administrateur</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 sm:flex-row">
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => createM.mutate()}
                disabled={createM.isPending}
              >
                Créer
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {manageOpen && (
        <Card>
          <CardHeader>
            <h2 className="font-medium">Gérer utilisateur</h2>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Nom</Label>
              <Input
                value={manageForm.nom}
                onChange={(e) =>
                  setManageForm((f) => ({ ...f, nom: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Prénom</Label>
              <Input
                value={manageForm.prenom}
                onChange={(e) =>
                  setManageForm((f) => ({ ...f, prenom: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={manageForm.email}
                onChange={(e) =>
                  setManageForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Téléphone</Label>
              <Input
                value={manageForm.telephone}
                onChange={(e) =>
                  setManageForm((f) => ({ ...f, telephone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Nouveau mot de passe (manuel)</Label>
              <Input
                type="password"
                value={manageForm.password}
                onChange={(e) =>
                  setManageForm((f) => ({ ...f, password: e.target.value }))
                }
                placeholder="Laisser vide pour ne pas changer"
              />
            </div>
            <div className="space-y-1">
              <Label>Confirmer le mot de passe</Label>
              <Input
                type="password"
                value={manageForm.passwordConfirm}
                onChange={(e) =>
                  setManageForm((f) => ({
                    ...f,
                    passwordConfirm: e.target.value,
                  }))
                }
                placeholder="Ressaisir le nouveau mot de passe"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Rôle</Label>
              <select
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                value={manageForm.role}
                onChange={(e) =>
                  setManageForm((f) => ({ ...f, role: e.target.value as Role }))
                }
              >
                <option value="COMMERCIAL">Commercial</option>
                <option value="ADMIN">Administrateur</option>
                <option value="SUPER_ADMIN">Super administrateur</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => {
                  if (!selectedUserId) return;
                  const password = manageForm.password.trim();
                  if (password.length > 0 && password.length < 8) {
                    toast.error("Le mot de passe doit contenir au moins 8 caractères");
                    return;
                  }
                  if (password !== manageForm.passwordConfirm.trim()) {
                    toast.error("La confirmation du mot de passe ne correspond pas");
                    return;
                  }
                  updateM.mutate({
                    id: selectedUserId,
                    body: {
                      nom: manageForm.nom,
                      prenom: manageForm.prenom,
                      email: manageForm.email,
                      telephone: manageForm.telephone || null,
                      role: manageForm.role,
                      ...(password ? { password } : {}),
                    },
                  });
                }}
                disabled={updateM.isPending || !selectedUserId}
              >
                Enregistrer infos et mot de passe
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  setManageOpen(false);
                  setSelectedUserId(null);
                }}
              >
                Fermer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3 sm:hidden">
        {users?.map((u) => (
          <div key={u.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800">
                  {u.prenom} {u.nom}
                </p>
                <p className="truncate text-xs text-slate-500">{u.email}</p>
              </div>
              <span
                className={
                  u.actif
                    ? "rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700"
                    : "rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700"
                }
              >
                {u.actif ? "Actif" : "Inactif"}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <p className="text-slate-600">
                <span className="font-medium text-slate-700">Rôle :</span> {u.role}
              </p>
              <p className="text-slate-600">
                <span className="font-medium text-slate-700">Dernière :</span>{" "}
                {formatDateFr(u.lastLoginAt)}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button
                size="sm"
                variant="outline"
                type="button"
                className="h-8 px-2 text-xs"
                onClick={() => toggleM.mutate(u.id)}
                disabled={u.role === "SUPER_ADMIN"}
              >
                {u.actif ? "Désact." : "Activer"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                type="button"
                className="h-8 px-2 text-xs"
                onClick={() => {
                  setSelectedUserId(u.id);
                  setManageForm({
                    nom: u.nom,
                    prenom: u.prenom,
                    email: u.email,
                    telephone: u.telephone ?? "",
                    role: u.role,
                    password: "",
                    passwordConfirm: "",
                  });
                  setManageOpen(true);
                }}
              >
                Gérer
              </Button>
              <Button
                size="sm"
                variant="destructive"
                type="button"
                className="h-8 px-2 text-xs"
                onClick={() =>
                  setDeleteUserTarget({
                    id: u.id,
                    name: `${u.prenom} ${u.nom}`.trim(),
                    email: u.email,
                  })
                }
                disabled={u.role === "SUPER_ADMIN"}
              >
                Suppr.
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white sm:block">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rôle</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Dernière connexion</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u, i) => (
              <tr
                key={u.id}
                className={i % 2 ? "bg-slate-50/50" : "bg-white"}
              >
                <td className="p-3">
                  {u.prenom} {u.nom}
                </td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-xs">{u.role}</td>
                <td className="p-3">
                  {u.actif ? (
                    <span className="text-emerald-700">Actif</span>
                  ) : (
                    <span className="text-red-600">Inactif</span>
                  )}
                </td>
                <td className="p-3">{formatDateFr(u.lastLoginAt)}</td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => toggleM.mutate(u.id)}
                      disabled={u.role === "SUPER_ADMIN"}
                    >
                      {u.actif ? "Désactiver" : "Activer"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => {
                        setSelectedUserId(u.id);
                        setManageForm({
                          nom: u.nom,
                          prenom: u.prenom,
                          email: u.email,
                          telephone: u.telephone ?? "",
                          role: u.role,
                          password: "",
                          passwordConfirm: "",
                        });
                        setManageOpen(true);
                      }}
                    >
                      Gérer
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      type="button"
                      onClick={() =>
                        setDeleteUserTarget({
                          id: u.id,
                          name: `${u.prenom} ${u.nom}`.trim(),
                          email: u.email,
                        })
                      }
                      disabled={u.role === "SUPER_ADMIN"}
                    >
                      Suppr.
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={deleteUserTarget != null}
        onOpenChange={(o) => {
          if (!o) setDeleteUserTarget(null);
        }}
        title="Supprimer cet utilisateur ?"
        description={
          deleteUserTarget
            ? `${deleteUserTarget.name} (${deleteUserTarget.email}) sera supprimé définitivement. Cette action ne peut pas être annulée.`
            : ""
        }
        onConfirm={() => {
          if (!deleteUserTarget) return;
          delM.mutate(deleteUserTarget.id, {
            onSettled: () => setDeleteUserTarget(null),
          });
        }}
        pending={delM.isPending}
      />
    </div>
  );
}
