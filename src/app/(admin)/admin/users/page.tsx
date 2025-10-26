"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUsers } from "@/features/users/api/get-users";
import { User } from "@/types/api";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DrawerDetail } from "../components/drawer-detail";
import { TabContentUserByRole } from "./_components/tab-content-user-by-role";
import { Badge } from "@/components/ui/badge";

const UsersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const columnHelper = createColumnHelper<User>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => {
          const role = info.getValue();
          return (
            <Badge variant={role === "ADMIN" ? "default" : "outline"}>
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </Badge>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="data-[state=open]:bg-muted">
                <IconDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleTabByRole = (role?: string) => {
    if (!role) {
      setColumnFilters([]);
    } else {
      setColumnFilters([
        {
          id: "role",
          value: role,
        },
      ]);
    }
  };

  const { data: users } = useGetUsers();

  const table = useReactTable({
    data: users || [],
    columns,
    state: {
      columnFilters,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="p-4 lg:-p-6">
      <Tabs defaultValue="all" className="px-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => handleTabByRole(undefined)}>
            All
          </TabsTrigger>
          <TabsTrigger value="user" onClick={() => handleTabByRole("USER")}>
            User
          </TabsTrigger>
          <TabsTrigger value="admin" onClick={() => handleTabByRole("ADMIN")}>
            Admin
          </TabsTrigger>
        </TabsList>
        <TabContentUserByRole
          table={table}
          columns={columns}
          value="all"
        ></TabContentUserByRole>
        <TabContentUserByRole
          table={table}
          columns={columns}
          value="user"
        ></TabContentUserByRole>
        <TabContentUserByRole
          table={table}
          columns={columns}
          value="admin"
        ></TabContentUserByRole>
      </Tabs>
      <DrawerDetail isOpen={isOpen} setIsOpen={setIsOpen}></DrawerDetail>
    </div>
  );
};

export default UsersPage;
