import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { ReactNode } from "react";

export default function CartLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      {children}
    </ProtectedRoute>
  );
}
