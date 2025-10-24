/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import LoginLayout from "@/app/(auth)/layout";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("LoginLayout Component", () => {
  it("menampilkan judul dan teks untuk halaman login", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");

    render(
      <LoginLayout>
        <div>Form Login</div>
      </LoginLayout>
    );

    expect(screen.getByText("Masuk")).toBeInTheDocument();
    expect(
      screen.getByText("Masuk ke akun Anda untuk mengakses layanan kami.")
    ).toBeInTheDocument();
    expect(screen.getByText("Form Login")).toBeInTheDocument();

    const container = screen.getByRole("generic");
    expect(container.className).toContain("flex-row");
  });

  it("menampilkan judul dan teks untuk halaman register", () => {
    (usePathname as jest.Mock).mockReturnValue("/register");

    render(
      <LoginLayout>
        <div>Form Register</div>
      </LoginLayout>
    );

    expect(screen.getByText("Daftar")).toBeInTheDocument();
    expect(
      screen.getByText("Selamat datang! Buat akun IDShopCase kamu sekarang")
    ).toBeInTheDocument();
    expect(screen.getByText("Form Register")).toBeInTheDocument();

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

    expect(container.firstChild).toBeNull();
  });
});
