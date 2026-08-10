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
  const res = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });

  if (res.error) {
    throw new Error(res.error.message || "Email atau password salah");
  }

  return res.data;
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
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
    onError: (err: Error, ...args) => {
      toast.error(err.message || "Email atau password salah");
      params.mutationConfig?.onError?.(err, ...args);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      queryClient.clear();
    },
  });
};

