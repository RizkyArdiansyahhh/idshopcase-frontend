import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

type ForgotPasswordItemRequest = {
  email: string;
};

const forgotPassword = async (data: ForgotPasswordItemRequest) => {
  return api.post("/auth/forgot-password", data);
};

type UseForgotPasswordParams = {
  mutationConfig?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({
  mutationConfig,
}: UseForgotPasswordParams = {}) => {
  return useMutation({
    mutationFn: forgotPassword,
    ...mutationConfig,
  });
};
