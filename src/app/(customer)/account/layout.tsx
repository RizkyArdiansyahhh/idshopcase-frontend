"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "./_components/sidebar";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  const listpath = ["/account/address"];
  console.log(pathName);

  return (
    // <ProtectedRoute allowedRoles={["customer"]} redirectTo="/login">
    <div className="h-full w-full flex flex-row py-10">
      <div className="h-full w-2/6 pr-4 bg-transparent flex flex-col items-end ">
        <Sidebar />
      </div>
      <div
        className={`max-h-fit w-4/6 rounded-lg border-2
          ${
            listpath.includes(pathName)
              ? "border-transparent"
              : "border-foreground"
          }
          `}
      >
        {children}
      </div>
    </div>
    // </ProtectedRoute>
  );
}
