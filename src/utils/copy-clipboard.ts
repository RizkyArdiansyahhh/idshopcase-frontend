import { toast } from "sonner";

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);

    toast.success("Nomor Resi berhasil disalin ke clipboard");

    return { success: true };
  } catch (error) {
    toast.error("Gagal menyalin teks");

    return { success: false, error };
  }
}
