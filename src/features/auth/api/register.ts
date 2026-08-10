import { authClient } from "@/lib/auth-client";
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
      .min(1, { message: "Nomor telepon wajib diisi" })
      .refine(
        (val) => {
          // Hitung total digit angka (termasuk kode negara)
          const digits = val.replace(/\D/g, "");
          return digits.length >= 10 && digits.length <= 15;
        },
        { message: "Nomor telepon harus antara 10 hingga 15 digit angka" }
      ),

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
  const res = await authClient.signUp.email({
    email: data.email,
    password: data.password,
    name: data.name,
  });

  if (res.error) {
    throw new Error(res.error.message || "Gagal melakukan pendaftaran");
  }

  return res.data;
};

type UseRegisterParams = {
  mutationConfig?: MutationConfig<typeof register>;
};

export const useRegsiter = (params: UseRegisterParams = {}) => {
  return useMutation({
    mutationFn: register,
    ...params.mutationConfig,
    onError: (err: Error, ...args) => {
      toast.error(err.message || "Terjadi kesalahan saat registrasi");
      console.error(err);
      params.mutationConfig?.onError?.(err, ...args);
    },
  });
};

