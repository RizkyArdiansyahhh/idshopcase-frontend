import axios from "axios";

export const wilayahApi = axios.create({
  baseURL: "https://wilayah.id/api",
  headers: {
    "Content-Type": "application/json",
  },
});
