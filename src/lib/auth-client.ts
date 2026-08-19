import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  let envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1" &&
    !window.location.hostname.startsWith("192.168.") &&
    !window.location.hostname.startsWith("10.")
  ) {
    if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
      envUrl = "https://api.idshopcase.com/api";
    }
  }
  envUrl = envUrl || "http://localhost:5001/api";
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
