"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PrivacyPolicyModal } from "@/components/shared/privacy-policy-modal";
import { useTranslations } from "next-intl";

type ModalType = "shipping" | "terms" | "contact" | null;

export const AccountFooter = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const t = useTranslations("account");

  return (
    <>
      {/* Footer Text Links */}
      <footer className="w-full pt-14 pb-6 select-none">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs text-neutral-500 font-normal">
          <button
            type="button"
            onClick={() => setActiveModal("shipping")}
            className="underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
          >
            {t("footer.shipping")}
          </button>

          <PrivacyPolicyModal
            trigger={
              <button
                type="button"
                className="underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
              >
                {t("footer.privacy")}
              </button>
            }
          />

          <button
            type="button"
            onClick={() => setActiveModal("terms")}
            className="underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
          >
            {t("footer.terms")}
          </button>

          <button
            type="button"
            onClick={() => setActiveModal("contact")}
            className="underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
          >
            {t("footer.contact")}
          </button>
        </div>
      </footer>

      {/* =========================================================================
          1. SHIPPING MODAL
         ========================================================================= */}
      <Dialog
        open={activeModal === "shipping"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-[680px] w-[92vw] sm:w-[85vw] max-h-[82vh] overflow-y-auto overflow-x-hidden bg-white p-5 sm:p-8 rounded-none border border-neutral-200 shadow-2xl font-sans"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{t("shippingModal.title")}</DialogTitle>
          </DialogHeader>

          <div className="w-full font-sans text-neutral-900 py-1 px-1">
            {/* Top Decorative Rule */}
            <div className="w-full flex justify-center mb-5">
              <div className="w-14 sm:w-20 h-[1px] bg-neutral-300" />
            </div>

            {/* Main Header */}
            <div className="text-center space-y-1.5 mb-8 sm:mb-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.14em] uppercase text-neutral-900 leading-tight">
                {t("shippingModal.title")}
              </h1>
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-500 font-medium max-w-sm mx-auto leading-relaxed">
                {t("shippingModal.subtitle")}
              </p>
              <p className="text-[10px] text-neutral-400 font-normal pt-0.5">
                {t("shippingModal.lastUpdated")}
              </p>
            </div>

            {/* 2-Column Editorial Grid */}
            <div className="space-y-6 sm:space-y-8 w-full">
              {/* SECTION 1 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("shippingModal.section1Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("shippingModal.section1P1")}</p>
                  <p className="font-semibold text-neutral-900">{t("shippingModal.section1P2")}</p>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("shippingModal.section2Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("shippingModal.section2P1")}</p>
                  <ul className="space-y-1.5 pt-1">
                    <li className="flex items-start gap-2">
                      <span className="text-neutral-400 select-none">-</span>
                      <span>{t("shippingModal.section2Item1")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neutral-400 select-none">-</span>
                      <span>{t("shippingModal.section2Item2")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neutral-400 select-none">-</span>
                      <span>{t("shippingModal.section2Item3")}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full pb-2">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("shippingModal.section3Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("shippingModal.section3P1")}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* =========================================================================
          2. TERMS OF SERVICE MODAL
         ========================================================================= */}
      <Dialog
        open={activeModal === "terms"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-[680px] w-[92vw] sm:w-[85vw] max-h-[82vh] overflow-y-auto overflow-x-hidden bg-white p-5 sm:p-8 rounded-none border border-neutral-200 shadow-2xl font-sans"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{t("termsModal.title")}</DialogTitle>
          </DialogHeader>

          <div className="w-full font-sans text-neutral-900 py-1 px-1">
            {/* Top Decorative Rule */}
            <div className="w-full flex justify-center mb-5">
              <div className="w-14 sm:w-20 h-[1px] bg-neutral-300" />
            </div>

            {/* Main Header */}
            <div className="text-center space-y-1.5 mb-8 sm:mb-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.14em] uppercase text-neutral-900 leading-tight">
                {t("termsModal.title")}
              </h1>
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-500 font-medium max-w-sm mx-auto leading-relaxed">
                {t("termsModal.subtitle")}
              </p>
              <p className="text-[10px] text-neutral-400 font-normal pt-0.5">
                {t("termsModal.lastUpdated")}
              </p>
            </div>

            {/* 2-Column Editorial Grid */}
            <div className="space-y-6 sm:space-y-8 w-full">
              {/* SECTION 1 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("termsModal.section1Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("termsModal.section1P1")}</p>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("termsModal.section2Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("termsModal.section2P1")}</p>
                  <p className="font-semibold text-neutral-900">{t("termsModal.section2P2")}</p>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full pb-2">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("termsModal.section3Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("termsModal.section3P1")}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* =========================================================================
          3. CONTACT INFORMATION MODAL
         ========================================================================= */}
      <Dialog
        open={activeModal === "contact"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-[680px] w-[92vw] sm:w-[85vw] max-h-[82vh] overflow-y-auto overflow-x-hidden bg-white p-5 sm:p-8 rounded-none border border-neutral-200 shadow-2xl font-sans"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{t("contactModal.title")}</DialogTitle>
          </DialogHeader>

          <div className="w-full font-sans text-neutral-900 py-1 px-1">
            {/* Top Decorative Rule */}
            <div className="w-full flex justify-center mb-5">
              <div className="w-14 sm:w-20 h-[1px] bg-neutral-300" />
            </div>

            {/* Main Header */}
            <div className="text-center space-y-1.5 mb-8 sm:mb-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.14em] uppercase text-neutral-900 leading-tight">
                {t("contactModal.title")}
              </h1>
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-500 font-medium max-w-sm mx-auto leading-relaxed">
                {t("contactModal.subtitle")}
              </p>
              <p className="text-[10px] text-neutral-400 font-normal pt-0.5">
                {t("contactModal.lastUpdated")}
              </p>
            </div>

            {/* 2-Column Editorial Grid */}
            <div className="space-y-6 sm:space-y-8 w-full">
              {/* SECTION 1 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("contactModal.section1Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("contactModal.section1P1")}</p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block font-mono font-bold text-neutral-900 text-sm underline underline-offset-4 hover:text-black"
                  >
                    +62 812-3456-7890
                  </a>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("contactModal.section2Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("contactModal.section2P1")}</p>
                  <p className="font-mono font-bold text-neutral-900 text-sm">
                    support@idshopcase.com
                  </p>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full pb-2">
                <div className="w-full md:w-[180px] shrink-0 md:text-right">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
                    {t("contactModal.section3Title")}
                  </h2>
                </div>
                <div className="w-full md:flex-1 space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
                  <p>{t("contactModal.section3P1")}</p>
                  <p className="text-neutral-500 text-xs">{t("contactModal.section3P2")}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
