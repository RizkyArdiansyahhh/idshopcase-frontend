"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "./_components/sidebar";
import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  const listpath = ["/account/address"];
  console.log(pathName);

  return (
    <ProtectedRoute allowedRoles={["customer"]} redirectTo="/login">
      <div className="h-full w-full flex flex-row py-10 gap-5 px-10">
        <div className="h-full w-1/5 bg- shadow-md overflow-hidden rounded-[12px] flex flex-col items-end border ">
          <Sidebar />
        </div>
        <div
          className={`h-full w-4/5 flex flex-col gap-3 `}
          // ${
          //   listpath.includes(pathName)
          //     ? "border-transparent"
          //     : "border-foreground"
          // }
        >
          <div className="flex flex-row gap-3 items-center justify-between">
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
          <div className="border rounded-[12px] flex-1 shadow-md">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
