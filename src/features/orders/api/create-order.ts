import { api, apiUpload } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { CheckoutData } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const createOrder = async (data: FormData) => {
  data.forEach((value, key) => {
    console.log(key, value);
  });
  const response = await apiUpload.post("/order", data);
  return response.data.checkout.response.payment.url;
};

type UseCreateOrder = {
  mutationConfig?: MutationConfig<typeof createOrder>;
};

export const useCreateOrder = ({ mutationConfig }: UseCreateOrder = {}) => {
  return useMutation({
    mutationFn: createOrder,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Gagal membuat order, silahkan coba lagi");
    },
  });
};
