"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SpinnerV2 } from "@/components/ui/spinner";
import { useGetTrackOrder } from "@/features/orders/api/get-track-order";
import { TrackOrderTimeline } from "./_components/track-order";
import { useTranslations } from "next-intl";

const searchTrackingSchema = z.object({
  trackingNumber: z.string().min(1),
});

type SearchTrackingSchema = z.infer<typeof searchTrackingSchema>;

export default function TrackOrderPage() {
  const t = useTranslations("account.tracking");
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("order_id") || "";

  const [searchQuery, setSearchQuery] = useState<string>(initialOrderId.trim());

  const form = useForm<SearchTrackingSchema>({
    resolver: zodResolver(searchTrackingSchema),
    defaultValues: { trackingNumber: initialOrderId },
  });

  useEffect(() => {
    if (initialOrderId) {
      setSearchQuery(initialOrderId.trim());
      form.setValue("trackingNumber", initialOrderId.trim());
    }
  }, [initialOrderId, form]);

  const {
    data: trackingData,
    isLoading,
    isError,
  } = useGetTrackOrder({
    orderId: searchQuery,
    queryConfig: { enabled: searchQuery.length > 0 },
  });

  const handleSearch = form.handleSubmit(({ trackingNumber }) => {
    const trimmed = trackingNumber.trim();
    if (!trimmed) return;
    setSearchQuery(trimmed);
  });

  return (
    <div className="w-full space-y-6 font-sans text-neutral-900 select-none">
      {/* =========================================================================
          1. SEARCH BAR
         ========================================================================= */}
      <div className="p-5 sm:p-7 rounded-none border border-neutral-200 bg-white space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            {t("title")}
          </h2>
          <p className="text-xs text-neutral-500 font-normal">
            {t("subtitle")}
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
          <div className="flex-1">
            <FormField
              name="trackingNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    placeholder={t("searchPlaceholder")}
                    className="h-10 text-xs sm:text-sm font-mono border-neutral-300 focus-visible:ring-0 focus-visible:border-black rounded-none bg-white"
                  />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 px-6 font-bold text-xs bg-black hover:bg-neutral-800 text-white rounded-none transition-all cursor-pointer"
          >
            {isLoading ? (
              <SpinnerV2 className="size-4 text-white" />
            ) : (
              t("trackButton")
            )}
          </Button>
        </form>
      </div>

      {/* =========================================================================
          2. TRACKING CONTENT / STATES
         ========================================================================= */}
      {isLoading ? (
        <div className="p-12 border border-neutral-200 bg-white flex flex-col items-center justify-center space-y-3">
          <SpinnerV2 className="size-6 text-black" />
          <p className="text-xs text-neutral-500 font-medium tracking-wide uppercase">
            {t("connecting")}
          </p>
        </div>
      ) : isError ? (
        <div className="p-8 border border-neutral-200 bg-white space-y-2 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            {t("notFoundTitle")}
          </p>
          <p className="text-xs text-neutral-500 font-normal max-w-md mx-auto leading-relaxed">
            {t("notFoundDesc", { id: searchQuery })}
          </p>
        </div>
      ) : trackingData ? (
        <TrackOrderTimeline tracking={trackingData} />
      ) : (
        <div className="p-12 border border-neutral-200 bg-white text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            {t("noOrderTitle")}
          </p>
          <p className="text-xs text-neutral-500 font-normal max-w-sm mx-auto">
            {t("noOrderDesc")}
          </p>
        </div>
      )}
    </div>
  );
}
