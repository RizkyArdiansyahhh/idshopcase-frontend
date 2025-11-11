"use client";
import { Button } from "@/components/ui/button";
import { SidebarLink } from "./sidebar-link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { NavMainAccount } from "./nav-main-account";
import { IoLogOut } from "react-icons/io5";

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
    label: "Alamat",
    path: "/account/address",
  },
  {
    label: "Ubah Password",
    path: "/account/update-password",
  },
];

export const Sidebar = () => {
  const pathName = usePathname();
  return (
    <nav className="h-full w-full flex flex-col bg-transparent  ">
      <NavMainAccount></NavMainAccount>
      <Separator></Separator>
      <ul className="flex flex-col gap- p-5">
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
      <Separator></Separator>
      <div className="p-5">
        <Button
          className="w-full px-8 py-1 font-bold text-md bg-destructive/80"
          variant="destructive"
        >
          <IoLogOut size={32} />
          Keluar
        </Button>
      </div>
    </nav>
  );
};
