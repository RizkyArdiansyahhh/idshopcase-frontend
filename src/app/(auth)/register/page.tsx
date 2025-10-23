"use client";
import { RegisterForm } from "@/features/auth/components/register-form";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  return (
    <>
      <RegisterForm
        onSuccess={() => {
          router.replace("/login");
        }}
      ></RegisterForm>
    </>
  );
};

export default RegisterPage;
