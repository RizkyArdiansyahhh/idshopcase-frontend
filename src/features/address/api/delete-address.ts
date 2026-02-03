import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAddressesQueryKey } from "./get-address";

const deleteAddress = (id: number) => {
  return api.delete(`/user/addresses/${id}`);
};

type UseDeleteAddress = {
  mutationConfig?: MutationConfig<typeof deleteAddress>;
};

export const useDeleteAddress = ({ mutationConfig }: UseDeleteAddress = {}) => {
  return useMutation({
    mutationFn: deleteAddress,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getAddressesQueryKey() });
      toast.success("Alamat berhasil dihapus");
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      toast.error("Gagal menghapus alamat");
      console.error(err);
    },
  });
};
