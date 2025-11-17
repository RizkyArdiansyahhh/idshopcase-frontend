import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { PhoneType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { getPhoneTypesQueryKey } from "./get-phone-types";

type CreatePhoneTypeItemRequest = Omit<PhoneType, "id">;

const createPhoneType = async (data: CreatePhoneTypeItemRequest) => {
  const response = await api.post("/reference/phone-types", data);
  return response.data;
};

type UseCreatePhoneType = {
  mutationConfig?: MutationConfig<typeof createPhoneType>;
};

export const useCreatePhoneType = ({
  mutationConfig,
}: UseCreatePhoneType = {}) => {
  return useMutation({
    mutationFn: createPhoneType,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getPhoneTypesQueryKey() });
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
