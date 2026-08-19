"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_TAGS = [
  { label: "SHOP ALL", href: "/products/collections" },
  { label: "CUSTOM CASE", href: "/products/collections?category=custom_case" },
  { label: "KEYCHAIN", href: "/products/collections?category=keychain" },
  { label: "PHONE CHARM", href: "/products/collections?category=phone_charm" },
  { label: "POP SOCKET", href: "/products/collections?category=pop_socket" },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onClose();
    router.push(`/products/collections?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleTagClick = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] font-sans select-none">
          {/* Backdrop Dimming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Bamboo Blonde Luxury Top Search Drawer */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full bg-white shadow-2xl pt-6 pb-10 sm:pb-12 px-6 sm:px-12 border-b border-neutral-200"
          >
            {/* Top Close Button (X) */}
            <div className="w-full max-w-[1200px] mx-auto flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="text-neutral-500 hover:text-neutral-900 transition-colors p-2 cursor-pointer rounded-none"
                title="Tutup Pencarian"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Centered Search Input Bar (Underline Style) */}
            <div className="w-full max-w-2xl mx-auto pt-2 sm:pt-4">
              <form onSubmit={handleSubmit} className="relative w-full">
                <div className="relative flex items-center border-b border-neutral-300 focus-within:border-black transition-colors pb-2">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-lg sm:text-2xl font-light text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none pr-10 font-sans tracking-wide"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 text-neutral-500 hover:text-neutral-900 transition-colors p-1 cursor-pointer"
                    title="Cari"
                  >
                    <Search className="w-5 h-5 stroke-[1.75]" />
                  </button>
                </div>
              </form>

              {/* Bamboo Blonde Quick Suggestion Filter Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-6 sm:pt-8">
                {QUICK_TAGS.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTagClick(tag.href)}
                    className="px-3.5 py-1.5 border border-neutral-200 hover:border-black bg-white hover:bg-neutral-50 text-[11px] sm:text-xs font-semibold tracking-wider text-neutral-800 uppercase transition-all duration-200 cursor-pointer rounded-none"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
