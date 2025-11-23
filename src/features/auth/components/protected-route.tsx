"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetUser } from "@/features/auth/api/get-user";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { data: user, isLoading } = useGetUser();
  console.log(user?.role, "role");

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace(redirectTo);
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      router.replace(redirectTo);
      return;
    }
  }, [user, isLoading, allowedRoles, router, redirectTo]);

  if (isLoading) return <div>Loading...</div>;

  if (!user) return null;
  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};
