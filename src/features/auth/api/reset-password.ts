import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type ResetPasswordPayload = {
  token: string;
  password: string;
};

const resetPassword = async ({ token, password }: ResetPasswordPayload) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};

type useResetPasswordParams = {
  mutationConfig?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = (params: useResetPasswordParams = {}) => {
  return useMutation({
    mutationFn: resetPassword,
    ...params?.mutationConfig,
    onError: (err) => {
      toast.error("Gagal memperbarui password");
      console.error(err);
    },
  });
};
