import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getMaterialsQueryKey } from "./get-materials";

const deleteMaterial = async (id: number) => {
  return await api.delete(`/reference/materials/${id}`);
};

type UseDeleteMaterial = {
  mutationConfig?: MutationConfig<typeof deleteMaterial>;
};

export const useDeleteMaterial = ({
  mutationConfig,
}: UseDeleteMaterial = {}) => {
  return useMutation({
    mutationFn: deleteMaterial,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getMaterialsQueryKey() });
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
