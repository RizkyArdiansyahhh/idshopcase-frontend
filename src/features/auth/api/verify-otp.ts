import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUserQueryKey } from "./get-user";

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
      throw new Error(error.response?.data?.message || "Kode OTP salah atau expired");
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
    onSuccess: (data, variables, onMutateResult, context) => {
      if (data?.token && typeof window !== "undefined") {
        localStorage.setItem("better-auth.session_token", data.token);
        const isSecure = window.location.protocol === "https:";
        document.cookie = `better-auth.session_token=${data.token}; path=/; max-age=604800; SameSite=Lax${isSecure ? "; Secure" : ""}`;
      }
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error) => {
      toast.error(error.message || "Terjadi Kesalahan");
      console.error(error);
    },
  });
};
