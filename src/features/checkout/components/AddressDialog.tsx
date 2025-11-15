// features/checkout/components/AddressDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Address } from "@/types/api";

type AddressDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: Address[];
  selectedAddressId: number;
  onSelectAddress: (addr: Address) => void;
};

export const AddressDialog = ({
  open,
  onOpenChange,
  addresses,
  selectedAddressId,
  onSelectAddress,
}: AddressDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih Alamat Pengiriman</DialogTitle>
          <DialogDescription>
            Pilih alamat yang ingin digunakan untuk pengiriman
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition-colors
        ${
          selectedAddressId === addr.id
            ? "border-foreground/40 bg-muted"
            : "border-border hover:bg-muted/40"
        }`}
              onClick={() => {
                onSelectAddress(addr);
                onOpenChange(false);
              }}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{addr.city}</p>
                  {addr.is_primary && (
                    <span className="text-xs font-medium uppercase tracking-wide bg-foreground/10 text-foreground/70 px-2 py-0.5 rounded-full">
                      Utama
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/60 leading-snug">
                  {addr.details} {addr.district}, {addr.city}, {addr.province}
                  {addr.postal_code && ` (${addr.postal_code})`}
                </p>
              </div>

              {selectedAddressId === addr.id && (
                <span className="text-foreground/70 text-lg font-semibold">
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
