"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export const WhatsAppWidget = () => {
  const t = useTranslations("home");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [dismissedAlert, setDismissedAlert] = useState(false);

  const phoneNumber = "6285117453862";
  const waLink = message.trim()
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : "https://wa.me/message/UGIJPSGHHWKHL1";

  // Trigger floating alert 3.5 seconds after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenWidget = () => {
    setOpen(true);
    setShowAlert(false);
    setDismissedAlert(true);
  };

  const handleDismissAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAlert(false);
    setDismissedAlert(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-end">
        {/* Floating Speech Bubble Alert with Close Button */}
        <AnimatePresence>
          {showAlert && !open && !dismissedAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 15 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 10 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              onClick={handleOpenWidget}
              className="absolute right-[4.5rem] bottom-1 bg-card text-card-foreground border border-border/70 p-3.5 shadow-xl rounded-none w-[250px] sm:w-[280px] cursor-pointer select-none transition-all group flex items-start justify-between gap-2"
            >
              {/* Text content */}
              <div className="flex-1 min-w-0 pr-1">
                <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {t("waAlertTitle") || "Ada kendala tipe HP atau order?"}
                </h4>
                <p className="text-[11px] text-muted-foreground font-normal leading-snug mt-1">
                  {t("waAlertSubtitle") ||
                    "Chat CS kami, siap bantu dalam hitungan menit!"}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleDismissAlert}
                className="text-muted-foreground/60 hover:text-foreground p-0.5 -mr-1 -mt-1 rounded-xs transition-colors shrink-0"
                title="Tutup pesan"
                aria-label="Tutup pesan"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Speech bubble tail pointing right towards the WhatsApp button */}
              <div className="absolute -right-1.5 bottom-4 w-3 h-3 bg-card border-r border-t border-border/70 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Floating Button */}
        <button
          onClick={handleOpenWidget}
          className={`
            bg-foreground p-4 rounded-full border border-background shadow-lg
            transition-all duration-300 ease-out
            hover:scale-105
            ${open ? "opacity-0 scale-75 pointer-events-none" : "opacity-100"}
          `}
        >
          <FaWhatsapp className="text-white w-6 h-6" />
        </button>

        {/* Chat Drawer Card */}
        <div
          className={`
            absolute bottom-0 right-0
            w-[70vw] md:w-[50vw] lg:w-[25vw] rounded-xl shadow-xl overflow-hidden bg-white
            transition-all duration-300 ease-out
            ${
              open
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }
          `}
        >
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3">
            <p className="text-white font-semibold">WhatsApp</p>
            <button onClick={() => setOpen(false)}>
              <X className="text-white w-5 h-5 hover:cursor-pointer" />
            </button>
          </div>

          <div className="h-[50vh] relative p-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow w-fit absolute top-4 z-50">
              <p className="text-xs md:text-sm">
                Hi 👋 <br />
                Ada yang bisa kami bantu?
              </p>
            </div>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-black z-40">
              <Image fill src="/images/main-assets/whatsapp-bg.jpg" alt="" />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 border-t">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 rounded-full px-4 py-2 text-sm"
            />
            <a
              href={waLink}
              target="_blank"
              className="bg-foreground p-3 rounded-full"
            >
              <IoSend className="text-white w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
