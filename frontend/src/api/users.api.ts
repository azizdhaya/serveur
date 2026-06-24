import { axiosClient } from "./axiosClient";
import type { User } from "@/types/user.types";

export async function fetchUsers() {
  const { data } = await axiosClient.get<User[]>("/users");
  return data;
}

export async function fetchUser(id: string) {
  const { data } = await axiosClient.get<User>(`/users/${id}`);
  return data;
}

export async function createUserApi(body: Record<string, unknown>) {
  const { data } = await axiosClient.post<{
    user: User;
    tempPassword?: string;
  }>("/users", body);
  return data;
}

export async function updateUserApi(id: string, body: Record<string, unknown>) {
  const { data } = await axiosClient.put<User>(`/users/${id}`, body);
  return data;
}

export async function toggleUserApi(id: string) {
  const { data } = await axiosClient.patch<User>(`/users/${id}/toggle`);
  return data;
}

export async function deleteUserApi(id: string) {
  await axiosClient.delete(`/users/${id}`);
}

export async function resetPasswordApi(id: string) {
  const { data } = await axiosClient.post<{ tempPassword: string }>(
    `/users/${id}/reset-password`
  );
  return data;
}

export async function fetchCommercials() {
  const { data } = await axiosClient.get<
    { id: string; nom: string; prenom: string; email: string }[]
  >("/users/commercials");
  return data;
}
