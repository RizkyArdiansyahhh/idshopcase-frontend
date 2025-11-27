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
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const searchTrackingSchema = z.object({
  trackingNumber: z.string().min(1, { message: "Tracking number is required" }),
});

type SearchTrackingSchema = z.infer<typeof searchTrackingSchema>;

export const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState<number>(0);
  const form = useForm<SearchTrackingSchema>({
    resolver: zodResolver(searchTrackingSchema),
    defaultValues: { trackingNumber: "" },
  });

  const {
    data: tracking,
    refetch,
    isLoading,
    error,
  } = useGetTrackOrder({
    orderId,
    queryConfig: { enabled: orderId > 0 },
  });

  const handleSearch = form.handleSubmit(({ trackingNumber }) => {
    const id = Number(trackingNumber);
    if (!id) return;
    setOrderId(id); // orderId > 0 → query aktif
  });

  return (
    <div className="p-6 h-full max-w-4xl mx-auto flex flex-col">
      <form onSubmit={handleSearch} className="flex gap-4 w-full items-center">
        <div className="flex-1">
          <FormField
            name="trackingNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder="Masukkan ID Order Pesanan Anda"
                />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <IoSearch /> Cari
        </Button>
      </form>

      <Separator className="my-5" />

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="size-10 text-foreground" />
        </div>
      ) : tracking ? (
        <TrackOrderTimeline tracking={tracking} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Order tidak ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
