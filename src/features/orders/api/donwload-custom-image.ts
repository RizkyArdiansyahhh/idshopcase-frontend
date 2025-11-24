import { api } from "@/lib/axios";

export const donwloadCustomImage = async (id: number) => {
  const response = await api.get(`/product/custom/${id}/download`);
  console.log(response.data);
  return response.data;
};
