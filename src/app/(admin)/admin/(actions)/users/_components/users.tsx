"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUsers } from "@/features/users/api/get-users";
import { User } from "@/types/api";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { DeleteUser } from "@/features/users/components/delete-user";
import { TableContent } from "../../components/table-content";
import { Plus } from "lucide-react";
import { DrawerUser } from "./drawer-user";

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  const [actions, setActions] = useState<"view" | "edit" | "create">("create");
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
            <Badge variant={role === "admin" ? "default" : "outline"}>
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </Badge>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
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
                  setSelectedUser(row.original);
                  setActions("view");
                  setIsOpen(true);
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(row.original);
                  setActions("edit");
                  setIsOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(row.original);
                  setIsOpenDialogDelete(true);
                }}
              >
                Delete
              </DropdownMenuItem>
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
  console.log("Users:", users);

  const table = useReactTable({
    data: users || [],
    columns,
    state: {
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log("Deleting user id:", selectedUser);

  return (
    <div>
      <Tabs defaultValue="all" className="px-4">
        <div className="flex flex-row justify-between">
          <div>
            <TabsList>
              <TabsTrigger
                value="all"
                onClick={() => handleTabByRole(undefined)}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="customer"
                onClick={() => handleTabByRole("customer")}
              >
                Customer
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                onClick={() => handleTabByRole("admin")}
              >
                Admin
              </TabsTrigger>
            </TabsList>
          </div>
          <div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedUser(null);
                setActions("create");
                setIsOpen(true);
              }}
              variant={"default"}
            >
              <div className="bg-background p-1 rounded-full">
                <Plus className="text-foreground" />
              </div>
              Tambah User
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <TableContent table={table} columns={columns}></TableContent>
        </TabsContent>
        <TabsContent value="customer">
          <TableContent table={table} columns={columns}></TableContent>
        </TabsContent>
        <TabsContent value="admin">
          <TableContent table={table} columns={columns}></TableContent>
        </TabsContent>
      </Tabs>
      <DrawerUser
        user={selectedUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        actions={actions}
      ></DrawerUser>
      {selectedUser && (
        <DeleteUser
          id={Number(selectedUser.id)}
          isOpen={isOpenDialogDelete}
          setIsOpen={setIsOpenDialogDelete}
          setSelectedUser={setSelectedUser}
        />
      )}
    </div>
  );
};

export default Users;
