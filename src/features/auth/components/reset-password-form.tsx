"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { SpinnerV2 } from "@/components/ui/spinner";
import { MdLockOutline } from "react-icons/md";
import { useResetPassword } from "../api/reset-password";
import { CircleCheck, XCircle } from "lucide-react";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Minimal 8 karakter")
      .regex(/[A-Z]/, "Harus mengandung huruf besar")
      .regex(/[a-z]/, "Harus mengandung huruf kecil")
      .regex(/[0-9]/, "Harus mengandung angka"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

type ResetPasswordFormProps = {
  token: string;
  onSuccess?: () => void;
};

export const ResetPasswordForm = ({
  token,
  onSuccess,
}: ResetPasswordFormProps) => {
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const { mutate: resetPassword, isPending } = useResetPassword({
    mutationConfig: { onSuccess },
  });

  const handleSubmit = (data: ResetPasswordFormType) => {
    resetPassword({
      token,
      password: data.password,
    });
  };

  const passwordValue = form.watch("password") || "";
  const passwordRules = [
    { label: "Minimal 8 karakter", valid: passwordValue.length >= 8 },
    { label: "Mengandung huruf besar", valid: /[A-Z]/.test(passwordValue) },
    { label: "Mengandung huruf kecil", valid: /[a-z]/.test(passwordValue) },
    { label: "Mengandung angka", valid: /\d/.test(passwordValue) },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Baru</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukkan password baru"
                    className="pl-10"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <MdLockOutline
                  size={22}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-foreground/50"
                />
              </div>
            </FormItem>
          )}
        />

        <ul className="text-sm space-y-1 mt-2">
          {passwordRules.map((rule) => (
            <li key={rule.label} className="flex items-center gap-2">
              {rule.valid ? (
                <CircleCheck className="text-green-600 w-4 h-4" />
              ) : (
                <XCircle className="text-muted-foreground w-4 h-4" />
              )}
              <span
                className={
                  rule.valid ? "text-green-600" : "text-muted-foreground"
                }
              >
                {rule.label}
              </span>
            </li>
          ))}
        </ul>

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ulangi password baru"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-5"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? <SpinnerV2 /> : "Simpan Password"}
        </Button>
      </form>
    </Form>
  );
};
