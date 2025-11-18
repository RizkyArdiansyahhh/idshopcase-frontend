"use client";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/features/products/api/get-ptoducts";
import { Product } from "@/types/api";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
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
import { cleanImageUrl, imageUrlPrimary } from "@/utils/image-utils";
import { DeleteProduct } from "@/features/products/components/delete-product";

export const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { push } = useRouter();
  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
      }),
      columnHelper.accessor("name", {
        header: "Product Name",
        cell: ({ row }) => {
          const product = row.original;
          const imageUrlPrimaryy = imageUrlPrimary(product.ProductImages);
          console.log(imageUrlPrimaryy);

          return (
            <div className="flex flex-row items-center gap-2">
              <div className="w-10 h-14 rounded-xs overflow-hidden relative">
                <Image
                  src={imageUrlPrimary(product.ProductImages) ?? ""}
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
      columnHelper.accessor("price", {
        header: "Harga",
        cell: ({ row }) => {
          return (
            <span className="text-app-semibold-sm">
              {formatCurrency(Number(row.original.price))}
            </span>
          );
        },
      }),
      columnHelper.accessor("stock", {
        header: "Stock",
        cell: ({ row }) => {
          return (
            <span className="text-app-semibold-sm">{row.original.stock}</span>
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
                  setSelectedProduct(row.original);
                  setIsOpen(true);
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
      {isOpen && selectedProduct && (
        <DeleteProduct
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id={selectedProduct?.id ?? 0}
          setSelectedProduct={setSelectedProduct}
        ></DeleteProduct>
      )}
    </>
  );
};
