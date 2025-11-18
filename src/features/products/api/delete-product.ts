import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getProductsQueryKey } from "./get-ptoducts";
import { toast } from "sonner";

const deleteProduct = async (id: number) => {
  return await api.delete(`product/${id}`);
};

type UseDeleteProductParams = {
  mutationConfig?: MutationConfig<typeof deleteProduct>;
};

export const useDeleteProduct = ({
  mutationConfig,
}: UseDeleteProductParams = {}) => {
  return useMutation({
    mutationFn: deleteProduct,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getProductsQueryKey() });
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Gagal menghapus produk");
    },
  });
};
