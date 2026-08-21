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
    if (error.response?.status === 429) {
      throw new Error("Terlalu banyak percobaan. Harap tunggu beberapa saat.");
    }
    if (error.response?.status === 400 || error.response?.status === 401) {
      throw new Error(error.response?.data?.message || "Kode OTP salah atau telah kedaluwarsa.");
    }
    throw new Error(error.response?.data?.message || "Kode OTP tidak valid.");
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
    onError: (error, variables, onMutateResult, context) => {
      mutationConfig?.onError?.(error, variables, onMutateResult, context);
    },
  });
};
