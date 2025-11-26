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
  images: z.array(z.instanceof(File)).min(1, "Minimal 1 gambar wajib diupload"),
  toggleIsVariant: z.boolean().optional(),
  variant: z.array(z.number()).optional(),
  toggleIsPhoneType: z.boolean().optional(),
  phone_type: z.array(z.number()).optional(),
  toggleIsCreateVariant: z.boolean().optional(),

  nameVariant: z.string().nullable().optional(),
  priceVariant: z.string().nullable().optional(),
  stockVariant: z.string().nullable().optional(),
  maxImagesVariant: z.string().nullable().optional(),
});

export type FormProductType = z.infer<typeof formProductSchema>;
