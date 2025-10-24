/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import LoginLayout from "@/app/(auth)/layout";
import { usePathname } from "next/navigation";

// 🔧 Mock usePathname dari Next.js
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("LoginLayout Component", () => {
  it("menampilkan judul dan teks untuk halaman login", () => {
    // 🧩 Mock route saat di /login
    (usePathname as jest.Mock).mockReturnValue("/login");

    render(
      <LoginLayout>
        <div>Form Login</div>
      </LoginLayout>
    );

    // ✅ Cek teks sesuai route /login
    expect(screen.getByText("Masuk")).toBeInTheDocument();
    expect(
      screen.getByText("Masuk ke akun Anda untuk mengakses layanan kami.")
    ).toBeInTheDocument();
    expect(screen.getByText("Form Login")).toBeInTheDocument();

    // ✅ Pastikan layout flex-row digunakan
    const container = screen.getByRole("generic");
    expect(container.className).toContain("flex-row");
  });

  it("menampilkan judul dan teks untuk halaman register", () => {
    // 🧩 Mock route saat di /register
    (usePathname as jest.Mock).mockReturnValue("/register");

    render(
      <LoginLayout>
        <div>Form Register</div>
      </LoginLayout>
    );

    // ✅ Cek teks sesuai route /register
    expect(screen.getByText("Daftar")).toBeInTheDocument();
    expect(
      screen.getByText("Selamat datang! Buat akun IDShopCase kamu sekarang")
    ).toBeInTheDocument();
    expect(screen.getByText("Form Register")).toBeInTheDocument();

    // ✅ Pastikan layout flex-row-reverse digunakan
    const container = screen.getByRole("generic");
    expect(container.className).toContain("flex-row-reverse");
  });

  it("mengembalikan null jika pathName undefined", () => {
    (usePathname as jest.Mock).mockReturnValue(undefined);

    const { container } = render(
      <LoginLayout>
        <div>Form Kosong</div>
      </LoginLayout>
    );

    // ✅ Tidak ada elemen yang dirender
    expect(container.firstChild).toBeNull();
  });
});
