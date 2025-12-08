"use client";

import { LoginForm } from "@/features/auth/components/login-form";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  return (
    <>
      <LoginForm
        onSuccess={() => {
          router.replace("/");
        }}
      />
    </>
  );
};
