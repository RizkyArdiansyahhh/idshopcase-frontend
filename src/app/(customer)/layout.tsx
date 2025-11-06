"use client";
// import { Navbar } from "@/components/layouts/navbar";
// import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { usePathname } from "next/navigation";
import { Footer } from "../_components/footer";
import { Navbar } from "@/components/layouts/navbar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    // <ProtectedRoute allowedRoles={["customer"]} redirectTo="/login">
    <div
      className={`${
        !pathName.startsWith("/products/detail") && "h-screen"
      } w-screen flex flex-col items-center py-2`}
    >
      <Navbar isBlur={false} />
      <div className="flex flex-row h-full w-full justify-center pt-20">
        <div className="h-full w-[93%]">{children}</div>
      </div>
      {pathName.startsWith("/products/detail") && <Footer></Footer>}
    </div>
    // </ProtectedRoute>
  );
}
