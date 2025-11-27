"use client";
import { Button } from "@/components/ui/button";
import { SidebarLink } from "./sidebar-link";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { NavMainAccount } from "./nav-main-account";
import { IoLogOut } from "react-icons/io5";
import { useLogout } from "@/features/auth/api/login";

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
  {
    label: "Lacak Pesanan",
    path: "/account/track-order",
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
          className="w-full px-8 py-1 font-bold text-md  text-background hover:bg-background hover:border hover:border-foreground hover:text-foreground transition-colors duration-300 ease-in-out "
          variant="default"
          onClick={() => {
            handleLogout();
          }}
        >
          <IoLogOut size={32} />
          Keluar
        </Button>
      </div>
    </nav>
  );
};
