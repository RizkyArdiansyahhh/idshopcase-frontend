"use client";

import { usePathname } from "next/navigation";
import { Footer } from "../_components/footer";
import { Navbar } from "@/components/layouts/navbar";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const HIDE_NAVBAR_PATHS = ["/cart", "/order"];
  const shouldHideNavbar = HIDE_NAVBAR_PATHS.some((path) =>
    pathName.startsWith(path),
  );

  const isProductDetail = pathName.startsWith("/products/detail");

  return (
    <ProtectedRoute allowedRoles={["customer"]} redirectTo="/login">
      <div
        className={`w-screen flex flex-col items-center py-2 ${
          !isProductDetail ? "h-screen" : ""
        }`}
      >
        {!shouldHideNavbar && <Navbar isBlur={false} />}

        <div
          className={`flex h-full w-full justify-center ${
            shouldHideNavbar ? "pt-0" : "pt-20"
          }`}
        >
          <div
            className={`h-full ${
              pathName.startsWith("/order") ? "w-full" : "w-[93%]"
            }`}
          >
            {children}
          </div>
        </div>

        {isProductDetail && <Footer />}
      </div>
    </ProtectedRoute>
  );
}
