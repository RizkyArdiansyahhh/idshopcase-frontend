"use client";

import { usePathname } from "next/navigation";
import { Footer } from "../_components/footer";
import { Navbar } from "@/components/layouts/navbar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const HIDE_NAVBAR_PATHS = ["/order", "/customizer", "/account", "/profile"];
  const HIDE_FOOTER_PATHS = ["/order", "/customizer", "/account", "/profile"];
  const HIDE_PADDING_PATHS = [
    "/order",
    "/customizer",
    "/account",
    "/profile",
    "/products/collections",
  ];
  const FIXED_FULLSCREEN_PATHS = ["/order", "/customizer"];

  const shouldHideNavbar = HIDE_NAVBAR_PATHS.some((path) =>
    pathName.startsWith(path),
  );
  const shouldHideFooter = HIDE_FOOTER_PATHS.some((path) =>
    pathName.startsWith(path),
  );
  const shouldHidePadding = HIDE_PADDING_PATHS.some((path) =>
    pathName.startsWith(path),
  );
  const isFixedFullScreen = FIXED_FULLSCREEN_PATHS.some((path) =>
    pathName.startsWith(path),
  );

  return (
    <div
      className={`w-full flex flex-col items-center py-0 ${
        isFixedFullScreen
          ? "h-screen overflow-hidden"
          : "min-h-screen"
      }`}
    >
      {!shouldHideNavbar && <Navbar />}

      <div
        className={`flex h-full w-full justify-center flex-1 ${
          shouldHideNavbar || shouldHidePadding
            ? "pt-0"
            : "pt-20 sm:pt-24 md:pt-28"
        }`}
      >
        <div
          className={`h-full ${
            shouldHidePadding
              ? "w-full"
              : "w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6"
          }`}
        >
          {children}
        </div>
      </div>

      {!shouldHideFooter && <Footer />}
    </div>
  );
}
