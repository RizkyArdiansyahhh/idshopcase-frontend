/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sidebar } from "../../app/(customer)/account/_components/sidebar";

// Mock next/navigation untuk mengatur path dinamis
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("../sidebar-link", () => ({
  SidebarLink: ({ href, children, isActive }: any) => (
    <a href={href} data-active={isActive ? "true" : "false"}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("Sidebar component", () => {
  const { usePathname } = jest.requireMock("next/navigation");

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("menampilkan semua link sidebar", () => {
    usePathname.mockReturnValue("/account/profile");
    render(<Sidebar />);

    expect(screen.getByText("Informasi Pribadi")).toBeInTheDocument();
    expect(screen.getByText("Pesanan Saya")).toBeInTheDocument();
    expect(screen.getByText("Alamat")).toBeInTheDocument();
  });

  test("menandai link aktif sesuai path saat ini", () => {
    usePathname.mockReturnValue("/account/address");
    render(<Sidebar />);

    const activeLink = screen.getByText("Alamat");
    expect(activeLink).toHaveAttribute("data-active", "true");

    expect(screen.getByText("Informasi Pribadi")).toHaveAttribute(
      "data-active",
      "false"
    );
    expect(screen.getByText("Pesanan Saya")).toHaveAttribute(
      "data-active",
      "false"
    );
  });

  test('menampilkan tombol "Keluar" hanya di halaman profile', () => {
    usePathname.mockReturnValue("/account/profile");
    render(<Sidebar />);
    expect(screen.getByRole("button", { name: /keluar/i })).toBeInTheDocument();
  });

  test('tidak menampilkan tombol "Keluar" di halaman lain', () => {
    usePathname.mockReturnValue("/account/address");
    render(<Sidebar />);
    expect(
      screen.queryByRole("button", { name: /keluar/i })
    ).not.toBeInTheDocument();
  });
});
