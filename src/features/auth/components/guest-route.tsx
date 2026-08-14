"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetUser } from "@/features/auth/api/get-user";
import Loader from "@/components/shared/loaders";

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: user, isLoading } = useGetUser();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }
  if (user) return null;

  return <>{children}</>;
};
