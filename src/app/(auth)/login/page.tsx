"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginSchema = z.object({
    email: z.email(),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Must contain at least one lowercase letter",
      }),
  });

  type loginSchemaType = z.infer<typeof loginSchema>;
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: loginSchemaType) => {
    console.log(data);
  };

  return (
    <>
      <form
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
        <Button className="font-bold">Masuk</Button>
        <div className="flex justify-center gap-1">
          <p>Kamu belum memiliki akun?</p>
          <Link href="/register" className="text-primary font-bold">
            Daftar
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
