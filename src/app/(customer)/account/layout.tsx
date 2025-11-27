"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./_components/sidebar";

import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { SidebarFloating } from "./_components/sidebar-floating";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();

  return (
    <ProtectedRoute allowedRoles={["customer"]} redirectTo="/login">
      {/* FLOATING SIDEBAR (HARUS DI LUAR / TIDAK KENA PADDING) */}
      <SidebarFloating />

      {/* WRAPPER UTAMA TANPA PADDING */}
      <div className="relative h-full w-full flex flex-col md:flex-row">
        {/* AREA YANG PUNYA PADDING */}
        <div className="flex-1 flex flex-col md:flex-row px-5 py-5 gap-5">
          {/* DESKTOP SIDEBAR */}
          <div className="hidden md:flex w-2/6 lg:w-1/5 border shadow-md rounded-[12px] overflow-hidden">
            <Sidebar />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 flex flex-col gap-3">
            {/* HEADER */}
            <div className="flex flex-row gap-3 items-center justify-between px-1">
              <div className="flex flex-row gap-3 items-center">
                <IoPersonOutline />
                <p className="text-md font-bold text-foreground/70">Username</p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <GrLocation />
                <div className="flex flex-row items-center gap-1 text-xs">
                  <p className="text-foreground/70">Dikirim ke</p>
                  <p className="font-bold">Pekanbaru</p>
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="border rounded-[12px] flex-1 shadow-md bg-white">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
