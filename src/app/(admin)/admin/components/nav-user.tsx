"use client";

import { IconDotsVertical, IconLogout } from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { User } from "@/types/api";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useLogout } from "@/features/auth/api/login";
import { useRouter } from "next/navigation";

export function NavUser({ user }: { user?: User | null }) {
  const { isMobile } = useSidebar();
  const { replace } = useRouter();

  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => replace("/login"),
    });
  };

  const displayName = user?.name || "Admin";
  const displayEmail = user?.email || "admin@mail.com";
  const profileImage = user?.profile_picture || "";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar
                name={displayName}
                image={profileImage}
                className="h-8 w-8 rounded-lg shrink-0 border border-border/60"
                fallbackClassName="rounded-lg text-xs font-semibold"
                noBg={true}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {displayEmail}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2.5 px-2 py-2 text-left text-sm">
                <UserAvatar
                  name={displayName}
                  image={profileImage}
                  className="h-9 w-9 rounded-lg shrink-0 border border-border/60"
                  fallbackClassName="rounded-lg text-xs font-semibold"
                  noBg={true}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {displayEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleLogout();
              }}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <IconLogout className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
