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
import {
  CheckCircle,
  CircleCheck,
  CircleX,
  Eye,
  EyeClosed,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { is } from "zod/v4/locales";
import { useUpdatePassword } from "../api/update-password";
import { SpinnerV2 } from "@/components/ui/spinner";

export const FormUpdatePassword = () => {
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const formUpdatePasswordSchema = z.object({
    oldPassword: z.string({ message: "Old password is required" }),
    newPassword: z
      .string({ message: "New password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Must contain at least one lowercase letter",
      })
      .regex(/\d/, { message: "Must contain at least one number" }),
  });

  type FormUpdatePasswordType = z.infer<typeof formUpdatePasswordSchema>;

  const form = useForm<FormUpdatePasswordType>({
    resolver: zodResolver(formUpdatePasswordSchema),
    mode: "onChange",
  });

  const passwordRules = [
    {
      label: "Minimal 8 karakter",
      valid: (pw: string) => pw.length >= 8,
    },
    {
      label: "Harus ada huruf besar",
      valid: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "Harus ada huruf kecil",
      valid: (pw: string) => /[a-z]/.test(pw),
    },
    {
      label: "Harus ada angka",
      valid: (pw: string) => /\d/.test(pw),
    },
  ];

  const { mutate: updatePassword, isPending: updatePasswordIsLoading } =
    useUpdatePassword({
      mutationConfig: {
        onSuccess: () => {
          form.reset();
        },
      },
    });

  const handleUpdatePassword = (data: FormUpdatePasswordType) => {
    updatePassword(data);
  };
  return (
    <>
      <div className="w-1/2 h-fit">
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(handleUpdatePassword)}
          >
            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Lama</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={isOldPasswordVisible ? "text" : "password"}
                        placeholder="Password Lama"
                        value={field.value || ""}
                      />
                      <div
                        onClick={() =>
                          setIsOldPasswordVisible(!isOldPasswordVisible)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer "
                      >
                        {isOldPasswordVisible ? (
                          <EyeClosed className="text-ring" />
                        ) : (
                          <Eye className="text-ring" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={isNewPasswordVisible ? "text" : "password"}
                        placeholder="Password Baru"
                        value={field.value || ""}
                      />
                      <div
                        onClick={() =>
                          setIsNewPasswordVisible(!isNewPasswordVisible)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer "
                      >
                        {isNewPasswordVisible ? (
                          <EyeClosed className="text-ring" />
                        ) : (
                          <Eye className="text-ring" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <ul className="mt-2 text-sm">
                    {passwordRules.map((rule) => {
                      const isValid = rule.valid(field.value || "");
                      return (
                        <li
                          key={rule.label}
                          className="flex items-center gap-1"
                        >
                          {isValid ? (
                            <CircleCheck className="text-green-600 w-4 h-4" />
                          ) : (
                            <XCircle className="text-foreground/40 w-4 h-4" />
                          )}
                          <span
                            className={
                              isValid ? "text-green-600" : "text-foreground/40"
                            }
                          >
                            {rule.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-5">
              <Button variant={"outline"} onClick={() => form.reset()}>
                Batal
              </Button>
              <Button
                type="submit"
                disabled={updatePasswordIsLoading || !form.formState.isValid}
              >
                {updatePasswordIsLoading ? (
                  <SpinnerV2 className="mr-2" />
                ) : (
                  "Simpan Perubahan"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
