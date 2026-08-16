import { api } from "@/lib/axios";
import { authClient } from "@/lib/auth-client";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { getUserQueryKey } from "./get-user";
import { toast } from "sonner";

export const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z
    .string({ message: "Password wajib diisi" })
    .min(6, { message: "Password minimal 6 karakter" }),
});

type loginSchemaType = z.infer<typeof loginSchema>;

const loginWithEmailAndPassword = async (data: loginSchemaType) => {
  const response = await api.post("/auth/login", {
    email: data.email,
    password: data.password,
  });
  return response.data;
};

const logout = async () => {
  const res = await authClient.signOut();
  if (res.error) {
    throw new Error(res.error.message || "Gagal logout");
  }
  return res.data;
};

type useLoginPrams = {
  mutationConfig?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLogin = (params: useLoginPrams = {}) => {
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      if (data?.token && typeof window !== "undefined") {
        localStorage.setItem("better-auth.session_token", data.token);
      }
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
    onError: (err: any, ...args) => {
      // Jika caller menyediakan onError sendiri (seperti LoginForm), serahkan padanya
      if (params.mutationConfig?.onError) {
        return params.mutationConfig.onError(err, ...args);
      }

      const rawMsg = err.response?.data?.message || err.message || "";
      let friendlyMsg = "Email atau password salah. Silakan coba lagi.";

      if (
        rawMsg.toLowerCase().includes("user not found") ||
        rawMsg.toLowerCase().includes("email tidak ditemukan")
      ) {
        friendlyMsg = "Email tidak ditemukan";
      } else if (
        rawMsg.toLowerCase().includes("wrong password") ||
        rawMsg.toLowerCase().includes("password salah")
      ) {
        friendlyMsg = "Password salah. Silakan coba lagi.";
      } else if (
        rawMsg.toLowerCase().includes("not verified") ||
        rawMsg.toLowerCase().includes("belum terverifikasi")
      ) {
        friendlyMsg =
          "Akun belum terverifikasi. Silakan verifikasi OTP terlebih dahulu.";
      } else if (
        typeof rawMsg === "string" &&
        !rawMsg.includes("status code") &&
        rawMsg.trim().length > 0
      ) {
        friendlyMsg = rawMsg;
      }

      toast.error(friendlyMsg);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("better-auth.session_token");
      }
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      queryClient.clear();
    },
  });
};

