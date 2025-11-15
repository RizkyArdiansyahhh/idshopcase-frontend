import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { User } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUsersQueryKey } from "./get-users";

type UpdateUserProps = {
  id: number;
  data: Omit<User, "id" | "profile_picture">;
};
const UpdateUser = async ({ id, data }: UpdateUserProps) => {
  return await api.put(`/user/${id}`, {
    ...data,
  });
};

type UseUpdateUser = {
  mutationConfig?: MutationConfig<typeof UpdateUser>;
};

export const useUpdateUser = ({ mutationConfig }: UseUpdateUser = {}) => {
  return useMutation({
    mutationFn: UpdateUser,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() });
      toast.success("User Berhasil Diperbarui");
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
