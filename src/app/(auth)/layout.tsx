// src/app/(auth)/login/layout.tsx
"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isLoginLayout = pathName === "/login";
  console.log(isLoginLayout);
  if (!pathName) return null;
  if (pathName === "/verify" || pathName.startsWith("/auth/"))
    return <>{children}</>;

  console.log(pathName);
  return (
    <div
      className={`w-screen h-screen flex flex-col md:flex-row ${
        isLoginLayout ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div
        className={`relative  ${
          isLoginLayout ? "h-[30vh]" : "h-[15vh]"
        } w-full md:w-3/5 md:h-full  md:p-3`}
      >
        <div className="w-full h-full md:rounded-2xl relative overflow-hidden">
          <Image
            src={"/images/login-cover.jpg"}
            fill
            alt="cover-login"
            className="object-cover object-center"
          ></Image>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-primary"></div>
        </div>
      </div>
      <div
        className={`w-screen overflow-auto py-7 md:py-0  ${
          isLoginLayout
            ? "h-[70vh] justify-center"
            : "h-[85vh] justify-center py-20"
        }   bg-background md:w-2/5 md:h-full flex  items-center flex-col`}
      >
        <div className="w-3/5 md:w-4/5 lg:w-3/5">
          <h1 className="text-2xl md:text-4xl font-bold mb-0.5 md:mb-2 text-start">
            {pathName === "/login" ? "Masuk" : "Daftar"}
          </h1>
          <p className="text-md mb-2">
            {pathName === "/login"
              ? "Masuk ke akun Anda untuk mengakses layanan kami."
              : "Selamat datang! Buat akun IDShopCase kamu sekarang"}
          </p>
        </div>
        <div className="w-3/5 h-full md:h-3/5 md:w-4/5 lg:w-3/5">
          {children}
        </div>
      </div>
    </div>
  );
}
