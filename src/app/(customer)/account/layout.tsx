"use client";

import { Sidebar } from "./_components/sidebar";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { BottomNavigation } from "./_components/sidebar-floating";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <BottomNavigation />

      <div className="w-full bg-background min-h-[calc(100vh-4rem)] pt-24 pb-12">
        <div className="w-[93%] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Sidebar Left */}
            <div className="hidden md:block w-64 lg:w-72 shrink-0 sticky top-28">
              <Sidebar />
            </div>

            {/* Main Content Right */}
            <div className="w-full flex-1 min-w-0 bg-background border border-border/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="w-full pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
