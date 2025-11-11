import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { loginSchema, useLogin } from "../api/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SpinnerV2 } from "@/components/ui/spinner";
import { toast } from "sonner";

type LoginFormProps = {
  onSuccess: () => void;
};
export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate: login, isPending: loginIsLoading } = useLogin({
    mutationConfig: {
      onSuccess: onSuccess,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        if (err.response?.data) {
          toast.error(err.response?.data);
        }
        toast.error("Terjadi Kesalahan");
      },
    },
  });

  type loginSchemaType = z.infer<typeof loginSchema>;
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit((values) => {
            console.log(values);
            login(values);
          })}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...field}
                    value={field.value || ""}
                  ></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        className="pr-10"
                        {...field}
                        value={field.value || ""}
                      ></Input>
                      <div
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer "
                      >
                        {isPasswordVisible ? (
                          <Eye className="text-ring" />
                        ) : (
                          <EyeClosed className="text-ring" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <Link
              href="/auth/forgot-password"
              className="text-xs font-semibold hover:underline text-primary transition-all duration-200 ease-in-out"
            >
              Lupa Password?
            </Link>
          </div>

          <Button type="submit" className="font-bold" disabled={loginIsLoading}>
            {loginIsLoading ? (
              <SpinnerV2 className="text-background size-6" />
            ) : (
              "Masuk"
            )}
          </Button>
          <div className="flex flex-col items-center md:flex-row justify-center gap-1 flex-wrap">
            <p className="text-md">Kamu belum memiliki akun?</p>
            <Link
              href="/register"
              className="text-primary text-md underline font-bold"
            >
              Daftar
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};
