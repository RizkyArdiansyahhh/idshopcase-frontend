"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface TopAnnouncementBarProps {
  isScrolled?: boolean;
}

export const TopAnnouncementBar = ({ isScrolled = false }: TopAnnouncementBarProps) => {
  const t = useTranslations("navbar");
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements = [
    t("announcement1"),
    t("announcement2"),
    t("announcement3"),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div
      className={`w-full bg-black text-white border-b border-white/10 font-[family-name:var(--font-fustat)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isScrolled
          ? "max-h-0 opacity-0 -translate-y-full pointer-events-none py-0"
          : "max-h-12 opacity-100 translate-y-0 py-1.5 sm:py-2"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-200 line-clamp-1"
          >
            {announcements[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
