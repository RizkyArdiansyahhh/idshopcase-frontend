"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AddressesList } from "@/features/address/components/addresses-list";
import { Separator } from "@/components/ui/separator";
import { useGetAddresses } from "@/features/address/api/get-address";
import { Plus } from "lucide-react";

export const Address = () => {
  const { push } = useRouter();
  const { data: addresses } = useGetAddresses();
  const isMaxAddress = (addresses?.length || 0) >= 5;

  const handleAddAddress = () => {
    if (!isMaxAddress) {
      push("/account/address/new");
    }
  };

  return (
    <div className="w-full flex flex-col h-5/6">
      <div className="p-3 flex flex-col gap-3 h-[80%] rounded-lg border-foreground overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-app-semibold-md text-sm font-semibold">
            Daftar Alamat ({addresses?.length || 0}/5)
          </p>
          {isMaxAddress && (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
              Maksimal 5 alamat tercapai
            </span>
          )}
        </div>
        <AddressesList />
      </div>
      <Separator className="my-2"></Separator>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3">
        <Button
          className="h-10 px-5"
          variant={isMaxAddress ? "secondary" : "default"}
          disabled={isMaxAddress}
          onClick={handleAddAddress}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Tambah Alamat Baru
        </Button>
        {isMaxAddress && (
          <p className="text-xs text-muted-foreground">
            Hapus salah satu alamat untuk menambah alamat baru.
          </p>
        )}
      </div>
    </div>
  );
};
