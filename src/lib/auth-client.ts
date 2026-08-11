import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
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
