import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getAddressesQueryKey } from "./get-address";
import { toast } from "sonner";
import { Address } from "@/types/api";

type CreateAddressItemRequest = Omit<
  Address,
  "id" | "province_id" | "city_id" | "district_id" | "sub_district_id"
>;

const createAddress = async (data: CreateAddressItemRequest) => {
  return await api.post("/user/addresses", data);
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
        context,
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.details?.[0] ||
        "Gagal menambahkan alamat";
      toast.error(errorMsg);
      console.error(err);
    },
  });
};
