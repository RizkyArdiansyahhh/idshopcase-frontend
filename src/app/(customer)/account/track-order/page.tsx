"use client";

import { useGetTrackOrder } from "@/features/orders/api/get-track-order";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { TrackOrderTimeline } from "./_components/track-order";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { PackageSearch } from "lucide-react";

const searchTrackingSchema = z.object({
  trackingNumber: z.string().min(1, { message: "ID Order wajib diisi" }),
});

type SearchTrackingSchema = z.infer<typeof searchTrackingSchema>;

export const TrackOrderPage = () => {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("order_id") || "";

  const [orderId, setOrderId] = useState<number>(Number(initialOrderId) || 0);

  const form = useForm<SearchTrackingSchema>({
    resolver: zodResolver(searchTrackingSchema),
    defaultValues: { trackingNumber: initialOrderId },
  });

  useEffect(() => {
    if (initialOrderId) {
      const parsed = Number(initialOrderId);
      if (parsed > 0) {
        setOrderId(parsed);
        form.setValue("trackingNumber", initialOrderId);
      }
    }
  }, [initialOrderId, form]);

  const {
    data: tracking,
    isLoading,
    isError,
  } = useGetTrackOrder({
    orderId,
    queryConfig: { enabled: orderId > 0 },
  });

  const handleSearch = form.handleSubmit(({ trackingNumber }) => {
    const id = Number(trackingNumber.replace(/\D/g, ""));
    if (!id) return;
    setOrderId(id);
  });

  return (
    <div className="p-4 md:p-6 h-full max-w-4xl mx-auto flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Lacak Pengiriman Paket</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
          Pantau status pengiriman pesanan Anda secara real-time via ekspedisi J&T Express
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 w-full items-center">
        <div className="flex-1">
          <FormField
            name="trackingNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder="Masukkan Nomor / ID Order (Contoh: 2 atau ORD-2)"
                  autoComplete="off"
                />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="flex items-center gap-2 font-semibold"
          disabled={isLoading}
        >
          <IoSearch size={18} /> Cari
        </Button>
      </form>

      <Separator className="my-5" />

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-16 gap-3">
          <Spinner className="size-10 text-primary" />
          <p className="text-sm text-muted-foreground">Menghubungi server pelacakan J&T...</p>
        </div>
      ) : tracking ? (
        <TrackOrderTimeline tracking={tracking} />
      ) : orderId > 0 && isError ? (
        <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
          <p className="font-semibold text-foreground">Data Pengiriman Belum Tersedia</p>
          <p className="text-xs md:text-sm text-muted-foreground max-w-md mt-1">
            Pesanan #{orderId} belum memiliki nomor resi pengiriman atau masih dipersiapkan oleh penjual.
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted text-muted-foreground mb-3">
            <PackageSearch size={48} />
          </div>
          <p className="font-semibold text-foreground">Masukkan ID Pesanan Anda</p>
          <p className="text-xs md:text-sm text-muted-foreground max-w-sm mt-1">
            Ketik nomor pesanan pada kolom pencarian di atas untuk melihat rute perjalanan paket.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
