import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type ResendOtpRequest = {
  email: string;
};

const resendOtp = async (data: ResendOtpRequest) => {
  const response = await api.post("/auth/resend-otp", data);
  return response.data;
};

type UseResendOtpParams = {
  mutationConfig?: MutationConfig<typeof resendOtp>;
};

export const useResendOtp = ({ mutationConfig }: UseResendOtpParams = {}) => {
  return useMutation({
    mutationFn: resendOtp,
    ...mutationConfig,
    onError: (error: any, variables, onMutateResult, context) => {
      const msg = error.response?.data?.message || error.message || "Gagal mengirim ulang OTP";
      toast.error(msg);
      mutationConfig?.onError?.(error, variables, onMutateResult, context);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      toast.success(data.message || "Kode OTP berhasil dikirim ulang");
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
};
