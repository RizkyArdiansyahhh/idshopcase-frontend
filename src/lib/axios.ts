import axios from "axios";

export const wilayahApi = axios.create({
  baseURL: "https://rizkyardiansyahhh.github.io/api-wilayah-indonesia/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export const api = axios.create({
  baseURL: "https://monistically-exopathic-maida.ngrok-free.dev/api",
  // baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
