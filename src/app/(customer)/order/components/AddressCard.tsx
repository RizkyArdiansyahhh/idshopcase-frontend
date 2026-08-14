// features/checkout/components/AddressCard.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddressDialog } from "./AddressDialog";
import { Address } from "@/types/api";
import { useGetAddresses } from "@/features/address/api/get-address";

import { Plus } from "lucide-react";
import Link from "next/link";

type AddressCardProps = {
  selectedAddress?: Address;
  setSelectedAddress: (a: Address) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
};

export const AddressCard = ({
  selectedAddress,
  setSelectedAddress,
  isAddressModalOpen,
  setIsAddressModalOpen,
}: AddressCardProps) => {
  const { data: addresses } = useGetAddresses();

  const hasAddresses = addresses && addresses.length > 0;

  if (!hasAddresses) {
    return (
      <Card className="rounded-xl border shadow-xs">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Alamat Pengiriman
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Alamat pengiriman belum tersedia. Silakan tambah alamat untuk melanjutkan order.
            </p>
          </div>
          <Button
            asChild
            variant="default"
            className="w-full sm:w-auto text-xs md:text-sm font-semibold rounded-lg shrink-0"
          >
            <Link href="/account/address/new">
              <Plus className="w-4 h-4 mr-1.5" /> Tambah Alamat
            </Link>
          </Button>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card className="rounded-md">
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold">
            Alamat Pengiriman
          </h3>
          <Button
            className="text-sm md:text-base"
            variant="link"
            onClick={() => setIsAddressModalOpen(true)}
          >
            Ubah
          </Button>
        </CardHeader>
        <CardContent className="text-xs md:text-base">
          <p className="font-medium">
            {selectedAddress?.province || "Belum ada alamat dipilih"}
          </p>
          <p className="text-xs md:text-sm text-foreground/70 leading-snug">
            {selectedAddress ? (
              <>
                {selectedAddress.details && `${selectedAddress.details}, `}
                {selectedAddress.district && `${selectedAddress.district}, `}
                {selectedAddress.city && `${selectedAddress.city}, `}
                {selectedAddress.province && `${selectedAddress.province}, `}
                {selectedAddress.postal_code &&
                  `${selectedAddress.postal_code}`}
              </>
            ) : (
              "Silakan pilih alamat pengiriman"
            )}
          </p>
        </CardContent>
      </Card>

      <AddressDialog
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        addresses={addresses}
        selectedAddressId={selectedAddress?.id || 0}
        onSelectAddress={setSelectedAddress}
      />
    </>
  );
};
