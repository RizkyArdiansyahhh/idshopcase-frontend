import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type verifyOtpRequest = {
  email: string;
  otp: string;
};
const verifyOtp = async (data: verifyOtpRequest) => {
  try {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("Kode OTP salah atau expired");
    }
    throw error;
  }
};

type useVerifyOtpParams = {
  mutationConfig?: MutationConfig<typeof verifyOtp>;
};

export const useVerifyOtp = ({ mutationConfig }: useVerifyOtpParams = {}) => {
  return useMutation({
    mutationFn: verifyOtp,
    ...mutationConfig,
    onError: (error) => {
      toast.error(error.message || "Terjadi Kesalahan");
      console.error(error);
    },
  });
};
