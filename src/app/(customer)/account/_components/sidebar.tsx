"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetUser } from "@/features/auth/api/get-user";
import { useLogout } from "@/features/auth/api/login";
import { useRouter } from "next/navigation";
import {
  LuPencil,
  LuGlobe,
  LuMail,
  LuPhone,
  LuMessageCircle,
  LuLogOut,
} from "react-icons/lu";

export const Sidebar = () => {
  const { data: user } = useGetUser();
  const { replace } = useRouter();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => replace("/login"),
    });
  };

  const name = user?.name || "Pelanggan";
  const email = user?.email || "";
  const phone = user?.phone || "";
  const avatarUrl = user?.profile_picture ?? user?.image ?? null;

  return (
    <aside className="w-full space-y-6 font-sans text-neutral-900 select-none">
      {/* 1. Large Circular Avatar & Name */}
      <div className="flex flex-col items-start space-y-3">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xs">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-neutral-700 bg-neutral-100">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-neutral-900 tracking-tight">
            {name}
          </h2>
        </div>
      </div>

      {/* 2. About Section */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-neutral-900">About</h3>
        <p className="text-xs text-neutral-600 leading-relaxed font-normal">
          Pelanggan resmi IDSHOPCASE. Suka mengoleksi custom case dan aksesoris personal.
        </p>

        <Link
          href="/account/profile"
          className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-none border border-neutral-300 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-all cursor-pointer"
        >
          <LuPencil className="w-3.5 h-3.5" />
          <span>Edit page</span>
        </Link>
      </div>

      {/* 3. Connect Section */}
      <div className="space-y-3 pt-4 border-t border-neutral-100">
        <h3 className="text-xs font-bold text-neutral-900">Connect</h3>
        <div className="space-y-2.5 text-xs font-normal">
          <div className="flex items-center justify-between text-neutral-600">
            <div className="flex items-center gap-2">
              <LuGlobe className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Website</span>
            </div>
            <span className="text-neutral-500 font-mono text-[11px] truncate max-w-[120px]">
              idshopcase.com
            </span>
          </div>

          {email && (
            <div className="flex items-center justify-between text-neutral-600">
              <div className="flex items-center gap-2">
                <LuMail className="w-4 h-4 text-neutral-600 shrink-0" />
                <span>Email</span>
              </div>
              <span className="text-neutral-500 font-mono text-[11px] truncate max-w-[120px]">
                {email}
              </span>
            </div>
          )}

          {phone && (
            <div className="flex items-center justify-between text-neutral-600">
              <div className="flex items-center gap-2">
                <LuPhone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Telepon</span>
              </div>
              <span className="text-neutral-500 font-mono text-[11px]">
                (+62) {phone}
              </span>
            </div>
          )}

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between text-neutral-600 hover:text-black transition-colors"
          >
            <div className="flex items-center gap-2">
              <LuMessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>WhatsApp</span>
            </div>
            <span className="text-neutral-500 font-mono text-[11px]">CS Support</span>
          </a>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-none border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-600 hover:text-black hover:bg-neutral-50 transition-all cursor-pointer"
          >
            <LuLogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
