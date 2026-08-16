import { api } from "@/lib/axios";
import { authClient } from "@/lib/auth-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getUser = async () => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("better-auth.session_token")
      : null;

  if (token) {
    // Auto-sync cookie for Next.js middleware if missing
    if (typeof document !== "undefined" && !document.cookie.includes("better-auth.session_token")) {
      const isSecure = window.location.protocol === "https:";
      document.cookie = `better-auth.session_token=${token}; path=/; max-age=604800; SameSite=Lax${isSecure ? "; Secure" : ""}`;
    }

    try {
      const res = await api.get("/auth/get-session", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.user) {
        return res.data.user;
      }
    } catch {
      if (typeof window !== "undefined") {
        localStorage.removeItem("better-auth.session_token");
        document.cookie = "better-auth.session_token=; path=/; max-age=0; SameSite=Lax";
      }
    }
  }

  const res = await authClient.getSession();
  if (res.error || !res.data?.user) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.data.user as any;
};

export const getUserQueryKey = () => ["user"];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: getUserQueryKey(),
    queryFn: () => getUser(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

type UseGetUserParams = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useGetUser = (params: UseGetUserParams = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...params.queryConfig,
  });
};

