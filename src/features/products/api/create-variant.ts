import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getVariantsQueryKey } from "./get-variants";
import { Variant } from "@/types/api";
import { toast } from "sonner";

type CreateVariantItemRequest = Omit<Variant, "id" | "createdAt" | "updatedAt">;

const createVariant = async (data: CreateVariantItemRequest) => {
  const response = await api.post("/reference/variants", data);
  return response.data;
};

type UseCreateVariant = {
  mutationConfig?: MutationConfig<typeof createVariant>;
};

export const useCreateVariant = ({ mutationConfig }: UseCreateVariant = {}) => {
  return useMutation({
    mutationFn: createVariant,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getVariantsQueryKey() });
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
      toast.success("Variant berhasil ditambahkan");
    },
    onError: (err) => {
      toast.error("Gagal menambahkan variant");
      console.error(err);
    },
  });
};
