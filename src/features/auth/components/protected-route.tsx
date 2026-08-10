"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetUser } from "@/features/auth/api/get-user";
import { useAuthStore } from "@/store/profile-store";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: string[];
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
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

    // belum login
    if (!user) {
      router.replace("/login");
      return;
    }

    // SUDAH LOGIN, tapi role salah
    const userRole = user.role || "customer";
    if (!allowedRoles.includes(userRole)) {
      if (userRole === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading) return null;
  if (!user) return null;
  const userRole = user.role || "customer";
  if (!allowedRoles.includes(userRole)) return null;

  return <>{children}</>;
};
