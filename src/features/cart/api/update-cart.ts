import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getCartsQueryKey } from "./get-carts";

type UpdateCartItemRequest = {
  id: number;
  quantity: number;
};
const updateCartItem = async ({ id, quantity }: UpdateCartItemRequest) => {
  const response = await api.put(`/cart/${id}`, { quantity });
  console.log(response.data);
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
      queryClient.invalidateQueries({ queryKey: getCartsQueryKey() });
      params.mutationOptions?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};
