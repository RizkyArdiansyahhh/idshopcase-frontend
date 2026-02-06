"use client";

import { useGetUser } from "@/features/auth/api/get-user";
import { LoginForm } from "@/features/auth/components/login-form";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();

  // ⬅️ AMBIL refetch, BUKAN data
  const { refetch } = useGetUser({
    queryConfig: {
      enabled: false,
    },
  });

  return (
    <LoginForm
      onSuccess={async () => {
        const result = await refetch();
        const user = result.data;

        if (user?.role === "admin") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/");
        }
      }}
    />
  );
};
