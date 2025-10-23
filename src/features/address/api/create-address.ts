import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Address } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { getAddressesQueryKey } from "./get-address";
import { toast } from "sonner";
import { FormAddressSchemaType } from "../components/address";

const createAddress = async (data: FormAddressSchemaType) => {
  return await api.post("/addresses", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

type UseCreateAddressParams = {
  mutationConfig?: MutationConfig<typeof createAddress>;
};

export const useCreateAddress = (params: UseCreateAddressParams = {}) => {
  return useMutation({
    mutationFn: createAddress,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getAddressesQueryKey() });
      toast.success("Address created");
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
