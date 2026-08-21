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
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import z from "zod";
import { useUpdatePassword } from "../api/update-password";
import { SpinnerV2 } from "@/components/ui/spinner";

export const FormUpdatePassword = () => {
  const t = useTranslations("account.password");
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const formUpdatePasswordSchema = z.object({
    oldPassword: z.string().nonempty(),
    newPassword: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/\d/),
  });

  type FormUpdatePasswordType = z.infer<typeof formUpdatePasswordSchema>;

  const form = useForm<FormUpdatePasswordType>({
    resolver: zodResolver(formUpdatePasswordSchema),
    mode: "onChange",
  });

  const passwordRules = [
    {
      label: t("rules.min8"),
      valid: (pw: string) => (pw?.length || 0) >= 8,
    },
    {
      label: t("rules.uppercase"),
      valid: (pw: string) => /[A-Z]/.test(pw || ""),
    },
    {
      label: t("rules.lowercase"),
      valid: (pw: string) => /[a-z]/.test(pw || ""),
    },
    {
      label: t("rules.number"),
      valid: (pw: string) => /\d/.test(pw || ""),
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

  const onSubmit = (data: FormUpdatePasswordType) => {
    updatePassword(data);
  };

  const newPasswordValue = form.watch("newPassword") || "";

  return (
    <div className="w-full space-y-6 font-sans text-neutral-900 select-none">
      {/* Form Container */}
      <div className="p-5 sm:p-7 rounded-2xl border border-neutral-200 bg-white shadow-2xs space-y-6">
        <div className="space-y-1 pb-4 border-b border-neutral-100">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            {t("title")}
          </h2>
          <p className="text-xs text-neutral-500 font-normal">
            {t("subtitle")}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              {/* Old Password */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold text-neutral-700">
                      {t("oldPassword")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isOldPasswordVisible ? "text" : "password"}
                          placeholder={t("oldPasswordPlaceholder")}
                          className="h-10 text-xs sm:text-sm rounded-xl border-neutral-300 focus-visible:ring-0 focus-visible:border-black pr-10 bg-white"
                          {...field}
                          value={field.value || ""}
                        />
                        <button
                          type="button"
                          onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                        >
                          {isOldPasswordVisible ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold text-neutral-700">
                      {t("newPassword")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isNewPasswordVisible ? "text" : "password"}
                          placeholder={t("newPasswordPlaceholder")}
                          className="h-10 text-xs sm:text-sm rounded-xl border-neutral-300 focus-visible:ring-0 focus-visible:border-black pr-10 bg-white"
                          {...field}
                          value={field.value || ""}
                        />
                        <button
                          type="button"
                          onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                        >
                          {isNewPasswordVisible ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password Validation Checklist */}
            <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                {t("rules.title")}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {passwordRules.map((rule, idx) => {
                  const isValid = rule.valid(newPasswordValue);
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-all shrink-0 ${
                          isValid
                            ? "bg-black text-white"
                            : "bg-neutral-200 text-neutral-400"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span
                        className={
                          isValid
                            ? "text-neutral-900 font-semibold"
                            : "text-neutral-400 font-normal"
                        }
                      >
                        {rule.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={updatePasswordIsLoading}
                className="px-6 h-10 font-bold text-xs bg-black hover:bg-neutral-800 text-white rounded-full transition-all cursor-pointer"
              >
                {updatePasswordIsLoading ? (
                  <SpinnerV2 className="size-4 text-white" />
                ) : (
                  t("updateButton")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Security Tip Note */}
      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-neutral-500 text-[11px] leading-relaxed">
        <strong className="text-neutral-800">{t("tips.title")}: </strong>
        {t("tips.description")}
      </div>
    </div>
  );
};
