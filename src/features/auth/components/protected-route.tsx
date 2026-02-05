"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetUser } from "@/features/auth/api/get-user";
import { useAuthStore } from "@/store/profile-store";

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
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

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
