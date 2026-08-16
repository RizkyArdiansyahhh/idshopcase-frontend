// features/checkout/components/AddressCard.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddressDialog } from "./AddressDialog";
import { Address } from "@/types/api";
import { useGetAddresses } from "@/features/address/api/get-address";
import { Plus, MapPin } from "lucide-react";
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
      <Card className="rounded-xl border border-dashed border-border p-5 bg-muted/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-full text-primary shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-foreground">
                Alamat Pengiriman Belum Ada
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tambahkan alamat pengiriman Anda terlebih dahulu sebelum melanjutkan pesanan.
              </p>
            </div>
          </div>
          <Link href="/account/address">
            <Button className="shrink-0 gap-2 font-semibold rounded-xl text-xs sm:text-sm">
              <Plus className="w-4 h-4" />
              Tambah Alamat
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="rounded-xl border border-border shadow-xs">
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <h3 className="text-sm md:text-base font-bold text-foreground">
            Alamat Pengiriman
          </h3>
          <Button
            className="text-xs sm:text-sm font-semibold h-auto p-0"
            variant="link"
            onClick={() => setIsAddressModalOpen(true)}
          >
            Ubah Alamat
          </Button>
        </CardHeader>
        <CardContent className="text-xs md:text-sm">
          {selectedAddress ? (
            <div>
              <p className="font-bold text-foreground mb-1">
                {selectedAddress.city} {selectedAddress.is_primary && "(Utama)"}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {selectedAddress.details && `${selectedAddress.details}, `}
                {selectedAddress.district && `${selectedAddress.district}, `}
                {selectedAddress.city && `${selectedAddress.city}, `}
                {selectedAddress.province && `${selectedAddress.province} `}
                {selectedAddress.postal_code && `(${selectedAddress.postal_code})`}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between py-2">
              <p className="text-muted-foreground italic">
                Belum ada alamat dipilih
              </p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-semibold gap-1.5"
                onClick={() => setIsAddressModalOpen(true)}
              >
                <MapPin className="w-3.5 h-3.5" />
                Pilih Alamat
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddressDialog
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        addresses={addresses || []}
        selectedAddressId={selectedAddress?.id || ""}
        onSelectAddress={setSelectedAddress}
      />
    </>
  );
};
