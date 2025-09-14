"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // const loginSchema = z.object({
  //   email: z.email(),
  //   password: z
  //     .string({ message: "Password is required" })
  //     .min(8, { message: "Password must be at least 8 characters" })
  //     .regex(/[A-Z]/, {
  //       message: "Must contain at least one uppercase letter",
  //     })
  //     .regex(/[a-z]/, {
  //       message: "Must contain at least one lowercase letter",
  //     }),
  // });

  // type loginSchemaType = z.infer<typeof loginSchema>;
  // const form = useForm<loginSchemaType>({
  //   resolver: zodResolver(loginSchema),
  // });

  // const handleLogin = (data: loginSchemaType) => {
  //   console.log(data);
  // };

  return (
    <>
      <form
        action="#"
        className="flex flex-col gap-5 mt-5"
        // onSubmit={form.handleSubmit(handleLogin)}
      >
        <div>
          <Label htmlFor="username">Name</Label>
          <Input type="text" id="username" placeholder="Username"></Input>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email"></Input>
          {/* <ErrorMessageInput message={form.formState.errors.email?.message} /> */}
        </div>
        <div>
          <Label htmlFor="phone">No Handphone</Label>
          <Input type="text" id="phone" placeholder="Phone"></Input>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="pr-10"
            ></Input>

            {/* <ErrorMessageInput
              message={form.formState.errors.password?.message}
            /> */}
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
        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative w-full">
            <Input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm Password"
              className="pr-10"
            ></Input>

            {/* <ErrorMessageInput
              message={form.formState.errors.password?.message}
            /> */}
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
        </div>
        <Button className="font-bold">Daftar</Button>
        <div className="flex justify-center gap-1">
          <p>Kamu sudah punya akun?</p>
          <Link href="/login" className="text-primary font-bold">
            Masuk
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
