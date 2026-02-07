import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Nama wajib diisi" })
      .min(1, { message: "Nama minimal 1 karakter" }),

    email: z
      .string({ message: "Email wajib diisi" })
      .email({ message: "Format email tidak valid" }),

    phone: z
      .string({ message: "Nomor telepon wajib diisi" })
      .min(10, { message: "Nomor telepon minimal 10 digit" }),

    password: z
      .string({ message: "Password wajib diisi" })
      .min(8, { message: "Password minimal 8 karakter" })
      .regex(/[A-Z]/, {
        message: "Password harus mengandung minimal 1 huruf besar",
      })
      .regex(/[a-z]/, {
        message: "Password harus mengandung minimal 1 huruf kecil",
      })
      .regex(/\d/, {
        message: "Password harus mengandung minimal 1 angka",
      }),

    confirmPassword: z.string({ message: "Konfirmasi password wajib diisi" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export const updateSchema = z.object({
  name: z.string({ message: "Nama wajib diisi" }).min(8, {
    message: "Nama minimal 8 karakter",
  }),
  role: z.enum(["admin", "customer"]),
});

type registerSchemaType = z.infer<typeof registerSchema>;

const register = async (data: registerSchemaType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...payload } = data;
  const response = await api.post("/auth/register", { ...payload });

  return response.data;
};

type UseRegisterParams = {
  mutationConfig?: MutationConfig<typeof register>;
};

export const useRegsiter = (params: UseRegisterParams = {}) => {
  return useMutation({
    mutationFn: register,
    ...params.mutationConfig,
    onError: (err) => {
      toast.error("Terjadi Kesalahan");
      console.error(err);
    },
  });
};
