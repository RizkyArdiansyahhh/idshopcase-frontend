import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getProductsQueryKey } from "./get-ptoducts";
import { toast } from "sonner";
import { apiUpload } from "@/lib/axios";

const createProduct = async (data: FormData) => {
  data.forEach((value, key) => {
    console.log(key, value);
  });

  return await apiUpload.post("/product", data);
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
      toast.error(err.message || "Gagal menambahkan produk");
    },
  });
};
