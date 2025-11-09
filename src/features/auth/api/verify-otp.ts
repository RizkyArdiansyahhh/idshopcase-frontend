import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type verifyOtpRequest = {
  email: string;
  otp: string;
};
const verifyOtp = async (data: verifyOtpRequest) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;
};

type useVerifyOtpParams = {
  mutationConfig?: MutationConfig<typeof verifyOtp>;
};

export const useVerifyOtp = ({ mutationConfig }: useVerifyOtpParams = {}) => {
  return useMutation({
    mutationFn: verifyOtp,
    ...mutationConfig,
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
