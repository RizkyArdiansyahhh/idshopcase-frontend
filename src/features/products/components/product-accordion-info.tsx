"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface ProductAccordionInfoProps {
  description?: string;
}

export const ProductAccordionInfo: React.FC<ProductAccordionInfoProps> = ({
  description,
}) => {
  const t = useTranslations("product.accordion");

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    description: false,
    shipping: false,
    warranty: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full pt-4 border-t border-neutral-200/80 divide-y divide-neutral-200/80 font-sans select-none">
      {/* 1. PRODUCT DESCRIPTION ACCORDION */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggleSection("description")}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-wider text-neutral-900 uppercase font-sans">
            {t("descriptionTitle")}
          </span>
          <span className="text-neutral-600 transition-transform duration-200">
            {openSections.description ? (
              <Minus className="w-4 h-4 stroke-[1.75]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[1.75]" />
            )}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {openSections.description && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-1 text-xs sm:text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                <p>{description || t("defaultDescription")}</p>

                <div className="space-y-1.5 pt-1">
                  <p className="font-bold text-neutral-900 uppercase tracking-wide text-[11px]">
                    {t("highlightsTitle")}
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                    <li>{t("highlight1")}</li>
                    <li>{t("highlight2")}</li>
                    <li>{t("highlight3")}</li>
                    <li>{t("highlight4")}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. SHIPPING & DELIVERY DETAILS */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggleSection("shipping")}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-wider text-neutral-900 uppercase font-sans">
            {t("shippingTitle")}
          </span>
          <span className="text-neutral-600 transition-transform duration-200">
            {openSections.shipping ? (
              <Minus className="w-4 h-4 stroke-[1.75]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[1.75]" />
            )}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {openSections.shipping && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-1 text-xs sm:text-[13px] text-neutral-600 leading-relaxed space-y-2 font-normal">
                <p>{t("shippingLead")}</p>
                <div className="space-y-1 pt-1">
                  <p className="font-bold text-neutral-900 uppercase tracking-wide text-[11px]">
                    {t("shippingEstTitle")}
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                    <li>{t("shippingEst1")}</li>
                    <li>{t("shippingEst2")}</li>
                    <li>{t("shippingEst3")}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. WARRANTY & RETURN POLICY */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggleSection("warranty")}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-wider text-neutral-900 uppercase font-sans">
            {t("warrantyTitle")}
          </span>
          <span className="text-neutral-600 transition-transform duration-200">
            {openSections.warranty ? (
              <Minus className="w-4 h-4 stroke-[1.75]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[1.75]" />
            )}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {openSections.warranty && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-1 text-xs sm:text-[13px] text-neutral-600 leading-relaxed space-y-2 font-normal">
                <p>{t("warrantyLead")}</p>
                <div className="space-y-1 pt-1">
                  <p className="font-bold text-neutral-900 uppercase tracking-wide text-[11px]">
                    {t("warrantyTermsTitle")}
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                    <li>{t("warrantyTerm1")}</li>
                    <li>{t("warrantyTerm2")}</li>
                    <li>{t("warrantyTerm3")}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductAccordionInfo;
