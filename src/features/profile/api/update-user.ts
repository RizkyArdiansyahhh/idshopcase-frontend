import { getUserQueryKey } from "@/features/auth/api/get-user";
import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const updateUser = async (variables: { id: number; data: FormData }) => {
  const { id, data } = variables;

  const response = await api.patch(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

type UseUpdateUserParams = {
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = (params: UseUpdateUserParams = {}) => {
  return useMutation({
    mutationFn: updateUser,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.setQueryData(getUserQueryKey(), data.user);
      toast.success("User updated");
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
