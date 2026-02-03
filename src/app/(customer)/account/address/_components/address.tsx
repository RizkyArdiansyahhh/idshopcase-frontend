"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AddressesList } from "@/features/address/components/addresses-list";
import { Separator } from "@/components/ui/separator";

export const Address = () => {
  const { push } = useRouter();

  const handleAddAddress = () => {
    push("/account/address/new");
  };

  return (
    <div className="w-full flex flex-col h-5/6 ">
      <div className="p-3 flex flex-col gap-3 h-[80%] rounded-lg border-foreground overflow-y-auto">
        <p className="block text-app-semibold-md text-sm font-semibold md:hidden">
          Daftar Alamat
        </p>
        <AddressesList />
      </div>
      <Separator className="my-2"></Separator>
      <div className="flex items-center flex-1 px-3">
        <Button className="py-5" variant={"default"} onClick={handleAddAddress}>
          Tambah Alamat Baru
        </Button>
      </div>
    </div>
  );
};
