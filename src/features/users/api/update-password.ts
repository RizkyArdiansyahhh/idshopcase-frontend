import { getUserQueryKey } from "@/features/auth/api/get-user";
import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

const updatePassword = async (data: UpdatePassword) => {
  const response = await api.put("/user/profile/password", data);
  return response.data;
};

type UseUpdatePassword = {
  mutationConfig?: MutationConfig<typeof updatePassword>;
};

export const useUpdatePassword = ({
  mutationConfig,
}: UseUpdatePassword = {}) => {
  return useMutation({
    mutationFn: updatePassword,
    ...mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getUserQueryKey() });
      toast.success("Password Berhasil Diperbarui");
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      toast.error("Gagal memperbarui password");
      console.error(err);
    },
  });
};
