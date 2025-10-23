import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getCartItemsQueryKey } from "./get-cart-items";
import { getCartsQueryKey } from "./get-carts";

const deleteCartItem = async (id: number) => {
  return api.delete(`/cartItems/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

type UseDeleteCartItemParams = {
  mutationConfig?: MutationConfig<typeof deleteCartItem>;
};

export const useDeleteCartItem = (params: UseDeleteCartItemParams = {}) => {
  return useMutation({
    mutationFn: deleteCartItem,
    ...params.mutationConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCartItemsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getCartsQueryKey() });
    },
  });
};
