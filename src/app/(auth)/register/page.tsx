"use client";
import { RegisterForm } from "@/features/auth/components/register-form";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
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

export default RegisterPage;
