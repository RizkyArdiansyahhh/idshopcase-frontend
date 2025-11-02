"use client";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/features/products/api/get-ptoducts";
import { Product } from "@/types/api";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { TableContent } from "../../components/table-content";
import { Plus } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/format-currency";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

export const Products = () => {
  const { push, replace } = useRouter();
  const columnHelper = createColumnHelper<Product>();

  const hasVariants = (product: Product): boolean => {
    return (
      Array.isArray(product.variantOptions) && product.variantOptions.length > 0
    );
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
      }),
      columnHelper.accessor("name", {
        header: "Product Name",
        cell: ({ row }) => {
          const product = row.original;
          console.log(product.images);
          return (
            <div className="flex flex-row items-center gap-2">
              <div className="w-10 h-14 rounded-xs overflow-hidden relative">
                <Image
                  src={product.images?.[0] || ""}
                  alt={product.name}
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <span className="text-app-semibold-sm">{product.name}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor("basePrice", {
        header: "Harga",
        cell: ({ row }) => {
          const product = row.original;
          const isHasVariants = hasVariants(product);
          if (isHasVariants) {
            const minPrice = Math.min(
              ...product.variantCombinations!.map((p) => p.price)
            );
            const maxPrice = Math.max(
              ...product.variantCombinations!.map((p) => p.price)
            );
            return (
              <span className="text-app-semibold-sm">
                {minPrice === maxPrice
                  ? formatCurrency(minPrice)
                  : ` ${formatCurrency(minPrice)} - ${formatCurrency(
                      maxPrice
                    )}`}
              </span>
            );
          }
          return (
            <span className="text-app-semibold-sm">
              {formatCurrency(product.basePrice ?? 0)}
            </span>
          );
        },
      }),
      columnHelper.accessor("baseStock", {
        header: "Stock",
        cell: ({ row }) => {
          const product = row.original;

          const hasVariants =
            Array.isArray(product.variantOptions) &&
            product.variantOptions.length > 0;

          if (hasVariants) {
            const totalStock = product.variantCombinations?.reduce(
              (total, combination) => total + combination.stock,
              0
            );
            return <span className="text-app-semibold-sm">{totalStock}</span>;
          }

          return (
            <span className="text-app-semibold-sm">
              {product.baseStock ?? 0}
            </span>
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
                  // setSelectedUser(row.original);
                  // setActions("view");
                  // setIsOpen(true);
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  push(`/admin/products/edit/${row.original.id}`);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  // setSelectedUser(row.original);
                  // setIsOpenDialogDelete(true);
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

  const { data: products } = useGetProducts();

  const table = useReactTable({
    data: products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div>
        <div className="flex flex-row justify-between">
          <div></div>
          <div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                push("/admin/products/new");
                // setSelectedUser(null);
                // setActions("create");
                // setIsOpen(true);
              }}
              variant={"default"}
            >
              <div className="bg-background p-1 rounded-full">
                <Plus className="text-foreground" />
              </div>
              Tambah Produk
            </Button>
          </div>
        </div>
        <TableContent table={table} columns={columns}></TableContent>
      </div>
    </>
  );
};
