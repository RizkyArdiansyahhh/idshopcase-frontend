import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Material } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { getMaterialsQueryKey } from "./get-materials";

type CreateMaterialItemRequest = Omit<Material, "id">;

const createMaterial = async (data: CreateMaterialItemRequest) => {
  const response = await api.post("/reference/materials", data);
  return response.data;
};

type UseCreateMaterial = {
  mutationConfig?: MutationConfig<typeof createMaterial>;
};

export const useCreateMaterial = ({
  mutationConfig,
}: UseCreateMaterial = {}) => {
  return useMutation({
    mutationFn: createMaterial,
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
