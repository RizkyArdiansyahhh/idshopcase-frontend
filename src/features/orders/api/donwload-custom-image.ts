import { api } from "@/lib/axios";

export const downloadCustomImage = async (id: number) => {
  const response = await api.get(`/product/custom/${id}/download`, {
    responseType: "blob", // <--- ini penting
  });

  // buat URL sementara untuk download
  const blobUrl = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `custom-image-${id}.jpg`; // nama file yang diinginkan
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};
