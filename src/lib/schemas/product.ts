import z from "zod";

export const formProductSchema = z.object({
  name: z.string().max(50, "Maksimal 50 karakter").nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  // category: z.string().,
  basePrice: z.number().min(0, "Harga tidak boleh negatif").optional(),
  baseStock: z.number().min(0, "Stok tidak boleh negatif").optional(),
  images: z.array(z.string()),
  toggleIsVariant: z.boolean(),
  variantOptions: z.array(
    z.object({
      nameVariant: z.string().nonempty(),
      valueVariant: z
        .array(
          z.object({
            label: z.string().nonempty(),
            imageVariant: z.string().optional(),
          })
        )
        .optional(),
    })
  ),
  variantCombinations: z
    .array(
      z.object({
        combination: z.record(z.string(), z.string()),
        stock: z.number().min(0, "Stok tidak boleh negatif"),
        price: z.number().min(0, "Harga tidak boleh negatif"),
      })
    )
    .optional(),
});

export type FormProductType = z.infer<typeof formProductSchema>;
