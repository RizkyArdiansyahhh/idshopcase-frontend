"use client";
import { Button } from "@/components/ui/button";
import { SidebarLink } from "./sidebar-link";
import { usePathname } from "next/navigation";

const sidebarLink: { label: string; path: string }[] = [
  {
    label: "Informasi Pribadi",
    path: "/account/profile",
  },
  {
    label: "Pesanan Saya",
    path: "/account/orders",
  },
  {
    label: "Metode Pembayaran",
    path: "/account/payments",
  },
  {
    label: "Alamat",
    path: "/account/address",
  },
];

export const Sidebar = () => {
  const pathName = usePathname();
  return (
    <nav className="h-5/6 w-5/6 flex flex-col justify-between">
      <ul className="flex flex-col gap-4 ">
        {sidebarLink.map((link) => {
          const isActive =
            pathName === link.path || pathName.startsWith(`${link.path}/`);
          return (
            <SidebarLink key={link.path} isActive={isActive} href={link.path}>
              {link.label}
            </SidebarLink>
          );
        })}
      </ul>

      {pathName === "/account/profile" && (
        <div>
          <Button
            className="w-auto px-8 py-1 font-bold text-xl bg-destructive/80"
            variant="destructive"
          >
            Keluar
          </Button>
        </div>
      )}
    </nav>
  );
};
