import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { FormProductType } from "@/lib/schemas/product";
import { Product } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { getProductsQueryKey } from "./get-ptoducts";
import { toast } from "sonner";

type UpdateProductItemRequest = {
  id: number;
  data: Omit<FormProductType, "toggleIsVariant">;
};

const UpdateProduct = async ({ id, data }: UpdateProductItemRequest) => {
  return await api.patch<Product>(`/products/${id}`, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
};

type UseUpdateProductParams = {
  mutationConfig?: MutationConfig<typeof UpdateProduct>;
};

export const useUpdateProduct = (params: UseUpdateProductParams = {}) => {
  return useMutation({
    mutationFn: UpdateProduct,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getProductsQueryKey() });
      toast.success("Produk berhasil diperbarui");
      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
