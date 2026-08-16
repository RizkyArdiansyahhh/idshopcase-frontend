import axios from "axios";
import { useAuthModalStore } from "@/stores/auth-modal-store";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export const apiUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

const attachAuthToken = (config: any) => {
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
