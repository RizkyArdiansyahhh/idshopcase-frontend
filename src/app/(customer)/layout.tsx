"use client";

import { usePathname } from "next/navigation";
import { Footer } from "../_components/footer";
import { Navbar } from "@/components/layouts/navbar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const HIDE_NAVBAR_PATHS = ["/order", "/customizer"];
  const HIDE_PADDING_PATHS = ["/products/collections", "/order", "/customizer"];
  const shouldHideNavbar = HIDE_NAVBAR_PATHS.some((path) =>
    pathName.startsWith(path),
  );
  const shouldHidePadding = HIDE_PADDING_PATHS.some((path) =>
    pathName.startsWith(path),
  );

  const isScrollablePage =
    pathName.startsWith("/products/detail") ||
    pathName.startsWith("/cart") ||
    pathName.startsWith("/about") ||
    pathName.startsWith("/faq");

  return (
    <div
      className={`w-screen flex flex-col items-center ${
        shouldHidePadding ? "py-0 overflow-hidden" : "py-0"
      } ${
        !isScrollablePage ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      {!shouldHideNavbar && <Navbar />}

      <div
        className={`flex h-full w-full justify-center flex-1 ${
          shouldHideNavbar || shouldHidePadding ? "pt-0" : "pt-12 sm:pt-14"
        }`}
      >
        <div
          className={`h-full ${
            shouldHidePadding ? "w-full" : "w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6"
          }`}
        >
          {children}
        </div>
      </div>

      {isScrollablePage && <Footer />}
    </div>
  );
}
