import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema, useRegsiter } from "../api/register";
import { SpinnerV2 } from "@/components/ui/spinner";

type RegisterFormProps = {
  onSuccess: () => void;
};
export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { mutate: register, isPending: regsiterIsLoading } = useRegsiter({
    mutationConfig: {
      onSuccess: onSuccess,
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Username"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No Handphone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="phone"
                    placeholder="+62 XXX"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="pr-10"
                      {...field}
                      value={field.value || ""}
                    ></Input>
                    <div
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer "
                    >
                      {isConfirmPasswordVisible ? (
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
