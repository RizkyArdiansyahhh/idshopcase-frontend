import axios from "axios";
import { useAuthModalStore } from "@/stores/auth-modal-store";

export const getApiBaseUrl = () => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1" &&
    !window.location.hostname.startsWith("192.168.") &&
    !window.location.hostname.startsWith("10.")
  ) {
    if (
      process.env.NEXT_PUBLIC_API_URL &&
      !process.env.NEXT_PUBLIC_API_URL.includes("localhost") &&
      !process.env.NEXT_PUBLIC_API_URL.includes("127.0.0.1")
    ) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    return "https://api.idshopcase.com/api";
  }

  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export const apiUpload = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

const attachAuthToken = (config: any) => {
  // Dynamically ensure baseURL points to correct environment (production domain on live site)
  config.baseURL = getApiBaseUrl();

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("better-auth.session_token");
    if (token) {
      config.headers = config.headers || {};
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
};

const handleResponseError = (error: any) => {
  if (typeof window !== "undefined" && error.response?.status === 401) {
    const currentPath = window.location.pathname;
    // Don't trigger modal if user is already on auth pages
    if (!currentPath.includes("/login") && !currentPath.includes("/register")) {
      useAuthModalStore.getState().openModal({
        reason: "session_expired",
        redirectUrl: `${currentPath}${window.location.search}`,
      });
    }
  }
  return Promise.reject(error);
};

api.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error));
apiUpload.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, handleResponseError);
apiUpload.interceptors.response.use((response) => response, handleResponseError);
