"use client";
import { RegisterForm } from "@/features/auth/components/register-form";
import { useRouter } from "next/navigation";

export const Register = () => {
  const router = useRouter();
  const handleRegisterSuccess = (data: { email: string }) => {
    const params = new URLSearchParams({
      email: data.email,
    });

    router.push(`/verify?${params.toString()}`);
  };
  return (
    <>
      <RegisterForm onSuccess={handleRegisterSuccess}></RegisterForm>
    </>
  );
};
