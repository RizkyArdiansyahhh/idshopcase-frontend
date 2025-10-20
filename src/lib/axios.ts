import axios from "axios";

export const wilayahApi = axios.create({
  baseURL: "https://rizkyardiansyahhh.github.io/api-wilayah-indonesia/api",
  headers: {
    "Content-Type": "application/json",
  },
});
