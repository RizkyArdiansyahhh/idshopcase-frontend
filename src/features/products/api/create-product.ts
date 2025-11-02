import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { FormProductType } from "@/lib/schemas/product";
import { useMutation } from "@tanstack/react-query";
import { getProductsQueryKey } from "./get-ptoducts";
import { toast } from "sonner";
import { Product } from "@/types/api";

type CreateProductItemRequest = Omit<FormProductType, "toggleIsVariant">;

const createProduct = async (data: CreateProductItemRequest) => {
  return await api.post<Product>("/products", {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  });
};

type UseCreateProductParams = {
  mutationConfig?: MutationConfig<typeof createProduct>;
};

export const useCreateProduct = ({
  mutationConfig,
}: UseCreateProductParams = {}) => {
  return useMutation({
    mutationFn: createProduct,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getProductsQueryKey() });
      toast.success("Produk berhasil ditambahkan");
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
