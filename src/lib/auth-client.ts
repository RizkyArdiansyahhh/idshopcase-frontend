import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
      ? "https://api.idshopcase.com/api"
      : "http://localhost:5001/api");
  return envUrl.endsWith("/auth") ? envUrl : `${envUrl.replace(/\/+$/, "")}/auth`;
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  useSession,
  signIn,
  signUp,
  signOut,
  getSession,
} = authClient;
