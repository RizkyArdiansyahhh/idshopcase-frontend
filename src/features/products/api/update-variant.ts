import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Variant } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getVariantsQueryKey } from "./get-variants";

type UpdateVariantItemRequest = Omit<Variant, "id" | "createdAt" | "updatedAt">;

const updateVariant = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateVariantItemRequest;
}) => {
  const response = await api.put(`/reference/variants/${id}`, data);
  return response.data;
};

type UseUpdateVariant = {
  mutationConfig?: MutationConfig<typeof updateVariant>;
};

export const useUpdateVariant = ({ mutationConfig }: UseUpdateVariant = {}) => {
  return useMutation({
    mutationFn: updateVariant,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getVariantsQueryKey() });
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
      toast.success("Variant berhasil diperbarui");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Gagal memperbarui variant");
    },
  });
};
