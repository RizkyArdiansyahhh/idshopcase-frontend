import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { User } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const registerSchema = z.object({
  name: z.string({ message: "Name is required" }).min(8, {
    message: "Name must be at least 8 characters",
  }),
  email: z.email(),
  phone: z.string({ message: "Phone number is required" }).min(12, {
    message: "Phone number must be at least 12 characters",
  }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Must contain at least one number" }),
  confirmPassword: z.string({ message: "Confirm password is required" }),
});

type registerSchemaType = z.infer<typeof registerSchema>;

const register = async (data: registerSchemaType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...payload } = data;
  return await api.post("/register", { ...payload, role: "USER" });
};

type UseRegisterOptions = {
  mutationConfig?: MutationConfig<typeof register>;
};

export const useRegsiter = (params: UseRegisterOptions = {}) => {
  return useMutation({
    mutationFn: register,
    ...params.mutationConfig,
  });
};
