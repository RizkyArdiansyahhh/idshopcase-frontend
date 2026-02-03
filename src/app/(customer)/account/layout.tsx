"use client";

import { Sidebar } from "./_components/sidebar";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { useGetUser } from "@/features/auth/api/get-user";
import { BottomNavigation } from "./_components/sidebar-floating";
import { FaRegUser } from "react-icons/fa";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user } = useGetUser();
  // const { data: addrees } = useGetAddresses();
  // const addressUser = addrees?.find((addr) => addr.is_primary === true);

  return (
    <ProtectedRoute allowedRoles={["customer"]} redirectTo="/login">
      {/* FLOATING SIDEBAR (HARUS DI LUAR / TIDAK KENA PADDING) */}
      <BottomNavigation />

      {/* WRAPPER UTAMA TANPA PADDING */}
      <div className="relative h-full w-full flex flex-col md:flex-row">
        {/* AREA YANG PUNYA PADDING */}
        <div className="flex-1 flex flex-col md:flex-row px-1 md:px-5 py-1 md:py-5 gap-5">
          {/* DESKTOP SIDEBAR */}
          <div className="hidden md:flex w-2/6 lg:w-1/5 border shadow-md rounded-[12px] overflow-hidden">
            <Sidebar />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 flex flex-col gap-3">
            {/* HEADER */}
            <div className="flex flex-row gap-3 items-center justify-between px-1">
              <div className="flex flex-row gap-2 md:gap-3 items-center">
                <FaRegUser className="text-foreground/70 text-sm sm:text-base" />
                <p className="text-xs sm:text-base md:text-md font-bold text-foreground/70">
                  {user?.email}
                </p>
              </div>

              {/* <div className="flex flex-row items-center gap-2">
                <GrLocation />
                <div className="flex flex-row items-center gap-1 text-xs">
                  <p className="text-foreground/70">Dikirim ke</p>
                  <p className="font-bold">{addressUser?.city}</p>
                  <IoIosArrowDown />
                </div>
              </div> */}
            </div>

            {/* CONTENT AREA */}
            <div className="border rounded-[12px] flex-1 shadow-md bg-white overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom))]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
