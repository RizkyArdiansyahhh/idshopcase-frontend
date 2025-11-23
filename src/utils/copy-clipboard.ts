export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true };
  } catch (err) {
    console.error("Gagal menyalin:", err);
    return { success: false };
  }
}
