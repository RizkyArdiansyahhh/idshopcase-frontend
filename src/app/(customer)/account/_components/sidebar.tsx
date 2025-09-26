import { Button } from "@/components/ui/button";
import { SidebarLink } from "./sidebar-link";

export const Sidebar = () => {
  return (
    <nav className="h-5/6 w-5/6 flex flex-col justify-between">
      <ul className="flex flex-col gap-4 ">
        <SidebarLink href="/profile">Informasi Pribadi</SidebarLink>
        <SidebarLink href="/orders">Pesanan Saya</SidebarLink>
        <SidebarLink href="/payments">Metode Pembayaran</SidebarLink>
        <SidebarLink href="/address">Alamat</SidebarLink>
      </ul>

      <div>
        <Button
          className="w-auto px-8 py-1 font-bold text-xl bg-destructive/80"
          variant="destructive"
        >
          Keluar
        </Button>
      </div>
    </nav>
  );
};
