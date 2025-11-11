import { api } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { getUserQueryKey } from "./get-user";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 8 characters" }),
  // .regex(/[A-Z]/, {
  //   message: "Must contain at least one uppercase letter",
  // })
  // .regex(/[a-z]/, {
  //   message: "Must contain at least one lowercase letter",
  // })
  // .regex(/\d/, { message: "Must contain at least one number" }),
});

type loginSchemaType = z.infer<typeof loginSchema>;

const loginWithEmailAndPassword = async (data: loginSchemaType) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

type useLoginPrams = {
  mutationConfig?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLogin = (params: useLoginPrams = {}) => {
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    ...params.mutationConfig,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    onSuccess: (data, variables, onMutateResult, context) => {
      // localStorage.setItem("id", String(data.user.id));
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(getUserQueryKey(), data.user);
      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};


