"use client";

import { useTransition, useEffect, useState } from "react";
import { setUserLocale } from "@/i18n/locale";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUser } from "@/features/auth/api/get-user";
import { Button } from "../ui/button";
import { CartButton } from "@/features/cart/components/cart-button";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

interface NavbarProps {
  isBlur?: boolean;
}

export const Navbar = ({ isBlur = true }: NavbarProps) => {
  const { data: user } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navbar");

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const FULL_WIDTH_PATHS = ["/products/collections"];
  const isFullWidth = FULL_WIDTH_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  useEffect(() => {
    if (isFullWidth) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFullWidth]);

  // Dropdown mobile & Language click outside
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

  const [, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: "id" | "en") => {
    setIsLangOpen(false);
    setIsOpen(false);
    startTransition(async () => {
      await setUserLocale(newLocale);
      router.refresh();
    });
  };

  // Styling
  const backgroundColor = isFullWidth
    ? "rgb(15,15,15)"
    : isBlur
      ? isScrolled
        ? "rgba(0,0,0,0.6)"
        : "rgba(255,255,255,0.08)"
      : "rgb(15,15,15)";

  const backdrop = isFullWidth
    ? "none"
    : isBlur
      ? isScrolled
        ? "blur(14px)"
        : "blur(0px)"
      : "none";

  const borderRadius =
    isFullWidth || isScrolled
      ? "0px"
      : isBlur
        ? isScrolled
          ? "0.75rem"
          : "1rem"
        : isScrolled
          ? "0.5rem"
          : "0.75rem";

  const topPosition = isFullWidth ? "0" : isScrolled ? "0" : "1.25rem";

  return (
    <nav
      className={`fixed z-50 w-full border text-white transition-[max-width,margin,border-radius,box-shadow,top] duration-500 ${
        isFullWidth || isScrolled
          ? "border-transparent border-b-white/30"
          : isBlur
            ? "border-white/30"
            : "border-transparent"
      }`}
      style={{
        top: topPosition,
        maxWidth: isFullWidth || isScrolled ? "100%" : "93%",
        marginLeft: isFullWidth || isScrolled ? "0" : "auto",
        marginRight: isFullWidth || isScrolled ? "0" : "auto",
        borderRadius,
        backdropFilter: backdrop,
        backgroundColor,
        boxShadow: isFullWidth
          ? "0 2px 10px rgba(0,0,0,0.4)"
          : isBlur
            ? isScrolled
              ? "0 4px 20px rgba(0,0,0,0.3)"
              : "0 0px 0px rgba(0,0,0,0)"
            : "0 2px 10px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex justify-between items-center py-1 md:py-4 px-5">
        <Link
          href="/"
          className="text-base sm:text-lg md:text-2xl font-semibold select-none"
        >
          IDSHOP<span className="font-black">CASE</span>
        </Link>

        {/* Right: Actions (Language Switcher, Sign In, Sign Up / User Profile) */}
        <div className="hidden md:flex gap-6 items-center">
          {/* Language Switcher */}
          <div className="relative">
            <button
              id="lang-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLangOpen(!isLangOpen);
              }}
              className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer select-none"
            >
              <Globe className="w-4 h-4 text-white/80" />
              <span>{locale === "en" ? "English" : "Indonesia"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  id="lang-dropdown"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-32 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl p-1 z-50 overflow-hidden text-white"
                >
                  <button
                    type="button"
                    onClick={() => handleLocaleChange("id")}
                    className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center justify-between transition-colors ${
                      locale === "id"
                        ? "bg-white/20 font-semibold text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>🇮🇩 Indonesia</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocaleChange("en")}
                    className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center justify-between transition-colors ${
                      locale === "en"
                        ? "bg-white/20 font-semibold text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>🇬🇧 English</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth Actions / Profile & Cart */}
          {!user ? (
            <div className="flex items-center gap-5">
              <Link
                href="/login"
                className="text-xs md:text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {t("signIn")}
              </Link>

              <Button
                size="sm"
                className="text-xs md:text-sm font-semibold rounded-lg bg-white text-black hover:bg-white/90 px-4 py-2"
                onClick={() => router.push("/register")}
              >
                {t("signUp")}
              </Button>
            </div>
          ) : (
            <>
              <Link
                href={user.role === "admin" ? "/admin/dashboard" : "/account/profile"}
                title={user.role === "admin" ? t("adminDashboard") : t("profile")}
              >
                <FaUser size={20} color="white" />
              </Link>
              {user.role !== "admin" && <CartButton />}
            </>
          )}
        </div>

        <button
          id="hamburger-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          type="button"
          className="relative z-[60] inline-flex flex-col items-center justify-center w-10 h-10 md:hidden"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-white rounded-sm"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-white rounded-sm my-1"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-white rounded-sm"
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full right-0 mt-2 w-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-[12px] shadow-lg md:hidden overflow-hidden p-3"
          >
            <div className="flex flex-col gap-2 text-white text-start">
              {/* Language Switcher Mobile */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-1 px-1">
                <span className="text-xs text-white/70">{t("language")}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleLocaleChange("id")}
                    className={`px-2 py-0.5 rounded text-xs ${locale === "id" ? "bg-white text-black font-bold" : "text-white/70"}`}
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocaleChange("en")}
                    className={`px-2 py-0.5 rounded text-xs ${locale === "en" ? "bg-white text-black font-bold" : "text-white/70"}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {!user ? (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="py-1 px-2 text-xs font-medium text-white/90 hover:text-white transition-colors"
                  >
                    {t("signIn")}
                  </Link>
                  <Button
                    size="sm"
                    className="w-full text-xs font-semibold rounded-lg bg-white text-black hover:bg-white/90"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/register");
                    }}
                  >
                    {t("signUp")}
                  </Button>
                </div>
              ) : (
                <>
                  <Link
                    href={user?.role === "admin" ? "/admin/dashboard" : "/account/profile"}
                    className="py-2 hover:bg-white/10 transition px-2 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <p>{user?.role === "admin" ? t("adminDashboard") : t("profile")}</p>
                  </Link>
                  {user?.role !== "admin" && (
                    <Link
                      href={"/cart"}
                      className="py-2 hover:bg-white/10 transition px-2 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <p>{t("cart")}</p>
                    </Link>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
