import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getVariantsQueryKey } from "./get-variants";

const deleteVariant = async (id: number) => {
  const response = await api.delete(`/reference/variants/${id}`);
  return response.data;
};

type UseDeleteVariant = {
  mutationConfig?: MutationConfig<typeof deleteVariant>;
};

export const useDeleteVariant = ({ mutationConfig }: UseDeleteVariant = {}) => {
  return useMutation({
    mutationFn: deleteVariant,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getVariantsQueryKey() });
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
