import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { User } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUsersQueryKey } from "./get-users";

type UpdateUserProps = {
  id: number;
  data: Omit<User, "id" | "profile_picture" | "createdAt" | "updatedAt">;
};
const UpdateUser = async ({ id, data }: UpdateUserProps) => {
  return await api.patch(`/users/${id}`, {
    ...data,
    updatedAt: new Date().toISOString(),
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
