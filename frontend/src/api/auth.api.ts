import { axiosClient } from "./axiosClient";
import type { ActivityLog } from "@/types/activity.types";
import type { User } from "@/types/user.types";

export async function loginApi(email: string, password: string) {
  const { data } = await axiosClient.post<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>("/auth/login", {
    email: email.trim().toLowerCase(),
    password: password.trim(),
  });
  return data;
}

export async function logoutApi(refreshToken: string) {
  await axiosClient.post("/auth/logout", { refreshToken });
}

export async function meApi() {
  const { data } = await axiosClient.get<User>("/auth/me");
  return data;
}

export async function changePasswordApi(
  currentPassword: string,
  newPassword: string
) {
  await axiosClient.patch("/auth/change-password", {
    currentPassword,
    newPassword,
  });
}

export async function fetchActivityApi(limit = 20) {
  const { data } = await axiosClient.get<ActivityLog[]>("/auth/activity", {
    params: { limit },
  });
  return data;
}
