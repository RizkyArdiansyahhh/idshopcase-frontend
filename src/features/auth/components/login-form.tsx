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

type LoginFormProps = {
  onSuccess: () => void;
};
export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate: login, isPending: loginIsLoading } = useLogin({
    mutationConfig: {
      onSuccess: onSuccess,
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
          onSubmit={form.handleSubmit((values) => login(values))}
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
          <Button type="submit" className="font-bold">
            Masuk
          </Button>
          <div className="flex justify-center gap-1">
            <p>Kamu belum memiliki akun?</p>
            <Link href="/register" className="text-primary font-bold">
              Daftar
            </Link>
          </div>
        </form>
      </Form>
      {/* <form
        action="#"
        className="flex flex-col gap-5 mt-7"
        onSubmit={form.handleSubmit(handleLogin)}
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            {...form.register("email")}
          ></Input>
          <ErrorMessageInput message={form.formState.errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="pr-10"
              {...form.register("password")}
            ></Input>

            <ErrorMessageInput
              message={form.formState.errors.password?.message}
            />
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
        </div>
        <Button className="font-bold" onClick={() => push("/")}>
          Masuk
        </Button>
        <div className="flex justify-center gap-1">
          <p>Kamu belum memiliki akun?</p>
          <Link href="/register" className="text-primary font-bold">
            Daftar
          </Link>
        </div>
      </form> */}
    </>
  );
};
