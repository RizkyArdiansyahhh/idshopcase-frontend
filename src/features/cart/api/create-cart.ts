import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getCartsQueryKey } from "./get-carts";

type CartItemRequest = {
  productId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customImageId?: any;
  quantity: number;
  phoneTypeId: number | null;
  variantId: number | null;
};

const createCart = async (data: CartItemRequest) => {
  const response = await api.post("/cart", data);
  console.log(response.data);
  return response.data;
};

type UseCreateCart = {
  mutationConfig?: MutationConfig<typeof createCart>;
};

import { toast } from "sonner";

export const useCreateCart = ({ mutationConfig }: UseCreateCart = {}) => {
  return useMutation({
    mutationFn: createCart,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getCartsQueryKey() });
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err: any, ...args) => {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Gagal menambahkan produk ke keranjang";
      if (!mutationConfig?.onError) {
        toast.error(msg);
      }
      mutationConfig?.onError?.(err, ...args);
    },
  });
};
