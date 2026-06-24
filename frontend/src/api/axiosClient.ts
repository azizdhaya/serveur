import axios from "axios";
import { useAuthStore } from "@/store/authStore";

/** En dev, `/api` peut passer par le proxy Vite (voir vite.config + VITE_API_PORT). */
const envUrl = import.meta.env.VITE_API_BASE_URL?.trim();

function isLocalApiUrl(url: string): boolean {
  return /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(url.trim());
}

function isRemoteBrowserAccess(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}

function resolveBaseUrl(): string {
  if (!envUrl || envUrl.length === 0) return "/api";
  // Si l'app est ouverte à distance (ex: ngrok), une URL API locale casserait côté mobile.
  if (isRemoteBrowserAccess() && isLocalApiUrl(envUrl)) return "/api";
  return envUrl;
}

const baseURL = resolveBaseUrl();

/** URL pour tester que l’API répond (proxy Vite `/health` → backend, ou URL absolue). */
export function getApiHealthCheckUrl(): string {
  if (baseURL.startsWith("http://") || baseURL.startsWith("https://")) {
    const b = baseURL.replace(/\/+$/, "");
    const root = b.endsWith("/api") ? b.slice(0, -4) : b;
    return `${root}/health`;
  }
  return "/health";
}

export const axiosClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const t = useAuthStore.getState().accessToken;
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

let refreshing = false;
let queue: Array<{
  resolve: (t: string) => void;
  reject: (e: unknown) => void;
}> = [];

axiosClient.interceptors.response.use(
  (r) => r,
  async (err) => {
    const orig = err.config as typeof err.config & { _retry?: boolean };
    if (err.response?.status !== 401 || orig._retry) {
      return Promise.reject(err);
    }
    const rt = useAuthStore.getState().refreshToken;
    if (!rt) {
      useAuthStore.getState().logout();
      return Promise.reject(err);
    }
    orig._retry = true;
    if (refreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token: string) => {
            orig.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(orig));
          },
          reject,
        });
      });
    }
    refreshing = true;
    try {
      const { data } = await axios.post<{ accessToken: string }>(
        `${baseURL}/auth/refresh`,
        { refreshToken: rt }
      );
      useAuthStore.getState().setAccessToken(data.accessToken);
      queue.forEach((q) => q.resolve(data.accessToken));
      queue = [];
      orig.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosClient(orig);
    } catch (e) {
      queue.forEach((q) => q.reject(e));
      queue = [];
      useAuthStore.getState().logout();
      return Promise.reject(e);
    } finally {
      refreshing = false;
    }
  }
);
