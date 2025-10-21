"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
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
  const [id, setId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) setId(Number(storedId));
    setReady(true);
  }, []);

  const { data: user } = useGetUser({
    id: id as number,
    queryConfig: { enabled: !!id },
  });

  useEffect(() => {
    if (user && !allowedRoles.includes(user.role)) {
      router.replace(redirectTo);
    }
    console.log(user);
  }, [user, allowedRoles, router, redirectTo]);

  if (!ready || !user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};
