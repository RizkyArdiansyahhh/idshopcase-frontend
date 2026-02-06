"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetUser } from "@/features/auth/api/get-user";

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: user, isLoading } = useGetUser();

  useEffect(() => {
    if (isLoading) return;

    // SUDAH LOGIN → TIDAK BOLEH KE LOGIN PAGE
    if (user) {
      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) return null;
  if (user) return null;

  return <>{children}</>;
};
