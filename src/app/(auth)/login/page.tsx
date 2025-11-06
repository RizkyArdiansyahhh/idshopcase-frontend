"use client";

import { LoginForm } from "../../../features/auth/components/login-form";
import { useRouter } from "next/navigation";

const LoginPage = () => {
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

export default LoginPage;
