"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useGetUser } from "@/features/auth/api/get-user";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { AccountFooter } from "./_components/account-footer";
import { useTranslations } from "next-intl";
import { LuArrowLeft } from "react-icons/lu";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const t = useTranslations("account");
  const { data: user } = useGetUser();
  const pathname = usePathname();
  const router = useRouter();

  const name = user?.name || t("customerAccount");
  const avatarUrl = user?.profile_picture ?? user?.image ?? null;

  const accountNavItems = [
    { label: t("tabs.profile"), path: "/account/profile" },
    { label: t("tabs.orders"), path: "/account/orders" },
    { label: t("tabs.address"), path: "/account/address" },
    { label: t("tabs.password"), path: "/account/update-password" },
    { label: t("tabs.track"), path: "/account/track-order" },
  ];

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="w-full min-h-screen bg-white text-neutral-900 flex flex-col justify-between font-sans select-none">
        <div>
          {/* =========================================================================
              STICKY PROFILE HEADER (Unified & 100% Aligned with max-w-[840px] Content)
             ========================================================================= */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md">
            <div className="max-w-[840px] mx-auto px-4 sm:px-6 pt-6 sm:pt-7 space-y-4 sm:space-y-5">
              {/* 1. Top Action Bar (Kembali ke Beranda) */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  <LuArrowLeft className="w-3.5 h-3.5" />
                  <span>{t("backToHome")}</span>
                </button>
              </div>

              {/* 2. Prominent Profile Identity Header */}
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Circular Avatar */}
                <div className="relative group shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xs">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-xl sm:text-2xl text-neutral-700 bg-neutral-100">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Prominent Name & Role */}
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    {t("customerAccount")}
                  </p>
                  <h1 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 truncate">
                    {name}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                    {t("officialMember")}
                  </p>
                </div>
              </div>

              {/* 3. Underline Navigation Tabs */}
              <div className="w-full border-b border-neutral-200 overflow-x-auto no-scrollbar scrollbar-none pt-1">
                <nav className="flex items-center gap-6 sm:gap-8 whitespace-nowrap min-w-max">
                  {accountNavItems.map((item) => {
                    const isActive =
                      pathname === item.path || pathname.startsWith(`${item.path}/`);
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`pb-3 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                          isActive
                            ? "text-neutral-900"
                            : "text-neutral-400 hover:text-neutral-700"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </header>

          {/* =========================================================================
              MAIN CONTENT CANVAS
             ========================================================================= */}
          <main className="max-w-[840px] mx-auto px-4 sm:px-6 pt-7 sm:pt-8">
            {children}
          </main>
        </div>

        {/* =========================================================================
            MINIMALIST ACCOUNT FOOTER WITH INTERACTIVE MODALS
           ========================================================================= */}
        <AccountFooter />
      </div>
    </ProtectedRoute>
  );
}
