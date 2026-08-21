"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

export type TrackingHistory = {
  agentName?: string;
  city_name?: string;
  date_time?: string;
  driverName?: string;
  driverPhone?: string;
  nextSiteName?: string;
  note?: string;
  presenter?: string;
  presentername?: string;
  receiver?: string;
  status?: string;
  status_code?: number;
  storeName?: string;
};

export type TrackingData = {
  awb?: string;
  detail?: {
    actual_amount?: number;
    delivDriver?: {
      id?: string;
      name?: string;
      phone?: string;
      photo?: string;
    };
    detail_cost?: {
      add_cost?: number;
      cod?: number;
      insurance_cost?: number;
      return_cost?: number;
      shipping_cost?: number;
    };
    driver?: {
      name?: string;
    };
    itemname?: string;
    note?: string;
    qty?: number;
    receiver?: {
      addr?: string;
      city?: string;
      geoloc?: string;
      name?: string;
      zipcode?: string;
    };
    sender?: {
      addr?: string;
      city?: string;
      geoloc?: string;
      name?: string;
      zipcode?: string;
    };
    services_code?: string;
    services_type?: string;
    shipped_date?: string;
    weight?: number;
  };
  history?: TrackingHistory[];
  orderid?: string;
};

const getTimelineStep = (statusCode?: number, statusText: string = ""): number => {
  if (statusCode === 200 || statusText.toLowerCase().includes("terima") || statusText.toLowerCase().includes("selesai") || statusText.toLowerCase().includes("delivered")) {
    return 5;
  }
  const t = statusText.toLowerCase();
  if (t.includes("diantar") || t.includes("kurir") || t.includes("sprinter") || t.includes("menuju alamat") || t.includes("out for delivery")) {
    return 4;
  }
  if (t.includes("gateway") || t.includes("transit") || t.includes("sortir") || t.includes("diteruskan")) {
    return 3;
  }
  if (t.includes("drop point") || t.includes("diserahkan") || t.includes("pickup") || t.includes("agen")) {
    return 2;
  }
  return 1;
};

export const TrackOrderTimeline = ({ tracking }: { tracking: TrackingData }) => {
  const t = useTranslations("account.tracking");
  const [copied, setCopied] = useState(false);

  const handleCopyAwb = () => {
    if (tracking?.awb) {
      navigator.clipboard.writeText(tracking.awb);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const latest = tracking?.history?.[0];
  const currentStep = latest ? getTimelineStep(latest.status_code, latest.status) : 1;

  const steps = [
    { num: 1, label: t("steps.step1"), desc: t("steps.step1Desc") },
    { num: 2, label: t("steps.step2"), desc: t("steps.step2Desc") },
    { num: 3, label: t("steps.step3"), desc: t("steps.step3Desc") },
    { num: 4, label: t("steps.step4"), desc: t("steps.step4Desc") },
    { num: 5, label: t("steps.step5"), desc: t("steps.step5Desc") },
  ];

  const driverName = tracking?.detail?.delivDriver?.name || tracking?.detail?.driver?.name || "J&T Express Courier";
  const driverPhone = tracking?.detail?.delivDriver?.phone;

  return (
    <div className="w-full space-y-6 font-sans text-neutral-900 select-none">
      {/* =========================================================================
          1. RESI & PROGRESS STEPPER
         ========================================================================= */}
      <div className="p-5 sm:p-7 rounded-none border border-neutral-200 bg-white space-y-7">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-neutral-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                {t("awbLabel")}
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 border border-neutral-200 text-neutral-600">
                {tracking?.detail?.services_type || "Reguler (EZ)"}
              </span>
            </div>

            <div className="flex items-baseline gap-3 pt-0.5">
              <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                {tracking?.awb || "-"}
              </h2>
              {tracking?.awb && (
                <button
                  type="button"
                  onClick={handleCopyAwb}
                  className="text-xs text-neutral-500 hover:text-black underline underline-offset-4 cursor-pointer transition-colors"
                >
                  {copied ? t("copied") : t("copyAwb")}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-0.5 sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
              {t("statusLabel")}
            </span>
            <p className="font-bold text-xs sm:text-sm text-neutral-900 tracking-wide uppercase">
              {currentStep === 5
                ? t("steps.step5")
                : currentStep === 4
                ? t("steps.step4")
                : currentStep === 3
                ? t("steps.step3")
                : t("steps.step1")}
            </p>
          </div>
        </div>

        {/* Minimalist Horizontal Step Indicator */}
        <div className="pt-1 pb-2">
          <div className="relative">
            {/* Background Base Line */}
            <div className="absolute top-2.5 left-4 right-4 h-[1px] bg-neutral-200" />
            {/* Active Line */}
            <div
              className="absolute top-2.5 left-4 h-[2px] bg-black transition-all duration-500"
              style={{
                width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2rem)`,
              }}
            />

            {/* Nodes */}
            <div className="relative flex items-center justify-between">
              {steps.map((s) => {
                const isPassed = s.num <= currentStep;
                const isCurrent = s.num === currentStep;

                return (
                  <div key={s.num} className="flex flex-col items-center text-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all z-10 ${
                        isCurrent
                          ? "bg-black text-white ring-4 ring-neutral-100"
                          : isPassed
                          ? "bg-black text-white"
                          : "bg-white border border-neutral-300 text-neutral-400"
                      }`}
                    >
                      {s.num}
                    </div>

                    <div className="mt-2.5 space-y-0.5 max-w-[65px] sm:max-w-[85px]">
                      <p
                        className={`text-[11px] leading-tight ${
                          isPassed ? "font-bold text-neutral-900" : "font-normal text-neutral-400"
                        }`}
                      >
                        {s.label}
                      </p>
                      <p className="text-[10px] text-neutral-400 hidden sm:block truncate">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. TWO-COLUMN DETAILS GRID
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Card 1: Kurir & Detail Barang */}
        <div className="p-5 sm:p-6 rounded-none border border-neutral-200 bg-white space-y-4">
          <div className="pb-3 border-b border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              {t("packageInfo")}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-normal">{t("courier")}</span>
              <span className="font-semibold text-neutral-900">{driverName}</span>
            </div>

            {driverPhone && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-normal">{t("courierContact")}</span>
                <a
                  href={`https://wa.me/62${driverPhone.replace(/^0/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-neutral-900 underline underline-offset-4 hover:text-black"
                >
                  {driverPhone}
                </a>
              </div>
            )}

            {tracking?.detail?.itemname && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-normal">{t("itemName")}</span>
                <span className="font-semibold text-neutral-900 truncate max-w-[190px]">
                  {tracking.detail.itemname}
                </span>
              </div>
            )}

            {tracking?.detail?.weight !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-normal">{t("weight")}</span>
                <span className="font-semibold text-neutral-900">
                  {tracking.detail.weight} kg {tracking.detail.qty ? `(${tracking.detail.qty} item)` : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Rute Pengiriman */}
        <div className="p-5 sm:p-6 rounded-none border border-neutral-200 bg-white space-y-4">
          <div className="pb-3 border-b border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              {t("routeInfo")}
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                {t("sender")}
              </span>
              <p className="font-semibold text-neutral-900">
                {tracking?.detail?.sender?.name || "IDSHOPCASE Official Store"}
              </p>
              <p className="text-neutral-500 text-[11px] font-normal truncate">
                {tracking?.detail?.sender?.city || "Jakarta Barat"} {tracking?.detail?.sender?.zipcode ? `(${tracking.detail.sender.zipcode})` : ""}
              </p>
            </div>

            <div className="space-y-0.5 pt-2 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                {t("receiver")}
              </span>
              <p className="font-semibold text-neutral-900">
                {tracking?.detail?.receiver?.name || "Customer"}
              </p>
              <p className="text-neutral-500 text-[11px] font-normal leading-relaxed">
                {tracking?.detail?.receiver?.addr || "Address on record"}
                {tracking?.detail?.receiver?.city ? `, ${tracking.detail.receiver.city}` : ""}
                {tracking?.detail?.receiver?.zipcode ? ` (${tracking.detail.receiver.zipcode})` : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. DETAILED CHRONOLOGICAL TIMELINE
         ========================================================================= */}
      {tracking?.history && tracking.history.length > 0 && (
        <div className="p-5 sm:p-7 rounded-none border border-neutral-200 bg-white space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                {t("historyTitle")}
              </h3>
              <p className="text-[11px] text-neutral-400 font-normal">
                {t("historySubtitle")}
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">
              {tracking.history.length} {t("checkpoints")}
            </span>
          </div>

          <div className="relative pl-5 space-y-6 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-neutral-200">
            {tracking.history.map((h, idx) => {
              const isLatest = idx === 0;

              return (
                <div key={idx} className="relative group">
                  {/* Node dot */}
                  <div
                    className={`absolute -left-[18px] top-1.5 w-2 h-2 rounded-full transition-all ${
                      isLatest
                        ? "bg-black ring-4 ring-neutral-100"
                        : "bg-neutral-300"
                    }`}
                  />

                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span
                        className={`text-xs font-bold ${
                          isLatest ? "text-neutral-900" : "text-neutral-700"
                        }`}
                      >
                        {h.storeName || h.agentName || "Drop Point J&T"}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {h.date_time}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {h.status}
                    </p>

                    {h.city_name && (
                      <p className="text-[11px] text-neutral-400 pt-0.5">
                        {h.city_name}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
