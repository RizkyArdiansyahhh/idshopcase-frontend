"use client";

import { useTransition, useEffect, useState } from "react";
import { setUserLocale } from "@/i18n/locale";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUser } from "@/features/auth/api/get-user";
import { CartButton } from "@/features/cart/components/cart-button";
import { Search, ChevronDown, Sparkles, X, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { HiOutlineUser } from "react-icons/hi2";
import { SearchModal } from "./search-modal";

interface NavbarProps {
  isTransparentOnTop?: boolean;
}

export const Navbar = ({ isTransparentOnTop = false }: NavbarProps) => {
  const { data: user } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navbar");

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [, startTransition] = useTransition();

  // Scroll listener for dynamic homepage navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLocaleChange = (newLocale: "id" | "en") => {
    setIsLangOpen(false);
    setIsOpen(false);
    startTransition(async () => {
      await setUserLocale(newLocale);
      router.refresh();
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/products/collections?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById("mobile-dropdown");
      const button = document.getElementById("hamburger-btn");
      const langDropdown = document.getElementById("lang-dropdown");
      const langBtn = document.getElementById("lang-btn");

      if (
        dropdown &&
        !dropdown.contains(e.target as Node) &&
        button &&
        !button.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }

      if (
        langDropdown &&
        !langDropdown.contains(e.target as Node) &&
        langBtn &&
        !langBtn.contains(e.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Determine current active visual state:
  // Is this the homepage in transparent state (at the very top before scrolling)?
  const isCurrentlyTransparent = isTransparentOnTop && !isScrolled;

  const headerBg = isCurrentlyTransparent
    ? "bg-transparent border-transparent"
    : "bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]";

  const textColor = isCurrentlyTransparent ? "text-white" : "text-neutral-900";
  const textMutedColor = isCurrentlyTransparent ? "text-white/80 hover:text-white" : "text-neutral-700 hover:text-neutral-900";
  const customStudioBadge = isCurrentlyTransparent
    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-sans select-none ${headerBg} ${textColor}`}
    >
      <div className="w-full max-w-[1400px] mx-auto h-16 sm:h-18 px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* 1. LEFT: Brand Logo (IDSHOP font-semibold, CASE font-black) */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl sm:text-2xl lg:text-[26px] tracking-wide uppercase font-sans hover:opacity-85 transition-opacity leading-none text-current"
          >
            <span className="font-semibold">IDSHOP</span>
            <span className="font-black">CASE</span>
          </Link>
        </div>

        {/* 2. CENTER: Clean Minimalist Nav Links (PERSONALIZE, SHOP, ABOUT) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            href="/customizer"
            className={`text-xs lg:text-[13px] font-semibold uppercase tracking-widest transition-all hover:underline underline-offset-4 decoration-1 decoration-current ${textMutedColor}`}
          >
            PERSONALIZE
          </Link>

          <Link
            href="/products/collections"
            className={`text-xs lg:text-[13px] font-semibold uppercase tracking-widest transition-all hover:underline underline-offset-4 decoration-1 decoration-current ${textMutedColor}`}
          >
            SHOP
          </Link>

          <Link
            href="/about"
            className={`text-xs lg:text-[13px] font-semibold uppercase tracking-widest transition-all hover:underline underline-offset-4 decoration-1 decoration-current ${textMutedColor}`}
          >
            ABOUT
          </Link>
        </nav>

        {/* 3. RIGHT: Actions (account, Globe, Search, Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Account Text Link (Exact THENBLANK "account" style) */}
          <div className="hidden sm:flex items-center pr-1 sm:pr-1.5">
            <Link
              href={!user ? "/login" : user.role === "admin" ? "/admin/dashboard" : "/account/profile"}
              className={`text-xs lg:text-[13px] font-medium lowercase tracking-wider transition-all hover:underline underline-offset-4 decoration-1 decoration-current ${textMutedColor}`}
            >
              account
            </Link>
          </div>

          {/* Language Switcher Dropdown (Globe Icon Only, No Flag Emojis) */}
          <div className="relative hidden md:block">
            <button
              id="lang-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLangOpen(!isLangOpen);
              }}
              className={`p-1 flex items-center justify-center cursor-pointer transition-colors ${textMutedColor}`}
              title="Ganti Bahasa"
            >
              <Globe className="w-5 h-5 stroke-[1.5]" />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  id="lang-dropdown"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 mt-2 w-32 p-1.5 z-50 rounded-none shadow-xl ${
                    isCurrentlyTransparent
                      ? "bg-black/95 text-white border border-white/20"
                      : "bg-white text-neutral-900 border border-neutral-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleLocaleChange("id")}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold uppercase tracking-widest flex items-center justify-between ${
                      locale === "id"
                        ? isCurrentlyTransparent ? "bg-white/20 text-white font-bold" : "bg-neutral-100 text-neutral-900 font-bold"
                        : isCurrentlyTransparent ? "hover:bg-white/10 text-white/80" : "hover:bg-neutral-50 text-neutral-600"
                    }`}
                  >
                    <span>INDONESIA</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocaleChange("en")}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold uppercase tracking-widest flex items-center justify-between ${
                      locale === "en"
                        ? isCurrentlyTransparent ? "bg-white/20 text-white font-bold" : "bg-neutral-100 text-neutral-900 font-bold"
                        : isCurrentlyTransparent ? "hover:bg-white/10 text-white/80" : "hover:bg-neutral-50 text-neutral-600"
                    }`}
                  >
                    <span>ENGLISH</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Icon Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className={`p-1 flex items-center justify-center cursor-pointer transition-colors ${textMutedColor}`}
            title="Cari Produk"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Cart Icon */}
          <div className="text-current flex items-center justify-center p-1">
            <CartButton className="text-current" />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="hamburger-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            type="button"
            className="md:hidden p-1 cursor-pointer"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-[1.5px] w-full transition-all ${isCurrentlyTransparent ? "bg-white" : "bg-neutral-900"} ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-[1.5px] w-full transition-all ${isCurrentlyTransparent ? "bg-white" : "bg-neutral-900"} ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[1.5px] w-full transition-all ${isCurrentlyTransparent ? "bg-white" : "bg-neutral-900"} ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Bamboo Blonde Style Top Slide-Down Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`w-full border-t md:hidden p-5 space-y-4 shadow-xl ${
              isCurrentlyTransparent
                ? "bg-black/95 border-white/20 text-white"
                : "bg-white border-neutral-200 text-neutral-900"
            }`}
          >
            <nav className="flex flex-col gap-3.5 text-xs font-semibold uppercase tracking-widest">
              <Link
                href="/customizer"
                onClick={() => setIsOpen(false)}
                className="py-1 text-neutral-900 font-bold"
              >
                PERSONALIZE
              </Link>
              <Link
                href="/products/collections"
                onClick={() => setIsOpen(false)}
                className="py-1 opacity-90 hover:opacity-100"
              >
                SHOP
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="py-1 opacity-90 hover:opacity-100"
              >
                ABOUT
              </Link>
              <Link
                href="/account/track-order"
                onClick={() => setIsOpen(false)}
                className="py-1 opacity-90 hover:opacity-100"
              >
                LACAK PESANAN
              </Link>
            </nav>

            <div className={`border-t pt-3 flex items-center justify-between text-xs ${
              isCurrentlyTransparent ? "border-white/20" : "border-neutral-200"
            }`}>
              <div className="flex items-center gap-3">
                <Link
                  href={!user ? "/login" : user.role === "admin" ? "/admin/dashboard" : "/account/profile"}
                  onClick={() => setIsOpen(false)}
                  className="font-semibold uppercase tracking-wider"
                >
                  ACCOUNT
                </Link>
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex gap-2 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => handleLocaleChange("id")}
                  className={`px-1.5 py-0.5 ${locale === "id" ? (isCurrentlyTransparent ? "bg-white text-black" : "bg-black text-white") : "opacity-60"}`}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => handleLocaleChange("en")}
                  className={`px-1.5 py-0.5 ${locale === "en" ? (isCurrentlyTransparent ? "bg-white text-black" : "bg-black text-white") : "opacity-60"}`}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
