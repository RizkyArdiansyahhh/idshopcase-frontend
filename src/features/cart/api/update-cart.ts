import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getCartItemsQueryKey } from "./get-cart-items";

type UpdateCartItemRequest = {
  id: number;
  quantity: number;
};
const updateCartItem = async ({ id, quantity }: UpdateCartItemRequest) => {
  const response = await api.patch(
    `/cartItems/${id}`,
    {
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

type UseUpdateCartItemParams = {
  mutationOptions?: MutationConfig<typeof updateCartItem>;
};

export const useUpdateCartItem = (params: UseUpdateCartItemParams = {}) => {
  return useMutation({
    mutationFn: updateCartItem,
    ...params.mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getCartItemsQueryKey() });
      params.mutationOptions?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};
