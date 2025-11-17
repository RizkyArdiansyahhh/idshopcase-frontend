import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { User } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUsersQueryKey } from "./get-users";

type CreateUserItemRequest = {
  data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
};
const createUser = async ({ data }: CreateUserItemRequest) => {
  console.log(data);
  return await api.post("/user/create", {
    ...data,
  });
};

type UseCreateUser = {
  mutatationConfig?: MutationConfig<typeof createUser>;
};

export const useCreateUser = ({ mutatationConfig }: UseCreateUser = {}) => {
  return useMutation({
    mutationFn: createUser,
    ...mutatationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() });
      toast.success("User Berhasil Ditambahkan");
      mutatationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
