"use client";

import { Button } from "@/components/ui/button";
import { SidebarLink } from "./sidebar-link";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { NavMainAccount } from "./nav-main-account";
import { useLogout } from "@/features/auth/api/login";
import { User, ShoppingBag, MapPin, KeyRound, Truck, LogOut } from "lucide-react";

const sidebarLinks = [
  {
    label: "Informasi Pribadi",
    path: "/account/profile",
    icon: <User className="w-4 h-4" />,
  },
  {
    label: "Pesanan Saya",
    path: "/account/orders",
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    label: "Alamat Pengiriman",
    path: "/account/address",
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    label: "Ubah Password",
    path: "/account/update-password",
    icon: <KeyRound className="w-4 h-4" />,
  },
  {
    label: "Lacak Pesanan",
    path: "/account/track-order",
    icon: <Truck className="w-4 h-4" />,
  },
];

export const Sidebar = () => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => replace("/login"),
    });
  };

  return (
    <nav className="w-full flex flex-col bg-background rounded-2xl border border-border/80 shadow-xs overflow-hidden">
      <NavMainAccount />
      <Separator />
      <ul className="flex flex-col gap-1 p-2.5">
        {sidebarLinks.map((link) => {
          const isActive =
            pathName === link.path || pathName.startsWith(`${link.path}/`);
          return (
            <SidebarLink
              key={link.path}
              isActive={isActive}
              href={link.path}
              icon={link.icon}
            >
              {link.label}
            </SidebarLink>
          );
        })}
      </ul>
      <Separator />
      <div className="p-2.5">
        <Button
          className="w-full justify-start gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
          variant="ghost"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 text-destructive" />
          Keluar dari Akun
        </Button>
      </div>
    </nav>
  );
};
