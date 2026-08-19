"use client";

import React, { useState } from "react";
import { Plus, Minus, Truck, ShieldCheck, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductAccordionInfoProps {
  description?: string;
}

export const ProductAccordionInfo: React.FC<ProductAccordionInfoProps> = ({
  description,
}) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    description: false, // all closed by default
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
            PRODUCT DESCRIPTION
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
                <p>
                  {description ||
                    "Custom case eksklusif berkualitas tinggi dengan cetakan UV HD Ultra-Glossy yang tajam, awet, dan anti-pudar. Dirancang presisi untuk melindungi smartphone kesayangan Anda dari goresan dan benturan."}
                </p>

                <div className="space-y-1.5 pt-1">
                  <p className="font-bold text-neutral-900 uppercase tracking-wide text-[11px]">
                    DETAILS & HIGHLIGHTS:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                    <li>High-Definition UV Printing Tech (Anti-peel & Anti-scratch)</li>
                    <li>Presisi 100% pada port charger, speaker, dan tombol responsif</li>
                    <li>Raised Bezel di sekeliling kamera dan layar untuk proteksi ekstra</li>
                    <li>Material premium yang nyaman digenggam dan tidak licin</li>
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
            SHIPPING & DELIVERY
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
                <p>
                  <strong className="text-neutral-900 font-semibold">Estimasi Produksi & Kirim:</strong> 1-2 Hari Kerja setelah pembayaran terkonfirmasi.
                </p>
                <p>
                  <strong className="text-neutral-900 font-semibold">Ekspedisi:</strong> JNE, SiCepat, J&T, Anteraja, Paxel & Instant Courier (Gojek / Grab).
                </p>
                <p className="text-[11px] text-neutral-500">
                  Semua pesanan dikemas dengan bubble wrap tebal berlapis dan dus premium anti-benturan.
                </p>
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
            WARRANTY & RETURN POLICY
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
                <p>
                  <strong className="text-neutral-900 font-semibold">Garansi 100% Ganti Baru:</strong> Jika produk diterima dalam keadaan cacat cetak, retak, atau salah tipe hp, kami ganti baru gratis tanpa biaya tambahan.
                </p>
                <p className="text-[11px] text-neutral-500">
                  Cukup sertakan video unboxing saat paket pertama kali dibuka ke WhatsApp Customer Service kami.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductAccordionInfo;
