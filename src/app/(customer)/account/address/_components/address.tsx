"use client";
import { Button } from "@/components/ui/button";
import { AddressCard } from "./address-card";
import { useRouter } from "next/navigation";
import { AddressesList } from "@/features/address/components/addresses-list";

export const Address = () => {
  const { push } = useRouter();

  const handleAddAddress = () => {
    push("/account/address/new");
  };

  return (
    <div className="w-full flex flex-col h-5/6 ">
      <div className="p-3 flex flex-col gap-3 h-[80%]  rounded-lg border-foreground overflow-auto">
        <AddressesList />
      </div>
      <div className="flex items-center flex-1 px-3">
        <Button className="py-5" variant={"default"} onClick={handleAddAddress}>
          Tambah Alamat Baru
        </Button>
      </div>
    </div>
  );
};
