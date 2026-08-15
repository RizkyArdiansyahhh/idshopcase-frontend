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
import { Plus } from "lucide-react";
import Link from "next/link";

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
                  <p className="text-xs md:text-sm font-medium text-foreground">
                    {addr.city}
                  </p>
                  {addr.is_primary && (
                    <span className="text-xs font-medium uppercase tracking-wide bg-foreground/10 text-foreground/70 px-2 py-0.5 rounded-full">
                      Utama
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-foreground/60 leading-snug">
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

<<<<<<< HEAD
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
=======
        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <Link href="/account/address" className="w-full sm:w-auto">
            <Button variant="ghost" className="w-full text-xs font-semibold gap-1.5 text-primary">
              <Plus className="w-3.5 h-3.5" />
              Kelola / Tambah Alamat Baru
            </Button>
          </Link>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Tutup
>>>>>>> 26c651c (refactor: improve address validation, implement payment status polling, update global font to Poppins, and add FAQ page support)
          </Button>
          {addresses.length < 5 ? (
            <Button asChild variant="default" onClick={() => onOpenChange(false)}>
              <Link href="/account/address/new">
                <Plus className="w-4 h-4 mr-1.5" /> Tambah Alamat Baru
              </Link>
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground self-center">
              (Maksimal 5 alamat tercapai)
            </span>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
