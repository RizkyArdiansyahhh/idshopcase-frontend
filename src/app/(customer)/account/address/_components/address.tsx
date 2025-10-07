"use client";
import { Button } from "@/components/ui/button";
import { AddressCard } from "./address-card";
import { useRouter } from "next/navigation";

export const Address = () => {
  const { push } = useRouter();

  const handleAddAddress = () => {
    push("/account/address/new");
  };

  return (
    <div className="w-full flex flex-col h-5/6 ">
      <div className="p-3 flex flex-col gap-3 h-[80%] border-2 rounded-lg border-foreground overflow-auto">
        <AddressCard
          id="123"
          fullname="John Doe"
          phone="08123456789"
          detail="Jl. Raya No. 123"
          village="Village A"
          district="District B"
          city="City C"
          province="Province D"
          postalCode="12345"
          isDefault={true}
        ></AddressCard>
        <AddressCard
          id="123"
          fullname="John Doe"
          phone="08123456789"
          detail="Jl. Raya No. 123"
          village="Village A"
          district="District B"
          city="City C"
          province="Province D"
          postalCode="12345"
          isDefault={false}
        ></AddressCard>
        <AddressCard
          id="123"
          fullname="John Doe"
          phone="08123456789"
          detail="Jl. Raya No. 123"
          village="Village A"
          district="District B"
          city="City C"
          province="Province D"
          postalCode="12345"
          isDefault={false}
        ></AddressCard>
        <AddressCard
          id="123"
          fullname="John Doe"
          phone="08123456789"
          detail="Jl. Raya No. 123"
          village="Village A"
          district="District B"
          city="City C"
          province="Province D"
          postalCode="12345"
          isDefault={false}
        ></AddressCard>
        <AddressCard
          id="123"
          fullname="John Doe"
          phone="08123456789"
          detail="Jl. Raya No. 123"
          village="Village A"
          district="District B"
          city="City C"
          province="Province D"
          postalCode="12345"
          isDefault={false}
        ></AddressCard>
        <AddressCard
          id="123"
          fullname="John Doe"
          phone="08123456789"
          detail="Jl. Raya No. 123"
          village="Village A"
          district="District B"
          city="City C"
          province="Province D"
          postalCode="12345"
          isDefault={false}
        ></AddressCard>
        <AddressCard
          id="123"
          fullname="John Doe"
          phone="08123456789"
          detail="Jl. Raya No. 123"
          village="Village A"
          district="District B"
          city="City C"
          province="Province D"
          postalCode="12345"
          isDefault={false}
        ></AddressCard>
        <AddressCard
          id="123"
          fullname="John Doe"
          phone="08123456789"
          detail="Jl. Raya No. 123"
          village="Village A"
          district="District B"
          city="City C"
          province="Province D"
          postalCode="12345"
          isDefault={false}
        ></AddressCard>
      </div>
      <div className="flex items-center flex-1">
        <Button className="py-5" variant={"default"} onClick={handleAddAddress}>
          Tambah Alamat Baru
        </Button>
      </div>
    </div>
  );
};
