import z from "zod";

export const formProductSchema = z.object({
  name: z
    .string({ message: "Nama tidak boleh kosong" })
    .max(50, "Maksimal 50 karakter")
    .nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  category: z.enum(["custom_case", "keychain", "phone_charm", "pop_socket"], {
    message: "Silahkan pilih kategori produk",
  }),
  price: z.string().min(0, "Harga tidak boleh negatif"),
  stock: z.number().min(0, "Stok tidak boleh negatif"),
  images: z.array(z.instanceof(File)).min(1, "Minimal 1 gambar wajib diupload"),
  toggleIsMaterial: z.boolean().optional(),
  material: z.array(z.number()).optional(),
  toggleIsVariant: z.boolean().optional(),
  variant: z.array(z.string()).optional(),
  toggleIsPhoneType: z.boolean().optional(),
  phone_type: z.array(z.number()).optional(),
});

export type FormProductType = z.infer<typeof formProductSchema>;
