// src/app/(auth)/login/layout.tsx
"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  if (!pathName) return null;

  console.log(pathName);
  return (
    <div
      className={`w-screen h-screen flex ${
        pathName === "/login" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div className="w-3/5 h-full relative p-3">
        <div className="w-full h-full full bg-white rounded-2xl bg-[url('/images/login-cover.jpg')] bg-cover relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-primary"></div>
        </div>
      </div>
      <div className="w-2/5 h-full flex justify-center items-center flex-col">
        <div className="w-3/5">
          <h1 className="text-4xl font-bold mb-2 text-start">
            {pathName === "/login" ? "Masuk" : "Daftar"}
          </h1>
          <p>
            {" "}
            {pathName === "/login"
              ? "Masuk ke akun Anda untuk mengakses layanan kami."
              : "Selamat datang! Buat akun IDShopCase kamu sekarang"}
          </p>
        </div>
        <div className="w-3/5 h-3/5 py-2">{children}</div>
      </div>
    </div>
  );
}
