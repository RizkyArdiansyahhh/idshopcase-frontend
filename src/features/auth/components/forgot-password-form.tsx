"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { MdOutlineMailOutline } from "react-icons/md";
import { useForgotPassword } from "../api/forgot-password";
import { SpinnerV2 } from "@/components/ui/spinner";
type ForgotPasswordProps = {
  onSuccess?: () => void;
};

export const ForgotPasswordForm = (props: ForgotPasswordProps) => {
  const { onSuccess } = props;
  const forgotPasswordFormSchema = z.object({
    email: z.email().nonempty("Email is required"),
  });

  type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const { mutate: forgotPassword, isPending: forgotPasswordIsLoading } =
    useForgotPassword({
      mutationConfig: {
        onSuccess: onSuccess,
      },
    });
  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(() => {
            forgotPassword({
              email: form.getValues("email"),
            });
          })}
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Anda"
                      className="pl-10"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <MdOutlineMailOutline
                    size={24}
                    className="absolute top-1/2 left-3  -translate-y-1/2 text-foreground/50"
                  />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-5"
            disabled={forgotPasswordIsLoading}
          >
            {forgotPasswordIsLoading ? (
              <SpinnerV2></SpinnerV2>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
