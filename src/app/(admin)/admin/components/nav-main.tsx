"use client";

import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  title: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>;
  isExternal?: boolean;
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export function NavMain({
  groups,
  items,
}: {
  groups?: NavGroup[];
  items?: NavItem[];
}) {
  const pathName = usePathname();

  const displayGroups: NavGroup[] = groups || (items ? [{ items }] : []);

  return (
    <div className="flex flex-col gap-1">
      {/* Top Quick Actions */}
      <SidebarGroup className="pb-1">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear font-medium"
              >
                <IconCirclePlusFilled className="size-4" />
                <span>Actions</span>
              </SidebarMenuButton>
              <Button
                size="icon"
                className="size-8 group-data-[collapsible=icon]:opacity-0 shrink-0"
                variant="outline"
              >
                <IconMail className="size-4" />
                <span className="sr-only">Inbox</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Grouped Nav Items */}
      {displayGroups.map((group, groupIdx) => (
        <SidebarGroup key={group.label || groupIdx} className="py-1">
          {group.label && (
            <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-muted-foreground/70 uppercase px-2">
              {group.label}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive =
                  !item.isExternal &&
                  (pathName === item.url ||
                    (item.url !== "/admin" &&
                      item.url !== "/admin/dashboard" &&
                      pathName.startsWith(item.url)));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      {item.isExternal ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          {item.icon && <item.icon className="size-4 shrink-0" />}
                          <span>{item.title}</span>
                        </a>
                      ) : (
                        <Link href={item.url} className="flex items-center gap-2">
                          {item.icon && <item.icon className="size-4 shrink-0" />}
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </div>
  );
}
