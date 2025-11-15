import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUsersQueryKey } from "./get-users";

const deleteUser = async (id: number) => {
  return await api.delete(`/user/${id}`, {});
};

type UseDeleteUser = {
  mutationConfig?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({ mutationConfig }: UseDeleteUser = {}) => {
  return useMutation({
    mutationFn: deleteUser,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() });
      toast.success("User Berhasil Dihapus");
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: () => {
      toast.error("Gagal menghapus user");
    },
  });
};
