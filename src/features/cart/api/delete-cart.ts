import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getCartsQueryKey } from "./get-carts";
import { toast } from "sonner";

type DeleteCartItemRequest = {
  cartId: number;
};
const deleteCartItem = async ({ cartId }: DeleteCartItemRequest) => {
  return api.delete(`/cart/${cartId}`);
};

type UseDeleteCartItemParams = {
  mutationConfig?: MutationConfig<typeof deleteCartItem>;
};

export const useDeleteCartItem = (params: UseDeleteCartItemParams = {}) => {
  return useMutation({
    mutationFn: deleteCartItem,
    ...params.mutationConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCartsQueryKey() });
      toast.success("Item berhasil dihapus");
    },
  });
};
