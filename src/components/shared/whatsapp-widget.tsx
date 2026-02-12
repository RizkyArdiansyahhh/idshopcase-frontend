"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "628123456";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message || "Halo, saya mau tanya",
  )}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(true)}
          className={`
      bg-foreground p-4 rounded-full border border-background shadow-lg
      transition-all duration-300 ease-out
      hover:scale-105
      ${open ? "opacity-0 scale-75 pointer-events-none" : "opacity-100"}
    `}
        >
          <FaWhatsapp className="text-white w-6 h-6" />
        </button>

        {/* CARD */}
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
              <Image
                fill
                src="https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770889405/Free_download_Whatsapp_Background_Wallpaper_Seni_Foto_Abstrak_Objek_Gambar_on_WallpaperSafari_xer0pb.jpg"
                alt=""
              />
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
