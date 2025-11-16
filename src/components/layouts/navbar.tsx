"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUser } from "@/features/auth/api/get-user";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CartButton } from "@/features/cart/components/cart-button";

interface NavbarProps {
  isBlur?: boolean;
}

export const Navbar = ({ isBlur = true }: NavbarProps) => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: user } = useGetUser();
  console.log(user?.role);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById("mobile-dropdown");
      const button = document.getElementById("hamburger-btn");
      if (
        dropdown &&
        !dropdown.contains(e.target as Node) &&
        button &&
        !button.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const backgroundColor = isBlur
    ? isScrolled
      ? "rgba(0,0,0,0.6)"
      : "rgba(255,255,255,0.08)"
    : "rgb(15,15,15)";

  const backdrop = isBlur ? (isScrolled ? "blur(14px)" : "blur(0px)") : "none";

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[93%] border ${
        isBlur ? "border-white/30" : "border-transparent"
      } text-white transition-all duration-500`}
      style={{
        top: isScrolled ? "0" : "1.25rem",
        backgroundColor,
        backdropFilter: backdrop,
        borderRadius: isBlur
          ? isScrolled
            ? "0.75rem"
            : "1rem"
          : isScrolled
          ? "0.5rem"
          : "0.75rem",
        boxShadow: isBlur
          ? isScrolled
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 0px 0px rgba(0,0,0,0)"
          : "0 2px 10px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex justify-between items-center py-4 px-5">
        <Link href="/" className="text-2xl font-bold select-none">
          idshopcase.
        </Link>

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

        <div className="hidden md:flex gap-6 items-center">
          {!user ? (
            <div>
              <Button variant={"secondary"} onClick={() => push("/login")}>
                Login
              </Button>
            </div>
          ) : (
            <>
              <Link href={"/account/profile"}>
                <FaUser size={24} color="white" />
              </Link>
              <CartButton></CartButton>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full right-0 mt-2 w-1/2 bg-black/70 backdrop-blur-xl border border-white/20 rounded-[12px] shadow-lg md:hidden overflow-hidden"
          >
            <div className="flex flex-col py-2 text-white text-center">
              <Link
                href={"/account/profile"}
                className="py-2 hover:bg-white/10 transition"
              >
                Profil
              </Link>
              <Link
                href={"/cart"}
                className="py-2 hover:bg-white/10 transition"
              >
                Keranjang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
