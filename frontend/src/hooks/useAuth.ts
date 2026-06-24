import { useQuery } from "@tanstack/react-query";
import { meApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";

export function useMe() {
  const token = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const u = await meApi();
      setUser(u);
      return u;
    },
    enabled: !!token,
    retry: false,
  });
}
