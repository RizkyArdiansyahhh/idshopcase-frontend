import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Address } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { getAddressesQueryKey } from "./get-address";
import { toast } from "sonner";
import { FormAddressSchemaType } from "../components/address";

type UpdateAddressRequest = {
  id: string | number;
  data: FormAddressSchemaType;
};
const updateAddress = async ({ id, data }: UpdateAddressRequest) => {
  return await api.put(`/user/addresses/${id}`, data);
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
      toast.success("Alamat berhasil diperbarui!");
      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
    onError: (err: any) => {
      const serverMessage = err?.response?.data?.message;
      toast.error(
        serverMessage || "Gagal memperbarui alamat. Silakan periksa kelengkapan data Anda."
      );
      console.error("[UpdateAddress Error]", err);
    },
  });
};
