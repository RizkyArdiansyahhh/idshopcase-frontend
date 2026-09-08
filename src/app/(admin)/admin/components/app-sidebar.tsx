"use client";

import * as React from "react";
import {
  IconBook,
  IconCreditCard,
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconUserCircle,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PackageSearch, ShoppingCart, Users } from "lucide-react";
import { NavMain, NavGroup } from "./nav-main";
import { NavUser } from "./nav-user";
import { useGetUser } from "@/features/auth/api/get-user";
import { User } from "@/types/api";

const sidebarGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: IconDashboard,
      },
    ],
  },
  {
    label: "Manajemen Toko",
    items: [
      {
        title: "Kelola User",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Kelola Produk",
        url: "/admin/products",
        icon: PackageSearch,
      },
      {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
      },
    ],
  },
  {
    label: "Keuangan",
    items: [
      {
        title: "Billing",
        url: "/admin/billing",
        icon: IconCreditCard,
      },
    ],
  },
  {
    label: "Pengaturan & Bantuan",
    items: [
      {
        title: "Account",
        url: "/admin/account",
        icon: IconUserCircle,
      },
      {
        title: "Panduan Admin",
        url: "/admin/guide",
        icon: IconBook,
      },
      {
        title: "Get Help",
        url: "https://wa.me/6285117453862?text=Halo%20Admin%20Support%20IDSHOPCASE",
        icon: IconHelp,
        isExternal: true,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useGetUser();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Idshopcase.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={sidebarGroups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as User} />
      </SidebarFooter>
    </Sidebar>
  );
}
