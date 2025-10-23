import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Address } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { getAddressesQueryKey } from "./get-address";
import { toast } from "sonner";
import { FormAddressSchemaType } from "../components/address";

type UpdateAddressRequest = {
  id: number;
  data: FormAddressSchemaType;
};
const updateAddress = async ({ id, data }: UpdateAddressRequest) => {
  return await api.patch(`/addresses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

type UseUpdateAddressParams = {
  mutationConfig?: MutationConfig<typeof updateAddress>;
};

export const UseUpdateAddress = (params: UseUpdateAddressParams = {}) => {
  return useMutation({
    mutationFn: updateAddress,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getAddressesQueryKey() });
      toast.success("Address updated");
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
