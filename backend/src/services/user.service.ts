import type { Role } from "@prisma/client";
import { prisma } from "../db.js";
import { AppError } from "../middleware/error.middleware.js";
import { hashPassword } from "../utils/bcrypt.js";
import type { AccessPayload } from "../utils/jwt.js";
import { generateTempPassword, publicUser } from "./auth.service.js";

const agentInclude = {
  projets: { select: { id: true } },
};

export async function listUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: agentInclude,
  });
  return users.map((u) => {
    const { projets, ...raw } = u;
    return { ...publicUser(raw), projetsCount: projets.length };
  });
}

export async function getUser(id: string) {
  const u = await prisma.user.findUnique({
    where: { id },
    include: agentInclude,
  });
  if (!u) throw new AppError(404, "Utilisateur introuvable");
  const { projets, ...raw } = u;
  return { ...publicUser(raw), projetsCount: projets.length };
}

type CreateUserInput = {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string | null;
  password?: string;
  role: Role;
  actif?: boolean;
};

export async function createUser(
  actor: AccessPayload,
  data: CreateUserInput
) {
  if (data.role === "SUPER_ADMIN") {
    throw new AppError(403, "Impossible de créer un super administrateur");
  }
  if (data.role === "ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new AppError(403, "Seul le super administrateur peut créer un administrateur");
  }
  const exists = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (exists) throw new AppError(400, "Cet email est déjà utilisé");

  const password = data.password ?? generateTempPassword();
  const user = await prisma.user.create({
    data: {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone ?? null,
      password: await hashPassword(password),
      role: data.role,
      actif: data.actif ?? true,
      createdBy: actor.sub,
    },
  });
  return { user: publicUser(user), tempPassword: data.password ? undefined : password };
}

type UpdateUserInput = Partial<{
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  password: string;
  role: Role;
  actif: boolean;
}>;

export async function updateUser(
  actor: AccessPayload,
  id: string,
  data: UpdateUserInput
) {
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) throw new AppError(404, "Utilisateur introuvable");
  if (target.role === "SUPER_ADMIN" && actor.sub !== id) {
    throw new AppError(403, "Modification interdite");
  }
  if (data.role === "ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new AppError(403, "Seul le super administrateur peut attribuer le rôle administrateur");
  }
  if (data.email && data.email !== target.email) {
    const exists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (exists) throw new AppError(400, "Cet email est déjà utilisé");
  }
  const updateData: {
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string | null;
    password?: string;
    role?: Role;
    actif?: boolean;
  } = { ...data };
  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }
  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  await prisma.actionLog.create({
    data: {
      userId: actor.sub,
      action: "MODIFICATION_UTILISATEUR",
      details: {
        targetUserId: id,
        targetEmail: user.email,
      },
    },
  });
  if (data.password) {
    await prisma.session.deleteMany({ where: { userId: id } });
  }
  return publicUser(user);
}

export async function toggleUser(actor: AccessPayload, id: string) {
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) throw new AppError(404, "Utilisateur introuvable");
  if (target.role === "SUPER_ADMIN") {
    throw new AppError(403, "Impossible de désactiver le super administrateur");
  }
  const user = await prisma.user.update({
    where: { id },
    data: { actif: !target.actif },
  });
  if (!user.actif) {
    await prisma.session.deleteMany({ where: { userId: id } });
  }
  await prisma.actionLog.create({
    data: {
      userId: actor.sub,
      action: user.actif ? "ACTIVATION_UTILISATEUR" : "DESACTIVATION_UTILISATEUR",
      details: { targetUserId: id, targetEmail: user.email },
    },
  });
  return publicUser(user);
}

export async function deleteUser(actor: AccessPayload, id: string) {
  if (actor.role !== "SUPER_ADMIN") {
    throw new AppError(403, "Accès refusé");
  }
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) throw new AppError(404, "Utilisateur introuvable");
  if (target.role === "SUPER_ADMIN") {
    throw new AppError(403, "Impossible de supprimer le super administrateur");
  }
  await prisma.user.delete({ where: { id } });
}

export async function resetPassword(_actor: AccessPayload, id: string) {
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) throw new AppError(404, "Utilisateur introuvable");
  const temp = generateTempPassword();
  await prisma.user.update({
    where: { id },
    data: { password: await hashPassword(temp) },
  });
  await prisma.session.deleteMany({ where: { userId: id } });
  return { tempPassword: temp };
}

export async function listCommercials() {
  return prisma.user.findMany({
    where: { role: "COMMERCIAL", actif: true },
    select: { id: true, nom: true, prenom: true, email: true },
    orderBy: [{ nom: "asc" }, { prenom: "asc" }],
  });
}
