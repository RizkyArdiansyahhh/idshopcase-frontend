"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetUser } from "@/features/auth/api/get-user";
import { useAuthStore } from "@/store/profile-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";

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
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
      useAuthModalStore.getState().openModal({
        reason: "login_required",
        redirectUrl: currentPath,
      });
      router.replace("/");
      return;
    }

    // SUDAH LOGIN, tapi role salah
    const userRole = user.role || "customer";
    if (!allowedRoles.includes(userRole)) {
      if (userRole === "admin") {
        router.replace("/admin/dashboard");
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
