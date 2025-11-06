"use client";
import { RegisterForm } from "@/features/auth/components/register-form";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const params = new URLSearchParams({
    email: "rizky.ardiansyahhh06@gmail.com",
  });

  const url = `/register/verify?${params.toString()}`;
  return (
    <>
      <RegisterForm
        onSuccess={() => {
          router.replace(url);
        }}
      ></RegisterForm>
    </>
  );
};

export default RegisterPage;
