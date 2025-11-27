"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const header = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Users",
    path: "/admin/users",
  },
  {
    label: "Products",
    path: "/admin/products",
  },
  {
    label: "Tambah Produk",
    path: "/admin/products/new",
  },
  {
    label: "Edit Produk",
    path: "/admin/products/edit/:id",
  },
  {
    label: "Orders",
    path: "/admin/orders",
  },
];

export function SiteHeader() {
  const pathName = usePathname();

  const getTitle = () => {
    for (const item of header) {
      if (!item.path) continue;
      if (item.path.includes("/:id")) {
        const basePath = item.path.replace("/:id", "");
        if (pathName.startsWith(basePath + "/")) {
          return item.label;
        }
      }
      if (item.path === pathName) {
        return item.label;
      }
    }
    return "";
  };

  const title = getTitle();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
}
