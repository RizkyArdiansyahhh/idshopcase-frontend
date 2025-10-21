"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "./_components/sidebar";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  const listpath = ["/account/profile", "/account/address"];
  console.log(pathName);

  return (
    <ProtectedRoute allowedRoles={["user"]} redirectTo="/login">
      <div className="h-full w-full flex flex-row py-10">
        <div className="h-full w-2/6 pr-4 bg-background flex flex-col items-end">
          <Sidebar />
        </div>
        <div
          className={`max-h-fit w-4/6 rounded-lg border-2
          ${
            listpath.includes(pathName)
              ? "border-transparent"
              : "border-foreground"
          } 
          ${pathName !== "/account/address" ? "p-2" : ""}
          `}
        >
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
