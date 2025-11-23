// features/checkout/components/AddressCard.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddressDialog } from "./AddressDialog";
import { Address } from "@/types/api";
import { useGetAddresses } from "@/features/address/api/get-address";

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

  if (!addresses) {
    return (
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Alamat Pengiriman</h3>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Alamat Pengiriman</h3>
          <Button variant="link" onClick={() => setIsAddressModalOpen(true)}>
            Ubah
          </Button>
        </CardHeader>
        <CardContent>
          <p className="font-medium">
            {selectedAddress?.province || "Belum ada alamat dipilih"}
          </p>
          <p className="text-sm text-foreground/70 leading-snug">
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
