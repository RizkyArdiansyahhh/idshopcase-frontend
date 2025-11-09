import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "@/components/ui/form";
import { registerSchema, useRegsiter } from "../api/register";
import { SpinnerV2 } from "@/components/ui/spinner";
import { UserForm } from "@/components/shared/user-form";

type RegisterFormProps = {
  onSuccess: (data: { email: string }) => void;
};
export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { mutate: register, isPending: regsiterIsLoading } = useRegsiter({
    mutationConfig: {
      onSuccess: (data) => {
        form.reset();
        const email = data.email;
        if (email) {
          onSuccess({ email });
        }
      },
    },
  });

  type registerSchemaType = z.infer<typeof registerSchema>;
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit((values) => {
            console.log(values);
            register(values);
          })}
        >
          <UserForm
            form={form}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
            isConfirmPasswordVisible={isConfirmPasswordVisible}
            setIsConfirmPasswordVisible={setIsConfirmPasswordVisible}
          ></UserForm>

          <Button
            type="submit"
            className="font-bold"
            disabled={regsiterIsLoading}
          >
            {regsiterIsLoading ? (
              <SpinnerV2 className="text-background size-6" />
            ) : (
              "Daftar"
            )}
          </Button>
          <div className="flex flex-col items-center md:flex-row justify-center gap-1 flex-wrap">
            <p className="text-md">Kamu sudah punya akun?</p>
            <Link
              href="/login"
              className="text-primary text-md underline font-bold"
            >
              Masuk
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};
