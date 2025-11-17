import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getPhoneTypesQueryKey } from "./get-phone-types";

const deletePhoneType = (id: number) => {
  return api.delete(`/reference/phone-type/${id}`);
};

type UseDeletePhoneType = {
  mutationConfig?: MutationConfig<typeof deletePhoneType>;
};

export const useDeletePhoneType = ({
  mutationConfig,
}: UseDeletePhoneType = {}) => {
  return useMutation({
    mutationFn: deletePhoneType,
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
