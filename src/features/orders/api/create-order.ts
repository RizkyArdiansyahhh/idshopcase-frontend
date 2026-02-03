import { apiUpload } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getOrdersAdminQueryKey } from "./get-orders-admin";
import { getOrdersQueryKey } from "./get-orders";
import { getCartsQueryKey } from "@/features/cart/api/get-carts";

const createOrder = async (data: FormData) => {
  data.forEach((value, key) => {
    console.log(key, value);
  });
  const response = await apiUpload.post("/order", data);
  return response.data;
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
      queryClient.invalidateQueries({ queryKey: getOrdersAdminQueryKey() });
      queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
      queryClient.invalidateQueries({ queryKey: getCartsQueryKey() });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Gagal membuat order, silahkan coba lagi");
    },
  });
};
